import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

export default function Header() {
  const {user} = useSelector(state => state.login);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome back, </Text>
      <Text style={styles.text}>{user.user.name}</Text>
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
