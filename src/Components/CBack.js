import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const CBack = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={{padding: 20, flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      {title && (
        <>
          <Text style={{fontSize:18,fontWeight:'bold'}}>{title}</Text>
          <Text></Text>
        </>
      )}
    </View>
  );
};

export default CBack;

const styles = StyleSheet.create({});
