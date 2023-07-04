import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../helper';

const CDropdown = ({options, onSelect}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = value => {
    setSelectedValue(value);
    setIsVisible(false);
    onSelect(value);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsVisible(true)}>
        <Text style={[styles.txt, {color: selectedValue ? 'black' : 'grey'}]}>
          {selectedValue || 'Gender'}
        </Text>
      </TouchableOpacity>

      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}>
          <View style={styles.modalContent}>
            {options.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleSelect(option)}>
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownButton: {
    // padding: 10,
    height: verticalScale(60),
    justifyContent:'center',
    borderBottomWidth: 1,
    borderColor: 'black',
    marginVertical: verticalScale(6),
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  txt:{
    fontSize:moderateScale(16)
  }
});

export default CDropdown;
