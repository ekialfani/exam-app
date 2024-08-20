/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const Icon = ({ label, focus }) => {
  switch (label) {
    case "Dashboard":
      return focus ? (
        <MaterialIcons name="dashboard" size={20} color={"#018675"} />
      ) : (
        <MaterialIcons name="dashboard" size={20} color={"#B4B9C2"} />
      );
    case "Buat Ujian":
      return focus ? (
        <AntDesign name="pluscircle" size={19} color={"#018675"} />
      ) : (
        <AntDesign name="pluscircle" size={19} color={"#B4B9C2"} />
      );
    case "Daftar Ujian":
      return focus ? (
        <FontAwesome name="list" size={19} color={"#018675"} />
      ) : (
        <FontAwesome name="list" size={19} color={"#B4B9C2"} />
      );
    default:
      return focus ? (
        <Ionicons name="stats-chart-sharp" size={20} color={"#018675"} />
      ) : (
        <Ionicons name="stats-chart-sharp" size={20} color={"#B4B9C2"} />
      );
  }
};

const BottomNavigator = ({ state, descriptors, navigation }) => {
  return (
    <View className="flex-row justify-between bg-white px-5 py-3 rounded-t-3xl shadow-inner">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            className="items-center"
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Icon label={label} focus={isFocused} />
            {isFocused ? (
              <Text className="text-[#018675] text-xs font-bold mt-1">
                {label}
              </Text>
            ) : (
              <Text className="text-[#B4B9C2] text-xs font-bold mt-1">
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigator;
