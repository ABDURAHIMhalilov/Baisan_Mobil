import {
  View,
  Text,
  ImageBackground,
  Image,
  Button,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, StackActions } from "@react-navigation/native";
const CustomDrawer = (props) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const keyOlish = async () => {
      const tokenUser = await AsyncStorage.getItem("token");

      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setUser(res.data);
          console.log(res.data);
        });
    };
    keyOlish();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {user.map((item) => {
          return (
            <ImageBackground
              source={{
                uri: "https://t3.ftcdn.net/jpg/03/36/89/24/360_F_336892491_aZIazKCweTtVXT4BT8I2OxOlNwk1JV7j.jpg",
              }}
              style={{ padding: 20 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <FontAwesome5 name="user-circle" size={18} color={"white"} />
                <Text style={{ marginLeft: 10, color: "white" }}>Teacher</Text>
              </View>
              {item.image ? (
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    marginBottom: 10,
                  }}
                  source={{
                    uri: `https://markazback2.onrender.com/${item.image}`,
                  }}
                />
              ) : (
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    marginBottom: 10,
                  }}
                  source={{
                    uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
                  }}
                />
              )}
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
                {item.username}
              </Text>
              <View>
                <View style={{ flexDirection: "row" }}>
                  {item.balance === 0 ? (
                    <Text style={{ color: "red", marginRight: 5 }}>
                      Balanse: {item.balance}
                    </Text>
                  ) : item.balance > 0 ? (
                    <Text style={{ color: "yellow", marginRight: 5 }}>
                      Balanse: {item.balance}
                    </Text>
                  ) : (
                    <Text style={{ color: "green", marginRight: 5 }}>
                      Balanse: {item.balance}
                    </Text>
                  )}

                  <FontAwesome5 name="coins" size={14} color="#fff" />
                </View>
              </View>
            </ImageBackground>
          );
        })}
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      {/* <View style={{ width: '100%' }} onClick={() => alert('clicked!')}>
                <View style={{ width: '100%', height: 50, backgroundColor: 'dodgerblue', padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name='log-out-outline' size={20} color={'white'} />
                    <Text style={{ color: 'white', fontSize: 17, marginLeft: 5 }}>Log Out</Text>
                </View>
            </View> */}
    </View>
  );
};

export default CustomDrawer;
