/* eslint-disable react/react-in-jsx-scope */
import { AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ParseDateToIndonesianFormat } from "../../../utils/Date";
import { GetTimeZone, ParseTimeToIndonesianFormat } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import ParseExamSchedule from "../../../utils/ParseExamSchedule";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuestion,
  createQuestionTemp,
  resetQuestionTemp,
} from "../../../redux/slice/questionSlice";
import { createExam } from "../../../redux/slice/examSlice";

const CreateExam = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [trigger, setTrigger] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { questionsTemp } = useSelector((state) => state.question);
  const token = useSelector((state) => state.auth.token);
  const exam = useSelector((state) => state.exam);

  const handleCreateExam = () => {
    const examData = {
      title: title,
      description: description,
      start_time: ParseExamSchedule(startDate, startTime),
      end_time: ParseExamSchedule(startDate, endTime),
    };

    dispatch(createExam({ examData, token }));
    setTrigger(true);
  };

  useEffect(() => {
    if (questionsTemp.length == 0) {
      const newQuestion = {
        id: 1,
        exam_id: null,
        question_text: "pertanyaan 1",
        first_option: "tekan untuk mengedit soal",
        second_option: null,
        third_option: null,
        fourth_option: null,
        correct_answer: null,
        point: 5,
      };

      dispatch(createQuestionTemp(newQuestion));
    }
  }, [questionsTemp]);

  useEffect(() => {
    if (trigger && exam.status === "succeeded") {
      questionsTemp.forEach((item, index) => {
        const questionData = {
          exam_id: exam.examCreated.id,
          question_text: item.question_text,
          first_option: item.first_option,
          second_option: item.second_option,
          third_option: item.third_option,
          fourth_option: item.fourth_option,
          correct_answer: item.correct_answer,
          point: parseInt(item.point),
        };

        dispatch(createQuestion({ questionData, token }));

        if (index == questionsTemp.length - 1) {
          handleResetForm();
          navigation.navigate("AdminExamDetail", {
            examId: exam.examCreated.id,
          });
        }
      });

      setTrigger(false);
    }
  }, [trigger, exam.status]);

  const handleResetForm = () => {
    setTitle("");
    setDescription("");
    setStartDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date());
    dispatch(resetQuestionTemp());
  };

  return (
    <ScrollView>
      <View className="items-center">
        <View className="bg-[#018675] w-5/6 h-36 rounded-md mt-5 items-center justify-center">
          <TouchableOpacity>
            <Text className="text-white font-medium capitalize">
              pilih gambar
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-5/6 mt-3">
          <View className="mb-5">
            <Text className="capitalize font-medium mb-2">judul ujian</Text>
            <TextInput
              className="bg-white px-3 py-2 rounded-md shadow-md focus:border-2 focus:border-[#018675]"
              value={title}
              placeholder="masukkan judul ujian"
              onChangeText={(text) => setTitle(text)}
            />
          </View>

          <View className="mb-5">
            <Text className="capitalize font-medium mb-2">deskripsi</Text>
            <TextInput
              className="bg-white px-3 py-5 rounded-md shadow-md focus:border-2 focus:border-[#018675]"
              value={description}
              placeholder="masukkan deskripsi ujian"
              onChangeText={(text) => setDescription(text)}
            />
          </View>

          <View className="mb-3 flex-row justify-between">
            <Text className="capitalize font-medium">tanggal ujian</Text>
            <View>
              <TouchableOpacity onPress={() => setShowDate(true)}>
                <Text className="font-medium capitalize">
                  {ParseDateToIndonesianFormat(startDate)}
                </Text>
              </TouchableOpacity>
              {showDate && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || startDate;
                    setShowDate(false);
                    setStartDate(currentDate);
                  }}
                />
              )}
              <View className="flex-row justify-end items-center gap-x-1">
                <TouchableOpacity onPress={() => setShowStartTime(true)}>
                  <Text className="text-xs font-medium text-slate-500 text-right">
                    {ParseTimeToIndonesianFormat(startTime)}
                  </Text>
                  {showStartTime && (
                    <DateTimePicker
                      value={startTime}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={(event, selectedTime) => {
                        const currentTime = selectedTime || startTime;
                        setShowStartTime(false);
                        setStartTime(currentTime);
                      }}
                    />
                  )}
                </TouchableOpacity>
                <View className="w-2 h-0.5 bg-slate-500" />
                <TouchableOpacity onPress={() => setShowEndTime(true)}>
                  <Text className="text-xs font-medium text-slate-500 text-right">
                    {ParseTimeToIndonesianFormat(endTime)}{" "}
                    {GetTimeZone(endTime)}
                  </Text>
                  {showEndTime && (
                    <DateTimePicker
                      value={endTime}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={(event, selectedTime) => {
                        const currentTime = selectedTime || endTime;
                        setShowEndTime(false);
                        setEndTime(currentTime);
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="w-full border-[0.3px] border-slate-300 mt-3 mb-3" />
          <View>
            <Text className="capitalize font-medium">pertanyaan</Text>
            <FlatList
              data={questionsTemp}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View className="bg-white mt-3 px-3 py-2 rounded-md flex-row justify-between items-center shadow-md">
                  <View>
                    <Text className="font-medium">{item.question_text}</Text>
                    {!item.second_option ? (
                      <Text className="text-xs text-slate-500 mt-1">
                        {item.first_option}
                      </Text>
                    ) : (
                      <View className="flex-row items-center mb-1 mt-1">
                        {item.first_option == item.correct_answer ? (
                          <Octicons name="dot-fill" size={15} color="#22c55e" />
                        ) : (
                          <Octicons name="dot-fill" size={15} color="#ef4444" />
                        )}

                        <Text className="text-xs text-slate-500 ml-2">
                          {item.first_option}
                        </Text>
                      </View>
                    )}

                    {item.second_option && (
                      <View className="flex-row items-center mb-1">
                        {item.second_option == item.correct_answer ? (
                          <Octicons name="dot-fill" size={15} color="#22c55e" />
                        ) : (
                          <Octicons name="dot-fill" size={15} color="#ef4444" />
                        )}

                        <Text className="text-xs text-slate-500 ml-2">
                          {item.second_option}
                        </Text>
                      </View>
                    )}
                    {item.third_option && (
                      <View className="flex-row items-center mb-1">
                        {item.third_option == item.correct_answer ? (
                          <Octicons name="dot-fill" size={15} color="#22c55e" />
                        ) : (
                          <Octicons name="dot-fill" size={15} color="#ef4444" />
                        )}

                        <Text className="text-xs text-slate-500 ml-2">
                          {item.third_option}
                        </Text>
                      </View>
                    )}
                    {item.fourth_option && (
                      <View className="flex-row items-center">
                        {item.fourth_option == item.correct_answer ? (
                          <Octicons name="dot-fill" size={15} color="#22c55e" />
                        ) : (
                          <Octicons name="dot-fill" size={15} color="#ef4444" />
                        )}

                        <Text className="text-xs text-slate-500 ml-2">
                          {item.fourth_option}
                        </Text>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("EditQuestion", { question: item })
                    }
                  >
                    <AntDesign name="edit" size={21} color="#FCA428" />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

          <TouchableOpacity
            className="border-2 border-dashed border-slate-500 mt-3 py-2 flex-row justify-center"
            onPress={() =>
              navigation.navigate("CreateQuestion", {
                examId: null,
                lastQuestionId: questionsTemp[questionsTemp.length - 1].id,
              })
            }
          >
            <Entypo name="plus" size={20} color="#64748b" />
            <Text className="capitalize font-medium ml-2 text-slate-500">
              tambah pertanyaan baru
            </Text>
          </TouchableOpacity>

          <Text
            className={`text-xs text-red-500 mt-2 ${
              exam?.error ? "opacity-1" : "opacity-0"
            }`}
          >
            {exam?.error?.message}
          </Text>

          <View className="flex-row mt-2 justify-between mb-10">
            <TouchableOpacity
              className="border-2 border-[#FCA428] px-5 py-1.5 rounded-md active:bg-[#FCA428] active:text-white transition ease-in"
              onPress={handleResetForm}
            >
              <Text className="font-medium capitalize text-[#FCA428]">
                reset
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#018675] py-2 rounded-md justify-center items-center w-32"
              onPress={handleCreateExam}
            >
              {exam?.status == "loading" ? (
                <ActivityIndicator size="small" color="#fff" animating={true} />
              ) : (
                <Text className="font-medium uppercase text-white">
                  buat ujian
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateExam;
