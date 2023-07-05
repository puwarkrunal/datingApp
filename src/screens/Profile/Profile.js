import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CBack from '../../Components/CBack';
import CDataBox from '../../Components/CDataBox';
import {useDispatch, useSelector} from 'react-redux';
import {horizontalScale, moderateScale} from '../../helper';
import {useNavigation} from '@react-navigation/native';
import CButton from '../../Components/CButton';
import auth from '@react-native-firebase/auth';
import {setUserData} from '../../redux/slices/UserSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userData = useSelector(state => state.user.data);
  const accountSettingsData = [
    {
      label: 'Name',
      value: userData?.name,
    },
    {
      label: 'Phone Number',
      value: userData?.phone,
    },
    {
      label: 'Date of birth',
      value: userData?.DOB,
    },
    {
      label: 'Email',
      value: userData?.email,
    },
  ];

  const onLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(setUserData([]));
        navigation.replace('Login');
      });
  };

  const onSelect = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <CBack title={'Profile'} />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.profile}>
            <TouchableOpacity style={styles.floatEdit} onPress={onSelect}>
              <AntDesign name="edit" size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.nameAgeTxt}>Jenny, 22</Text>
        </View>
      </View>

      <View style={styles.bottomView}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>
            Account Settings
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AccountSettings')}>
            <Text style={{color: '#247DCF', textDecorationLine: 'underline'}}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>

        {accountSettingsData.map((item, index) => {
          return <CDataBox key={index} label={item.label} value={item.value} />;
        })}

        <CButton name={'Logout'} onPress={onLogout} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  profile: {
    width: moderateScale(125),
    height: moderateScale(125),
    borderRadius: moderateScale(75),
    backgroundColor: 'red',
  },
  topView: {
    height: '35%',
    backgroundColor: '#AA3FEC',
  },
  nameAgeTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    marginTop: moderateScale(12),
  },
  bottomView: {
    height: '60%',
    backgroundColor: 'white',
    marginHorizontal: horizontalScale(20),
  },
  floatEdit: {
    width: 34,
    right: 10,
    height: 34,
    borderRadius: 17,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
