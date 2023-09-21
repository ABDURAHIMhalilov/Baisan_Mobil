import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";

const Partner = (props) => {
  useEffect(() => {
    props.navigation.getParent().setOptions({ headerShown: false });
    return () => {
      props.navigation.getParent().setOptions({ headerShown: true });
    };
  }, []);
  return (
    <ScrollView style={{ padding: 10 }}>
      <View>
        <Image
          source={require("../../img/signal-2023-06-09-165727_003.png")}
          style={{ width: "100%", height: 200 }}
        />
      </View>
      {/* <ScrollView> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          marginBottom: 10,
          marginTop: 5,
        }}
      >
        <Image
          source={require("../../img/1.jpeg")}
          style={{
            width: 100,
            height: 70,
            borderWidth: 1,
            borderColor: "black",
          }}
          resizeMode="contain"
        />
        <View style={{ width: "65%" }}>
          <Text>Университет Нилай</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>Huls Transmission Sdn Bhd</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          marginBottom: 10,
          marginTop: 5,
        }}
      >
        <Image
          source={require("../../img/2.jpeg")}
          style={{
            width: 100,
            height: 70,
            borderWidth: 1,
            borderColor: "black",
          }}
          resizeMode="contain"
        />
        <View style={{ width: "65%" }}>
          <Text>Raffles University</Text>
          <Text style={{ fontSize: 13, color: 'gray' }}>
            We are at the cutting edge of higher education in both teaching and
            learning
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          marginBottom: 10,
          marginTop: 5,
        }}
      >
        <Image
          source={require("../../img/3.jpeg")}
          style={{
            width: 100,
            height: 70,
            borderWidth: 1,
            borderColor: "black",
          }}
          resizeMode="contain"
        />
        <View style={{ width: "65%" }}>
          <Text>Budapest</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>Wekerle Business School</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          marginBottom: 10,
          marginTop: 5,
        }}
      >
        <Image
          source={require("../../img/4.jpeg")}
          style={{
            width: 100,
            height: 70,
            borderWidth: 1,
            borderColor: "black",
          }}
          resizeMode="contain"
        />
        <View style={{ width: "65%" }}>
          <Text>Servienoo Guberno</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>School of Diplomacy and International Relations</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          marginBottom: 10,
          marginTop: 5,
        }}
      >
        <Image
          source={require("../../img/5.jpeg")}
          style={{
            width: 100,
            height: 70,
            borderWidth: 1,
            borderColor: "black",
          }}
          resizeMode="contain"
        />
        <View style={{ width: "65%" }}>
          <Text>Servienoo Guberno</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>School of Diplomacy and International Relations</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          marginBottom: 10,
          marginTop: 5,
        }}
      >
        <Image
          source={require("../../img/6.jpeg")}
          style={{
            width: 100,
            height: 70,
            borderWidth: 1,
            borderColor: "black",
          }}
          resizeMode="contain"
        />
        <View style={{ width: "65%" }}>
          <Text>Name: Abbas Group</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>Description: Abbas Group</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          marginBottom: 10,
          marginTop: 5,
        }}
      >
        <Image
          source={require("../../img/7.jpeg")}
          style={{
            width: 100,
            height: 70,
            borderWidth: 1,
            borderColor: "black",
          }}
          resizeMode="contain"
        />
        <View style={{ width: "65%" }}>
          <Text>Name: Abbas Group</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>Description: Abbas Group</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          marginBottom: 10,
          marginTop: 5,
        }}
      >
        <Image
          source={require("../../img/8.jpeg")}
          style={{
            width: 100,
            height: 70,
            borderWidth: 1,
            borderColor: "black",
          }}
          resizeMode="contain"
        />
        <View style={{ width: "65%" }}>
          <Text>Name: Abbas Group</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>Description: Abbas Group</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          marginBottom: 10,
          marginTop: 5,
        }}
      >
        <Image
          source={require("../../img/9.jpeg")}
          style={{
            width: 100,
            height: 70,
            borderWidth: 1,
            borderColor: "black",
          }}
          resizeMode="contain"
        />
        <View style={{ width: "65%" }}>
          <Text>Англо-американский университет</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>Англо-американский университет</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          marginBottom: 10,
          marginTop: 5,
        }}
      >
        <Image
          source={require("../../img/10.jpeg")}
          style={{
            width: 100,
            height: 70,
            borderWidth: 1,
            borderColor: "black",
          }}
          resizeMode="contain"
        />
        <View style={{ width: "65%" }}>
          <Text>Name: Abbas Group</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>Description: Abbas Group</Text>
        </View>
      </View>
      {/* </ScrollView> */}
    </ScrollView>
  );
};

export default Partner;
