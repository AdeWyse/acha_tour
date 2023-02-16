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
export function GetNegocios() {
    var negocios = [];
    negocio.get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
            negocioTemplate = {
                id: documentSnapshot.id,
                location: documentSnapshot.data().location,
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
})
    return negocios
}

export function GetNegocio(id){
    var negocioLocalizado
    negocio.doc('id').get().then(documentSnapshot => {
        if(documentSnapshot.exists){
            negocioTemplate = {
                id: documentSnapshot.id,
                location: documentSnapshot.data().location,
                nome: documentSnapshot.data().nome,
                notaGeral: documentSnapshot.data().notaGeral,
                notaPreco: documentSnapshot.data().notaPreco,
                notaSeguranca: documentSnapshot.data().notaSeguranca,
                responsavel:documentSnapshot.data().responsavel,
                social: documentSnapshot.data().social,
                telefone: documentSnapshot.data().telefone
            }
            negocioLocalizado = negocioTemplate;
        }else{
            negocioLocalizado = "Não encontrado";
        }
    })

    return negocioLocalizado
}

export function SetNegocio(location, nome, notaGeral, notaPreco, notaSeguranca, responsavel, social, telefone){
    negocio.add({
        location: location,
        nome: nome,
        notaGeral: notaGeral,
        notaPreco: notaPreco,
        notaSeguranca: notaSeguranca,
        responsavel: responsavel,
        social: social,
        telefone: telefone
    }).then(() => {
        console.log("Negocio Adicionado");
        return "Adicionado";
    })
    
}

export function EditNegocio(id, location, nome, notaGeral, notaPreco, notaSeguranca, responsavel, social, telefone){
    
}