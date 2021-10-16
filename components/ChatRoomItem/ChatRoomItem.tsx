import React from "react";
import {View, Text, Image, Pressable} from 'react-native'
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
export default function ChatRoomItem({chatRoom}){
  const user = chatRoom.users[1]
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id } );
  }
  return (
    <Pressable
    onPress={onPress}
    style={styles.container}>
        {chatRoom.newMessages && <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>}
        <Image source={{uri: user.imageUri}} style={styles.image}/>
        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text>
          </View>
          <Text numberOfLines={1} style={styles.text}>{chatRoom.lastMessage.content}</Text>
        </View>
      </Pressable>
  );
}
