import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import CBack from '../../../Components/CBack';
import CButton from '../../../Components/CButton';
import {useNavigation} from '@react-navigation/native';

const LoginWithPhone = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <CBack />
      <View style={{marginHorizontal: 45, marginBottom: 62}}>
        <Text style={styles.heading}>My number is</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          alignSelf: 'center',
        }}>
        <TextInput
          style={{
            borderBottomWidth: 1,
            width: '30%',
            height: 50,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 18,
          }}
          editable={false}
          value="IN +91"
        />
        <TextInput
          style={{
            borderBottomWidth: 1,
            width: '60%',
            height: 50,
            fontSize: 18,
            letterSpacing: 2,
          }}
          placeholder="Phone Number"
          maxLength={10}
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
          onPress={() => navigation.navigate('Otp')}
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
  heading: {
    fontSize: 33,
    color: 'black',
    fontWeight: 'bold',
  },
  btnStyle: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#AA3FEC',
  },
});
