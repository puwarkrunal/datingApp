import {
  Text,
  View,
  Alert,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import CBack from '../../../Components/CBack';
import CButton from '../../../Components/CButton';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {horizontalScale, moderateScale, verticalScale} from '../../../helper';

const LoginWithPhone = () => {
  const navigation = useNavigation();
  const [number, setNumber] = useState('');

  const checkNumber = async () => {
    let getList = await firestore()
      .collection('users')
      .where('phone', '==', number)
      .get();

    let data = getList.docs;
    let isExist = getList.docs.length == 0 ? false : true;
    return {isExist, data};
  };

  const onContinue = () => {
    if (number < 10) {
      return;
    } else {
      checkNumber().then(res => {
        let data = res?.data[0]?.data();
        if (res.isExist == true) {
          navigation.navigate('Otp', {data: data, screen: 'login'});
        } else {
          Alert.alert(
            'warning',
            'This number is not valid please signup first',
          );
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top-bar */}
      <CBack />

      {/* Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>My number is</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.codeInput} editable={false} value="IN +91" />
        <TextInput
          style={styles.mainInput}
          placeholder="Phone Number"
          maxLength={10}
          onChangeText={txt => setNumber(txt)}
          placeholderTextColor={'black'}
          keyboardType="number-pad"
        />
      </View>

      <View style={{width: '80%', alignSelf: 'center'}}>
        <Text style={{marginVertical: 35, color: '#8C8C8C', fontSize: 13}}>
          By clicking Log In, you agree with our Terms. Learn how process your
          data in our Privacy Policy and Cookies Policy. By clicking Log In, you
          agree with our Terms. Learn how process your data in our Privacy
          Policy and Cookies
        </Text>

        <CButton
          name={'CONTINUE'}
          otherStyle={styles.btnStyle}
          txtStyle={{color: 'white'}}
          onPress={() => onContinue()}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginWithPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headingContainer: {
    marginBottom: verticalScale(62),
    marginHorizontal: horizontalScale(45),
  },
  heading: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: moderateScale(33),
  },
  btnStyle: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#AA3FEC',
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeInput: {
    width: '30%',
    textAlign: 'center',
    borderBottomWidth: 1,
    height: verticalScale(50),
    fontSize: moderateScale(18),
    textAlignVertical: 'center',
    color: 'black',
  },
  mainInput: {
    width: '60%',
    borderBottomWidth: 1,
    height: verticalScale(50),
    fontSize: moderateScale(18),
    letterSpacing: moderateScale(2),
    color: 'black',
  },
});
