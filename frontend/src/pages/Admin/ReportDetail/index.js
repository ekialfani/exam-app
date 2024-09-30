/* eslint-disable react/react-in-jsx-scope */
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { FlatList, Image, ScrollView, Text, View } from "react-native";

const students = [
  {
    id: 1,
    profile:
      "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-3.jpg",
    name: "John Doe",
    nim: "200602001",
    grade: 80,
  },
  {
    id: 2,
    profile:
      "https://th.bing.com/th/id/OIP.JlCH8maF30fmC1pa41KQDQHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain",
    name: "Sbastian Pintus",
    nim: "200602002",
    grade: 95,
  },
  {
    id: 3,
    profile:
      "https://th.bing.com/th/id/OIP.q10JcSV8pb4VJV_RW6MzvwHaHa?rs=1&pid=ImgDetMain",
    name: "Jane Doe",
    nim: "200602003",
    grade: 90,
  },
  {
    id: 4,
    profile:
      "https://th.bing.com/th/id/OIP.nq3EAMfJ9ixsAAmM98mVbQHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain",
    name: "Mariana Angel",
    nim: "200602004",
    grade: 87,
  },
  {
    id: 5,
    profile:
      "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/35af6a41332353.57a1ce913e889.jpg",
    name: "Paul Walker",
    nim: "200602005",
    grade: 75,
  },
];

const ReportDetail = () => {
  return (
    <ScrollView className="px-6 py-5 flex-1">
      <View className="border-b border-slate-300 pb-6">
        <Image
          className="w-full h-44"
          source={{
            uri: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/computer-coding.jpg",
          }}
        />
        <Text className="capitalize mt-2 font-semibold text-lg">
          dasar pemrograman
        </Text>
        <Text className="font-medium text-[13px]">Jhon Doe, M.Kom</Text>

        <View className="flex-row justify-between items-center mt-5 mb-3">
          <View className="flex-row items-center">
            <MaterialIcons name="date-range" size={16} color="#64748b" />
            <Text className="text-slate-500 ml-1">30 september 2024</Text>
          </View>
          <View className="flex-row items-center">
            <MaterialIcons name="schedule" size={16} color="#64748b" />
            <Text className="text-slate-500 ml-1">12.00-14.00</Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Octicons name="question" size={14} color="#64748b" />
            <Text className="text-slate-500 ml-1">20 Pertanyaan</Text>
          </View>
          <View className="border-2 border-green-600 rounded-full px-2 items-center justify-center">
            <Text className="text-xs font-semibold capitalize text-green-600">
              selesai
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-6 mb-20">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="capitalize font-semibold">peserta</Text>
          <Text className="capitalize font-semibold">nilai</Text>
        </View>
        <FlatList
          data={students}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center bg-white mb-2 px-2 rounded-md border border-slate-300 py-2">
              <View className="flex-row items-center">
                <Image
                  className="w-10 h-10 rounded-full object-cover border-2 border-slate-400"
                  source={{ uri: item.profile }}
                />
                <View className="ml-2">
                  <Text className="text-[13px] font-semibold">{item.name}</Text>
                  <Text className="text-xs text-slate-500">{item.nim}</Text>
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
