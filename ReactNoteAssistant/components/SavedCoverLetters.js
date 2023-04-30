import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Pressable} from 'react-native';
import FirebaseHelpers from '../helperFunctions/FirebaseHelpers';
import {theme} from '../helperFunctions/theme';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function SavedCoverLetters() {
  const [allCoverLetters, setAllCoverLetters] = useState(null);

  useEffect(() => {
    FirebaseHelpers()
      .forFirestore.getSavedCoverLetters()
      .then(res => {
        setAllCoverLetters(res);
      });
  }, []);

  if (allCoverLetters && allCoverLetters.length > 0) {
    return (
      <View style={styles.mainView}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={theme.colors.bg}
          />
          <Pressable style={{position: 'absolute', right: 10}}>
            <SearchIcon />
          </Pressable>
        </View>

        <ScrollView style={styles.allDisplaysContainer}>
          {displayAllDocs(allCoverLetters)}
        </ScrollView>
      </View>
    );
  } else {
    return <NoDocumentsView />;
  }
}

const NoDocumentsView = () => {
  return (
    <View flex={1} justifyContent="center" alignSelf="center">
      <Text style={{color: theme.colors.text}}>
        (Saved documents will appear here)
      </Text>
    </View>
  );
};

function convertTimestamp(stamp) {
  let date = new Date(stamp);
  return date.toLocaleString();
}

const displayAllDocs = allCoverLetters =>
  allCoverLetters.map(doc => {
    return (
      <View style={styles.letterPreview} key={allCoverLetters.indexOf(doc)}>
        <View style={styles.letterInfoWrapper}>
          <Text style={styles.companyText}>{doc.company}</Text>
          <Text style={styles.roleText}>{doc.role}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.timestampText}>
            {convertTimestamp(doc.savedOnTimestamp)}
          </Text>
        </View>
      </View>
    );
  });

const SearchIcon = () => <IonIcons name="search" size={20} color="black" />;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    gap: 8,
    padding: 20,
  },

  letterPreview: {
    borderColor: theme.colors.bgHalfOpac,
    backgroundColor: theme.colors.lightBG,
    // borderWidth: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
    // height: 600
  },

  inputWrapper: {
    flexDirection: 'row',
    // borderWidth: 2,
    position: 'relative',
    alignItems: 'center',
  },

  allDisplaysContainer: {paddingTop: 20},

  searchInput: {
    backgroundColor: theme.colors.bgHalfOpac,
    borderRadius: 900,
    maxHeight: 40,
    paddingLeft: 10,
    paddingRight: 35,
    width: '100%',
  },

  letterInfoWrapper: {gap: 4},

  companyText: {fontSize: 18, fontWeight: 500, color: theme.colors.primary},

  timestampText: {
    alignSelf: 'flex-end',
    fontSize: 10,
    fontWeight: 500,
    color: theme.colors.bgHalfOpac,
  },

  roleText: {color: theme.colors.bgHalfOpac, fontStyle: 'italic'},
});
