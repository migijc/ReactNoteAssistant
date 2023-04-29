/* eslint-disable prettier/prettier */
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';


export default function FirebaseHelpers() {

  const forAuth = {
    isUserLoggedIn: auth().currentUser ? true : false,

    signUserIn: async (email, password) => {
      let result = await auth().signInWithEmailAndPassword(email, password);
      return result;
    },

    createNewUser: async function (email, password) {
      let user = await auth().createUserWithEmailAndPassword(email, password);
      return user;
    },

    currentUserUID: () => {
      return auth().currentUser.uid;
    },

    currentUser: () => {
      return auth().currentUser;
    },


    signUserOut: () => auth().signOut(),

    handleUserStateOnChange: cb => {
      auth().onAuthStateChanged(user => {
        if (user) {
          cb(user);
        } else {
          cb(false);
        }
      });
    },
  };


  const forFirestore = {
    userCollectionRef: () => {
      return firestore().collection(`users`);
    },

    getUserFirstAndLastName: async (setFirst, setLast) => {
      let userID = FirebaseHelpers().forAuth.currentUserUID();
      let usersCollectionRef = firestore().collection('users');
      let docs = await usersCollectionRef.doc(userID).get()
      let firstName = docs._data.userFirstName;
      let lastName = docs._data.userLastName;
      setFirst(firstName);
      setLast(lastName);
    },

    addNewUserToDB: async docContent => {
      const currentUserUID = forAuth.currentUserUID();
      let doc = await firestore()
        .collection('users')
        .doc(currentUserUID)
        .set(docContent);
      return doc;
    },
  };

  return {forAuth, forFirestore};
}



//function handles userCreation & takes care of adding User to DB.
//instead of calling FirebaseHelpers() several times, can destructure
//  to get only what we need --> const {createNewUser, currentUserUID, addUserToDb} = FirebaseHelpers.forAuth
export async function handleNewUser(email, password, docContent) {

  try {
    let newUser = await FirebaseHelpers().forAuth.createNewUser(
      email,
      password,
    );

    let newUserId = FirebaseHelpers().forAuth.currentUserUID();
    docContent.userID = newUserId;

    let result = await FirebaseHelpers().forFirestore.addNewUserToDB(docContent);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//sets object with newConvo info on homeMount
export function getInitialConversation() {
  let initalConversation = {
    conversationStartTime: (new Date().getTime() / 1000).toFixed(0),
    userInputs: [],
    botInputs: ['Hey [USER], how can I help today?'],
  };
  return initalConversation;
}

//turn user inputs into uniform camelCase name
export function stringToCamelCase(id) {
  let wordsArray = id.split(' ');
  const capitalizedWords = wordsArray.map((word, index) =>
    index === 0
      ? word.toLowerCase()
      : word.charAt(0).toUpperCase() + word.slice(1),
  );
  return capitalizedWords.join('');
}

