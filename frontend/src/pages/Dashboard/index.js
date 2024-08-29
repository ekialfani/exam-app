/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Text, TouchableOpacity, View } from "react-native";

const Dashboard = ({ navigation }) => {
  return (
    <View>
      <Text>Halaman Dashboard</Text>
      <TouchableOpacity onPress={() => navigation.navigate("AdminExamDetail", {examId: 7})}>
        <Text>ke halaman detail ujian</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
