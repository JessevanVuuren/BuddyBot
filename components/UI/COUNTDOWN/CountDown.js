import { StyleSheet, Text, View, Animated } from "react-native"
import { useLayoutEffect, useRef, useState } from "react"
import { BuddyColors } from "../../../constants/colors"
import CountDownCounter from './CountDownCounter'
import { daysUntilNext } from "../../../util/utils"
import moment from 'moment'

const CountDown = ({ style, dob }) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [isBirthday, setIsBirthday] = useState(false)
  const [dateDiff, setDateDiff] = useState(10)


  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 50000,
      useNativeDriver: true
    }).start();
  }

  useLayoutEffect(() => {
    const personDate = new Date(dob)

    if (moment(dob).format('DD-MM') === moment(new Date()).format('DD-MM')) {
      startAnimation()
      setIsBirthday(true)
      return
    }

    const diff = daysUntilNext(personDate.getMonth() + 1, personDate.getDate())

    setDateDiff(diff)
  }, [dob])



  return (
    <View>

      {isBirthday ? (
        <Text style={[styles.text, style]}>BIRTHDAY</Text>
      ) : (
        dateDiff === 1 ? ( <CountDownCounter style={style}/> ) : (
          <Text style={[styles.text, style]}>{dateDiff} <Text style={styles.daysText}>DAYS</Text></Text>
        )
      )}

    </View>
  )
}

export default CountDown


const styles = StyleSheet.create({
  container: {

  },

  daysText: {
    color: BuddyColors.accent,
    // fontSize:15,
  },
  text: {
    color: BuddyColors.textColor
  }
})