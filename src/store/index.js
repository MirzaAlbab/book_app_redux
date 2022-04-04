import {createStore, applyMiddleware} from 'redux';
//middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//storage
import {persistStore, persistReducer} from 'redux-persist';
import {allReducers} from './allReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
const config = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
  whitelist: ['login'],
};

const persistedReducer = persistReducer(config, allReducers);

const allMiddlewares = applyMiddleware(logger, thunk);

export const store = createStore(persistedReducer, {}, allMiddlewares);

export const persistedStore = persistStore(store);
