import {StyleSheet, Button, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SoundPlayer from 'react-native-sound-player';
import DocumentPicker from 'react-native-document-picker';
import Monserrat from '../../../components/Monserrat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Audio({navigation}) {
  const [music, setMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    SoundPlayer.addEventListener('FinishedPlaying', () => {
      setIsPlaying(false);
    });
  }, []);

  const openStorage = async () => {
    try {
      const res = await DocumentPicker.pick();
      setMusic(res[0]);
      playMusic();
    } catch (error) {
      setMusic(old => old);
    }
  };

  const playMusic = () => {
    SoundPlayer.playUrl(music.uri);
    setIsPlaying(true);
  };
  const pauseMusic = () => {
    SoundPlayer.pause();
    setIsPlaying(false);
  };
  const resumeMusic = () => {
    SoundPlayer.resume();
    setIsPlaying(true);
  };
  const stopMusic = () => {
    SoundPlayer.stop();
    setIsPlaying(false);
  };

  return (
    <View>
      <Monserrat fontSize={20} color="white" marginTop={20} marginBottom={20}>
        Audio
      </Monserrat>

      <Button title="Select Files" onPress={() => openStorage()} />
      <Monserrat color="white" fontSize={16} marginTop={20}>
        Selected Files: {music ? music.fileName : 'No File Selected'}
      </Monserrat>
      <Monserrat color="white" fontSize={14} marginBottom={20}>
        {music ? music.name : 'no music'}
      </Monserrat>

      <View style={styles.control}>
        {isPlaying ? (
          <FontAwesome
            name="pause"
            color="white"
            size={30}
            onPress={() => pauseMusic()}
          />
        ) : (
          <FontAwesome
            name="play"
            color="white"
            size={30}
            onPress={() => {
              resumeMusic();
            }}
          />
        )}

        <FontAwesome
          name="stop"
          color="white"
          size={30}
          onPress={() => stopMusic()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  control: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
