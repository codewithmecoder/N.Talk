import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import chatRoomsData from '../assets/dummy-data/ChatRooms'

export default function TabOneScreen() {
  return (
    <View>
      {/* {chatRoomsData.map((user, index)=>
        <ChatRoomItem />
      )} */}
      <FlatList 
        data={chatRoomsData}
        renderItem={({item})=><ChatRoomItem chatRoom={item}/>}
        showsHorizontalScrollIndicator={false}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  page:{
    backgroundColor: 'white',
    flex: 1
  }
});
