/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompletedExams } from "../../../redux/slice/completedExamSlice";
import { useIsFocused } from "@react-navigation/native";

const CompletedExam = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.token);
  const completed = useSelector((state) => state.completed);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllCompletedExams({ token }));
    }
  }, [isFocused, token, dispatch]);

  return (
    <ScrollView className="px-5 py-6">
      <FlatList
        className="mb-10"
        scrollEnabled={false}
        data={completed?.completedExams}
        renderItem={({ item }) => (
          <View className="bg-white mb-3 px-3 py-3 flex-row items-center rounded-md shadow-lg">
            <Image
              className="w-20 object-cover h-full"
              source={{
                uri: "https://th.bing.com/th/id/OIP.E-9jnKxUTT1rYZOeAZ8unQHaE8?rs=1&pid=ImgDetMain",
              }}
            />
            <View className="ml-3 leading-loose flex-1">
              <Text className="font-semibold">{item?.exam.title}</Text>
              <Text className="text-xs text-slate-700 font-medium">
                {item?.exam?.lecturer?.full_name}
              </Text>
              <Text className="text-[12px] capitalize text-slate-500">
                {item?.questions_length} pertanyaan
              </Text>
              <View className="mt-2 flex-row items-center justify-between">
                <Text className="border border-green-600 w-14 text-[11px] text-center rounded-full capitalize font-semibold text-green-600">
                  {item?.exam?.status && "selesai"}
                </Text>
                <TouchableOpacity>
                  <Text className="text-xs font-semibold capitalize">
                    lihat hasil
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default CompletedExam;
