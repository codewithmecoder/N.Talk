import React,{useState, useEffect} from "react";
import { 
  ActivityIndicator, 
  Text, 
  useWindowDimensions, 
  View } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import {S3Image} from "aws-amplify-react-native";
import { User } from "../../src/models";

import styles from "./style";
import {Auth} from "aws-amplify";


export default function Message({message}){
  
  const [user, setUser] = useState<User | undefined>();
  const [isMe, setIsMe] = useState<boolean>(false);
  
  const {width} = useWindowDimensions();

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
  }, [user]);

  if(!user){
    return <ActivityIndicator />
  }

  return (
    <View style={isMe ? styles.rightContainer : styles.leftContainer}>
      {
        message.image && (
          <View style={[styles.imgContainer, {marginBottom: message.content ? 0 : 10}]}>
            <S3Image 
              imgKey={message.image} 
              style={{
                width: width * 0.8, 
                aspectRatio: 4/3,
              }}
              resizeMode="contain"
            />
          </View>
        )}
        {message.content !== "" && (
          <View style={[
            isMe ? styles.rightContainer : styles.leftContainer,
            isMe ? styles.rightText : styles.leftText,
            styles.textContainer
          ]}>
            <Text style={{
              color: isMe ? 'black' : 'white',
              fontSize: 17,
              letterSpacing: 0.2  
            }}>{message.content}</Text>
          </View>
        )}
    </View>
  );
}