/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

const ExamResult = ({ route }) => {
  const { result } = route.params;
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-12 capitalize text-lg font-semibold">
        hasil ujian
      </Text>

      <View className="w-8/12 bg-white px-10 py-8 rounded-lg shadow-md">
        <View className="items-center">
          <View className="bg-[#ffbd00] w-16 h-16 rounded-full justify-center items-center -mt-16 border-4 border-[#ffebb3]">
            <FontAwesome5 name="medal" size={30} color="#ffe88f" />
          </View>
          <Text className="text-2xl font-bold mt-5">
            Nilai {result?.grade}
          </Text>
        </View>
        <View className="flex-row justify-between mt-10">
          <View className="items-center">
            <Text className="capitalize font-semibold">benar</Text>
            <Text className="text-lg font-bold">
              {result?.total_correct}
            </Text>
          </View>
          <View className="items-center">
            <Text className="capitalize font-semibold">salah</Text>
            <Text className="text-lg font-bold">
              {result?.total_incorrect}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-[#018675] py-2.5 rounded-full mt-5"
          onPress={() => navigation.navigate("Home")}
        >
          <Text className="capitalize text-center text-white font-semibold">
            lanjut
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExamResult;
