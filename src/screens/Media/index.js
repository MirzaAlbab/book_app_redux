import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Audio from './components/Audio';

export default function Media({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Media Handling</Text>
      <Audio navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
