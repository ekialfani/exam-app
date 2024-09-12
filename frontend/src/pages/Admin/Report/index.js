/* eslint-disable react/react-in-jsx-scope */
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slice/authSlice";
import { useEffect } from "react";

const Report = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.token) {
      navigation.navigate("Login");
    }
  }, [auth]);

  const handleUserLogout = () => {
    dispatch(logout());
  };

  return (
    <View className="items-center">
      <Text>Halaman Laporan</Text>
      <TouchableOpacity
        className="bg-[#018675] py-2 rounded-md w-32 mt-5"
        onPress={handleUserLogout}
      >
        <Text className="text-center font-bold text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Report;
