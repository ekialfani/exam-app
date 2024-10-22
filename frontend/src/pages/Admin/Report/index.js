/* eslint-disable react/react-in-jsx-scope */
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllExamReports } from "../../../redux/slice/examReportSlice";

const Report = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const report = useSelector((state) => state.report);

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllExamReports({ token: auth?.token }));
    }
  }, [isFocused, auth.token, dispatch]);

  useEffect(() => {
    if (!auth.token) {
      navigation.navigate("Login");
    }
  }, [auth.token]);

  return (
    <ScrollView>
      <View className="flex-row justify-between px-5 mt-5 border-b border-slate-300 pb-2">
        <Text className="basis-[10%] capitalize text-[13px] font-semibold">
          no
        </Text>
        <Text className="basis-[45%] capitalize text-[13px] font-semibold">
          judul
        </Text>
        <Text className="basis-[20%] capitalize text-[13px] font-semibold">
          peserta
        </Text>
        <Text className="basis-[20%] capitalize text-[13px] font-semibold">
          aksi
        </Text>
      </View>
      <FlatList
        scrollEnabled={false}
        data={report?.examReports}
        renderItem={({ item, index }) => (
          <View className="flex-row items-center justify-between px-5 border-b border-slate-300 py-4">
            <Text className="text-[13px] basis-[10%]">{index + 1}.</Text>
            <Text className="text-[13px] basis-[45%]">{item?.title}</Text>
            <Text className="text-[13px] basis-[20%]">
              {item?.exam_results?.length || 0}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ReportDetail", { examId: item?.id })
              }
            >
              <Text className="text-[13px] capitalize font-semibold">
                lihat detail
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default Report;
