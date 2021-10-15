import React from "react";
import {View, Text, Image} from 'react-native'
import styles from "./style";
export default function ChatRoomItem({chatRoom}){
  const {users: user} = chatRoom
  return (
    <View style={styles.container}>
        {chatRoom.newMessages && <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>}
        <Image source={{uri: user[1].imageUri}} style={styles.image}/>
        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>{user[1].name}</Text>
            <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text>
          </View>
          <Text numberOfLines={1} style={styles.text}>{chatRoom.lastMessage.content}</Text>
        </View>
      </View>
  );
}
