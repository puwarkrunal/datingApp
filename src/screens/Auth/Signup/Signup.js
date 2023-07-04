import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CBack from '../../../Components/CBack';
import CInput from '../../../Components/CInput';
import CButton from '../../../Components/CButton';
import {useNavigation} from '@react-navigation/native';
import {facebookLogo, googleLogo} from '../../../assets/images';
import {horizontalScale, moderateScale, verticalScale} from '../../../helper';
import CDropdown from '../../../Components/CDropdown';
import CDatePicker from '../../../Components/CDatePicker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [DOB, setDOB] = useState('');

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
      phone: Phone,
      email: email,
      gender: gender,
      DOB: DOB,
    };
    // await firestore().collection('Users').add(data);
    navigation.navigate('Otp', {phone: Phone});
  };

  return (
    <SafeAreaView style={styles.container}>
      <CBack />
      <View style={{marginHorizontal: horizontalScale(45)}}>
        <Text style={styles.heading}>Sign Up</Text>
      </View>

      <View style={styles.inputContainer}>
        <CInput placeholder={'Full Name'} onChangeText={txt => setName(txt)} />
        <CDropdown options={genderList} onSelect={handleDropdownSelect} />
        <CDatePicker onSelect={handleSelect} />
        <CInput placeholder={'Email'} onChangeText={txt => setEmail(txt)} />
        <CInput
          placeholder={'Phone'}
          keyboardType='number-pad'
          onChangeText={txt => setPhone(txt)}
        />
      </View>

      <CButton
        name={'Sign Up'}
        otherStyle={styles.btnStyle}
        txtStyle={{color: 'white'}}
        onPress={onSignup}
      />

      <View style={styles.orDesign}>
        <View style={{borderBottomWidth: 1, width: '40%'}} />
        <Text>Or</Text>
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
    width: moderateScale(50),
    height: moderateScale(50),
  },
  socialBtn: {
    margin: moderateScale(6),
  },
});
