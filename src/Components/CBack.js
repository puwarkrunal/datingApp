import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const CBack = () => {
  const navigation = useNavigation();
  return (
    <View style={{padding: 20}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CBack;

const styles = StyleSheet.create({});
