import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, View, Pressable, Text } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
// import chatRoomsData from '../assets/dummy-data/ChatRooms'
import {Auth, DataStore} from 'aws-amplify'
import { ChatRoom, ChatRoomUser } from '../src/models';

export default function HomeScreen() {

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  useEffect(()=>{
    const fetchChatRooms = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.user.id === userData.attributes.sub)
        .map(chatRoomUser => chatRoomUser.chatroom);
      console.log(chatRooms)
      setChatRooms(chatRooms);
    }
    fetchChatRooms();
  }, []);
  
  const logOut = ()=>{
    Auth.signOut();
  }

  return (
    <View style={styles.page}>
      <FlatList 
        data={chatRooms}
        renderItem={({item})=><ChatRoomItem chatRoom={item}/>}
        showsHorizontalScrollIndicator={false}
      />
      
      {/* <Pressable 
        onPress={logOut}
        style={styles.button}>
        <Text>LogOut</Text>
      </Pressable> */}
    </View> 
    
  );
}

const styles = StyleSheet.create({
  page:{
    backgroundColor: 'white',
    flex: 1
  },
  button:{
    backgroundColor: '#dff9fb',
    height: 40,
    // width: 100,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
