import React, { useEffect, useState } from 'react'
import {
  TextInput, 
  View, 
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text
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
import EmojiSelector from 'react-native-emoji-selector'
import * as ImagePicker from 'expo-image-picker'
import Storage from '@aws-amplify/storage'
import { v4 as uuidv4 } from 'uuid';

function MessageInput({chatRoom}) {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [image, setImage] = useState<string|null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(()=>{
    (async ()=>{
      if(Platform.OS !== 'web'){
        const libraryRes = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const photoRes = await ImagePicker.requestCameraPermissionsAsync();
        
        if(libraryRes.status !== 'granted' || photoRes.status !== "granted"){
          alert('Sorry, we need camera rool permission to make this work')
        }
      }
    })();
  }, [])

  const sendMessage = async () =>{
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(new Message({
      content: message,
      userID: user.attributes.sub,
      chatroomID: chatRoom.id,
    }))
    updateLastMessage(newMessage);
    resetField();  
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
    if(image){
      sendImage();
    }else if(message){
      sendMessage();
    }else{
      onPlusClicked();
    }
  }

// image picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log(result);
    if(!result.cancelled){
      setImage(result.uri);
    }
  }
  // Take Photo
  const takePhoto = async()=>{
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if(!result.cancelled){
      setImage(result.uri);
    }
  }
  const progressCallback = progress => {
    setProgress(progress.loaded/progress.total)
  }
  const sendImage = async () => {
    if(!image) return null;
    const blob = await getImageBlob();
    const {key} = await Storage.put(`${uuidv4()}.png`, blob, {
      progressCallback
    });
    
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(new Message({
      content: message,
      image: key,
      userID: user.attributes.sub,
      chatroomID: chatRoom.id,
    }))
    updateLastMessage(newMessage);
    resetField(); 
  }
  const resetField = ()=> {
    setMessage('');
    setIsEmojiPickerOpen(false);
    setImage(null);
    setProgress(0);
  }
  const getImageBlob = async()=> {
    if(!image) return null;

    const respone = await fetch(image);
    const blob = await respone.blob();
    return blob;
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.root, {
        height: isEmojiPickerOpen ? '50%' : 'auto'
      }]}
      keyboardVerticalOffset={90}
    >
      {image && (
        <View style={styles.sendImageContainer}>
          <Image source={{uri: image}} style={styles.image}/>

          <View style={{
            flex: 1, 
            justifyContent: 'flex-start', 
            alignSelf: 'flex-end',
          }}>
            <View style={
            {
              height: 5,
              backgroundColor: "#3777f0", 
              width: `${progress * 100}%`,
              borderRadius: 5,
            }
          }/>
          <Text>{(progress * 100).toFixed(0)}%</Text>
          </View>

          <Pressable onPress={()=> setImage(null)}>
            <AntDesign 
            name="close" 
            size={24} 
            color="black" 
            style={{margin: 5}}
            />
          </Pressable>
        </View>
        )}
      <View style={styles.row}>
        <View style={styles.inputContainer}>

          <Pressable onPress={()=> setIsEmojiPickerOpen(!isEmojiPickerOpen)}>
            <SimpleLineIcons 
              name="emotsmile" 
              size={24} color="#595959" 
              style={styles.icon}/>
          </Pressable>

          <TextInput 
            style={styles.input}
            value={message}
            placeholder="Aa"
            onChangeText={setMessage}
          />

          <Pressable onPress={pickImage}>
            <Feather 
              name='image' 
              size={24} 
              color="#595959" 
              style={styles.icon}/>
          </Pressable>

          <Pressable onPress={takePhoto}>
            <Feather 
              name='camera' 
              size={24} 
              color="#595959" 
              style={styles.icon}/>
          </Pressable>
          

          <MaterialCommunityIcons 
            name="microphone-outline" 
            size={24} 
            color="#595959" 
            style={styles.icon}/>
        </View>

        <Pressable 
          onPress={pressSend}
          style={styles.buttonContainer}>
          {message || image ? (<Ionicons name="send" size={24} color="white"/> ):(<AntDesign name="plus" size={24} color="white" style={styles.icon} />) }
        </Pressable>
      </View>
      {
        isEmojiPickerOpen && (
          <EmojiSelector 
            onEmojiSelected={emoji=> setMessage(currentMessage => currentMessage + emoji)} 
            columns={8}
          />
        )
      }
      
    </KeyboardAvoidingView>
  )
}

export default MessageInput
