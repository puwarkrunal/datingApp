import {View, Text, Image, Dimensions, Animated, Platform} from 'react-native';
import React, {useCallback, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TinderChoice from './TinderChoice';

const {height, width} = Dimensions.get('window');

const Cards = ({item, isFirst, swipe, ...rest}) => {
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });
  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const tinderSelection = useCallback(() => {
    return (
      <>
        <Animated.View
          style={{
            top: 60,
            right: 20,
            position: 'absolute',
            opacity: nopeOpacity,
            transform: [{rotate: '30deg'}],
          }}>
          <TinderChoice type={'Nope'} />
        </Animated.View>
        <Animated.View
          style={{
            top: 60,
            left: 20,
            position: 'absolute',
            opacity: likeOpacity,
            transform: [{rotate: '-30deg'}],
          }}>
          <TinderChoice type={'Like'} />
        </Animated.View>
      </>
    );
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: width - 20,
          height: Platform.OS == 'ios' ? height - 350 : height - 280,
          alignSelf: 'center',
          position: 'absolute',
          top: 100,
          borderRadius: 10,
        },
        isFirst && {
          transform: [...swipe.getTranslateTransform(), {rotate: rotate}],
        },
      ]}
      {...rest}>
      <Image
        source={{uri: item.image}}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
          resizeMode: 'stretch',
        }}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
          position: 'absolute',
        }}>
        <Text
          style={{
            position: 'absolute',
            bottom: 50,
            left: 20,
            color: '#fff',
            fontSize: 34,
          }}>
          {item.title}, {item.age}
        </Text>
        <Text
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            color: '#fff',
            fontSize: 20,
          }}>
          {item.distance}
        </Text>
      </LinearGradient>
      {isFirst && tinderSelection()}
    </Animated.View>
  );
};

export default Cards;
