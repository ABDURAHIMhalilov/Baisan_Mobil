import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    ScrollView,
    TextInput,
    Alert,
    RefreshControl,
    TouchableOpacity
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import axios from "axios";
  
  const ApplicationScreen = () => {
      const [fullName, setFullName] = useState("");
      const [Email, setEmail] = useState("");
      const [Message, setMessage] = useState("");
      const [Purchase, setPurchase] = useState("");
      const Application1 = async () => {
        const tokenUser = await AsyncStorage.getItem("token")
  
        var data = {
          fullname: fullName,
          email: Email,
          message: Message,
          purchase: Purchase,
        };
        axios
          .post("https://markazback2.onrender.com/api/call_me", data, {
            headers: { Authorization: "Bearer " + tokenUser },
          })
          .then((res) => {
            alert("succes");
          })
          .catch((err) => {
            console.log(err);
          });
      };
      return (
        <ScrollView
          style={{
            marginTop: 30,
          }}
        >
          <View
            style={{
              width: "95%",
              flex: 1,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                paddingBottom: 5,
                fontSize: 20,
                fontWeight: 450,
              }}
            >
              Fullname
            </Text>
            <TextInput
              style={{
                width: "100%",
                height: 40,
                borderWidth: 1,
                marginBottom: 10,
                borderRadius: 5,
                paddingLeft: 5,
              }}
              placeholder="fullname"
              onChangeText={(text) => setFullName(text)}
            />
          </View>
          <View
            style={{
              width: "95%",
              flex: 1,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                paddingBottom: 5,
                fontSize: 20,
                fontWeight: 450,
              }}
            >
              Email
            </Text>
            <TextInput
              style={{
                width: "100%",
                height: 40,
                borderWidth: 1,
                marginBottom: 10,
                borderRadius: 5,
                paddingLeft: 5,
              }}
              placeholder="email"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View
            style={{
              width: "95%",
              flex: 1,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                paddingBottom: 5,
                fontSize: 20,
                fontWeight: 450,
              }}
            >
              Message
            </Text>
            <TextInput
              style={{
                width: "100%",
                height: 40,
                borderWidth: 1,
                marginBottom: 10,
                borderRadius: 5,
                paddingLeft: 5,
              }}
              placeholder="message"
              onChangeText={(text) => setMessage(text)}
            />
          </View>
          <View
            style={{
              width: "95%",
              flex: 1,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                paddingBottom: 5,
                fontSize: 20,
                fontWeight: 450,
              }}
            >
              Purchase
            </Text>
            <TextInput
              style={{
                width: "100%",
                height: 40,
                borderWidth: 1,
                marginBottom: 10,
                borderRadius: 5,
                paddingLeft: 5,
              }}
              placeholder="purchase"
              onChangeText={(text) => setPurchase(text)}
            />
          </View>
    
          <TouchableOpacity
            onPress={Application1}
            style={{
              backgroundColor: "dodgerblue",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              width: "95%",
              height: 40,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
              }}
            >
              Send
            </Text>
          </TouchableOpacity>
        </ScrollView>
      );
    };
  
    export default ApplicationScreen