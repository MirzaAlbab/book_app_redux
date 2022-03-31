import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import MainRoute from './src/routes/MainRoute'

export default function App() {
  return (
    <NavigationContainer>
      <MainRoute />
    </NavigationContainer>


  )
}