import React, {useState} from 'react';
import {View, ScrollView, Text, Pressable} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {theme} from '../helperFunctions/theme';
import fbHelpers from '../helperFunctions/FirebaseHelpers';
import {useNavigation} from '@react-navigation/native';

export default function CreatedLetter(props) {
  const params = props.route.params;
  const modelResponse = params.modelResponse;
  const coverLetterCompany = params.futureCompanyName;
  const coverLetterRole = params.futureJobTitle;
  const type = params.type;
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleSaveCoverLetter() {
    await fbHelpers()
      .forFirestore.saveCoverLetter(
        coverLetterCompany,
        coverLetterRole,
        modelResponse.content,
      )
      //callback sets isDisabled=True so user can only write once to db.
      .then(() => setIsDisabled(!isDisabled));
  }

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: theme.colors.bg,
          width: '100%',
          padding: 7,
          zIndex: 1,
        }}>
        <BackIcon />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 500,
            color: theme.colors.text,
            padding: 4,
            fontSize: 11,
            fontStyle: 'italic',
          }}>
          Feel free to select and copy your document.
        </Text>
      </View>
      <ScrollView
        alignItems="center"
        justifyContent="center"
        style={{
          flex: 1,
          padding: 25,
          paddingTop: 30,
          backgroundColor: 'white',
        }}>
        <Text style={{color: 'black', fontSize: 12.2}} selectable>
          {modelResponse.content}
        </Text>
        {/* <Text>Remember to always make sure the information is accurate.</Text> */}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          padding: 40,
          // gap: 60,
          borderWidth: 2,
          justifyContent: 'space-between',
          backgroundColor: theme.colors.bg,
          alignItems: 'center',
        }}>
        {/* <Text style={{color: 'white'}}>Your feed back means a lot</Text> */}
        <Pressable disabled={isDisabled} onPress={handleSaveCoverLetter}>
          <SaveIcon />
        </Pressable>

        <ThumbsUpIcon />
        <ThumbsDownIcon />
      </View>
    </View>
  );
}

const ThumbsUpIcon = () => (
  <FeatherIcon name="thumbs-up" size={22} color={theme.colors.primary} />
);
const ThumbsDownIcon = () => (
  <FeatherIcon name="thumbs-down" size={22} color={theme.colors.primary} />
);
const SaveIcon = () => (
  <FeatherIcon name="save" size={22} color={theme.colors.bgHalfOpac} />
);
const BackIcon = () => {
  const goBack = useNavigation().goBack;

  return (
    <Pressable
      onPress={() => goBack()}
      style={{position: 'absolute', padding: 3, paddingLeft: 10, zIndex: 5}}>
      <IonIcons
        name="return-down-back-outline"
        size={30}
        color={theme.colors.bgHalfOpac}
      />
    </Pressable>
  );
};
