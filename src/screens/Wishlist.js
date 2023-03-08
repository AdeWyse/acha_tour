import React, { useState, useContext, useEffect} from "react";
import { UserContext } from "../../App";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView} from 'react-native';
import BottomNavigation from "../global/BottomNavigation";
import{colors, parameters} from "../global/styles";
import { getUserWishlist } from "../dao/usuarioDao";
import { getNegociosWishlist} from "../dao/negocioDao";


export default function Wishlist({navigation, route}){
    const userId = useContext(UserContext);
    const [wishlistIds, setWishlistIds] = useState([]);
    const [meusNegocios, setMeusNegocios] = useState([]);
    var count = 0;
    useEffect(() => {
        let unmounted = false;
            const use = async () => {
                try{
                    const use = await getUserWishlist(userId, count, wishlistIds).then(usuario => {
                        setWishlistIds(usuario);
                    })
                }catch(err){
                    console.log("ERRO! Wishlist " + err);
                }
            }
            const neg = async () => {
                try{
                    const negocio = await getNegociosWishlist(wishlistIds,count, meusNegocios).then(negoc => {
                         setMeusNegocios(negoc);
                    });

                }catch(err){
                    console.log("ERRO! Meus lugares " + err);
                }
            }
             use();
           neg();
            return () => {
                unmounted = true;
            }
    }, [wishlistIds]);

    
        const cardsLugares = meusNegocios.map(lugar => (
            <Pressable onPress ={() => {
                navigation.navigate('Negocio', {id: lugar?.id})
            }}>
             <View style={styles.lugar} >
            <View  style={styles.lugarTop}>
                <Text style={styles.lugarTitulo}>{lugar?.nome}</Text>
                <Text style={styles.lugarTipo}>{lugar?.publico}</Text>
                <Text style={styles.lugarTipo}>{lugar?.tipo}</Text>
            </View>
            <View style={styles.lugarNotas}>
                <Text style={styles.lugarNota}>Nota - {lugar?.notaGeral}</Text>
                <Text style={styles.lugarNota}>Segurança - {lugar?.notaSeguranca}</Text>
                <Text style={styles.lugarNota}>Preço - {lugar?.notaSeguranca}</Text>
            </View>
            <Text  style={styles.lugarDescricao}>{lugar?.descricao}</Text>
        </View>
            </Pressable>
        ));



    return (
        <View>
            <ScrollView style={styles.container}>
                <View style={styles.containerInside}>
                    <View style={styles.negocios}>
                            {cardsLugares}
                    </View>
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
        paddingTop: '2%',
        paddingHorizontal: '5%',
    },

    containerInside: {
        justifyContent: 'flex-start'
    },

    menu: {
        width: '90%',
        margin: '5%'
    },

    novoNegocio: {
        backgroundColor: colors.green,
        borderRadius: 10,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center'

    },

    novoNegocioText:{
        fontWeight: 'bold',
        color: colors.white
    },

    lugar: {
        padding: 5,
        margin: 5,
        backgroundColor: colors.offWhite,
        borderRadius: 10
    },

    lugarTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },

    lugarTitulo: {
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.black
    },

    lugarTipo: {
        color: colors.purple
    },

    lugarNotas: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },


    lugarNota: {
        color: colors.purple
    },

    lugarDescricao: {
        fontSize: 12,
        color: colors.black,
        width: '90%',
        marginHorizontal: '5%'
    },

})
