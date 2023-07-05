import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const CLoader = ({loading}) => {
    console.log(loading,"loading");
  return (
    <Modal visible={loading} transparent>
      <View style={styles.fullContainer}>
        <View style={styles.main}>
          <ActivityIndicator
            animating={loading}
            size={'large'}
            color={'blue'}
          />
          <Text style={styles.loadingText}>Loading.....</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CLoader;

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    height: '8%',
    backgroundColor: 'white',
    width: '70%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
});
