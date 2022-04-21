import {StyleSheet, Text, Button, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import VideoPlayer from 'react-native-video-player';
import Monserrat from '../../../components/Monserrat';
import {ms} from 'react-native-size-matters';
import Foundation from 'react-native-vector-icons/Foundation';

export default function Video({navigation}) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos = [
    {
      description:
        'HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.',
      sources: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      ],
      subtitle: 'By Google',
      thumb:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
      title: 'For Bigger Blazes',
    },
    {
      description:
        "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
      sources: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      ],
      subtitle: 'By Google',
      thumb:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
      title: 'For Bigger Escape',
    },
    {
      description:
        'Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.',
      sources: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      ],
      subtitle: 'By Google',
      thumb:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
      title: 'For Bigger Fun',
    },
  ];
  const nextVideo = () => {
    if (index === videos.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };
  const previousVideo = () => {
    if (index === 0) {
      setIndex(videos.length - 1);
    } else {
      setIndex(index - 1);
    }
  };
  return (
    <View>
      <Monserrat fontSize={20} color="white" marginTop={20} marginBottom={20}>
        Video
      </Monserrat>
      <VideoPlayer
        video={{
          uri: videos[index].sources[0],
        }}
        thumbnail={{uri: videos[index].thumb}}
      />
      <View style={styles.buttonContainer}>
        <Foundation
          name="previous"
          size={ms(30)}
          color="white"
          onPress={() => previousVideo()}
        />
        <Monserrat color="white" marginTop={10}>
          {videos[index].title}
        </Monserrat>
        <Foundation
          name="next"
          size={ms(30)}
          color="white"
          onPress={() => nextVideo()}
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
  backgroundVideo: {
    backgroundColor: 'black',
    width: ms(350),
    height: ms(200),
  },
  controls: {
    backgroundColor: 'white',
    width: '80%',
    height: ms(100),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: ms(5),
  },
});
