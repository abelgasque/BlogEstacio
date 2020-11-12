export class Pessoa {
    id_pessoa: string = null;
    img_pessoa: string = "https://firebasestorage.googleapis.com/v0/b/blog-6dd54.appspot.com/o/usuario_padrao.jpg?alt=media&token=dae90e7c-9394-4f5e-aa1e-0b6be7cc1362";
    nome: string = null;
    sobrenome: string = null;
    cpf: string = null;
    genero: string = null;
    tipo_pessoa: string = "ALUNO";
    email: string = null;
    celular: string = null;
    telefone: string = null;
    situacao_pessoa: string = "INATIVO";
    senha: string = null;
    cep: string = null;
    uf: string = null;
    cidade: string = null;
    bairro: string = null;
    logradouro: string = null;
    complemento: string = null;
    numero: string = null;
}

export class Usuario {
    id: string = "";
    provedor: string = "";
    photoUrl: string = "https://firebasestorage.googleapis.com/v0/b/blog-6dd54.appspot.com/o/usuario_padrao.jpg?alt=media&token=dae90e7c-9394-4f5e-aa1e-0b6be7cc1362";
    nome: string = "";
    cpf: string = "";
    genero: string = "";
    tipo: string = "ALUNO";
    email: string = "";
    celular: string = "";
    situacao: string = "INATIVO";
    senha: string = "";
    cep: string = "";
    uf: string = "";
    cidade: string = "";
    bairro: string = "";
    logradouro: string = "";
    complemento: string = "";
    numero: string = "";
}

export class Publicacao {
    id: string = "";
    img: string = "";
    titulo: string = "";
    descricao: string = "";
    tipo: string = "";
    dt = new Date();
    situacao: string = "ATIVO";
    fk_pessoa: string = "";
}