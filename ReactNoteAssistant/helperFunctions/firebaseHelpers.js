/* eslint-disable prettier/prettier */
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


export default function firebaseHelpers() {

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
      return firestore().collection(`users/${forAuth.currentUserUID()}`);
    },

    getUserFirstAndLastName: async (setFirst, setLast) => {
      let userID = firebaseHelpers().forAuth.currentUserUID();
      let usersCollectionRef = firestore().collection('users');
      let docs = await usersCollectionRef.doc(userID).get();
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
//instead of calling firebaseHelpers() several times, can destructure
//  to get only what we need --> const {createNewUser, currentUserUID, addUserToDb} = firebaseHelpers.forAuth
export async function handleNewUser(email, password, docContent) {
  let navigation = useNavigation;

  try {
    let newUser = await firebaseHelpers().forAuth.createNewUser(
      email,
      password,
    );

    let newUserId = firebaseHelpers().forAuth.currentUserUID();
    docContent.userID = newUserId;

    let result = await firebaseHelpers().forFirestore.addNewUserToDB(docContent);
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

