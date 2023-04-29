import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {theme} from '../helperFunctions/theme';

export default function CreatedLetter(props) {
  let modelResponse = props.route.params.modelResponse;
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#57d4da40',
          width: '100%',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 500,
            color: 'black',
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
        style={{flex: 1, padding: 25, paddingTop: 30}}>
        <Text style={{color: 'rgb(50,50,50)', fontSize: 12.2}} selectable>
          {modelResponse.content}
        </Text>
        {/* <Text>Remember to always make sure the information is accurate.</Text> */}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          padding: 40,
          gap: 25,
          borderWidth: 2,
          justifyContent: 'flex-end',
          backgroundColor: 'black',
          alignItems: 'center',
        }}>
        {/* <Text style={{color: 'white'}}>Your feed back means a lot</Text> */}
        <SaveIcon />
        <ThumbsUpIcon />
        <ThumbsDownIcon />
      </View>
    </View>
  );
}

let ThumbsUpIcon = () => (
  <FeatherIcon name="thumbs-up" size={22} color={theme.colors.primary} />
);
let ThumbsDownIcon = () => (
  <FeatherIcon name="thumbs-down" size={22} color={theme.colors.primary} />
);
let SaveIcon = () => (
  <FeatherIcon name="save" size={22} color={theme.colors.text} />
);
