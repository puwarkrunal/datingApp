import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';

const ChatScreen = () => {
  const route = useRoute();
  const {data} = route.params;
  const navigation = useNavigation();
  const [msgArray, setMsgArray] = useState([]);
  const rdx = useSelector(state => state.user.data);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const msgRef = firestore()
      .collection('chatRoom')
      .doc(rdx.uid)
      .collection(data.uid)
      .orderBy('createdAt', 'desc');

    msgRef.onSnapshot(snapshot => {
      let allUser = [];
      snapshot.forEach(doc => {
        allUser.push(doc.data());
      });

      setMsgArray(allUser);
    });
  }, []);

  const onSend = () => {
    const uniqId = Math.random().toString().substr(2, 10);
    const createdAt = new Date();
    const msgArray = {
      messageId: uniqId,
      senderId: rdx.uid,
      receverId: data.uid,
      message: messageText,
      senderImg: rdx.imageURL,
      senderName: rdx.name,
      createdAt: createdAt,
    };

    firestore()
      .collection('chatRoom')
      .doc(rdx.uid)
      .collection(data.uid)
      .add(msgArray);

    firestore()
      .collection('chatRoom')
      .doc(data.uid)
      .collection(rdx.uid)
      .add(msgArray);
    setMessageText('');
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const renderCard = ({item, index}) => {
    return (
      <View style={{margin: 13}} key={index}>
        <View
          style={[
            styles.msgBox,
            {
              backgroundColor:
                item.senderId == data.uid ? '#F1F1F1' : '#AA3FEC',
              alignSelf: item.senderId == data.uid ? 'flex-start' : 'flex-end',
            },
          ]}>
          <Text
            style={{
              color: item.senderId == data.uid ? 'black' : 'white',
            }}>
            {item.message}
          </Text>
        </View>
        <Text
          style={{
            color: 'black',
            margin: 6,
            alignSelf: item.senderId == data.uid ? 'flex-start' : 'flex-end',
          }}>
          {moment(item.createdAt).format('LT')}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Image source={data.image} style={styles.profileImg} />
          <Text style={styles.name}>{data.name}</Text>
        </View>
      </View>

      <FlatList
        data={msgArray}
        inverted={true}
        renderItem={renderCard}
        style={{height: '80%'}}
        keyExtractor={(_, index) => index}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={messageText}
            style={styles.input}
            multiline
            placeholderTextColor={'black'}
            placeholder="Type Something....."
            onChangeText={txt => setMessageText(txt)}
          />
        </View>
        <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
          <AntDesign name={'right'} size={24} color={'black'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 60,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileContainer: {
    marginLeft: 33,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    height: 35,
    width: 35,
  },
  name: {
    marginLeft: 7,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    alignSelf: 'center',
    minHeight: 50,
    maxHeight: 100,
    borderWidth: 1,
    textAlignVertical: 'center',
    color: 'black',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-around',
  },
  inputContainer: {
    width: '75%',
    minHeight: 50,
    maxHeight: 100,
    height: 'auto',
    borderRadius: 30,
    backgroundColor: '#F1F1F1',
  },
  sendBtn: {
    height: 52,
    width: '20%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
  },
  msgBox: {
    padding: 12,
    height: 'auto',
    maxWidth: '80%',
    minWidth: '20%',
    borderRadius: 20,
  },
});
