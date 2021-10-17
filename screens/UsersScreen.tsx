import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import users from '../assets/dummy-data/Users'
import UsersItem from '../components/UsersItem';
export default function UsersScreen() {

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
