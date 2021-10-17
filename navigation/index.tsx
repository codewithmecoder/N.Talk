import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image, Platform, Pressable, Text, useWindowDimensions, View } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen'
import ChatRoomScreen from '../screens/ChatRoomScreen';
import { RootStackParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { Entypo, Feather, Foundation, Ionicons } from '@expo/vector-icons';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerTitle: HomeHeader }} />
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen} 
        options={{
          headerTitle: ChatRoomHeader,
          headerBackTitleVisible: false,
        }}  
      />
      <Stack.Screen 
        name="UsersScreen" 
        component={UsersScreen} 
        options={{
          title: "Users",
          // headerBackTitleVisible: false,
        }}  
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}
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

const ChatRoomHeader = (props) => {
  const {width} = useWindowDimensions();
  return(
    <View 
      style={{
        flexDirection: 'row', 
        justifyContent: "space-between",
        alignItems: 'center',
        width: width - 25,
        paddingRight: 10,
      }}>
      <Image 
        source={{uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg"}}
        style={{
          width: 30, 
          height: 30, 
          borderRadius: 30,
        }}
      />
      <Text 
        style={{
          flex: 1,
          // marginLeft: Platform.OS === 'ios' ? 10 : 10, 
          marginLeft: 10,
          fontWeight: 'bold',
        }}>{props.children}</Text>
      <View style={{flexDirection: 'row'}}>
        <Ionicons 
          name="ios-videocam" 
          size={24} 
          color="black" 
          style={{marginHorizontal: 10}}
        />
        <Foundation 
          name="telephone" 
          size={24} 
          color="black" 
          style={{marginHorizontal: 10}}
        />
        <Entypo 
          name="dots-three-vertical" 
          size={24} 
          color="black" 
          style={{marginRight: 10, paddingRight: Platform.OS === 'ios' ? 10 : 30}}  
        />
      </View>
    </View>
  )
}
