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
import {setRegister} from '../Login/redux/action';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/Loading';

export default function Register({navigation}) {
  const [dataRegister, setDataRegister] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const {loading} = useSelector(state => state.global);

  const dispatch = useDispatch();

  const postRegister = async () => {
    // Cek inputan kosong
    if (!dataRegister.email || !dataRegister.password || !dataRegister.name) {
      alert('Email atau password atau name tidak boleh kosong');
    } else {
      dispatch(setRegister(dataRegister));
    }
  };
  const handleChange = (key, value) => {
    setDataRegister({...dataRegister, [key]: value});
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <Image
          style={{marginBottom: 50, width: 300, height: 70}}
          resizeMode="contain"
          source={logo}
        />

        <Monserrat size={20} marginTop={-50} type="Bold">
          Book App
        </Monserrat>
        <Monserrat>Please register before using our app</Monserrat>

        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={text => handleChange('email', text)}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
        />
        <View style={{position: 'relative'}}>
          <TextInput
            secureTextEntry={hidePassword}
            onChangeText={text => handleChange('password', text)}
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
          onChangeText={text => handleChange('name', text)}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
        />

        <TouchableOpacity onPress={postRegister} style={styles.buttonStyle}>
          {loading ? (
            <Loading />
          ) : (
            <Monserrat
              type="Bold"
              color="white"
              size={16}
              margin={10}
              textAlign="center">
              Register
            </Monserrat>
          )}
        </TouchableOpacity>
        <Monserrat color="#171717" marginTop={10}>
          Already have an account?
        </Monserrat>
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => navigation.navigate('Login')}>
          <Monserrat type="Bold" color="#000" size={14} marginTop={-10}>
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
