import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import { NotificationRequest, YearlyTriggerInput } from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const dismissNoti = async (id: any) => {
  await Notifications.cancelScheduledNotificationAsync(id)
}

export const dismissAllNoti = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync()
}

export const schedulePushNotification = async (day: number, month: number, content: any) => {
  const date = new Date(2023, month - 1, day, 10, 10)

  const trigger: YearlyTriggerInput = {
    "day": date.getDate(),
    "month": date.getMonth(),
    "hour": date.getHours(),
    "minute": date.getMinutes(),
    "repeats": true
  }

  await Notifications.scheduleNotificationAsync({ content: content, trigger: trigger })
}

export const getAllNotifications = async () => {
  return await Notifications.getAllScheduledNotificationsAsync()
}

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Notifications blocked, please enable notifications in app settings');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export const stringYearlyNoti = (content: NotificationRequest) => {
  const trigger: any = content.trigger
  return trigger.hour + ":" + trigger.minute + " - " + trigger.day + "/" + (trigger.month + 1)
}

export const compareNoti = (dob: string, trigger: any): boolean => {
  const dob_list = dob_to_list(dob)
  return dob_list[1] == trigger.day && dob_list[0] - 1 == trigger.month
}

const dob_to_list = (dob: string): Array<number> => {
  const dobList = dob.split("-")
  return [parseInt(dobList[1]), parseInt(dobList[2])]
}

const schedule_buddy_notification = (buddy: any) => {
  const dob_list = dob_to_list(buddy.DOB)
  const content = { title: "Birthday of " + buddy.name, data: {buddy:buddy} }
  schedulePushNotification(dob_list[1], dob_list[0], content)
}

export const setBuddyNotifications = async (buddys: any) => {
  const all_notifications = await getAllNotifications()

  buddys.map((buddy: any) => {
    let comp = false
    for (let i = 0; i < all_notifications.length; i++) {
      const element = all_notifications[i];
      const data: any = element.content.data.buddy
      if (compareNoti(buddy.DOB, element.trigger) && buddy.id === data.id) {
        comp = true
        break
      }
    }

    if (!comp) schedule_buddy_notification(buddy)
  })

  all_notifications.map((noti) => {
    let comp = false

    for (let i = 0; i < buddys.length; i++) {
      const buddy = buddys[i];
      const data: any = noti.content.data.buddy
      if (compareNoti(buddy.DOB, noti.trigger) && buddy.id === data.id) {
        comp = true
        break
      }
    }

    if (!comp) Notifications.cancelScheduledNotificationAsync(noti.identifier)
  })
}