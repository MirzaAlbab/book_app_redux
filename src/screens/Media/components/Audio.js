import {StyleSheet, Button, View} from 'react-native';
import React, {useState} from 'react';
import Sound from 'react-native-sound';

export default function Audio() {
  const [music, setMusic] = useState(null);
  const playMusic = () => {
    const audio = new Sound('music.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          audio.getDuration() +
          'number of channels: ' +
          audio.getNumberOfChannels(),
      );
      setMusic(audio);
      audio.play(() => {
        console.log('finished playing');
        audio.release();
      });
    });
  };
  return (
    <View>
      <Button title="play" onPress={() => playMusic()} />
      <Button
        title="pause"
        onPress={() => {
          music.pause();
        }}
      />
      {/* <Button
        title="resume"
        onPress={() => {
          music.resume();
        }}
      /> */}
      <Button
        title="stop"
        onPress={() => {
          music.stop();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
