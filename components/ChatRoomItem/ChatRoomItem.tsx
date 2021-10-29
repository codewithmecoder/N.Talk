import React, {useState, useEffect} from "react";
import {View, Text, Image, Pressable, ActivityIndicator} from 'react-native'
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { DataStore } from "@aws-amplify/datastore";
import { ChatRoomUser, Message, User } from "../../src/models";
import Auth from "@aws-amplify/auth";
export default function ChatRoomItem({chatRoom}){
  // const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User|null>(null);
  const [lastMessage, setLastMessage] = useState<Message|undefined>();
  
  // const user = chatRoom.users[1]
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id } );
  }

  useEffect(()=> {
    const fetchUsers = async()=>{
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.chatroom.id === chatRoom.id)
        .map(chatRoomUser => chatRoomUser.user);
        const authUser = await Auth.currentAuthenticatedUser();
        // setUsers(fetchedUsers);
        setUser(fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null)
    }
    fetchUsers();
  }, [])

  useEffect(() => {
    if(!chatRoom.chatRoomLastMessageId) return;
    DataStore.query(Message, chatRoom.chatRoomLastMessageId)
      .then(setLastMessage)
  }, [])

  if(!user){
    return <ActivityIndicator />
  }
  return (
    <Pressable
    onPress={onPress}
    style={styles.container}>
        {chatRoom.newMessges > 0 && <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessges}</Text>
        </View>}
        <Image source={{uri: user.imageUri}} style={styles.image}/>
        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.text}>{lastMessage?.createdAt}</Text>
          </View>
          <Text numberOfLines={1} style={styles.text}>{lastMessage?.content}</Text>
        </View>
      </Pressable>
  );
}
