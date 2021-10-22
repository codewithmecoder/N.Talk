import * as React from 'react';
import { FlatList, StyleSheet, View, Pressable, Text } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import chatRoomsData from '../assets/dummy-data/ChatRooms'
import {Auth} from 'aws-amplify'
export default function HomeScreen() {

  const logOut = ()=>{
    Auth.signOut();
  }

  return (
    <View style={styles.page}>
      <FlatList 
        data={chatRoomsData}
        renderItem={({item})=><ChatRoomItem chatRoom={item}/>}
        showsHorizontalScrollIndicator={false}
      />
      
      {/* <Pressable 
        onPress={logOut}
        style={styles.button}>
        <Text>LogOut</Text>
      </Pressable> */}
    </View> 
    
  );
}

const styles = StyleSheet.create({
  page:{
    backgroundColor: 'white',
    flex: 1
  },
  button:{
    backgroundColor: '#dff9fb',
    height: 40,
    // width: 100,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
