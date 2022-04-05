import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {setLogoutAction} from '../screens/Login/redux/action';
import {useDispatch} from 'react-redux';
import {ms} from 'react-native-size-matters';
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
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginLeft: ms(100),
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
