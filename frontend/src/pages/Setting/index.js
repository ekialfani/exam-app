/* eslint-disable react/react-in-jsx-scope */
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import { useEffect } from "react";

const Setting = () => {
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
      <Text>Halaman pengaturan</Text>
      <TouchableOpacity
        className="w-32 bg-[#018675] mt-5 py-2 rounded-md"
        onPress={handleUserLogout}
      >
        <Text className="text-center font-bold text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
