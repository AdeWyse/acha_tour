import { collection, getDocs } from "firebase/firestore";
import { database } from "../config/firebase";

export async function GetNegocios(){
    const negocios  = []

    const querSnapshot = await getDocs(collection(database, "Negocios"));
    querSnapshot.forEach((doc) => {
        negocios.push({id: doc.id, data: doc.data()});
    });

    return negocios;
}