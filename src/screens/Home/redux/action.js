import axios from 'axios';
import {BaseUrlApi} from '../../../helpers/api';
import {navigate} from '../../../helpers/Navigasi';
import {setLoading} from '../../../reducer/globalAction';

const authHeaders = getState => {
  const token = getState().login.token;
  return token ? {Authorization: `Bearer ${token}`} : {};
};

export const getAllBook = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const token = getState().login.token;
    const results = await axios.get(`${BaseUrlApi}books`, {
      headers: authHeaders(getState),
    });

    if (results.status <= 201 && token === getState().login.token) {
      dispatch(setBookPopular(results.data.results));
      dispatch(setBookRecommended(results.data.results));
    }
  } catch (error) {
    // The catalog remains visible from the last successful request.
  } finally {
    dispatch(setLoading(false));
  }
};
export const setBookPopular = payload => {
  return {
    type: 'SET_BOOK_POPULAR',
    payload,
  };
};
export const setBookRecommended = payload => {
  return {
    type: 'SET_BOOK_RECOMMENDED',
    payload,
  };
};

// Detail Book
export const getDetailBook = id => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const token = getState().login.token;
    const results = await axios.get(`${BaseUrlApi}books/${id}`, {
      headers: authHeaders(getState),
    });
    if (results.status <= 201 && token === getState().login.token) {
      dispatch(setdetailBook(results.data));
      navigate('Detail');
    }
  } catch (error) {
    // Keep the current screen when a detail request fails.
  } finally {
    dispatch(setLoading(false));
  }
};
export const setdetailBook = payload => {
  return {
    type: 'SET_BOOK_DETAIL',
    payload,
  };
};
