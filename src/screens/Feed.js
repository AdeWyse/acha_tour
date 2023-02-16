import React from "react";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView} from 'react-native';
import BottomNavigation from "../global/BottomNavigation";
import{colors, parameters} from "../global/styles";
import { db } from "../config/firebase";



export default function Feed({navigation, route}){
    return (
        <View>
            <ScrollView style={styles.container}>
                    <Text style={styles.welcomeText}>Feed</Text>
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

    welcomeText: {
        color: colors.purple,
        fontSize: 35,
        fontWeight: "bold",
        textAlign: 'center',
        marginVertical: 20
    },

    inputs: {
        borderColor: colors.purple,
        borderRadius: 5,
        borderWidth: 2,
        marginHorizontal: '10%',
        marginVertical: 4,
        height: 45
    },

    entrarButton: {
        backgroundColor: colors.purple,
        color: colors.white,
        borderRadius: 5,
        marginHorizontal: '10%',
        marginVertical: 4,
        marginBottom: 6,
        justifyContent: "center",
        alignItems: "center",
        height: 45
    },

    prompt: {
        marginHorizontal: "25%",
        flexDirection: 'row'
    },

    promptCadastrar: {
        textAlign: "center",
        fontSize: 12,
        margin: 2,
        color: colors.black 
    },

    promptCadastrarLink: {
        textAlign: "center",
        fontSize: 12,
        margin: 2,
        color: colors.purple
    }
})
