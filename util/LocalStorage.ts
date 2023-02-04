import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveValue = async (tag:string, value:any) => {
  AsyncStorage.setItem(tag, JSON.stringify(value))
}

export const deleteValue = async (key:string) => {
  AsyncStorage.removeItem(key)
}

export const getValue = async (tag:string) => {
  const data = await AsyncStorage.getItem(tag)
  if (!data) return null
  return JSON.parse(data)
}


export const getAllBuddys = async () => {
  const value = await AsyncStorage.getItem('buddys')
  if (value !== null) {
    return JSON.parse(value)
  }
}
