
import { usuario } from "../config/firebase";





export async function getUser(id){

    var usuarioLocalizado

   await usuario.doc(id).get().then(documentSnapshot => {
        if(documentSnapshot.exists){
            usuarioLocalizado = {
                id: documentSnapshot.id,
                nome: documentSnapshot.data().nome,
                foto: documentSnapshot.data().foto
            }
        }else{
            usuarioLocalizado = "Não encontrado";
        }
    })

    return usuarioLocalizado
}

export function setUser(user){

    usuario.doc(user.id).set({nome: user.nome, foto: user.foto}).then(() => {
        console.log('User added!');
      });

}
