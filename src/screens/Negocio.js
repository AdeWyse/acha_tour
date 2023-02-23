import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView} from 'react-native';
import BottomNavigation from "../global/BottomNavigation";
import{colors, parameters} from "../global/styles";
import { getNegocio } from "../dao/negocioDao";


export default function Negocio({navigation, route}){
    const [lugar, setLugar] = useState({});
    

    useEffect(() => {
        let unmounted = false;

            const neg = async () => {
                try{
                    const negocio = await getNegocio(route.params.id).then(neg => {
                        setLugar(neg);
                    })
                }catch(err){
                    console.log("ERRO!" + err);
                }
            }
             neg();
            return () => {
                unmounted = true;
            }
    }, []);


    return (
        <View>
            <ScrollView style={styles.container}>
                    <View style={styles.lugar}>
                    <View  style={styles.lugarTop}>
                        <Text style={styles.lugarTitulo}>{lugar.nome}</Text>
                        <Text style={styles.lugarTipo}>{lugar.tipo}</Text>
                    </View>
                    <View style={styles.lugarNotas}>
                        <Text style={styles.lugarNota}>Nota - {lugar.notaGeral}</Text>
                        <Text style={styles.lugarNota}>Segurança - {lugar.notaSeguranca}</Text>
                        <Text style={styles.lugarNota}>Preço - {lugar.notaSeguranca}</Text>
                    </View>
                    <Text  style={styles.lugarDescricao}>{lugar.descricao}</Text>
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
        paddingTop: '50%',
        paddingHorizontal: '5%'
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
