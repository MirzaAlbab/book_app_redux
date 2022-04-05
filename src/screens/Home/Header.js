import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Logout from '../../components/Logout';

export default function Header(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome back, {props.name}</Text>
      <Logout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'row',

    alignSelf: 'flex-start',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
