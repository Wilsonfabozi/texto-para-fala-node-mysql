/* eslint-disable no-undef */
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const logger = require("../logger");
require('dotenv').config()

logger.ibm_watson.debug("Iniciando configuração do IBM Watson");
const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
        apikey: process.env.API,
    }),
    serviceUrl: process.env.SERVICE_URL
});

logger.ibm_watson.debug("Configuração do IBM Watson finalizada");

module.exports = textToSpeech
