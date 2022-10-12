# BuddyBot

- [react-native](https://reactnative.dev/)
- [expo](https://expo.dev/)


## steps to reproduce
1. git clone https://github.com/JessevanVuuren/BuddyBot.git
2. cd /BuddyBot/
3. npm i

## build - android
1. update build number and version number in app.json
2. aab: eas build 
3. apk: eas build --profile dev

## build IOS - submit
1. update build and version number in ./ios/BuddyBot/info.plist // build = CFBundleVersion // version = CFBundleShortVersionString
2. eas build
3. eas submit


