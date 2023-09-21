import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import HelpScreen2 from "./HelpSreen";
import Education from "./Education";
import VideoChat from "./VideoChat";
import { useNavigation } from "@react-navigation/native";
import HelpPageNum from "./HelpPageNum";
import Partner from "./Partner";
const Stack = createStackNavigator();

const MoneyScreen = (props) => {
  return (
    <View>
      <Text>asd</Text>
    </View>
  );
};

const InfoScreen2 = (props) => {
  return (
    <View style={{ padding: 5 }}>
      {/* <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: "dodgerblue",
          padding: 10,
          width: "100%",
          height: 60,
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 8,
          marginBottom: 10,
        }}
        onPress={() => props.navigation.navigate("Money")}
      >
        <FontAwesome name="money" size={24} color="white" />
        <Text
          style={{ width: "50%", color: "white", fontSize: 20 }}
          numberOfLines={1}
        >
          Add money
        </Text>
        <AntDesign name="right" size={26} color="white" />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: "dodgerblue",
          padding: 10,
          width: "100%",
          height: 60,
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 8,
          marginBottom: 10,
        }}
        onPress={() => props.navigation.navigate("Help")}
      >
        <Feather name="info" size={26} color="white" />
        <Text
          style={{ width: "50%", color: "white", fontSize: 20 }}
          numberOfLines={1}
        >
          Help
        </Text>
        <AntDesign name="right" size={26} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: "dodgerblue",
          padding: 10,
          width: "100%",
          height: 60,
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 8,
          marginBottom: 10,
        }}
        onPress={() => props.navigation.navigate("Education")}
      >
        <MaterialCommunityIcons
          name="book-education-outline"
          size={24}
          color="white"
        />
        <Text
          style={{ width: "50%", color: "white", fontSize: 20 }}
          numberOfLines={1}
        >
          Edication
        </Text>
        <AntDesign name="right" size={26} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: "dodgerblue",
          padding: 10,
          width: "100%",
          height: 60,
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 8,
          marginBottom: 10,
        }}
        onPress={() => props.navigation.navigate("Partners")}
      >
        <AntDesign name="team" size={25} color="white" />
        <Text
          style={{ width: "50%", color: "white", fontSize: 20 }}
          numberOfLines={1}
        >
          Partners
        </Text>
        <AntDesign name="right" size={26} color="white" />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: "dodgerblue",
          padding: 10,
          width: "100%",
          height: 60,
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 8,
          marginBottom: 10,
        }}
        onPress={() => props.navigation.navigate("Video")}
      >
        <Ionicons name="md-videocam" size={24} color="white" />
        <Text
          style={{ width: "50%", color: "white", fontSize: 20 }}
          numberOfLines={1}
        >
          Video Chat
        </Text>
        <AntDesign name="right" size={26} color="white" />
      </TouchableOpacity> */}
    </View>
  );
};

const InfoScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Information"
        component={InfoScreen2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Money"
        component={MoneyScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Help"
        component={HelpPageNum}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Education"
        component={Education}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Video"
        component={VideoChat}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Partners"
        component={Partner}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({})