import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AppColors, BuddyColors, MyColors } from '../../constants/colors';
import { Picker } from "@react-native-picker/picker";
import { TextInput } from 'react-native-paper';
import moment from 'moment';


const DatePicker = ({ onDate, errorText, date }) => {
  const [feedbackText, setFeedbackText] = useState("")

  const [selectedDay, setSelectedDay] = useState();
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState()

  const [isValid, setIsValid] = useState(false)

  const [enabledMonth, setEnabledMonth] = useState(false)
  const [enabledDay, setEnabledDay] = useState(false)


  useEffect(() => {
    if (date) {
      console.log(date)
    }
  }, [date])

  useEffect(() => {
    if (enabledMonth) {
      setEnabledDay(true)
    }

    onDate(selectedDay, selectedMonth, selectedYear)
  }, [selectedDay, selectedMonth, selectedYear])


  const getMonthRange = () => {
    const endOfMonth = moment().month(selectedMonth).endOf("month").toDate().getDate()
    const list = []
    for (let i = 1; i < endOfMonth + 1; i++) list.push(i)
    return list.map(i => {
      return <Picker.Item key={i} style={styles.items} label={i.toString() + ""} value={i} />
    })
  }

  return (
    <View style={styles.container}>


      <View style={styles.holders}>
        <View style={[styles.inputHolder, { marginRight: 10, flex: .6, borderBottomColor: BuddyColors.accent }]}>

          <TextInput
            placeholderTextColor={BuddyColors.textColor}
            value={selectedYear}
            keyboardType={"numeric"}
            onBlur={() => setEnabledMonth(true)}
            onChangeText={(e) => setSelectedYear(e.replace(/[^0-9]/g, ''))}
            placeholder='Year'
            textColor={BuddyColors.textColor}
            style={styles.input}
          />
        </View>

        <View style={[styles.inputHolder, { marginRight: 10, flex: 1, borderBottomColor: enabledMonth ? BuddyColors.accent : BuddyColors.gray }]}>
          <Picker
            enabled={enabledMonth}

            style={{ color: enabledMonth ? "white" : BuddyColors.gray }}
            selectedValue={selectedMonth}
            dropdownIconColor={enabledMonth ? BuddyColors.accent : BuddyColors.gray}
            onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
            mode="dropdown"
          >
            <Picker.Item style={styles.items} label="January" value={0} />
            <Picker.Item style={styles.items} label="February" value={1} />
            <Picker.Item style={styles.items} label="March" value={2} />
            <Picker.Item style={styles.items} label="April" value={3} />
            <Picker.Item style={styles.items} label="May" value={4} />
            <Picker.Item style={styles.items} label="June" value={5} />
            <Picker.Item style={styles.items} label="July" value={6} />
            <Picker.Item style={styles.items} label="August" value={7} />
            <Picker.Item style={styles.items} label="September" value={8} />
            <Picker.Item style={styles.items} label="October" value={9} />
            <Picker.Item style={styles.items} label="November" value={10} />
            <Picker.Item style={styles.items} label="December" value={11} />

          </Picker>
        </View>

        <View style={[styles.inputHolder, { flex: .6, borderBottomColor: enabledDay ? BuddyColors.accent : BuddyColors.gray }]}>
          <Picker
            enabled={enabledDay}
            style={{ color: enabledDay ? "white" : BuddyColors.gray }}
            selectedValue={selectedDay}
            dropdownIconColor={enabledDay ? BuddyColors.accent : BuddyColors.gray}
            onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
            mode="dropdown"
          >

            

            {!enabledDay ? <Picker.Item style={styles.items} label="1" value={false} /> : getMonthRange()}

          </Picker>
        </View>

      </View>
      <View style={{height:20, marginTop:3}}>
        <Text style={{ color: BuddyColors.textColor }}>{errorText}</Text>
      </View>
    </View>
  );
}
export default DatePicker


const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  holders: {
    flexDirection: "row"
  },

  input: {
    color: "white",
    backgroundColor: BuddyColors.background,
  },
  inputHolder: {
    borderBottomWidth: 2,
  },
  items: {
    color: BuddyColors.textColor,
    backgroundColor: BuddyColors.background,
  },
  blueLine: {
    borderBottomColor: BuddyColors.accent,
    borderBottomWidth: 2,
    flex: 1
  },
})