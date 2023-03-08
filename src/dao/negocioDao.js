import { negocio } from "../config/firebase";

var negocioTemplate = {
    id: "",
    location: {},
    nome: "",
    notaGeral: 1,
    notaPreco: 1,
    notaSeguranca: 1,
    responsavel: "",
    social: "",
    telefone: ""
}
export  const getNegocios = async () =>  {
    var negocios = [];
    try {
        
        await negocio.get().then(querySnapshot => {

            querySnapshot.forEach(documentSnapshot => {
                
                const loc = { latitude: documentSnapshot.data().location.latitude , longitude: documentSnapshot.data().location.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01}

                negocioTemplate = {
                    id: documentSnapshot.id,
                    location: loc,
                    rua: documentSnapshot.data().rua,
                    numero: documentSnapshot.data().numero,
                    cep: documentSnapshot.data().cep,
                    descricao: documentSnapshot.data().descricao,
                    publico: documentSnapshot.data().publico,
                    tipo: documentSnapshot.data().tipo,
                    nome: documentSnapshot.data().nome,
                    notaGeral: documentSnapshot.data().notaGeral,
                    notaPreco: documentSnapshot.data().notaPreco,
                    notaSeguranca: documentSnapshot.data().notaSeguranca,
                    responsavel:documentSnapshot.data().responsavel,
                    social: documentSnapshot.data().social,
                    telefone: documentSnapshot.data().telefone
                }

                negocios.push(negocioTemplate);
            })
            return negocios
    })
    }catch(err){
                console.log("ERRO!" + err);
            }
   
    return negocios
}

export async function getNegocio(id){
    var negocioLocalizado
   await negocio.doc(id).get().then(documentSnapshot => {
        if(documentSnapshot.exists){
            const loc = { latitude: documentSnapshot.data().location.latitude , longitude: documentSnapshot.data().location.longitude}
            var servicos = [];
            Object.keys(documentSnapshot.data()).forEach(key => {
                if(key.includes("servico")){
                    var endString = key.substring(key.indexOf(' ') + 1)
                    var precokey = "preco"
                    if(!endString.includes("servico")){
                     precokey = "preco "+endString
                    }
                    servicos.push({nome: documentSnapshot.data()[key], preco: documentSnapshot.data()[precokey]});
                }
            })
            negocioLocalizado = {
                id: documentSnapshot.id,
                location: loc,
                rua: documentSnapshot.data().rua,
                numero: documentSnapshot.data().numero,
                cep: documentSnapshot.data().cep,
                descricao: documentSnapshot.data().descricao,
                publico: documentSnapshot.data().publico,
                tipo: documentSnapshot.data().tipo,
                nome: documentSnapshot.data().nome,
                notaGeral: documentSnapshot.data().notaGeral,
                notaPreco: documentSnapshot.data().notaPreco,
                notaSeguranca: documentSnapshot.data().notaSeguranca,
                responsavel:documentSnapshot.data().responsavel,
                social: documentSnapshot.data().social,
                telefone: documentSnapshot.data().telefone,
                servico: servicos
            }
        }else{
            negocioLocalizado = "Não encontrado";
        }
    })

    return negocioLocalizado
}

export async function getNegociosWishlist(ids, count, negocioIn)  {
    if(count <= 1){
            var negocios = [];
        for(var i = 0; i < ids.length; i++){
            try{
                await getNegocio(ids[i]).then(neg => {
                negocios.push(neg);
            })

        }catch(err){
            console.log("ERRO! " + err);
        }
        }
        return negocios
    }else{
        return negocioIn
    }
    
}

export  const getNegociosUsuario  = async (id) =>  {
    var negocios = [];
    try {
        
        await negocio.where('responsavel', '==', id).get().then(querySnapshot => {

            querySnapshot.forEach(documentSnapshot => {
                
                const loc = { latitude: documentSnapshot.data().location.latitude , longitude: documentSnapshot.data().location.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01}

                negocioTemplate = {
                    id: documentSnapshot.id,
                    location: loc,
                    rua: documentSnapshot.data().rua,
                    numero: documentSnapshot.data().numero,
                    cep: documentSnapshot.data().cep,
                    publico: documentSnapshot.data().publico,
                    descricao: documentSnapshot.data().descricao,
                    tipo: documentSnapshot.data().tipo,
                    nome: documentSnapshot.data().nome,
                    notaGeral: documentSnapshot.data().notaGeral,
                    notaPreco: documentSnapshot.data().notaPreco,
                    notaSeguranca: documentSnapshot.data().notaSeguranca,
                    responsavel:documentSnapshot.data().responsavel,
                    social: documentSnapshot.data().social,
                    telefone: documentSnapshot.data().telefone
                }

                negocios.push(negocioTemplate);
            })
            return negocios
    })
    }catch(err){
                console.log("ERRO! " + err);
            }
   
    return negocios
}

export function setNegocio(neg){
    negocio.add(neg).then(() => {
        console.log("Negócio Adicionado")
    })
    
}

export function editNegocio(neg, id){
    negocio.doc(id).update(neg).then(() => {
        console.log("Negócio Editado")
    })
}

export function deleteNegocio(id){
    negocio.doc(id).delete().then(() => {
        console.log("Negocio deletado");
    })
}