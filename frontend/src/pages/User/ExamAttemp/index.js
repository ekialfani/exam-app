/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateExamResult,
  createExamResult,
  createUserAnswerTemp,
  resetUserAnswerTemp,
} from "../../../redux/slice/examResultSlice";
import DecodeJwtToken from "../../../utils/DecodeJwtToken";

const ExamAttemp = ({ route, navigation }) => {
  // Utility function untuk menghitung rentang waktu
  const calculateTimeRemaining = (startTime, endTime) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    return end - start;
  };

  // Utility function untuk memulai countdown
  const startCountdownTimer = (initialTime, setTimeRemaining) => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1000;
        if (newTime <= 0) {
          clearInterval(interval); // Hentikan interval jika waktu habis
          return 0;
        }
        return newTime;
      });
    }, 1000);

    // Mengembalikan fungsi untuk menghentikan interval (clean-up)
    return () => clearInterval(interval);
  };

  const { exam } = route.params;
  const [answer, setAnswer] = useState("");
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();
  const result = useSelector((state) => state.result);
  const token = useSelector((state) => state.auth.token);
  const [trigger, setTrigger] = useState(false);

  // Menginisialisasi start dan end time
  const startTime = new Date(exam?.start_time);
  const endTime = new Date(exam?.end_time);

  // Menghitung rentang waktu awal dalam milidetik
  const initialTimeDifference = calculateTimeRemaining(startTime, endTime);

  // State untuk menyimpan sisa waktu dalam milidetik
  const [timeRemaining, setTimeRemaining] = useState(initialTimeDifference);

  useEffect(() => {
    // Memulai countdown
    const cleanup = startCountdownTimer(
      initialTimeDifference,
      setTimeRemaining
    );

    // Bersihkan interval saat komponen di-unmount
    return cleanup;
  }, [initialTimeDifference]);

  const hourRemaining = Math.floor(timeRemaining / (1000 * 60 * 60)); // Sisa jam
  const minutesRemaining = Math.floor(
    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
  ); // Sisa menit tidak lebih dari 60
  const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000); // Sisa detik

  useEffect(() => {
    navigation.setOptions({ title: exam.title });
  }, [navigation, exam]);

  useEffect(() => {
    if (trigger && result.status === "succeeded") {
      dispatch(resetUserAnswerTemp());
      navigation.navigate("ExamResult", { result: result?.examResult });
      setTrigger(false);
    }
  }, [trigger, result.status]);

  const handleAnswerTemp = (question) => {
    const answerData = {
      id: question.id,
      exam_id: question?.exam_id,
      question_text: question.question_text,
      first_option: question.first_option,
      second_option: question.second_option,
      third_option: question.third_option,
      point: question.point,
      user_answer: answer,
      correct_answer: question.correct_answer,
      index: index,
    };

    dispatch(createUserAnswerTemp({ answerData }));
  };

  const handlePrevButton = () => {
    setAnswer(result?.userAnswersTemp[index - 1]?.user_answer);
    setIndex(index - 1);
    handleAnswerTemp(exam?.Questions[index]);
  };

  const handleNextButton = () => {
    setAnswer(result?.userAnswersTemp[index + 1]?.user_answer);
    setIndex(index + 1);
    handleAnswerTemp(exam?.Questions[index]);
  };

  useEffect(() => {
    if (result.calculationStatus === "succeeded") {
      const parsedToken = DecodeJwtToken(token);
      const examResult = {
        student_id: parsedToken.id,
        exam_id: exam.id,
        grade: result?.calculationResult?.grade,
        total_correct: result?.calculationResult?.total_correct,
        total_incorrect: result?.calculationResult?.total_incorrect,
        exam_date: new Date(),
      };

      dispatch(createExamResult({ examResult, token }));
      setTrigger(true);
    }
  }, [result.calculationStatus]);

  const handleSubmitAnswer = () => {
    dispatch(calculateExamResult());
  };

  return (
    <ScrollView>
      <View className="p-5">
        <View className="flex-row items-center justify-between">
          <Text className="font-medium capitalize text-[#FCA428]">
            pertanyaan {index + 1}/{exam?.Questions?.length}
          </Text>
          <View className="flex-row items-center border-2 border-[#018675] px-3 rounded-full">
            <MaterialCommunityIcons
              name="clock-time-five"
              size={16}
              color="#018675"
            />
            <Text className="ml-1 font-bold text-[#018675]">
              {hourRemaining.toString().padStart(2, "0")}:{" "}
              {minutesRemaining.toString().padStart(2, "0")}:{" "}
              {secondsRemaining.toString().padStart(2, "0")}
            </Text>
          </View>
        </View>
        <Text className="mt-5 font-medium text-lg">
          {exam?.Questions[index].question_text}
        </Text>
        <View className="mt-5">
          <TouchableOpacity
            className={`${
              answer === exam?.Questions[index].first_option
                ? "bg-[#018675]"
                : "bg-white"
            } shadow-lg p-4 flex-row items-center rounded-md border border-[#DDDDDD] mb-2.5`}
            onPress={() => setAnswer(exam?.Questions[index].first_option)}
          >
            {answer === exam?.Questions[index].first_option ? (
              <FontAwesome name="dot-circle-o" size={20} color="#fff" />
            ) : (
              <FontAwesome name="circle-o" size={20} color="#0F172A" />
            )}
            <Text
              className={`ml-3 font-medium ${
                answer === exam?.Questions[index].first_option
                  ? "text-white"
                  : "text-[#0F172A]"
              }`}
            >
              {exam?.Questions[index].first_option}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`${
              answer === exam?.Questions[index].second_option
                ? "bg-[#018675]"
                : "bg-white"
            } shadow-lg p-4 flex-row items-center rounded-md border border-[#DDDDDD] mb-2.5`}
            onPress={() => setAnswer(exam?.Questions[index].second_option)}
          >
            {answer === exam?.Questions[index].second_option ? (
              <FontAwesome name="dot-circle-o" size={20} color="#fff" />
            ) : (
              <FontAwesome name="circle-o" size={20} color="#0F172A" />
            )}
            <Text
              className={`ml-3 font-medium ${
                answer === exam?.Questions[index].second_option
                  ? "text-white"
                  : "text-[#0F172A]"
              }`}
            >
              {exam?.Questions[index].second_option}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`${
              answer === exam?.Questions[index].third_option
                ? "bg-[#018675]"
                : "bg-white"
            } shadow-lg p-4 flex-row items-center rounded-md border border-[#DDDDDD] mb-2.5`}
            onPress={() => setAnswer(exam?.Questions[index].third_option)}
          >
            {answer === exam?.Questions[index].third_option ? (
              <FontAwesome name="dot-circle-o" size={20} color="#fff" />
            ) : (
              <FontAwesome name="circle-o" size={20} color="#0F172A" />
            )}
            <Text
              className={`ml-3 font-medium ${
                answer === exam?.Questions[index].third_option
                  ? "text-white"
                  : "text-[#0F172A]"
              }`}
            >
              {exam?.Questions[index].third_option}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`${
              answer === exam?.Questions[index].fourth_option
                ? "bg-[#018675]"
                : "bg-white"
            } shadow-lg p-4 flex-row items-center rounded-md border border-[#DDDDDD] mb-2.5`}
            onPress={() => setAnswer(exam?.Questions[index].fourth_option)}
          >
            {answer === exam?.Questions[index].fourth_option ? (
              <FontAwesome name="dot-circle-o" size={20} color="#fff" />
            ) : (
              <FontAwesome name="circle-o" size={20} color="#0F172A" />
            )}
            <Text
              className={`ml-3 font-medium ${
                answer === exam?.Questions[index].fourth_option
                  ? "text-white"
                  : "text-[#0F172A]"
              }`}
            >
              {exam?.Questions[index].fourth_option}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-between mt-5">
          {index > 0 ? (
            <TouchableOpacity
              className="w-20 border-2 opacity-100 border-[#018675] py-1.5 rounded-md"
              onPress={handlePrevButton}
            >
              <Text className="capitalize text-[#018675] font-medium text-center">
                kembali
              </Text>
            </TouchableOpacity>
          ) : (
            <View className="w-20" />
          )}

          {index === exam?.Questions?.length - 1 ? (
            <TouchableOpacity
              className="bg-[#018675] w-20 py-2.5 rounded-md"
              onPress={() => {
                handleAnswerTemp(exam?.Questions[index]);
                handleSubmitAnswer();
              }}
            >
              <Text className="capitalize text-white font-medium text-center">
                kirim
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-[#018675] w-20 py-2.5 rounded-md"
              onPress={handleNextButton}
            >
              <Text className="capitalize text-white font-medium text-center">
                lanjut
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ExamAttemp;
