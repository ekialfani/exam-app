/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DaftarImage } from "../../assets";
import { useMemo, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import RadioGroup from "react-native-radio-buttons-group";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("Mahasiswa");
  const [isFocus, setIsFocus] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [gender, setGender] = useState("");
  const [major, setMajor] = useState("");
  const [classes, setClasses] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();

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

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="items-center">
        <Image source={DaftarImage} className="w-48 h-48 mt-5" />
        <Text className="text-center w-3/4 text-[#0F172A] text-[13px]">
          Dengan membuat akun, kami dapat menciptakan pengalaman terbaik khusus
          untuk anda.
        </Text>
        <View className="w-10/12 mt-10">
          <View className="mb-5">
            <Text className="font-bold text-[#0F172A]">Nama Panjang</Text>
            <TextInput
              className="bg-[#F5F5F5] px-3 py-2 text-slate-500 mt-2 rounded-md font-medium focus:text-[#018675] focus:border-2 focus:border-[#018675]"
              value={fullName}
              placeholder="Masukkan nama panjang"
              onChangeText={(text) => setFullName(text)}
            />
          </View>
          <View className="mb-5">
            <Text className="font-bold text-[#0F172A] mb-2">Status</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && styles.focus]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={[
                { label: "Mahasiswa", value: "Mahasiswa" },
                { label: "Dosen", value: "Dosen" },
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select item" : "..."}
              value={status}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setStatus(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <View className="mb-5">
            <Text className="font-bold text-[#0F172A] mb-2">Tanggal Lahir</Text>
            <TouchableOpacity
              className="bg-[#F5F5F5] px-3 py-2.5 rounded-md flex-row items-center justify-between"
              onPress={() => setShowDate(true)}
            >
              <Text className="font-medium text-slate-600">
                {dateOfBirth.getFullYear() == new Date().getFullYear()
                  ? "DD-MM-YY"
                  : `${dateOfBirth?.getDate()}-${dateOfBirth?.getMonth()}-${dateOfBirth?.getFullYear()}`}
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
          <View className="mb-5">
            <Text className="font-bold text-[#0F172A] mb-2">Jenis Kelamin</Text>
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
          {status == "Mahasiswa" && (
            <>
              <View className="mb-5">
                <Text className="font-bold text-[#0F172A]">Program Studi</Text>
                <TextInput
                  className="bg-[#F5F5F5] px-3 py-2 text-slate-500 mt-2 rounded-md font-medium focus:text-[#018675] focus:border-2 focus:border-[#018675]"
                  value={major}
                  placeholder="Masukkan program studi"
                  onChangeText={(text) => setMajor(text)}
                />
              </View>
              <View className="mb-5">
                <Text className="font-bold text-[#0F172A] mb-2">Kelas</Text>
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
                  placeholder={!isFocus ? "Select item" : "..."}
                  value={classes}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setClasses(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            </>
          )}
          <View className="mb-5">
            <Text className="font-bold text-[#0F172A]">Email</Text>
            <TextInput
              className="bg-[#F5F5F5] px-3 py-2 text-slate-500 mt-2 rounded-md font-medium focus:text-[#018675] focus:border-2 focus:border-[#018675]"
              value={email}
              placeholder="Masukkan email"
              inputMode="email"
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
            onPress={() => {
              if (status == "Mahasiswa") {
                console.log({
                  fullName,
                  status,
                  dateOfBirth,
                  gender: radioButtons.find((rb) => rb.id == selectedId).value,
                  major,
                  classes,
                  email,
                  password,
                });
              } else {
                console.log({
                  fullName,
                  status,
                  dateOfBirth,
                  gender,
                  email,
                  password,
                });
              }

              setFullName("");
              setStatus("Mahasiswa");
              setDateOfBirth(new Date());
              setSelectedId(1);
              setMajor("");
              setClasses("");
              setEmail("");
              setPassword("");
            }}
          >
            <Text className="text-white font-medium text-center py-2.5">
              Daftar
            </Text>
          </TouchableOpacity>
          <View className="mt-3 flex-row justify-center mb-10">
            <Text className="text-xs font-medium mr-1">
              Sudah memiliki akun?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-xs font-medium text-[#018675]">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    borderRadius: 8,
    paddingHorizontal: 9,
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
