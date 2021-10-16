import React from "react";
import { Text, View } from "react-native";
import styles from "./style";


const myId = 'u1';

export default function Message({message}){
  const isMe = message.user.id === myId;
  return (
    <View style={[
      styles.container,
      isMe ? styles.rightContainer : styles.leftContainer]}>
      <Text style={{
        color: isMe ? 'black' : 'white',
        fontSize: 17,
        letterSpacing: 0.2  
      }}>Hello Wassup </Text>
    </View>
  );
}