import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet, Button} from 'react-native';
import Navigation from '../components/Navigation';
import {theme} from '../helperFunctions/theme';
import firebaseHelpers from '../helperFunctions/firebaseHelpers';

export default function Home(props) {
  const [userFirst, setUserFirst] = useState(null);
  const [userLast, setUserLast] = useState(null);

  let navigate = props.navigation.navigate;

  async function getName() {
    await firebaseHelpers().forFirestore.getUserFirstAndLastName(
      setUserFirst,
      setUserLast,
    );
  }

  useEffect(() => {
    getName();
    // firebaseHelpers().forFirestore.getUserFirstAndLastName(
    //   setUserFirst,
    //   setUserLast,
    // );
  }, []);

  if (true && true) {
    return (
      <View style={styles.mainView}>
        <Text style={styles.pageTitle}>Create New</Text>
        <View style={styles.content}>
          <View>
            <Text>{`Welcome back ${userFirst}`}</Text>
          </View>
          <Pressable
            onPress={() => navigate('Cover Letter Form')}
            style={styles.newCoverLetter}>
            <Text style={styles.newDocumentButtonText}>Cover Letter</Text>
            <Text
              style={{
                paddingLeft: 10,
                alignSelf: 'flex-start',
                color: 'black',
              }}>
              Create a professional cover letter in seconds using AI.
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigate('Cover Letter Form')}
            style={styles.newResignationLetter}>
            <Text style={styles.newDocumentButtonText}>Resignation Letter</Text>
            <Text
              style={{
                paddingLeft: 10,
                alignSelf: 'flex-start',
                paddingRight: 10,
                color: 'black',
              }}>
              Write the perfect resignation using AI to get your point across.
            </Text>
          </Pressable>
          <Pressable style={styles.newEmail}>
            <Text style={styles.newDocumentButtonText}>Email</Text>
            <Text
              style={{
                paddingLeft: 10,
                alignSelf: 'flex-start',
                paddingRight: 10,
                color: 'black',
              }}>
              Use AI to write a professionally email or reply to an email you
              received.
            </Text>
          </Pressable>
        </View>
        <Button
          title="SignOut"
          onPress={() => firebaseHelpers().forAuth.signUserOut()}
        />
        <Navigation />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  mainView: {
    flex: 1,
    color: 'white',
  },

  pageTitle: {
    textAlign: 'center',
    fontSize: 24,
    padding: 20,
    color: 'white',
    backgroundColor: 'black',
    // borderBottomColor: 'gray',
    borderBottomColor: 'black',
    // borderBottomWidth: 1,
    marginBottom: 30,
    fontWeight: 600,
  },

  content: {
    padding: 20,
    gap: 15,
  },

  newCoverLetter: {
    width: '100%',
    height: 90,
    borderWidth: 2,
    borderColor: 'gray',
    // padding: 4,
    gap: 3,
    backgroundColor: '#00da86',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },

  newResignationLetter: {
    width: '100%',
    height: 90,
    // padding: 4,
    gap: 3,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: '#00da86',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },

  newEmail: {
    width: '100%',
    height: 90,
    gap: 3,
    // padding: 4,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: '#00da86',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },

  newDocumentButtonText: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: 600,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
    // borderWidth: 1,
    // borderColor: 'red',
  },
});
