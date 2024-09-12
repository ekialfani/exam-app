/* eslint-disable react/react-in-jsx-scope */
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LoginImage } from "../../../assets";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slice/authSlice";
import DecodeJwtToken from "../../../utils/DecodeJwtToken";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUserLogin = () => {
    dispatch(login({ email, password }));
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (auth.token) {
      const decodedToken = DecodeJwtToken(auth.token);
      if (decodedToken.role == "Dosen") {
        navigation.navigate("AdminPage", {
          userId: decodedToken.id,
        });
      } else {
        navigation.navigate("MainPage", {
          userId: decodedToken.id,
        });
      }

      resetForm();
    }
  }, [auth.token]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="items-center">
        <Image source={LoginImage} className="w-48 h-48 mt-5" />
        <Text className="font-bold text-[16px]">Selamat Datang</Text>
        <View className="w-10/12">
          <View className="mb-5 mt-5">
            <Text className="font-bold text-[#0F172A]">Email</Text>
            <TextInput
              className="bg-[#F5F5F5] px-3 py-2 mt-2 rounded-md font-medium text-[#018675] focus:border-2 focus:border-[#018675]"
              value={email}
              placeholder="Masukkan email"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View className="mb-5">
            <Text className="font-bold text-[#0F172A]">Password</Text>
            <View className="relative">
              <TextInput
                className="bg-[#F5F5F5] pl-3 pr-10 py-2 mt-2 rounded-md font-medium text-[#018675] focus:border-2 focus:border-[#018675]"
                value={password}
                placeholder="Masukkan password"
                secureTextEntry={secureText}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity
                className="absolute top-2 bottom-0 right-0 justify-center z-2 pr-3"
                onPress={() => setSecureText(!secureText)}
              >
                {secureText ? (
                  <Ionicons name="eye-off" size={18} color={"#B4B9C2"} />
                ) : (
                  <Ionicons name="eye" size={18} color={"#018675"} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            className="bg-[#018675] rounded-md"
            onPress={handleUserLogin}
          >
            {auth?.status == "loading" ? (
              <ActivityIndicator
                className="py-2.5 font-bold"
                size="small"
                color="#fff"
                animating={true}
              />
            ) : (
              <Text className="text-white font-medium text-center py-2.5">
                Login
              </Text>
            )}
          </TouchableOpacity>
          {auth.error?.message && (
            <Text className="text-red-500 mt-2">{auth.error.message}</Text>
          )}
          <View className="mt-3 flex-row justify-center">
            <Text className="text-xs font-medium mr-1">
              Belum memiliki akun?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Daftar")}>
              <Text className="text-xs font-medium text-[#018675]">Daftar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
