import axios from 'axios';
import {BaseUrlApi} from '../../../helpers/api';
import {navigate} from '../../../helpers/Navigasi';
import {setLoading} from '../../../reducer/globalAction';
import {Alert} from 'react-native';
export const setLogin = payload => async dispatch => {
  try {
    dispatch(setLoading(true));
    const body = {
      email: payload.email,
      password: payload.password,
    };

    const res = await axios.post(`${BaseUrlApi}auth/login`, body, {
      validateStatus: status => status < 501,
    });
    if (res.status <= 201) {
      dispatch(setUser(res.data));
      dispatch(setToken(res.data.tokens.access.token));
      navigate('Media');
    } else {
      return Alert.alert('warning', 'Email atau Password salah');
    }
  } catch (error) {
    Alert.alert('Login gagal', 'Periksa koneksi dan coba lagi');
  } finally {
    dispatch(setLoading(false));
  }
};
export const setUser = payload => {
  return {
    type: 'SET_USER',
    payload,
  };
};

export const setToken = payload => {
  return {
    type: 'SET_TOKEN',
    payload,
  };
};

export const setLogoutAction = () => dispatch => {
  dispatch(setToken(''));
  dispatch(setUser({}));
  dispatch({type: 'CLEAR_BOOKS'});
  navigate('Login');
};

//
export const setRegister = payload => async dispatch => {
  try {
    dispatch(setLoading(true));
    const body = {
      email: payload.email,
      password: payload.password,
      name: payload.name,
    };

    const res = await axios.post(`${BaseUrlApi}auth/register`, body, {
      validateStatus: status => status < 501,
    });
    if (res.status <= 201) {
      navigate('Success');
    } else {
      return Alert.alert('Registrasi gagal');
    }
  } catch (error) {
    Alert.alert('Registrasi gagal', 'Silakan coba lagi');
  } finally {
    dispatch(setLoading(false));
  }
};
