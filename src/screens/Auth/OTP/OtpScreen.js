import React, {useEffect, useRef, useState} from 'react';
import CBack from '../../../Components/CBack';
import CButton from '../../../Components/CButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {moderateScale, verticalScale} from '../../../helper';

const OtpScreen = () => {
  const route = useRoute();
  const {phone} = route.params;
  const navigation = useNavigation();

  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(`+91 ${phone}`);
  const [verificationId, setVerificationId] = useState('');

  const otpInputs = Array.from({length: 6}, () => useRef(null));
  const [otp, setOtp] = useState('');

  useEffect(() => {
    sendOtp(phoneNumber);
  }, []);

  const sendOtp = async phone => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
    } catch (error) {
      console.log('Error sending OTP:', error);
    }
  };

  async function confirmCode() {
    try {
      await confirm.confirm(otp);
      console.log('Code Verify successfully');
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const handleOtpChange = (value, index) => {
    let newOtp = otp;
    newOtp = newOtp.split('');
    newOtp[index] = value;
    newOtp = newOtp.join('');
    setOtp(newOtp);

    // Navigate to the next input field
    if (value && index < otpInputs.length - 1) {
      otpInputs[index + 1].current.focus();
    }
    // Navigate to the previous input field
    else if (!value && index > 0) {
      otpInputs[index - 1].current.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CBack />

      <View style={{marginHorizontal: 45}}>
        <Text style={styles.heading}>Enter OTP</Text>
      </View>

      <View style={styles.inputContainer}>
        {otpInputs.map((inputRef, index) => (
          <TextInput
            ref={inputRef}
            key={index}
            value={otp.charAt(index)}
            onChangeText={value => handleOtpChange(value, index)}
            maxLength={1}
            style={styles.input}
            onKeyPress={({nativeEvent}) => {
              // Handle backspace/delete key press
              if (
                nativeEvent.key === 'Backspace' ||
                nativeEvent.key === 'Delete'
              ) {
                handleOtpChange('', index);
              }
            }}
            keyboardType="numeric"
          />
        ))}
      </View>

      <View>
        <CButton
          name={'RESEND'}
          otherStyle={[styles.btnStyle, {backgroundColor: 'transparent'}]}
          txtStyle={{color: '#8E8E8E'}}
          // onPress={() => navigation.navigate('Otp')}
        />
        <CButton
          name={'CONTINUE'}
          otherStyle={styles.btnStyle}
          txtStyle={{color: 'white'}}
          onPress={() => navigation.navigate('Tabs')}
        />
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: moderateScale(33),
  },
  input: {
    color: 'black',
    textAlign: 'center',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(45),
    height: moderateScale(45),
    textAlignVertical: 'center',
    fontSize: moderateScale(22),
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(12),
  },
  btnStyle: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#AA3FEC',
  },
});
