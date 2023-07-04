import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {moderateScale, verticalScale} from '../helper';

const CInput = ({value, onChangeText, placeholder,...props}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={'black'}
      style={styles.input}
      {...props}
    />
  );
};

export default CInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    height: verticalScale(60),
    fontSize: moderateScale(16),
    color:'black'
  },
});
