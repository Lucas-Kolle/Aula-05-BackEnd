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
        response.status(200)  //enviando código
        response.json(estado) //enviando váriavel que foi criada
    }else{ //se a função retornar "false" ela vai cair aqui
        response.status(404)
        response.json({"message": "O estado informado não foi encontrado!"})
    }
    
})

//retorna dados da capital de cada estado filtrando pelo "uf"
     // "/v1/senai/capital/estado/:uf" via params, é necessário adicionar manualmente na url
app.get("/v1/senai/capital/estado/", function(request, response){ // no modelo query não é necessário adicionar a variável após o ponto de "?" (?uf=sp)
    let sigla = request.query.uf //criando variável para receber a uf via query
    let capitalEstados = estadosCidades.getCapitalEstado(sigla) //criando variável para guardar o resultado da função e mandando a sigla

    //tratativa de erros
    if(capitalEstados){
        response.status(200)
        response.json(capitalEstados)
    }else{
        response.status(404)
        response.json({"message": "O estado informado não foi encontrado!"})
    }

})

//retorna dados dos estados que foram capitais do Brasil, não tem filtragem
app.get("/v1/senai/estados/capital/brasil", function(request, response){
    let capitaisBrasil = estadosCidades.getCapitalPais()

    response.status(200)
    response.json(capitaisBrasil)
})

//retorna dados dos estados filtrando pela região
app.get("/v1/senai/estados/regiao/:nomeRegiao", function(request, response){
    let regiao = request.params.nomeRegiao
    let estadosRegiao = estadosCidades.getEstadosRegiao(regiao)

    //tratativa de erros
    if(estadosRegiao){
        response.status(200)
        response.json(estadosRegiao)
    }else{
        response.status(404)
        response.json({"message": "Região não encontrada!"})
    }

})

//retorna dados das cidades filtrando pelo "uf"
app.get("/v1/senai/cidades/estado/:uf", function(request, response){
    let uf = request.params.uf
    let cidadesEstado = estadosCidades.getCidades(uf)

    if(cidadesEstado){
        response.status(200)
        response.json(cidadesEstado)
    }else{
        response.status(404)
        response.json({"message": "Estado não encontrado!"})
    }
})

//retorna os estados do Brasil,não tem filtragem
app.get("/v1/senai/estados", function(request, response){

    //criando variável para guardar a função específica do arquivo
    let estados = estadosCidades.getListaDeEstados()

    response.status(200)   //enviando código
    response.json(estados) //enviando váriavel que foi criada

})

app.get("/v1/senai/help", function(request, response){
    let docAPI = {
        "API-description": "API para manipular dados de Estados e Cidades",
        "date": "2026-04-02",
        "Development": "Lucas Kolle",
        "email": "lucaskolle2020@gmail.com",
        "Version": "1.0",
        "endPoints": [
            {
                "id": 1,
                "Rota 1": "/v1/senai/estados",
                "Description": "Retorna a lista de todos os estados do Brasil"
            },
            {
                "id": 2,
                "Rota 2": "/v1/senai/dados/estado/sp",
                "Description": "Retorna os dados do estados filtrando pela sigla do estado" 
            },
            {
                "id": 3,
                "Rota 2": "/v1/senai/capital/estado/:rj",
                "Description": "Retorna os dados da capital filtrando pela sigla do estado" 
            },
            {
                "id": 4,
                "Rota 2": "/v1/senai/estados/capital/brasil",
                "Description": "Retorna todos os estados que formaram capital do Brasil" 
            },
            {
                "id": 5,
                "Rota 2": "/v1/senai/estados/regiao/nordeste",
                "Description": "Retorna todos os estados que pertencem à está região" 
            },
            {
                "id": 6,
                "Rota 2": "/v1/senai/cidades/estado/sc",
                "Description": "Retorna todas as cidades do estado"
            }
        ]
    }

    response.status(200)
    response.json(docAPI)
})

//serve para inicalizar a API para receber requisições
app.listen(8080, function(){ // "8080" = porta que vai sair o conteúdo
    console.log("API funcionando e aguardando novas requisições...")
})