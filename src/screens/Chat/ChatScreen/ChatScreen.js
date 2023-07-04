import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ChatScreen = () => {
  const route = useRoute();
  const {data} = route.params;
  const navigation = useNavigation();
  const [messageText, setMessageText] = useState('');

  const chatData = [
    {
      id: 1,
      message: 'Can I follow you? Cause my mom told me to follow my dreams...',
      senderId: 345678900,
    },
    {
      id: 2,
      message: "I'm not a hoarder but I really Loream ipls",
      senderId: data.userId,
    },
  ];

  const onBackPress = () => {
    navigation.goBack();
  };

  const renderCard = ({item, index}) => {
    return (
      <View style={{margin: 13}} key={index}>
        <View
          style={{
            padding: 12,
            height: 'auto',
            maxWidth: '80%',
            minWidth: '20%',
            borderRadius: 20,
            backgroundColor:
              item.senderId == data.userId ? '#F1F1F1' : '#AA3FEC',
            alignSelf: item.senderId == data.userId ? 'flex-start' : 'flex-end',
          }}>
          <Text
            style={{
              color: item.senderId == data.userId ? 'black' : 'white',
            }}>
            {item.message}
          </Text>
        </View>
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
        data={chatData}
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
            placeholder="Type Something....."
            onChangeText={txt => setMessageText(txt)}
          />
        </View>
        <TouchableOpacity style={styles.sendBtn}>
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
    width: '100%',
    minHeight: 50,
    maxHeight: 100,
    height: 'auto',
    padding: 12,
    textAlignVertical: 'center',
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
});
