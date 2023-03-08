import React, { useState } from "react";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView} from 'react-native';
import{colors, parameters} from "../global/styles";
import {useForm, Controller} from "react-hook-form";
import * as yup from 'yup';
import{yupResolver} from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';

const schema = yup.object({
    email: yup.string().email("Email Inválido").required("Informe um email"),
    senha: yup.string().min(6,"Minimo 6 characteres").required("Informe uma senha")
})


export default function Entrar({navigation, route}){

    const {control, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)});
    const [loginIn, setLogin] = useState(false);

    function test(data){
        var email = data.email;
        var senha = data.senha;
        setLogin(true);

        auth().signInWithEmailAndPassword(email, senha).then((userCredential) => {
            navigation.navigate('Busca');

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLogin(true);
            console.log("ERRO AAAAA ___________________" + errorMessage);
        })
    };



    return (
        <View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.titulo}>AchaTour</Text>
                    <Text style={styles.slogan}>Ache o espaço do seu tour</Text>
                </View>
                    <Text style={styles.welcomeText}>Bem-vinde</Text>
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
                                <TextInput secureTextEntry={true} style={[styles.inputs, errors.senha && styles.erroBorder]} placeholder="Senha" value={value}  onChangeText={onChange}></TextInput>
                            </View>
                        )}
                    />  
                    {errors.email && <Text style={styles.erro}>{errors.email?.message}</Text>}
                    <Pressable style={styles.entrarButton}><Text style={{color: colors.white, fontWeight: 'bold'}} onPress={handleSubmit(test)}>Entrar</Text></Pressable>
                    <Pressable style={styles.prompt} onPress={() =>{
                        navigation.navigate('Registrar')
                    }}><Text style={styles.promptCadastrar}>Não tem cadastro?</Text><Text style={styles.promptCadastrarLink}>Cadastrar</Text></Pressable>
                    {loginIn == true && <Text style={styles.carregando}>Carregando...</Text>}
            </View>
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
        paddingTop: '20%',
        paddingHorizontal: '5%'
    },

    titulo: {
        color: colors.purple,
        fontSize: 35,
        fontWeight: "bold",
        textAlign: 'center',
        marginVertical: 2
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
        padding: 4

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

    prompts: {
        marginHorizontal: '10%'
    },

    promptCadastrarLink: {
        textAlign: "center",
        fontSize: 12,
        margin: 2,
        color: colors.purple
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
    },

    carregando: {
        marginHorizontal: '50%'
    }

})
