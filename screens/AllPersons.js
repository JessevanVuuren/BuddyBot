import { StyleSheet, Text, View } from "react-native";
import PersonsList from "../components/person/PersonsList";
import { BuddyColors } from "../constants/colors";

const DUMMY_DATA = [
  {
    id: 1,
    name: "woowing"
  }
]

const AllPersons = ({ }) => {

  return (
    <View style={styles.container}>
      <PersonsList persons={DUMMY_DATA} />
    </View>
  )
}

export default AllPersons


const styles = StyleSheet.create({
  container: {
    backgroundColor: BuddyColors.background,
    flex: 1
  },
})