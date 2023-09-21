import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Components/Home";
import Chat from "../Components/Chat";
import Profile from "../Components/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewsScreen from "../Components/News";
import {
  MaterialIcons,
  Feather,
  Ionicons,
  Entypo,
  FontAwesome,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { Image, Linking, Text } from "react-native";
import { useCallback } from "react";
import InfoScreen from "../Components/InfoScreen";

const Tab = createBottomTabNavigator();
const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    await Linking.openURL(
      "https://stackoverflow.com/questions/41320131/how-to-set-shadows-in-react-native-for-android"
    );
  }, [url]);

  return (
    <Feather
      name="user-plus"
      size={30}
      color="black"
      style={{ marginRight: 10 }}
      onPress={handlePress}
    />
  );
};
const index = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="TeacherPage"
      screenOptions={{
        tabBarLabelStyle: { display: "none" },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        options={{
          headerLeft: () => {
            return (
              <Image
                source={require("../../img/signal-2023-06-09-165727_003.png")}
                style={{ width: 80, height: 70 }}
              />
            );
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="newspaper" size={24} color="black" />
            ) : (
              <Ionicons name="newspaper-outline" size={24} color="black" />
            ),
            headerTitleAlign: 'center'
        }}
        name="News"
        component={NewsScreen}
      />
      <Tab.Screen
        name="Course"
        options={{
          // headerShown: false,
          headerLeft: () => {
            return (
              <Image
                source={require("../../img/signal-2023-06-09-165727_003.png")}
                style={{ width: 80, height: 70 }}
              />
            );
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="graduation-cap" size={24} color="black" />
            ) : (
              <Entypo name="graduation-cap" size={24} color="black" />
            ),
          headerRight: () => {
            return (
              <FontAwesome5
                name="cart-plus"
                size={26}
                marginRight={20}
                color="black"
                onPress={() => props.navigation.navigate("AddCourse")}
              />
            );
          },
          headerTitleAlign: 'center'
        }}
        component={Home}
      />
      <Tab.Screen
        name="Information"
        options={{
          // headerShown: false,
          headerLeft: () => {
            return (
              <Image
                source={require("../../img/signal-2023-06-09-165727_003.png")}
                style={{ width: 80, height: 70 }}
              />
            );
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="infocirlce" size={24} color="black" />
            ) : (
              <AntDesign name="infocirlceo" size={24} color="black" />
            ),
            headerTitleAlign: 'center'
        }}
        component={InfoScreen}
      />
      <Tab.Screen
        name="Chat"
        options={{
          headerLeft: () => {
            return (
              <Image
                source={require("../../img/signal-2023-06-09-165727_003.png")}
                style={{ width: 80, height: 70 }}
              />
            );
          },
          headerRight: () => {
            return (
              <OpenURLButton
                url={
                  "https://stackoverflow.com/questions/41320131/how-to-set-shadows-in-react-native-for-android"
                }
              ></OpenURLButton>
            );
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="chatbox-ellipses" size={24} color="black" />
            ) : (
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color="black"
              />
            ),
            headerTitleAlign: 'center'
        }}
        component={Chat}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user-circle" size={24} color="black" />
            ) : (
              <FontAwesome name="user-circle-o" size={24} color="black" />
            ),
          headerRight: () => {
            return (
              <MaterialIcons
                name="logout"
                size={30}
                color={"#000"}
                style={{ marginRight: 10 }}
                onPress={() => {
                  AsyncStorage.clear();
                  props.navigation.navigate("LoginPage");
                }}
              />
            );
          },
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default index;
