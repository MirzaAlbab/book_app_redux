import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ms} from 'react-native-size-matters';
import Monserrat from '../../components/Monserrat';
import logo from '../../assets/images/logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from './redux/action';
import {SafeAreaView} from 'react-native-safe-area-context';
export default function Login({navigation}) {
  const [emailerror, setEmailerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const [dataLogin, setDataLogin] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const {loading} = useSelector(state => state.global);
  const {token} = useSelector(state => state.login);

  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const regEmail =
      /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    if (key === 'email') {
      if (regEmail.test(value)) {
        setDataLogin({...dataLogin, [key]: value});
        setEmailerror(false);
      } else {
        setEmailerror(true);
        setDataLogin({...dataLogin, [key]: ''});
      }
    } else if (key === 'password') {
      if (regexPassword.test(value)) {
        setDataLogin({...dataLogin, [key]: value});
        setPassworderror(false);
      } else {
        setDataLogin({...dataLogin, [key]: ''});
        setPassworderror(true);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const postLogin = async () => {
    // Cek inputan kosong
    if (!dataLogin.email || !dataLogin.password) {
      Alert.alert('warning', 'Email atau password tidak boleh kosong');
    } else {
      dispatch(setLogin(dataLogin));
    }
  };
  const renderlogin = () => {
    return (
      <View style={styles.cardView}>
        <Image
          style={{marginBottom: 50, width: 300, height: 70}}
          resizeMode="contain"
          source={logo}
        />
        <Monserrat size={20} marginTop={-50} type="Bold">
          Book App
        </Monserrat>
        <Monserrat>Please login to continue using our app</Monserrat>

        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={text => handleChange('email', text)}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
        />
        {emailerror ? (
          <Monserrat type="Bold" color="red" fontSize={12} marginLeft={-220}>
            Email tidak valid
          </Monserrat>
        ) : null}

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
        {passworderror ? (
          <Monserrat type="Bold" color="red" fontSize={12} marginLeft={-10}>
            Password minimal 1 huruf, 1 angka, dan 8 karakter
          </Monserrat>
        ) : null}

        {loading ? (
          <Loading />
        ) : (
          <TouchableOpacity onPress={postLogin} style={styles.buttonStyle}>
            <Monserrat
              type="Bold"
              color="white"
              size={16}
              margin={10}
              textAlign="center">
              Login
            </Monserrat>
          </TouchableOpacity>
        )}
        <Monserrat color="#171717" marginTop={10}>
          Don’t have an account?
        </Monserrat>
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => navigation.navigate('Register')}>
          <Monserrat type="Bold" color="#000" size={14} marginTop={-10}>
            Register
          </Monserrat>
        </TouchableOpacity>
      </View>
    );
  };

  return <SafeAreaView style={styles.container}>{renderlogin()}</SafeAreaView>;
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
    width: ms(300),
  },
  buttonStyle: {
    backgroundColor: '#003456',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    width: ms(300),
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
