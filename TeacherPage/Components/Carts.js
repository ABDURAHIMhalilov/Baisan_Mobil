// import { View, Text, Button, Image } from "react-native";
// import React from "react";

// const Carts = (props) => {
//   return (
//     <View>
//       <Text style={{ fontSize: 25, margin: 5 }}>Get Money</Text>
//       {/* <Button title='open drawer' onPress={() => props.navigation.openDrawer()} /> */}
//       <View
//         style={{
//           backgroundColor: "black",
//           padding: 5,
//           marginHorizontal: 10,
//           marginVertical: 10,
//           height: 200
//         }}
//       >
//         <Image
//           source={require('../../img/PlasticcartImage.png')}
//           style={{ width: "100%", height: 190, borderRadius: 10 }}
//           // resizeMode="contain"
//         />
//       </View>
//     </View>
//   );
// };

// export default Carts;

import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform, TextInput } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Carts() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: message1,
        body: message2,
        data: { data: "Hello3" },
      },
      trigger: { seconds: 2 },
    });
  }

  const keyOlish = async () => {
    const tokenUser = await AsyncStorage.getItem("token");
    axios
      .get("https://markazback2.onrender.com/auth/oneuser", {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        res.data.map((item) => {
          setMessage1(item.username);
          setMessage2(
            item.description +
              "qytweuwtyqiuweytqiueytquwetyiqiuweytqywetquwetyqweytqwueyitqwyeqweyqweuwti"
          );
        });
      });
  };
  useEffect(() => {
    keyOlish();
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <TextInput
        onChangeText={(text) => setMessage1(text)}
        style={{ borderWidth: 2, width: "100%", height: 40 }}
      />
      <TextInput
        onChangeText={(text) => setMessage2(text)}
        style={{ borderWidth: 2, width: "100%", height: 40 }}
      />
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
      <View style={{ backgroundColor: "#FF231F7C" }}>
        <Text>asd</Text>
      </View>
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
