import {
  View,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";

const LoginPage = (props) => {
  const [state, setState] = useState(null);
  // teacher: halilovabdurahim13@gmail.com
  // password: 0

  // student: mirobidmirkosimov@gmail.com
  // password: 12345678909
  const [username, setUsername] = useState("halilovabdurahim13@gmail.com");
  const [password, setPassword] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const height = Dimensions.get("window");
  useEffect(() => {
    const getLocal = async () => {
      var value = await AsyncStorage.getItem("token");
      if (value) {
        axios
          .get("https://markazback2.onrender.com/auth/oneuser", {
            headers: { Authorization: "Bearer " + value },
          })
          .then((res) => {
            res.data.map((item) => {
              if (item.position == 2) {
                props.navigation.replace("TeacherPanel");
              } else if (item.position == 4) {
                props.navigation.replace("StudentPage");
                setIsLoading(true);
              } else {
                console.log(null);
              }
            });
          })
          .catch((err) => {
            if (err.message.includes(503)) {
              alert("Something is wrong with the server");
            } else {
              alert("No User!");
            }
          });
      } else {
        console.log(null);
      }
    };
    getLocal();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("connection type", state.type);
      console.log("is connected", state.isConnected);
      setIsConnected(state.isConnected);
      if(state.isConnected === false) {
        alert('check onternet connection')
      } else {
        console.log('good');
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const handleChangeUsername = (text) => {
    setUsername(text);
  };
  const handleChangePassword = (text) => {
    setPassword(text);
  };

  const onSave = async () => {
    axios
      .post("https://markazback2.onrender.com/auth/login", {
        email: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data.access);
        const _postToken = async () => {
          await AsyncStorage.setItem("token", res.data.access);
        };
        _postToken();
        axios
          .get("https://markazback2.onrender.com/auth/oneuser", {
            headers: { Authorization: "Bearer " + res.data.access },
          })
          .then((res2) => {
            res2.data.map((item) => {
              const asd = async () => {
                await AsyncStorage.setItem(
                  "userOffId",
                  JSON.stringify(item.id)
                );
              };
              if (item.position == 2) {
                alert("Succes");
                props.navigation.replace("TeacherPanel");
                setIsLoading(true);
              } else if (item.position == 4) {
                alert("Succes");
                props.navigation.replace("StudentPage");
                setIsLoading(true);
              } else {
                alert("no user");
                console.log("asd");
              }
              asd();
            });
          })
          .catch((err) => {
            alert(err);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        if (err.message.includes(503)) {
          alert("Something is wrong with the server");
        } else {
          alert("No User!");
        }
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "android" ? "height" : "padding"}
      style={{ flex: 1 }}
      // enabled={1000}
    >
      <Text style={{ marginTop: 30 }}>
        Status:
        {isConnected ? (
          <Text style={{ color: "green" }}> onlayn</Text>
        ) : (
          <Text style={{ color: "red" }}> offline</Text>
        )}
      </Text>
      {isLoading == true ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="big" color="#0000ff" />
        </View>
      ) : (
        <ScrollView style={{ flexGrow: 1 }}>
          <View
            style={{
              minHeight: "100%",
              marginTop: 70,
              padding: 10,
            }}
          >
            {height.height > 640 ? (
              <Image
                style={{ width: "100%", height: 200 }}
                source={require("./img/HowardLogo.png")}
              />
            ) : (
              <Image
                style={{ width: "100%", height: 170 }}
                source={require("./img/HowardLogo.png")}
              />
            )}
            <View style={{ marginTop: 50 }}>
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 17, marginLeft: 2 }}>Login</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 40,
                    borderWidth: 1,
                    borderColor: "dodgerblue",
                    borderRadius: 5,
                    paddingLeft: 10,
                    fontSize: 17,
                  }}
                  onChangeText={handleChangeUsername}
                />
              </View>
              <View style={{ marginTop: 10, marginBottom: 20 }}>
                <Text style={{ fontSize: 17, marginLeft: 2 }}>Password</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 40,
                    borderWidth: 1,
                    borderColor: "dodgerblue",
                    borderRadius: 5,
                    paddingLeft: 10,
                    fontSize: 17,
                  }}
                  onChangeText={handleChangePassword}
                  secureTextEntry={true}
                />
              </View>
            </View>
            <Text>{username + " " + password}</Text>
            <Button title="Вход" onPress={onSave} />
          </View>
          <View>
            <Text>Status: {isConnected ? "You onlayn" : "You offline"}</Text>
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
