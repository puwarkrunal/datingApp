import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CBack from '../../../Components/CBack';
import CInput from '../../../Components/CInput';
import CButton from '../../../Components/CButton';
import {useNavigation} from '@react-navigation/native';
import {facebookLogo, googleLogo} from '../../../assets/images';
import {horizontalScale, moderateScale, verticalScale} from '../../../helper';
import CDropdown from '../../../Components/CDropdown';
import CDatePicker from '../../../Components/CDatePicker';
import messaging from '@react-native-firebase/messaging';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [DOB, setDOB] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const registerForRemoteMessages = async () => {
      try {
        // await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      } catch (error) {
        console.error('Error registering device for remote messages:', error);
      }
    };

    registerForRemoteMessages();
  }, []);

  const genderList = ['Male', 'Female', 'other'];

  const handleDropdownSelect = value => {
    console.log('Selected value:', value);
    setGender(value);
  };

  const handleSelect = value => {
    console.log('Selected value:', value);
    setDOB(value);
  };

  const onSignup = async () => {
    const data = {
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      DOB: DOB,
      plan: 'basic',
    };

    navigation.navigate('Otp', {data: data, screen: 'signup'});
  };

  return (
    <SafeAreaView style={styles.container}>
      <CBack />
      <View style={{marginHorizontal: horizontalScale(45)}}>
        <Text style={styles.heading}>Sign Up</Text>
      </View>

      <View style={styles.inputContainer}>
        <CInput placeholder={'Full Name'} onChangeText={txt => setName(txt)} />
        <CInput placeholder={'Email'} onChangeText={txt => setEmail(txt)} />
        <CInput
          placeholder={'Phone'}
          keyboardType="number-pad"
          onChangeText={txt => setPhone(txt)}
        />
        <CDropdown options={genderList} onSelect={handleDropdownSelect} />
        <CDatePicker onSelect={handleSelect} />
      </View>

      <CButton
        name={'Sign Up'}
        otherStyle={styles.btnStyle}
        txtStyle={{color: 'white'}}
        onPress={onSignup}
      />

      <View style={styles.orDesign}>
        <View style={{borderBottomWidth: 1, width: '40%'}} />
        <Text style={{color: 'black'}}>Or</Text>
        <View style={{borderBottomWidth: 1, width: '40%'}} />
      </View>

      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TouchableOpacity style={styles.socialBtn}>
          <Image source={googleLogo} style={styles.socialImg} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn}>
          <Image source={facebookLogo} style={styles.socialImg} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: verticalScale(45),
  },
  heading: {
    color: 'black',
    fontSize: moderateScale(33),
  },
  btnStyle: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#AA3FEC',
  },
  orDesign: {
    width: '40%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(42),
  },
  socialImg: {
    resizeMode: 'contain',
    width: moderateScale(45),
    height: moderateScale(45),
  },
  socialBtn: {
    marginHorizontal: moderateScale(12),
  },
});
