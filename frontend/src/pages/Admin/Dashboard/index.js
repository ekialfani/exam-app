/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DecodeJwtToken from "../../../utils/DecodeJwtToken";
import { getLecturerById } from "../../../redux/slice/lecturerSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const lecturer = useSelector((state) => state.lecturer);
  const exam = useSelector((state) => state.exam);

  useEffect(() => {
    const parsedToken = DecodeJwtToken(token);
    dispatch(getLecturerById({ lecturerId: parsedToken?.id, token }));
  }, [dispatch, token]);

  const getExamTotal = (exams) => {
    return exams?.length || 0;
  };

  const getTotalOngoingExams = (exams) => {
    const currentTime = new Date();
    return (
      exams?.filter(
        (exam) =>
          currentTime >= new Date(exam.start_time) &&
          currentTime <= new Date(exam.end_time)
      )?.length || 0
    );
  };

  const getTotalCompletedExams = (exams) => {
    return exams?.filter((exam) => exam.status === true)?.length || 0;
  };

  const getTotalUncompletedExams = (exams) => {
    return exams?.filter((exam) => exam.status === false)?.length || 0;
  };

  return (
    <View>
      <View className="px-5 py-6 bg-[#018675] h-[35vh] relative justify-center">
        <TouchableOpacity className="w-11 h-11 bg-white rounded-full items-center justify-center border-2 border-slate-300 absolute right-5 top-12">
          <Text className="text-2xl font-semibold">
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
              {getExamTotal(exam?.exams)}
            </Text>
            <Text className="capitalize font-semibold">total ujian</Text>
            <TouchableOpacity>
              <Text className="text-xs capitalize mt-2">lihat detail</Text>
            </TouchableOpacity>
          </View>

          <View className="w-2/5 bg-white shadow-md px-3 py-5 rounded-md">
            <Text className="text-2xl font-semibold">
              {getTotalOngoingExams(exam?.exams)}
            </Text>
            <Text className="capitalize font-semibold">sedang berlangsung</Text>
            <TouchableOpacity>
              <Text className="text-xs capitalize mt-2">lihat detail</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-evenly">
          <View className="w-2/5 bg-white shadow-md px-3 py-5 rounded-md">
            <Text className="text-2xl font-semibold">
              {getTotalUncompletedExams(exam?.exams)}
            </Text>
            <Text className="capitalize font-semibold">belum selesai</Text>
            <TouchableOpacity>
              <Text className="text-xs capitalize mt-2">lihat detail</Text>
            </TouchableOpacity>
          </View>
          <View className="w-2/5 bg-white shadow-md px-3 py-5 rounded-md">
            <Text className="text-2xl font-semibold">
              {getTotalCompletedExams(exam?.exams)}
            </Text>
            <Text className="capitalize font-semibold">selesai</Text>
            <TouchableOpacity>
              <Text className="text-xs capitalize mt-2">lihat detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
