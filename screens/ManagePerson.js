import { Alert, StyleSheet, Text, TextInput, View, Image, ScrollView } from "react-native"
import { fetchSingleBuddy, removeBuddy, saveNewBuddy, updateBuddy } from "../util/SQLlite"
import ProfilePic from "../components/person/ProfilePic"
import CustomButton from "../components/UI/CustomButton"
import BuddyAvatar from "../components/UI/BuddyAvatar"
import DatePicker from "../components/UI/DatePicker"
import { BuddyColors } from "../constants/colors"
import { moveFileToLocal } from "../util/utils"
import { useEffect, useState } from "react"
import moment from 'moment'

const ManagePerson = ({ route, navigation }) => {
  const [imgData, setImgData] = useState()
  const [image, setImage] = useState("")

  const [IsEditing, setIsEditing] = useState(false)

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


  const dateOfB = (date) => {
    setDate(moment(date).format('YYYY-MM-DD'))
  }




  const addOreUpdate = async () => {
    if (!name) {

      Alert.alert("Name cannot be Null")
      return
    }

    if (!date) {
      Alert.alert("Date cannot be Null")
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
    <ScrollView style={styles.scrollContainer} >
      <View style={styles.container}>


        <View style={styles.formContainer}>

          <BuddyAvatar image={image} height={200} width={200} rWidth={2} />

          <View style={styles.buddyNameContainer}>
            <Text style={styles.BuddyNameText}>Buddy name:</Text>
            <TextInput style={styles.BuddyName} onChangeText={(name) => setName(name)} value={name} />
          </View>

          <View>
            <Text style={styles.BuddyNameText}>Profile Picture:</Text>
            <ProfilePic saveB64Image={saveB64Image} />
          </View>

          <View style={styles.BuddyDOBContainer}>
            <Text style={styles.BuddyNameText}>Date of birth:</Text>
            <DatePicker onDate={dateOfB} />
          </View>

        </View>

        <View style={styles.DOBcontainer}>
          <Text style={styles.BODText}>{moment(date).format('D MMMM YYYY')}</Text>
        </View>

        <View style={styles.buttons}>
          <CustomButton onPress={cancelOrDelete} text={IsEditing ? "REMOVE" : "CANCEL"} style={{ marginRight: 10 }} color={IsEditing ? BuddyColors.dangerRed : BuddyColors.accent} />
          <CustomButton onPress={addOreUpdate} text={IsEditing ? "UPDATE" : "ADD"} color={BuddyColors.accent} />
        </View>
      </View>
    </ScrollView>
  )
}

export default ManagePerson


const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: BuddyColors.background,

  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  formContainer: {
    width: "80%",
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
    borderColor: BuddyColors.accent,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 20,
    color: BuddyColors.textColor,
    padding: 10,
  },
  buttons: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "80%",
    marginBottom: 30,
  },
  showDate: {
    color: BuddyColors.mainColor
  }
})