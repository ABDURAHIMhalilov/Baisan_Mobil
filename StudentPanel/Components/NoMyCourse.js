import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Linking,
  ActivityIndicator,
  FlatList,
  Pressable,
  Keyboard,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icons from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  SimpleLineIcons,
  Entypo,
  FontAwesome5,
  AntDesign,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
// import DropDownPicker from "react-native-dropdown-picker";
import YoutubeIframe from "react-native-youtube-iframe";
import { Video, ResizeMode } from "expo-av";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Collapsible from "react-native-collapsible";
import Modal from "react-native-modal";
const Stack = createStackNavigator();

const NoMyCourse = (props) => {
  const [course, setCourse] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(null);

  const onRefresh = React.useCallback(() => {
    setIsLoading(null);
    setRefreshing(true);
    const keyOlish = async () => {
      const tokenUser = await AsyncStorage.getItem("token");

      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          res.data.map((item) => {
            axios
              .get(
                `https://markazback2.onrender.com/api/nomycourse/${item.id}`,
                {
                  headers: { Authorization: "Bearer " + tokenUser },
                }
              )
              .then((res2) => {
                res2.data.length < 1 ? setCourse(null) : setCourse(res2.data);
              })
              .finally(() => {
                setIsLoading(1);
                setRefreshing(false);
              });
          });
        });
    };
    keyOlish();
  }, []);

  const getted = async (key) => {
    await AsyncStorage.setItem("courseId", JSON.stringify(key.id));
  };
  useEffect(() => {
    setIsLoading(null);
    setRefreshing(true);
    const keyOlish = async () => {
      const tokenUser = await AsyncStorage.getItem("token");

      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          res.data.map((item) => {
            axios
              .get(
                `https://markazback2.onrender.com/api/nomycourse/${item.id}`,
                {
                  headers: { Authorization: "Bearer " + tokenUser },
                }
              )
              .then((res2) => {
                res2.data.length < 1 ? setCourse(null) : setCourse(res2.data);
              })
              .finally(() => {
                setIsLoading(1);
                setRefreshing(false);
              });
          });
        });
    };
    keyOlish();
  }, []);
  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
  };
  const getCourse = async (key) => {
    const tokenUser = await AsyncStorage.getItem("token");
    const userOffId = await AsyncStorage.getItem("userOffId");
    axios.post(`https://markazback2.onrender.com/api/course/${key.id}/register/${userOffId}`, {
      headers: { Authorization: "Bearer " + tokenUser },
    }).then(res => {
      alert('Successfully registered')
      onRefresh()
    }).catch(err => {
      alert('Error: ' + err.message)
    })

const InfoCourses = () => {
  alert('asd')
}


    // alert(userOffId);

    //   function Buycourse() {
    //     const OneuserId = parseInt(localStorage.getItem("OneuserId"));
    //     document.querySelector('.buy_course_prover').style = "display: none !important;"
    //     axios.post(${url}/api/course/${localStorage.getItem("courseid")}/register/${OneuserId}, { headers: { Authorization: Bearer ${localStorage.getItem("token")} } }).then(res => {
    //         coursData(res.data)
    //         console.log(res.data)
    //         Swal.fire("you have purchased a course")
    //         if (parseInt(localStorage.getItem("position")) === 2) {
    //             window.location = "/mentor"
    //         } else if (parseInt(localStorage.getItem("position")) === 1) {
    //             window.location = "/user"
    //         }
    //         else if (parseInt(localStorage.getItem("position")) === 4) {
    //             window.location = "/studentall"
    //         }
    //     }).catch(err => {
    //         Swal.fire("The balance is insufficient or an error has occurred on the server. Try again")
    //     })
    // }
  };
  return (
    <View
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ flex: 1 }}
    >
      {isLoading === null ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"big"} color={"blue"} />
        </View>
      ) : (
        <SafeAreaView>
          {course == null ? (
            <ScrollView
              style={{
                flexGrow: 1,
                // justifyContent: "center",
                // alignItems: "center",
                // backgroundColor: 'black'
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, marginTop: 20 }}>No Course!</Text>
                <Image
                  source={{
                    uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                  }}
                  style={{ width: "100%", height: 300 }}
                />
                <View style={{ position: "relative" }}>
                  <Button title="Course sotib olish" />
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      zIndex: 3,
                    }}
                  >
                    <OpenURLButton url={supportedURL}>
                      Open Supported URL
                    </OpenURLButton>
                  </View>
                </View>
              </View>
            </ScrollView>
          ) : (
            <View>
              {/* {course.map((item) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate(BonusPage);
                      getted(item);
                    }}
                    style={{ elevation: 10, padding: 10 }}
                  >
                    <View
                      style={{
                        padding: 10,
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                        backgroundColor: "#fff",
                      }}
                    >
                      {item.image == null ? (
                        <View
                          style={{
                            flexDirection: "row",
                            padding: 5,
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={{
                              uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                            }}
                            style={{
                              width: 150,
                              height: 150,
                              borderRadius: 100,
                              shadowColor: "#000",
                            }}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            padding: 5,
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={{ uri: `${item.image}` }}
                            style={{ width: "100%", height: 200 }}
                          />
                        </View>
                      )}
                      <Text style={{ fontSize: 17, padding: 10 }}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "65%",
                          padding: 10,
                        }}
                      >
                        <View>
                          <Text style={{ color: "gray", fontSize: 15 }}>
                            Kurs hajmi:
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                            }}
                          >
                            {item.planned_time}
                          </Text>
                        </View>
                        <View>
                          <Text style={{ color: "gray", fontSize: 15 }}>
                            Price:
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                            }}
                          >
                            {item.price}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })} */}
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={course}
                numColumns={2}
                renderItem={({ item }) => (
                  <Pressable
                  onPress={() => {
                    Alert.alert(`Course: ${item.name}`, `Info: ${item.description}`, [
                      { text: 'ok', color: 'green' },
                    ])
                  }}
                    style={{ elevation: 10, padding: 10, width: "50%" }}
                  >
                    <View
                      style={{
                        padding: 10,
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                        backgroundColor: "#fff",
                        borderRadius: 3,
                      }}
                    >
                      {item.image == null ? (
                        <View
                          style={{
                            flexDirection: "row",
                            padding: 5,
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={{
                              uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                            }}
                            style={{
                              width: 150,
                              height: 150,
                              borderRadius: 100,
                              shadowColor: "#000",
                            }}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            padding: 5,
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={{ uri: `${item.image}` }}
                            style={{ width: "100%", height: 100 }}
                          />
                        </View>
                      )}
                      <Text
                        style={{ fontSize: 14, padding: 10, height: 53 }}
                        numberOfLines={2}
                      >
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: 10,
                        }}
                      >
                        <Text style={{ color: "gray", fontSize: 13 }}>
                          Course Time:
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            width: "60%",
                            // backgroundColor: 'red',
                            textAlign: "center",
                          }}
                        >
                          {item.planned_time} h
                        </Text>
                        {/* <View>
                          <Text style={{ color: "gray", fontSize: 13 }}>
                            Price:
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                            }}
                          >
                            {item.price}
                          </Text>
                        </View> */}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: "60%",
                            height: 30,
                            backgroundColor: "dodgerblue",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 8,
                          }}
                          onPress={() => getCourse(item)}
                        >
                          <Text style={{ color: "white" }}>By Course</Text>
                        </TouchableOpacity>
                        <View>
                          <Text>{item.price}$</Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                )}
              />
            </View>
          )}
        </SafeAreaView>
      )}
    </View>
  );
};

export default NoMyCourse;
