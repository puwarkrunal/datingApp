import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CBack from '../../Components/CBack';
import CButton from '../../Components/CButton';
import auth from '@react-native-firebase/auth';
import CDataBox from '../../Components/CDataBox';
import {useDispatch, useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import {setUserData} from '../../redux/slices/UserSlice';
import ImagePicker from 'react-native-image-crop-picker';
import {horizontalScale, moderateScale} from '../../helper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userData = useSelector(state => state.user.data);
  const [profileImg, setProfileImg] = useState('');

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
      const reference = storage().ref(`users/${userData?.email}/profile.png`);

      reference.putFile(image.path).then(snapshot => {
        console.log('Photo uploaded!');

        reference.getDownloadURL().then(async url => {
          console.log(url, 'url');
          setProfileImg(url);

          const imgRef = firestore().collection('users');
          const querySnapshot = await imgRef
            .where('email', '==', userData?.email)
            .get();

          querySnapshot.forEach(doc => {
            const docRef = imgRef.doc(doc.id);
            docRef.update({imageURL: url});
            dispatch(setUserData({...userData, imageURL: url}));
          });
        });
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'space-between',
          paddingBottom: 150,
        }}>
        <View style={styles.topView}>
          <CBack title={'Profile'} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.profile}>
              {profileImg && (
                <Image
                  source={{uri: profileImg}}
                  style={{height: '100%', width: '100%', borderRadius: 75}}
                />
              )}
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
            return (
              <CDataBox key={index} label={item.label} value={item.value} />
            );
          })}

          <Text style={styles.txtHead}>Plan Settings</Text>
          <CDataBox
            label={'Current Plan'}
            value={'Free'}
            isClickable={true}
            onPress={() => navigation.navigate('ManageSubscription')}
          />

          <Text style={styles.txtHead}>Discovery Settings</Text>
          <CDataBox label={'Location'} value={'My Current Location'} />
          <CDataBox label={'Preferred Languages'} value={'English'} />
          <CDataBox label={'Show Me'} value={'Men'} />
          <CDataBox label={'Location'} value={'My Current Location'} />

          <CButton name={'Logout'} onPress={onLogout} />
        </View>
      </ScrollView>
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
  txtHead: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 12,
  },
});
