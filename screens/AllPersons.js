import { registerForPushNotificationsAsync, setBuddyNotifications } from "../util/notificationHandler"
import { Pressable, StyleSheet, Text, View } from "react-native"
import PersonsList from "../components/person/PersonsList"
import { useLayoutEffect, useState, useRef } from "react"
import { useIsFocused } from "@react-navigation/native"
import * as Notifications from 'expo-notifications';
import { BuddyColors } from "../constants/colors"
import { fetchAllBuddys } from "../util/SQLlite"
import { Ionicons } from '@expo/vector-icons'


const NoBuddys = ({ onPress }) => {
  return (
    <View style={styles.noBuddysContainer}>
      <Text style={styles.noBuddysText}>No Buddys<Text style={{ color: BuddyColors.accent }}>,</Text> yet!</Text>
      <Pressable onPress={onPress} style={styles.addBuddy}>
        <Text style={styles.addBuddyText}>Add Buddy</Text>
      </Pressable>
    </View>
  )
}

const AllPersons = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  const [buddys, setBuddys] = useState(null)
  const isFocused = useIsFocused()

  useLayoutEffect(() => {
    if (isFocused) {
      (async () => {
        const allBuddys = await fetchAllBuddys()
        setBuddyNotifications(allBuddys)
        setBuddys(allBuddys)
      })()
    }
  }, [isFocused])


  useLayoutEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => setNotification(notification));
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => console.log(response));

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])

  const addBuddy = () => {
    navigation.navigate("ManagePerson")
  }

  return (
    <View style={styles.container}>
      {buddys && buddys.length > 0 ? <PersonsList persons={buddys} /> : <NoBuddys onPress={addBuddy} />}

      <View style={styles.addBuddyButton}>

        <Pressable onPress={addBuddy} style={styles.iconHolder}>

          <Ionicons name="add" size={30} color={BuddyColors.textColor} />
        </Pressable>
      </View>
    </View>
  )
}

export default AllPersons


const styles = StyleSheet.create({
  container: {
    backgroundColor: BuddyColors.background,
    flex: 1
  },
  noBuddysContainer: {
    flex: 1,
    marginTop: 200,
    alignItems: "center"
  },
  noBuddysText: {
    color: "white",
    fontSize: 30
  },
  addBuddy: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BuddyColors.accent,
    elevation: 4,
    margin: 30,
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  addBuddyText: {
    color: BuddyColors.accent
  },
  addBuddyButton: {
    position: "absolute",
    alignItems: "center",
    bottom: 30,
    left: 0,
    right: 0,
  },
  iconHolder: {
    backgroundColor: BuddyColors.goodGreen,
    borderRadius: 10,
    padding: 10,

  }
})