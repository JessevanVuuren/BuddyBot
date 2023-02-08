import { saveValue, getValue } from "../util/LocalStorage";
import { StyleSheet, Text, View  } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { BuddyColors } from "../constants/colors";
import { Picker } from "@react-native-picker/picker";

const Notifications = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const [enabled, setEnabled] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [selectedHour, setSelectedHour] = useState();



  useLayoutEffect(() => {
    (async () => {
      const settings = await getValue("notiSettings");
      if (settings) {
        setEnabled(settings["enabled"]);
        setSelectedDay(settings["daysBefore"]);
        setSelectedHour(settings["hoursOnDay"]);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    const settings = {
      "enabled":enabled,
      "daysBefore": selectedDay,
      "hoursOnDay": selectedHour
    }
    saveValue("notiSettings", settings);
  }, [enabled, selectedDay, selectedHour])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications Settings</Text>

      <View style={styles.block}>
        <Text style={[styles.text, {}]}>Notifications</Text>
        <View style={styles.blueLine}>
          <Picker
            style={styles.select}
            selectedValue={enabled}
            itemStyle={{ color: "white" }}
            dropdownIconColor={BuddyColors.accent}
            onValueChange={(itemValue, itemIndex) => setEnabled(itemValue)}
            mode="dropdown"
          >
            <Picker.Item style={styles.items} label="Enabled" value={true} />
            <Picker.Item style={styles.items} label="Disabled" value={false} />
          </Picker>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={[styles.text, {}]}>Warning notification before birthday</Text>
        <View style={styles.blueLine}>
          <Picker
            style={styles.select}
            selectedValue={selectedDay}
            itemStyle={{ color: "white" }}
            dropdownIconColor={BuddyColors.accent}
            onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
            mode="dropdown"
          >
            <Picker.Item style={styles.items} label="Disabled" value={false} />
            <Picker.Item style={styles.items} label="1 day" value={1} />
            <Picker.Item style={styles.items} label="3 days" value={2} />
            <Picker.Item style={styles.items} label="5 days" value={5} />
            <Picker.Item style={styles.items} label="10 days" value={10} />
            <Picker.Item style={styles.items} label="20 days" value={20} />
          </Picker>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={[styles.text, {}]}>Notification time of day</Text>
        <View style={styles.blueLine}>
          <Picker
            style={styles.select}
            selectedValue={selectedHour}
            itemStyle={{ color: "white" }}
            dropdownIconColor={BuddyColors.accent}
            onValueChange={(itemValue, itemIndex) => setSelectedHour(itemValue)}
            mode="dropdown"
          >
            <Picker.Item style={styles.items} label="05:00" value={5} />
            <Picker.Item style={styles.items} label="07:00" value={7} />
            <Picker.Item style={styles.items} label="09:00" value={9} />
            <Picker.Item style={styles.items} label="11:00" value={11} />
            <Picker.Item style={styles.items} label="13:00" value={13} />
            <Picker.Item style={styles.items} label="15:00" value={15} />
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  select: {
    color: "white",
    backgroundColor: "#353e4a",
  },
  items: {
    color: BuddyColors.textColor,
    backgroundColor: BuddyColors.background,
  },
  blueLine: {
    width:"60%",
    borderBottomColor: BuddyColors.accent,
    borderBottomWidth: 2,
    backgroundColor: "#353e4a",
  },
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
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
    alignItems:"center",
    marginTop: 50,
  },
  errorText: {
    color: BuddyColors.textColor,
    marginBottom: 10,
  },
  text: {
    color: BuddyColors.textColor,
    fontSize: 17,
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
});