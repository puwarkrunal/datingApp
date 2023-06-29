import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';

const CInput = ({value, onChangeText, placeholder}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleTextChange = text => {
    setInputValue(text);
    onChangeText(text);
  };

  return (
    <TextInput
      value={inputValue}
      onChangeText={handleTextChange}
      placeholder={placeholder}
      style={styles.input}
    />
  );
};

export default CInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 60,
    fontSize: 14,
    borderBottomWidth: 1,
  },
});
