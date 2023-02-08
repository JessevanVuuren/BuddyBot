import { Alert, StyleSheet, Text, TextInput, View, Image, ScrollView } from "react-native"
import { fetchSingleBuddy, removeBuddy, saveNewBuddy, updateBuddy } from "../util/SQLlite"
import ProfilePic from "../components/person/ProfilePic"
import CustomButton from "../components/UI/CustomButton"
import BuddyAvatar from "../components/UI/BuddyAvatar"
import DatePicker from "../components/UI/DatePickerNew"
import { BuddyColors } from "../constants/colors"
import { moveFileToLocal } from "../util/utils"
import { useEffect, useState } from "react"
import moment from 'moment'

const ManagePerson = ({ route, navigation }) => {
  const [imgData, setImgData] = useState()
  const [image, setImage] = useState("")

  const [IsEditing, setIsEditing] = useState(false)

  const [isNameValid, setIsNameValid] = useState(true)

  const [date, setDate] = useState()
  const [name, setName] = useState()

  const id = route.params?.buddyID


  const fillParams = async (id) => {
    const buddyData = await fetchSingleBuddy(id)
    setIsEditing(true)
    setName(buddyData.name)
    setImage(buddyData.URI)
    setDate(buddyData.DOB)
  }

  useEffect(() => {
    if (!!id) fillParams(id)
  }, [id])


  const dateOfB = (day, month, year) => {
    if (day !== undefined && month !== undefined && year !== undefined) {
      let prefixDay = ""
      let prefixMonth = ""
      if (day < 10) prefixDay = "0"
      if (month < 10) prefixMonth = "0"
      const date = year + "-" + prefixMonth + (month + 1) + "-" + prefixDay + day
      console.log(date)
      setDate(date)
    }
  }


  const addOreUpdate = async () => {
    setIsNameValid(true)
    if (!name) {
      setIsNameValid(false)
      return
    }


    if (!IsEditing) {
      await saveNewBuddy({ name: name, DOB: date, URI: image })
    } else {
      await updateBuddy(id, { name: name, DOB: date, URI: image })
    }

    if (imgData) {
      const name = image.split("/").pop()
      await moveFileToLocal(imgData, name)
    }

    navigation.goBack()
  }

  const remove = async () => {
    removeBuddy(id)
    navigation.navigate("AllPersons")
  }

  const cancelOrDelete = () => {
    if (IsEditing) {
      Alert.alert("Remove " + name + "?", "Are you sure you want to remove buddy", [
        { text: "Yea", onPress: () => remove(), style: "" },
        { text: "No", style: "default" }
      ])
    } else {
      navigation.goBack()
    }
  }

  const saveB64Image = (data, uri) => {
    setImgData(data)
    setImage(uri)
  }

  return (
    <View style={styles.scrollContainer}>
      <ScrollView style={styles.scrollContainer} >
        <View style={styles.container}>

          <View style={styles.formContainer}>

            <BuddyAvatar image={image} height={200} width={200} rWidth={2} />

            <View style={styles.buddyNameContainer}>
              <Text style={styles.BuddyNameText}>Buddy name</Text>
              <TextInput style={[styles.BuddyName, {borderColor: isNameValid ? BuddyColors.accent : BuddyColors.dangerRed }]} onChangeText={(name) => setName(name)} value={name} />
            </View>

            <View>
              <Text style={styles.BuddyNameText}>Profile Picture</Text>
              <ProfilePic saveB64Image={saveB64Image} />
            </View>

            <View style={styles.BuddyDOBContainer}>
              <Text style={styles.BuddyNameText}>Date of birth</Text>

              <DatePicker onDate={dateOfB} date={date} />
            </View>

          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      <View style={styles.buttons}>
        <CustomButton onPress={cancelOrDelete} text={IsEditing ? "REMOVE" : "CANCEL"} style={{ marginRight: 10 }} color={IsEditing ? BuddyColors.dangerRed : BuddyColors.accent} />
        <CustomButton onPress={addOreUpdate} text={IsEditing ? "UPDATE" : "ADD"} color={BuddyColors.accent} />
      </View>
    </View>
  )
}

export default ManagePerson


const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: BuddyColors.background,

  },
  container: {
    backgroundColor: BuddyColors.background,

    flex: 1,
    alignItems: "center",
  },
  BuddyDOBContainer: {
    width:"100%",
    alignItems:"center"
  },
  formContainer: {
    width: "90%",
    flex: 1,
  },
  DOBcontainer: {
    margin: 30,
    alignItems: "center"
  },
  BODText: {
    fontSize: 30,
    color: BuddyColors.textColor
  },
  BuddyNameText: {
    marginTop: 30,
    marginVertical: 5,
    color: BuddyColors.textColor,
    fontSize: 20
  },
  BuddyName: {
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 20,
    color: BuddyColors.textColor,
    padding: 10,
  },
  buttons: {
    marginBottom: 10,
    alignSelf: "center",
    flexDirection: "row",
    width: "90%",
  },
  showDate: {
    color: BuddyColors.mainColor
  }
})