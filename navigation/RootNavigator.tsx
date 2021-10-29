import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import HomeScreen from "../screens/HomeScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import UsersScreen from "../screens/UsersScreen";
import { RootStackParamList } from "../types";
import ChatRoomHeader from "./ChatRoomHeader";
import HomeHeader from "./HomeHeader";


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
        options={({route}) => ({
          headerTitle: () => <ChatRoomHeader id={route.params?.id } />,
          headerBackTitleVisible: false,
        })}  
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

export default RootNavigator;