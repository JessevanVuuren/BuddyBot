import { StyleSheet, Text, View } from "react-native";
import { BuddyColors } from "../../constants/colors";

const SinglePerson = ({ person }) => {



  return (
    <View>
      <Text style={{color:BuddyColors.textColor}}>{person.name}</Text>
    </View>
  )
}

export default SinglePerson


const styles = StyleSheet.create({
  container: { 
    
  },
})