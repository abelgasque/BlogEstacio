export class User {
    provedor: string = null;
    photoUrl: string = null;
    nome: string = null;
    cpf: string = null;
    genero: string = null;
    tipo: string = null;
    email: string = null;
    celular: string = null;
    situacao: string = "INATIVO";
    senha: string = null;
    cep: string = null;
    uf: string = null;
    cidade: string = null;
    bairro: string = null;
    logradouro: string = null;
    complemento: string = null;
    numero: string = null;
}

export class UserDTO {
    id: string = null;
    user = new User();
}

export class Publicacao {
    id: string = "";
    pathImg: string = "";
    nameImg: string = "";
    titulo: string = "";
    descricao: string = "";
    tipo: string = "";
    dt = new Date();
    situacao: string = "ATIVO";
    fk_pessoa: string = "";
}