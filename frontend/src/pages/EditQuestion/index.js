/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { editQuestionTemp } from "../../redux/slice/questionSlice";

const EditQuestion = ({ route, navigation }) => {
  const { question } = route.params;

  const [isFocus, setIsFocus] = useState(false);
  const [point, setPoint] = useState(question.point || 5);
  const [questionText, setQuestionText] = useState(question.question_text);
  const [firstOption, setFirstOption] = useState(question.first_option.text);
  const [secondOption, setSecondOption] = useState(question.second_option.text);
  const [thirdOption, setThirdOption] = useState(question.third_option.text);
  const [fourthOption, setFourthOption] = useState(question.fourth_option.text);
  const [isFirstCorrect, setIsFirstCorrect] = useState(
    question.first_option.is_correct
  );
  const [isSecondCorrect, setIsSecondCorrect] = useState(
    question.second_option.is_correct
  );
  const [isThirdCorrect, setIsThirdCorrect] = useState(
    question.third_option.is_correct
  );
  const [isFourthCorrect, setIsFourthCorrect] = useState(
    question.fourth_option.is_correct
  );

  const dispatch = useDispatch();

  const resetOptionCorrect = () => {
    setIsFirstCorrect(false);
    setIsSecondCorrect(false);
    setIsThirdCorrect(false);
    setIsFourthCorrect(false);
  };

  const handleResetForm = () => {
    setPoint(5);
    setQuestionText("");
    setFirstOption("");
    setSecondOption("");
    setThirdOption("");
    setFourthOption("");
    setIsFirstCorrect(false);
    setIsSecondCorrect(false);
    setIsThirdCorrect(false);
    setIsFourthCorrect(false);
  };

  const handleSaveQuestion = () => {
    const data = {
      id: question.id,
      exam_id: question.exam_id,
      question_text: questionText,
      first_option: {
        text: firstOption,
        is_correct: isFirstCorrect,
      },
      second_option: {
        text: secondOption,
        is_correct: isSecondCorrect,
      },
      third_option: {
        text: thirdOption,
        is_correct: isThirdCorrect,
      },
      fourth_option: {
        text: fourthOption,
        is_correct: isFourthCorrect,
      },
      point: parseInt(point),
    };

    dispatch(editQuestionTemp(data));
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
                setIsFirstCorrect(!isFirstCorrect);
              }}
            >
              {isFirstCorrect ? (
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
                setIsSecondCorrect(!isSecondCorrect);
              }}
            >
              {isSecondCorrect ? (
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
                setIsThirdCorrect(!isThirdCorrect);
              }}
            >
              {isThirdCorrect ? (
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
                setIsFourthCorrect(!isFourthCorrect);
              }}
            >
              {isFourthCorrect ? (
                <FontAwesome name="check-circle-o" size={18} color="#22c55e" />
              ) : (
                <FontAwesome name="check-circle-o" size={18} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="mt-3 mb-10 bg-[#018675] py-2 rounded-md w-28"
            onPress={handleSaveQuestion}
          >
            <Text className="text-center capitalize font-medium text-white">
              simpan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditQuestion;

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
