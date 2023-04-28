import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import firebaseHelpers from '../helperFunctions/firebaseHelpers';

export default function LogIn() {
  const [emailToAttaempt, setEmailToAttempt] = useState('');
  const [passwordToAttempt, setPasswordToAttempt] = useState('');
  const fbHelpers = firebaseHelpers();
  return (
    <View style={{justifyContent: 'space-evenly', flex: 1}}>
      <View style={styles.headerSection}>
        <Text>Login In</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={e => setEmailToAttempt(e)}
          style={styles.input}
          placeholder="Email"
        />
        <TextInput
          onChangeText={e => setPasswordToAttempt(e)}
          secureTextEntry
          style={styles.input}
          placeholder="Password"
        />
      </View>

      <Pressable
        onPress={() =>
          fbHelpers.forAuth.signUserIn(emailToAttaempt, passwordToAttempt)
        }
        style={styles.signInButton}>
        <Text>Log In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    borderWidth: 1,
    textAlign: 'center',
  },

  input: {
    borderBottomWidth: 1,
  },

  signInButton: {
    backgroundColor: 'gray',
  },
});
