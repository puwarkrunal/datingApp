import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CBack from '../../Components/CBack';
import {c1, c2, c3, c4} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const Chat = () => {
  const navigation = useNavigation();
  const rdx = useSelector(state => state.user.data);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      firestore()
        .collection('FriendList')
        .doc(rdx.uid)
        .collection('Friends')
        .get()
        .then(querySnapshot => {
          const friendsList = [];
          querySnapshot.forEach(doc => {
            const friendData = doc.data();
            friendsList.push(friendData);
          });
          // Use the friendsList array containing all the friend data
          // console.log(friendsList);
          setUserList(friendsList);
          // Perform further actions with the retrieved data
        })
        .catch(error => {
          console.error('Error getting friend list:', error);
        });
    };
    getList();
  }, []);

  const dummyData = [
    {
      id: 1,
      name: 'Siliva',
      lastMessage: "I'm not a hoarder but I really...",
      time: '11:30',
      image: c1,
      userId: 1234567,
    },
    {
      id: 2,
      name: 'Lucy',
      lastMessage: 'Is your body from Mcdonals',
      time: '13:51',
      image: c2,
      userId: 1324354,
    },
    {
      id: 3,
      name: 'Lucy',
      lastMessage: 'Is your body from Mcdonals',
      time: '13:51',
      image: c3,
      userId: 9876543,
    },
    {
      id: 4,
      name: 'Lucy',
      lastMessage: 'Is your body from Mcdonals',
      time: '13:51',
      image: c4,
      userId: 6745231,
    },
  ];

  const renderCard = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() => navigation.navigate('ChatScreen', {data: item})}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: item.imageURL}}
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              resizeMode: 'stretch',
            }}
          />

          <View style={{marginLeft: 12}}>
            <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold'}}>
              {item.name}
            </Text>
            <Text>{item.lastMessage}</Text>
          </View>
        </View>

        <Text>{item.time}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CBack title={'Chat'} />

      <FlatList
        data={userList}
        renderItem={renderCard}
        keyExtractor={(_, index) => index}
      />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    height: 80,
    width: '90%',
    marginVertical: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
