import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {setLogoutAction} from '../screens/Login/redux/action';
import {useDispatch} from 'react-redux';
import {ms} from 'react-native-size-matters';
import Monserrat from './Monserrat';
export default function Logout() {
  const dispatch = useDispatch();

  const onLogout = () => {
    Alert.alert('Book App', 'Do you want to Logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => dispatch(setLogoutAction())},
    ]);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLogout} style={styles.btn}>
        <Monserrat color="white" size={16} type="Bold">
          Logout
        </Monserrat>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginLeft: ms(10),
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: '#003456',
  },
});
