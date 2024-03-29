import React, { useState } from "react";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView, Image} from 'react-native';
import{colors, parameters} from "../global/styles";
import {useForm, Controller} from "react-hook-form";
import * as yup from 'yup';
import{yupResolver} from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import { setUser } from "../dao/usuarioDao";


const schema = yup.object({
    nome: yup.string().required("Informe um nome"),
    email: yup.string().email("Email Inválido").required("Informe um email"),
    senha: yup.string().min(6,"Minimo 6 characteres").required("Informe uma senha"),
    senhaConfirma: yup.string().required("Confirme a senha").oneOf([yup.ref('senha')], "Senhas não conferem")


})


export default function Registrar({navigation, route}){


    const {control, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)});

    function handleRegistro(data){
        var email = data.email;
        var senha = data.senha;
        auth().createUserWithEmailAndPassword(email, senha).then((userCredential) => {
            console.log(userCredential.user.uid);
            usuarioToCreate = {
                uid: userCredential.user.uid,
                nome: data.nome,
                foto: 'https://firebasestorage.googleapis.com/v0/b/achatour.appspot.com/o/DefaultAvatar.png?alt=media&token=0b522c0b-4997-4563-8381-892d04fc651d'
            }
            navigation.navigate('Busca');
            setUser(usuarioToCreate);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);

        })
    }

    return (
        <View>
            <ScrollView style={styles.container}>
                <View>
                    <Image style={styles.titulo} source={"../img/AchaTourLogo.png"}></Image>
                    <Text style={styles.slogan}>Ache o espaço do seu tour</Text>
                </View>
                    <Text style={styles.welcomeText}>Cadastre-se</Text>
                    <Controller 
                        control={control}
                        name="nome"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Nome</Text>
                                <TextInput style={[styles.inputs, errors.nome && styles.erroBorder]} placeholder="Nome" value={value} onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />
                    {errors.nome && <Text style={styles.erro}>{errors.nome?.message}</Text>}

                    <Controller 
                        control={control}
                        name="email"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Email</Text>
                                <TextInput style={[styles.inputs, errors.email && styles.erroBorder]} placeholder="Email" value={value}  onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />  
                    {errors.email && <Text style={styles.erro}>{errors.email?.message}</Text>}

                    <Controller 
                        control={control}
                        name="senha"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Senha</Text>
                    <TextInput secureTextEntry={true} style={[styles.inputs, errors.senha && styles.erroBorder]} placeholder="Senha" value={value} onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />
                    {errors.senha && <Text style={styles.erro}>{errors.senha?.message}</Text>}
                <Controller 
                        control={control}
                        name="senhaConfirma"
                        render={({ field: {onChange, value}}) => (
                            <View>
                                <Text style={styles.prompts}>Confrime a senha</Text>
                    <TextInput secureTextEntry={true} style={[styles.inputs, errors.senhaConfirma && styles.erroBorder]} placeholder="Confirme a senha" value={value} onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />
                    {errors.senhaConfirma && <Text style={styles.erro}>{errors.senhaConfirma?.message}</Text>}
                    <Pressable style={styles.entrarButton} onPress={handleSubmit(handleRegistro)}><Text style={{color: colors.white, fontWeight: 'bold'}}>Registrar</Text></Pressable>
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

    titulo: {
        color: colors.purple,
        fontSize: 35,
        fontWeight: "bold",
        textAlign: 'center',
        marginVertical: 2,
        width: 50,
        height: 50
    },

    slogan: {
        color: colors.purple,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        marginVertical: 2
    },

    welcomeText: {
        color: colors.purple,
        fontSize: 20,
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
