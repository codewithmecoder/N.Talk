import React from "react";
import {View, Text, Image, Pressable} from 'react-native'
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { DataStore } from "@aws-amplify/datastore";
import { ChatRoom, ChatRoomUser, User } from "../../src/models";
import Auth from "@aws-amplify/auth";
export default function UsersItem({user}) {
  const navigation = useNavigation();
  const onPress = async () => {
    //navigation.navigate("ChatRoom", { id: user.id } );
    //create a chat room
    const newChatRoom = await DataStore.save(new ChatRoom({
        newMessges: 0
      }));

    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    await DataStore.save(new ChatRoomUser({
      user: dbUser,
      chatroom: newChatRoom,

    }));

    await DataStore.save(new ChatRoomUser({
      user,
      chatroom: newChatRoom,
    }));

    navigation.navigate('ChatRoom', {id: newChatRoom.id});
    console.log(dbUser)
    // console.log(authUser)
  }
  return (
    <Pressable
      onPress={onPress}
      style={styles.container}>
        <Image source={{uri: user.imageUri}} style={styles.image}/>
        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>{user.name}</Text>
          </View>
        </View>
      </Pressable>
  );
}
