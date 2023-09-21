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
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Pressable,
  ActivityIndicator,
  FlatList,
  Linking,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import IconsForMe from "react-native-vector-icons/MaterialIcons";
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
// import ApplicationScreen from "./ApplicationScreen";
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const Bonss = () => {
  const [sertificat, setSertificat] = useState([]);
  const [oneuser, setOneuser] = useState([]);
  const [url, setUrl] = useState("");
  // const url = "https://www.youtube.com/watch?v=KZvVWnRUrkU";

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    await Linking.openURL(url);
    // return <Button title={children} url={url} onpres />
  }, [url]);
  const OpenURLButton = ({ url, children }) => {};
  useEffect(() => {
    const hj = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
      axios
        .get(`https://markazback2.onrender.com/auth/oneuser`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          res.data.map((item) => {
            setOneuser(item);

            axios
              .get(
                `https://markazback2.onrender.com/edu/student_sertificat/${item.id}`,
                {
                  headers: { Authorization: "Bearer " + tokenUser },
                }
              )
              .then((res2) => {
                if (res2.data.length === 0) {
                  setSertificat(null);
                } else {
                  setSertificat(res2.data);

                  res2.data.map((iteme) => {
                    setUrl(`https://markazback2.onrender.com/${iteme.file}`);
                  });
                }
              });
          });
        });
    };
    hj();
  }, []);
  return (
    <ScrollView
      style={{
        padding: 10,
      }}
    >
      {sertificat === null ? (
        <View
          style={{
            padding: 5,
            marginHorizontal: 50,
            marginTop: 30,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#8DC5F4",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
            }}
          >
            No sertificat
          </Text>
        </View>
      ) : (
        <View>
          {sertificat.map((item) => {
            if (item.student_id == oneuser.id) {
              return (
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: "red",
                    // flexDirection: "row",
                    padding: 10,
                    marginTop: 20,

                    // alignItems:'center',
                  }}
                >
                  {/* <Text>{item.description}</Text>
                <Text>{item.id}</Text>
                <Text>{item.file}</Text>
                <Text>{item.title}</Text>
                <Text>{item.sertificat_id}</Text>
                <Text>{item.student_id}</Text> */}

                  <Image
                    // resizeMode="cover"
                    style={{
                      width: "100%",
                      height: 240,
                      // flex:1,
                      flexDirection: "row",
                      alignItems: "left",
                    }}
                    source={{
                      uri: `https://i.pinimg.com/736x/14/b5/04/14b504cc76fe2455fc7e54d6b7cc83de.jpg`,
                    }}
                  />
                  <View
                    style={{
                      paddingLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                      }}
                    >
                      {item.description}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        marginTop: 50,
                      }}
                    >
                      {item.file}
                    </Text>
                    <Pressable
                      onPress={handlePress}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: "red",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text>View</Text>
                    </Pressable>
                  </View>

                  {/* <Text>{item.director}</Text>
                <Text>{item.type}</Text>
                <Text>{item.mentor}</Text> */}
                </View>
              );
            }
          })}
        </View>
      )}
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
        });
    };
    keyOlish();
    setLoader(null);
    setTimeout(() => {
      setLoader(1);
    }, 2000);
  }, []);
  const [sertificat, setSertificat] = useState([]);
  const [oneuser, setOneuser] = useState([]);
  useEffect(() => {
    const hj = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
      axios
        .get(`https://markazback2.onrender.com/auth/oneuser`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          res.data.map((item) => {
            setOneuser(item);

            axios
              .get(
                `https://markazback2.onrender.com/edu/student_sertificat/${item.id}`,
                {
                  headers: { Authorization: "Bearer " + tokenUser },
                }
              )
              .then((res2) => {
                if (res2.data.length === 0) {
                  setSertificat(null);
                } else {
                  setSertificat(res2.data);
                }
              });
          });
        });
    };
    hj();
  }, []);
  // useEffect(() => {
  //   const getTok = async () => {
  //     const tokenUser = await AsyncStorage.getItem('token')
  //     axios.get('https://markazback2.onrender.com/sertificat_course/', {
  //       headers: { Authorization: "Bearer " + tokenUser },
  //     }).then(res => {
  //       console.warn(res.data, 'data');
  //     })
  //   }
  //   getTok()
  // }, [])
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
                <View
                  style={{
                    padding: 10,
                  }}
                >
                  {sertificat === null ? (
                    <View
                      style={{
                        padding: 5,
                        marginHorizontal: 50,
                        marginTop: 30,
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#8DC5F4",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 15,
                        }}
                      >
                        No sertificat
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      {sertificat.map((item) => {
                        if (item.student_id == oneuser.id) {
                          return (
                            <View
                              style={{
                                // borderWidth:2,
                                // borderColor:'red',
                                padding: 10,
                                width: "100%",
                                height: 360,
                                marginTop: 20,
                                backgroundColor: "white",
                                shadowColor: "#383838",
                                shadowOffset: { width: -3, height: 5 },
                                shadowOpacity: 0.2,
                              }}
                            >
                              {/* <Text>{item.description}</Text>
                <Text>{item.id}</Text>
                <Text>{item.file}</Text>
                <Text>{item.title}</Text>
                <Text>{item.sertificat_id}</Text>
                <Text>{item.student_id}</Text> */}

                              <View
                                style={{
                                  width: "100%",
                                  // flexDirection:'row',
                                }}
                              >
                                <Image
                                  style={{
                                    width: "100%",
                                    height: 230,
                                    // flexDirection:'row',
                                    // alignItems:'left',
                                  }}
                                  source={{
                                    uri: `https://i.pinimg.com/736x/14/b5/04/14b504cc76fe2455fc7e54d6b7cc83de.jpg`,
                                  }}
                                />
                                <View
                                  style={{
                                    paddingLeft: 10,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: "bold",
                                      marginTop: 10,
                                    }}
                                  >
                                    {item.title}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      marginTop: 10,
                                    }}
                                  >
                                    {item.description}
                                  </Text>
                                </View>
                              </View>

                              {/* <Text>{item.director}</Text>
                <Text>{item.type}</Text>
                <Text>{item.mentor}</Text> */}
                              <Text
                                style={{
                                  fontSize: 15,
                                  marginTop: 10,
                                  marginLeft: 10,
                                }}
                              >
                                {item.file}
                              </Text>
                            </View>
                          );
                        }
                      })}
                    </View>
                  )}
                </View>
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
  const [last_name, setLast_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [adress, setAdress] = useState("");
  const [description, setDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userEmail2, setUserEmail2] = useState("");
  const [userMap, setUserMap] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [state, setState] = React.useState(true);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],s
      quality: 1,
    });

    setImage2(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImage2(result);
    }
  };
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
            // setUsername(item.username);
            // setLast_name(item.last_name);
            // setPhone_number(item.phone_number);
            // setAdress(item.address);
            // setDescription(item.description);
            // setUserEmail(item.email);
          });
        })
        .finally(() => {
          setState(false);
        });
    };
    keyOlish();
  }, []);
  function putUser(id) {
    var formdata = new FormData();
    formdata.append("username", document.querySelector("#first_name").value);
    formdata.append("last_name", document.querySelector("#last_name").value);
    formdata.append("email", document.querySelector("#username").value);
    formdata.append("image", document.querySelector("#img").files[0]);
    formdata.append(
      "phone_number",
      document.querySelector("#phone_number").value
    );
    formdata.append("address", document.querySelector("#adress").value);
    formdata.append(
      "description",
      document.querySelector("#description").value
    );

    axios
      .put(`${url}/auth/oneuser/${id}`, formdata, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        if (localStorage.getItem("position") == 2) {
          window.location = "/mentor";
        } else if (localStorage.getItem("position") == 1) {
          window.location = "/user";
        } else if (localStorage.getItem("position") == 4) {
          window.location = "/studentall";
        }
        state1 === "ru"
          ? Swal.fire("Введенная информация")
          : Swal.fire("Entered information");
      })
      .catch((err) => {
        state1 === "ru"
          ? Swal.fire("Информация введена не полностью")
          : Swal.fire("The information was not fully entered");
      });
  }

  const postData = async () => {
    // alert(phone_number);
    // var data2 = new FormData();
    // data2.append("username", username);
    // data2.append("last_name", last_name);
    // data2.append("email", userEmail2);
    // data2.append("image", {
    //   name: new Date() + "_profile",
    //   uri: image,
    //   type: "image/jpg",
    // });
    // //2023-08-08T13:00:43.000Z
    // data2.append("birthday", "2023-08-08T13:00:43.000Z");
    // data2.append("phone_number", phone_number);
    // data2.append("address", adress);
    // data2.append("description", description);

    var data2 = {
      username: username,
      last_name: last_name,
      email: userEmail2,
      image: {
        name: new Date() + "_profile",
        uri: image,
        type: "image/jpg",
      },
      birthday: "2023-08-08T13:00:43.000Z",
      phone_number: phone_number,
      address: adress,
      description: description,
    };
    const tokenUser = await AsyncStorage.getItem("token");
    axios
      .put(
        `https://markazback2.onrender.com/auth/oneuser/${userMap.id}`,
        data2,
        { headers: { Authorization: "Bearer " + tokenUser } }
      )
      .then((res) => {
        Alert.alert("Succes", "You edited profile!", [
          { text: "ok", onPress: () => props.navigation.navigate("Profile") },
        ]);
      })
      .catch((err) => {
        alert(err);
        console.log(err.message);
        console.log(data2);
      });
  };

  return (
    <View
      style={{ padding: 10 }}
      // onScroll={(e) => console.log(e.nativeEvent.contentOffset.y)}
      scrollEventThrottle={16}
    >
      {state == true ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="big" color="#0000ff" />
        </View>
      ) : (
        <ScrollView style={{ paddingBottom: 30 }}>
          {/* {user.map((item) => {
            return ( */}
          <View>
            <View>
              {/* <Text>Add image link</Text>
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
                  /> */}
              {image == null ? (
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
              />
            </View>
            {/* <View style={{ marginBottom: 10 }}>
                  <Text>Selected Birthday: {text}</Text>
                  <Button title="Select Data" />
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
              // placeholder={last_name}
              onChangeText={(text) => setLast_name(text)}
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
              // placeholder={username}
              onChangeText={(text) => setUsername(text)}
            />
            <Text>Email</Text>
            <TextInput
              style={{
                width: "100%",
                height: 40,

                borderWidth: 1,
                marginBottom: 10,
                borderRadius: 5,
                paddingLeft: 5,
              }}
              // placeholder={userEmail}
              onChangeText={(text) => setUserEmail2(text)}
              keyboardType="email-address"
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
              // placeholder={phone_number}
              keyboardType="phone-pad"
              onChangeText={(text) => setPhone_number(text)}
              // inlineImageLeft='search_icon'
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
              // placeholder={adress}
              keyboardType="email-address"
              onChangeText={(text) => setAdress(text)}
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
              // placeholder={description}
              onChangeText={(text) => setDescription(text)}
            />
            <TouchableOpacity
              onPress={postData}
              type="submit"
              style={{
                backgroundColor: "dodgerblue",
                padding: 10,
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                }}
              >
                Puted
              </Text>
            </TouchableOpacity>
          </View>
          {/* );
          })} */}
        </ScrollView>
      )}
    </View>
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
            // headerShown: false,
            drawerIcon: ({ color }) => (
              <FontAwesome name="user-circle-o" size={22} color={color} />
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
          name="EditProfile"
          component={EditProfile}
          options={{
            // headerShown: false,
            // headerTitleStyle: { display: "none" },
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
        {/* <Drawer.Screen
          name="Sertificates"
          component={SertificateScreen}
          options={{  
            // headerShown: false,
            // headerTitleStyle: { display: "none" },
            drawerIcon: ({ color }) => (
              <IconsForMe name="star-border" size={22} color={color} />
            ),
            headerRight: () => {
              return (
                <MaterialIcons
                  name="logout"
                  size={30}
                  color={"#000"}
                  style={{ marginRight: 10 }}
                  onPress={() => {
                    AsyncStorage.clear()
                    props.navigation.navigate('LoginPage')
                  }}
                />
              );
            },
          }}
        /> */}
        <Drawer.Screen
          name="Help"
          component={HelpScreen}
          options={{
            // headerShown: false,
            // headerTitleStyle: { display: "none" },
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
        {/* <Drawer.Screen
          name="ApplicationScreen"
          component={ApplicationScreen}
          options={{
            headerShown: false,
            headerTitleStyle: { display: "none" },
            drawerIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="application-edit"
                  size={24}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="application-edit-outline"
                  size={24}
                  color="black"
                />
              ),
          }}
        /> */}
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
