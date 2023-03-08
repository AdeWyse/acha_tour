import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView} from 'react-native';
import MapView, { Callout, Marker } from "react-native-maps";
import GetLocation from "react-native-get-location";
import BottomNavigation from "../global/BottomNavigation";
import{colors, parameters} from "../global/styles";
import { Icon } from "@rneui/themed";
import { getNegocios} from "../dao/negocioDao";

export default function Busca({navigation, route}){
    const [locationIn, setLocation] = useState({latitude: -23.6807245, longitude: -47.1696191, latitudeDelta: 0.09, longitudeDelta: 0.04});
    const [lugares, setLugares] = useState([]);
    const [lugaresOriginal, setLugaresOriginal] = useState([]);
    const [lugaresTabStatus, setLugaresTabStatus] = useState(false);
    const [buscaInput, setBuscaInput] = useState('');

    useEffect(() => {
        let unmounted = false;
        const requestLocation = async () => {            
            try{
                const loc = await GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 15000,
                }).then(location=> {
                    var locationToSet = {
                        latitude: location.latitude, 
                        longitude: location.longitude, 
                        latitudeDelta: 0.00, 
                        longitudeDelta: 0.02
                    }
                    setLocation(locationToSet);
                }).catch(error => {
                    const {code, message} = error;
                    console.warn(code,message);
                })
                if(unmounted) return;
            }catch(err){
                console.log("ERRO! - " + err);
            }

        }
            const neg = async () => {
                try{
                    const negocio = await getNegocios().then(neg => {
                        setLugares(neg);
                        setLugaresOriginal(neg);
                    }
                        
                    )
                }catch(err){
                    console.log("ERRO! +" + err);
                }
            }
             neg();
            requestLocation();
            return () => {
                unmounted = true;
            }
    }, []);
    
    const busca = (input) => {
        if(!lugaresTabStatus){
            setLugaresTabStatus(!lugaresTabStatus);
        }
        setBuscaInput(input);
        var result = [];
        lugaresOriginal.forEach((lugar) => {
            if(lugar.nome.includes(input)){
                result.push(lugar);
            }
        });
        setLugares(result);
        result = [];
    }
    const renderLugares = lugares.map(pin => <Marker coordinate={pin.location} draggable={false}>
        <Callout>
            <Text>
                {pin.nome}
            </Text>
        </Callout>
    </Marker>);
    
    const cardsLugares = lugares.map(lugar =>
        <Pressable onPress ={() => {
            navigation.navigate('Negocio', {id: lugar.id})
    }}>
            <View style={styles.lugar} >
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
        </Pressable>
        
        );

    return (
        <View>
            
            <View style={styles.view}>
                <MapView style={styles.map} region={locationIn} provider='google' showsUserLocation={true} loadingEnabled={true}>
                    {renderLugares}
                </MapView>
                <View style={styles.buscaInput}>
                    <TextInput style={styles.inputBox} placeholder="Busca" value={buscaInput}  onChangeText={busca}></TextInput>
                    <Icon  type="material-community" name="map-search" style={styles.inputIcon} color={colors.purple} size={22}/>
                </View>
                <ScrollView style={[styles.lugaresTab, { height: lugaresTabStatus ?'80%' : '10%' }]}>
                    <View style={styles.lugaresTabInterna}>
                        <Pressable style={[styles.lugaresTabButton, { backgroundColor: lugaresTabStatus ?  colors.red: colors.green}]} onPress={() => {
                            setLugaresTabStatus(!lugaresTabStatus);
                        }}></Pressable>
                    {cardsLugares}
                    </View>
                </ScrollView>
            </View>

            <BottomNavigation style={styles.navbar} navigator={navigation}></BottomNavigation>
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

    view: {
        height: "92.5%"
    },

    map: {
        position: "absolute",
        width: '100%',
        height: '100%',
        padding: 0,
        margin: 0
    },

    buscaInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        position: 'absolute',
        top: 20,
        width: '90%',
        marginHorizontal: '5%',
        height: 40,
        borderRadius: 10,
        backgroundColor: colors.white,
        color: colors.purple,
        paddingHorizontal: 5
        
    },

    inputBox: {
        color: colors.purple,
        width: '90%'
      
    },

    inputIcon: {
        color: colors.purple,
        marginHorizontal: 5, 
        marginVertical: 10
    },

    lugaresTab: {
        position: "absolute",
        width: '95%',
        height: '10%',
        bottom: 0,
        marginHorizontal: '2.5%'
        
    },

    lugaresTabButton: {
        marginHorizontal:'5%',
        marginTop: 10,
        marginBottom: 10,
        width: '90%',
        borderRadius: 10,
        height: 15,
       
    },


    lugaresTabInterna: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: colors.white,
        height: 1000
        
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



    navbar: {
        position: "absolute",
        marginBottom: 0
    }

})
