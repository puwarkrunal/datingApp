import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {logo} from '../../assets/images';
import auth from '@react-native-firebase/auth';

const Splash = () => {
  const navigation = useNavigation();
  const animation = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: animation.value + 'deg',
        },
      ],
    };
  });

  function onAuthStateChanged(user) {
    if (user) {
      navigation.navigate('Tabs');
    } else navigation.navigate('Login');
  }

  useEffect(() => {
    const runAnimation = async () => {
      animation.value = await withTiming(360, {duration: 2000});
      await new Promise(resolve => setTimeout(resolve, 2000));
      auth().onAuthStateChanged(onAuthStateChanged);
    };

    runAnimation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(160,32,240,0.7)', '#7512B2']}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <Animated.View
          style={[
            {
              width: '60%',
              height: 280,
            },
            animatedStyle,
          ]}> */}
        <Animated.View
          style={[
            {
              height: 200,
              width: 200,
              borderRadius: 100,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            },
            animatedStyle,
          ]}>
          <Image
            source={logo}
            style={{
              height: 100,
              width: 100,
              resizeMode: 'contain',
            }}
          />
        </Animated.View>
        {/* </Animated.View> */}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'snow',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
