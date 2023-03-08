import React, { useState, useContext, useEffect} from "react";
import { UserContext } from "../../App";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView} from 'react-native';
import{colors, parameters} from "../global/styles";
import { useForm, useController } from "react-hook-form";
import * as yup from 'yup';
import{yupResolver} from '@hookform/resolvers/yup';
import { Icon } from "@rneui/base";
import { editNegocio } from "../dao/negocioDao";

const schema = yup.object({
    servico: yup.string().required("Deixe um serviço"),
    preco: yup.string().required("Deixe um serviço preço para esse serviço"),


})




export default function AdicionarServicos({navigation, route}){


    const {control, handleSubmit, formState: {errors}} = useForm({});

    const [servicoNum, setServicoNum] = useState(1);

    const userId = useContext(UserContext);

    const [fields, setFields] = useState([
        { name: "servico", defaultValue: "" },
        { name: "preco", defaultValue: "" },
      ]);

    function handleService(data){

        var tempData = data

        try{ 
            Object.keys(tempData).forEach(key => tempData[key] === undefined ? delete tempData[key] : {})
            editNegocio(tempData, route.params.id);
            navigation.navigate('Negocio', {id: route.params.id});
        }catch(err){
            console.log("ERRO! AddServiço " + err);
        }
     

    }

    const addField = () => {
        setServicoNum(servicoNum + 1);
        setFields([...fields, { name: "servico " + servicoNum, defaultValue: "" },{ name: "preco " + servicoNum, defaultValue: "" } ]);
      };
    
      const removeField = () => {
        setServicoNum(servicoNum - 1);
        const newFields = [...fields];
        newFields.splice(fields.length-2, 2);
        setFields(newFields);
      };



    function FormField({ name, defaultValue, control, value, onChange }) {
        const { field } = useController({ name, control, defaultValue, value , onChange});
        return (
          <View>
            <TextInput style={styles.inputs} {...field} placeholder={name} onChangeText={field.onChange}
      value={field.value}/>
          </View>
        );
      }

    return (
        <View>
            <ScrollView style={styles.container}>
                    <Text style={styles.welcomeText}>Gerenciar Serviços</Text>
                    {fields.map((field) => (
                        <FormField key={field.name} {...field} control={control}  removeField={removeField}/>
                    ))}
                   <View style={styles.controls}> 
                        <Pressable style={styles.plusButton} onPress={addField}><Icon type="material-community" name="plus" color={colors.white} size={28}
                        /></Pressable>
                        <Pressable style={styles.plusButton} onPress={removeField}><Icon type="material-community" name="minus" color={colors.white} size={28}
                        /></Pressable>
                   </View>
                    
                    <Pressable style={styles.entrarButton} onPress={handleSubmit(handleService)}><Text style={{color: colors.black, fontWeight: 'bold'}}>Alterar Serviços</Text></Pressable>
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
        color: colors.black,
        fontSize: 35,
        fontWeight: "bold",
        textAlign: 'center',
        marginVertical: 20
    },

    inputs: {
        borderColor: colors.lightBlue,
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
        backgroundColor: colors.lightBlue,
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
    },

    plusButton: {
        borderRadius: 10,
        backgroundColor: colors.blue,
        width: 50,
        margin: 5,
        paddingVertical: 5 
    },

    controls: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    }

})
