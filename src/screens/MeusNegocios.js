import React from "react";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView} from 'react-native';
import BottomNavigation from "../global/BottomNavigation";
import{colors, parameters} from "../global/styles";
import { db } from "../config/firebase";
import AdicionarNegocio from "./AdicionarNegocio";



export default function MeusNegocios({navigation, route}){

    return (
        <View>
            <ScrollView style={styles.container}>
                    <Text style={styles.welcomeText}>Feed</Text>
                    <Pressable style={styles.novoNegocio} onPress={()=>{
                        navigation.navigate('Novo Negócio');
                    }}><Text>Novo Negócio</Text></Pressable>
            </ScrollView>
            <BottomNavigation navigator={navigation}></BottomNavigation>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
        justifySelf: 'center',
        backgroundColor: colors.white,
        height: '92.5%',
        paddingTop: '50%',
        paddingHorizontal: '5%'
    },

    novoNegocio: {
        backgroundColor: colors.green,
        borderRadius: 10,
        height: 30,
        margin: 10
    }

})
