import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView} from 'react-native';
import BottomNavigation from "../global/BottomNavigation";
import{colors, parameters} from "../global/styles";
import { getNegocio, deleteNegocio } from "../dao/negocioDao";
import { getReviewsNegocio } from "../dao/reviewDao";
import { Icon } from "@rneui/base";
import { addToWishlist } from "../dao/usuarioDao";


export default function Negocio({navigation, route}){
    const [lugar, setLugar] = useState({});
    const [reviews, setReviews] = useState([]);
    const userId = useContext(UserContext);
    const [excluirCheck, setExcluirCheck] = useState(false);
    const [salvoCheck, setsalvoCheck] = useState(false);
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

            const rev = async () => {
                try{
                    const review = await getReviewsNegocio(route.params.id).then(re => {
                        setReviews(re);
                    })
                }catch(err){
                    console.log("ERRO!" + err);
                }
            }
            rev();

             neg();
            return () => {
                unmounted = true;
            }
    }, []);

    const deleteNeg= () => {
        deleteNegocio(route.params.id);
        navigation.navigate('Busca');
    }
    const cardsServico = lugar.servico.map(servico => {
        return(
            <View style={styles.servico}>
                <Text style={styles.servicoNome}>{servico.nome}: </Text>
                <Text style={styles.servicoPreco}>{servico.preco}</Text>
            </View>
        )
 
    })
   const cardsReview = reviews.map(review =>
        <View style={styles.review} >
            <View  style={styles.reviewTop} >
                <Text style={styles.reviewAutor}>{review.nome}</Text>
                <Text style={styles.reviewData}>{review.data.getDate()}/{review.data.getMonth()}/{review.data.getYear()}</Text>
            </View>
            <View style={styles.reviewNotas}>
                <Text style={styles.reviewNota}>Nota - {review.notaGeral}</Text>
                <Text style={styles.reviewNota}>Segurança - {review.notaSeguranca}</Text>
                <Text style={styles.reviewNota}>Preço - {review.notaSeguranca}</Text>
                {review.autor == userId && <Pressable onPress={() => {
                    navigation.navigate("Editar Review", {id: review.negocio})
                }}><Text>Editar</Text></Pressable>}
            </View>
            <Text  style={styles.reviewDescricao}>{review.conteudo}</Text>
        </View>);
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.lugar}>
                    <View  style={styles.lugarTop}>
                        <Text style={styles.lugarTitulo}>{lugar.nome}</Text>
                        <Text style={styles.lugarTipo}>{lugar.publico}</Text>
                        <Text style={styles.lugarTipo}>{lugar.tipo}</Text>
                    </View>
                    <View style={styles.lugarNotas}>
                        <Text style={styles.lugarNota}>Nota - {lugar.notaGeral}</Text>
                        <Text style={styles.lugarNota}>Segurança - {lugar.notaSeguranca}</Text>
                        <Text style={styles.lugarNota}>Preço - {lugar.notaSeguranca}</Text>
                    </View>
                    <Text  style={styles.lugarDescricao}>{lugar.descricao}</Text>
                </View>
                <View style={styles.menu}>
                {lugar.responsavel != userId &&
                    <Pressable style={styles.novaReview} onPress={()=>{navigation.navigate('Nova Review', {id: lugar.id})}} >
                        <Text>Review</Text>
                        <Icon type="material-community" name="message-draw" color={colors.black} size={28}/>
                    </Pressable>}
                    {salvoCheck== false && <Pressable style={styles.salvar} onPress={()=>{addToWishlist(userId, route.params.id); setsalvoCheck(true)}} >
                        <Text style={{color: colors.white}}>Salvar</Text>
                        <Icon type="material-community" name="plus-box" color={colors.offWhite} size={28}/>
                    </Pressable>}
                    {salvoCheck== true && <Pressable style={styles.salvo} onPress={()=>{setsalvoCheck(false)}} >
                        <Text style={{color: colors.white}}>Salvo</Text>
                        <Icon type="material-community" name="check-bold" color={colors.offWhite} size={28}/>
                    </Pressable>}
                    {lugar.responsavel == userId && <Pressable style={styles.edit} onPress={()=>{navigation.navigate('Editar Negócio', {id: lugar.id})}} >
                        <Text>Editar</Text>
                        <Icon type="material-community" name="briefcase-edit" color={colors.black} size={28}/>
                    </Pressable>}
                    {lugar.responsavel == userId && <Pressable style={styles.edit} onPress={()=>{navigation.navigate('Adicionar Serviços', {id: lugar.id})}} >
                        <Text>Serviços</Text>
                        <Icon type="material-community" name="plus" color={colors.black} size={28}/>
                    </Pressable>}
                    {lugar.responsavel == userId && <Pressable style={styles.delete} onPress={()=>{setExcluirCheck(true); console.log(excluirCheck)}} >
                        <Text style={{color: colors.white}}>Excluir</Text>
                        <Icon type="material-community" name="briefcase-remove" color={colors.white} size={28}/>
                    </Pressable>}
                    
                </View>
                {excluirCheck == true && <View style={styles.check}>
                    <Text>Tem certeza?</Text>
                        <View style={styles.checkButtons}>
                            <Pressable style={styles.checkSim} onPress={deleteNeg}><Text style={{color: colors.white}}>Sim</Text></Pressable>
                            <Pressable style={styles.checkNao}  onPress={() => {setExcluirCheck(false)}}><Text style={{color: colors.white}}>Não</Text></Pressable>
                        </View>
                    </View>}
                <ScrollView>
                    <View>
                    <View style={styles.servicosTab}>
                        <Text style={styles.sectionTitulo}>Serviços</Text>
                        {cardsServico}
                    </View>
                    <View style={styles.reviewsTab}>
                        <Text style={styles.sectionTitulo}>Reviews</Text>
                        {cardsReview}
                    </View>
                    </View>
                </ScrollView>
            </View>
               
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
        paddingHorizontal: '5%'
    },

    menu: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'space-around'
    },

    novaReview: {
        borderRadius: 10,
        backgroundColor: colors.yellow,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },

    salvar: {
        borderRadius: 10,
        backgroundColor: colors.green,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },

    salvo: {
        borderRadius: 10,
        backgroundColor: colors.red,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },

    edit: {
        borderRadius: 10,
        backgroundColor: colors.lightBlue,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },

    delete: {
        borderRadius: 10,
        backgroundColor: colors.red,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },

    lugar: {
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
        marginHorizontal: '5%',
        marginVertical: '5%'
    },

    review: {
        flexDirection: 'column',
        backgroundColor: colors.offWhite,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        marginVertical: '2%'
    },

    servico: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        bbackgroundColor: colors.offWhite,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        marginVertical: '2%'
    },

    servicoNome:{
        color: colors.black
    },

    servicoPreco: {
        color: colors.black
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
    },

    check: {
        width: '90%',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    checkButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 20
    },

    checkSim: {
        backgroundColor: colors.green,
        borderRadius: 10,
        width: 70,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,

    },

    checkNao: {
        backgroundColor: colors.red,
        borderRadius: 10,
        width: 70,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,


    },

    sectionTitulo: {
        color: colors.purple,
        fontSize: 20,
        padding: 5,
    }


})
