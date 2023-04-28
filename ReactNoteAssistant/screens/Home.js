import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import firebaseHelpers from '../helperFunctions/firebaseHelpers';
import firestore from '@react-native-firebase/firestore';
import {theme} from '../helperFunctions/theme';
import openAi from '../helperFunctions/openAi';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import CurrentNotebookPicker from '../components/CurrentNotebookPicker';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [currentNotebook, setCurrentNotebook] = useState('General');
  const [modelResponse, setModelResponse] = useState(null);
  const [addSubButtonColor, setAddSubButtonColor] = useState(false);
  const [currentNotebookId, setCurrentNotebookId] = useState(null);
  const [subSectionsSnapshot, setSubSectionsSnapshot] = useState(null);
  const fbHelpers = firebaseHelpers();
  const [notebooksSnapshot, setNotebooksSnapshot] = useState(null);
  const [changeNotebook, setChangeNotebook] = useState(false);
 
  const classifyNote = () =>
    openAi(getSubsectionsList(), userInput, setModelResponse);
  // let handleNewSubClick = () => {
  //   fbHelpers.forFirestore.addNewSubSection(userInput, currentNotebookId);
  // };

  useEffect(() => {
    let userID = fbHelpers.forAuth.currentUserUID();
    fbHelpers.forFirestore.getCollectionSnapshot(userID, setNotebooksSnapshot);
  }, []);

  useEffect(() => {
    if (notebooksSnapshot) {
      let generalNotebook = notebooksSnapshot.docs.forEach(doc => {
        if (doc._data.name === currentNotebook) {
          setCurrentNotebookId(doc._data.docID);
        }
      });
    }
  }, [currentNotebook, notebooksSnapshot]);

  useEffect(() => {
    if(currentNotebookId) {
      let currentUserID = fbHelpers.forAuth.currentUserUID();
      fbHelpers.forFirestore.getDocumentSnapshot(
        currentUserID,
        currentNotebookId,
        setSubSectionsSnapshot,
      );
    }
  }, [currentNotebookId])

  function getSubsectionsList() {
    let returnList = [];
    subSectionsSnapshot.docs.forEach(doc => {
      let sectionName = doc._data.name;
      returnList.push(sectionName);
    });
    return returnList;
  }

  useEffect(() => {
    if(modelResponse) {
      console.log(modelResponse)
      let subSections = getSubsectionsList();
      let isIncluded = subSections.includes(modelResponse.content);
      let docID;
      subSectionsSnapshot.docs.forEach(doc => {
        if (doc._data.name === modelResponse.content) {
          docID = doc._data.docID;
        }
      })
      if(isIncluded) {
        console.log(currentNotebookId)
        fbHelpers.forFirestore.addNewNote(
          currentNotebookId,
          docID,
          userInput,
          setModelResponse,
        );
      }
    }
  }, [modelResponse])


  // useEffect(()=> console.log(modelResponse.content))

  if (changeNotebook === false) {
    return (
      <View style={styles.mainView}>
        <View style={styles.headerContainer}>
          <View style={styles.currentPagePickerContainer}>
            <Text style={styles.currentNotebookText}>{currentNotebook}</Text>
            <Pressable onPress={() => setChangeNotebook(true)}>
              {dropDownIcon()}
            </Pressable>
          </View>
          <View style={styles.menuWrapper}>{menuIcon()}</View>
        </View>
        <ScrollView style={styles.chatView}>
          <View style={styles.instructionContainer}>
            <Text style={styles.chatInsruction}>{initialNoteOne}</Text>
            <Text style={styles.chatInsruction}>{initialNoteTwo}</Text>
          </View>
          <Pressable onPress={() => fbHelpers.forAuth.signUserOut()}>
            <Text style={{color: 'white'}}>peace Out</Text>
          </Pressable>
        </ScrollView>
        <View style={styles.userInputContainer}>
          <TextInput
            value={userInput}
            style={styles.input}
            onChangeText={e => setUserInput(e)}
            placeholder="Message"
            placeholderTextColor={'gray'}
          />
          <Pressable
            onPress={() => {
              classifyNote();
              // fbHelpers.forFirestore.addNewNotebook(userInput);
            }}
            style={styles.sendButton}>
            {sendMessageIcon()}
          </Pressable>
        </View>
      </View>
    );
  } else {
    return <CurrentNotebookPicker snapshot={notebooksSnapshot} setCurrentNotebook={setCurrentNotebook} setChangeNotebook={setChangeNotebook}/>;
  }
}

let dropDownIcon = () => (
  <FontAwesomeIcon name="angle-down" size={20} color={theme.colors.primary} />
);

let sendMessageIcon = () => (
  <FeatherIcon name="send" size={15} color={theme.colors.primary} />
);
let thumbsUpIcon = () => (
  <FeatherIcon name="thumbs-up" size={15} color={theme.colors.primary} />
);
let thumbsDown = () => (
  <FeatherIcon name="thumbs-down" size={15} color={theme.colors.primary} />
);

let menuIcon = () => (
  <IonIcons name="menu" size={28} color={theme.colors.primary} />
);

let initialNoteOne =
  "Any note that is submitted will be stored in a sub-section under the 'General' Notebook. If you wish to save notes in a different Notebook, please open that specific Notebook.";
let initialNoteTwo =
  'Before you start adding new notes, make sure to create a sub-section where you want to store the note. Our AI uses any available sub-sections to determine the appropriate location to store the note.';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: theme.colors.darker,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  currentPagePickerContainer: {
    flexDirection: 'row',
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  menuWrapper: {
    position: 'absolute',
    right: 16,
  },

  headerContainer: {
    borderColor: 'gray',
    borderBottomWidth: 0.4,
    padding: 16,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },

  currentNotebookText: {
    // color: 'white',
    fontSize: 20,
    marginRight: 8,
    textAlign: 'center',
  },

  chatView: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: theme.colors.bg,
    padding: 13,
  },

  userInputContainer: {
    borderWidth: 3,
    borderColor: 'gray',
    flexDirection: 'row',
    borderRadius: 7,
    marginLeft: 10,
    marginRight: 10,
    margin: 10,
    // paddingLeft: 9,
    // paddingRight: 9,
    // height: 110,
    justifyContent: 'space-around',
  },

  input: {
    flex: 1,
    // color: 'rgb(255,255,255)',
    backgroundColor: theme.colors.secondary,
    maxHeight: 44,
    borderRadius: 7,
    paddingLeft: 15,
    paddingRight: 10,
  },

  sendButton: {
    marginTop: 16,
    borderColor: 'white',
    // color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    right: 0,
    paddingRight: 15,
  },

  // instructionContainer: {
  //   borderColor: 'white',
  //   minHeight: '100%',
  //   borderWidth: 12,
  // },

  chatInsruction: {
    color: theme.colors.text,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 9,
    marginBottom: 14,
    backgroundColor: theme.colors.secondary,
    fontSize: 14,
    padding: 12,
    fontStyle: 'italic',
    paddingRight: 20,
    paddingLeft: 20,
  },

  botResponseContainer: {
    backgroundColor: 'red',
    padding: 20,
    height: 80,
    paddingLeft: 12,
    paddingRight: 12,
    minWidth: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },

  userResponseContainer: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    height: 80,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 1,
    minWidth: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  userInputText: {
    color: 'white',
  },

  botInputText: {
    color: theme.colors.text,
  },
});
