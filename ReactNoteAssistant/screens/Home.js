import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet, Button, ScrollView} from 'react-native';
import Navigation from '../components/Navigation';
import {theme} from '../helperFunctions/theme';
import FirebaseHelpers from '../helperFunctions/FirebaseHelpers';

export default function Home(props) {
  const [userFirst, setUserFirst] = useState(null);
  const [user, setUser] = useState(null);

  let navigate = props.navigation.navigate;

  useEffect(() => {
    FirebaseHelpers().forAuth.handleUserStateOnChange(setUser);
    // FirebaseHelpers().forFirestore.getUserFirstAndLastName(
    //   setUserFirst,
    //   setUserLast,
    // );
  }, []);

  const getName = async cb => {
    let userID = user.uid;
    console.log(userID);
    let usersColRef = FirebaseHelpers().forFirestore.userCollectionRef();
    let userDocRef = usersColRef.doc(userID);
    userDocRef.onSnapshot(snapshot => {
      let data = snapshot.data();
      let firstName = data.userFirstName;
      console.log(firstName);
      cb(firstName);
    });
    // let docData = docs.data();
    // let firstName =docData.userFirstName;
    // cb(firstName)
  };

  useEffect(() => {
    if (user) {
      getName(setUserFirst);
    }
  }, [user]);

  if (user) {
    return (
      <View style={styles.mainView}>
        <View
          style={{
            backgroundColor: theme.colors.bg,
            // borderBottomColor: 'white',
            // borderBottomWidth: 0.8,
            justifyContent: 'center',
            padding: 20,
            paddingTop: 40,
            // alignItems: 'center',
            // borderBottomLeftRadius: 20,
            // borderBottomRightRadius: 20,
          }}>
          <Text style={styles.greetingText}>{`Welcome back ${userFirst}`}</Text>
        </View>
        {/* <Text style={styles.pageTitle}>Create New</Text> */}
        <ScrollView style={styles.content} scrollIndicatorInsets={{color: theme.colors.primary}}>
          <Pressable
            onPress={() => navigate('Cover Letter Form')}
            style={styles.newCoverLetter}>
            <Text style={styles.newDocumentButtonText}>Cover Letter</Text>
            <Text style={styles.descriptionText}>
              Create a professional cover letter in seconds using AI.
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigate('Cover Letter Form')}
            style={styles.newResignationLetter}>
            <Text style={styles.newDocumentButtonText}>Resignation Letter</Text>
            <Text style={styles.descriptionText}>
              Write the perfect resignation using AI to get your point across.
            </Text>
          </Pressable>

          <Pressable style={styles.newEmail}>
            <Text style={styles.newDocumentButtonText}>Email</Text>
            <Text style={styles.descriptionText}>
              Use AI to write a professional email or reply to an email you
              received.
            </Text>
          </Pressable>
        </ScrollView>
        {/* <Button
          title="SignOut"
          onPress={() => FirebaseHelpers().forAuth.signUserOut()}
        /> */}
        <Navigation />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },

  greetingText: {
    fontSize: 20,
    fontStyle: 'italic',
    // textAlign: 'center',
    // color: 'white',
    color: theme.colors.bgHalfOpac,
    width: '100%',
    // color: theme.colors.text,
    fontWeight: 500,
    // paddingLeft: 5,
    paddingBottom: 5,
  },

  content: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
    // gap: 15,
    margin: 10,
    marginBottom: 0,
    // marginBottom: 30,

    borderRadius: 20,
    // backgroundColor: theme.colors.lightBG,
    // borderWidth: 3,
    // backgroundColor: 'gray',
    // flexDirection: 'row',
  },

  newCoverLetter: {
    minHeight: 90,
    borderWidth: 0.5,
    borderColor: 'gray',
    // padding: 10,
    gap: 10,
    backgroundColor: theme.colors.lightBG,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 20,
  },

  newResignationLetter: {
    // width: '100%',
    // height: 90,
    // width: '30%',
    borderWidth: 0.5,
    borderColor: 'gray',
    minHeight: 90,
    // padding: 10,
    gap: 10,
    backgroundColor: theme.colors.lightBG,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 20,
  },

  newEmail: {
    // width: '100%',
    minHeight: 90,
    borderWidth: 0.5,
    borderColor: 'gray',
    // width: '30%',
    // height: 90,
    // padding: 10,
    gap: 10,
    backgroundColor: theme.colors.lightBG,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 20,
  },

  newDocumentButtonText: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: 900,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 10,
    padding: 10,
    paddingBottom: 0,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: 'black',
    // color: theme.colors.text,
    color: theme.colors.primary,
    // color: 'white'
    // borderWidth: 1,
    // borderColor: 'red',
  },

  descriptionText: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 15,
    alignSelf: 'flex-start',
    color: theme.colors.bgHalfOpac,
    fontWeight: 500,
  },
});
