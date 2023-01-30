import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AllPersons from "./screens/AllPersons";
import { Ionicons } from '@expo/vector-icons'
import ManagePerson from "./screens/ManagePerson";
import { BuddyColors } from "./constants/colors";
import { useEffect, useState } from "react";
import { getVersionNum, initDatabase } from "./util/SQLlite";
import PersonDetails from "./screens/PersonDetails";
import LoadingApp from "./components/UI/LoadingApp";
import Notifications from "./screens/Notifications";

const Stack = createNativeStackNavigator()


export default function App() {

  const [appLoading, setAppLoading] = useState(true)

  useEffect(() => {
    const initDB = async () => {
      await initDatabase()
      setAppLoading(false)
    }
    initDB()

  }, [])

  if (appLoading) {
    return <LoadingApp text={"Loading Buddy's"} />
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: BuddyColors.background },
          headerTintColor: BuddyColors.textColor,
        }}>

          <Stack.Screen name="AllPersons" component={AllPersons} options={{ title: "Birthdays" }} />
          <Stack.Screen name="ManagePerson" component={ManagePerson} options={{ title: "Add Buddy" }} />
          <Stack.Screen name="Notifications" component={Notifications} options={{ title: "Manage notifications" }} />
          <Stack.Screen name="PersonDetails" component={PersonDetails} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  loadingApp: {
    backgroundColor: BuddyColors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingAppText: {
    fontSize: 30,
    color: BuddyColors.textColor
  }
});
