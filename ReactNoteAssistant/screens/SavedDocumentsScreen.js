import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Navigation from '../components/Navigation';
import SavedCoverLetters from '../components/SavedCoverLetters';
import FirebaseHelpers from '../helperFunctions/FirebaseHelpers';
import { theme } from '../helperFunctions/theme';

export default function SavedDocumentsScreen(props) {
  return (
    // <View style={styles.mainView}>
    //   <View style={styles.mainContent}>
    //     <Text>Saved Documents</Text>
    //   </View>
    // </View>
    <View style={styles.mainView}>
      <View style={styles.mainContent}>
        <SavedCoverLetters />
        <Navigation />
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  mainContent: {
    flex: 1,
  },
});
