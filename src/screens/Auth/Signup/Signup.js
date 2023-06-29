import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CBack from '../../../Components/CBack';
import CInput from '../../../Components/CInput';

const Signup = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CBack />
      <View style={{marginHorizontal: 45}}>
        <Text style={{fontSize: 33, color: 'black'}}>Sign Up</Text>
      </View>

      <View
        style={{
          width: '80%',
          alignSelf: 'center',
        }}>
        <CInput placeholder={'Full Name'} />
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
