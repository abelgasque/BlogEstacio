export class Pessoa{
    id_pessoa: string = "";
    img_pessoa: string = "";
    img_fundo: string;
    nome: string;
    sobrenome: string;
	cpf: string;
    genero: string;
    tipo_pessoa: string = "CLIENTE";
    email: string;
	celular: string;
    telefone: string;
	situacao_pessoa: string = "INATIVO";
    senha: string;
    cep: string;
    uf: string;
    cidade: string;
    bairro: string;
	logradouro: string;
    complemento: string;
	numero: string;
}

export class Publicacao{
    id_publicacao: string = undefined;
    img_publicacao: string = "publicacao_001.jpg";
    titulo: string;
    descricao: string;
    tipo_publicacao: string;
    dt_publicacao: string;
    situacao_publicacao: string = "ATIVO";
    fk_pessoa: string;
}