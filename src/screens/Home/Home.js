import {
  Text,
  View,
  Image,
  Modal,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Cards from '../../Components/Cards';
import React, {useCallback, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import MyStatusBar from '../../Components/MyStatusBar';

const {height, width} = Dimensions.get('window');

const Home = () => {
  const [filterModal, setFilterModal] = useState(false);
  const [val, setVal] = useState(0);
  const [age, setAge] = useState(0);
  const [data, setData] = useState([
    {
      image:
        'https://www.istockphoto.com/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-gm1093110112-293349147',
      id: 1,
      title: 'vidish',
      age: 26,
      distance: '10 km',
    },
    {
      image:
        'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1600',
      id: 2,
      title: 'gaurav',
      age: 24,
      distance: '20 km',
    },
    {
      image:
        'https://www.istockphoto.com/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-gm1093110112-293349147',
      id: 1,
      title: 'krunal',
      age: 22,
      distance: '25 km',
    },
    {
      image:
        'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1600',
      id: 2,
      title: 'manan',
      age: 24,
      distance: '5 km',
    },
  ]);

  const swipe = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      console.log('dx:' + dx + ' dy:' + dy);
      swipe.setValue({x: dx, y: dy});
    },

    onPanResponderRelease: (_, {dx, dy}) => {
      console.log('released:' + 'dx:' + dx + ' dy:' + dy);
      let direction = Math.sign(dx);
      console.log(direction, 'direction');
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeCard = useCallback(() => {
    setData(prepState => prepState.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  const handelSelection = useCallback(
    direction => {
      Animated.timing(swipe, {
        toValue: {x: direction * 500, y: 0},
        useNativeDriver: true,
        duration: 500,
      }).start(removeCard);
    },
    [removeCard],
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

      {data
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
