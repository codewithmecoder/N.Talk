import React, { useState } from 'react'
import {
  TextInput, 
  View, 
  Pressable,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import {
  Ionicons,
  SimpleLineIcons,
  Feather,
  MaterialCommunityIcons, 
  AntDesign 
} from '@expo/vector-icons'
import styles from './style'
import {DataStore} from "@aws-amplify/datastore"
import { Message, ChatRoom } from '../../src/models'
import Auth from '@aws-amplify/auth'

function MessageInput({chatRoom}) {
  const [message, setMessage] = useState('');
  
  const sendMessage = async () =>{
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(new Message({
      content: message,
      userID: user.attributes.sub,
      chatroomID: chatRoom.id,
    }))
    updateLastMessage(newMessage);
    setMessage('');
  }

  const updateLastMessage = async (newMessage) => {
    DataStore.save(ChatRoom.copyOf(
      chatRoom,
      updatedChatRoom => {
        updatedChatRoom.LastMessage = newMessage;
      }))
  }

  const onPlusClicked = ()=> {
    console.log("On Plus Clicked")
  }
  const pressSend = () =>{
    if(message){
      sendMessage();
    }else{
      onPlusClicked();
    }
  }
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.root}
      keyboardVerticalOffset={90}
    >
      <View style={styles.inputContainer}>

        <SimpleLineIcons name="emotsmile" size={24} color="#595959" style={styles.icon}/>

        <TextInput 
          style={styles.input}
          value={message}
          placeholder="Aa"
          onChangeText={setMessage}
        />

        <Feather name='camera' size={24} color="#595959" style={styles.icon}/>

        <MaterialCommunityIcons name="microphone-outline" size={24} color="#595959" style={styles.icon}/>
      </View>

      <Pressable 
        onPress={pressSend}
        style={styles.buttonContainer}>
        {message ? (<Ionicons name="send" size={24} color="white"/> ):(<AntDesign name="plus" size={24} color="white" style={styles.icon} />) }
      </Pressable>
    </KeyboardAvoidingView>
  )
}

export default MessageInput
