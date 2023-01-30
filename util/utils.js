import * as FileSystem from 'expo-file-system';




export const daysUntilNext = (month, day) => {
  var bDay = new Date(), y = bDay.getFullYear(), next = new Date(y, month - 1, day);
  bDay.setHours(0, 0, 0, 0);
  if (bDay > next) next.setFullYear(y + 1);
  return Math.round((next - bDay) / 8.64e7);
}


export const moveFileToLocal = async (data, name) => {
  const localUri = FileSystem.cacheDirectory
  await FileSystem.writeAsStringAsync(localUri + name, data, { encoding: 'base64' });
}


export const calculateAge = (birthday) => {
  var ageDifMs = Date.now() - new Date(birthday).getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const asyncFilter = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));

  return arr.filter((_v, index) => results[index]);
}