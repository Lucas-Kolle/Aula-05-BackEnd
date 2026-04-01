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
app.get("/v1/senai/estados", function(request, response){

    //criando variável para guardar a função específica do arquivo
    let estados = estadosCidades.getListaDeEstados()

    response.json(estados) //enviando váriavel que foi criada
    response.status(200)   //enviando código

})

//enviando os parametros por meio da url usando o ":nome da variavel"
app.get("/v1/senai/dados/estado/:uf", function(request, response){
    let sigla = request.params.uf //criando variável para guardar os parametros digitados na url ":nome da variável / parametros"
    let estado = estadosCidades.getDadosEstado(sigla) //criando variável para guardar o resultado da função e mandando a sigla

    response.json(estado) //enviando váriavel que foi criada
    response.status(200)  //enviando código
})

app.get("/cidades", function(request, response){
    response.json({"message": "Testando minha API de cidades"})
    response.status(200)
})

//serve para inicalizar a API para receber requisições
app.listen(8080, function(){ // "8080" = porta que vai sair o conteúdo
    console.log("API funcionando e aguardando novas requisições...")
})