import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CDataBox = ({label, value}) => {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default CDataBox;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    borderWidth: 1,
    height: 44,
    borderRadius: 5,
    borderColor: '#C6C6C6',
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  label: {
    fontSize: 14,
    color: '#2D2D2D',
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: '#8E8E8E',
  },
});
