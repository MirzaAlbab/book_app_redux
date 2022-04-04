import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import Monserrat from '../../components/Monserrat';
import logo from '../../assets/images/logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from './redux/action';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Login({navigation}) {
  const [dataLogin, setDataLogin] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const {loading} = useSelector(state => state.global);
  const {token} = useSelector(state => state.login);

  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    setDataLogin({...dataLogin, [key]: value});
  };

  useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
  }, [token]);

  const postLogin = async () => {
    // Cek inputan kosong
    if (!dataLogin.email || !dataLogin.password) {
      alert('Email atau password tidak boleh kosong');
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
        <Monserrat size={20} marginTop={-50}>
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

        {loading ? (
          <Loading />
        ) : (
          <TouchableOpacity onPress={postLogin} style={styles.buttonStyle}>
            <Text style={styles.textSignup}>Login</Text>
          </TouchableOpacity>
        )}
        <Monserrat color="#373737" marginTop={10}>
          Don’t have an account?
        </Monserrat>
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => navigation.navigate('Register')}>
          <Monserrat type="Bold" color="#000" size={12} marginTop={-10}>
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
