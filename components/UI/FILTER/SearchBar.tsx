import { StyleSheet, TextInput, View } from "react-native";
import { BuddyColors } from "../../../constants/colors";

const SearchBar = ({ searchTerm }) => {

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(e) => searchTerm(e)}
          placeholder={"Search for a Buddy..."}
          placeholderTextColor={BuddyColors.gray}
          autoFocus
        />
      </View>
    </>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    color: BuddyColors.textColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    borderTopColor: BuddyColors.background,
    borderBottomColor: BuddyColors.background,
    borderRightColor: BuddyColors.accent,
    borderLeftColor: BuddyColors.accent
  }

})