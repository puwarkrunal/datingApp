import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CBack from '../../Components/CBack';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: '40%', backgroundColor: '#AA3FEC'}}>
        <CBack title={'Profile'} />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.profile} />
          <Text
            style={{
              fontSize: 15,
              color: 'white',
              fontWeight: 'bold',
              marginTop: 12,
            }}>
            Jenny, 22
          </Text>
        </View>
      </View>
      <View
        style={{height: '60%', backgroundColor: 'white', marginHorizontal: 20}}>
        <View
          style={{
            marginTop: 33,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>Account Settings</Text>
          <TouchableOpacity>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profile: {
    width: 125,
    height: 125,
    borderRadius: 75,
    backgroundColor: 'red',
  },
});
