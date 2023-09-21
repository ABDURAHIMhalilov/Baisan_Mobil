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
  
  const Stack = createStackNavigator();
  supportedURL = "https://markazback2.onrender.com/";
  
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
  
  export default function Home(key) {
    const navigation = useNavigation();
    return (
      <Stack.Navigator key={key}>
        <Stack.Screen
          name="Courses"
          component={ViewPage}
          options={{
            headerShown: false,
            headerRight: () => {
              return (
                <FontAwesome5
                  name="cart-plus"
                  size={26}
                  marginRight={20}
                  color="black"
                  onPress={() => navigation.navigate("postPage")}
                />
              );
            },
          }}
        />
        <Stack.Screen
          options={
            {
              // headerShown: false,
            }
          }
          name="Course"
          component={ViewPage2}
        />
        <Stack.Screen
          options={
            {
              // headerShown: false,
            }
          }
          name="BonusPage"
          component={BonusPage}
        />
      </Stack.Navigator>
    );
  }
  
  
  const BonusPage = (props, key) => {
    const [courseid, setCourseid] = useState();
    const [message, setMessage] = useState("");
    const [category, setCategory] = useState([]);
    const [playing, setPlaying] = useState([]);
    const [comments, setComments] = useState([]);
    const [uzerName, setUzerName] = useState([]);
    const [messageIgn, setMessageIgn] = useState("");
    const [messageIgn2, setMessageIgn2] = useState("");
    const [hello, setHello] = useState();
    const [sendIgnore, setSendIgnore] = useState(0);
    const [theme, setTheme] = useState();
    const [userId, setUserId] = useState();
    const [style, setStyle] = useState(false);
    const route = useRoute();
    const video = useRef(null);
    const [status, setStatus] = React.useState({});
    // useEffect(() => {
    //   props.navigation.getParent().setOptions({ headerShown: false });
    //   return () => {
    //     props.navigation.getParent().setOptions({ headerShown: true });
    //   };
    // }, []);
    useEffect(() => {
      const keyOlish = async () => {
        const categoryName = await AsyncStorage.getItem("categoryName");
        const courseId2 = await AsyncStorage.getItem("courseId");
        const tokenUser = await AsyncStorage.getItem("token");
        const jsonStr = JSON.parse(categoryName);
        props.navigation.setOptions({ title: jsonStr });
        var vv = [];
        axios
          .get(
            `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
            {
              headers: { Authorization: "Bearer " + tokenUser },
            }
          )
          .then((res) => {
            const ishlas = res.data.all.filter((item) => (item ? item : "null"));
            setCategory(ishlas);
            ishlas.map((item) => {
              item.theme.map((item2) => {
                setTheme(item2);
                vv.push(item2);
              });
              axios
                .get("https://markazback2.onrender.com/auth/allusers", {
                  headers: { Authorization: "Bearer " + tokenUser },
                })
                .then((res2) => {
                  for (let i = 0; i < vv.length; i++) {
                    for (let j = 0; j < res2.data.length; j++) {
                      if (vv[i].user_id === res2.data[j].id) {
                        vv[i].usernameName = res2.data[j].username;
                        console.log(vv[j].usernameName, "fdg");
                      }
                    }
                  }
                  setUzerName(res2.data);
                });
            });
          });
        axios
          .get("https://markazback2.onrender.com/auth/oneuser", {
            headers: { Authorization: "Bearer " + tokenUser },
          })
          .then((res2) => {
            res2.data.map((item) => {
              setUserId(item);
            });
          });
      };
      const getKey = async () => {
        const tokenUser = await AsyncStorage.getItem("token");
        const courseId2 = await AsyncStorage.getItem("courseId");
        axios
          .get(
            `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
            {
              headers: { Authorization: "Bearer " + tokenUser },
            }
          )
          .then((res) => {
            const ishlas = res.data.all.filter((item) => (item ? item : "null"));
            ishlas.map((item) => {
              item.theme.map((item2) => {
                axios
                  .get(
                    `https://markazback2.onrender.com/api/course_theme_comment`,
                    {
                      headers: { Authorization: "Bearer " + tokenUser },
                    }
                  )
                  .then((res2) => {
                    var dd = [];
                    var dd1 = [];
                    var ww = [];
                    res2.data.map((item3) => {
                      if (item2.id === item3.theme) {
                        dd.push(item3);
                        dd1.push(item3);
                      }
                    });
                    setHello(ww);
                    for (let i = 0; i < res2.data.length; i++) {
                      for (let j = 0; j < dd.length; j++) {
                      if (res2.data[i].subcomment==dd[j].id) {
                       res2.data[i].text1=dd[j].text
                      }
                      }
                     }
                     const Filter=res2.data.filter(filter=>filter.theme==theme.id)
                     setComments(Filter)
                  });
              });
            });
          });
      };
      getKey();
      keyOlish();
    }, []);
    const singleTap = Gesture.Tap()
      .numberOfTaps(2)
      .onEnd((_event, success) => {
        if (success) {
          setStyle(true);
        }
      });
    const postMessage = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
      var data = {
        theme: theme.id,
        text: message,
        subcomment: sendIgnore,
        user_id: userId.id,
      };
      axios
        .post(`https://markazback2.onrender.com/api/course_theme_comment`, data, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((responce) => {
          setStyle(false);
          const keyOlish = async () => {
            const courseId2 = await AsyncStorage.getItem("courseId");
            const tokenUser = await AsyncStorage.getItem("token");
            props.navigation.setOptions({ title: jsonStr });
            var vv = [];
            axios
              .get(
                `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
                {
                  headers: { Authorization: "Bearer " + tokenUser },
                }
              )
              .then((res) => {
                const ishlas = res.data.all.filter((item) => (item ? item : "null"));
                setCategory(ishlas);
                ishlas.map((item) => {
                  item.theme.map((item2) => {
                    setTheme(item2);
                    vv.push(item2);
                  });
                  axios
                    .get("https://markazback2.onrender.com/auth/allusers", {
                      headers: { Authorization: "Bearer " + tokenUser },
                    })
                    .then((res2) => {
                      for (let i = 0; i < vv.length; i++) {
                        for (let j = 0; j < res2.data.length; j++) {
                          if (vv[i].user_id === res2.data[j].id) {
                            vv[i].usernameName = res2.data[j].username;
                            console.log(vv[j].usernameName, "fdg");
                          }
                        }
                      }
                      setUzerName(res2.data);
                    });
                });
              });
            axios
              .get("https://markazback2.onrender.com/auth/oneuser", {
                headers: { Authorization: "Bearer " + tokenUser },
              })
              .then((res2) => {
                res2.data.map((item) => {
                  setUserId(item);
                });
              });
          };
          const getKey = async () => {
            const tokenUser = await AsyncStorage.getItem("token");
            const courseId2 = await AsyncStorage.getItem("courseId");
            axios
              .get(
                `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
                {
                  headers: { Authorization: "Bearer " + tokenUser },
                }
              )
              .then((res) => {
                const ishlas = res.data.all.filter((item) => (item ? item : "null"));
                ishlas.map((item) => {
                  item.theme.map((item2) => {
                    axios
                      .get(
                        `https://markazback2.onrender.com/api/course_theme_comment`,
                        {
                          headers: { Authorization: "Bearer " + tokenUser },
                        }
                      )
                      .then((res2) => {
                        var dd = [];
                        var dd1 = [];
                        var ww = [];
                        res2.data.map((item3) => {
                          if (item2.id === item3.theme) {
                            dd.push(item3);
                            dd1.push(item3);
                          }
                        });
                        setHello(ww);
                        for (let i = 0; i < res2.data.length; i++) {
                          for (let j = 0; j < dd.length; j++) {
                          if (res2.data[i].subcomment==dd[j].id) {
                           res2.data[i].text1=dd[j].text
                          }
                          }
                         }
                         const Filter=res2.data.filter(filter=>filter.theme==item2.id)
                         setComments(Filter)
                      });
                  });
                });
              });
          };
          getKey();
          keyOlish();
        });
    };
    return (
      <View key={key} style={{ paddingBottom: style === false ? 45 : 90 }}>
        <ScrollView style={{ padding: 5 }}>
          {category.map((item) => {
            return (
              <View>
                {item.theme.map((item2) => {
                  return (
                    <SafeAreaView style={{ width: "100%", marginTop: 10 }}>
                      <View>
                        <Video
                          ref={video}
                          style={{ width: "100%", height: 210 }}
                          source={{
                            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                          }}
                          useNativeControls
                          resizeMode={ResizeMode.CONTAIN}
                          isLooping
                          onPlaybackStatusUpdate={(status) =>
                            setStatus(() => status)
                          }
                        />
                      </View>
                      <Text style={{ fontSize: 25, color: "black", padding: 10 }}>
                        {item2.name}
                      </Text>
                      <View>
                        {comments.map((item) => {
                          // if (item.subcomment === 0) {
                          //   return (
                          //     <View style={{ marginBottom: 10 }}>
                          //       <Text>{item.id}</Text>
                          //       <View
                          //         style={{
                          //           flexDirection: "row",
                          //           justifyContent: "space-between",
                          //           alignItems: "center",
                          //           width: "100%",
                          //           marginTop: 10,
                          //         }}
                          //       >
                          //         <View style={{ width: "20%" }}>
                          //           <Image
                          //             source={{
                          //               uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
                          //             }}
                          //             style={{
                          //               width: 60,
                          //               height: 60,
                          //               borderRadius: 100,
                          //             }}
                          //           />
                          //         </View>
                          //         {/*user id  */}
                          //         <View
                          //           style={{
                          //             flexDirection: "column",
                          //             width: "80%",
                          //             flex: 1,
                          //           }}
                          //         >
                          //           <Text
                          //             style={{ fontSize: 17, fontWeight: "bold" }}
                          //           >
                          //             {item.user_id}
                          //           </Text>
                          //           <Text style={{ fontSize: 14 }}>
                          //             {item.text}
                          //           </Text>
                          //         </View>
                          //         <View>
                          //           <Ionicons
                          //             onPress={() => {
                          //               setStyle(true);
                          //               setMessageIgn(item.user_id);
                          //               setMessageIgn2(item.text);
                          //               setSendIgnore(item.id);
                          //             }}
                          //             name="md-return-down-back-outline"
                          //             size={26}
                          //             style={{ fontWeight: "bold" }}
                          //             color="black"
                          //           />
                          //         </View>
                          //       </View>
                          //     </View>
                          //   );
                          // } else {
                            return (
                              <View style={{ marginBottom: 10 }}>
                                <Text>{item.id}</Text>
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
                                    {
                                      item.subcomment === 0 ? "" :  <Text
                                      numberOfLines={1}
                                      style={{
                                        borderLeftWidth: 1,
                                        paddingHorizontal: 5,
                                        color: "black",
                                      }}
                                    >
                                      {item.text1}
                                    </Text>
                                    }
                                    <Text
                                      style={{ fontSize: 17, fontWeight: "bold" }}
                                    >
                                      {item.user_id}
                                    </Text>
                                    <Text style={{ fontSize: 14 }}>
                                      {item.text}
                                    </Text>
                                  </View>
                                  <View>
                                    <Ionicons
                                      onPress={() => {
                                        setStyle(true);
                                        setMessageIgn(item.user_id);
                                        setMessageIgn2(item.text);
                                        setSendIgnore(item.id);
                                      }}
                                      name="md-return-down-back-outline"
                                      size={26}
                                      style={{ fontWeight: "bold" }}
                                      color="black"
                                    />
                                  </View>
                                </View>
                              </View>
                            );
                          // }
                        })}
                      </View>
                    </SafeAreaView>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
        {style == false ? (
          ""
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 5,
              borderTopWidth: 1,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text
                numberOfLines={1}
                style={{ fontSize: 17, fontWeight: "bold" }}
              >
                {messageIgn}
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 15 }}>
                {messageIgn2}
              </Text>
            </View>
            <Feather
              name="x"
              size={24}
              style={{ fontWeight: "bold" }}
              color="black"
              onPress={() => {
                setStyle(false);
                setSendIgnore(0);
              }}
            />
          </View>
        )}
        <View
          style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            height: 40,
            marginBottom: style === false ? 0 : 45,
          }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              height: 40,
              width: "85%",
              paddingHorizontal: 10,
            }}
            placeholder="Send message..."
            onChangeText={(text) => setMessage(text)}
            value={message}
          />
          <Pressable
            style={{
              width: "20%",
              backgroundColor: "dodgerblue",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 42,
            }}
            onPress={() => {
              setMessage("");
              Keyboard.dismiss();
              postMessage();
            }}
          >
            <Ionicons name="send" size={30} color="white" />
          </Pressable>
        </View>
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
  //   const route = useRoute();
  //   const video = useRef(null);
  //   const [status, setStatus] = React.useState({});
  //   useEffect(() => {
  //     props.navigation.getParent().setOptions({ headerShown: false });
  //     return () => {
  //       props.navigation.getParent().setOptions({ headerShown: true });
  //     };
  //   }, []);
  //   useEffect(() => {
  //     const keyOlish = async () => {
  //       const categoryName = await AsyncStorage.getItem("categoryName");
  //       const courseId2 = await AsyncStorage.getItem("courseId");
  //       const tokenUser = await AsyncStorage.getItem("token");
  //       const jsonStr = JSON.parse(categoryName);
  //       props.navigation.setOptions({ title: jsonStr });
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
  //               axios
  //                 .get(
  //                   `https://markazback2.onrender.com/api/course_theme_comment`,
  //                   {
  //                     headers: { Authorization: "Bearer " + tokenUser },
  //                   }
  //                 )
  //                 .then((res2) => {
  //                   var dd = []
  //                   res2.data.map((item3) => {
  //                     if (item2.id === item3.theme) {
  //                       dd.push(item3);
  //                     }
  //                   });
  //                   axios.get(
  //                     "https://markazback2.onrender.com/auth/allusers",
  //                     {
  //                       headers: { Authorization: "Bearer " + tokenUser },
  //                     }
  //                   ).then(res3 => {
  //                     res3.data.map(item => {
  //                       if (item.id === ) {
                          
  //                       }
  //                     })
  //                   })
  //                   setComments(dd);
  //                 });
  //             });
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
  //     keyOlish();
  //   }, []);
  
  //   return (
  //     <View key={key} style={{ paddingBottom: style === false ? 45 : 90 }}>
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
  //                           <View style={{ marginBottom: 10 }}>
  //                             <Text>{item.id}</Text>
  //                             <View
  //                               style={{
  //                                 flexDirection: "row",
  //                                 justifyContent: "space-between",
  
  //                                 alignItems: "center",
  //                                 width: "100%",
  //                                 marginTop: 10,
  //                               }}
  //                             >
  //                               <View style={{ width: "20%" }}>
  //                                 <Image
  //                                   source={{
  //                                     uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
  //                                   }}
  //                                   style={{
  //                                     width: 60,
  //                                     height: 60,
  //                                     borderRadius: 100,
  //                                   }}
  //                                 />
  //                               </View>
  //                               <View
  //                                 style={{
  //                                   flexDirection: "column",
  //                                   width: "80%",
  //                                   flex: 1,
  //                                 }}
  //                               >
  //                                 {item.subcomment === 0 ? (
  //                                   ""
  //                                 ) : (
  //                                   <Text
  //                                     numberOfLines={1}
  //                                     style={{
  //                                       borderLeftWidth: 1,
  //                                       paddingHorizontal: 5,
  //                                       color: "black",
  //                                     }}
  //                                   >
  //                                     {item.subcomment === 582 ? item.text : ""}
  //                                   </Text>
  //                                 )}
  //                                 <Text
  //                                   style={{ fontSize: 17, fontWeight: "bold" }}
  //                                 >
  //                                   {item.text1}
  //                                 </Text>
  //                                 <Text style={{ fontSize: 14 }}>
  //                                   {item.text}
  //                                 </Text>
  //                               </View>
  //                               <View>
  //                                 <Ionicons
  //                                   onPress={() => {
  //                                     setStyle(true);
  //                                     setMessageIgn(item.user_id);
  //                                     setMessageIgn2(item.text);
  //                                     setSendIgnore(item.id);
  //                                   }}
  //                                   name="md-return-down-back-outline"
  //                                   size={26}
  //                                   style={{ fontWeight: "bold" }}
  //                                   color="black"
  //                                 />
  //                               </View>
  //                             </View>
  //                           </View>
  //                         );
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
  const ViewPage = (props) => {
    const [course, setCourse] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, setIsLoading] = useState(null);
  
    const onRefresh = React.useCallback(() => {
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
                });
            });
          });
      };
      setIsLoading(null);
      setRefreshing(true);
      setTimeout(() => {
        setIsLoading(1);
        setRefreshing(false);
      }, 2000);
      keyOlish();
    }, []);
  
    const getted = async (key) => {
      await AsyncStorage.setItem("courseId", JSON.stringify(key));
    };
    useEffect(() => {
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
                });
            });
          });
      };
      setIsLoading(null);
      setRefreshing(true);
      setTimeout(() => {
        setIsLoading(1);
        setRefreshing(false);
      }, 2000);
      keyOlish();
    }, []);
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
              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              >
                {course.map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate("Course");
                        getted(item.id);
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
                })}
                {/* <FlatList
                  data={course}
                  renderItem={({ item }) => (
                 
                  )}
                /> */}
              </ScrollView>
            )}
          </SafeAreaView>
        )}
      </View>
    );
  };
  
  const ViewPage2 = (props, key) => {
    const [courseid, setCourseid] = useState();
    const [category, setCategory] = useState([]);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(null);
    // const [items, setItems] = useState([
    //   { label: "Apple", value: "apple" },
    //   { label: "Banana", value: "banana",onpress: () => {alert('he')} },
    // ]);
    // useEffect(() => {
    //   axios.get('https://baisan.onrender.com/course/ /').then(res => {
    //     // const res2 = res.data.filter(item => item.id == courseid)
    //     if (res.data.id == courseid) {
    //       // console.log(res.data);
    //       setCategory(res.data)
    //     } else {
    //       setCategory(null)
    //     }
    //   })
    //   getted()
    // }, [])
    const onRefresh = React.useCallback(() => {
      setIsLoading(true);
      const keyOlish = async () => {
        const courseId2 = await AsyncStorage.getItem("courseId");
        const tokenUser = await AsyncStorage.getItem("token");
  
        axios
          .get(
            `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
            {
              headers: { Authorization: "Bearer " + tokenUser },
            }
          )
          .then((res) => {
            const ishlas = res.data.all.filter((item) => (item ? item : "null"));
            setCategory(ishlas);
            ishlas[0].theme.map((item) => {
              setImage(item.image);
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
      keyOlish();
    }, []);
    useEffect(() => {
      setIsLoading(true);
      const keyOlish = async () => {
        const courseId2 = await AsyncStorage.getItem("courseId");
        const tokenUser = await AsyncStorage.getItem("token");
  
        axios
          .get(
            `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
            {
              headers: { Authorization: "Bearer " + tokenUser },
            }
          )
          .then((res) => {
            const ishlas = res.data.all.filter((item) => (item ? item : "null"));
            setCategory(ishlas);
            ishlas[0].theme.map((item) => {
              setImage(item.image);
            });
            // ishlas.theme.map(item => {
            // })
  
            // if (res.data.all) {
            //   console.log("null");
            // } else {
            //   console.log(res.data.all, "res.data.all2");
            // }
          })
          .finally(() => {
            setIsLoading(false);
          });
        // const tokenUser = await AsyncStorage.getItem("token");
        // var value = await AsyncStorage.getItem("courseId");
        // // setCourseid(value);
        // console.log(value, 'valueeeee');
        // console.log(tokenUser);
        // axios
        //   .get(
        //     https://markazback2.onrender.com/api/course_data_category/course/${value}/,
        //     {
        //       headers: { Authorization: "Bearer " + tokenUser },
        //     }
        //   )
        //   .then((res) => {
        //     setCategory(res.data.all);
        //   });
      };
      keyOlish();
    }, []);
    const posted2 = async (key) => {
      await AsyncStorage.setItem("keyCategorys", JSON.stringify(key.id));
      await AsyncStorage.setItem("categoryName", JSON.stringify(key.name));
                      props.navigation.navigate(BonusPage);
    };
    // useEffect(() => {
    //   props.navigation.getParent().setOptions({ headerShown: false });
    //   return () => {
    //     props.navigation.getParent().setOptions({ headerShown: true });
    //   };
    // }, []);
    return (
      <View
        key={key}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        {isLoading === true ? (
          <ActivityIndicator size={"big"} color={"blue"} />
        ) : (
          <ScrollView style={{ width: "100%" }}>
            <View
              style={
                category == ""
                  ? { display: "block" }
                  : { display: "none", padding: 10 }
              }
            >
              <Image
                source={{
                  uri: "https://static.vecteezy.com/system/resources/previews/004/968/529/original/search-no-results-found-concept-illustration-flat-design-eps10-simple-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-with-editable-stroke-line-outline-linear-vector.jpg",
                }}
                style={{ width: "100%", height: 250 }}
              />
              <Text style={{ textAlign: "center", fontSize: 20, marginTop: 30 }}>
                No results this type!
              </Text>
            </View>
            <View
              style={{
                width: "100%",
              }}
            >
              {category.map((item) => {
                return (
                  <TouchableOpacity
                    style={
                      item == ""
                        ? { display: "none" }
                        : {
                            display: "block",
                            borderWidth: 1,
                            borderRadius: 10,
                            marginTop: 10,
                          }
                    }
                    onPress={() => {
                      posted2(item);
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                      }}
                      style={{ width: "100%", height: 220 }}
                    />
                    <View
                      style={{
                        width: "100%",
                        height: 40,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    );
  };
  