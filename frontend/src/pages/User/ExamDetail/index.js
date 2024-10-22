/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GetExamWithShuffledQuestions } from "../../../redux/slice/examSlice";
import {
  GetTimeZone,
  ParseDateToIndonesianFormat,
  ParseTimeToIndonesianFormat,
} from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { getLecturerById } from "../../../redux/slice/lecturerSlice";
import { isAfter, isEqual } from "date-fns";

const ExamDetail = ({ route }) => {
  const { examId } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const exam = useSelector((state) => state.exam);
  const lecturer = useSelector((state) => state.lecturer);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    dispatch(GetExamWithShuffledQuestions({ examId, token }));
  }, [examId, dispatch]);

  useEffect(() => {
    if (exam?.exam?.lecturer_id) {
      dispatch(getLecturerById({ lecturerId: exam?.exam?.lecturer_id, token }));
    }
  }, [exam.exam?.lecturer_id, dispatch, token]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startTime = new Date(exam?.exam?.start_time);
  const endTime = new Date(exam?.exam?.end_time);

  let status;

  if (isAfter(currentTime, endTime)) {
    <View className="border border-green-500 px-2 rounded-full">
      <Text className="text-green-500 text-xs capitalize">selesai</Text>
    </View>;
  } else if (
    isEqual(currentTime, startTime) ||
    (currentTime >= startTime && currentTime <= endTime)
  ) {
    status = (
      <View className="border border-red-500 px-2 rounded-full">
        <Text className="text-red-500 text-xs capitalize">
          sedang berlangsung
        </Text>
      </View>
    );
  } else {
    status = (
      <View className="border border-yellow-500 px-2 rounded-full">
        <Text className="text-yellow-500 text-xs capitalize">akan datang</Text>
      </View>
    );
  }

  const isStartTime =
    isEqual(currentTime, startTime) ||
    (currentTime >= startTime && currentTime <= endTime);

  const showAlert = () => {
    Alert.alert(
      "Peringatan!",
      "Setelah Anda menekan tombol 'Mulai', Anda tidak dapat kembali ke halaman sebelumnya hingga ujian selesai. Apakah Anda yakin ingin melanjutkan?",
      [
        { text: "Batal" },
        {
          text: "Ya",
          onPress: () =>
            navigation.navigate("ExamAttemp", {
              exam: exam?.exam,
            }),
        },
      ]
    );
  };

  return (
    <View className="items-center mt-5">
      <View className="w-[85%] bg-white px-4 pt-4 pb-6 rounded-md shadow-lg">
        <Image
          className="w-full h-48"
          source={{
            uri: exam?.exam?.background_image
              ? exam.exam.background_image
              : "https://www.thebluediamondgallery.com/wooden-tile/images/exam.jpg",
          }}
        />

        <View>
          <Text className="font-bold text-lg mt-1">{exam?.exam?.title}</Text>
          <Text className="font-medium text-slate-800">
            {lecturer?.lecturer?.full_name}
          </Text>
          <Text className="text-xs text-slate-500">
            {exam?.exam?.description}
          </Text>
          <View className="mt-2 flex-row justify-between mb-2">
            <View className="flex-row items-center">
              <MaterialIcons name="date-range" size={16} color="#94A3B8" />
              <Text className="text-slate-500 ml-1 text-xs">
                {ParseDateToIndonesianFormat(startTime)}
              </Text>
            </View>

            <View className="flex-row items-center">
              <MaterialIcons name="schedule" size={16} color="#94A3B8" />
              <Text className="text-slate-500 ml-1 text-xs">
                {ParseTimeToIndonesianFormat(startTime)} -
                {ParseTimeToIndonesianFormat(endTime)} {GetTimeZone(endTime)}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <FontAwesome6 name="circle-question" size={14} color="#94A3B8" />
              <Text className="text-slate-500 ml-1 text-xs">
                {exam?.exam?.Questions?.length} pertanyaan
              </Text>
            </View>
            <View>
              <Text>{status}</Text>
            </View>
          </View>
          {isStartTime ? (
            <TouchableOpacity
              className="bg-[#018675] w-20 py-2 rounded-md mt-5"
              // onPress={() =>
              //   navigation.navigate("ExamAttemp", {
              //     exam: exam?.exam,
              //   })
              // }
              onPress={showAlert}
            >
              <Text className="text-center capitalize font-medium text-white">
                mulai
              </Text>
            </TouchableOpacity>
          ) : (
            <View className="bg-slate-400 w-20 py-2 rounded-md mt-5">
              <Text className="text-center capitalize font-medium text-white">
                Mulai
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ExamDetail;
