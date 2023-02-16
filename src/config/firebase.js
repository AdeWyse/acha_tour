import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBLjXF03ak55tkfWZKIWi0_gJcQaq1kELE",
    authDomain: "achatour.firebaseapp.com",
    projectId: "achatour",
    storageBucket: "achatour.appsopt.com",
    messagingSenderId: "189855578119",
    appId: "1:189855578119:web:27faa4f737096fef1bd2a2",
    measurementId: "G-VQ3BXWP188"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore(app);