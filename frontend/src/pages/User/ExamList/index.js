/* eslint-disable react/react-in-jsx-scope */
import { Entypo } from "@expo/vector-icons";
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
import { getAllExamAssignments } from "../../../redux/slice/examSlice";
import {
  GetTimeZone,
  ParseDateToIndonesianFormat,
  ParseTimeToIndonesianFormat,
} from "../../../utils";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export const ExamList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const token = useSelector((state) => state.auth.token);
  const exam = useSelector((state) => state.exam);

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllExamAssignments({ token }));
    }
  }, [isFocused, token, dispatch]);

  return (
    <ScrollView>
      <View className="items-center mt-5">
        <View className="w-5/6">
          <FlatList
            scrollEnabled={false}
            data={exam?.examAssignments}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="w-full bg-white mb-3 flex-row items-center p-3 rounded-md shadow-md"
                onPress={() =>
                  navigation.navigate("ExamDetail", { examId: item.exam_id })
                }
              >
                <Image
                  className="w-16 h-16"
                  source={{
                    uri: "https://www.thebluediamondgallery.com/wooden-tile/images/exam.jpg",
                  }}
                />
                <View className="ml-3">
                  <Text className="font-medium">{item?.exam?.title}</Text>
                  <Text className="text-xs font-medium mb-1">
                    {item?.exam?.lecturer?.full_name}
                  </Text>
                  <Text className="text-xs text-slate-500">
                    {item?.exam?.Questions?.length} pertanyaan
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-xs text-slate-500">
                      {ParseDateToIndonesianFormat(
                        new Date(item?.exam?.start_time)
                      )}
                    </Text>
                    <Entypo name="dot-single" color="#64748b" size={20} />
                    <Text className="text-xs text-slate-500">
                      {ParseTimeToIndonesianFormat(
                        new Date(item?.exam?.start_time)
                      )}{" "}
                      {GetTimeZone(new Date(item?.exam?.start_time))}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ExamList;
