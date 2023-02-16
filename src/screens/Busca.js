import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable, ScrollView} from 'react-native';
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GetLocation from "react-native-get-location";
import BottomNavigation from "../global/BottomNavigation";
import{colors, parameters} from "../global/styles";
import { GetNegocios } from "../dao/negocioDao";
export default function Busca({navigation, route}){
    const [locationIn, setLocation] = useState({latitude: -23.6807245, longitude: -47.1696191, latitudeDelta: 0.09, longitudeDelta: 0.04});
    const [lugares, setLugares] = useState([]);

     var negociosGet =  GetNegocios();
     setLugares(negociosGet);
    useEffect(() => {
        let unmounted = false;
        const requestLocation = async () => {            
            try{
                const location = await GetLocation.getCurrentPosition({
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
                console.log("ERRO!" + err);
            }
        }
            requestLocation();
    
            return () => {
                unmounted = true;
            }
        
    }, []);
    

    return (
        <View>
            <View>
                <MapView style={styles.map} region={locationIn} provider='google' showsUserLocation={true} showsMyLocationButton={true} loadingEnabled={true}>

                </MapView>
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
        paddingTop: '50%',
        paddingHorizontal: '5%'
    },

    map: {
        width: '100%',
        height: '92.5%',
        padding: 0,
        margin: 0
    }

})
