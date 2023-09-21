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
import NoMyCourse from "./NoMyCourse";
const Stack = createStackNavigator();

export default function Home(key, props) {
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
    <Stack.Navigator key={key}>
      <Stack.Screen
        name="AllCourse"
        component={NoMyCourse}
        options={{
          headerShown: false,
          headerRight: () => {
            return (
              // <View style={{ width: '40%', flexDirection: 'row' }}>
              //   <Text style={{ fontWeight: "bold", position: 'absolute', right: 2, top: 0 }}>0</Text>
              //   <View>
              //     <Text>123123 $</Text>
              //   </View>
              //   <FontAwesome5
              //     name="cart-arrow-down"
              //     size={26}
              //     marginRight={20}
              //     color="black"
              //     onPress={() => navigation.navigate("MyCourses")}
              //   />
              // </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // width: "50%",
                  marginRight: "7%",
                }}
              >
                {/* <FontAwesome5
                  name="cart-arrow-down"
                  size={26}
                  marginRight={20}
                  color="black"
                  onPress={() => navigation.navigate("MyCourses")}
                /> */}
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
                    // marginRight={20}
                    color="black"
                  />
                  {/* <View
                    style={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      zIndex: 2,
                      backgroundColor: "dodgerblue",
                      width: 20,
                      height: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {course.length - 1}
                    </Text>
                  </View> */}
                </Pressable>
                <View></View>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="MyCourses"
        component={ViewPage}
        options={
          {
            // headerShown: false,
            // headerRight: () => {
            //   return (
            //     <FontAwesome5
            //       name="cart-plus"
            //       size={26}
            //       marginRight={20}
            //       color="black"
            //       onPress={() => navigation.navigate("postPage")}
            //     />
            //   );
            // },
          }
        }
      />
      {/* <Stack.Screen
        name="Course"
        component={ViewPage2}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="BonusPage"
        component={BonusPage}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Stack.Screen
        name="CourseTheme"
        component={CourseTheme}
        options={
          {
            // headerShown: false,
          }
        }
      />
    </Stack.Navigator>
  );
}

const ViewPage = (props) => {
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
              .get(`https://markazback2.onrender.com/api/mycourse/${item.id}`, {
                headers: { Authorization: "Bearer " + tokenUser },
              })
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
  const keyOlish = async () => {
    const tokenUser = await AsyncStorage.getItem("token");

    axios
      .get("https://markazback2.onrender.com/auth/oneuser", {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        res.data.map((item) => {
          axios
            .get(`https://markazback2.onrender.com/api/mycourse/${item.id}`, {
              headers: { Authorization: "Bearer " + tokenUser },
            })
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
  useEffect(() => {
    props.navigation.getParent().setOptions({ headerShown: false });
    return () => {
      props.navigation.getParent().setOptions({ headerShown: true });
    };
    setIsLoading(null);
    setRefreshing(true);
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
  return (
    <View style={{ flex: 1 }}>
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
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate(CourseTheme);
                      getted(item);
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
                        borderRadius: 5,
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
                            style={{ width: "100%", height: 100 }}
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
                      </View>
                    </View>
                  </TouchableOpacity>
                  // <TouchableOpacity
                  //   onPress={() => {
                  //     props.navigation.navigate(BonusPage);
                  //     getted(item);
                  //   }}
                  //   style={{ elevation: 10, padding: 10 }}
                  // >
                  //   <View
                  //     style={{
                  //       padding: 10,
                  //       shadowOffset: {
                  //         width: 0,
                  //         height: 1,
                  //       },
                  //       shadowOpacity: 0.22,
                  //       shadowRadius: 2.22,
                  //       elevation: 3,
                  //       backgroundColor: "#fff",
                  //     }}
                  //   >
                  //     {item.image == null ? (
                  //       <View
                  //         style={{
                  //           flexDirection: "row",
                  //           padding: 5,
                  //           justifyContent: "center",
                  //         }}
                  //       >
                  //         <Image
                  //           source={{
                  //             uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                  //           }}
                  //           style={{
                  //             width: 150,
                  //             height: 150,
                  //             borderRadius: 100,
                  //             shadowColor: "#000",
                  //           }}
                  //         />
                  //       </View>
                  //     ) : (
                  //       <View
                  //         style={{
                  //           flexDirection: "row",
                  //           padding: 5,
                  //           justifyContent: "center",
                  //         }}
                  //       >
                  //         <Image
                  //           source={{ uri: `${item.image}` }}
                  //           style={{ width: "100%", height: 200 }}
                  //         />
                  //       </View>
                  //     )}
                  //     <Text style={{ fontSize: 17, padding: 10 }}>
                  //       {item.name}
                  //     </Text>
                  //     <View
                  //       style={{
                  //         flexDirection: "row",
                  //         justifyContent: "space-between",
                  //         width: "65%",
                  //         padding: 10,
                  //       }}
                  //     >
                  //       <View>
                  //         <Text style={{ color: "gray", fontSize: 15 }}>
                  //           Kurs hajmi:
                  //         </Text>
                  //         <Text
                  //           style={{
                  //             fontSize: 18,
                  //           }}
                  //         >
                  //           {item.planned_time}
                  //         </Text>
                  //       </View>
                  //       <View>
                  //         <Text style={{ color: "gray", fontSize: 15 }}>
                  //           Price:
                  //         </Text>
                  //         <Text
                  //           style={{
                  //             fontSize: 18,
                  //           }}
                  //         >
                  //           {item.price}
                  //         </Text>
                  //       </View>
                  //     </View>
                  //   </View>
                  // </TouchableOpacity>
                )}
              />
            </View>
          )}
        </SafeAreaView>
      )}
    </View>
  );
};

const CourseTheme = (props) => {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  useEffect(() => {
    const getKey = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
      const courseId = await AsyncStorage.getItem("courseId");
      axios
        .get(`https://markazback2.onrender.com/api/course_data_theme`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          axios
            .get(`https://markazback2.onrender.com/api/course_data_category`, {
              headers: { Authorization: "Bearer " + tokenUser },
            })
            .then((res1) => {
              const Filter = res1.data.filter(
                (item) => item.course == courseId
              );
              var sassa = [];
              for (let i = 0; i < Filter.length; i++) {
                for (let j = 0; j < res.data.length; j++) {
                  if (Filter[i].id == res.data[j].category) {
                    sassa.push(res.data[j]);
                  }
                }
              }
              if (sassa.length === 0) {
                setState(null);
                console.log("no item");
              } else {
                setState(sassa);
                console.log("yes item");
              }
            })
            .finally(() => {
              setIsLoading(0);
            });
        });
    };
    getKey();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {isLoading === null ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"big"} color={"blue"} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {state === null ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../img/notFound.png")}
                style={{ width: "90%", height: 210 }}
              />
            </View>
          ) : (
            <View>
              {state.map((item) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      margin: 5,
                      borderRadius: 8,
                      padding: 5,
                    }}
                    onPress={() => {
                      props.navigation.navigate(BonusPage);
                      const postKey = async () => {
                        await AsyncStorage.setItem(
                          "courseThemeId",
                          JSON.stringify(item)
                        );
                      };
                      postKey();
                    }}
                  >
                    {/* {item.image === null ? (
                      <Image
                        source={{
                          uri: `https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg`,
                        }}
                        style={{ width: '20%', height: 100 }}
                      />
                    ) : ( */}
                    <Image
                      source={{
                        uri: `https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg`,
                      }}
                      style={{ width: "50%", height: 120 }}
                    />
                    {/* )} */}
                    <View
                      style={{
                        maxWidth: "50%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: "bold",
                        }}
                        numberOfLines={2}
                      >
                        {item.name}
                      </Text>
                      <Text numberOfLines={3}>{item.content}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          {/* <Text>CourseTheme</Text> */}
        </View>
      )}
    </View>
  );
};

// const ViewPage2 = (props, key) => {
//   const [courseid, setCourseid] = useState();
//   const [category, setCategory] = useState([]);
//   const [image, setImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const onRefresh = React.useCallback(() => {
//     setIsLoading(true);
//     const keyOlish = async () => {
//       const courseId2 = await AsyncStorage.getItem("courseId");
//       const tokenUser = await AsyncStorage.getItem("token");

//       axios
//         .get(
//           `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
//           {
//             headers: { Authorization: "Bearer " + tokenUser },
//           }
//         )
//         .then((res) => {
//           const ishlas = res.data.all.filter((item) => (item ? item : "null"));
//           setCategory(ishlas);
//           ishlas[0].theme.map((item) => {
//             setImage(item.image);
//           });
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     };
//     keyOlish();
//   }, []);
//   useEffect(() => {
//     setIsLoading(true);
//     const keyOlish = async () => {
//       const courseId2 = await AsyncStorage.getItem("courseId");
//       const tokenUser = await AsyncStorage.getItem("token");

//       axios
//         .get(
//           `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
//           {
//             headers: { Authorization: "Bearer " + tokenUser },
//           }
//         )
//         .then((res) => {
//           const ishlas = res.data.all.filter((item) => (item ? item : "null"));
//           setCategory(ishlas);
//           ishlas.theme.map((item) => {
//             setImage(item.image);
//             console.log(item);
//           });
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     };
//     keyOlish();
//   }, []);
//   const posted2 = async (key) => {
//     await AsyncStorage.setItem("keyCategorys", JSON.stringify(key.theme));
//     // alert(key.name)
//     props.navigation.navigate(BonusPage);
//   };
//   return (
//     <View
//       key={key}
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 10,
//       }}
//     >
//       {isLoading === true ? (
//         <ActivityIndicator size={"big"} color={"blue"} />
//       ) : (
//         <ScrollView style={{ width: "100%" }}>
//           <View
//             style={
//               category == ""
//                 ? { display: "block" }
//                 : { display: "none", padding: 10 }
//             }
//           >
//             <Image
//               source={{
//                 uri: "https://static.vecteezy.com/system/resources/previews/004/968/529/original/search-no-results-found-concept-illustration-flat-design-eps10-simple-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-with-editable-stroke-line-outline-linear-vector.jpg",
//               }}
//               style={{ width: "100%", height: 300 }}
//             />
//             <Text style={{ textAlign: "center", fontSize: 20, marginTop: 30 }}>
//               No results !
//             </Text>
//           </View>
//           <View
//             style={{
//               width: "100%",
//             }}
//           >
//             {category.map((item) => {
//               return (
//                 <TouchableOpacity
//                   style={
//                     item == ""
//                       ? { display: "none" }
//                       : {
//                           display: "block",
//                           borderWidth: 1,
//                           borderRadius: 10,
//                           marginTop: 10,
//                         }
//                   }
//                   onPress={() => {
//                     posted2(item);
//                   }}
//                 >
//                   <Image
//                     source={{
//                       uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
//                     }}
//                     style={{ width: "100%", height: 220 }}
//                   />
//                   <View
//                     style={{
//                       width: "100%",
//                       height: 40,
//                       flexDirection: "row",
//                       alignItems: "center",
//                       paddingHorizontal: 10,
//                     }}
//                   >
//                     <Text style={{ fontSize: 20 }}>{item.name}</Text>
//                   </View>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const BonusPage = (props) => {
//   useEffect(() => {
//     const getKey = async () => {
//       const numbeKey = await AsyncStorage.getItem('courseThemeId')
//       console.log(numbeKey);
//     }
//     getKey();
//   }, [])
//   return(
//     <View>
//       <Text>as</Text>
//     </View>
//   )
// }

const BonusPage = (props) => {
  const video = useRef(null);
  const [status, setStatus] = React.useState({});
  const [state, setState] = useState([]);
  const [style, setStyle] = useState(false);
  const [comments, setComments] = useState([]);
  const [stateAll, setStateAll] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [name, setName] = useState("");
  const [ignore, setIgnore] = useState("");
  const [ignore2, setIgnore2] = useState(0);
  const [sendComment, setSendComment] = useState("");
  const [themeProvider, setThemeProvider] = useState("");
  const [subcommentOff, setSubcommentOff] = useState(0);
  const [otabek, setOtabek] = useState([]);
  const collapsedShown = () => {
    setCollapsed(!collapsed);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // useEffect(() => {
  //   const getKey = async () => {
  //     const tokenUser = await AsyncStorage.getItem("token");
  //     const keyCategory = await AsyncStorage.getItem("courseId");
  //     const keyCategorys = await AsyncStorage.getItem("keyCategorys");
  //     axios
  //       .get(
  //         `https://markazback2.onrender.com/api/course_data_category/course/${keyCategory}`,
  //         {
  //           headers: { Authorization: "Bearer " + tokenUser },
  //         }
  //       )
  //       .then((res) => {
  //         var a = [];
  //         for (let i = 0; i < keyCategorys.length; i++) {
  //           if (keyCategorys[i].id == res.data.one.id) {
  //             a.push(res.data.one);
  //           }
  //         }
  //         setState(a);
  //         //   console.log(res.data.all[0], 'asd02')
  //         // if (res.data.one) {
  //         //   setState(res.data.one)
  //         //   console.log(res.data.one,"ishladi");
  //         // } else {
  //         //   setState(null)
  //         //   console.log("null");
  //         // }
  //       });
  //   };
  //   getKey();
  // }, []);
  useEffect(() => {
    const getted = async () => {
      var aa = [];
      const tokenUser = await AsyncStorage.getItem("token");
      const courseId = await AsyncStorage.getItem("courseId");
      const courseThemeId = JSON.parse(
        await AsyncStorage.getItem("courseThemeId")
      );
      aa.push(courseThemeId);
      console.log(courseThemeId.id);
      setState(courseThemeId);
      axios
        .get(
          `https://markazback2.onrender.com/api/course_theme_comment/${courseThemeId.id}`,
          {
            headers: { Authorization: "Bearer " + tokenUser },
          }
        )
        .then((res) => {
          setComments(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      // setState(courseId);
      //   axios
      //     .get(
      //       `https://markazback2.onrender.com/api/course_data_category/course/${courseId}`,
      //       {
      //         headers: { Authorization: "Bearer " + tokenUser },
      //       }
      //     )
      //     .then((res) => {
      //       console.warn(res.data);
      //       var aa = [];
      //       aa.push(res.data.one);
      //       if (res.data.one === null) {
      //         setState(null);
      //       } else {
      //         setState(res.data.one);
      //         res.data.all.map((item) => {
      //           console.log(item, "hi");
      //           if (item.theme.length === 0) {
      //             setStateAll(null);
      //           } else {
      //             setStateAll(item.theme);
      //             console.log(item.theme, "issss");
      //           }
      //           axios
      //             .get(
      //               `https://markazback2.onrender.com/api/course_theme_comment/${
      //                 state ? state.id : res.data.one.id
      //               }`,
      //               {
      //                 headers: { Authorization: "Bearer " + tokenUser },
      //               }
      //             )
      //             .then((res2) => {
      //               setComments(res2.data);
      //               res2.data.map((forMe) => {
      //                 console.warn(forMe.message, "warm");
      //               });
      //             });
      //           // .then((res2) => {
      //           //   var dd = [];
      //           //   var dd1 = [];
      //           //   var ww = [];
      //           //   res2.data.map((item3) => {
      //           //     if (item.id === item3.theme) {
      //           //       dd.push(item3);
      //           //       dd1.push(item3);
      //           //     }
      //           //   });
      //           //   setHello(ww);
      //           //   for (let i = 0; i < res2.data.length; i++) {
      //           //     for (let j = 0; j < dd.length; j++) {
      //           //       if (res2.data[i].subcomment == dd[j].id) {
      //           //         res2.data[i].text1 = dd[j].text;
      //           //       }
      //           //     }
      //           //   }
      //           //   const Filter = res2.data.filter(
      //           //     (filter) => filter.theme == item.id
      //           //   );
      //           //   setComments(Filter);
      //           // });
      //         });
      //       }
      //     });
    };
    getted();
  }, []);
  const postMessage = async (key) => {
    setSendComment("");

    const tokenUser = await AsyncStorage.getItem("token");
    const userOffId = await AsyncStorage.getItem("userOffId");
    var data = {
      text: sendComment,
      image: null,
      user_id: userOffId,
      theme: key,
      subcomment: ignore2,
      task_commnet_id: 0,
    };
    console.log(data);
    axios
      .post(
        `https://markazback2.onrender.com/api/course_theme_comment/`,
        data,
        {
          headers: { Authorization: "Bearer " + tokenUser },
        }
      )
      .then((res) => {
        const getted = async () => {
          var aa = [];
          const tokenUser = await AsyncStorage.getItem("token");
          const courseId = await AsyncStorage.getItem("courseId");
          const courseThemeId = JSON.parse(
            await AsyncStorage.getItem("courseThemeId")
          );
          aa.push(courseThemeId);
          console.log(courseThemeId.id);
          setState(courseThemeId);
          axios
            .get(
              `https://markazback2.onrender.com/api/course_theme_comment/${courseThemeId.id}`,
              {
                headers: { Authorization: "Bearer " + tokenUser },
              }
            )
            .then((res) => {
              setComments(res.data);
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        getted();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <View style={{ flex: 1, padding: 5 }}>
      <Text>{otabek.id}</Text>
      {state === null ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Result!</Text>
        </View>
      ) : (
        <ScrollView>
          <Video
            ref={video}
            style={{ width: "100%", height: 210 }}
            source={{
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <Text style={{ fontSize: 20, padding: 10 }}>{state.name}</Text>
          <Text style={{ fontSize: 16, padding: 10 }}>{state.content}</Text>
          <View
            style={{
              padding: 10,
              elevation: 2,
              width: "100%",
              paddingBottom: 40,
            }}
          >
            <View>
              {/* <TouchableOpacity
                onPress={collapsedShown}
                style={{
                  // marginTop: 30,
                  backgroundColor: "#cccccc",
                  padding: 10,
                  borderRadius: collapsed ? 10 : 2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    // textShadowColor: "#000",
                    textShadowRadius: 25,
                  }}
                >
                  View comments
                </Text>
                <Text style={{ color: "white" }}>
                  {comments.length} comments
                </Text>
              </TouchableOpacity> */}
              <View
                // collapsed={collapsed}
                style={{
                  elevation: 1,
                  // height: 200,
                  paddingVertical: style === true ? 10 : 0,
                  paddingHorizontal: 10,
                  backgroundColor: "#E8E9EB",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "end",
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={{}}>{comments.length} comments</Text>
                </View>
                <View>
                  {comments.map((item, index) => {
                    return (
                      <View style={{ marginBottom: 10 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",

                            alignItems: "center",
                            width: "100%",
                            marginTop: 10,
                          }}
                        >
                          <View style={{ width: "20%" }}>
                            <Image
                              source={{
                                uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
                              }}
                              style={{
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              flexDirection: "column",
                              width: "80%",
                              flex: 1,
                            }}
                          >
                            {/* {item.message.map((hello) => {
                              if (hello.length === 0) {
                                return "";
                              } else {
                                  return (
                                    <Text
                                      numberOfLines={1}
                                      style={{
                                        borderLeftWidth: 1,
                                        paddingHorizontal: 5,
                                        color: "red",
                                      }}
                                    >
                                      {item.text}
                                    </Text>
                                  );
                              }
                            })} */}
                            {item.subcomment === 0 ? (
                              ""
                            ) : (
                              <Text
                                numberOfLines={1}
                                style={{
                                  borderLeftWidth: 1,
                                  paddingHorizontal: 5,
                                  color: "black",
                                }}
                              >
                                {message.map((forYou) => {
                                  return forYou.text;
                                })}
                              </Text>
                            )}

                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                              {item.oneuser.username}
                            </Text>
                            <Text style={{ fontSize: 14 }}>{item.text}</Text>
                          </View>
                          <View>
                            {/* <Ionicons
                              onPress={() => {
                                setStyle(true);
                                setName(item.text);
                                setIgnore(item.oneuser.username);
                                setIgnore2(item.id);
                              }}
                              name="md-return-down-back-outline"
                              size={26}
                              style={{ fontWeight: "bold" }}
                              color="black"
                            /> */}
                          </View>
                        </View>
                      </View>
                    );
                  })}
                  {/* <View style={{ marginBottom: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",

                        alignItems: "center",
                        width: "100%",
                        marginTop: 10,
                      }}
                    >
                      <View style={{ width: "20%" }}>
                        <Image
                          source={{
                            uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
                          }}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          width: "80%",
                          flex: 1,
                        }}
                      >
                        <Text
                          numberOfLines={1}
                          style={{
                            borderLeftWidth: 1,
                            paddingHorizontal: 5,
                            color: "black",
                          }}
                        >
                          item.text1
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                          item.user_id
                        </Text>
                        <Text style={{ fontSize: 14 }}>item.text</Text>
                      </View>
                      <View>
                        <Ionicons
                          onPress={() => {
                            setStyle(true);
                          }}
                          name="md-return-down-back-outline"
                          size={26}
                          style={{ fontWeight: "bold" }}
                          color="black"
                        />
                      </View>
                    </View>
                  </View>*/}
                </View>
                {/* <View
                  style={{
                    marginTop: 42,
                    marginRight: 30,
                    borderRadius: 5,
                    flexDirection: "column",
                    height: style === true ? 85 : 0,
                  }}
                >
                  {style === false ? (
                    ""
                  ) : (
                    <View
                      style={{
                        elevation: 1,
                        shadowColor: "black",
                        width: "100%",
                        flexDirection: "row",
                        height: 40,
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text>1</Text>
                      <AntDesign name="closecircleo" size={24} color="black" />
                    </View>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      height: 40,
                      position: "absolute",
                      bottom: 0,
                    }}
                  >
                    <TextInput
                      style={{
                        borderWidth: 1,
                        width: "90%",
                        paddingHorizontal: 10,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                      }}
                      placeholder="Send message..."
                    />
                    <Pressable
                      style={{
                        backgroundColor: "dodgerblue",
                        width: "20%",
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="send" size={30} color="white" />
                    </Pressable>
                  </View>
                </View> */}
              </View>
            </View>
          </View>
          {/* <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            {stateAll === null ? (
              <Text>No video theme!</Text>
            ) : (
              <View>
                {stateAll.map((item) => {
                  return (
                    <Pressable
                      onPress={() => setState(item)}
                      style={{
                        marginBottom: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        borderWidth: 1,
                        borderRadius: 8,
                        // backgroundColor: 'red',
                        padding: 5,
                      }}
                    >
                      <View>
                        <Image
                          source={{
                            uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                          }}
                          style={{ width: 200, height: 120 }}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          width: "50%",
                          paddingHorizontal: 5,
                        }}
                      >
                        <Text
                          style={{
                            marginBottom: 5,
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                          numberOfLines={1}
                        >
                          {item.name}
                        </Text>
                        <Text numberOfLines={3}>{item.content}</Text>
                        <Text
                          style={{ color: "gray", fontSize: 10, marginTop: 10 }}
                        >
                          2023-08-27
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View> */}
          {/* <ScrollView>
            <Pressable
              style={{
                width: "100%",
                height: 40,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "dodgerblue",
              }}
              onPress={() => toggleModal()}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                View our Course
              </Text>
            </Pressable>
          </ScrollView> */}
        </ScrollView>
      )}
      <View
        style={{
          // height: 70,
          marginTop: 20,
          marginBottom: style === true ? 15 : 0,
          position: "absolute",
          zIndex: 9,
          bottom: 0,
          marginLeft: 10,
          backgroundColor: "white",
        }}
      >
        {style === true ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "gray",
              height: 45,
              paddingHorizontal: 10,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <View>
              <Text
                style={{ fontWeight: "bold", fontSize: 16 }}
                numberOfLines={1}
              >
                {ignore}
              </Text>
              <Text numberOfLines={1}>{name}</Text>
            </View>
            <AntDesign
              name="closecircleo"
              size={24}
              color="black"
              onPress={() => {
                setStyle(false);
                setIgnore2(0);
              }}
            />
          </View>
        ) : (
          ""
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            value={sendComment}
            onChangeText={(text) => setSendComment(text)}
            style={{
              borderWidth: 1,
              width: "80%",
              height: 40,
              borderBottomLeftRadius: 8,
              borderTopLeftRadius: style === true ? 0 : 8,
              paddingHorizontal: 10,
            }}
            placeholder="Typing where"
          />
          <Pressable
            style={{
              backgroundColor: "dodgerblue",
              width: "20%",
              borderTopRightRadius: style === true ? 0 : 8,
              borderBottomRightRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              borderWidth: 1,
            }}
            onPress={() => {
              setStyle(false);
              postMessage(state.id);
            }}
          >
            <Ionicons name="send" size={30} color="white" />
          </Pressable>
          {/* <Button title="send" /> */}
        </View>
      </View>
      {/* <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <ScrollView>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <View
                style={{ backgroundColor: "gray", width: "20%", height: 3 }}
              />
              <Entypo name="align-bottom" size={24} color="black" />
            </View>
            <View>
              {stateAll === null ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>No our Theme this course</Text>
                </View>
              ) : (
                <View>
                  {stateAll.map((item) => {
                    return (
                      <View>
                        <Text>view</Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal> */}
    </View>
  );
};

// const BonusPage = (props, key) => {
//   const [courseid, setCourseid] = useState();
//   const [message, setMessage] = useState("");
//   const [category, setCategory] = useState([]);
//   const [playing, setPlaying] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [uzerName, setUzerName] = useState([]);
//   const [messageIgn, setMessageIgn] = useState("");
//   const [messageIgn2, setMessageIgn2] = useState("");
//   const [hello, setHello] = useState();
//   const [sendIgnore, setSendIgnore] = useState(0);
//   const [theme, setTheme] = useState();
//   const [userId, setUserId] = useState();
//   const [style, setStyle] = useState(false);
//   const [tokeeen, setTokeeen] = useState(null);
//   const route = useRoute();
//   const navigation = useNavigation();
//   const video = useRef(null);
//   const [status, setStatus] = React.useState({});
//   useEffect(() => {
//     const keyOlish = async () => {
//       const categoryName = await AsyncStorage.getItem("categoryName");
//       const courseId2 = await AsyncStorage.getItem("keyCategorys");
//       const tokenUser = await AsyncStorage.getItem("token")
//       var vv = [];
//       axios
//         .get(
//           `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
//           {
//             headers: { Authorization: "Bearer " + tokenUser },
//           }
//         )
//         .then((res) => {
//           const ishlas = res.data.all.filter((item) => (item ? item : "null"));
//           setCategory(ishlas);
//           ishlas.map((item) => {
//             item.theme.map((item2) => {
//               setTheme(item2);
//               vv.push(item2);
//             });
//             axios
//               .get("https://markazback2.onrender.com/auth/allusers", {
//                 headers: { Authorization: "Bearer " + tokenUser },
//               })
//               .then((res2) => {
//                 for (let i = 0; i < vv.length; i++) {
//                   for (let j = 0; j < res2.data.length; j++) {
//                     if (vv[i].user_id === res2.data[j].id) {
//                       vv[i].usernameName = res2.data[j].username;
//                       console.log(vv[j].usernameName, "fdg");
//                     }
//                   }
//                 }
//                 setUzerName(res2.data);
//               });
//           });
//         });
//       axios
//         .get("https://markazback2.onrender.com/auth/oneuser", {
//           headers: { Authorization: "Bearer " + tokenUser },
//         })
//         .then((res2) => {
//           res2.data.map((item) => {
//             setUserId(item);
//           });
//         });
//     };
//     const getKey = async () => {
//       const tokenUser = await AsyncStorage.getItem("token");
//       const courseId2 = await AsyncStorage.getItem("keyCategorys");
//       axios
//         .get(
//           `https://markazback2.onrender.com/api/course_data_category/course/90/`,
//           {
//             headers: { Authorization: "Bearer " + tokenUser },
//           }
//         )
//         .then((res) => {
//           console.log(res.data);
//           const ishlas = res.data.all.filter((item) => (item ? item : "null"));
//           ishlas.map((item) => {
//             item.theme.map((item2) => {
//               axios
//                 .get(
//                   `https://markazback2.onrender.com/api/course_theme_comment`,
//                   {
//                     headers: { Authorization: "Bearer " + tokenUser },
//                   }
//                 )
//                 .then((res2) => {
//                   var dd = [];
//                   var dd1 = [];
//                   var ww = [];
//                   res2.data.map((item3) => {
//                     if (item2.id === item3.theme) {
//                       dd.push(item3);
//                       dd1.push(item3);
//                     }
//                   });
//                   setHello(ww);
//                   for (let i = 0; i < res2.data.length; i++) {
//                     for (let j = 0; j < dd.length; j++) {
//                     if (res2.data[i].subcomment==dd[j].id) {
//                      res2.data[i].text1=dd[j].text
//                     }
//                     }
//                    }
//                    const Filter=res2.data.filter(filter=>filter.theme==theme.id)
//                    setComments(Filter)
//                 });
//             });
//           });
//         });
//     };
//     getKey();
//     keyOlish();
//   }, []);
//   const singleTap = Gesture.Tap()
//     .numberOfTaps(2)
//     .onEnd((_event, success) => {
//       if (success) {
//         setStyle(true);
//       }
//     });
//   const postMessage = async () => {
//     const tokenUser = await AsyncStorage.getItem("token");
//     var data = {
//       theme: tokeeen,
//       text: message,
//       subcomment: sendIgnore,
//       user_id: userId.id,
//     };
//     axios
//       .post(`https://markazback2.onrender.com/api/course_theme_comment`, data, {
//         headers: { Authorization: "Bearer " + tokenUser },
//       })
//       .then((responce) => {
//         setStyle(false);
//         const keyOlish = async () => {
//           const categoryName = await AsyncStorage.getItem("categoryName");
//           const courseId2 = await AsyncStorage.getItem("courseId");
//           const tokenUser = await AsyncStorage.getItem("token")
//           var vv = [];
//           axios
//             .get(
//               `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
//               {
//                 headers: { Authorization: "Bearer " + tokenUser },
//               }
//             )
//             .then((res) => {
//               const ishlas = res.data.all.filter((item) => (item ? item : "null"));
//               setCategory(ishlas);
//               ishlas.map((item) => {
//                 item.theme.map((item2) => {
//                   setTheme(item2);
//                   vv.push(item2);
//                 });
//                 axios
//                   .get("https://markazback2.onrender.com/auth/allusers", {
//                     headers: { Authorization: "Bearer " + tokenUser },
//                   })
//                   .then((res2) => {
//                     for (let i = 0; i < vv.length; i++) {
//                       for (let j = 0; j < res2.data.length; j++) {
//                         if (vv[i].user_id === res2.data[j].id) {
//                           vv[i].usernameName = res2.data[j].username;
//                           console.log(vv[j].usernameName, "fdg");
//                         }
//                       }
//                     }
//                     setUzerName(res2.data);
//                   });
//               });
//             });
//           axios
//             .get("https://markazback2.onrender.com/auth/oneuser", {
//               headers: { Authorization: "Bearer " + tokenUser },
//             })
//             .then((res2) => {
//               res2.data.map((item) => {
//                 setUserId(item);
//               });
//             });
//         };
//         const getKey = async () => {
//           const tokenUser = await AsyncStorage.getItem("token");
//           const courseId2 = await AsyncStorage.getItem("courseId");
//           axios
//             .get(
//               `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
//               {
//                 headers: { Authorization: "Bearer " + tokenUser },
//               }
//             )
//             .then((res) => {
//               const ishlas = res.data.all.filter((item) => (item ? item : "null"));
//               ishlas.map((item) => {
//                 item.theme.map((item2) => {
//                   axios
//                     .get(
//                       `https://markazback2.onrender.com/api/course_theme_comment`,
//                       {
//                         headers: { Authorization: "Bearer " + tokenUser },
//                       }
//                     )
//                     .then((res2) => {
//                       var dd = [];
//                       var dd1 = [];
//                       var ww = [];
//                       res2.data.map((item3) => {
//                         if (item2.id === item3.theme) {
//                           dd.push(item3);
//                           dd1.push(item3);
//                         }
//                       });
//                       setHello(ww);
//                       for (let i = 0; i < res2.data.length; i++) {
//                         for (let j = 0; j < dd.length; j++) {
//                         if (res2.data[i].subcomment==dd[j].id) {
//                          res2.data[i].text1=dd[j].text
//                         }
//                         }
//                        }
//                        const Filter=res2.data.filter(filter=>filter.theme==theme.id)
//                        setComments(Filter)
//                     });
//                 });
//               });
//             });
//         };
//         getKey();
//         keyOlish();
//       });
//   };
//   useEffect(() => {
//     const asdasd = async () => {
//       const asd = await AsyncStorage.getItem('keyCategorys')
//       setTokeeen(asd)
//     }
//     asdasd()
//   }, [])

//   return (
//     <View key={key} style={{ paddingBottom: style === false ? 45 : 90 }}>
//       <Text>{tokeeen}</Text>
//       <ScrollView style={{ padding: 5 }}>
//         {category.map((item) => {
//           return (
//             <View>
//               {item.theme.map((item2) => {
//                 return (
//                   <SafeAreaView style={{ width: "100%", marginTop: 10 }}>
//                     <View>
//                       <Video
//                         ref={video}
//                         style={{ width: "100%", height: 210 }}
//                         source={{
//                           uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
//                         }}
//                         useNativeControls
//                         resizeMode={ResizeMode.CONTAIN}
//                         isLooping
//                         onPlaybackStatusUpdate={(status) =>
//                           setStatus(() => status)
//                         }
//                       />
//                     </View>
//                     <Text style={{ fontSize: 25, color: "black", padding: 10 }}>
//                       {item2.name}
//                     </Text>
//                     <View>
//                       {comments.map((item) => {
//                         return (
//                             <View style={{ marginBottom: 10 }}>
//                               <Text>{item.id}</Text>
//                               <Text>{item.theme}</Text>
//                               <View
//                                 style={{
//                                   flexDirection: "row",
//                                   justifyContent: "space-between",

//                                   alignItems: "center",
//                                   width: "100%",
//                                   marginTop: 10,
//                                 }}
//                               >
//                                 <View style={{ width: "20%" }}>
//                                   <Image
//                                     source={{
//                                       uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
//                                     }}
//                                     style={{
//                                       width: 60,
//                                       height: 60,
//                                       borderRadius: 100,
//                                     }}
//                                   />
//                                 </View>
//                                 <View
//                                   style={{
//                                     flexDirection: "column",
//                                     width: "80%",
//                                     flex: 1,
//                                   }}
//                                 >
//                                   {
//                                     item.subcomment === 0 ? "" :  <Text
//                                     numberOfLines={1}
//                                     style={{
//                                       borderLeftWidth: 1,
//                                       paddingHorizontal: 5,
//                                       color: "black",
//                                     }}
//                                   >
//                                     {item.text1}
//                                   </Text>
//                                   }
//                                   <Text
//                                     style={{ fontSize: 17, fontWeight: "bold" }}
//                                   >
//                                     {item.user_id}
//                                   </Text>
//                                   <Text style={{ fontSize: 14 }}>
//                                     {item.text}
//                                   </Text>
//                                 </View>
//                                 <View>
//                                   <Ionicons
//                                     onPress={() => {
//                                       setStyle(true);
//                                       setMessageIgn(item.user_id);
//                                       setMessageIgn2(item.text);
//                                       setSendIgnore(item.id);
//                                     }}
//                                     name="md-return-down-back-outline"
//                                     size={26}
//                                     style={{ fontWeight: "bold" }}
//                                     color="black"
//                                   />
//                                 </View>
//                               </View>
//                             </View>
//                           );
//                         // }
//                       })}
//                     </View>
//                   </SafeAreaView>
//                 );
//               })}
//             </View>
//           );
//         })}
//       </ScrollView>
//       {style == false ? (
//         ""
//       ) : (
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             paddingHorizontal: 5,
//             borderTopWidth: 1,
//           }}
//         >
//           <View style={{ flexDirection: "column" }}>
//             <Text
//               numberOfLines={1}
//               style={{ fontSize: 17, fontWeight: "bold" }}
//             >
//               {messageIgn}
//             </Text>
//             <Text numberOfLines={1} style={{ fontSize: 15 }}>
//               {messageIgn2}
//             </Text>
//           </View>
//           <Feather
//             name="x"
//             size={24}
//             style={{ fontWeight: "bold" }}
//             color="black"
//             onPress={() => {
//               setStyle(false);
//               setSendIgnore(0);
//             }}
//           />
//         </View>
//       )}
//       <View
//         style={{
//           width: "100%",
//           position: "absolute",
//           bottom: 0,
//           flexDirection: "row",
//           height: 40,
//           marginBottom: style === false ? 0 : 45,
//         }}
//       >
//         <TextInput
//           style={{
//             borderWidth: 1,
//             height: 40,
//             width: "85%",
//             paddingHorizontal: 10,
//           }}
//           placeholder="Send message..."
//           onChangeText={(text) => setMessage(text)}
//           value={message}
//         />
//         <Pressable
//           style={{
//             width: "20%",
//             backgroundColor: "dodgerblue",
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             height: 42,
//           }}
//           onPress={() => {
//             setMessage("");
//             Keyboard.dismiss();
//             postMessage();
//           }}
//         >
//           <Ionicons name="send" size={30} color="white" />
//         </Pressable>
//       </View>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: "white",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#FFF",
    paddingTop: 21,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 400,
    paddingBottom: 20,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barIcon: {
    width: 41,
    height: 3,
    backgroundColor: "#D4D4D4",
    borderRadius: 3,
  },
  text: {
    color: "#bbb",
    fontSize: 24,
    marginTop: 100,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
});
