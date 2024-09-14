/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Text, View } from "react-native";

const ExamDetail = ({ route }) => {
  const { examId } = route.params;
  // console.log(examId)

  return (
    <View>
      <Text>detail ujian</Text>
      <Text>id ujian {examId}</Text>
    </View>
  );
};

export default ExamDetail;
