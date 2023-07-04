import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {verticalScale} from '../helper';
import moment from 'moment';

const CDatePicker = ({onSelect}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelect = () => {
    setIsVisible(false);
    onSelect(moment(selectedDate).format('DD-MM-YYYY'));
  };

  return (
    <>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setIsVisible(true)}>
        <Text style={{color:'black'}}>
          {selectedDate ? moment(selectedDate).format('DD-MM-YYYY') : 'Select a date'}
        </Text>
      </TouchableOpacity>

      {isVisible && (
        <View style={styles.datePickerContainer}>
          <DatePicker
            date={selectedDate || new Date()}
            onDateChange={date => setSelectedDate(date)}
            mode="date"
          />

          <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
            <Text>Select</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    height: verticalScale(60),
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
    marginVertical: verticalScale(6),
  },
  datePickerContainer: {
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  selectButton: {
    zIndex: 1,
    padding: 10,
    backgroundColor: 'lightblue',
  },
});

export default CDatePicker;
