import React, { useState, useContext, useEffect} from "react";
import { UserContext } from "../../App";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView} from 'react-native';
import BottomNavigation from "../global/BottomNavigation";
import{colors, parameters} from "../global/styles";
import { getReviewsUsuario} from "../dao/reviewDao";


export default function MinhasReviews({navigation, route}){
    const [user, setUser] = useState({});
    const userId = useContext(UserContext);

    const [minhasReviews, setMinhasReviews] = useState([]);
    useEffect(() => {
        let unmounted = false;

            const rev = async () => {

                try{

                    const negocio = await getReviewsUsuario(userId).then(rev => {
                        setMinhasReviews(rev);
                    })
                }catch(err){
                    console.log("ERRO! MinhasReviews " + err);
                }
            }

             rev();

            return () => {
                unmounted = true;
            }
    }, []);

    const cardsReviews = minhasReviews.map((review) => {
        return (
            <Pressable style={styles.review}  onPress={() => {
                navigation.navigate('Negocio', {id: review.negocio})
                
            }}>
              
            <View  style={styles.reviewTop} >
                <Text style={styles.reviewAutor}>{review?.nome}</Text>
                <Text style={styles.reviewData}>{review?.data?.getDate()}/{review?.data?.getMonth()}/{review?.data?.getYear()}</Text>
            </View>
            <View style={styles.reviewNotas}>
                <Text style={styles.reviewNota}>Nota - {review?.notaGeral}</Text>
                <Text style={styles.reviewNota}>Segurança - {review?.notaSeguranca}</Text>
                <Text style={styles.reviewNota}>Preço - {review?.notaSeguranca}</Text>
                <Pressable onPress={() => {
                    navigation.navigate("Editar Review", {id: review?.negocio})
                }}><Text>Editar</Text></Pressable>
            </View>
            <Text  style={styles.reviewDescricao}>{review?.conteudo}</Text>
        
            </Pressable>
           
        );
    });

    return (
        <View>
            <ScrollView style={styles.container}>
                <View style={styles.containerInside}>
                    <View style={styles.reviews}>
                            {cardsReviews}
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
        justifyContent: 'flex-start',
    },

    review: {
        flexDirection: 'column',
        backgroundColor: colors.offWhite,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        marginVertical: '2%'
    },

    reviewTop: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 5
    },

    reviewAutor: {
        fontWeight: 'bold',
        color: colors.purple
    },

    reviewData: {
        fontWeight: 'bold',
        color: colors.black,
        marginHorizontal: '2%'
    },

    reviewDescricao: {
        color: colors.black
    },

    reviewNotas: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    reviewNota: {
        color: colors.black,
        margin: 5
    },

    reviewDescricao: {
        fontSize: 12,
        color: colors.black,
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: '5%'
    }



})
