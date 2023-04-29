import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import firebaseHelpers from '../helperFunctions/firebaseHelpers';
import {handleNewUser} from '../helperFunctions/firebaseHelpers';
export default function SignUp(props) {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = props.navigation;

  //Erase when more info is added from user.
  const fbHelpers = firebaseHelpers();

  function handleSignUpClick() {
    let docContent = createDbDocContent();
    handleNewUser(newUserEmail, password, docContent);
  }

  //Info provided by User to create userDoc
  function createDbDocContent() {
    return {userFirstName, userLastName, userEmail: newUserEmail};
  }

  return (
    <View style={{justifyContent: 'space-evenly', flex: 1}}>
      <View>
        <Text>Sign Up</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={e => setUserFirstName(e)}
          style={styles.input}
          placeholder="First Name"
        />
        <TextInput
          onChangeText={e => setUserLastName(e)}
          style={styles.input}
          placeholder="last Name"
        />
        {/* <TextInput
          onChangeText={e => setReasonForUse(e)}
          style={styles.input}
          placeholder="How will you be using our app?"
        /> */}
        <TextInput
          onChangeText={e => setNewUserEmail(e)}
          style={styles.input}
          placeholder="Email"
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={e => setPassword(e)}
          style={styles.input}
          placeholder="Password"
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={e => setPasswordConfirm(e)}
          style={styles.input}
          placeholder="Confirm your password"
        />
      </View>
      <Pressable
        onPress={() => handleSignUpClick()}
        style={styles.signInButton}>
        <Text>Create Account</Text>
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
