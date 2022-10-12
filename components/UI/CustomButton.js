import { Pressable, StyleSheet, Text, View } from "react-native";
import { BuddyColors } from "../../constants/colors";


const CustomButton = ({onPress, text, style}) => {

  return (
    <Pressable onPress={onPress} style={({pressed}) => [ styles.button, style, pressed && styles.pressed]}>
        <Text style={styles.textStyle}>{text}</Text>
    </Pressable>
  )
}

export default CustomButton


const styles = StyleSheet.create({
  button: {
    backgroundColor: BuddyColors.background,
    borderRadius: 5,
    borderWidth:1,
    padding: 10,
    flex:1,
    borderColor:BuddyColors.mainColor
  },
  textStyle: {
    textAlign:"center",
    color: BuddyColors.mainColor
  },
  pressed: {
    backgroundColor:BuddyColors.mainColor
  }
})