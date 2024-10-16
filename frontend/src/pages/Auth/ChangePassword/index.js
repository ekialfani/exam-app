/* eslint-disable react/react-in-jsx-scope */
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DecodeJwtToken from "../../../utils/DecodeJwtToken";
import { useDispatch, useSelector } from "react-redux";
import { changeLecturerPassword } from "../../../redux/slice/lecturerSlice";
import { useNavigation } from "@react-navigation/native";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(false);
  const [secureTextConfirmPassword, setSecureTextConfirmPassword] =
    useState(false);
  const [trigger, setTrigger] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state?.auth?.token);
  const lecturer = useSelector((state) => state.lecturer);

  useEffect(() => {
    if (trigger && lecturer.status === "succeeded") {
      navigation.goBack();
      setTrigger(false);
      setPassword("");
      setConfirmPassword("");
    }
  }, [trigger, lecturer.status]);

  const handleChangePassword = () => {
    const parsedToken = DecodeJwtToken(token);

    if (parsedToken.role === "Dosen") {
      dispatch(
        changeLecturerPassword({
          lecturerId: parsedToken.id,
          newPassword: { password },
          token,
        })
      );
      setTrigger(true);
      return;
    }
  };

  return (
    <View className="flex-1 bg-white px-5 py-5">
      <Text className="text-2xl font-semibold capitalize">
        buat password baru
      </Text>
      <Text className="text-slate-500 mt-2">
        Kata sandi baru Anda harus berbeda dari kata sandi yang pernah digunakan
        sebelumnya.
      </Text>
      <View className="mb-5 mt-5">
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
        {password.length <= 6 && (
          <Text className="mt-1 text-xs text-red-500">
            Password harus lebih dari 6 karakter
          </Text>
        )}
      </View>
      <View className="mb-5">
        <Text className="font-bold text-[#0F172A]">Konfirmasi Password</Text>
        <View className="relative">
          <TextInput
            className="bg-[#F5F5F5] pl-3 pr-10 py-2 mt-2 rounded-md font-medium text-[#018675] focus:border-2 focus:border-[#018675]"
            value={confirmPassword}
            placeholder="Masukkan password"
            secureTextEntry={secureTextConfirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            className="absolute top-2 bottom-0 right-0 justify-center z-2 pr-3"
            onPress={() =>
              setSecureTextConfirmPassword(!secureTextConfirmPassword)
            }
          >
            {secureTextConfirmPassword ? (
              <Ionicons name="eye-off" size={18} color={"#B4B9C2"} />
            ) : (
              <Ionicons name="eye" size={18} color={"#018675"} />
            )}
          </TouchableOpacity>
        </View>
        {password !== confirmPassword && (
          <Text className="mt-1 text-xs text-red-500">
            Kedua password harus sama
          </Text>
        )}
      </View>
      <TouchableOpacity
        className="bg-[#018675] py-3 rounded-md"
        onPress={handleChangePassword}
      >
        {lecturer?.status === "loading" ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-center capitalize text-white font-semibold">
            Reset Password
          </Text>
        )}
      </TouchableOpacity>
      {lecturer?.error && (
        <Text className="mt-2 text-xs text-red-500">
          {lecturer?.error?.message}
        </Text>
      )}
    </View>
  );
};

export default ChangePassword;
