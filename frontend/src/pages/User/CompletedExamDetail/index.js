/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCompletedExamDetail } from "../../../redux/slice/completedExamSlice";
import {
  GetTimeZone,
  ParseDateToIndonesianFormat,
  ParseTimeToIndonesianFormat,
} from "../../../utils";

const CompletedExamDetail = ({ route }) => {
  const { examId } = route.params;

  const dispatch = useDispatch();

  const token = useSelector((state) => state?.auth?.token);
  const completed = useSelector((state) => state.completed);

  useEffect(() => {
    dispatch(getCompletedExamDetail({ examId, token }));
  }, [token, dispatch]);

  return (
    <View className="px-5 py-5">
      <View className="px-5 bg-white py-5 rounded-md shadow-md">
        <Image
          source={{
            uri: "https://www.thebluediamondgallery.com/wooden-tile/images/exam.jpg",
          }}
          className="w-full h-40"
        />
        <View className="mt-3">
          <Text className="text-lg font-semibold">
            {completed?.completedExam?.exam?.title}
          </Text>
          <Text className="text-xs font-semibold">
            {completed?.completedExam?.exam?.lecturer?.full_name}
          </Text>
          <Text className="text-xs text-slate-500 mt-1">
            {completed?.completedExam?.exam?.description}
          </Text>
          <View className="flex-row justify-between mt-3">
            <View className="flex-row items-center">
              <MaterialIcons name="date-range" size={16} />
              <Text className="text-[13px] ml-1">
                {ParseDateToIndonesianFormat(
                  new Date(completed?.completedExam?.exam_result?.exam_date)
                )}
              </Text>
            </View>
            <View className="flex-row items-center">
              <MaterialIcons name="schedule" size={16} />
              <Text className="text-[13px] ml-1">
                {ParseTimeToIndonesianFormat(
                  new Date(completed?.completedExam?.exam_result?.exam_date)
                )}{" "}
                {GetTimeZone(
                  new Date(completed?.completedExam?.exam_result?.exam_date)
                )}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between mt-3 border-b border-slate-300 pb-5">
            <View className="flex-row items-center">
              <FontAwesome6 name="circle-question" size={14} />
              <Text className="text-[13px] ml-1">
                {completed?.completedExam?.questions_length} Pertanyaan
              </Text>
            </View>
            <View className="border border-green-600 rounded-full px-2">
              <Text className="text-xs ml-1 capitalize font-semibold text-green-600">
                selesai
              </Text>
            </View>
          </View>
          <Text className="mt-2 text-lg font-semibold text-[#018675]">
            Nilai {completed?.completedExam?.exam_result?.grade}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CompletedExamDetail;
