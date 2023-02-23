import React from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import{colors, parameters} from "../global/styles";
import { Icon } from "@rneui/themed";
import auth from '@react-native-firebase/auth';





export default function BottomNavigation({navigator}){

  const handleLogout= () => {
    auth().signOut().then(()=>{
        navigator.navigate('Entrar')
    }).catch((error)=>{
        const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
    })
  }

  auth().onAuthStateChanged((user) => {
    if(!user){
        navigation.navigate('Entrar');
    }
  })

    return (
        <View style={styles.navigationBar}>
            <View style={{marginLeft:20}}>
                <Icon type="material-community" name="home-circle" color={colors.white} size={28}
                onPress={()=>{navigator.navigate('Feed')}} /><Text style={styles.navigationText}>Feed</Text>
            </View>
            <View style={{marginLeft:20}}>
                <Icon type="material-community" name="map-search" color={colors.white} size={28}
                onPress={()=>{navigator.navigate('Busca')}} /><Text style={styles.navigationText}>Busca</Text>
            </View>
            <View style={{marginLeft:20}}>
                <Icon type="material-community" name="account-circle-outline" color={colors.white} size={28}
                onPress={()=>{navigator.navigate('Conta')}} /><Text style={styles.navigationText}>Conta</Text>
            </View>
            <View style={{marginLeft:20}}>
                <Icon type="material-community" name="help-circle-outline" color={colors.white} size={28}
                onPress={()=>{}} /><Text style={styles.navigationText}>Ajuda</Text>
            </View>
            <View style={{marginLeft:20}}>
                <Icon type="material-community" name="door" color={colors.white} size={28}
                onPress={handleLogout} /><Text style={styles.navigationText}>Sair</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navigationBar: {
        flexDirection: 'row',
        backgroundColor: colors.purple,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 5,
        marginHorizontal: 0,
        width: '100%'
    },

    navigationText: {
        color: colors.white,
        fontSize: 10,
        fontWeight: "bold",
        
    }
})
