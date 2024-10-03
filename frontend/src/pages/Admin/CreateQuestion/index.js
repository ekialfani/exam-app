/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuestion,
  createQuestionTemp,
} from "../../../redux/slice/questionSlice";

const CreateQuestion = ({ route, navigation }) => {
  const { examId, lastQuestionId } = route.params;

  const [isFocus, setIsFocus] = useState(false);
  const [point, setPoint] = useState(5);
  const [questionText, setQuestionText] = useState("");
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [thirdOption, setThirdOption] = useState("");
  const [fourthOption, setFourthOption] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const question = useSelector((state) => state.question);

  useEffect(() => {
    if (trigger && question.status === "succeeded") {
      navigation.navigate("AdminExamDetail", { examId: examId });
      handleResetForm();
      setTrigger(false);
    }
  }, [trigger, question.status]);

  const resetOptionCorrect = () => {
    setCorrectAnswer(null);
  };

  const handleResetForm = () => {
    setPoint(5);
    setQuestionText("");
    setFirstOption("");
    setSecondOption("");
    setThirdOption("");
    setFourthOption("");
    setCorrectAnswer(null);
  };

  const handleCreateQuestionTemp = () => {
    const data = {
      id: parseInt(lastQuestionId + 1),
      exam_id: examId,
      question_text: questionText,
      first_option: firstOption,
      second_option: secondOption,
      third_option: thirdOption,
      fourth_option: fourthOption,
      correct_answer: correctAnswer,
      point: parseInt(point),
    };

    dispatch(createQuestionTemp(data));
  };

  const handleCreateQuestion = () => {
    if (examId) {
      const questionData = {
        exam_id: examId,
        question_text: questionText,
        first_option: firstOption,
        second_option: secondOption,
        third_option: thirdOption,
        fourth_option: fourthOption,
        correct_answer: correctAnswer,
        point: parseInt(point),
      };

      dispatch(createQuestion({ questionData, token }));
      setTrigger(true);
      return;
    }
    handleCreateQuestionTemp();
    handleResetForm();
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View className="items-center">
        <View className="w-5/6 mt-5">
          <View className="flex-row gap-x-5 mb-2 items-center">
            <View className="flex-row items-center">
              <FontAwesome name="list" size={13} color="#018675" />
              <Text className="text-xs font-medium ml-1 text-slate-500">
                pilihan ganda
              </Text>
            </View>
            <View className="flex-row items-center">
              <FontAwesome name="star" size={14} color="#FCA428" />
              <Text className="text-xs font-medium ml-1 text-slate-500">
                poin
              </Text>
              <Dropdown
                style={[styles.dropdown, isFocus && styles.focus]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={[
                  { label: "5", value: 5 },
                  { label: "10", value: 10 },
                  { label: "15", value: 15 },
                  { label: "20", value: 20 },
                  { label: "25", value: 25 },
                  { label: "30", value: 30 },
                  { label: "35", value: 35 },
                  { label: "40", value: 40 },
                  { label: "45", value: 45 },
                  { label: "50", value: 50 },
                  { label: "55", value: 55 },
                  { label: "60", value: 60 },
                  { label: "70", value: 70 },
                  { label: "75", value: 75 },
                  { label: "80", value: 80 },
                  { label: "85", value: 85 },
                  { label: "90", value: 90 },
                  { label: "95", value: 95 },
                  { label: "100", value: 100 },
                ]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select item" : "..."}
                value={point}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setPoint(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
          </View>
          <View className="bg-[#018675] pt-6 pb-1 px-1 rounded-md">
            <TextInput
              className="bg-white h-32 rounded-b-md text-center text-lg"
              value={questionText}
              placeholder="ketik pertanyaan disini"
              onChangeText={(text) => setQuestionText(text)}
            />
          </View>
          <View className="mt-3 flex-row bg-[#FCA428] rounded-md">
            <TextInput
              className="text-white px-3 py-3 text-center flex-1 text-md"
              value={firstOption}
              placeholder="ketik opsi jawaban disini"
              onChangeText={(text) => setFirstOption(text)}
            />
            <TouchableOpacity
              className="px-2 py-2"
              onPress={() => {
                resetOptionCorrect();
                setCorrectAnswer(firstOption);
              }}
            >
              {firstOption === correctAnswer ? (
                <FontAwesome name="check-circle-o" size={18} color="#22c55e" />
              ) : (
                <FontAwesome name="check-circle-o" size={18} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
          <View className="mt-3 flex-row bg-[#FF5D7A] rounded-md">
            <TextInput
              className="text-white px-3 py-3 text-center flex-1 text-md"
              value={secondOption}
              placeholder="ketik opsi jawaban disini"
              onChangeText={(text) => setSecondOption(text)}
            />
            <TouchableOpacity
              className="px-2 py-2"
              onPress={() => {
                resetOptionCorrect();
                setCorrectAnswer(secondOption);
              }}
            >
              {secondOption === correctAnswer ? (
                <FontAwesome name="check-circle-o" size={18} color="#22c55e" />
              ) : (
                <FontAwesome name="check-circle-o" size={18} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
          <View className="mt-3 flex-row bg-[#2C444E] rounded-md">
            <TextInput
              className="text-white px-3 py-3 text-center flex-1 text-md"
              value={thirdOption}
              placeholder="ketik opsi jawaban disini"
              onChangeText={(text) => setThirdOption(text)}
            />
            <TouchableOpacity
              className="px-2 py-2"
              onPress={() => {
                resetOptionCorrect();
                setCorrectAnswer(thirdOption);
              }}
            >
              {thirdOption === correctAnswer ? (
                <FontAwesome name="check-circle-o" size={18} color="#22c55e" />
              ) : (
                <FontAwesome name="check-circle-o" size={18} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
          <View className="mt-3 flex-row bg-[#016096] rounded-md">
            <TextInput
              className="text-white px-3 py-3 text-center flex-1 text-md placeholder:text-slate-50"
              value={fourthOption}
              placeholder="ketik opsi jawaban disini"
              onChangeText={(text) => setFourthOption(text)}
            />
            <TouchableOpacity
              className="px-2 py-2"
              onPress={() => {
                resetOptionCorrect();
                setCorrectAnswer(fourthOption);
              }}
            >
              {fourthOption === correctAnswer ? (
                <FontAwesome name="check-circle-o" size={18} color="#22c55e" />
              ) : (
                <FontAwesome name="check-circle-o" size={18} color="#fff" />
              )}
            </TouchableOpacity>
          </View>

          <Text
            className={`text-xs text-red-500 mt-2 mb-2 ${
              question?.error ? "opacity-1" : "opacity-0"
            }`}
          >
            {question?.error?.message}
          </Text>

          <TouchableOpacity
              className="bg-[#018675] py-2 rounded-md justify-center items-center w-32"
              onPress={handleCreateQuestion}
            >
              {question?.status == "loading" ? (
                <ActivityIndicator size="small" color="#fff" animating={true} />
              ) : (
                <Text className="font-medium uppercase text-white">
                  buat soal
                </Text>
              )}
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateQuestion;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 5,
    width: 65,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 15,
    fontWeight: "500",
  },
  selectedTextStyle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748b",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  focus: {
    borderColor: "#018675",
    borderWidth: 2,
  },
});
