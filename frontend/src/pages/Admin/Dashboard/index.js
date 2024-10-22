/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DecodeJwtToken from "../../../utils/DecodeJwtToken";
import { getLecturerById } from "../../../redux/slice/lecturerSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const token = useSelector((state) => state.auth.token);
  const lecturer = useSelector((state) => state.lecturer);
  const exam = useSelector((state) => state.exam);

  useEffect(() => {
    if (isFocused) {
      const parsedToken = DecodeJwtToken(token);
      dispatch(getLecturerById({ lecturerId: parsedToken?.id, token }));
    }
  }, [isFocused, dispatch, token]);

  const getExamTotal = (exams) => {
    return exams;
  };

  const getTotalOngoingExams = (exams) => {
    const currentTime = new Date();
    return exams?.filter(
      (exam) =>
        currentTime >= new Date(exam.start_time) &&
        currentTime <= new Date(exam.end_time)
    );
  };

  const getTotalCompletedExams = (exams) => {
    return exams?.filter((exam) => exam.status === true);
  };

  const getTotalUncompletedExams = (exams) => {
    return exams?.filter((exam) => exam.status === false);
  };

  return (
    <View>
      <View className="px-5 py-6 bg-[#018675] h-[35vh] relative justify-center">
        <TouchableOpacity
          className="w-11 h-11 bg-white rounded-full items-center justify-center border-2 border-[#93F3E8] absolute right-5 top-12"
          onPress={() => navigation.navigate("AdminSetting")}
        >
          <Text className="text-2xl font-bold text-[#018675] uppercase">
            {lecturer?.lecturer?.full_name?.charAt(0)}
          </Text>
        </TouchableOpacity>
        <Text className="capitalize text-white text-2xl font-semibold">
          selamat datang
        </Text>
        <Text className="text-white font-semibold text-2xl">
          {lecturer?.lecturer?.full_name}!
        </Text>
      </View>

      <View>
        <View className="flex-row justify-evenly -mt-10 mb-5">
          <View className="w-2/5 bg-white shadow-md px-3 py-5 rounded-md border-slate-500">
            <Text className="text-2xl font-semibold">
              {getExamTotal(exam?.exams)?.length || 0}
            </Text>
            <Text className="capitalize font-semibold">total ujian</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DashboardDetail", { exams: exam?.exams })
              }
            >
              <Text className="text-xs capitalize mt-2">lihat detail</Text>
            </TouchableOpacity>
          </View>

          <View className="w-2/5 bg-white shadow-md px-3 py-5 rounded-md">
            <Text className="text-2xl font-semibold">
              {getTotalOngoingExams(exam?.exams)?.length || 0}
            </Text>
            <Text className="capitalize font-semibold">sedang berlangsung</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DashboardDetail", {
                  exams: getTotalOngoingExams(exam?.exams),
                })
              }
            >
              <Text className="text-xs capitalize mt-2">lihat detail</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-evenly">
          <View className="w-2/5 bg-white shadow-md px-3 py-5 rounded-md">
            <Text className="text-2xl font-semibold">
              {getTotalUncompletedExams(exam?.exams)?.length || 0}
            </Text>
            <Text className="capitalize font-semibold">belum selesai</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DashboardDetail", {
                  exams: getTotalUncompletedExams(exam?.exams),
                })
              }
            >
              <Text className="text-xs capitalize mt-2">lihat detail</Text>
            </TouchableOpacity>
          </View>
          <View className="w-2/5 bg-white shadow-md px-3 py-5 rounded-md">
            <Text className="text-2xl font-semibold">
              {getTotalCompletedExams(exam?.exams)?.length || 0}
            </Text>
            <Text className="capitalize font-semibold">selesai</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DashboardDetail", {
                  exams: getTotalCompletedExams(exam?.exams),
                })
              }
            >
              <Text className="text-xs capitalize mt-2">lihat detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
