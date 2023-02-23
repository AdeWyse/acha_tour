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
            console.log(negocioTemplate)

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
            const loc = { latitude: documentSnapshot.data().location.latitude , longitude: documentSnapshot.data().longitude}
            negocioLocalizado = {
                id: documentSnapshot.id,
                location: loc,
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
        }else{
            negocioLocalizado = "Não encontrado";
        }
    })

    return negocioLocalizado
}

export function setNegocio(neg){
    negocio.add(neg).then(() => {
        console.log("Negócio Adicionado")
    })
    
}

export function EditNegocio(id, location, nome, notaGeral, notaPreco, notaSeguranca, responsavel, social, telefone){
    
}