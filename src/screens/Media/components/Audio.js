import {StyleSheet, Text, Button, View} from 'react-native';
import React, {useState} from 'react';
import SoundPlayer from 'react-native-sound-player';
import DocumentPicker from 'react-native-document-picker';

export default function Audio({navigation}) {
  const [music, setMusic] = useState(null);
  const openStorage = async () => {
    try {
      const res = await DocumentPicker.pick();
      setMusic(res[0]);
    } catch (error) {
      setMusic(old => old);
    }
    SoundPlayer.playUrl(music.uri);
  };
  return (
    <View>
      <Text style={styles.title}>Audio</Text>

      <Button
        style={styles.tombol}
        title="play a music"
        onPress={() => openStorage()}
      />

      <Text style>{music ? music.name : 'no music'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  songtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  tombol: {
    marginHorizontal: 20,
    color: 'red',
  },
});
