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
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomDrawer from "./CustomDrawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HelpScreen from "./HelpSreen";
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const Bonss = () => {
  useEffect(() => {
    const gett = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
      axios
        .get(`https://markazback2.onrender.com/edu/sertificat/`, {
          headers: { Authorization: "Bearer: " + tokenUser },
        })
        .then((res) => {
          console.log(res.data, "itemmm");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    gett();
  }, []);
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png",
          }}
          style={{ width: 70, height: 70, borderRadius: 50, marginRight: 5 }}
        />
        <View
          style={{
            maxWidth: "85%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>HTML</Text>
          <Text style={{ fontSize: 12 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
            voluptate?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png",
          }}
          style={{ width: 70, height: 70, borderRadius: 50, marginRight: 5 }}
        />
        <View
          style={{
            maxWidth: "85%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>CSS</Text>
          <Text style={{ fontSize: 12 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
            voluptate?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: "https://blog.logrocket.com/wp-content/uploads/2021/02/machine-learning-libraries-javascript.png",
          }}
          style={{ width: 70, height: 70, borderRadius: 50, marginRight: 5 }}
        />
        <View
          style={{
            maxWidth: "85%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>JS</Text>
          <Text style={{ fontSize: 12 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
            voluptate?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: "https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.png",
          }}
          style={{ width: 70, height: 70, borderRadius: 50, marginRight: 5 }}
        />
        <View
          style={{
            maxWidth: "85%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>JAVA</Text>
          <Text style={{ fontSize: 12 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
            voluptate?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: "https://sass-lang.com/assets/img/styleguide/seal-color.png",
          }}
          style={{ width: 70, height: 70, borderRadius: 50, marginRight: 5 }}
        />
        <View
          style={{
            maxWidth: "85%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>SASS</Text>
          <Text style={{ fontSize: 12 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
            voluptate?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: "https://e7.pngegg.com/pngimages/271/958/png-clipart-1st-century-logo-brand-electric-motor-jquery-icon-blue-text.png",
          }}
          style={{ width: 70, height: 70, borderRadius: 50, marginRight: 5 }}
        />
        <View
          style={{
            maxWidth: "85%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>JQUERY</Text>
          <Text style={{ fontSize: 12 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
            voluptate?
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const ProfilePage = (props) => {
  const [key2, setKey2] = useState();
  const [user, setUser] = useState([]);
  const [loader, setLoader] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();
  const onRefresh = React.useCallback(() => {
    setLoader(null);
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
    setTimeout(() => {
      keyOlish();
      setLoader(1);
    }, 2000);
  }, []);
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
    setLoader(null);
    setTimeout(() => {
      setLoader(1);
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loader == null ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="big" color="blue" />
        </View>
      ) : (
        <View>
          {user.map((item) => {
            return (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                style={styles.contain}
              >
                <Text>Balanse: {item.balance}</Text>
                <View style={styles.flex}>
                  {item.image ? (
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: `https://markazback2.onrender.com/${item.image}`,
                      }}
                    />
                  ) : (
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
                      }}
                    />
                  )}
                </View>
                <Text
                  style={{ textAlign: "center", fontSize: 25, color: "black" }}
                >
                  {item.username}
                </Text>
                {item.description ? (
                  <Text style={{ fontSize: 13, color: "black", marginTop: 20 }}>
                    Description:
                    <Text style={{ fontSize: 16 }}>
                      &nbsp;{item.description}
                    </Text>
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 17,
                      color: "black",
                      marginTop: 20,
                    }}
                  >
                    No Description!
                  </Text>
                )}

                <Bonss />
              </ScrollView>
            );
          })}
        </View>
      )}
    </View>
  );
};

const EditProfile = (props) => {
  const [user, setUser] = useState([]);
  const [date, setDate] = useState(new Date()); //this full time
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty"); // datatime
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [last_name, setLast_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [adress, setAdress] = useState("");
  const [description, setDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMap, setUserMap] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [state, setState] = React.useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
            setUserMap(item);
            setUsername(item.username);
            setLast_name(item.last_name);
            setPhone_number(item.phone_number);
            setAdress(item.address);
            setDescription(item.description);
            setUserEmail(item.email);
          });
        })
        .finally(() => {
          setState(false);
        });
    };
    keyOlish();
  }, []);
  const handleChangeData2 = (text) => {
    setLast_name(text);
  };
  const handleChangeData3 = (text) => {
    setUsername(text);
  };
  const handleChangeData4 = (text) => {
    setPhone_number(text);
  };
  const handleChangeData5 = (text) => {
    setAdress(text);
  };
  const handleChangeData6 = (text) => {
    setDescription(text);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();
    let fTime =
      "Hours: " + tempDate.getHours() + " | Minutes: " + tempDate.getMinutes();
    setText(fDate);
  };

  const showMode = (currentMoe) => {
    setShow(true);
    setMode(currentMoe);
  };

  const postData = async () => {
    var data2 = new FormData();
    data2.append("last_name", "last_name");
    data2.append("username", "username");
    data2.append("phone_number", "phone_number");
    data2.append("address", "adress");
    data2.append("description", "description");
    data2.append("birthday", "2023-02-20");
    data2.append("image", "234e345342313.png");
    data2.append("email", "halilovabdurahim13@gmail.com");
    data2.append("first_name", "1232");
    // var data2 = {
    //   last_name: last_name,
    //   username: username,
    //   phone_number: phone_number,
    //   address: adress,
    //   description: description,
    //   image: image,
    //   email: "halilovabdurahim13@gmail.com",
    // };
    const tokenUser = await AsyncStorage.getItem("token");

    axios
      .put(
        `https://markazback2.onrender.com/auth/oneuser/${userMap.id}`,
        { data2 },
        { headers: { Authorization: "Bearer " + tokenUser } }
      )
      .then((res) => {
        Alert.alert("Succes", "You edited profile!", [
          { text: "ok", onPress: () => props.navigation.navigate("Profile") },
        ]);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
        console.log(data2);
      });
  };

  return (
    <ScrollView
      style={{ padding: 10 }}
      onScroll={(e) => console.log(e.nativeEvent.contentOffset.y)}
      scrollEventThrottle={16}
    >
      {state == true ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="big" color="#0000ff" />
        </View>
      ) : (
        <View style={{ paddingBottom: 30 }}>
          {user.map((item) => {
            return (
              <View>
                <View>
                  <Text>Add image link</Text>
                  <TextInput
                    style={{
                      width: "100%",
                      height: 40,
                      borderWidth: 1,
                      marginBottom: 10,
                      borderRadius: 5,
                      paddingLeft: 5,
                    }}
                    onChangeText={(text) => setImage(text)}
                  />
                  {/* {image == null ? (
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 5,
                        justifyContent: "center",
                      }}
                    >
                      <Pressable onPress={() => pickImage()}>
                        <Image
                          source={{
                            uri: `https://markazback2.onrender.com/${userMap.image}`,
                          }}
                          style={{
                            width: 150,
                            height: 150,
                            borderRadius: 100,
                            borderWidth: 2,
                            borderColor: "yellow",
                          }}
                        />
                      </Pressable>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 5,
                        justifyContent: "center",
                      }}
                    >
                      <Pressable onPress={() => pickImage()}>
                        <Image
                          source={{ uri: image }}
                          style={{
                            width: 150,
                            height: 150,
                            borderRadius: 100,
                            borderWidth: 2,
                            borderColor: "red",
                          }}
                        />
                      </Pressable>
                    </View>
                  )} 
                  <IconsForMe
                    name="photo-camera"
                    onPress={() => pickImage()}
                    style={{
                      fontSize: 35,
                      backgroundColor: "dodgerblue",
                      padding: 10,
                      borderRadius: 30,
                      width: 55,
                      height: 55,
                      color: "white",
                      top: -58,
                      left: 202,
                    }}
                  />*/}
                </View>
                {/* <View style={{ marginBottom: 10 }}>
                  <Text>Selected Birthday: {text}</Text>
                  <Button
                    title="Select Data"
                    onPress={() => showMode("date")}
                  />
                </View> */}
                <Text>Name</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 40,
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 5,
                    paddingLeft: 5,
                  }}
                  placeholder={item.last_name}
                  onChangeText={handleChangeData2}
                />
                <Text>Surname</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 40,
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 5,
                    paddingLeft: 5,
                  }}
                  placeholder={item.username}
                  onChangeText={handleChangeData3}
                />
                <Text>Phone Number</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 40,
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 5,
                    paddingLeft: 5,
                  }}
                  placeholder={item.phone_number}
                  keyboardType="numeric"
                  onChangeText={handleChangeData4}
                />
                <Text>Address</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 40,
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 5,
                    paddingLeft: 5,
                  }}
                  placeholder={item.address}
                  keyboardType="email-address"
                  onChangeText={handleChangeData5}
                />
                <Text>Description</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 40,
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 5,
                    paddingLeft: 5,
                  }}
                  placeholder={item.description}
                  onChangeText={handleChangeData6}
                />
                <Button title="Puted" onPress={postData} type="submit" />
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default function Profile(props) {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            drawerIcon: ({ color }) => (
              <FontAwesome name="user-circle-o" size={22} color={color} />
            ),
            headerRight: () => {
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require("../../img/signal-2023-06-09-165727_003.png")}
                    style={{ width: 90, height: 90, marginRight: 10 }}
                  />
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
                </View>
              );
            },
          }}
        />
        <Drawer.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="settings-sharp" size={22} color={color} />
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
        />
        <Drawer.Screen
          name="Help"
          component={HelpScreen}
          options={{
            drawerIcon: ({ focused }) =>
              focused ? (
                <Entypo name="help-with-circle" size={24} color="black" />
              ) : (
                <Feather name="help-circle" size={24} color="black" />
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
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
  contain: {
    width: "100%",
    minHeight: 300,
    padding: 10,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});
