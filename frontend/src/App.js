/* eslint-disable react/react-in-jsx-scope */
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-100">
      <FontAwesome name="github" size={33} />
      <Text className="text-slate-700 text-xl font-bold">Hello World</Text>
      <StatusBar style="auto" />
    </View>
  );
}
