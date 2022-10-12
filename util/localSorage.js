import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeBuddy = async (buddy) => {
  console.log("Saving Buddy: " + buddy.name + ", DOB: " + buddy.dob)


  try {


    const localBuddy = JSON.parse(await AsyncStorage.getItem("buddys"))
    console.log(localBuddy)

    if (!localBuddy) {
      console.log("Adding first buddy!!!")
      await AsyncStorage.setItem("buddys", JSON.stringify([buddy]))

    } else {
      await AsyncStorage.setItem("buddys", JSON.stringify([...localBuddy, buddy]))
    }


    // if (! AsyncStorage.hasOwnProperty("buddys")) {
    //   
    // } else {
    //   console.log("buddy added")
    // }
  




    // await AsyncStorage.setItem('buddys', value)
  } catch (e) {
    console.log(e)
  }
}