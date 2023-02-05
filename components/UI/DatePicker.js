import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { AppColors, BuddyColors, MyColors } from '../../constants/colors';
import { Picker } from "@react-native-picker/picker";
import moment from 'moment';


const DatePicker = ({ onDate }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [yearRange, setYearRange] = useState([])

  const [selectedDay, setSelectedDay] = useState();
  

  // const calcYear = () => {
  //   const date = new Date()
  //   const year = date.getFullYear()
  //   const yearList = []
  //   for (let i = 0; i < year - 100; i--) {
  //     yearList.push(year - i)
  //   }
  //   setYearRange(yearList)
  // }


  // useEffect(() => {
  //   calcYear()
  // })

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

  const setItemsYear = () => {
    const date = new Date()
    const year = date.getFullYear()
    const yearList = []
    for (let i = 0; i < year - 100; i--) {
      yearList.push(year - i)
    }

    return yearList.map((i) => {
      return <Picker.Item key={i} style={styles.items} label={i + " Disabled"} value={i} />
    })
  }

  return (
    <View style={styles.container}>
      {/* <Pressable onPress={showDatepicker} style={styles.DOBButton}>
        <Text style={styles.DOBText}>Pick a Date</Text>
      </Pressable> */}


      <View>
        <View style={styles.blueLine}>
          <Picker
            style={styles.select}
            selectedValue={selectedDay}
            dropdownIconColor={BuddyColors.accent}
            onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
            mode="dropdown"
          >
            {setItemsYear()}


          </Picker>
        </View>
      </View>





      {/* {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          onChange={onChange}
        />
      )} */}


    </View>
  );
}

export default DatePicker


const styles = StyleSheet.create({
  select: {
    color: "white",
    backgroundColor: "#353e4a",
  },
  items: {
    color: BuddyColors.textColor,
    backgroundColor: BuddyColors.background,
  },
  blueLine: {
    borderBottomColor: BuddyColors.accent,
    borderBottomWidth: 2,
  },

  container: {
    width: "100%"
  },
  DOBButton: {
    // backgroundColor: BuddyColors.accent,
    borderColor: BuddyColors.accent,
    borderWidth: 1,
    width: "100%",
    borderRadius: 5,
  },
  DOBText: {
    color: BuddyColors.accent,
    textAlign: "center",
    fontSize: 25,
    paddingVertical: 5
  }
})