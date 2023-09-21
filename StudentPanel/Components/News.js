
import { View, Text, ScrollView, Image, Button, Linking, Pressable } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
// import Swiper from 'react-native-swiper'
const Stack = createStackNavigator();
const NewsPage = (props) => {
  const [News, setNews] = useState([]);
  const [NewsId, setNewsId] = useState(0);
  const [Newsbase, setNewsbase] = useState([]);

  useEffect(() => {
    const News = async () => {
      const tokenUser = await AsyncStorage.getItem("token");

      console.log(tokenUser);
      axios
        .get("https://markazback2.onrender.com/api/knowladge", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setNews(res.data);
          console.log(res.data);
        });
    };

    News();
    const Newsbase = async () => {
      const tokenUser = await AsyncStorage.getItem("token");

      console.log(tokenUser);
      axios
        .get("https://markazback2.onrender.com/api/base_theme", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setNewsbase(res.data);
          console.log(res.data);
        });
    };

    Newsbase();
  }, []);
  const Filter = async (id) => {
    setNewsId(id);
    const tokenUser = await AsyncStorage.getItem("token");

    console.log(tokenUser);
    axios
      .get("https://markazback2.onrender.com/api/knowladge", {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        const Filter = res.data.filter((item) => item.base_theme == id);
        setNews(Filter);
      });
  };
  const Filter1 = async () => {
    setNewsId(0);
    const News = async () => {
      const tokenUser = await AsyncStorage.getItem("token");

      console.log(tokenUser);
      axios
        .get("https://markazback2.onrender.com/api/knowladge", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setNews(res.data);
          console.log(res.data);
        });
    };
    News();
  };


return (
    <ScrollView>
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: "grey",
      }}
    >
      <View
        style={{
          // width:'100%',
          backgroundColor: "white",
          height: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text
          onPress={() => Filter1()}
          style={
            0 == NewsId
              ? {
                  width: 70,
                  textAlign: "center",
                  // borderWidth: 2,
                  borderBottomWidth:2,
                  borderColor: 'black',
                  padding: 5,
                  color: "black"
                  // zIndex:123
                }
              : {
                  width: 70,
                  textAlign: "center",
                  borderBottomWidth: 2,
                  borderColor: "white",
                  padding: 5,
                  color: "grey",
                }
          }
        >
          Всё
        </Text>
        {Newsbase.map((item, key) => {
          return (
            <Text
              onPress={() => Filter(item.id)}
              style={
                item.id == NewsId
                  ? {
                      width: 70,
                      textAlign: "center",
                      borderColor: "black",
                      borderBottomWidth: 3,
                      padding: 5,
                      color: "black",
                    }
                  : {
                      width: 70,
                      textAlign: "center",
                      borderBottomWidth: 2,
                      borderColor: "white",
                      padding: 5,
                      color: "grey",
                      
                    }
              }
            >
              {item.name}
            </Text>
          );
        })}
      </View>
    </View>
    <View
      style={{
        marginTop: 2,
        marginBottom: 1,
      }}
    >
      {News.map((item) => {
        return (
          <Pressable style={{
            paddingLeft:10,
            paddingRight:10,
            marginBottom:5
          }}
          onPress={() => {
            props.navigation.navigate("NewsScreen");
            const postAsync = async () => {
              await AsyncStorage.setItem(
                "newsId",
                JSON.stringify(item.id)
              );
            };
            postAsync() }}>
            <View
            style={{
              width: "100%",
              // height:200,
              backgroundColor: "white",
              marginTop: 10,
              // borderTopWidth: 0.5,
              borderColor: "black",
              // borderBottomWidth: 1,
              padding: 10,
              borderRadius:10


}}
            >
              <View style={{
                flexDirection:'row',
                alignItems:'center',
                
              }}>
              <Image
                  style={{
                    width: 50,
                    height: 50,
                    // marginBottom: 10,
                    borderRadius:50,
                    borderColor:'black',
                    // borderWidth:0.2
                    // backgroundColor:'blue'
                  }}
                  source={{
                    uri:"https://pbs.twimg.com/profile_images/1234599670795685889/6vohWqtw_400x400.jpg"  }}
                />
               <Text
                 style={{
                   fontSize: 20,
                   color: "black",
                   marginLeft:15,
                   fontFamily: 'sans-serif',
                  }}
                 >
                Horward
               </Text>
              </View>
              <View style={{
                marginTop:10,
                marginBottom:10,
                borderTopWidth:1,
                borderColor:'grey',
                marginHorizontal:2,
              }}></View>
              <Text style={{
                color:'black',
                // paddingLeft:10
                fontSize:15,
                marginBottom:10,
                

              }}>
                {item.name}
              </Text>
              <View style={{
                flex:1,
                alignItems:'center',
                marginBottom:10
              }}>
                <Image source={{uri: 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}} style={{ width: '100%', height: 220 }}/>
                {/* imagenll */}
              </View>
              <View style={{
                marginTop:10,
                marginBottom:10,
                borderTopWidth:1,
                borderColor:'grey',
                marginHorizontal:2,
              }}></View>
              <View
                style={{
                  width: 115,
                  marginLeft: "65%",
                  // paddingTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                >
                <Text
                  style={{
                    color: "grey",
                  }}
                >
                  {item.time_create.slice(11, 16)}
                </Text>
                <Text
                  style={{
                    color: "grey",
                    // paddingTop:10
                  }}
                >
                  {item.time_create.slice(0, 10)}
                </Text>
              </View>
          </View>
            </Pressable>

        );
      })}
      </View>
      </ScrollView>
        );
};
const NewsScreens = (props) => {
  const [news, setNews] = useState([]);
  const [supportedURL, setSupportedURL] = useState("https://google.com");

  // const supportedURL = "https://google.com";
  const unsupportedURL = "slack://open?team=123456";
  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert`(Don't know how to open this URL: ${url})`;
      }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
  };
  useEffect(() => {
    const ax = async () => {
      var newsid = await AsyncStorage.getItem("newsId");
      var tokenUser = await AsyncStorage.getItem("token");


axios
        .get(`https://markazback2.onrender.com/api/knowladge/${newsid}`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setNews(res.data);
          res.data.map((item) => {
            setSupportedURL(item.link);
          });
        });
    };
    ax();
  }, []);
  return (
    <ScrollView>
      <View>
        {news.map((item) => {
          return (
            <View
              style={{
                padding: 10,
              }}
            >
                {/* <Image
                  style={{
                    width: "100%",
                    height: 200,
                    marginBottom: 10,
                  }}
                  source={{ uri: `${item.image}` }}
                /> 
                imagenll
                */}


<View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // justifyContent:'left',
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    marginHorizontal: 5,
                    color: "black",
                    paddingTop: 10,
                    paddingBottom: 10,
                    alignItems: "center",
                  }}
                >
                  {item.name}
                </Text>
              </View>
              <Text
                style={{
                  marginHorizontal: 5,
                  fontSize: 20,
                  fontFamily: "sans-serif-light",
                  fontWeight: "normal",
                  color: "black",
                  paddingBottom: 10,
                }}
              >
                {item.description} Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Voluptatem dignissimos quo consequuntur
                tenetur soluta ab corporis mollitia distinctio exercitationem
                reprehenderit placeat, minus maiores aperiam eligendi, nobis
                sint voluptates! Eum fugiat maxime tempora illum fuga aspernatur
                aliquid ullam ducimus iusto, numquam perferendis cupiditate
                laudantium inventore, commodi optio neque voluptates dolorem,
                quis eveniet ratione? Iure nostrum ab quam blanditiis quis quod
                dolore molestias fugit iste! Harum reprehenderit nemo ex
                repudiandae cumque veritatis modi quisquam placeat quidem
                impedit cum praesentium voluptatem distinctio cupiditate
                tenetur, dolorem ipsa ut dolor deserunt omnis, fugiat eos.
                Quisquam necessitatibus natus incidunt possimus rerum esse nisi
                commodi aut neque corrupti, adipisci nulla tempore excepturi
                cumque voluptate tempora, vero optio laudantium, obcaecati
                minima voluptatem alias delectus eius. Sapiente neque, tenetur
                iste facere officiis commodi adipisci non illum dolores eveniet
                est sint voluptatum repellendus laudantium alias ex odit
                praesentium voluptates! Magni similique, maxime nisi quam sunt
                dignissimos. Dolorem eveniet dolorum assumenda. Voluptatem odit
                tenetur unde nam nisi libero ex magni. Dolor obcaecati eum alias
                doloremque omnis aliquam non similique labore pariatur?
                Consectetur asperiores perferendis corrupti blanditiis dolore
                unde nulla nihil quidem hic eum libero rerum natus, provident
                est exercitationem ipsum atque ut commodi. Est dignissimos
                impedit quas, perferendis corrupti quibusdam cupiditate!
              </Text>
              <View style={{ position: "relative" }}>
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
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: 18,
                    fontFamily: "sans-serif-light",
                    fontWeight: "normal",
                    color: "blue",
                  }}
                  url={supportedURL}
                >
                  {item.link}
                </Text>
              </View>
              <View
                style={{
                  width: 115,
                  marginLeft: "65%",
                  paddingTop: 10,
                  flexDirection: "row",
                  alignItems: "center",


justifyContent: "space-between",
                }}
                >
                <Text
                  style={{
                    color: "grey",
                  }}
                >
                  {item.time_create.slice(11, 16)}
                </Text>
                <Text
                  style={{
                    color: "grey",
                    // paddingTop:10
                  }}
                >
                  {item.time_create.slice(0, 10)}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
const News = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewsPage"
        options={{ headerShown: false }}
        component={NewsPage}
      />
      <Stack.Screen name="NewsScreen" component={NewsScreens} />
    </Stack.Navigator>
  );
};
export default News;