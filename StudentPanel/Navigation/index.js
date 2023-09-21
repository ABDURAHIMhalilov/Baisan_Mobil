import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Components/Home";
import News from "../Components/News";
import Chat from "../Components/Chat";
import Profile from "../Components/Profile";
import {
  MaterialIcons,
  Feather,
  Ionicons,
  Entypo,
  FontAwesome,
  FontAwesome5,
  AntDesign
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import InfoScreen from "../Components/InfoScreen";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    await Linking.openURL(url);
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
const OpenURLButton2 = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    await Linking.openURL(url);
  }, [url]);

  return (
    <FontAwesome5
      name="cart-plus"
      size={26}
      marginRight={20}
      color="black"
      onPress={handlePress}
    />
  );
  // <Feather name="user-plus" size={30} color="black" style={{ marginRight: 10 }} onPress={handlePress} />
};
const supportedURL2 = 'https://markazback2.onrender.com/doc'

const index = (props) => {
  const [course, setCourse] = useState([]);
  const [user, setUser] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const keyOlish = async () => {
      const tokenUser = await AsyncStorage.getItem("token");

      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setUser(res.data);
          res.data.map((item) => {
            axios
              .get(`https://markazback2.onrender.com/api/mycourse/${item.id}`, {
                headers: { Authorization: "Bearer " + tokenUser },
              })
              .then((res2) => {
                res2.data.length < 1 ? setCourse(null) : setCourse(res2.data);
              });
          });
        });
    };
    keyOlish();
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="StudentPanel"
      screenOptions={{ tabBarLabelStyle: { display: "none" }, tabBarHideOnKeyboard: true }}
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
        component={News}
      />
      <Tab.Screen
        name="Course"
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
              <Entypo name="graduation-cap" size={24} color="black" />
            ) : (
              <Entypo name="graduation-cap" size={24} color="black" />
            ),
          headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: "7%",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "dodgerblue",
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 5,
                    marginRight: 10,
                  }}
                  onPress={() =>
                    Alert.alert(
                      "pul toldirishni hohlaysizmi",
                      "pul toldirishni hohlaysizmi",
                      [
                        { text: "yo'q" },
                        {
                          text: "ha",
                          onPress: () => props.navigation.navigate("Money"),
                        },
                      ]
                    )
                  }
                >
                  <Text style={{ color: "white" }}>
                    {user.map((item) => {
                      return <Text>{item.balance}</Text>;
                    })}
                    $
                  </Text>
                </TouchableOpacity>
                <Pressable onPress={() => navigation.navigate("MyCourses")}>
                  <FontAwesome5
                    name="cart-arrow-down"
                    size={26}
                    color="black"
                  />
                </Pressable>
              </View>
            );
          },
          headerTitleAlign: 'center'
        }}
        component={Home}
      />
      <Tab.Screen
        name="Information"
        options={{
          headerLeft: () => {
            return (
              <Image
                source={require("../../img/signal-2023-06-09-165727_003.png")}
                style={{ width: 80, height: 70 }}
              />
            );
          },
          headerShown: false,
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
            return <OpenURLButton url={supportedURL}></OpenURLButton>;
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
