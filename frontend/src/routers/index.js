/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AdminExamDetail,
  ExamCreatedList,
  CompletedExam,
  CreateExam,
  CreateQuestion,
  Dashboard,
  EditExam,
  EditQuestion,
  Home,
  Login,
  Register,
  Report,
  Setting,
  SplashScreen,
  ExamList,
  ExamDetail,
  ExamAttemp,
  UserProfile,
} from "../pages";
import { BottomNavigator } from "../components";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AdminPage = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Buat Ujian"
        component={CreateExam}
        options={{ headerTitleAlign: "center" }}
      />
      <Tab.Screen
        name="ExamCreatedList"
        component={ExamCreatedList}
        options={{
          title: "Daftar Ujian",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Laporan"
        component={Report}
        options={{ headerTitleAlign: "center" }}
      />
    </Tab.Navigator>
  );
};

const MainPage = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Beranda",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ExamList"
        component={ExamList}
        options={{
          title: "Daftar Ujian",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Selesai"
        component={CompletedExam}
        options={{ headerTitleAlign: "center" }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          title: "Pengaturan",
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminPage"
        component={AdminPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#018675",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <Stack.Screen
        name="Daftar"
        component={Register}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#018675",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <Stack.Screen
        name="CreateQuestion"
        component={CreateQuestion}
        options={{
          title: "Buat Soal",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="EditQuestion"
        component={EditQuestion}
        options={{
          title: "Edit Soal",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="AdminExamDetail"
        component={AdminExamDetail}
        options={{
          title: "Detail Ujian",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="EditExam"
        component={EditExam}
        options={{
          title: "Edit Ujian",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ExamDetail"
        component={ExamDetail}
        options={{
          title: "Detail Ujian",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ExamAttemp"
        component={ExamAttemp}
        options={({ route }) => ({
          title: route.params.examTitle
            ? route.params.examTitle
            : "Ujian Berlangsung",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ title: "Profil Saya", headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
};

export default Router;
