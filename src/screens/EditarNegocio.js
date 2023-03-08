import React, { useState, useContext, useEffect} from "react";
import { UserContext } from "../../App";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView} from 'react-native';
import{colors, parameters} from "../global/styles";
import {useForm, Controller} from "react-hook-form";
import * as yup from 'yup';
import{yupResolver} from '@hookform/resolvers/yup';
import { getUser } from "../dao/usuarioDao";
import Geocoder from "react-native-geocoding";
import { getNegocio, editNegocio } from "../dao/negocioDao";
import { firebase } from "@react-native-firebase/auth";




export default function EditarNegocio({navigation, route}){


 

    const [user, setUser] = useState({});
    const userId = useContext(UserContext);

    const [negocioOriginal , setNegocioOriginal] = useState({});
    const [endereco, setEndereco] = useState({});


    useEffect(() => {
        let unmounted = false;

        const neg = async () => {
            try{
                const negocio = await getNegocio(route.params.id).then(neg => {
                    setNegocioOriginal(neg);
                })
            }catch(err){
                console.log("ERRO!" + err);
            }
        }
            const use = async () => {
                try{
                    const use = await getUser(userId).then(usuario => {
                        setUser(usuario);
                    })
                }catch(err){
                    console.log("ERRO! AddNegocio " + err);
                }
            }
             use();
             neg();
            return () => {
                unmounted = true;
            }
    }, []);



    function handleNegocio(data){

        var tempData = data;
        if(data.telefone != undefined){
            var telefoneCheio = data.telefone;
            var telefoneLimpo = "";
            console.log(telefoneCheio);
            for(var i = 0; i < telefoneCheio.length; i++){
            if((telefoneCheio.charAt(i)<50 || telefoneCheio.charAt(i)>57)){
                telefoneLimpo = telefoneLimpo + telefoneCheio.charAt(i);
            }

            tempData.telefone = telefoneLimpo;
        }
        }
        
        var loc = {}


        if(data.rua != undefined && data.numero != undefined && data.cep != undefined){
            try{
                Geocoder.from(data.rua + "," + data.numero + "," + data.cep).then(json => {
                    loc = json.results[0].geometry.location;
                }).catch(error => console.warn("Erro Add: " + error))
            }catch(err){
                console.log("ERRO! EditNegocio " + err);
            }
            tempData['location'] = loc
        }

        Object.keys(tempData).forEach(key => tempData[key] === undefined ? delete tempData[key] : {})
        editNegocio(tempData, route.params.id);
        navigation.navigate('Negocio', {id: route.params.id});
    }

    const {control, handleSubmit, formState: {errors}} = useForm({});

    return (
        <View>
            <ScrollView style={styles.container}>
                    <Text style={styles.welcomeText}>Editar Negócio</Text>

                    <Controller 
                        control={control}
                        name="nome"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Nome</Text>
                                <TextInput style={[styles.inputs, errors.nome && styles.erroBorder]} placeholder={negocioOriginal.nome} value={value} onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />
                    {errors.nome && <Text style={styles.erro}>{errors.nome?.message}</Text>}
                    <Controller 
                        control={control}
                        name="tipo"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Tipo</Text>
                        <TextInput style={[styles.inputs, errors.tipo && styles.erroBorder]} placeholder={negocioOriginal.tipo} value={value} onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />
                    <Controller 
                        control={control}
                        name="publico"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Público</Text>
                        <TextInput multiline={true} numberOfLines={5} style={[styles.inputs, errors.tipo && styles.erroBorder]} placeholder="Ex. LGBTQIA+, Mulheres Lésbicas, Pessoas Trans, Homens Gays" value={value} onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />
                    <Controller 
                        control={control}
                        name="descricao"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Descricao</Text>
                        <TextInput multiline={true} numberOfLines={5} style={[styles.inputs, errors.descricao && styles.erroBorder]} placeholder={negocioOriginal.descricao} value={value} onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />
                    <Controller 
                        control={control}
                        name="rua"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Rua</Text>
                                <TextInput style={[styles.inputs, errors.rua && styles.erroBorder]} placeholder={negocioOriginal.rua} value={value}  onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />  
                    {errors.rua && <Text style={styles.erro}>{errors.rua?.message}</Text>}

                    <Controller 
                        control={control}
                        name="numero"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Numero</Text>
                    <TextInput style={[styles.inputs, errors.numero && styles.erroBorder]} placeholder={negocioOriginal.numero} value={value} onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />
                    {errors.senha && <Text style={styles.erro}>{errors.senha?.message}</Text>}
                    <Controller 
                        control={control}
                        name="cep"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Cep</Text>
                    <TextInput style={[styles.inputs, errors.cep && styles.erroBorder]} placeholder={negocioOriginal.cep} value={value} onChangeText={onChange}></TextInput>
                            </View>
    )}
                    />
                    {errors.cep && <Text style={styles.erro}>{errors.cep?.message}</Text>}
                    <Controller 
                        control={control}
                        name="social"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Link</Text>
                        <TextInput style={[styles.inputs, errors.telefone && styles.erroBorder]} placeholder={negocioOriginal.social} value={value} onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />
                      <Controller 
                        control={control}
                        name="telefone"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Telefone</Text>
                        <TextInput style={[styles.inputs, errors.telefone && styles.erroBorder]} placeholder={negocioOriginal.telefone} value={value} onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />
                    <Pressable style={styles.entrarButton} onPress={handleSubmit(handleNegocio)}><Text style={{color: colors.white, fontWeight: 'bold'}}>Editar</Text></Pressable>
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
        borderColor: colors.purple,
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
