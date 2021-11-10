import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import React, {useEffect, useState} from "react";
import { Pressable, View, Image, Text, useWindowDimensions } from "react-native";
import { User } from "../src/models";

const HomeHeader = () => {
  const {width} = useWindowDimensions();
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigation();
  useEffect(()=> {
    const fetchUsers = async()=>{
        const authUser = await Auth.currentAuthenticatedUser();
        const user = await DataStore.query(User, authUser.attributes.sub) || null;
        setUser(user)
    }
    fetchUsers();
  }, [])
  const onPress = () => {
    navigation.navigate("UsersScreen");
  }
  // const onPress = () => {
  //   //UsersScreen
  // }
  return(
    <View 
      style={{
        flexDirection: 'row', 
        justifyContent: "space-between",
        alignItems: 'center',
        width,
        paddingRight: 20
      }}>
      <Image 
        source={{uri: user?.imageUri}}
        style={{
          width: 30, 
          height: 30, 
          borderRadius: 30,
          marginLeft: 10
        }}
      />
      <Text 
        style={{
          marginLeft: 40, 
          fontWeight: 'bold',
          fontSize: 20
        }}>N.Talk 🗣️</Text>
      <View style={{flexDirection: 'row'}}>
        <Feather 
          name='camera' 
          size={24} 
          color="black" 
          style={{marginHorizontal: 10}}
        />
        <Pressable onPress={onPress}>
          <Feather 
            name='edit-2' 
            size={24} 
            color="black" 
            style={{marginHorizontal: 10}}  
          />
        </Pressable>
      </View>
    </View>
  )
}

export default HomeHeader;