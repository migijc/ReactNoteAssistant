/* eslint-disable prettier/prettier */
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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

    addNewNotebook: notebookName => {
      let camelCaseTitle = stringToCamelCase(notebookName);
      const currentUserUID = forAuth.currentUserUID();
      let docRef = firestore()
        .collection(`users/${currentUserUID}/notebooks`);
      docRef.add({name: notebookName, camelCaseName: camelCaseTitle}).then(res => res.update({docID: res.id}));
    },

    addNewSubSection: async (sectionName, docId) => {
      console.log(docId);
      let camelCaseTitle = stringToCamelCase(sectionName);
      // let camelCaseCurrentNotebookTitle = stringToCamelCase(currentNotebook);
      const currentUserUID = forAuth.currentUserUID();
      let docRef = firestore()
        .collection(`users/${currentUserUID}/notebooks/${docId}/subSections`)
        .doc();
      await docRef.set({name: sectionName, camelCaseName: camelCaseTitle, docID: docId}).catch(err => console.error(err));
    },

    addNewNote: async (currentNotebookId, sectionId, note, cb) => {
      let userId = forAuth.currentUserUID()
      let collectionRef = firestore().collection(`users/${userId}/notebooks/${currentNotebookId}/subSections/${sectionId}/notes`);
      let docRef = collectionRef.doc();
      await docRef.set({noteContent: note});
      cb(null);
    },

    addNewUserToDB: async docContent => {
      const currentUserUID = forAuth.currentUserUID();
      let doc = await firestore()
        .collection('users')
        .doc(currentUserUID)
        .set(docContent);
      return doc;
    },

    // addNewConversation: async function (obj, snapshotState) {
    //   const userID = firebaseHelpers().forAuth.currentUserUID();
    //   let docID = obj.conversationStartTime;
    //   let result = await firestore()
    //     .collection(`users/${userID}/conversations`)
    //     .doc(docID)
    //     .set(obj);
    //   this.getDocumentSnapshot(
    //     `users/${userID}/conversations`,
    //     docID,
    //     snapshotState,
    //   );
    //   return result;
    // },

    getDocumentSnapshot: async (userID, docID, cb) => {
      let collectionRef = firestore().collection(`users/${userID}/notebooks/${docID}/subSections`);
      collectionRef.onSnapshot(snapshot => {
        cb(snapshot);
      });
    },

    getCollectionSnapshot: (userID, cb) => {
      let collectionRef = firestore().collection(`users/${userID}/notebooks`);
      collectionRef.onSnapshot((snapshot)=>{
        cb(snapshot)
      })
    },


    getAllNotebookNames: async () => {
      let notebooksColRef = firestore().collection(
        `users/${forAuth.currentUserUID()}/notebooks`,
      );
      let docs = await notebooksColRef.get();
      return docs;
    },
    getAllSubSectionsFromNb: async (currentNotebookId) => {
      let subSectionsColRef = firestore().collection(
        `users/${forAuth.currentUserUID()}/notebooks/${currentNotebookId}`,
      );
      let docs = await subSectionsColRef.get();
      return docs;
    },
  };

  return {forAuth, forFirestore};
}

//function handles userCreation & takes care of adding User to DB.
//instead of calling firebaseHelpers() several times, can destructure
//  to get only what we need --> const {createNewUser, currentUserUID, addUserToDb} = firebaseHelpers.forAuth
export async function handleNewUser(email, password, docContent) {
  try {
    let newUser = await firebaseHelpers().forAuth.createNewUser(
      email,
      password,
    );
    let newUserId = firebaseHelpers().forAuth.currentUserUID();
    docContent.userID = newUserId;

    let result = await firebaseHelpers().forFirestore.addNewUserToDB(docContent);
    //tobE general in db and General in doc.name
     firebaseHelpers().forFirestore.addNewNotebook('General');
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

