import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CButton = ({name, iconName, otherStyle, txtStyle, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btnContainer, otherStyle]}
      activeOpacity={0.8}>
      {iconName ? (
        <AntDesign name={iconName} size={20} color={'black'} />
      ) : (
        <View />
      )}
      <Text style={[styles.title, txtStyle]}>{name}</Text>
      <Text></Text>
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({
  btnContainer: {
    height: 50,
    width: '90%',
    borderRadius: 20,
    marginVertical: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
