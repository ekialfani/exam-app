/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteExam, getExamById } from "../../../redux/slice/examSlice";
import {
  GetTimeZone,
  ParseDateToIndonesianFormat,
  ParseTimeToIndonesianFormat,
} from "../../../utils";
import {
  deleteQuestion,
  getQuestionsByExamId,
} from "../../../redux/slice/questionSlice";
import { useIsFocused } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";

const AdminExamDetail = ({ route, navigation }) => {
  const { examId } = route.params;
  const isFocused = useIsFocused();

  const [visibleAnswers, setVisibleAnswers] = useState([]);
  const dispatch = useDispatch();
  const exam = useSelector((state) => state.exam);
  const question = useSelector((state) => state.question);
  const token = useSelector((state) => state.auth.token);
  const [trigger, setTrigger] = useState(false);
  const [triggerDeleteExam, setTriggerDeleteExam] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  useEffect(() => {
    if (isFocused || trigger) {
      dispatch(getExamById({ examId: examId, token }));
      dispatch(getQuestionsByExamId({ examId: examId, token }));
    }
  }, [isFocused, examId, token, dispatch, trigger]);

  const toggleAnswerVisibility = (id) => {
    if (visibleAnswers.includes(id)) {
      setVisibleAnswers(visibleAnswers.filter((answerId) => answerId !== id));
    } else {
      setVisibleAnswers([...visibleAnswers, id]);
    }
  };

  const showDeleteExamAlert = () => {
    Alert.alert("Hapus Ujian", "Apakah anda yakin ingin menghapus ujian ini?", [
      { text: "Batal" },
      {
        text: "Ya",
        onPress: () => {
          dispatch(deleteExam({ examId, token }));
          setTriggerDeleteExam(true);
        },
      },
    ]);
  };

  useEffect(() => {
    if (triggerDeleteExam && exam.status === "succeeded") {
      ToastAndroid.show(exam?.message?.message, ToastAndroid.LONG);
      setTriggerDeleteExam(false);
      navigation.navigate("Dashboard");
      return;
    }

    if (triggerDeleteExam && exam.status === "failed") {
      ToastAndroid.show(exam?.error?.message, ToastAndroid.LONG);
      setTriggerDeleteExam(false);
      return;
    }
  }, [triggerDeleteExam, exam.status, exam.message, exam.error]);

  const showAlert = (questionId) => {
    Alert.alert(
      "Hapus Pertanyaan",
      "Apakah ada yakin ingin menghapus pertanyaan ini?",
      [
        { text: "Batal" },
        {
          text: "Ya",
          onPress: () => {
            dispatch(deleteQuestion({ questionId, token }));
            setTrigger(true);
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (trigger && question.status === "succeeded") {
      ToastAndroid.show(question?.message?.message, ToastAndroid.LONG);
      setTrigger(false);
      return;
    }

    if (trigger && question?.status === "failed") {
      ToastAndroid.show(question?.error?.message, ToastAndroid.LONG);
      setTrigger(false);
      return;
    }
  }, [trigger, question.status, question.message, question.error]);

  const copiedToClipboard = async () => {
    await Clipboard.setStringAsync(exam?.exam?.token);
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  const shareViaWhatsApp = () => {
    const url = `whatsapp://send?text=${encodeURIComponent(exam?.exam?.token)}`;
    Linking.openURL(url)
      .then(() => console.log("membuka whatsapp"))
      .catch(() => console.log("gagal membuka whatsapp"));
  };

  const shareViaTelegram = () => {
    const url = `tg://msg?text=${encodeURIComponent(exam?.exam?.token)}`;
    Linking.openURL(url)
      .then(() => console.log("membuka telegram"))
      .catch(() => console.log("gagal membuka telegram"));
  };

  const shareViaEmail = () => {
    const email = "example@gmail.com";
    const subject = "subject here";
    const body = exam?.exam?.token;
    const url = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    Linking.openURL(url)
      .then(() => console.log("membuka gmail"))
      .catch(() => console.log("gagal membuka gmail"));
  };

  return (
    <ScrollView className="flex-1">
      <View className="items-center">
        <View className="w-5/6 mt-5">
          <View className="border-b border-slate-300 pb-5 mb-10">
            <Image
              className="w-full h-40 rounded-md"
              source={{
                uri: exam?.exam?.background_image
                  ? exam.exam.background_image
                  : "https://www.thebluediamondgallery.com/wooden-tile/images/exam.jpg",
              }}
            />
            <View className="mt-3">
              <Text className="font-bold text-lg">{exam.exam?.title}</Text>
              <Text className="font-medium text-slate-600 mb-2">
                {exam.exam?.lecturer?.full_name}
              </Text>
              <Text className="text-xs text-slate-400">
                {exam.exam?.description}
              </Text>

              <View className="mt-3">
                <View className="flex-row justify-between mb-2 items-start">
                  <View className="flex-row items-center w-1/2">
                    <MaterialIcons
                      name="date-range"
                      size={16}
                      color="#64748b"
                    />
                    <Text className="text-slate-500 text-[13px] ml-1 capitalize">
                      {ParseDateToIndonesianFormat(
                        new Date(exam.exam?.start_time)
                      )}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <MaterialIcons name="schedule" size={16} color="#64748b" />
                    <Text className="text-[13px] text-slate-500 ml-1">
                      {ParseTimeToIndonesianFormat(
                        new Date(exam.exam?.start_time)
                      )}
                      -
                      {ParseTimeToIndonesianFormat(
                        new Date(exam.exam?.end_time)
                      )}{" "}
                      {GetTimeZone(new Date(exam?.exam?.end_time))}
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between">
                  <View className="flex-row items-center">
                    <Octicons name="question" size={14} color="#64748b" />
                    <Text className="ml-1 text-[13px] text-slate-500">
                      {question.questions?.length} Pertanyaan
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row mt-5">
                <TouchableOpacity
                  className="bg-[#018675] flex-row px-3 py-2 mr-5 items-center rounded-md"
                  onPress={() => setShowModal(true)}
                >
                  <MaterialIcons name="share" size={20} color="#fff" />
                  <Text className="text-white capitalize font-medium ml-2">
                    sebarkan
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className=" flex-row px-3 py-1 items-center rounded-md border-2 border-[#018675]"
                  onPress={() =>
                    navigation.navigate("EditExam", { examId: examId })
                  }
                >
                  <AntDesign name="edit" size={20} color="#018675" />
                  <Text className="ml-2 font-medium capitalize text-[#018675]">
                    edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className=" flex-row px-3 py-1 items-center rounded-md border-2 border-[#dc2626] ml-2"
                  onPress={showDeleteExamAlert}
                >
                  <FontAwesome name="trash" size={20} color="#dc2626" />
                  <Text className="ml-2 font-medium capitalize text-[#dc2626]">
                    hapus
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="mt-5">
            <View className="flex-row justify-between items-center mb-5">
              <Text className="capitalize font-medium text-lg">pertanyaan</Text>
              <TouchableOpacity
                className="border-2 border-slate-500 flex-row px-1.5 py-1 rounded-md items-center"
                onPress={() =>
                  navigation.navigate("CreateQuestion", {
                    examId: examId,
                    lastQuestionId: null,
                  })
                }
              >
                <Entypo name="plus" size={20} color="#64748b" />
                <Text className="text-xs capitalize font-bold text-slate-500">
                  pertanyaan baru
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              scrollEnabled={false}
              data={question?.questions}
              keyExtractor={(item) => item?.id?.toString()}
              renderItem={({ item }) => {
                const isAnswerVisible = visibleAnswers.includes(item.id);

                return (
                  <View className="bg-white mb-5 rounded-md shadow-md">
                    <View className="flex-row items-center justify-between bg-gray-400 px-3 py-2 rounded-t-md">
                      <View className="flex-row items-center">
                        <Text className="capitalize text-slate-200 mr-2">
                          tampilkan jawaban
                        </Text>
                        <TouchableOpacity
                          onPress={() => toggleAnswerVisibility(item.id)}
                        >
                          {isAnswerVisible ? (
                            <MaterialCommunityIcons
                              name="toggle-switch"
                              size={35}
                              color="#018675"
                            />
                          ) : (
                            <MaterialCommunityIcons
                              name="toggle-switch-off"
                              size={35}
                              color="#cbd5e1"
                            />
                          )}
                        </TouchableOpacity>
                      </View>

                      <View className="flex-row items-center">
                        <TouchableOpacity
                          className="mr-2"
                          onPress={() =>
                            navigation.navigate("EditQuestion", {
                              question: item,
                            })
                          }
                        >
                          <FontAwesome name="edit" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showAlert(item.id)}>
                          <MaterialIcons
                            name="delete"
                            size={20}
                            color="#ef4444"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View className="px-3 py-2">
                      <View className="flex-row justify-between mb-3">
                        <View className="flex-row items-center">
                          <FontAwesome name="list" size={13} color="#018675" />
                          <Text className="text-slate-500 ml-1 text-xs font-medium">
                            Pilihan ganda
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <FontAwesome name="star" size={14} color="#FCA428" />
                          <Text className="text-slate-500 text-xs ml-1 font-medium">
                            {item.point} Point
                          </Text>
                        </View>
                      </View>

                      <Text className="font-medium mb-1">
                        {item.question_text}
                      </Text>

                      <View className="flex-row items-center">
                        {isAnswerVisible &&
                        item.first_option == item.correct_answer ? (
                          <Octicons name="dot-fill" size={18} color="#22c55e" />
                        ) : (
                          <Octicons name="dot-fill" size={18} color="#64748b" />
                        )}
                        <Text className="text-slate-500 ml-2">
                          {item.first_option}
                        </Text>
                      </View>

                      <View className="flex-row items-center">
                        {isAnswerVisible &&
                        item.second_option == item.correct_answer ? (
                          <Octicons name="dot-fill" size={18} color="#22c55e" />
                        ) : (
                          <Octicons name="dot-fill" size={18} color="#64748b" />
                        )}
                        <Text className="text-slate-500 ml-2">
                          {item.second_option}
                        </Text>
                      </View>

                      <View className="flex-row items-center">
                        {isAnswerVisible &&
                        item.third_option == item.correct_answer ? (
                          <Octicons name="dot-fill" size={18} color="#22c55e" />
                        ) : (
                          <Octicons name="dot-fill" size={18} color="#64748b" />
                        )}
                        <Text className="text-slate-500 ml-2">
                          {item.third_option}
                        </Text>
                      </View>

                      <View className="flex-row items-center">
                        {isAnswerVisible &&
                        item.fourth_option == item.correct_answer ? (
                          <Octicons name="dot-fill" size={18} color="#22c55e" />
                        ) : (
                          <Octicons name="dot-fill" size={18} color="#64748b" />
                        )}
                        <Text className="text-slate-500 ml-2">
                          {item.fourth_option}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
      {showModal && (
        <View className="absolute top-0 w-screen h-screen bg-black/50 z-100 items-center justify-center">
          <View className="bg-white px-5 py-6 w-5/6 rounded-md">
            <Text className="mb-3">Bagikan token ujian</Text>
            <View className="flex-row items-center justify-between gap-x-3">
              <View className="border border-slate-300 px-3 py-2 bg-slate-100 flex-1">
                <Text className="text-slate-500">{exam?.exam?.token}</Text>
              </View>
              <TouchableOpacity
                className="items-center w-10"
                onPress={copiedToClipboard}
              >
                {copiedText ? (
                  <>
                    <Feather name="check" size={20} color="#16a34a" />
                    <Text className="text-slate-500 text-xs">copied</Text>
                  </>
                ) : (
                  <>
                    <MaterialIcons
                      name="content-copy"
                      size={20}
                      color="#64748b"
                    />
                    <Text className="text-slate-500 text-xs">copy</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
            <Text className="text-xs mt-2">Atau bagikan via</Text>
            <View className="flex-row items-center mt-2 gap-x-2">
              <TouchableOpacity
                className="w-8 h-8 border border-green-700 rounded-full items-center justify-center"
                onPress={shareViaWhatsApp}
              >
                <FontAwesome5 name="whatsapp" size={16} color="green" />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-8 h-8 border border-cyan-600 rounded-full items-center justify-center"
                onPress={shareViaTelegram}
              >
                <FontAwesome5 name="telegram-plane" size={16} color="#0891b2" />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-8 h-8 border border-red-500 rounded-full items-center justify-center"
                onPress={shareViaEmail}
              >
                <MaterialCommunityIcons
                  name="email-outline"
                  size={16}
                  color="#ef4444"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="absolute top-2 right-2"
              onPress={() => {
                setShowModal(false);
                setCopiedText("");
              }}
            >
              <MaterialIcons name="close" size={16} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default AdminExamDetail;
