import { negocio } from "../config/firebase";
import { getNegocios } from "./negocioDao";

export function setReview(id, review){
    negocio.doc(id).collection('Review').add(review).then(() => {
        console.log("Review Adicionada")
    })
    
}

export async function getReviewsUsuario(idUsuario){
    var negocios;
    var reviews = [];
    await getNegocios().then(neg => {
        negocios = neg
    })

    for(var i = 0; i < negocios.length; i++){
       if(negocios[i] === undefined){
        continue
       }else{
        await getReviewUsuario(negocios[i].id, negocios[i].nome, idUsuario).then(revi => {
            reviews.push(revi)

        })
        }
       }
    return reviews
}

async function getReviewUsuario(id, nome, idUsuario){


    var review= {};
    await negocio.doc(id).collection('Review').where('autor', '==', idUsuario).get().then( querySnapshot => {

        querySnapshot.forEach(documentSnapshot => {
    
            review = {
                id: documentSnapshot.id,
                negocio: id,
                nome: nome,
                conteudo: documentSnapshot.data().conteudo,
                data: documentSnapshot.data().data.toDate(),
                notaGeral: documentSnapshot.data().notaGeral,
                notaPreco: documentSnapshot.data().notaPreco,
                notaSeguranca: documentSnapshot.data().notaSeguranca,
                autor: documentSnapshot.data().autor
            } 
        })
        }
        )
        return review;
}

export async function getReviewUsuarioEdit(id, idUsuario){
    var review= {};
    await negocio.doc(id).collection('Review').where('autor', '==', idUsuario).get().then( querySnapshot => {

        querySnapshot.forEach(documentSnapshot => {
    
            review = {
                id: documentSnapshot.id,
                negocio: id,
                conteudo: documentSnapshot.data().conteudo,
                data: documentSnapshot.data().data.toDate(),
                notaGeral: documentSnapshot.data().notaGeral,
                notaPreco: documentSnapshot.data().notaPreco,
                notaSeguranca: documentSnapshot.data().notaSeguranca,
                autor: documentSnapshot.data().autor
            } 
        })
        }
        )


        return review;
}


export async function getReviewsNegocio(id){
    var reviews = [];
   await negocio.doc(id).collection('Review').get().then( querySnapshot => {

    querySnapshot.forEach(documentSnapshot => {

             review = {
                id: documentSnapshot.id,
                conteudo: documentSnapshot.data().conteudo,
                data: documentSnapshot.data().data.toDate(),
                notaGeral: documentSnapshot.data().notaGeral,
                notaPreco: documentSnapshot.data().notaPreco,
                notaSeguranca: documentSnapshot.data().notaSeguranca,
                autor: documentSnapshot.data().autor,
                nome: documentSnapshot.data().nome,

            }
            reviews.push(review);
        })
    
    })

    return reviews
}

export function editReviewUsuario(review, id, idReview){
   negocio.doc(id).collection('Review').doc(idReview).update(review).then(() => {
        console.log("Review Editada")
    })
}