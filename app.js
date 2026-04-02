/*****************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de Estados e Cidades
 * Data: 01/04/2026
 * Autor: Lucas Kolle
 * Versão: 1.0.4.26
 ****************************************************************************************************************************************************************************/

/*
    Instalação do EXPRESS - npm install express --save
        Dependencia responsável pela utilização do protocolo HTTP para criar uma API (A istalação deve ser feita na dominancia do app.js (raiz do projeto))

    Instalação do CORS    - npm install cors --save
        Dependencia responsável pelas configurações a serem realizadas para permissão de acesso da API (A istalação deve ser feita na dominancia do app.js (raiz do projeto))
*/

//importando as dependencia para criar a API
const express   = require("express")
const cors      = require("cors")

//criando um objeto para manipular o express
const app = express()

//conjunto de permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: ["*"], //A origrm da requisição (definido por meio do IP (192.168...), quando colocado o "*" fica livre para todas as máquinas)
    methods: "GET", //são os verbos que serão liberados na API (GET, POST, PUT, DELETE...)
    allowedHeaders: ["Content-type", "Autorizations"] //são permissões de cabeçalho do CORS
}

//configura as permissões da API atravez do CORS
app.use(cors(corsOptions))

//importando arquivo de funções
const estadosCidades = require("./modulo/functions.js")

//Response -> Retornos da API
//Request  -> Chegadas de dados da API

//criando endPoints para a API
app.get("/v1/senai/dados/estado/:uf", function(request, response){ //enviando os parametros por meio da url usando o ":nome da variavel"
    let sigla = request.params.uf //criando variável para guardar os parametros digitados na url ":nome da variável / parametros"
    let estado = estadosCidades.getDadosEstado(sigla) //criando variável para guardar o resultado da função e mandando a sigla

    //realizando tratamento de erro 
    if(estado){ //se a função retornar algo ela vai cair aqui
        response.json(estado) //enviando váriavel que foi criada
        response.status(200)  //enviando código
    }else{ //se a função retornar "false" ela vai cair aqui
        response.json({"message": "O estado informado não foi encontrado!"})
        response.status(404)
    }
    
})

//retorna dados da capital de cada estado filtrando pelo "uf"
app.get("/v1/senai/capital/estado/:uf", function(request, response){
    let sigla = request.params.uf //criando variável para receber o estado digitado na url
    let capitalEstados = estadosCidades.getCapitalEstado(sigla) //criando variável para guardar o resultado da função e mandando a sigla

    //tratativa de erros
    if(capitalEstados){
        response.json(capitalEstados)
        response.status(200)
    }else{
        response.json({"message": "O estado informado não foi encontrado!"})
        response.status(404)
    }

})

//retorna dados dos estados que foram capitais do Brasil, não tem filtragem
app.get("/v1/senai/estados/capital/brasil", function(request, response){
    let capitaisBrasil = estadosCidades.getCapitalPais()

    response.json(capitaisBrasil)
    response.status(200)
})

//retorna dados dos estados filtrando pela região
app.get("/v1/senai/estados/regiao/:nomeRegiao", function(request, response){
    let regiao = request.params.nomeRegiao
    let estadosRegiao = estadosCidades.getEstadosRegiao(regiao)

    //tratativa de erros
    if(estadosRegiao){
        response.json(estadosRegiao)
        response.status(200)
    }else{
        response.json({"message": "Região não encontrada!"})
        response.status(404)
    }

})

//retorna dados das cidades filtrando pelo "uf"
app.get("/v1/senai/cidades/estado/:uf", function(request, response){
    let uf = request.params.uf
    let cidadesEstado = estadosCidades.getCidades(uf)

    if(cidadesEstado){
        response.json(cidadesEstado)
        response.status(200)
    }else{
        response.json({"message": "Estado não encontrado!"})
        response.status(404)
    }
})

//retorna os estados do Brasil,não tem filtragem
app.get("/v1/senai/estados", function(request, response){

    //criando variável para guardar a função específica do arquivo
    let estados = estadosCidades.getListaDeEstados()

    response.json(estados) //enviando váriavel que foi criada
    response.status(200)   //enviando código

})

//serve para inicalizar a API para receber requisições
app.listen(8080, function(){ // "8080" = porta que vai sair o conteúdo
    console.log("API funcionando e aguardando novas requisições...")
})