import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash/Splash';
import Home from '../screens/Home/Home';
import BottomTab from './BottomTab';
import Login from '../screens/Auth/Login/Login';
import Signup from '../screens/Auth/Signup/Signup';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Tabs" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default HomeStack;
