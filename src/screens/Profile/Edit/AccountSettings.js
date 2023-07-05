import React from 'react';
import {useSelector} from 'react-redux';
import CBack from '../../../Components/CBack';
import {moderateScale} from '../../../helper';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import CButton from '../../../Components/CButton';

const AccountSettings = () => {
  const userData = useSelector(state => state.user.data);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CBack title={'Edit'} />
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Text>Account Setting</Text>
        <TextInput style={styles.input} placeholder={userData?.name} />
        <TextInput style={styles.input} placeholder={userData?.phone} />
        <TextInput style={styles.input} placeholder={userData?.DOB} />
        <TextInput style={styles.input} placeholder={userData?.email} />

        <CButton
          name={'Save'}
          otherStyle={{backgroundColor: '#AA3FEC'}}
          txtStyle={{color: 'white'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C6C6C6',
    height: moderateScale(45),
    marginVertical: 8,
    padding: 6,
  },
});
