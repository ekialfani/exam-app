/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AdminExamDetail,
  CompletedExam,
  CreateExam,
  CreateQuestion,
  Dashboard,
  EditExam,
  EditQuestion,
  ExamList,
  Home,
  Login,
  Register,
  Report,
  Setting,
  SplashScreen,
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
        name="Daftar Ujian"
        component={ExamList}
        options={{ headerTitleAlign: "center" }}
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
        name="Beranda"
        component={Home}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Daftar Ujian"
        component={ExamList}
        options={{ headerTitleAlign: "center" }}
      />
      <Tab.Screen
        name="Selesai"
        component={CompletedExam}
        options={{ headerTitleAlign: "center" }}
      />
      <Tab.Screen
        name="Pengaturan"
        component={Setting}
        options={{ headerTitleAlign: "center" }}
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
        options={{ title: "Edit Ujian", headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
};

export default Router;
