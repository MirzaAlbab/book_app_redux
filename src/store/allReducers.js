import {combineReducers} from 'redux';
import globalReducer from '../reducer/globalReducer';
import HomeReducer from '../screens/Home/redux/reducer';
import LoginReducer from '../screens/Login/redux/reducer';

export const allReducers = combineReducers({
  global: globalReducer,
  home: HomeReducer,
  login: LoginReducer,
});
