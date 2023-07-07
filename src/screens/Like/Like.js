import {
  Text,
  View,
  Image,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import CBack from '../../Components/CBack';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {moderateScale, verticalScale} from '../../helper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Like = () => {
  const [LikeList, setLikeList] = useState([]);
  const rdx = useSelector(state => state.user.data);
  const [priceModal, setPriceModal] = useState(false);

  useEffect(() => {
    firestore()
      .collection('Request')
      .doc('AllRequest')
      .collection(rdx.uid)
      .get()
      .then(querySnapshot => {
        let list = [];
        querySnapshot.forEach(doc => {
          list.push(doc.data());
        });
        setLikeList(list);
      })
      .catch(error => {
        console.error('Error getting collection:', error);
      });
  }, []);

  const renderCard = ({item, index}) => {
    return (
      <View key={index} style={styles.card}>
        <Image
          source={{uri: item.imageURL}}
          style={{resizeMode: 'stretch', height: '100%', width: '100%'}}
        />
        <View
          style={{
            bottom: 0,
            width: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,.3)',
          }}>
          <Text style={{textAlign: 'center'}}>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CBack title={'Likes'} />

      {LikeList.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>You Don't Have Any Likes Right Now</Text>
        </View>
      ) : (
        <>
          <View style={styles.mainContainer}>
            <Text style={styles.headingText}>{LikeList.length} Likes</Text>
            <FlatList
              data={LikeList}
              numColumns={2}
              renderItem={renderCard}
              keyExtractor={(_, index) => index}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{justifyContent: 'space-between'}}
            />
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => setPriceModal(true)}>
            <Text>SEE WHO LIKES YOU</Text>
          </TouchableOpacity>
        </>
      )}

      <Modal visible={priceModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.div}>
            <Text style={styles.title}>Get Mingle Gold</Text>
            <View style={styles.circle}>
              <AntDesign name={'heart'} size={24} color="white" />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.floatBtn}
              onPress={() => setPriceModal(false)}>
              <AntDesign name="close" size={18} color="black" />
            </TouchableOpacity>
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
    alignSelf: 'center',
  },
  floatBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    position: 'absolute',
    top: -10,
    right: -10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
