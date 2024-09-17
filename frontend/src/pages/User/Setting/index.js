/* eslint-disable react/react-in-jsx-scope */
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slice/authSlice";
import { useEffect, useState } from "react";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import DecodeJwtToken from "../../../utils/DecodeJwtToken";
import { getStudentById } from "../../../redux/slice/studentSlice";

const Setting = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = useSelector((state) => state.auth);
  const student = useSelector((state) => state.student);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const parsedToken = DecodeJwtToken(auth.token);
    dispatch(
      getStudentById({ studentId: parsedToken?.id, token: auth?.token })
    );
  }, [auth.token, dispatch]);

  useEffect(() => {
    if (!auth.token) {
      navigation.navigate("Login");
    }
  }, [auth]);

  const handleUserLogout = () => {
    dispatch(logout());
  };

  return (
    <View className="items-center mt-5">
      <View className="w-5/6 bg-white p-5 rounded-md shadow-md">
        <View className="flex-row items-center pb-6 border-b border-slate-300">
          <View className="w-12 h-12 border-2 border-slate-500 rounded-full items-center justify-center">
            <Text className="text-2xl font-bold uppercase">
              {student?.student?.full_name?.charAt(0)}
            </Text>
          </View>
          <View className="ml-3">
            <Text className="font-bold capitalize">
              {student?.student?.full_name}
            </Text>
            <Text className="text-xs text-slate-500">
              {student?.student?.email}
            </Text>
          </View>
        </View>

        <TouchableOpacity className="py-3 flex-row items-center justify-between border-b border-slate-300">
          <View className="flex-row items-center">
            <FontAwesome name="user-circle" size={20} />
            <Text className="capitalize ml-2 font-medium">
              profile pengguna
            </Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity className="py-3 flex-row items-center justify-between border-b border-slate-300">
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="shield-key" size={21} />
            <Text className="capitalize ml-2 font-medium">ganti password</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          className="py-3 flex-row items-center justify-between border-b border-slate-300"
          onPress={() => setDarkMode(!darkMode)}
        >
          <View className="flex-row items-center">
            <MaterialIcons name="dark-mode" size={21} />
            <Text className="capitalize ml-2 font-medium">mode gelap</Text>
          </View>
          {darkMode ? (
            <View>
              <Entypo name="switch" size={20} />
            </View>
          ) : (
            <View className="rotate-180">
              <Entypo name="switch" size={20} />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center mt-4 mb-5"
          onPress={handleUserLogout}
        >
          <MaterialIcons name="logout" size={20} color="#dc2626" />
          <Text className="ml-2 font-medium text-[#dc2626]">keluar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Setting;
