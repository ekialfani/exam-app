/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GetTimeZone, ParseDateToIndonesianFormat } from "../../../utils/";
import { ParseTimeToIndonesianFormat } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import ParseExamSchedule from "../../../utils/ParseExamSchedule";
import { useDispatch, useSelector } from "react-redux";
import { getExamById, updateExam } from "../../../redux/slice/examSlice";

const EditExam = ({ route }) => {
  const { examId } = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const exam = useSelector((state) => state.exam);
  const token = useSelector((state) => state.auth.token);

  const [title, setTitle] = useState(exam.exam?.title);
  const [description, setDescription] = useState(exam.exam?.description);
  const [showDate, setShowDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [startDate, setStartDate] = useState(new Date(exam.exam?.start_time));
  const [startTime, setStartTime] = useState(new Date(exam.exam?.start_time));
  const [endTime, setEndTime] = useState(new Date(exam.exam?.end_time));
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    dispatch(getExamById({ examId, token }));
  }, [examId, token, dispatch]);

  const handleUpdateExam = () => {
    const updatedExam = {
      title: title,
      description: description,
      start_time: ParseExamSchedule(startDate, startTime),
      end_time: ParseExamSchedule(startDate, endTime),
    };

    dispatch(updateExam({ examId, updatedExam, token }));

    setTrigger(true);
  };

  useEffect(() => {
    if (trigger && exam.status === "succeeded") {
      navigation.navigate("AdminExamDetail", { examId: examId });
      setTrigger(false);
    }
  }, [trigger, exam.status]);

  const handleResetForm = () => {
    setTitle("");
    setDescription("");
    setStartDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date());
  };

  return (
    <ScrollView>
      <View className="items-center">
        <View className="bg-[#018675] w-5/6 h-32 rounded-md mt-5 items-center justify-center">
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
          {exam?.error && (
            <Text className="text-xs text-red-500 mt-2">
              {exam?.error?.message}
            </Text>
          )}

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
              onPress={handleUpdateExam}
            >
              {exam?.status == "loading" ? (
                <ActivityIndicator size="small" color="#fff" animating={true} />
              ) : (
                <Text className="font-medium uppercase text-white">simpan</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditExam;
