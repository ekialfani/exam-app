/* eslint-disable react/react-in-jsx-scope */
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Text, View } from "react-native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
  });

  return (
    <View className="flex-1 justify-center items-center bg-[#018675]">
    <Entypo name="open-book" size={50} color={"#fff"} />
      <Text className="text-white text-xl font-bold">Aplikasi Ujian</Text>
    </View>
  );
};

export default SplashScreen;
