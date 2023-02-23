import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';

import Geocoder from "react-native-geocoding";

const firebaseConfig = {
    clientId:'189855578119-a71vkgcr95qekpnmcunqv0spl540gpf0.apps.googleusercontent.com',
    appId: '1:189855578119:android:b953303c98cc21d91bd2a2',
    apiKey: 'AIzaSyAgWn_QPr1BTT0QhqqvEuhWSBy7v5p17Yk',
    storageBucket: 'achatour.appspot.com',
    projectId: 'achatour',
};
var app = "passed";
if(!firebase.apps.length){
 app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.apps[0];
}

export const negocio = firestore().collection('Negocio');
export const usuario = firestore().collection('Usuario');

Geocoder.init("AIzaSyAeinITGakkYS2Yj4Ktue--Jyaj_WYcuFw");