import React,{useState, useEffect} from "react";
import { ActivityIndicator, ActivityIndicatorBase, Text, View } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../../src/models";

import styles from "./style";
import {Auth} from "aws-amplify";


const myId = 'u1';

export default function Message({message}){
  
  const [user, setUser] = useState<User | undefined>();
  const [isMe, setIsMe] = useState<boolean>(false);
  
  useEffect(()=>{
    DataStore.query(User, message.userID).then(setUser);
  }, [])
  useEffect(()=> {
    const checkIsMe = async () =>{
      const authUser = await Auth.currentAuthenticatedUser();
      if(!user) return;
      setIsMe(user.id === authUser.attributes.sub);
    }
    checkIsMe();
  }, [user])
  // const isMe = message.userID === myId;
  if(!user){
    return <ActivityIndicator />
  }
  return (
    <View style={[
      styles.container,
      isMe ? styles.rightContainer : styles.leftContainer]}>
      <Text style={{
        color: isMe ? 'black' : 'white',
        fontSize: 17,
        letterSpacing: 0.2  
      }}>{message.content}</Text>
    </View>
  );
}