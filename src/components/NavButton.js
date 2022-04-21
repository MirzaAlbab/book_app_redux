import {View} from 'react-native';
import React from 'react';
import Material from 'react-native-vector-icons/MaterialIcons';
import {notifikasi} from './Notifikasi';
import {ms} from 'react-native-size-matters';
import Share from 'react-native-share';

export default function NavButton({navigation, judul}) {
  const [favorite, setFavorite] = React.useState(false);
  const Notif = () => {
    notifikasi.configure();
    notifikasi.CreateChannel('0');
    notifikasi.CreateChannel('1');
    if (favorite) {
      notifikasi.PushNotification(
        '1',
        'Book App',
        'Kamu berhenti menyukai ' + judul.judul,
      );
    } else {
      notifikasi.PushNotification(
        '0',
        'Book App',
        'Kamu menyukai ' + judul.judul,
      );
    }

    setFavorite(!favorite);
  };
  const ShareBook = async () => {
    const shareOptions = {
      title: 'Share Book',
      message: `${judul.judul}`,
    };
    try {
      const result = await Share.open(shareOptions);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(navigation);
  return (
    <View>
      <Material
        name="arrow-back"
        size={30}
        color="white"
        style={{
          position: 'absolute',
          top: ms(10),
          left: ms(10),
          backgroundColor: '#1a1a1a',
          padding: 3,
          borderRadius: 20,
        }}
        onPress={() => navigation.goBack()}
      />
      <Material
        name="favorite"
        size={25}
        color={favorite ? 'red' : 'white'}
        style={{
          position: 'absolute',
          top: ms(10),
          right: ms(45),
          backgroundColor: '#1a1a1a',
          padding: 3,
          borderRadius: 15,
        }}
        onPress={Notif}
      />
      <Material
        name="share"
        size={25}
        color="white"
        style={{
          position: 'absolute',
          top: ms(10),
          right: ms(10),
          backgroundColor: '#1a1a1a',
          padding: 3,
          borderRadius: 15,
        }}
        onPress={ShareBook}
      />
    </View>
  );
}
