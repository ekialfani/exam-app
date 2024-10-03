/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ParseDateOfBirth } from "../../../utils";
import { useEffect, useMemo, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioGroup } from "react-native-radio-buttons-group";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import DecodeJwtToken from "../../../utils/DecodeJwtToken";
import { updateStudent } from "../../../redux/slice/studentSlice";

const EditUserProfile = ({ route }) => {
  const { user } = route.params;

  const [fullName, setFullName] = useState(user?.full_name);
  const [NIM, setNIM] = useState(user?.nim);
  const [showDate, setShowDate] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(user?.date_of_birth));
  const [selectedId, setSelectedId] = useState(
    user?.gender === "Laki-Laki" ? "1" : "2"
  );
  const [gender, setGender] = useState(user?.gender);
  const [major, setMajor] = useState(user?.major);
  const [isFocus, setIsFocus] = useState(false);
  const [semester, setSemester] = useState(user?.semester);
  const [studentClass, setStudentClass] = useState(user?.class);
  const [email, setEmail] = useState(user?.email);
  const [trigger, setTrigger] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const student = useSelector((state) => state.student);
  const token = useSelector((state) => state.auth.token);

  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Laki-Laki",
        value: "Laki-Laki",
        size: 15,
        labelStyle: {
          fontWeight: "600",
          color: "#64748b",
        },
        borderColor: "#64748b",
      },
      {
        id: "2",
        label: "Perempuan",
        value: "Perempuan",
        size: 15,
        labelStyle: {
          fontWeight: "600",
          color: "#64748b",
        },
        borderColor: "#64748b",
      },
    ],
    []
  );

  const handleUpdateProfile = () => {
    const updatedStudent = {
      full_name: fullName,
      nim: NIM,
      date_of_birth: ParseDateOfBirth(dateOfBirth),
      gender: gender,
      major: major,
      semester: semester,
      class: studentClass,
      email: email,
    };

    const parsedToken = DecodeJwtToken(token);

    dispatch(
      updateStudent({ studentId: parsedToken?.id, updatedStudent, token })
    );

    setTrigger(true);
  };

  useEffect(() => {
    if (trigger && student.status === "succeeded") {
      navigation.navigate("UserProfile", { studentId: user.id });
      setTrigger(false);
    }
  }, [trigger, student.status]);

  return (
    <ScrollView className="flex-1">
      <View className="items-center mt-5 mb-10">
        <View className="w-5/6">
          <View className="mb-3">
            <Text className="mb-3 font-medium">Nama Panjang</Text>
            <TextInput
              className="bg-white px-3 py-2.5 rounded-md text-slate-500 border border-slate-300 focus:border-2 focus:border-[#018675]"
              value={fullName}
              placeholder="masukkan nama panjang"
              onChangeText={(text) => setFullName(text)}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">NIM</Text>
            <TextInput
              className="bg-white px-3 py-2.5 rounded-md text-slate-500 border border-slate-300 focus:border-2 focus:border-[#018675]"
              value={NIM}
              placeholder="masukkan nim"
              onChangeText={(text) => setNIM(text)}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">Tanggal Lahir</Text>
            <TouchableOpacity
              className="bg-white px-3 py-3 rounded-md text-slate-500 border border-slate-300 focus:border-2 focus:border-[#018675] flex-row items-center justify-between"
              onPress={() => setShowDate(true)}
            >
              <Text className="text-slate-500">
                {ParseDateOfBirth(dateOfBirth)}
              </Text>
              <MaterialIcons name="date-range" size={23} color="#64748b" />
            </TouchableOpacity>
            {showDate && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || dateOfBirth;
                  setShowDate(false);
                  setDateOfBirth(currentDate);
                }}
              />
            )}
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">Jenis Kelamin</Text>
            <RadioGroup
              containerStyle={{ flexDirection: "row" }}
              radioButtons={radioButtons}
              onPress={(selectedId) => {
                setSelectedId(selectedId);
                setGender(radioButtons.find((rb) => rb.id == selectedId).value);
              }}
              selectedId={selectedId}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">Program Studi</Text>
            <TextInput
              className="bg-white px-3 py-2.5 rounded-md text-slate-500 border border-slate-300 focus:border-2 focus:border-[#018675]"
              value={major}
              placeholder="masukkan program studi"
              onChangeText={(text) => setMajor(text)}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">Semester</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && styles.focus]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
                { label: "6", value: "6" },
                { label: "7", value: "7" },
                { label: "8", value: "8" },
                { label: "9", value: "9" },
                { label: "10", value: "10" },
                { label: "11", value: "11" },
                { label: "12", value: "12" },
                { label: "13", value: "13" },
                { label: "14", value: "14" },
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? semester : semester}
              value={semester}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setSemester(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">Kelas</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && styles.focus]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={[
                { label: "A", value: "A" },
                { label: "B", value: "B" },
                { label: "C", value: "C" },
                { label: "D", value: "D" },
                { label: "E", value: "E" },
                { label: "F", value: "F" },
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? studentClass : studentClass}
              value={studentClass}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setStudentClass(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-3 font-medium">Email</Text>
            <TextInput
              className="bg-white px-3 py-2.5 rounded-md text-slate-500 border border-slate-300 focus:border-2 focus:border-[#018675]"
              value={email}
              placeholder="masukkan email"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          {student?.error && (
            <Text className="text-red-500">{student?.error?.message}</Text>
          )}

          <TouchableOpacity
            className="py-2.5 bg-[#018675] w-24 items-center mt-3 rounded-md"
            onPress={handleUpdateProfile}
          >
            {student?.status === "loading" ? (
              <ActivityIndicator animating={true} size="small" color="#fff" />
            ) : (
              <Text className="text-white font-medium">Simpan</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditUserProfile;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 8,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#cbd5e1",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 15,
    fontWeight: "500",
  },
  selectedTextStyle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#64748b",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
    fontWeight: "500",
  },
  focus: {
    borderColor: "#018675",
    borderWidth: 2,
  },
});
