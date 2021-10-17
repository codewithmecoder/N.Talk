import React from "react";
import {View, Text, Image, Pressable} from 'react-native'
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
export default function UsersItem({user}){
  const navigation = useNavigation();
  const onPress = () => {
    //navigation.navigate("ChatRoom", { id: user.id } );
    //create a chat room
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
