import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AppColors, BuddyColors, MyColors } from '../../constants/colors';


const DatePicker = ({ onDate }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    onDate(currentDate)

  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={showDatepicker} style={styles.DOBButton}>
        <Text style={styles.DOBText}>Pick a Date</Text>
      </Pressable>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          onChange={onChange}
        />
      )}


    </View>
  );
}

export default DatePicker


const styles = StyleSheet.create({
  container: {
    width:"100%"
  },
  DOBButton: {
    // backgroundColor: BuddyColors.accent,
    borderColor:  BuddyColors.accent,
    borderWidth: 1,
    width:"100%",
    borderRadius:5,
  },
  DOBText: {
    color: BuddyColors.accent,
    textAlign:"center",
    fontSize: 25,
    paddingVertical:5
  }
})