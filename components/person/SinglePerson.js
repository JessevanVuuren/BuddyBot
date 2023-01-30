import { StyleSheet, Text, View, Pressable } from "react-native"
import { BuddyColors } from "../../constants/colors"
import CountDown from "../UI/COUNTDOWN/CountDown"
import { useLayoutEffect, useState } from "react"
import { daysUntilNext } from "../../util/utils"
import BuddyAvatar from "../UI/BuddyAvatar"


const SinglePerson = ({ person, selectedBuddy, dirtyUpdate }) => {

  const [diff, setDiff] = useState()

  useLayoutEffect(() => {
    const date = new Date(person.DOB)
    const diff = daysUntilNext(date.getMonth() + 1, date.getDate())
    setDiff(diff)
  }, [setDiff, dirtyUpdate])

  return (
    <Pressable onPress={() => selectedBuddy(person.id)}>

      <View style={[styles.container, diff < 10 ? { marginRight: 16 } : { marginRight: 8 }]}>
        <View style={styles.ImgWithLine}>
            <BuddyAvatar image={person.URI} height={50} width={50} rWidth={1} />
          <View style={styles.blueLine}></View>
        </View>
        <View style={styles.buddyText}>
          <View>
            <Text style={styles.buddyName}>{person.name}</Text>
          </View>
          <View>
            <CountDown style={styles.buddyCountDown} dob={person.DOB} />
          </View>
        </View>
      </View>
      {diff < 10 && (<View style={[styles.indicator, diff < 1 ? {backgroundColor:BuddyColors.goodGreen} : {backgroundColor:BuddyColors.fineYellow}]} />)}

    </Pressable>

  )
}

export default SinglePerson


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    marginLeft: 8,
    marginVertical: 8,
    borderRadius: 15,
    zIndex: 1,
    backgroundColor: BuddyColors.lightDark,
    elevation: 4
  },
  indicator: {
    width: 30,
    position: "absolute",
    right: 0,
    elevation: 4,
    marginVertical: 8.5,
    marginRight: 8,
    height: 59,
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15
  },
  ImgWithLine: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  blueLine: {
    width: .8,
    marginLeft: 7,
    backgroundColor: BuddyColors.accent
  },
  buddyText: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  buddyName: {
    fontSize: 17,
    color: BuddyColors.textColor,
  },
  buddyCountDown: {
    fontSize: 17,
    color: BuddyColors.textColor,
  }
})