import { StyleSheet, Text, View, Image } from "react-native";
import { BuddyColors } from "../../constants/colors";


const BuddyAvatar = ({ image, height, width, rWidth }) => {

  return (
    <View>
      <View style={styles.imageCenterHolder}>
        <View style={[styles.imageHolder, {maxHeight: height, maxWidth: width, borderWidth: rWidth}]}>
          {image ? (
            <Image style={[styles.image, {width: width + 3, height: height + 3}]} source={{ uri: image }} resizeMode="contain" />
          ) : (
            <Image style={[styles.image, {width: width + 3, height: height + 3}]} source={require("../../assets/blankAvatar.jpg")} />
          )}
        </View>
      </View>
    </View>
  )
}

export default BuddyAvatar


const styles = StyleSheet.create({
  container: {

  },
  imageCenterHolder: {
    alignItems: "center"
  },
  image: {
    borderRadius: 1000
  },
  imageHolder: {
    alignItems: "center",
    borderRadius: 1000,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderColor: BuddyColors.accent
  },
})