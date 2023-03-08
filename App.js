import React, { useState, createContext} from "react";
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Entrar from "./src/screens/Entrar";
import Registrar from "./src/screens/Registrar";
import Feed from "./src/screens/Feed";
import Conta from "./src/screens/Conta";
import Busca from "./src/screens/Busca";
import Negocio from "./src/screens/Negocio";
import MeusNegocios from "./src/screens/MeusNegocios";
import MinhasReviews from "./src/screens/MinhasReviews";
import AdicionarNegocio from "./src/screens/AdicionarNegocio";
import AdicionarReview from "./src/screens/AdicionarReview";
import EditarReview from "./src/screens/EditarReview";
import{colors, parameters} from "./src/global/styles";
import { NavigationContainer, StackRouter } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import auth from '@react-native-firebase/auth';
import EditarNegocio from "./src/screens/EditarNegocio";
import Help from "./src/screens/Help";
import AdicionarServicos from "./src/screens/AdicionarServicos";
import Wishlist from "./src/screens/Wishlist";


const Stack = createNativeStackNavigator();
export const UserContext = createContext('');

export default function App(){
    const [user, setUser] = useState('');

    auth().onAuthStateChanged((user) => {
      if(user){
       setUser(user.uid);
      }
    })
  return(
      <UserContext.Provider value={user}>
          <NavigationContainer >
          <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor={colors.statusBar}/>
          <Stack.Navigator>
          <Stack.Screen name='Entrar' component={Entrar} options={{headerStyle: {
                backgroundColor: colors.purple}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}}}/>
          <Stack.Screen name='Busca' component={Busca} options={{headerStyle: {
                backgroundColor: colors.purple}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}, headerTintColor: 'white'}}/>
          <Stack.Screen name='Negocio' component={Negocio} options={{headerStyle: {
                backgroundColor: colors.purple}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}, headerTintColor: 'white'}}/>
            <Stack.Screen name='Conta' component={Conta} options={{headerStyle: {
                backgroundColor: colors.purple}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}}} />
            <Stack.Screen name='Nova Review' component={AdicionarReview} options={{headerStyle: {
                backgroundColor: colors.yellow}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: colors.purple}, headerTintColor: 'white'}}/>
            <Stack.Screen name='Ajuda' component={Help} options={{headerStyle: {
                backgroundColor: colors.purple}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}, headerTintColor: 'white'}}/>
              <Stack.Screen name='Registrar' component={Registrar} options={{headerStyle: {
                backgroundColor: colors.purple}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}, headerTintColor: 'white'}}/>
              <Stack.Screen name='Minhas Reviews' component={MinhasReviews} options={{headerStyle: {
                backgroundColor: colors.yellow}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: colors.purple}, headerTintColor: 'white'}}/>
              <Stack.Screen name='Meus Negócios' component={MeusNegocios} options={{headerStyle: {
                backgroundColor: colors.orange}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}, headerTintColor: 'white'}}/>
            <Stack.Screen name='Novo Negócio' component={AdicionarNegocio} options={{headerStyle: {
                backgroundColor: colors.green}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}}} /> 
            <Stack.Screen name='Editar Negócio' component={EditarNegocio} options={{headerStyle: {
            backgroundColor: colors.green}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: 'white'}}} /> 
            <Stack.Screen name='Editar Review' component={EditarReview} options={{headerStyle: {
            backgroundColor: colors.yellow}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: colors.purple}}} />
            <Stack.Screen name='Adicionar Serviços' component={AdicionarServicos} options={{headerStyle: {
            backgroundColor: colors.lightBlue}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: colors.black}}} /> 
            <Stack.Screen name='Wishlist' component={Wishlist} options={{headerStyle: {
            backgroundColor: colors.purple}, headerShadowVisible: false, headerTitleStyle: { fontWeight: 'bold', color: colors.white}}} /> 
            </Stack.Navigator>
            </View>
          </NavigationContainer>
      </UserContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})