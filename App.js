import React, { useState } from "react";
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Entrar from "./src/screens/Entrar";
import Registrar from "./src/screens/Registrar";
import Feed from "./src/screens/Feed";
import Conta from "./src/screens/Conta";
import Busca from "./src/screens/Busca"
import{colors, parameters} from "./src/global/styles";
import { NavigationContainer, StackRouter } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

export default function App(){
  
  return(
      
      <NavigationContainer >
      <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.statusBar}/>
      <Stack.Navigator>
      <Stack.Screen name='Busca' component={Busca} options={{headerStyle: {
            backgroundColor: colors.purple}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}, headerTintColor: 'white'}}/>
      <Stack.Screen name='Entrar' component={Entrar} options={{headerStyle: {
            backgroundColor: colors.purple}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}}}/>
        <Stack.Screen name='Conta' component={Conta} options={{headerStyle: {
            backgroundColor: colors.purple}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}}} />
        <Stack.Screen name='Feed' component={Feed} options={{headerStyle: {
            backgroundColor: colors.purple, }, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}, headerBackButtonMenuEnabled: 'false'}}/>
          <Stack.Screen name='Registrar' component={Registrar} options={{headerStyle: {
            backgroundColor: colors.purple}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}, headerTintColor: 'white'}}/>
          
        </Stack.Navigator>
        </View>
      </NavigationContainer>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})