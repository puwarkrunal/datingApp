import {View, Text} from 'react-native';
import React from 'react';
import Home from './src/screens/Home/Home';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './src/navigation/HomeStack';
import MyStatusBar from './src/Components/MyStatusBar';

const App = () => {
  return (
    <NavigationContainer>
      <MyStatusBar backgroundColor={'white'} />
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
