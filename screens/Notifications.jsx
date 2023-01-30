import { getAllNotifications, schedulePushNotification, dismissAllNoti, dismissNoti } from "../util/notificationHandler";
import { setValue, getValue } from "../util/LocalStorage";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { BuddyColors } from "../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-elements";

const Notifications = ({ route, navigation }) => {
  const [notis, setNotis] = useState([]);
  const isFocused = useIsFocused();

  const [enabled, setEnabled] = useState(true);
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");

  const [errorText, setErrorText] = useState("");

  const getNotis = async () => {
    setNotis(await getAllNotifications());
  };

  const remNoti = (id) => {
    dismissNoti(id);
    getNotis();
  };

  useLayoutEffect(() => {
    getNotis();
  }, [isFocused]);

  const setNotification = () => {
    const content = {
      title: "Hey, over: " + "woow",
      body: "woowing cool man",
      data: { buddy: { name: "testing123" } },
    };

    schedulePushNotification(24, 11, content);

    getNotis();
  };

  const saveSettings = () => {

    if (+day > 100 || +day < 0) {
      setErrorText("Warning day cant be above 100 or below 0")
      setDay("")
      return
    }

    const settings = {
      enabled: enabled,
      hoursOnDay: hour,
      daysBefore:day
    };

    // setValue("notiSettings", settings)
  };

  const rem = async () => {
    await dismissAllNoti();
    await getNotis();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Notifications Settings</Text>

        <View style={styles.block}>
          <TouchableOpacity
            style={[styles.flexRow, { marginLeft: 26.5 }]}
            onPress={() => {
              setEnabled(!enabled);
            }}
          >
            {enabled ? (
              <MaterialIcons name="check-box" size={20} color={BuddyColors.accent} />
            ) : (
              <MaterialIcons name="check-box-outline-blank" size={20} color="white" />
            )}

            <Text style={[styles.text, { marginLeft: 3.5 }]}>Enable notifications</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.block}>
          <View style={styles.flexRow}>
            <View style={styles.inputBefore}>
              <TextInput
                placeholder="0/100"
                value={day}
                style={{color:"whitesad"}}
                placeholderTextColor="gray"
                keyboardType="numeric"
                onChangeText={(t) => {
                  
                  setDay(t.replace(/[^0-9]/g, ""));
                }}
              />
            </View>
            <Text style={[styles.text]}>Warning notification before birthday</Text>
          </View>
        </View>

        <View style={styles.block}>
          <View style={styles.flexRow}>
            <View style={styles.inputBefore}>
              <TextInput
                placeholder="0/23"
                placeholderTextColor="gray"
                onChangeText={(t) => {
                  setHour(t);
                }}
              />
            </View>
            <Text style={[styles.text]}>Notification hour of day</Text>
          </View>
        </View>


      </View>

      <View style={styles.block}>
        <Text style={styles.errorText}>{errorText}</Text>
        <View style={styles.button}>
          <Button title={"save"} onPress={() => saveSettings()} />
        </View>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: BuddyColors.background,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    marginBottom: 30,
  },
  block: {
    marginTop: 20,
  },
  errorText: {
    color: BuddyColors.textColor,
    marginBottom:10,
  },
  text: {
    color: BuddyColors.textColor,
  },
  inputBefore: {
    borderRadius: 5,
    padding: 2,
    width: 50,
    borderBottomWidth: 1,
    borderColor: BuddyColors.accent,
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
    color: BuddyColors.textColor,
  },

  // notis: {
  //   margin: 10,
  //   padding: 10,
  //   borderLeftWidth: 2,
  //   borderLeftColor: BuddyColors.accent,
  // },

  // notisText: {
  //   color: BuddyColors.textColor,
  // },

  // button: {
  //   marginBottom: 4,
  // },
});

//   <View style={styles.buttons}>
//   <View style={styles.button}>
//   <Button title={"set notification"} onPress={() => registerForPushNotificationsAsync()} />
//   </View>
//   <View style={styles.button}>
//   <Button
//   title={"remove all"}
//   onPress={() => {
//     rem();
//       }}
//     />
//   </View>
// </View>

//    <ScrollView>
//   <View>
//   {notis.map((noti) => (
//     <TouchableOpacity key={noti.identifier} onPress={() => remNoti(noti.identifier)}>
//     <View style={styles.notis}>
//     <Text style={styles.notisText}>{noti.content.title}</Text>
//     <Text style={styles.notisText}>{stringYearlyNoti(noti)}</Text>
//     </View>
//     </TouchableOpacity>
//     ))}
//     </View>
//   </ScrollView>
