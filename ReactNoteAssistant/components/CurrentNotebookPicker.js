import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

export default function CurrentNotebookPicker(props) {
  let namesList = [];
  const notebookeNames = props.snapshot.docs.forEach(notebook => {
    namesList.push(notebook._data.name);
  });

  function handlePress(nb) {
    props.setCurrentNotebook(nb);
    props.setChangeNotebook(false);
  }

  return (
    <ScrollView>
      {namesList.map(notebook => {
        return (
          <Pressable onPress={()=>handlePress(notebook)} key={namesList.indexOf(notebook)}>
            <Text style={{color: 'black'}}>{notebook}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
