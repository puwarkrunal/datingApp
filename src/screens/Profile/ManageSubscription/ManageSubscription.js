import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CBack from '../../../Components/CBack';
import {moderateScale, verticalScale} from '../../../helper';
import CButton from '../../../Components/CButton';

const ManageSubscription = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CBack title={'Manage Subscription'} />

      <View style={styles.card}>
        <View style={styles.txtContainer}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>
            Current Plan
          </Text>
          <Text style={{fontSize: 15, color: 'black'}}>Free</Text>
        </View>

        <View style={styles.txtContainer}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>
            Time Period
          </Text>
          <Text style={{fontSize: 15, color: 'black'}}>
            12/04/2020 - 12/04/2021
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 35,
          }}>
          <CButton
            name={'Unsubscribe'}
            txtStyle={{fontSize: 12}}
            otherStyle={{height: 40, borderWidth: 1, width: '45%'}}
          />
          <CButton
            name={'Upgrade'}
            txtStyle={{color: 'white', fontSize: 12}}
            otherStyle={{height: 40, backgroundColor: '#AA3FEC', width: '45%'}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageSubscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: verticalScale(220),
    backgroundColor: 'white',
    padding: moderateScale(22),
    borderRadius: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  txtContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    alignItems: 'center',
  },
});
