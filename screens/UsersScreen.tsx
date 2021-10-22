import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';
// import users from '../assets/dummy-data/Users'
import UsersItem from '../components/UsersItem';
export default function UsersScreen() {

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    // query users
    DataStore.query(User).then(setUsers);
  }, [])
  // useEffect(() => {
  //   // query users
  //   const fetchUsers = async()=> {
  //     const fetchedUsers = await DataStore.query(User);
  //     setUsers(fetchedUsers);
  //   }
  //   fetchUsers();
  // }, [])

  return (
    <View style={styles.page}>
      <FlatList 
        data={users}
        renderItem={({item})=><UsersItem user={item}/>}
        showsHorizontalScrollIndicator={false}
      />
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
