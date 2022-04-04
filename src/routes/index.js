import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainRoute from './MainRoute';
import {navigationRef} from '../helpers/Navigasi';

const Root = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainRoute />
    </NavigationContainer>
  );
};

export default Root;
