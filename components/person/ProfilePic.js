import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker"
import { Image, View, StyleSheet, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import React, { useRef, useState } from 'react'
import CustomButton from '../UI/CustomButton'
import { Camera } from 'expo-camera'
import { BuddyColors } from "../../constants/colors"



const ProfilePic = ({ saveB64Image }) => {
  const [cameraPermissionStatus, requestPermission] = useCameraPermissions()


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      base64: true,
      quality: 1,
    });

    if (!result.cancelled) {
      saveB64Image(result.base64, result.uri)
    }
  };


  const verifyPermission = async () => {
    if (cameraPermissionStatus.status === PermissionStatus.UNDETERMINED || cameraPermissionStatus.status === PermissionStatus.DENIED) {
      const permResponse = await requestPermission();
      return permResponse.granted;
    }

    if (cameraPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert("The app need's camera and storage permissions", "These pictures will be used as profile pictures for your buddys")
      return false
    }

    return true
  }

  const makeImage = async () => {
    const permission = await verifyPermission()

    if (!permission) return

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1,1],
      quality: 0.5,
      base64: true,
    })

    if (!result.cancelled) {
      saveB64Image(result.base64, result.uri)
    }
  }


  return (
    <View style={{}}>

      <View style={styles.buttons}>

        <CustomButton color={BuddyColors.accent} text="Image from gallery" onPress={pickImage} style={{ marginRight: 10 }} />
        <CustomButton color={BuddyColors.accent} text="Image from camera" onPress={makeImage} />
      </View>
    </View>
  );
}

export default ProfilePic

const styles = StyleSheet.create({
  buttons: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
})