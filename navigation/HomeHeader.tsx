import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, View, Image, Text, useWindowDimensions } from "react-native";

const HomeHeader = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
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
        source={{uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg"}}
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