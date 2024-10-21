/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getExamReportByExamId } from "../../../redux/slice/examReportSlice";
import ParseDateToIndonesianFormat from "../../../utils/Date/ParseDateToIndonesianFormat";
import { GetTimeZone, ParseTimeToIndonesianFormat } from "../../../utils";
import { getQuestionsByExamId } from "../../../redux/slice/questionSlice";

const ReportDetail = ({ route }) => {
  const { examId } = route.params;

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const report = useSelector((state) => state.report);
  const question = useSelector((state) => state.question);

  useEffect(() => {
    dispatch(getExamReportByExamId({ examId, token: auth?.token }));
    dispatch(getQuestionsByExamId({ examId, token: auth?.token }));
  }, [examId, auth.token, dispatch]);

  return (
    <ScrollView className="px-6 py-5 flex-1">
      <View className="border-b border-slate-300 pb-6">
        <Image
          className="w-full h-44"
          source={{
            uri: report?.examReport?.background_image
              ? report.examReport.background_image
              : "https://www.thebluediamondgallery.com/wooden-tile/images/exam.jpg",
          }}
        />
        <Text className="mt-2 font-semibold text-lg">
          {report?.examReport?.title}
        </Text>
        <Text className="text-xs text-slate-500">
          {report?.examReport?.description}
        </Text>

        <View className="flex-row justify-between items-start mt-5 mb-3">
          <View className="flex-row items-center w-1/2">
            <MaterialIcons name="date-range" size={16} color="#64748b" />
            <Text className="text-slate-500 ml-1">
              {ParseDateToIndonesianFormat(
                new Date(report?.examReport?.start_time)
              )}
            </Text>
          </View>
          <View className="flex-row items-center">
            <MaterialIcons name="schedule" size={16} color="#64748b" />
            <Text className="text-slate-500 ml-1">
              {ParseTimeToIndonesianFormat(
                new Date(report?.examReport?.start_time)
              )}
              -
              {ParseTimeToIndonesianFormat(
                new Date(report?.examReport?.end_time)
              )}{" "}
              {GetTimeZone(new Date(report?.examReport?.end_time))}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Octicons name="question" size={14} color="#64748b" />
            <Text className="text-slate-500 ml-1">
              {question?.questions?.length || 0} Pertanyaan
            </Text>
          </View>
          <View className="border-2 border-green-600 rounded-full px-2 items-center justify-center">
            {report?.examReport?.status && (
              <Text className="text-xs font-semibold capitalize text-green-600">
                selesai
              </Text>
            )}
          </View>
        </View>
      </View>

      <View className="mt-6 mb-20">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="capitalize font-semibold">peserta</Text>
          <Text className="capitalize font-semibold">nilai</Text>
        </View>
        <FlatList
          data={report?.examReport?.exam_results}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center bg-white mb-2 px-2 rounded-md border border-slate-300 py-2">
              <View className="flex-row items-center">
                {/* <Image
                  className="w-10 h-10 rounded-full object-cover border-2 border-slate-400"
                  source={{ uri: "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/35af6a41332353.57a1ce913e889.jpg" }}
                /> */}
                <View className="w-10 h-10 bg-[#018675] rounded-full items-center justify-center">
                  <Text className="text-white font-bold text-lg">
                    {item?.student?.full_name?.charAt(0)}
                  </Text>
                </View>
                <View className="ml-2">
                  <Text className="text-[13px] font-semibold">
                    {item?.student?.full_name}
                  </Text>
                  <Text className="text-xs text-slate-500">
                    {item?.student?.nim}
                  </Text>
                </View>
              </View>
              <Text className="font-bold">{item.grade}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default ReportDetail;
