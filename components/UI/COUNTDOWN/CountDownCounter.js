import { BuddyColors } from "../../../constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { useLayoutEffect, useState } from "react";



const CountDownCounter = ({ style }) => {

  const [time, setTime] = useState();
  const [calculatingTime, setCalculatingTime] = useState(true)

  useLayoutEffect(() => {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var secondsUntilEndOfDate = (24 * 60 * 60) - (h * 60 * 60) - (m * 60) - s;
    setTime(secondsUntilEndOfDate)


    const timerId = setInterval(() => {
      secondsUntilEndOfDate -= 1;
      if (secondsUntilEndOfDate < 0) {
        clearInterval(timerId);
      } else {
        setTime(toHHMMSS(secondsUntilEndOfDate));
        setCalculatingTime(false)
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [setTime]);

  const toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours, minutes, seconds]
  }

  return (
    <View>
      {calculatingTime ? (
        <ShowHHMMSS h={"00"} m={"00"} s={"00"} style={style} />
      ) : (
        <ShowHHMMSS h={time[0]} m={time[1]} s={time[2]} style={style} />
      )
      }
    </View>
  )
}

const ShowHHMMSS = ({h, m, s, style}) => {
  return <View>
    <Text style={[styles.numbers, style]}>
      <Text style={styles.floatNumbers}>{h}</Text><Text style={styles.text}>u </Text>
      <Text style={styles.floatNumbers}>{m}</Text><Text style={styles.text}>m </Text>
      <Text style={styles.floatNumbers}>{s}</Text><Text style={styles.text}>s </Text>
    </Text>
  </View>
}

export default CountDownCounter


const styles = StyleSheet.create({
  container: {

  },
  text: {
    color:BuddyColors.accent
  },
  numbers: {
    color: BuddyColors.textColor
  },
})