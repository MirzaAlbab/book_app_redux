import axios from 'axios';
import {BaseUrlApi} from '../../../helpers/api';
import {navigate} from '../../../helpers/Navigasi';
import {setLoading} from '../../../reducer/globalAction';
import {store} from '../../../store';
const token = store.getState().login.token;

axios.defaults.headers.Authorization = `Bearer ${token}`;

export const getAllBook = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    const results = await axios.get(`${BaseUrlApi}books`, {
      validateStatus: status => status < 501,
    });
    console.log(results.status);

    if (results.status <= 201) {
      dispatch(setBookPopular(results.data.results));
      const sorted = results.data.results
        .sort(function (a, b) {
          return b.average_rating - a.average_rating;
        })
        .slice(0, 6);
      dispatch(setBookRecommended(sorted));
    }
  } catch (error) {
    console.log(error);
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
export const getDetailBook = id => async dispatch => {
  try {
    dispatch(setLoading(true));
    const results = await axios.get(`${BaseUrlApi}books/${id}`, {
      validateStatus: status => status < 501,
    });
    if (results.status <= 201) {
      dispatch(setdetailBook(results.data));
      navigate('Detail');
    }
  } catch (error) {
    console.log(error);
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
