import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { Message as MessageModel, ChatRoom } from "../src/models";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ChatRoomScreen(){
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(()=> {
    fetchChatRoom();
  }, [])

  useEffect(() => {
    fetchMessages();
  }, [chatRoom])

  useEffect(()=>{
    const subscription = DataStore.observe(MessageModel)
      .subscribe(msg=> {
        // console.log("model:", msg.model);
        // console.log("opType:", msg.opType)
        // console.log("element:", msg.element)

        if(msg.model === MessageModel && msg.opType === "INSERT"){
          setMessages(existingMessage => [msg.element,...existingMessage])
        }
    })
    return ()=> subscription.unsubscribe();
  }, [])
  const fetchChatRoom = async ()=> {
      if(!route.params?.id){
        console.warn("No chatroom provided");
        return;
      }
      const chatRoom = await DataStore.query(ChatRoom, route.params.id);
        // .then(setChatRoom);
        if(!chatRoom){
          console.log("Could not find chat room with this id")
        }else{
          setChatRoom(chatRoom);
        }
      // const fetchedMessages = await DataStore.query(MessageModel, )
    }

    const fetchMessages = async ()=> {
       if(!chatRoom){
          return;
        }
        const fetchedMessages = (await DataStore.query(MessageModel, message => message.chatroomID("eq", chatRoom?.id),
        {
          sort: message => message.createdAt(SortDirection.DESCENDING)
        }));
      // .sort((a, b) => a.createdAt + b.createdAt);
      setMessages(fetchedMessages);
    }
  // navigation.setOptions({title: "Nith.NJR"})
  if(!chatRoom){
    return <ActivityIndicator />
  }
  return (
    <SafeAreaView style={styles.page}>
      <FlatList 
        data={messages}
        renderItem={({item})=> <Message message={item}/>}
        inverted
      />
      <MessageInput chatRoom={chatRoom}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page:{
    backgroundColor: 'white',
    flex: 1,
    
  }
})