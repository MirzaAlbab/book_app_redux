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
      navigate('Home');
    } else {
      return Alert.alert('warning', 'Email atau Password salah');
    }
  } catch (error) {
    console.log(error);
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
  dispatch(setToken());
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
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};
