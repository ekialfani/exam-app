/* eslint-disable react/react-in-jsx-scope */
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DecodeJwtToken from "../../../utils/DecodeJwtToken";
import { getStudentById } from "../../../redux/slice/studentSlice";
import {
  createExamAssignment,
  getExamByToken,
} from "../../../redux/slice/examSlice";

const data = [
  {
    id: 1,
    imgUrl:
      "https://th.bing.com/th/id/OIP.aCGFQmu_gL_TOAW69qrp1gHaDy?rs=1&pid=ImgDetMain",
    title: "dasar pemrograman",
    lecturer: "Otong, M.Kom",
    answer: "10/20",
    status: false,
  },
  {
    id: 2,
    imgUrl:
      "https://www.investopedia.com/thmb/J33BG-Cf03bW8-O4kXJfuht3gHA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/algorithm-df9b57e8ea7c494b891da25987643fab.jpg",
    title: "algoritma 2",
    lecturer: "Ucup, M.T",
    answer: "20/20",
    status: true,
  },
  {
    id: 3,
    imgUrl:
      "https://globalcloudteam.com/wp-content/uploads/2023/04/how-to-hire-a-kotlin-developer-tips-and-tricks-img-2-768x512.jpg",
    title: "pemrograman mobile",
    lecturer: "Adit, M.Kom",
    answer: "10/20",
    status: false,
  },
];

const Home = () => {
  const [examToken, setExamToken] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [isExamExist, setIsExamExist] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const student = useSelector((state) => state.student);
  const exam = useSelector((state) => state.exam);

  useEffect(() => {
    const parsedToken = DecodeJwtToken(token);
    dispatch(getStudentById({ studentId: parsedToken?.id, token }));
  }, [token, dispatch]);

  const handleExamClaim = () => {
    dispatch(getExamByToken({ examToken, token }));
    setTrigger(true);
  };

  useEffect(() => {
    if (trigger && exam.status === "succeeded") {
      dispatch(createExamAssignment({ examId: exam?.exam?.id, token }));
      setIsExamExist(true);
      setTrigger(false);
    }
  }, [trigger, exam.status, dispatch]);

  useEffect(() => {
    if (isExamExist && exam.status === "succeeded") {
      navigation.navigate("ExamDetail", {
        examId: exam?.examAssignment?.exam_id,
      });
      setIsExamExist(false);
      setExamToken("")
    }
  }, [isExamExist, exam.status]);

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <View className="bg-[#018675] h-[35vh] px-5 relative">
        <Text className="text-2xl mt-12 text-white font-medium">
          Selamat Datang
        </Text>
        <Text className="text-2xl text-white font-medium">
          {student?.student?.full_name}!
        </Text>

        <TouchableOpacity
          className="bg-white absolute right-5 w-[40px] h-[40px] rounded-full top-8 items-center justify-center border-2 border-[#93F3E8]"
          onPress={() => navigation.navigate("Setting")}
        >
          <Text className="text-xl font-bold text-[#018675] uppercase">
            {student?.student?.full_name?.charAt(0)}
          </Text>
        </TouchableOpacity>

        <View className="bg-white px-5 pt-5 pb-6 absolute top-[65%] left-5 right-5 rounded-md shadow-xl z-99">
          <Text className="text-lg font-medium">Masukkan kode ujian</Text>
          <Text className="w-9/12 text-xs text-slate-500">
            Silahkan masukkan kode ujian untuk memulai ujian
          </Text>
          <View className="flex-row mt-5 items-center gap-x-2">
            <TextInput
              className="bg-[#F2F2F2] flex-1 px-3 py-1.5 rounded-md focus:border-2 focus:border-[#018675]"
              placeholder="cth:c67Da"
              value={examToken}
              onChangeText={(text) => setExamToken(text)}
            />
            <TouchableOpacity
              className="bg-[#018675] w-16 items-center py-2.5 rounded-md"
              onPress={handleExamClaim}
            >
              {exam.status === "loading" ? (
                <ActivityIndicator animating={true} color="#fff" />
              ) : (
                <Text className="text-white font-medium">kirim</Text>
              )}
            </TouchableOpacity>
          </View>
          <Text
            className={`text-xs text-red-500 mt-2 ${
              exam?.error ? "opacity-1" : "opacity-0"
            }`}
          >
            Error: {exam?.error?.message}
          </Text>
        </View>
      </View>

      <View className="mt-24 px-5">
        <Text className="capitalize font-medium mt-2">riwayat ujian</Text>
        <Text className="text-slate-500 italic"></Text>
        <FlatList
          data={data}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity className="bg-white mb-3 flex-row p-3 rounded-md shadow-lg">
              <Image source={{ uri: item.imgUrl }} className="w-20" />
              <View className="ml-3">
                <Text className="capitalize font-bold">{item.title}</Text>
                <Text className="text-xs font-medium mb-1">
                  {item.lecturer}
                </Text>
                <Text className="text-xs text-slate-500">
                  {item.answer} pertanyaan
                </Text>
                {item.status ? (
                  <Text className="w-20 text-center capitalize text-[10px] border border-green-600 rounded-full text-green-600 font-medium mt-2">
                    selesai
                  </Text>
                ) : (
                  <Text className="w-20 text-center capitalize text-[10px] border border-red-500 rounded-full text-red-500 font-medium mt-2">
                    belum selesai
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
