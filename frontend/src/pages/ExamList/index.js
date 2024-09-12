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
import { getAllExams } from "../../redux/slice/examSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const ExamList = () => {
  const token = useSelector((state) => state.auth.token);
  const exam = useSelector((state) => state.exam);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllExams({ token }));
    }
  }, [isFocused, token, dispatch]);

  return (
    <ScrollView className="flex-1">
      <View className="items-center my-5">
        <FlatList
          className="w-5/6"
          scrollEnabled={false}
          data={exam?.exams}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white mb-3 px-3 py-3 rounded-md shadow-md"
              onPress={() =>
                navigation.navigate("AdminExamDetail", { examId: item.id })
              }
            >
              <View className="flex-row gap-x-3 flex-start">
                <Image
                  source={{
                    uri: "https://www.thebluediamondgallery.com/wooden-tile/images/exam.jpg",
                  }}
                  className="w-20 h-20"
                />
                <View className="flex-1">
                  <View>
                    <Text className="capitalize font-semibold">
                      {item.title}
                    </Text>
                    <Text className="text-xs text-slate-500">
                      {item.lecturer.full_name}
                    </Text>
                    <Text>{item?.Questions?.length} pertanyaan</Text>
                  </View>
                  <View>
                    {item.status ? (
                      <Text className="text-[11px] capitalize border border-green-600 w-20 text-center rounded-full mt-2 font-medium text-green-600 py-0.5">
                        selesai
                      </Text>
                    ) : (
                      <Text className="text-[11px] capitalize border border-red-500 w-20 text-center rounded-full mt-2 font-medium text-red-500 py-0.5">
                        belum selesai
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default ExamList;
