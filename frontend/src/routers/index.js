/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CreateExam, ExamList, Report, SplashScreen } from "../pages";
import Dashboard from "../pages/Dashboard";
import { BottomNavigator } from "../components";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
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

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
