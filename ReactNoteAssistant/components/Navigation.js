import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../helperFunctions/theme';
import {useNavigation} from '@react-navigation/native';

export default function Navigation() {
  let navigation = useNavigation();
  let reset = navigation.reset;
  return (
    <View style={styles.mainView}>
      <Pressable
        onPress={() =>
          reset({
            index: 0,
            routes: [{name: 'Home'}],
          })
        }
        style={styles.iconButton}>
        <CreateIcons />
      </Pressable>

      <Pressable
        onPress={() =>
          reset({
            index: 0,
            routes: [{name: 'Saved'}],
          })
        }
        style={styles.iconButton}>
        <FileTray />
      </Pressable>

      <Pressable
        onPress={() =>
          reset({
            index: 0,
            routes: [{name: 'Account'}],
          })
        }
        style={styles.iconButton}>
        <AccountIcons />
      </Pressable>
    </View>
  );
}

let CreateIcons = () => (
  <IonIcons name="create" size={28} color={theme.colors.bgHalfOpac} />
);

let FileTray = () => (
  <IonIcons name="file-tray-full-sharp" size={28} color={theme.colors.bgHalfOpac} />
);

let AccountIcons = () => (
  <MaterialCommunityIcons
    name="account-circle"
    size={28}
    color={theme.colors.bgHalfOpac}
  />
);

let styles = StyleSheet.create({
  mainView: {
    width: '100%',
    padding: 13,
    borderColor: theme.colors.bgHalfOpac,
    borderTopWidth: 0.7,
    justifyContent: 'space-around',
    // position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    // flex: 1,
    // backgroundColor: '#00da861f',
    backgroundColor: 'transparent',
  },

  iconButton: {
    // borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
