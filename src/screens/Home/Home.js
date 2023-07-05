import {
  Text,
  View,
  Modal,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Cards from '../../Components/Cards';
import auth from '@react-native-firebase/auth';
import Slider from '@react-native-community/slider';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useCallback, useEffect, useRef, useState} from 'react';

const {height, width} = Dimensions.get('window');

const Home = () => {
  const [val, setVal] = useState(0);
  const [age, setAge] = useState(0);
  const [listUser, setListUser] = useState([]);
  const [filterModal, setFilterModal] = useState(false);
  const [removedUserData, setRemovedUserData] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      let list = await firestore().collection('users').get();
      let allUser = [];
      list.docs.map(item => {
        allUser.push(item.data());
      });
      setListUser(allUser);
    };
    getAllUsers();
  }, []);

  const rdx = useSelector(state => state.user.data);

  const swipe = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      swipe.setValue({x: dx, y: dy});
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      let direction = Math.sign(dx);
      console.log(direction, 'direction');
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 500,
        }).start(() => removeCard(direction));
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeCard = useCallback(
    direction => {
      let likeStatus =
        direction == 1 ? 'Like' : direction == -1 ? 'Reject' : null;
      setListUser(prevState => {
        const removedUser = prevState[0];
        removedUser.likeStatus = likeStatus;
        setRemovedUserData(prevRemovedUserData => [
          ...prevRemovedUserData,
          removedUser,
        ]);
        return prevState.slice(1);
      });
      swipe.setValue({x: 0, y: 0});
    },
    [swipe],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View></View>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Mingle</Text>
        <TouchableOpacity onPress={() => setFilterModal(true)}>
          <AntDesign name="filter" color="black" size={24} />
        </TouchableOpacity>
      </View>

      {listUser
        .map((item, index) => {
          let isFirst = index === 0;
          let dragHandler = isFirst ? panResponser.panHandlers : {};
          return (
            <Cards
              key={index}
              item={item}
              rotate={rotate}
              isFirst={isFirst}
              swipe={swipe}
              {...dragHandler}
            />
          );
        })
        .reverse()}

      <View
        style={{
          width: '100%',
          position: 'absolute',
          height: 100,
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#FF2D2D',
            elevation: 5,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            handelSelection(-1);
          }}>
          <AntDesign name={'close'} size={24} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#AA3FEC',
            elevation: 5,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            handelSelection(1);
          }}>
          <AntDesign name="heart" color={'white'} size={24} />
        </TouchableOpacity>
      </View>

      <Modal visible={filterModal} transparent>
        <SafeAreaView
          style={{
            backgroundColor: 'white',
            height: height / 3,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          <View style={styles.filterHeader}>
            <TouchableOpacity onPress={() => setFilterModal(false)}>
              <AntDesign name={'arrowleft'} size={24} color={'#8E8E8E'} />
            </TouchableOpacity>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Filter
            </Text>
            <TouchableOpacity onPress={() => setFilterModal(false)}>
              <AntDesign name={'check'} size={24} color={'#AA3FEC'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              backgroundColor: 'red',
              padding: 9,
              height: 'auto',
            }}>
            <Text>Distance</Text>
            <Slider
              style={{width: '90%', height: 40}}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#AA3FEC"
              maximumTrackTintColor="#CACACA"
              onValueChange={txt => setVal(txt)}
            />
            <Text>Gender</Text>
            <View></View>

            <Text>Age</Text>
            <Slider
              style={{width: '90%', height: 40}}
              minimumValue={16}
              maximumValue={100}
              minimumTrackTintColor="#AA3FEC"
              maximumTrackTintColor="#CACACA"
              onValueChange={txt => setAge(txt)}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {},
  header: {
    height: 60,
    backgroundColor: 'white',
    padding: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterHeader: {
    height: 60,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
