/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getStudentById } from "../../../redux/slice/studentSlice";
import { ParseDateOfBirth } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

const UserProfile = ({ route }) => {
  const { studentId } = route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const student = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getStudentById({ studentId, token }));
  }, [token, dispatch]);

  return (
    <ScrollView className="flex-1">
      <View className="items-center my-5">
        <View className="w-5/6 -mb-0.5">
          <View className="w-20 h-20 border-2 border-white rounded-full items-center justify-center mx-auto bg-[#018675]">
            <Text className="text-4xl text-white uppercase">
              {student?.student?.full_name?.charAt(0)}
            </Text>
          </View>

          <View className="mt-10 mb-3">
            <Text className="mb-3 font-medium">Nama Panjang</Text>
            <View className="bg-white px-3 py-3 rounded-md">
              <Text className="text-slate-500">{student?.student?.full_name}</Text>
            </View>
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">NIM</Text>
            <View className="bg-white px-3 py-3 rounded-md">
              <Text className="text-slate-500">{student?.student?.nim}</Text>
            </View>
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">Tanggal Lahir</Text>
            <View className="bg-white px-3 py-3 rounded-md">
              <Text className="text-slate-500">
                {ParseDateOfBirth(new Date(student?.student?.date_of_birth))
                  .toString()
                  .padStart(2, "0")}
              </Text>
            </View>
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">Jenis Kelamin</Text>
            <View className="bg-white px-3 py-3 rounded-md">
              <Text className="text-slate-500">{student?.student?.gender}</Text>
            </View>
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">Program Studi</Text>
            <View className="bg-white px-3 py-3 rounded-md">
              <Text className="text-slate-500">{student?.student?.major}</Text>
            </View>
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">Semester</Text>
            <View className="bg-white px-3 py-3 rounded-md">
              <Text className="text-slate-500">{student?.student?.semester}</Text>
            </View>
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">Kelas</Text>
            <View className="bg-white px-3 py-3 rounded-md">
              <Text className="text-slate-500">{student?.student?.class}</Text>
            </View>
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">Email</Text>
            <View className="bg-white px-3 py-3 rounded-md">
              <Text className="text-slate-500">{student?.student?.email}</Text>
            </View>
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">Status</Text>
            <View className="bg-white px-3 py-3 rounded-md">
              <Text className="text-slate-500">{student?.student?.role}</Text>
            </View>
          </View>

          <TouchableOpacity
            className="py-2.5 bg-[#018675] w-24 items-center mt-2 rounded-md"
            onPress={() =>
              navigation.navigate("EditUserProfile", { user: student?.student })
            }
          >
            <Text className="text-white font-medium">Edit Profil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfile;
