import React, { useState, useContext, useEffect} from "react";
import { UserContext } from "../../App";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView} from 'react-native';
import{colors, parameters} from "../global/styles";
import {useForm, Controller} from "react-hook-form";
import * as yup from 'yup';
import{yupResolver} from '@hookform/resolvers/yup';
import { firebase } from "@react-native-firebase/auth";
import { Slider } from "@rneui/base";
import { editReviewUsuario, getReviewUsuarioEdit} from "../dao/reviewDao";


export default function EditarReview({navigation, route}){


    const {control, handleSubmit, formState: {errors}} = useForm({});

    const userId = useContext(UserContext);

    const [reviewOriginal, setReviewOriginal]= useState({});



    const [user, setUser] = useState();


    useEffect(() => {
        let unmounted = false;
            const rev = async () => {
                try{
                    const negocio = await getReviewUsuarioEdit(route.params.id, userId).then(neg => {
                        setReviewOriginal(neg);
                    })
                }catch(err){
                    console.log("ERRO! " + err);
                }
            }
            
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
             rev();
            return () => {
                unmounted = true;
            }
    }, []);


    function handleReview(data){
        var tempData = data;
        tempData.data = new firebase.firestore.Timestamp.fromDate(new Date());
        tempData['nome'] = user?.nome;
        Object.keys(tempData).forEach(key => tempData[key] === undefined ? delete tempData[key] : {})
        try{
        editReviewUsuario(tempData, route.params.id, reviewOriginal.id);

        }catch(err){
            console.log("ERRO!Edit  " + err);
        }
        navigation.navigate("Minhas Reviews")
    }

    return (
        <View>
            <ScrollView style={styles.container}>
                    <Text style={styles.welcomeText}>Editar Review</Text>
                    <Controller 
                        control={control}
                        name="notaGeral"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Nota Geral: {value}</Text>
                                <Slider maximumValue={5} minimumValue={0} minimumTrackTintColor={colors.yellow} thumbTintColor={colors.purple} onValueChange={onChange} step={1} value={value}></Slider>
                            </View>
                        )}
                    />  
                    {errors.notaGeral && <Text style={styles.erro}>{errors.notaGeral?.message}</Text>}

                    <Controller 
                        control={control}
                        name="notaPreco"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Nota Preço: {value}</Text>
                                <Slider maximumValue={5} minimumValue={0} minimumTrackTintColor={colors.yellow} thumbTintColor={colors.purple} onValueChange={onChange} step={1} value={value}></Slider>
                            </View>
                        )}
                    />  
                    {errors.notaPreco && <Text style={styles.erro}>{errors.notaPreco?.message}</Text>}

                    <Controller 
                        control={control}
                        name="notaSeguranca"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Nota Segurança: {value}</Text>
                                <Slider maximumValue={5} minimumValue={0} minimumTrackTintColor={colors.yellow} onValueChange={onChange} thumbTintColor={colors.purple} step={1} value={value}></Slider>
                            </View>
                        )}
                    />  
                    {errors.notaSeguranca && <Text style={styles.erro}>{errors.notaSeguranca?.message}</Text>}

                    <Controller 
                        control={control}
                        name="conteudo"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Sua Review</Text>
                                <TextInput multiline={true} style={[styles.inputs, errors.rua && styles.erroBorder]} placeholder="Sua review" value={value}  onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />  
                    {errors.conteudo && <Text style={styles.erro}>{errors.conteudo?.message}</Text>}

                    <Pressable style={styles.entrarButton} onPress={handleSubmit(handleReview)}><Text style={{color: colors.purple, fontWeight: 'bold'}}>Editar Review</Text></Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
        justifySelf: 'center',
        backgroundColor: colors.white,
        height: '100%',
        paddingTop: '5%',
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
        borderColor: colors.yellow,
        borderRadius: 5,
        borderWidth: 2,
        marginHorizontal: '10%',
        marginVertical: 4,
        height: 45,
        padding: 10
    },

    prompts: {
        marginHorizontal: '10%'
    },

    entrarButton: {
        backgroundColor: colors.yellow,
        color: colors.black,
        borderRadius: 5,
        marginHorizontal: '10%',
        marginVertical: 4,
        marginBottom: 6,
        justifyContent: "center",
        alignItems: "center",
        height: 45
    },

    erro: {
        fontSize: 10,
        fontWeight: 'bold',
        margin: 4,
        marginHorizontal: '10%', 
        color: colors.red
    },

    erroBorder:{
        borderColor: colors.red
    } 

})
