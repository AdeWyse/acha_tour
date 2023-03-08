
import { usuario } from "../config/firebase";




export function addToWishlist( idUsuario, idNegocio){
    usuario.doc(idUsuario).collection('wishlist').add({negocioId: idNegocio}).then(() => {
        console.log('Added!');
      });
}

export async function getUser(id){

    var usuarioLocalizado

   await usuario.doc(id).get().then(documentSnapshot => {
            
        if(documentSnapshot.exists){
            usuarioLocalizado = {
                id: documentSnapshot.id,
                nome: documentSnapshot.data().nome,
                foto: documentSnapshot.data().foto,
            }
        }else{
            usuarioLocalizado = "Não encontrado";
        }
    })

    return usuarioLocalizado
}

export async function getUserWishlist(id, count, arr){
    if( count <= 1){
            var wishlist = [];

    await usuario.doc(id).collection('wishlist').get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {

        wishlist.push(documentSnapshot.data().negocioId)
        })
        })
        return wishlist
    }else{
        return arr
    }
    
}

export function setUser(user){
    usuario.doc(user.uid).set({nome: user.nome, foto: user.foto}).then(() => {
        console.log('User added!');
      });

}
