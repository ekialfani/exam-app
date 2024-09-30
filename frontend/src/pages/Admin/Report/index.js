/* eslint-disable react/react-in-jsx-scope */
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const exams = [
  {
    id: 1,
    title: "Dasar Pemrograman",
    participant: 20,
  },
  {
    id: 2,
    title: "Matematika Diskrit",
    participant: 15,
  },
  {
    id: 3,
    title: "Calculus",
    participant: 21,
  },
  {
    id: 4,
    title: "Matematika Diskrit",
    participant: 15,
  },
  {
    id: 5,
    title: "Calculus",
    participant: 21,
  },
];

const Report = () => {
  const navigation = useNavigation();

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
        data={exams}
        renderItem={({ item, index }) => (
          <View className="flex-row items-center justify-between px-5 border-b border-slate-300 py-4">
            <Text className="text-[13px] basis-[10%]">{index + 1}.</Text>
            <Text className="text-[13px] basis-[45%]">{item.title}</Text>
            <Text className="text-[13px] basis-[20%]">{item.participant}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ReportDetail")}
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
