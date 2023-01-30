import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { BuddyColors } from "../../constants/colors";
import { StatusBar } from 'expo-status-bar'

const LoadingApp = ({text}) => {

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ActivityIndicator size="large" color={BuddyColors.accent} />
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default LoadingApp


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: BuddyColors.background
  },
  text: {
    color:BuddyColors.textColor,
    fontSize:20
  }
})