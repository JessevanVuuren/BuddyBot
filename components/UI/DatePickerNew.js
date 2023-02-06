import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AppColors, BuddyColors, MyColors } from '../../constants/colors';
import { Picker } from "@react-native-picker/picker";
import { TextInput } from 'react-native-paper';
import moment from 'moment';


const DatePicker = ({ onDate, date }) => {

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());


  useEffect(() => {
    if (date) {
      const year = +date.split("-")[0]
      const month = (+date.split("-")[1]) - 1
      const day = +date.split("-")[2]
      setSelectedYear(year)
      setSelectedMonth(month)
      setSelectedDay(day)
    }
  }, [date])

  useEffect(() => {
    onDate(selectedDay, selectedMonth, selectedYear)
  }, [selectedDay, selectedMonth, selectedYear])

  const calcYearRange = () => {
    const year = new Date().getFullYear()
    const yearList = []
    for (let i = year; i > year - 120; i--) yearList.push(i)
    return yearList.map(i => {
      return <Picker.Item key={i} style={styles.items} label={i.toString() + ""} value={i} />
    })
  }

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
        <View style={[styles.inputHolder]}>
          <Picker
            style={{ color: "white" }}
            selectedValue={selectedYear}
            dropdownIconColor={BuddyColors.accent}
            onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
            mode="dropdown"
          >
            {calcYearRange()}
          </Picker>
        </View>

        <View style={[styles.inputHolder]}>
          <Picker
            style={{ color: "white" }}
            selectedValue={selectedMonth}
            dropdownIconColor={BuddyColors.accent}
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

        <View style={[styles.inputHolder]}>
          <Picker
            style={{ color: "white" }}
            selectedValue={selectedDay}
            dropdownIconColor={BuddyColors.accent}
            onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
            mode="dropdown"
          >
            {getMonthRange()}
          </Picker>
        </View>

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
    // flexDirection: "row"
  },

  input: {
    color: "white",
    backgroundColor: BuddyColors.background,
  },
  inputHolder: {
    borderBottomColor:BuddyColors.accent,
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