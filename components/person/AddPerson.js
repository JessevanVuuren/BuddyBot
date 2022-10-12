import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { BuddyColors } from "../../constants/colors";
import { storeBuddy } from "../../util/localSorage";
import CustomButton from "../UI/CustomButton";
import DatePicker from "../UI/DatePicker";


const AddPerson = ({ navigation }) => {
  const [date, setDate] = useState("")
  const [name, setName] = useState("")

  const dateOfB = (date) => {
    console.log(date)
    setDate(date.toDateString())
  }

  const add = () => {
  
    if (!name) {
      Alert.alert("Name cannot be Null", "ga nie werke man")
      return
    }

    if (!date) {
      Alert.alert("Date cannot be Null", "ga nie werke man")
      return
    }

    console.log("ADD")

    storeBuddy({name: name, dob: date})
  }

  const cancel = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>

        <View style={styles.buddyNameContainer}>
          <Text style={styles.BuddyNameText}>Buddy name:</Text>
          <TextInput style={styles.BuddyName} onChangeText={(name) => setName(name)} />
        </View>
        <View style={styles.BuddyDOBContainer}>
          <DatePicker onDate={dateOfB} />
        </View>

        <View>
          <Text style={styles.showDate}>{date}</Text>
        </View>

      </View>
      <View style={styles.buttons}>
          <CustomButton onPress={cancel} text="CANCEL" style={{marginRight: 10}}/>
          <CustomButton onPress={add} text="ADD" />
        </View>
    </View>
  )
}

export default AddPerson


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BuddyColors.background,
    alignItems: 'center',
  },
  formContainer: {
    width: "80%",
    flex:1,
  },
  buddyNameContainer: {
    marginTop: 50
  },
  BuddyNameText: {
    marginVertical: 5,
    color: BuddyColors.mainColor,
    fontSize: 20
  },
  BuddyName: {
    borderColor: BuddyColors.mainColor,
    borderRadius: 5,
    borderWidth: 2,
    fontSize: 20,
    color: BuddyColors.textColor,
    padding: 10,
  },
  BuddyDOBContainer: {
    marginTop: 25,
  },
  buttons: {
    justifyContent: "space-between",
    marginTop: 25,
    flexDirection: "row",
    width: "80%",
    marginBottom:30,
  },
  showDate: {
    color: BuddyColors.mainColor
  }
})