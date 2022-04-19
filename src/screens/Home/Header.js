import {StyleSheet, View} from 'react-native';
import React from 'react';
import Logout from '../../components/Logout';
import Monserrat from '../../components/Monserrat';

export default function Header(props) {
  return (
    <View style={styles.container}>
      <Monserrat color="white" type="Bold" size={20}>
        Welcome back, {props.name}
      </Monserrat>
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
