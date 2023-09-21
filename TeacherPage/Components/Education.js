import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button,
  RefreshControl,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import CalendarPicker from "react-native-calendar-picker";
import { compareAsc, format } from "date-fns";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";
import { Picker } from "@react-native-picker/picker";

const Stack = createStackNavigator();
const Education2 = (props) => {
  const [state, setState] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sertificat, setSertificat] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isStaff, setIsStaff] = useState(true);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [minDate, setMinDte] = useState(new Date()); // Today
  const [maxDate, setMaxDate] = useState(new Date(2026, 6, 3));
  const startDate = selectedStartDate ? selectedStartDate.toString() : "";
  const endDate = selectedEndDate ? selectedEndDate.toString() : "";
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");
  const [sertificat2, setSertificat2] = useState([]);
  const [user, setUser] = useState("");
  const [sertificat3, setSertificat3] = useState();
  const [userModal, setUserModal] = useState();
  const [user2, setUser2] = useState("");
  const [user3, setUser3] = useState([]);
  const updateUser = async (user) => {
    const tokenUser = await AsyncStorage.getItem("token");
    setUser(user);
    axios
      .get(`https://markazback2.onrender.com/edu/sertificat/`, {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        const Filter = res.data.filter((item) => item.description === user);
        Filter.map((item) => {
          setSertificat3(item);
        });
      });
  };
  const updateUser2 = async (user) => {
    const tokenUser = await AsyncStorage.getItem("token");
    setUser2(user);
    axios
      .get(`https://markazback2.onrender.com/auth/allusers`, {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        const Filter = res.data.filter((item) => item.username === user);
        Filter.map((item) => {
          setUser2(item);
        });
      });
  };
  useEffect(() => {
    const geted = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
      axios
        .get(`https://markazback2.onrender.com/edu/education`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          axios
            .get(`https://markazback2.onrender.com/edu/sertificat/`, {
              headers: { Authorization: "Bearer " + tokenUser },
            })
            .then((res2) => {
              // res2.data.map(item => {})
              setSertificat2(res2.data);
              for (let i = 0; i < res.data.length; i++) {
                for (let j = 0; j < res2.data.length; j++) {
                  if (res.data[i].sertificat_id === res2.data[j].id) {
                    res.data[i].sertificat_description =
                      res2.data[j].description;
                    res.data[i].sertificat_image = res2.data[j].file;
                  }
                }
              }
              console.log(res2.data, "asd");
              setState(res.data);
            });
        })
        .finally(() => {
          setIsStaff(false);
        });

      axios
        .get(`https://markazback2.onrender.com/auth/allusers`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setUser3(res.data);
        });
    };
    geted();
  }, []);

  const postStudent = async () => {
    // student id = user2.id
    const tokenUser = await AsyncStorage.getItem("token");
    var data = {
      education_id: userModal,
      student_id: user2.id,
    };
    axios
      .post(`https://markazback2.onrender.com/edu/group_student`, data, {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        setModalVisible2(!isModalVisible2);
        alert("Succes added!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = (key) => {
    setUserModal(key.id);
    setModalVisible2(!isModalVisible2);
  };

  const handlePress = async (key) => {
    await AsyncStorage.setItem("EducationId", JSON.stringify(key.id));
    await AsyncStorage.setItem("education_name", key.education_name);
    props.navigation.navigate("Education3");
  };

  const onDateChange = (date, type) => {
    // const date2 = date.slice(0, 10)
    // console.log(minDate);
    // console.log(maxDate);
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date), setSelectedEndDate(null);
    }
  };

  const handleClick = async () => {
    // const datt = selectedEndDate.replace('"', '')
    // console.log(selectedEndDate.replace('2', ''));
    const tokenUser = await AsyncStorage.getItem("token");
    var data = {
      education_name: name,
      description: description,
      sertificat_id: sertificat3.id,
      start_date: "2023-10-10",
      end_date: "2023-10-11",
    };
    // console.log(sertificat3.id, 'item');
    axios
      .post(`https://markazback2.onrender.com/edu/education`, data, {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        alert("succes posted");
        toggleModal();
        const geted = async () => {
          const tokenUser = await AsyncStorage.getItem("token");
          axios
            .get(`https://markazback2.onrender.com/edu/education`, {
              headers: { Authorization: "Bearer " + tokenUser },
            })
            .then((res) => {
              axios
                .get(`https://markazback2.onrender.com/edu/sertificat/`, {
                  headers: { Authorization: "Bearer " + tokenUser },
                })
                .then((res2) => {
                  // res2.data.map(item => {})
                  setSertificat2(res2.data);
                  for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < res2.data.length; j++) {
                      if (res.data[i].sertificat_id === res2.data[j].id) {
                        res.data[i].sertificat_description =
                          res2.data[j].description;
                        res.data[i].sertificat_image = res2.data[j].file;
                      }
                    }
                  }
                  console.log(res2.data, "asd");
                  setState(res.data);
                });
            })
            .finally(() => {
              setIsStaff(false);
            });
        };
        geted();
      })
      .catch((err) => {
        if (err.message.includes(400)) {
          alert("Information is scarce");
        } else {
          console.log("error");
        }
      });
  };

  const handleDelete = async (key) => {
    const tokenUser = await AsyncStorage.getItem("token");
    axios
      .delete(`https://markazback2.onrender.com/edu/education/${key.id}`, {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        alert("Succes deleted!");
        const geted = async () => {
          const tokenUser = await AsyncStorage.getItem("token");
          axios
            .get(`https://markazback2.onrender.com/edu/education`, {
              headers: { Authorization: "Bearer " + tokenUser },
            })
            .then((res) => {
              axios
                .get(`https://markazback2.onrender.com/edu/sertificat/`, {
                  headers: { Authorization: "Bearer " + tokenUser },
                })
                .then((res2) => {
                  // res2.data.map(item => {})
                  setSertificat2(res2.data);
                  for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < res2.data.length; j++) {
                      if (res.data[i].sertificat_id === res2.data[j].id) {
                        res.data[i].sertificat_description =
                          res2.data[j].description;
                        res.data[i].sertificat_image = res2.data[j].file;
                      }
                    }
                  }
                  console.log(res2.data, "asd");
                  setState(res.data);
                });
            })
            .finally(() => {
              setIsStaff(false);
            });
        };
        geted();
      });
  };

  return (
    <View style={{ flex: 1 }}>
      {isStaff === true ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"big"} color="blue" />
        </View>
      ) : (
        <ScrollView style={{ padding: 5 }}>
          {state.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => handlePress(item)}
                style={{
                  backgroundColor: "white",
                  margin: 2,
                  padding: 5,
                  elevation: 10,
                  marginBottom: 10,
                }}
              >
                <MaterialIcons
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 5,
                    backgroundColor: "red",
                    padding: 5,
                    borderRadius: 10,
                    zIndex: 9,
                  }}
                  onPress={() => handleDelete(item)}
                  name="delete"
                  size={25}
                  color="white"
                />
                <Ionicons
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 5,
                    backgroundColor: "dodgerblue",
                    padding: 5,
                    borderRadius: 10,
                    zIndex: 9,
                  }}
                  name="person-add-sharp"
                  size={25}
                  color="white"
                  onPress={() => toggleModal2(item)}
                />

                <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                  Name: {item.education_name}
                </Text>
                <Text style={{ fontSize: 13, marginBottom: 4, width: "90%" }}>
                  Description: {item.description}
                </Text>
                <Text style={{ fontSize: 13 }}>
                  Sertificat: {item.sertificat_description}
                </Text>
                <View
                  style={{
                    width: "70%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{}}>Start: {item.start_date.slice(0, 10)}</Text>
                  <Text style={{}}>End: {item.end_date.slice(0, 10)}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      <Modal
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
          </View>
          <ScrollView style={{ padding: 10 }}>
            <View>
              <View style={{ marginTop: 10, marginBottom: 5 }}>
                <Text style={{ marginBottom: 2 }}>Add (name)</Text>
                <TextInput
                  placeholder="Name"
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    height: 40,
                    paddingHorizontal: 10,
                  }}
                  onChangeText={(text) => setName(text)}
                  value={name}
                />
              </View>
              <View style={{ marginTop: 10, marginBottom: 5 }}>
                <Text style={{ marginBottom: 2 }}>Add (description)</Text>
                <TextInput
                  placeholder="Description"
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    height: 40,
                    paddingHorizontal: 10,
                  }}
                  onChangeText={(text) => setDescription(text)}
                  value={description}
                />
              </View>
              <View style={{ marginTop: 10, marginBottom: 5 }}>
                <Text style={{ marginBottom: 2 }}>Select (sertificat)</Text>
                {/* <SelectDropdown
                  data={sertificat2.id}
                  onSelect={(selectedItem, index) => {
                    searchApi(index);
                    setSelecteCourse(index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                /> */}
                <Picker
                  selectedValue={user}
                  onValueChange={updateUser}
                  style={{
                    height: 40,
                    width: "100%",
                    backgroundColor: "white",
                    marginBottom: 10,
                    // borderRadius: 80,
                    borderWidth: 10,
                    borderColor: "black",
                  }}
                >
                  {sertificat2.map((item) => {
                    // console.log(item.id);
                    return (
                      <Picker.Item
                        style={{ borderWidth: 10, borderColor: "black" }}
                        label={`${item.description}`}
                        value={`${item.description}`}
                      />
                    );
                  })}
                </Picker>
              </View>
              <View style={{ marginTop: 10, marginBottom: 5 }}>
                <Text style={{ marginBottom: 2 }}>Add (start date)</Text>
                <TextInput
                  placeholder="Start date"
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    height: 40,
                    paddingHorizontal: 10,
                  }}
                  onChangeText={(text) => setSelectedStartDate(text)}
                  value={selectedStartDate}
                />
              </View>
              <View style={{ marginTop: 10, marginBottom: 5 }}>
                <Text style={{ marginBottom: 2 }}>Add (end date)</Text>
                <TextInput
                  placeholder="End date"
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    height: 40,
                    paddingHorizontal: 10,
                  }}
                  onChangeText={(text) => setSelectedEndDate(text)}
                  value={selectedEndDate}
                />
              </View>
              {/* <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                items={[
                  { label: "Football", value: "football" },
                  { label: "Baseball", value: "baseball" },
                  { label: "Hockey", value: "hockey" },
                ]}
              />*/}
              <View
                style={{
                  backgroundColor: "red",
                  borderRadius: 5,
                  overflow: "hidden",
                  marginTop: 10,
                }}
              >
                <Button onPress={handleClick} title="Save" />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <Modal
        onBackdropPress={() => setModalVisible2(false)}
        onBackButtonPress={() => setModalVisible2(false)}
        isVisible={isModalVisible2}
        swipeDirection="down"
        onSwipeComplete={toggleModal2}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
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
            <Text style={{ marginTop: 10 }}>Add student</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              paddingBottom: 10,
              // borderColor: "red",
              borderRadius: 5,
            }}
          >
            <Picker
              selectedValue={user2}
              onValueChange={updateUser2}
              style={{
                height: 40,
                width: "100%",
                backgroundColor: "white",
                marginBottom: 10,
                // borderRadius: 80,
                borderWidth: 10,
                borderColor: "black",
              }}
            >
              {user3.map((item) => {
                return (
                  <Picker.Item
                    style={{ borderWidth: 10, borderColor: "black" }}
                    label={`${item.username}`}
                    value={`${item.username}`}
                  />
                );
              })}
            </Picker>
          </View>
          <View style={{ marginTop: 10 }}>
            <Button onPress={() => postStudent(state.id)} title="Add" />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => toggleModal()}
        style={{
          position: "absolute",
          bottom: 10,
          right: 20,
          backgroundColor: "dodgerblue",
          padding: 5,
          borderRadius: 50,
        }}
      >
        <AntDesign name="pluscircle" size={50} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const Education3 = (props) => {
  const [state, setState] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [edu_name, setEdu_Name] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [groubId, setGroupId] = useState(null);

  const [end_time, setEnd_time] = useState(null);
  const [lesson_name, setLesson_name] = useState(null);
  const [start_time, setStart_time] = useState(null);
  const [teacher_id, setTeacher_id] = useState(16);
  const [allTeachers, setAllTeachers] = useState([]);
  const [oneTeachers, setOneTeachers] = useState();
  const [user, setUser] = useState("");

  const updateUser = async (user) => {
    const tokenUser = await AsyncStorage.getItem("token");
    setUser(user);
    axios
      .get(`https://markazback2.onrender.com/auth/teachers/`, {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        const Filter = res.data.filter((item) => item.username === user);
        Filter.map((item) => {
          setOneTeachers(item);
        });
      });
  };
  useEffect(() => {
    const geted = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
      const EducationId = await AsyncStorage.getItem("EducationId");
      const education_name = await AsyncStorage.getItem("education_name");
      setEdu_Name(education_name);
      axios
        .get(`https://markazback2.onrender.com/edu/schedule/`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          const Filtered = res.data.filter(
            (item) => item.education_id == EducationId
          );
          axios
            .get(`https://markazback2.onrender.com/auth/allusers/`, {
              headers: { Authorization: "Bearer " + tokenUser },
            })
            .then((res1) => {
              for (let i = 0; i < Filtered.length; i++) {
                for (let j = 0; j < res1.data.length; j++) {
                  if (Filtered[i].teacher_id === res1.data[j].id) {
                    Filtered[i].teacher_username = res1.data[j].username;
                  }
                }
              }
              setState(Filtered);
            });
        })
        .finally(() => {
          setIsLoading(false);
        });

      axios
        .get(`https://markazback2.onrender.com/auth/teachers/`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setAllTeachers(res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
      // https://markazback2.onrender.com/auth/teachers/
    };
    geted();
  }, []);

  const handlePressOut = async (key) => {
    await AsyncStorage.setItem("educationsId", JSON.stringify(key.id));
    await AsyncStorage.setItem("educationsLessonName", JSON.stringify(key.id));
    props.navigation.navigate("Education4");
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const handleDelete = async (key) => {
    setIsLoading(true);
    const tokenUser = await AsyncStorage.getItem("token");
    axios
      .delete(`https://markazback2.onrender.com/edu/schedule/${key.id}`, {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        const geted = async () => {
          const tokenUser = await AsyncStorage.getItem("token");
          const EducationId = await AsyncStorage.getItem("EducationId");
          const education_name = await AsyncStorage.getItem("education_name");
          setEdu_Name(education_name);
          axios
            .get(`https://markazback2.onrender.com/edu/schedule/`, {
              headers: { Authorization: "Bearer " + tokenUser },
            })
            .then((res) => {
              const Filtered = res.data.filter(
                (item) => item.education_id == EducationId
              );
              setState(Filtered);
            });
        };
        geted();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onRefresh = React.useCallback(() => {
    const geted = async () => {
      setIsLoading(true);
      const tokenUser = await AsyncStorage.getItem("token");
      const EducationId = await AsyncStorage.getItem("EducationId");
      const education_name = await AsyncStorage.getItem("education_name");
      setEdu_Name(education_name);
      axios
        .get(`https://markazback2.onrender.com/edu/schedule/`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          const Filtered = res.data.filter(
            (item) => item.education_id == EducationId
          );
          axios
            .get(`https://markazback2.onrender.com/auth/allusers/`, {
              headers: { Authorization: "Bearer " + tokenUser },
            })
            .then((res1) => {
              for (let i = 0; i < Filtered.length; i++) {
                for (let j = 0; j < res1.data.length; j++) {
                  if (Filtered[i].teacher_id === res1.data[j].id) {
                    Filtered[i].teacher_username = res1.data[j].username;
                  }
                }
              }
              setState(Filtered);
            });
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    // https://markazback2.onrender.com/auth/teachers/
    geted();
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // const showTimepicker = () => {
  //   showMode("time");
  // };

  const handlePost = async () => {
    console.log(date);
    const tokenUser = await AsyncStorage.getItem("token");
    const EducationId = await AsyncStorage.getItem("EducationId");
    var data = {
      day: date,
      education_id: EducationId,
      end_time: end_time,
      lesson_name: lesson_name,
      start_time: start_time,
      teacher_id: oneTeachers.id, //teacher_id
    };
    axios
      .post(`https://markazback2.onrender.com/edu/schedule/`, data, {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        onRefresh();
        alert("Add successfully!");
        setIsLoading(true);
        toggleModal();
      })
      .catch((err) => {
        if (err.message.includes(400)) {
          alert("Not enough information!");
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <View
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, padding: 10 }}>
        {isLoading === true ? (
          <View
            style={{
              height: Dimensions.get("window").height / 1,
              flex: 1.7,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9,
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View
            style={{ flex: 1, height: Dimensions.get("window").height / 1.2 }}
          >
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={{
                position: "absolute",
                bottom: 10,
                right: 20,
                backgroundColor: "dodgerblue",
                padding: 5,
                borderRadius: 50,
                zIndex: 9,
              }}
            >
              <AntDesign
                name="pluscircle"
                onPress={toggleModal}
                size={50}
                color="white"
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => toggleModal()}
              style={{
                position: "absolute",
                bottom: 10,
                left: 20,
                backgroundColor: "dodgerblue",
                padding: 5,
                borderRadius: 50,
                zIndex: 9,
                width: 50,
                height: 50
              }}
            >
              <Ionicons
                name="person-add-sharp"
                onPress={toggleModal}
                size={35}
                color="white"
              />
            </TouchableOpacity> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "30%",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontSize: 17 }}>Group: </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  {edu_name}
                </Text>
              </View>
              {/* <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "40%",
                  backgroundColor: "dodgerblue",
                  padding: 5,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}
                onPress={toggleModal2}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Add students
                </Text>
                <Ionicons name="person-add-sharp" size={23} color="white" />
              </TouchableOpacity> */}
            </View>
            <ScrollView style={{}}>
              {state.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: Dimensions.get("window").height / 1.5,
                  }}
                >
                  <Image
                    source={require("../../img/notFound.png")}
                    style={{ width: "100%", height: 200 }}
                  />
                </View>
              ) : (
                <ScrollView style={{ padding: 5 }}>
                  {state.map((item) => {
                    return (
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "100%",
                          alignItems: "center",
                          marginBottom: 10,
                          backgroundColor: "white",
                          padding: 10,
                          marginTop: 5,
                        }}
                        onPress={() => handlePressOut(item)}
                      >
                        <View style={{ width: "45%" }}>
                          <Text>Day: {item.day.slice(0, 10)}</Text>
                          {/* <Text>{edu_name}</Text> */}
                          <Text>Lesson: {item.id}</Text>
                          <Text>Teacher: {item.teacher_username}</Text>
                        </View>
                        <View style={{ width: "35%" }}>
                          <Text>Start: {item.start_time}</Text>
                          <Text>End: {item.end_time}</Text>
                        </View>
                        <MaterialIcons
                          style={{
                            // position: "absolute",
                            // top: 10,
                            // right: 5,
                            width: 40,
                            backgroundColor: "red",
                            padding: 5,
                            borderRadius: 10,
                            // zIndex: 9,
                          }}
                          onPress={() => handleDelete(item)}
                          name="delete"
                          size={30}
                          color="white"
                        />
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
            </ScrollView>
            <Modal
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
              <ScrollView style={styles.modalContent}>
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
                  <Text style={{ marginTop: 10 }}>Add lesson</Text>
                </View>
                <View>
                  {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
                  {/* <Text>selected: {date.toLocaleString()}</Text> */}
                  <View style={{ marginTop: 10, marginBottom: 5 }}>
                    <Text style={{ marginBottom: 2 }}>Add (Lesson)</Text>
                    <TextInput
                      placeholder="Enter the name of the lesson here!"
                      style={{
                        borderWidth: 1,
                        borderRadius: 8,
                        height: 40,
                        paddingHorizontal: 10,
                      }}
                      onChangeText={(text) => setLesson_name(text)}
                    />
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 5 }}>
                    <Text style={{ marginBottom: 2 }}>Add (Start time)</Text>
                    <TextInput
                      placeholder="Enter the class start time here!"
                      style={{
                        borderWidth: 1,
                        borderRadius: 8,
                        height: 40,
                        paddingHorizontal: 10,
                      }}
                      onChangeText={(text) => setStart_time(text)}
                    />
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 5 }}>
                    <Text style={{ marginBottom: 2 }}>Add (End time)</Text>
                    <TextInput
                      placeholder="Enter the class end time here!"
                      style={{
                        borderWidth: 1,
                        borderRadius: 8,
                        height: 40,
                        paddingHorizontal: 10,
                      }}
                      onChangeText={(text) => setEnd_time(text)}
                    />
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 5 }}>
                    <Text style={{ marginBottom: 2 }}>Add (teacher)</Text>
                    <Picker
                      selectedValue={user}
                      onValueChange={updateUser}
                      style={{
                        height: 40,
                        width: "100%",
                        backgroundColor: "white",
                        marginBottom: 10,
                        // borderRadius: 80,
                        borderWidth: 10,
                        borderColor: "black",
                      }}
                    >
                      {allTeachers.map((item) => {
                        // console.log(item.id);
                        return (
                          <Picker.Item
                            style={{ borderWidth: 10, borderColor: "black" }}
                            label={`${item.username}`}
                            value={`${item.username}`}
                          />
                        );
                      })}
                    </Picker>
                    <TextInput
                      placeholder="Choose a tutor!"
                      style={{
                        borderWidth: 1,
                        borderRadius: 8,
                        height: 40,
                        paddingHorizontal: 10,
                      }}
                      onChangeText={(text) => setTeacher_id(text)}
                    />
                  </View>

                  <View style={{ marginTop: 10, marginBottom: 5 }}>
                    <Text style={{ marginBottom: 2 }}>Add (Data)</Text>
                    <Button
                      onPress={showDatepicker}
                      title="Enter the date here!"
                    />
                  </View>
                  <View>
                    <Button title="Add" onPress={handlePost} />
                  </View>
                </View>
              </ScrollView>
            </Modal>
            <Modal
              onBackdropPress={() => setModalVisible2(false)}
              onBackButtonPress={() => setModalVisible2(false)}
              isVisible={isModalVisible2}
              swipeDirection="down"
              onSwipeComplete={toggleModal2}
              animationIn="fadeInUp"
              animationOut="fadeOutDown"
              animationInTiming={900}
              animationOutTiming={500}
              backdropTransitionInTiming={1000}
              backdropTransitionOutTiming={500}
              style={styles.modal}
            >
              <View style={styles.modalContent}>
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
                  <Text style={{ marginTop: 10 }}>Add student</Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    paddingBottom: 10,
                    // borderColor: "red",
                    borderRadius: 5,
                  }}
                >
                  <Picker
                    selectedValue={user}
                    onValueChange={updateUser}
                    style={{
                      height: 40,
                      width: "100%",
                      backgroundColor: "white",
                      marginBottom: 10,
                      // borderRadius: 80,
                      borderWidth: 10,
                      borderColor: "black",
                    }}
                  >
                    {allTeachers.map((item) => {
                      // console.log(item.id);
                      return (
                        <Picker.Item
                          style={{ borderWidth: 10, borderColor: "black" }}
                          label={`${item.username}`}
                          value={`${item.username}`}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Button title="Add" />
                </View>
              </View>
            </Modal>
          </View>
        )}
      </View>
    </View>
  );
};

const Education4 = (props) => {
  const [state, setState] = useState([]);
  const [state2, setState2] = useState([]);
  const [educationsLessonName, setEducationsLessonName] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [user, setUser] = useState("");
  const [oneTeachers, setOneTeachers] = useState();

  const [editNumId, setEditNumId] = useState();
  const [editNumId2, setEditNumId2] = useState();
  const [editNumId0, setEditNumId0] = useState();
  const [editNumId02, setEditNumId02] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const [mark, setMark] = useState();
  const [came, setCame] = useState();
  const [came2, setCame2] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const updateUser = async (user) => {
    const tokenUser = await AsyncStorage.getItem("token");
    setUser(user);
    // axios
    //   .get(`https://markazback2.onrender.com/auth/allusers`, {
    //     headers: { Authorization: "Bearer " + tokenUser },
    //   })
    //   .then((res) => {
    //     const Filter = res.data.filter((item) => item.username === user);
    //     Filter.map((item) => {
    //       setOneTeachers(item);
    //     });
    //   });
  };
  const gettt = async () => {
    setIsLoading(true);
    const gettttt = await AsyncStorage.getItem("educationsId");
    const EducationId = await AsyncStorage.getItem("EducationId");
    const tokenUser = await AsyncStorage.getItem("token");
    const educationsLessonName = JSON.parse(
      await AsyncStorage.getItem("educationsLessonName")
    );
    axios
      .get(`https://markazback2.onrender.com/edu/group_student`, {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        const Filter = res.data.filter(
          (filtered) => filtered.education_id == EducationId
        );
        axios
          .get(`https://markazback2.onrender.com/edu/attendance_lesson/`, {
            headers: { Authorization: "Bearer " + tokenUser },
          })
          .then((res3) => {
            const FilterTwo = res3.data.filter(
              (item) => item.group_id == Filter.id
            );
            // for (let i = 0; i < Filter.length; i++) {
            //   for (let j = 0; j < res3.data.length; j++) {
            //     if (Filter[i].id == res3.data[j].group_id) {
            //       setState2(res3.data[j]);
            //       console.log(res3.data[j]);
            //     } else {
            //       console.log("not found ");
            //     }
            //   }
            // }
            axios
              .get(`https://markazback2.onrender.com/auth/allusers`, {
                headers: { Authorization: "Bearer " + tokenUser },
              })
              .then((res2) => {
                for (let g = 0; g < res2.data.length; g++) {
                  for (let n = 0; n < Filter.length; n++) {
                    if (res2.data[g].id == Filter[n].student_id) {
                      Filter[n].username = res2.data[g].username;
                    }
                  }
                }
                setAllUsers(Filter);
                for (let i = 0; i < Filter.length; i++) {
                  for (let g = 0; g < res3.data.length; g++) {
                    for (let j = 0; j < res2.data.length; j++) {
                      if (
                        Filter[i].id == res3.data[g].student_id &&
                        Filter[i].student_id == res2.data[j].id
                      ) {
                        Filter[i].student_name = res2.data[j].username;
                        Filter[i].mark = res3.data[g].mark;
                        Filter[i].markId = res3.data[g].id;
                        Filter[i].came = res3.data[g].came;
                        Filter[i].lesson_id = res3.data[g].lesson_id;
                        Filter[i].student_id = res2.data[j].id;
                      }
                    }
                  }
                }
                const FilterScheduel = Filter.filter(
                  (filter) => filter.lesson_id == gettttt
                );
                console.log(FilterScheduel);
                setState(FilterScheduel);
              })
              .finally(() => {
                setIsLoading(false);
              });
          });
      });
  };
  useEffect(() => {
    gettt();
  }, []);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    // setCame2(key.came);
  };

  const toggleModal2 = (key) => {
    setEditNumId0(key);
    setEditNumId02(key);
    setModalVisible2(!isModalVisible2);
  };

  const handleOut = async () => {
    const educationsLessonName = JSON.parse(
      await AsyncStorage.getItem("educationsLessonName")
    );
    const tokenUser = await AsyncStorage.getItem("token");
    var data = {
      student_id: editNumId02.id,
      lesson_id: educationsLessonName,
      mark: editNumId,
      came: came2,
    };
    console.log(data);
    axios
      .put(
        `https://markazback2.onrender.com/edu/attendance_lesson/${editNumId0.markId}/`,
        data,
        {
          headers: { Authorization: "Bearer " + tokenUser },
        }
      )
      .then((res) => {
        toggleModal2();
        setIsLoading(true);
        const gettt = async () => {
          setIsLoading(true);
          const gettttt = await AsyncStorage.getItem("educationsId");
          const EducationId = await AsyncStorage.getItem("EducationId");
          const tokenUser = await AsyncStorage.getItem("token");
          const educationsLessonName = JSON.parse(
            await AsyncStorage.getItem("educationsLessonName")
          );
          axios
            .get(`https://markazback2.onrender.com/edu/group_student`, {
              headers: { Authorization: "Bearer " + tokenUser },
            })
            .then((res) => {
              const Filter = res.data.filter(
                (filtered) => filtered.education_id == EducationId
              );
              axios
                .get(
                  `https://markazback2.onrender.com/edu/attendance_lesson/`,
                  {
                    headers: { Authorization: "Bearer " + tokenUser },
                  }
                )
                .then((res3) => {
                  const FilterTwo = res3.data.filter(
                    (item) => item.group_id == Filter.id
                  );
                  // for (let i = 0; i < Filter.length; i++) {
                  //   for (let j = 0; j < res3.data.length; j++) {
                  //     if (Filter[i].id == res3.data[j].group_id) {
                  //       setState2(res3.data[j]);
                  //       console.log(res3.data[j]);
                  //     } else {
                  //       console.log("not found ");
                  //     }
                  //   }
                  // }
                  axios
                    .get(`https://markazback2.onrender.com/auth/allusers`, {
                      headers: { Authorization: "Bearer " + tokenUser },
                    })
                    .then((res2) => {
                      for (let g = 0; g < res2.data.length; g++) {
                        for (let n = 0; n < Filter.length; n++) {
                          if (res2.data[g].id == Filter[n].student_id) {
                            Filter[n].username = res2.data[g].username;
                          }
                        }
                      }
                      setAllUsers(Filter);
                      for (let i = 0; i < Filter.length; i++) {
                        for (let g = 0; g < res3.data.length; g++) {
                          for (let j = 0; j < res2.data.length; j++) {
                            if (
                              Filter[i].id == res3.data[g].student_id &&
                              Filter[i].student_id == res2.data[j].id
                            ) {
                              Filter[i].student_name = res2.data[j].username;
                              Filter[i].mark = res3.data[g].mark;
                              Filter[i].markId = res3.data[g].id;
                              Filter[i].came = res3.data[g].came;
                              Filter[i].lesson_id = res3.data[g].lesson_id;
                              Filter[i].student_id = res2.data[j].id;
                            }
                          }
                        }
                      }
                      const FilterScheduel = Filter.filter(
                        (filter) => filter.lesson_id == gettttt
                      );
                      console.log(FilterScheduel);
                      setState(FilterScheduel);
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                });
            });
        };
        gettt();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err, "hiiii");
      });
  };
  const handleOut2 = async () => {
    const tokenUser = await AsyncStorage.getItem("token");
    const educationsLessonName = JSON.parse(
      await AsyncStorage.getItem("educationsLessonName")
    );
    var data = {
      lesson_id: educationsLessonName,
      student_id: user,
      mark: mark,
      came: came2,
    };
    console.log(data);
    axios
      .post(`https://markazback2.onrender.com/edu/attendance_lesson/`, data, {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        toggleModal();
        alert("Added succesfully!");
        gettt();
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.message.includes(400)) {
          alert("This student has been graded");
        } else {
          alert("Something went wrong");
        }
        console.log(err);
      });
  };
  const handleDelete = async (key) => {
    const tokenUser = await AsyncStorage.getItem("token");
    axios
      .delete(
        `https://markazback2.onrender.com/edu/attendance_lesson/${key.markId}`,
        {
          headers: { Authorization: "Bearer " + tokenUser },
        }
      )
      .then((res) => {
        setIsLoading(true);
        gettt();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => toggleModal()}
        style={{
          position: "absolute",
          bottom: 10,
          right: 20,
          backgroundColor: "dodgerblue",
          padding: 5,
          borderRadius: 50,
          zIndex: 9,
        }}
      >
        <AntDesign
          name="pluscircle"
          onPress={toggleModal}
          size={50}
          color="white"
        />
      </TouchableOpacity>
      {isLoading === true ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"big"} color={"blue"} />
        </View>
      ) : (
        <View>
          {state.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../img/notFound.png")}
                style={{ width: "100%", height: 200 }}
              />
            </View>
          ) : (
            <View>
              {state.map((item) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderWidth: 1,
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{
                        borderRightWidth: 1,
                        // paddingHorizontal: 5,
                        padding: 10,
                      }}
                    >
                      {item.mark === 2 ? (
                        <Image
                          source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/8068/8068070.png",
                          }}
                          style={{ width: 50, height: 55 }}
                        />
                      ) : item.mark === 3 ? (
                        <Image
                          source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/8068/8068125.png",
                          }}
                          style={{ width: 50, height: 55 }}
                        />
                      ) : item.mark === 4 ? (
                        <Image
                          source={{
                            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Unicode_0x0034.svg/1200px-Unicode_0x0034.svg.png",
                          }}
                          style={{ width: 50, height: 55 }}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: "https://png.pngtree.com/png-vector/20210302/ourlarge/pngtree-number-5-or-five-gold-luxury-png-image_3000520.jpg",
                          }}
                          style={{ width: 50, height: 55 }}
                        />
                      )}
                    </View>
                    <View style={{ width: "50%" }}>
                      <Text>
                        Name:&nbsp;
                        {item.student_name ? item.student_name : "not"}
                      </Text>
                      <Text>
                        Status:&nbsp;
                        {item.came === true ? (
                          <Text style={{ color: "green", fontWeight: "bold" }}>
                            Yes
                          </Text>
                        ) : (
                          <Text style={{ color: "red", fontWeight: "bold" }}>
                            No
                          </Text>
                        )}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleModal2(item)}>
                      <MaterialIcons name="edit" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item)}>
                      <MaterialIcons name="delete" size={24} color="red" />
                    </TouchableOpacity>
                  </View>

                  // <View
                  //   style={{
                  //     marginBottom: 10,
                  //   }}
                  // >
                  //   <View
                  //     style={{
                  //       flexDirection: "row",
                  //       justifyContent: "space-between",
                  //       width: "100%",
                  //       alignItems: "center",
                  //     }}
                  //   >
                  //     <Text>
                  //       Name: {item.student_name ? item.student_name : "not"}
                  //     </Text>
                  //     {/* <Text
                  //     style={{
                  //       color: "green",
                  //     }}
                  //     >
                  //     baho Id:{item.markId}
                  //     </Text>
                  //     <Text
                  //     style={{
                  //       color: "green",
                  //     }}
                  //   >
                  //     lesson_id:{item.lesson_id}
                  //   </Text> */}
                  //     <Text
                  //       style={{
                  //         color: "green",
                  //       }}
                  //     >
                  //       status: {item.came === true ? "Yes" : "No"}
                  //     </Text>
                  //   </View>
                  //   <View>
                  //     <Text
                  //       style={{
                  //         color: "green",
                  //       }}
                  //     >
                  //       baho:{item.mark}
                  //     </Text>
                  //   </View>
                  // </View>
                );
              })}
            </View>
          )}
        </View>
      )}
      <Modal
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
          </View>
          <View>
            <View>
              <Text>Select student</Text>
              <View
                style={{
                  borderWidth: 1,
                  // paddingHorizontal: 10,
                  // paddingVertical: 10,
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <Picker
                  selectedValue={user}
                  onValueChange={updateUser}
                  style={{
                    // height: 40,
                    width: "100%",
                    // backgroundColor: "#ccc",
                  }}
                >
                  {allUsers.map((item) => {
                    return (
                      <Picker.Item
                        style={{ borderWidth: 10, borderColor: "black" }}
                        label={`${item.username}`}
                        value={`${item.id}`}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text>Grade: (An assessment of the student)</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                }}
                keyboardType="numeric"
                onChangeText={(text) => setMark(text)}
              />
            </View>
            <View style={{ marginVertical: 5 }}>
              <Text>Status: (The presence or absence of a student)</Text>
              {came2 === true ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={() => setCame2(true)}
                    style={{
                      width: "50%",
                      height: 40,
                      backgroundColor: "green",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                      borderWidth: 2,
                      borderColor: "green",
                    }}
                  >
                    <Text style={{ color: "white" }}>true</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setCame2(false)}
                    style={{
                      width: "50%",
                      height: 40,
                      // backgroundColor: "red",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                      borderWidth: 2,
                      borderColor: "red",
                    }}
                  >
                    <Text style={{ color: "red" }}>false</Text>
                  </Pressable>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={() => setCame2(true)}
                    style={{
                      width: "50%",
                      height: 40,
                      // backgroundColor: "green",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                      borderWidth: 2,
                      borderColor: "green",
                    }}
                  >
                    <Text style={{ color: "green" }}>true</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setCame2(false)}
                    style={{
                      width: "50%",
                      height: 40,
                      backgroundColor: "red",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                      borderWidth: 2,
                      borderColor: "red",
                    }}
                  >
                    <Text style={{ color: "white" }}>false</Text>
                  </Pressable>
                </View>
              )}
              {/* <TextInput
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                }}
              /> */}
            </View>
            <Button title="Add" onPress={handleOut2} />
          </View>
        </View>
      </Modal>

      <Modal
        onBackdropPress={() => setModalVisible2(false)}
        onBackButtonPress={() => setModalVisible2(false)}
        isVisible={isModalVisible2}
        swipeDirection="down"
        onSwipeComplete={toggleModal2}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
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
          </View>
          <View>
            <View style={{ marginVertical: 10 }}>
              <Text>Grade: (An assessment of the student) {editNumId}</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                }}
                // value={editNumId}
                onChangeText={(text) => setEditNumId(text)}
              />
            </View>
            <View style={{ marginVertical: 5 }}>
              {came2 === true ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={() => setCame2(true)}
                    style={{
                      width: "50%",
                      height: 40,
                      backgroundColor: "green",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                      borderWidth: 2,
                      borderColor: "green",
                    }}
                  >
                    <Text style={{ color: "white" }}>true</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setCame2(false)}
                    style={{
                      width: "50%",
                      height: 40,
                      // backgroundColor: "red",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                      borderWidth: 2,
                      borderColor: "red",
                    }}
                  >
                    <Text style={{ color: "red" }}>false</Text>
                  </Pressable>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={() => setCame2(true)}
                    style={{
                      width: "50%",
                      height: 40,
                      // backgroundColor: "green",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                      borderWidth: 2,
                      borderColor: "green",
                    }}
                  >
                    <Text style={{ color: "green" }}>true</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setCame2(false)}
                    style={{
                      width: "50%",
                      height: 40,
                      backgroundColor: "red",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                      borderWidth: 2,
                      borderColor: "red",
                    }}
                  >
                    <Text style={{ color: "white" }}>false</Text>
                  </Pressable>
                </View>
              )}
            </View>
            <Button title="Edit" onPress={handleOut} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Education = (props) => {

  useEffect(() => {
    props.navigation.getParent().setOptions({ headerShown: false });
    return () => {
      props.navigation.getParent().setOptions({ headerShown: true });
    };
  }, [])
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Education"
        component={Education2}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Education3"
        component={Education3}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Education4"
        component={Education4}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Education;
// {
//   created_date: "2023-09-01T10:25:06.577Z",
//   description: "qwertyuiop",
//   education_name: "coffe",
//   end_date: "2023-09-01T00:00:00.000Z",
//   id: 43,
//   sertificat_id: 1,
//   start_date: "2023-08-31T00:00:00.000Z",
// }

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: "white",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
    // paddingBottom: 30,
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
