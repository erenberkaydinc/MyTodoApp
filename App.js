import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Tasks from "./screens/Tasks";
import AddScreen from "./screens/AddScreen";
import db from './firebase';
import { LogBox } from 'react-native';
import UpdateScreen from "./screens/UpdateScreen";
import Details from './screens/Details';

  LogBox.ignoreAllLogs();
  export default function App() {
  const Stack = createNativeStackNavigator();
         

  return (
    <NavigationContainer>

    <Stack.Navigator
    initialRouteName='Tasks'
    screenOptions={{
      headerShown:false
      
    }}
     >
    <Stack.Screen
    
    name="Tasks" component={Tasks} />
    <Stack.Screen name="Update" component={UpdateScreen} />

    <Stack.Screen 
     name="Add" component={AddScreen} />

<Stack.Screen 
     name="Details" component={Details} />
            
    </Stack.Navigator>
  </NavigationContainer>
         
        
  );
}