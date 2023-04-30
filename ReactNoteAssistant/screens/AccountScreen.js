import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import Navigation from '../components/Navigation';
import FirebaseHelpers from '../helperFunctions/FirebaseHelpers';
import {theme} from '../helperFunctions/theme';

export default function AccountScreen(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [changesMade, setChangesMade] = useState(false);
  const [newPhoneNum, setNewPhoneNum] = useState('');

  useEffect(() => {
    let usersCol = FirebaseHelpers().forFirestore.userCollectionRef();
    let userID = FirebaseHelpers().forAuth.currentUserUID();
    let docRef = usersCol.doc(userID);
    docRef.get().then(snap => {
      let data = snap.data();
      setUserInfo(data);
    });
  }, []);

  useEffect(() => {
    console.log('hh');
    if (newPhoneNum === '') {
      setChangesMade(false);
    } else setChangesMade(true);
  }, [newPhoneNum]);

  if (userInfo) {
    return (
      <View style={style.mainView}>
        <View style={style.mainContent}>
          <Text style={style.title}>Basic User Info</Text>
          <View style={{gap: 10}}>
            <Text style={{fontSize: 12.5, fontWeight: 300, paddingBottom: 0, color: theme.colors.text}}>
              The name displayed here will be used as shown for any documents
              made.
            </Text>
            <View style={style.nameInputsWrapper}>
              <TextInput
                // editable={false}
                placeholder={userInfo.userFirstName}
                placeholderTextColor="gray"
                style={style.input}
              />
              <TextInput
                // editable={false}
                placeholder={userInfo.userLastName}
                placeholderTextColor="gray"
                style={style.input}
              />
            </View>
            <TextInput
              editable={false}
              style={style.disabledInput}
              placeholder={userInfo.userEmail}
              placeholderTextColor={theme.colors.bg}
            />
            <TextInput
              // editable={false}
              style={style.otherInput}
              placeholder="Phone number"
              placeholderTextColor= "gray"
              // value={newPhoneNum}
              onChangeText={e => setChangesMade(e)}
            />
          </View>
          <Pressable
            style={{
              backgroundColor: changesMade
                ? '#005397d4'
                : 'rgba(255,255,255,0.2)',
              padding: 15,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: 600}}>Save changes</Text>
          </Pressable>
        </View>
        <Navigation />
      </View>
    );
  } else return null;
}

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    justifyContent: 'space-between',
    // padding: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: 600,
    color: theme.colors.text,
  },

  mainContent: {
    flex: 1,
    gap: 10,
    padding: 20,
    // borderWidth: 5,
  },

  nameInputsWrapper: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },

  input: {
    borderColor: theme.colors.text,
    // borderWidth: 0.5,
    flex: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
  },

  otherInput: {
    borderColor: theme.colors.text,
    // borderWidth: 0.5,
    color: 'white',
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',

  },

  disabledInput: {
    borderColor: theme.colors.text,
    color: 'red',
    borderWidth: 0.5,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    padding: 8,
  },
});
