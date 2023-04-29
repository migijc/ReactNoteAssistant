import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../helperFunctions/theme';

export default function Navigation() {
  return (
    <View style={styles.mainView}>
      <CreateIcons />
      <FileTray />
      <AccountIcons />
    </View>
  );
}

let CreateIcons = () => (
  <IonIcons name="create" size={28} color="rgb(90,90,90)" />
);

let FileTray = () => (
  <IonIcons name="file-tray-full-sharp" size={28} color="rgb(90,90,90)" />
);

let AccountIcons = () => (
  <MaterialCommunityIcons
    name="account-circle"
    size={28}
    color={'rgb(90,90,90)'}
  />
);

let styles = StyleSheet.create({
  mainView: {
    width: '100%',
    padding: 13,
    borderColor: 'gray',
    borderTopWidth: 0.3,
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    // backgroundColor: '#00da861f',
    backgroundColor: 'transparent',
  },
});
