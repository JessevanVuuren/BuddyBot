import { FlatList, StyleSheet, Text, View } from "react-native";
import { BuddyColors } from "../../constants/colors";
import SinglePerson from "./SinglePerson";



const PersonsList = ({persons}) => {

  return (

    <FlatList 
      data={persons}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <SinglePerson person={item} />}
      />
  )
}

export default PersonsList


const styles = StyleSheet.create({
  container: {

  },
})