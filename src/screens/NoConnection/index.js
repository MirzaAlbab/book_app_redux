import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function NoConnect({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C222B',
      }}>
      <MaterialIcons name="wifi-off" size={50} color="red" />
      <Text style={styles.text}>No Internet Connection</Text>
      <Text style={styles.text}>
        Please check your internet connection and try again
      </Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.btnStyle}>
        <Text style={styles.text}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 20,
    margin: 10,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  btnStyle: {
    backgroundColor: '#003456',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    width: 200,
    borderRadius: 20,
  },
});
