import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Success from '../screens/Success';
import Media from '../screens/Media';
const Stack = createStackNavigator();

export default function MainRoute() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Media" component={Media} />
    </Stack.Navigator>
  );
}
