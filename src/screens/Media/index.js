import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Audio from './components/Audio';
import Monserrat from '../../components/Monserrat';
import Video from './components/Video';
import PdfView from './components/PdfView';
export default function Media({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <Monserrat fontSize={20} color="white" type="Bold">
        Media Handling
      </Monserrat>
      <Audio />
      <Video />
      <PdfView />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#1C222B',
  },
});
