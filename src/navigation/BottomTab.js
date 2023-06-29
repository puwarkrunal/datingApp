import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Like from '../screens/Like/Like';
import Chat from '../screens/Chat/Chat';
import Profile from '../screens/Profile/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tabs = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tabs.Navigator
      screenOptions={{headerShown: false, tabBarLabelStyle: {display: 'none'} , tabBarActiveTintColor:'#AA3FEC'}}>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, focused, size}) => {
            return <AntDesign name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="Like"
        component={Like}
        options={{
          tabBarIcon: ({color, focused, size}) => {
            return <AntDesign name="hearto" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({color, focused, size}) => {
            return <AntDesign name="message1" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, focused, size}) => {
            return <AntDesign name="user" size={size} color={color} />;
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTab;
