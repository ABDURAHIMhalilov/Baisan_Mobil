import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import HelpScreen2 from "./HelpSreen";
import { SafeAreaView } from "react-native-safe-area-context";
import Partner from "./Partner";

const Stack = createStackNavigator();

const MoneyScreen = (props) => {
  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState("#000");

  function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(data);
    let payment = JSON.parse(data);
    if (payment.status === "COMPLETED") {
      alert("PAYMENT MADE SUCCESSFULLY!");
    } else {
      alert("PAYMENT FAILED. PLEASE TRY AGAIN.");
    }
  }

  return (
    <SafeAreaView>
      <View
        style={{
          height: 45,
          width: "70%",
          elevation: 1,
          backgroundColor: "#00457C",
          borderRadius: 3,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setShowGateway(true)}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
            }}
          >
            Pay Using PayPal
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const InfoScreen2 = (props) => {
  return (
    <View style={{ padding: 5 }}>
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
    </View>
  );
};

const InfoScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Information"
        component={InfoScreen2}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Money"
        component={MoneyScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen2}
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

const styles = StyleSheet.create({});
