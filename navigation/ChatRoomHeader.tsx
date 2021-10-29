import { Entypo, Foundation, Ionicons } from "@expo/vector-icons";
import { Auth, DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { View, Image, Text, Platform, useWindowDimensions } from "react-native";
import { ChatRoomUser, User } from "../src/models";


const ChatRoomHeader = ({id}) => {
  const {width} = useWindowDimensions();
  const [user, setUser] = useState<User | null>(null);
  useEffect(()=> {

    if(!id) return;

    const fetchUsers = async()=>{
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.chatroom.id === id)
        .map(chatRoomUser => chatRoomUser.user);
        const authUser = await Auth.currentAuthenticatedUser();
        // setUsers(fetchedUsers);
        setUser(fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null)
    }
    fetchUsers();
  }, [])
  return(
    <View 
      style={{
        flexDirection: 'row', 
        justifyContent: "space-between",
        alignItems: 'center',
        width: width - 25,
        paddingRight: 10,
      }}>
      <Image 
        source={{uri: user?.imageUri}}
        style={{
          width: 30, 
          height: 30, 
          borderRadius: 30,
        }}
      />
      <Text 
        style={{
          flex: 1,
          // marginLeft: Platform.OS === 'ios' ? 10 : 10, 
          marginLeft: 10,
          fontWeight: 'bold',
        }}>{user?.name}</Text>

      <View style={{flexDirection: 'row'}}>
        <Ionicons 
          name="ios-videocam" 
          size={24} 
          color="black" 
          style={{marginHorizontal: 10}}
        />
        <Foundation 
          name="telephone" 
          size={24} 
          color="black" 
          style={{marginHorizontal: 10}}
        />
        <Entypo 
          name="dots-three-vertical" 
          size={24} 
          color="black" 
          style={{marginRight: 10, paddingRight: Platform.OS === 'ios' ? 10 : 30}}  
        />
      </View>
    </View>
  )
}

export default ChatRoomHeader;