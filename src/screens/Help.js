import React from "react";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView, Linking} from 'react-native';
import BottomNavigation from "../global/BottomNavigation";
import{colors, parameters} from "../global/styles";



export default function Help({navigation, route}){
    return (
        <View>
            <ScrollView style={styles.container}>
                    <Text style={styles.instructionText}>Olá! Estamos trabalhando para criar um página de ajuda que realmente te ajude.</Text>
                    <Text style={styles.instructionText}>Enquanto isso quando encontrar algum problema ou tiver alguma sugestão mande um email para <Pressable style={styles.emailButton} onPress={() => {
                        Linking.openURL('mailto:nynedevelopment@gmail.com')
                    }}><Text style={styles.emailText}>nynedevelopment@gmail.com</Text></Pressable></Text>
                    <Text style={styles.instructionText}>Assim que possível entraremos em contato para te ajudar.</Text>
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

    instructionText: {
        color: colors.black,
        fontSize: 15,
        fontWeight: "bold",
        textAlign: 'center',
        margin: 5
    },

    emailButton: {
        
    },

    emailText: {
        color: colors.purple,
        fontWeight: "bold",
    }



})
