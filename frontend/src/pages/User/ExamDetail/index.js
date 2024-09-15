/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getExamById } from "../../../redux/slice/examSlice";
import {
  ParseDateToIndonesianFormat,
  ParseTimeToIndonesianFormat,
} from "../../../utils";

const ExamDetail = ({ route }) => {
  const { examId } = route.params;

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const exam = useSelector((state) => state.exam);

  useEffect(() => {
    dispatch(getExamById({ examId, token }));
  }, [examId, dispatch]);

  return (
    <View className="items-center mt-5">
      <View className="w-[85%] bg-white px-4 pt-4 pb-6 rounded-md shadow-lg">
        <Image
          className="w-full h-48"
          source={{
            uri: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/computer-coding.jpg",
          }}
        />

        <View>
          <Text className="capitalize font-bold text-lg mt-1">
            {exam?.exam?.title}
          </Text>
          <Text className="font-medium text-slate-800">
            {exam?.exam?.lecturer?.full_name}
          </Text>
          <Text className="text-xs text-slate-500">
            {exam?.exam?.description}
          </Text>
          <View className="mt-2 flex-row justify-between mb-2">
            <View className="flex-row items-center">
              <MaterialIcons name="date-range" size={16} color="#94A3B8" />
              <Text className="text-slate-500 ml-1 text-xs">
                {ParseDateToIndonesianFormat(new Date(exam?.exam?.start_time))}
              </Text>
            </View>

            <View className="flex-row items-center">
              <MaterialIcons name="schedule" size={16} color="#94A3B8" />
              <Text className="text-slate-500 ml-1 text-xs">
                {ParseTimeToIndonesianFormat(new Date(exam?.exam?.start_time))}-
                {ParseTimeToIndonesianFormat(new Date(exam?.exam?.end_time))}
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
          </View>
          <TouchableOpacity className="bg-[#018675] w-20 py-2 rounded-md mt-5">
            <Text className="text-center capitalize font-medium text-white">
              mulai
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ExamDetail;
