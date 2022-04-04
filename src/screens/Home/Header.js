import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

export default function Header() {
  const {user} = useSelector(state => state.login);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome back</Text>
      <Text style={styles.textBold}>{user.user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textBold: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    paddingTop: 5,
    flex: 1,
    maxWidth: 190,
  },
});
