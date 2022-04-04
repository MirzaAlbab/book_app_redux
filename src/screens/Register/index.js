import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import axios from 'axios';
import {BaseUrlApi} from '../../helpers/api';
import Monserrat from '../../components/Monserrat';
import logo from '../../assets/images/logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const postRegister = async () => {
    // Cek inputan kosong
    if (email.length < 1 || password.length < 1) {
      alert('Email atau password tidak boleh kosong');
    } else {
      setLoading(true);
      try {
        // const body = {
        //   email: email,
        //   password: password,
        //   name: name,
        // };

        // const res = await axios.post(`${BaseUrlApi}auth/register`, body, {
        //   validateStatus: status => status < 501,
        // });
        const res = {
          status: 201,
        };
        console.log(res);
        if (res.status <= 201) {
          navigation.navigate('Success');
        } else {
          return alert('Registrasi gagal');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <Image
          style={{marginBottom: 50, width: 300, height: 70}}
          resizeMode="contain"
          source={logo}
        />

        <Monserrat size={20} marginTop={-50}>
          Book App
        </Monserrat>
        <Monserrat>Please register before using our app</Monserrat>

        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
        />
        <View style={{position: 'relative'}}>
          <TextInput
            secureTextEntry={hidePassword}
            onChangeText={text => setPassword(text)}
            style={[styles.textInput]}
            placeholder="Password"
            placeholderTextColor="#ffffff"
          />
          <TouchableOpacity
            style={styles.hide}
            onPress={() => setHidePassword(!hidePassword)}>
            {hidePassword ? (
              <Ionicons name="eye" color="#fff" size={25} />
            ) : (
              <Ionicons name="eye-off" color="#fff" size={25} />
            )}
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          onChangeText={text => setName(text)}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
        />

        <TouchableOpacity onPress={postRegister} style={styles.buttonStyle}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.textSignup}>Register</Text>
          )}
        </TouchableOpacity>
        <Monserrat color="#373737" marginTop={10}>
          Already have an account?
        </Monserrat>
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => navigation.navigate('Login')}>
          <Monserrat type="Bold" color="#000" size={12} marginTop={-10}>
            Login
          </Monserrat>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C222B',
  },
  textInput: {
    height: 40,
    borderColor: '#ffffff',
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    color: '#fff',
    paddingHorizontal: 20,
    marginVertical: 10,
    marginBottom: 10,
    borderRadius: 10,
    width: moderateScale(300),
  },
  buttonStyle: {
    backgroundColor: '#003456',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    width: moderateScale(300),
    borderRadius: 20,
  },
  textSignup: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  hide: {
    position: 'absolute',
    right: 10,
    top: 16,
  },
  cardView: {
    backgroundColor: 'grey',
    width: '90%',
    borderRadius: 20,
    marginTop: '-2%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
