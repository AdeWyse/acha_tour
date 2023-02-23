import React, { useEffect, useState, useContext  } from "react";
import { UserContext } from "../../App";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView, Image} from 'react-native';
import BottomNavigation from "../global/BottomNavigation";
import{colors, parameters} from "../global/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
import { getUser } from "../dao/usuarioDao";



export default function Conta({navigation, route}){
    const [user, setUser] = useState({});
    const userId = useContext(UserContext);

    useEffect(() => {
        let unmounted = false;

            const use = async () => {
                try{
                    const use = await getUser(userId).then(usuario => {
                        setUser(usuario);
                    })
                }catch(err){
                    console.log("ERRO!" + err);
                }
            }
             use();
            return () => {
                unmounted = true;
            }
    }, []);

   
   const GoReview = () => {

   }

   const GoMeusNegocios = () => {
        navigation.navigate('Meus Negócios')
   }

   const GoMinhaLista = () => {
    
   }

    return (
        <View style={{width: '100%', padding: 0, margin: 0}}>
                <ScrollView style={styles.container} >
                <View style={styles.identification}>
                    <Image style={styles.identificationImage} source={{uri:user.foto}}></Image>
                            <Text style={styles.identificationText}>{user.nome}</Text>
                    </View>
                    <View style={styles.areaChoice}>
                        <Pressable onPress={GoReview} style={[styles.areaChoiceButtons, {backgroundColor: colors.yellow}]}>
                            <Text style={styles.areaChoiceButtonsText}>Minhas Reviews</Text>
                            <Icon type="material-community" name="comment" color={colors.black} size={30}></Icon>
                            </Pressable>
                        <Pressable onPress={GoMeusNegocios} style={[styles.areaChoiceButtons, {backgroundColor: colors.orange}]}>
                            <Text style={styles.areaChoiceButtonsText}>Meus Negócios</Text>
                            <Icon type="material-community" name="briefcase" color={colors.black} size={30}></Icon>
                            </Pressable>
                    </View>
                    <View style={styles.wishlist}>
                        <Pressable onPress={GoMinhaLista} style={styles.wishlistButton}><Text style={styles.wishlistText}>Minha Lista de Lugares</Text></Pressable>
                    </View>
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
    },

    containerInside: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },

    identification: {
        flexDirection: 'row',
        backgroundColor: colors.purple,
        color: colors.white,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        borderBottomWidth: 5,
        borderColor: colors.purple,
        justifyContent: 'center',
        alignItems: 'center',
        height: 150
    },

    identificationImage: {
        borderRadius: 50,
        borderWidth: 5,
        borderColor: colors.white,
        height: 80,
        width: 80,
        margin: 5
    },

    identificationText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 30,
        margin: 10
    },

    areaChoice:{
        flexDirection: 'row',
        margin: '10%',
        justifyContent: 'space-between'
    },

    areaChoiceButtons: {
        borderRadius: 10,
        margin: 10,
        width: 150,
        height: 100,
        alignContent: 'center',
        justifyContent: 'center',
    },

    areaChoiceButtonsText: {
        color: colors.black,
        padding: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5
    },

    areaChoiceButtonsIcon: {
        color: colors.black,
        padding: 5,
        margin: 3,
        marginTop: 5
    },

    wishlist:{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },

    wishlistButton: {
        backgroundColor: colors.lightBlue,
        borderRadius: 10,
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },

    wishlistText: {
        color: colors.black,
        fontWeight: 'bold',
        textAlign: 'center',
    },

})
