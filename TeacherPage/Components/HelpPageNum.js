import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const Stack = createStackNavigator();

const url = "https://markazback2.onrender.com/";

const HelpPage = ({ navigation, key }) => {
  const [Help, setHelp] = useState([]);

  useEffect(() => {
    navigation.getParent().setOptions({ headerShown: false });
    return () => {
      navigation.getParent().setOptions({ headerShown: true });
    };
    const Help1 = async () => {
      const tokenUser = await AsyncStorage.getItem("token");

      axios
        .get("https://markazback2.onrender.com/api/help/", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setHelp(res.data);
          console.log(res.data);
        });
    };
    Help1();
  }, []);
  const [collapsed, setCollapsed] = React.useState();
  const toggleExpand = () => {
    setCollapsed(!collapsed);
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <View>
        <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>
          Здравствуйте, чем мы можем вам помочь?
        </Text>
        <View
          style={{
            // flexDirection: "row",
            // flexWrap: "wrap",
            // justifyContent: "space-between",
            padding: 10,
            width: "100%",
          }}
        >
          <FlatList
            // key={key}
            data={Help}
            numColumns={2}
            renderItem={({ item }) => (
              <Pressable
                style={{ width: "50%" }}
                onPress={() => {
                  navigation.navigate("HelpScreen");
                  const postAsync = async () => {
                    // alert(item.id);
                    await AsyncStorage.setItem(
                      "helpId",
                      JSON.stringify(item.id)
                    );
                  };
                  postAsync();
                }}
              >
                <View
                  style={{
                    width: "95%",
                    height: 100,
                    margin: 5,
                    borderRadius: 5,
                    backgroundColor: "#6190E6",
                    elevation: 2,
                    padding: 5,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/471/471664.png",
                  }}
                  style={{ width: "47%", height: 75, }}
                /> */}
                  <Ionicons
                    name="md-help-circle-outline"
                    size={55}
                    color="white"
                  />
                  <Text style={{ textAlign: "center", color: "white" }}>
                    {item.title}
                  </Text>
                </View>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
          />
          {/*
          Help.map(item => {
            return (
              <View style={{ width: '50%',margin: 1, elevation: 2, padding: 5 }}>
              <Image
                source={{
                  uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                }}
                style={{ width: "100%", height: 150 }}
              />
              <Text>{item.title}</Text>
            </View>              
            )
          })
        */}
        </View>
      </View>
      {/* <View
        style={{
          marginTop: 10,
          padding: 7,
          // backgroundColor:'blue'
        }}
      >
        {Help.map((item) => {
          return (
            <View
              style={{
                width: "100%",
                // height: 40,
                // backgroundColor: "white",
                borderRadius: 10,
                marginTop: 5,
                elevation: 1,
                // shadowColor: "#C1DEF0",
              }}
            >
                <AntDesign
                  name="banckward"
                  onPress={() => {


props.navigation.navigate("HelpScreen");
                    const postAsync = async () => {
                      // alert(item.id);
                      await AsyncStorage.setItem(
                        "helpId",
                        JSON.stringify(item.id)
                      );
                    };
                    postAsync();
                  }}
                  style={{
                    zIndex: 2,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "red",
                    color: "black",
                    opacity: 0,
                  }}
                />
              {item.image == null ? (
                <Image
                  style={{
                    width: "100%",
                    height: 200,
                    marginBottom: 10,
                  }}
                  source={{
                    uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                  }}
                />
              ) : (
                <Image
                  style={{
                    width: "100%",
                    height: 200,
                    marginBottom: 10,
                  }}
                  source={{
                    uri: ${item.image},
                  }}
                />
              )}
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 15,
                  paddingTop: 5,
                  color: "dodgerblue",
                }}
              >
                {item.title} ?...
              </Text>
            </View>
          );
        })}
      </View> */}
    </View>
  );
};
const HelpScreen = (props) => {
  const [help, setHelp] = useState([]);
  useEffect(() => {
    const hj = async () => {
      var helpid = await AsyncStorage.getItem("helpId");
      var tokenUser = await AsyncStorage.getItem("token");

      axios
        .get(`https://markazback2.onrender.com/api/help/${helpid}`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setHelp(res.data);
        });
    };
    hj();
  }, []);
  return (
    <ScrollView
      style={{
        padding: 12,
        paddingBottom: 20,
      }}
    >
      {help.map((item) => {
        return (
          <View
            style={{
              paddingBottom: 20,
            }}
          >
            {/* <Image
          style={styles.tinyLogo}
          source={{uri:}}
          /> */}
            <View
              style={{
                flex: 1,
                alignItems: "center",
                // marginLeft:10,
                // marginTop:-15
              }}
            >
              <MaterialIcons name="live-help" size={124} color="#6190E6" />
            </View>
            <Text
              style={{
                color: "black",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 17,
                fontWeight: "normal",
              }}
            >
              {item.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Impedit expedita aperiam officiis, rerum
              inventore nobis iusto illo doloremque at recusandae fugiat
              laboriosam tempore ea nesciunt. Debitis possimus magni odio
              asperiores nihil quaerat voluptatum eius neque facilis, tenetur
              reiciendis maiores incidunt magnam! Enim cupiditate laudantium
              eius voluptates corporis sequi at odit voluptate similique vel ut
              libero, blanditiis eveniet quis nostrum repellendus commodi
              voluptas. Odit possimus voluptas ea itaque saepe ad culpa aperiam
              architecto eaque tempora officiis voluptatem non illum, iste ut
              nihil aliquam dignissimos et reiciendis quo provident corporis
              accusantium! Eligendi sed explicabo labore nemo dicta dolores esse
              accusantium recusandae asperiores dolore maiores dolorem
              consequuntur, voluptatem enim ad deleniti reiciendis quia.
              Deleniti nostrum, neque veritatis non quam odit aliquam
              blanditiis!
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};
const HelpPageNum = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HelpPage"
        options={{ headerShown: false }}
        component={HelpPage}
      />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
    </Stack.Navigator>
  );
};

export default HelpPageNum;
