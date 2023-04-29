import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function AddProfessionalExp() {
  return (
    <View style={styles.mainView}>
      <Text>Add professional Experience</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    borderWidth: 5,
    borderColor: 'red',
  },
});
