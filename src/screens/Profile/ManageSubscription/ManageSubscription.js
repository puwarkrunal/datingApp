import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CBack from '../../../Components/CBack';
import {moderateScale, verticalScale} from '../../../helper';
import CButton from '../../../Components/CButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const ManageSubscription = () => {
  const planData = [
    {
      id: 1,
      months: 12,
      price: 7,
      discount: null,
    },
    {
      id: 2,
      months: 6,
      price: 10,
      discount: 36,
    },
    {
      id: 3,
      months: 1,
      price: 19,
      discount: null,
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <CBack title={'Manage Subscription'} />
      <ScrollView contentContainerStyle={{paddingBottom: 18}}>
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
              otherStyle={{
                height: 40,
                backgroundColor: '#AA3FEC',
                width: '45%',
              }}
            />
          </View>
        </View>

        <View style={styles.priceCard}>
          <Text style={styles.priceCardHeading}>Get Mingle Gold</Text>

          <LinearGradient
            colors={['#B44CF4', '#7A29AC']}
            style={styles.purpleCard}>
            <AntDesign name="heart" color="white" size={24} />
          </LinearGradient>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 6,
            }}>
            Unlimited Likes
          </Text>
          <Text style={{textAlign: 'center', fontSize: 12}}>
            Send as many likes as you want
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '40%',
              alignSelf: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            {Array(5)
              .fill('')
              .map((i, e) => {
                return (
                  <View
                    key={e}
                    style={{
                      height: 10,
                      width: 10,
                      borderWidth: 1,
                      backgroundColor: e == 1 ? '#E99C29' : null,
                      borderColor: '#C0C0C0',
                      borderRadius: 5,
                    }}
                  />
                );
              })}
          </View>

          <View style={styles.priceView}>
            {planData.map((i, e) => {
              return (
                <TouchableOpacity
                  onPress={() => setSelectedPlan(e)}
                  key={e}
                  style={{
                    width: '33.33%',
                    borderWidth: 1,
                    borderColor: selectedPlan == e ? '#EEAF51' : '#DEDEDE',
                    height: 180,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: selectedPlan == e ? '#EEAF51' : 'black',
                    }}>
                    {i.months}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: selectedPlan == e ? '#EEAF51' : 'black',
                    }}>
                    months
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: selectedPlan == e ? '#EEAF51' : 'black',
                    }}>
                    ${i.price}/mo
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <CButton
            name={'CONTINUE'}
            otherStyle={{backgroundColor: '#EEAF51'}}
            txtStyle={{color: 'white'}}
          />
        </View>
      </ScrollView>
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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginTop: verticalScale(45),
  },
  txtContainer: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceCard: {
    height: 'auto',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginTop: verticalScale(45),
    padding: 9,
  },
  priceCardHeading: {
    fontSize: moderateScale(22),
    color: '#EEAF51',
    textAlign: 'center',
    marginVertical: 12,
    fontWeight: 'bold',
  },
  purpleCard: {
    height: 57,
    width: 57,
    borderRadius: 27,
    backgroundColor: '#B44CF4',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
  },
});
