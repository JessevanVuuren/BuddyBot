import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from './components/UI/DatePicker';
import { StatusBar } from 'expo-status-bar';
import AllPersons from "./screens/AllPersons";
import { Ionicons } from '@expo/vector-icons'
import AddPerson from "./components/person/AddPerson";
import { BuddyColors } from "./constants/colors";

const Stack = createNativeStackNavigator()


export default function App() {



  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: BuddyColors.darkLight},
          headerTintColor: BuddyColors.textColor,
        }}>

          <Stack.Screen name="AllPersons" component={AllPersons} options={({navigation}) => ({
            title: "Birthdays",
            headerRight: ({ tintColor }) => <Ionicons name="add" size={30} color={tintColor} onPress={() => navigation.navigate("AddPerson")} />
          })} />

          <Stack.Screen name="AddPerson" component={AddPerson} options={{
            title: "Add Buddy",
          }} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
