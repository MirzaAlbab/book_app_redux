import React from 'react';
import {Provider} from 'react-redux';
import {persistedStore, store} from './src/store';
import Root from './src/routes';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <Root />
      </PersistGate>
    </Provider>
  );
}
