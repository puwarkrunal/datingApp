import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CBack from '../../Components/CBack';
import {moderateScale, verticalScale} from '../../helper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Like = () => {
  const data = Array(6).fill('');
  const [priceModal, setPriceModal] = useState(true);

  const renderCard = () => {
    return <View style={styles.card}></View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <CBack title={'Likes'} />

      <View style={styles.mainContainer}>
        <Text style={styles.headingText}>7 Likes</Text>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={renderCard}
          keyExtractor={(_, index) => index}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
        />
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text>SEE WHO LIKES YOU</Text>
      </TouchableOpacity>

      <Modal visible={priceModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.div}>
            <Text style={styles.title}>Get Mingle Gold</Text>
            <View style={styles.circle}>
              <AntDesign name={'heart'} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Like;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    width: '90%',
    height: '80%',
    alignSelf: 'center',
    margin: moderateScale(12),
  },
  headingText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
  card: {
    width: 150,
    margin: 12,
    height: 200,
    backgroundColor: 'black',
  },
  btn: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(45),
    backgroundColor: '#EEAF51',
    borderRadius: moderateScale(12),
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  div: {
    height: '60%',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  title: {
    color: '#EEAF51',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: moderateScale(22),
    marginVertical: verticalScale(16),
  },
  circle: {
    height: 57,
    width: 57,
    borderRadius: 28,
    backgroundColor: '#B44CF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
