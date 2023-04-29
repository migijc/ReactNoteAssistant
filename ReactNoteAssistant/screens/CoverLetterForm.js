import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import firebaseHelpers from '../helperFunctions/FirebaseHelpers';
import {theme} from '../helperFunctions/theme';
import openAi from '../helperFunctions/openAi';
import promptGenerator from '../helperFunctions/promptGenerator';

export default function Home(props) {
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [futureJobTitle, setFutureJobTitle] = useState('');
  const [futureCompanyName, setFutureCompanyName] = useState('');
  const [relevantSkills, setRelevantSkills] = useState('');
  const [relevantJobRoles, setRelevantJobRoles] = useState('');
  const [education, setEducation] = useState('');
  const [degreeEarned, setDegreeEarned] = useState('');
  const [yearsOfRelevantExperience, setYearsOfRelevantExperience] =
    useState('');
  const [modelResponse, setModelResponse] = useState(null);
  const fbHelpers = firebaseHelpers();
  const replace = props.navigation.replace;

  async function handleSubmit() {
    let prompt = await promptGenerator({
      userFirstName,
      userLastName,
      futureCompanyName,
      futureJobTitle,
      relevantJobRoles,
      relevantSkills,
      yearsOfRelevantExperience,
      education,
      degreeEarned,
    });
    console.log(prompt);

    openAi(prompt, setModelResponse);
  }

  useEffect(() => {
    if (userFirstName === null && userFirstName === null) {
      fbHelpers.forFirestore.getUserFirstAndLastName(
        setUserFirstName,
        setUserLastName,
      );
    }
  }, []);

  useEffect(() => {
    if(modelResponse) {
      replace('Created Letter', {modelResponse: modelResponse});
    }
  }, [modelResponse])

  // useEffect(() => console.log({userFirstName, userLastName}))

  if (modelResponse === null) {
    return (
      <View style={styles.mainView}>
        <View style={styles.form}>
          <TextInput
            value={futureJobTitle}
            style={styles.input}
            onChangeText={e => setFutureJobTitle(e)}
            placeholder="Job Title (Applying For)"
            placeholderTextColor={'gray'}
          />
          <TextInput
            value={futureCompanyName}
            style={styles.input}
            onChangeText={e => setFutureCompanyName(e)}
            placeholder="Company Name(Applying To)"
            placeholderTextColor={'gray'}
          />
          <TextInput
            value={relevantSkills}
            style={styles.input}
            onChangeText={e => setRelevantSkills(e)}
            placeholder='Relevant Skills (Seperated by comma ",")'
            placeholderTextColor={'gray'}
          />
          <TextInput
            value={relevantJobRoles}
            style={styles.input}
            onChangeText={e => setRelevantJobRoles(e)}
            placeholder="Previous Relative titles"
            placeholderTextColor={'gray'}
          />
          <TextInput
            value={yearsOfRelevantExperience}
            style={styles.input}
            onChangeText={e => setYearsOfRelevantExperience(e)}
            placeholder="Years of relevant experience"
            placeholderTextColor={'gray'}
          />
          <TextInput
            value={education}
            style={styles.input}
            onChangeText={e => setEducation(e)}
            placeholder="University or Institution Name"
            placeholderTextColor={'gray'}
          />
          <TextInput
            value={degreeEarned}
            style={styles.input}
            onChangeText={e => setDegreeEarned(e)}
            placeholder="Degree Earned"
            placeholderTextColor={'gray'}
          />
        </View>
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    );
  }
}

// let dropDownIcon = () => (
//   <FontAwesomeIcon name="angle-down" size={20} color={theme.colors.primary} />
// );

// let sendMessageIcon = () => (
//   <FeatherIcon name="send" size={15} color={theme.colors.primary} />
// );

let initialNoteOne =
  "Any note that is submitted will be stored in a sub-section under the 'General' Notebook. If you wish to save notes in a different Notebook, please open that specific Notebook.";
let initialNoteTwo =
  'Before you start adding new notes, make sure to create a sub-section where you want to store the note. Our AI uses any available sub-sections to determine the appropriate location to store the note.';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    // justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    // borderWidth: 3,
  },

  headerContainer: {
    borderColor: 'gray',
    borderBottomWidth: 0.4,
    padding: 16,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },

  chatView: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: theme.colors.bg,
    padding: 13,
  },

  form: {
    borderColor: 'gray',
    flex: 1,
    gap: 6,
    borderRadius: 7,
    width: '100%',
  },

  input: {
    // flex: 1,
    // color: 'rgb(255,255,255)',
    backgroundColor: theme.colors.bg,
    maxHeight: 44,
    borderBottomWidth: 1.3,
    borderColor: theme.colors.primary,
    // borderRadius: 7,
    paddingLeft: 15,
    paddingRight: 10,
  },

  userInputText: {
    color: 'white',
  },

  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 900,
    borderWidth: 0.4,
    borderColor: 'gray',
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 16,
  },
});
