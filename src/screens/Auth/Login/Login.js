import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {logo} from '../../../assets/images';
import CButton from '../../../Components/CButton';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Login = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['rgba(160,32,240,0.7)', '#7512B2']}
        style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.bgLogo}>
            <Image source={logo} style={styles.img} />
          </View>
        </View>

        <View style={styles.secContainer}>
          <Text style={styles.txt}>
            By clicking Log In, you agree with our Terms. Learn how we process
            your data in our Privacy Policy and Cookies Policy.
          </Text>

          <CButton
            name={'Login With Phone'}
            iconName={'phone'}
            onPress={() => navigation.navigate('LoginWithPhone')}
          />

          <View style={{alignSelf: 'center', flexDirection: 'row'}}>
            <Text style={{color: 'white'}}>Don't have account? </Text>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgLogo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  secContainer: {
    height: '50%',
    width: '100%',
    justifyContent: 'space-around',
  },
  txt: {
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 50,
  },
});
