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

function MessageInput() {
  const [message, setMessage] = useState('');
  const sendMessage = () =>{
    console.log("sending Message: ", message)
    setMessage('');
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
