/* eslint-disable no-undef */
const mysql = require("mysql2");
const logger = require("../logger");
require('dotenv').config()

async function verifica_banco(){
    logger.database.debug("Banco de dados não configurado, iniciando configuração");
    await configura_banco();
}

async function configura_banco() {
    var pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.PASSWORD,
        waitForConnections: true,
        connectionLimit : 10,
        queueLimit: 0
    })

    try{
        await pool.promise().query(`SET time_zone='-03:00'`)
        logger.database.debug("Fuso horário configurado");
        await pool.promise().query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`)
        logger.database.debug("Banco de dados configurado");
        await pool.promise().query(`
            CREATE TABLE IF NOT EXISTS ${process.env.DATABASE}.mensagens (
            id                   INT AUTO_INCREMENT PRIMARY KEY,
            mensagem             VARCHAR(255) NOT NULL,
            hora                 TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`
        )
        logger.database.debug("Tabela configurada");
        logger.database.debug("Verificação do banco de dados completada, ajustando configurações");
    } catch(e){
        console.log(e)
        logger.database.error("Erro ao conectar com o Banco de dados: " + e.code);
        if(e.fatal){
            logger.database.fatal("Não foi possivel conectar ao Banco de Dados: " + e.stack);
            
        }
        switch(e.code){
            default:
                logger.database.error(e.code+": "+e);
                
        }
    }
}

verifica_banco();

var pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit : 10,
    queueLimit: 0
})

module.exports = pool;
