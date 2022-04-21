import React from 'react';
import {Provider} from 'react-redux';
import {persistedStore, store} from '../store';
import {PersistGate} from 'redux-persist/integration/react';

const ContainerTesting = screen => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>{screen}</PersistGate>
    </Provider>
  );
};

export default ContainerTesting;
