import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash/Splash';
import Home from '../screens/Home/Home';
import BottomTab from './BottomTab';
import Login from '../screens/Auth/Login/Login';
import Signup from '../screens/Auth/Signup/Signup';
import OtpScreen from '../screens/Auth/OTP/OtpScreen';
import LoginWithPhone from '../screens/Auth/LoginWithPhone/LoginWithPhone';
import ChatScreen from '../screens/Chat/ChatScreen/ChatScreen';
import AccountSettings from '../screens/Profile/Edit/AccountSettings';

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
      <Stack.Screen name="LoginWithPhone" component={LoginWithPhone} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Tabs" component={BottomTab} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
    </Stack.Navigator>
  );
};

export default HomeStack;
