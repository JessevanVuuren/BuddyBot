import CountDownCounter from "../components/UI/COUNTDOWN/CountDownCounter"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import CountDown from "../components/UI/COUNTDOWN/CountDown"
import { calculateAge, daysUntilNext } from "../util/utils"
import { useIsFocused } from "@react-navigation/native"
import BuddyAvatar from "../components/UI/BuddyAvatar"
import LoadingApp from "../components/UI/LoadingApp"
import { fetchSingleBuddy } from "../util/SQLlite"
import GiftIdeas from "../components/UI/GiftIdeas"
import { useLayoutEffect, useState } from "react"
import { BuddyColors } from "../constants/colors"
import { Ionicons } from '@expo/vector-icons'

const PersonDetails = ({ route, navigation }) => {
  const [buddy, setBuddy] = useState()
  const [diff, setDiff] = useState()
  const isFocused = useIsFocused()

  const buddyID = route.params.buddyID;

  useLayoutEffect(() => {
    const getBuddy = async () => {
      const buddyData = await fetchSingleBuddy(buddyID)
      setBuddy(buddyData)
      navigation.setOptions({
        title: buddyData.name,
        headerRight: ({ tintColor }) => <Ionicons name="md-pencil" size={30} color={tintColor} onPress={() => navigation.navigate("ManagePerson", { buddyID: buddyID })} />
      });
      const date = new Date(buddyData.DOB)
      const diff = daysUntilNext(date.getMonth() + 1, date.getDate())
      setDiff(diff)
    }
    getBuddy()
  }, [buddyID, isFocused])


  if (!buddy) {
    return <LoadingApp text={"Loading Buddy details"} />
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.countdownContainer}>

        <View style={styles.countdown}>
          {diff > 1 && <CountDown style={styles.buddyCountDown} dob={buddy.DOB} />}
          <CountDownCounter style={styles.counter} />
        </View>
      </View>

      <BuddyAvatar width={300} height={300} rWidth={2} image={buddy.URI} />

      <View style={styles.AgeContainer}>
        <View style={styles.AgeHolder}>
          <Text style={styles.AgeText}>{calculateAge(buddy.DOB)}</Text>
        </View>
      </View>

      <View style={styles.detailHolder}>
        <GiftIdeas BuddyId={buddyID} />
      </View>


      <View style={{height:100}}>

      </View>
    </ScrollView>
  )
}

export default PersonDetails


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BuddyColors.background
  },
  detailHolder: {
    marginVertical: 30,
    marginHorizontal:50,
  },
  buddyCountDown: {
    fontSize: 30,
    color: BuddyColors.textColor,
  },
  countdownContainer: {
    marginVertical: 25,
    alignItems: "center"
  },
  countdown: {
    flexDirection: "row",
  },
  counter: {
    marginLeft: 20,
    fontSize: 30,
    color: BuddyColors.textColor,
  },
  AgeHolder: {
    height: 60,
    width: 60,
    backgroundColor: BuddyColors.background,
    borderColor: BuddyColors.accent,
    borderWidth: 2,
    borderRadius: 100,
    marginTop: -60,
    marginLeft:200,
    justifyContent: "center",
    alignItems: "center"
  },
  AgeContainer: {
    alignItems:"center"
  },
  AgeText: {
    fontSize:30,
    fontWeight:"bold",
    color:BuddyColors.accent
  }
})