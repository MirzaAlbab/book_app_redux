import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import success from '../../assets/images/success.png';
import Monserrat from '../../components/Monserrat';

export default function Success({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1C222B',
      }}>
      <Monserrat
        type="Bold"
        color="white"
        padding={30}
        textAlign="center"
        size={25}
        marginTop={20}>
        Registration Successful
      </Monserrat>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          source={success}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />

        <Monserrat
          color="white"
          textAlign="center"
          marginTop={20}
          size={18}
          padding={30}>
          We have sent a verification to your email. Please kindly check your
          inbox or spam to activate your account
        </Monserrat>
      </View>

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Login')}>
        <Monserrat
          color="white"
          paddingVertical={10}
          size={16}
          type="Bold"
          textAlign="center">
          Login Now
        </Monserrat>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#003456',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 40,
  },
  successTextStyle: {},
});
