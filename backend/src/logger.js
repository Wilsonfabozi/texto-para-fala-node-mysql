// import { configure, getLogger } from "log4js";
const log4js = require("log4js");
 
log4js.configure({
    appenders: { 
        file: {
            type: "file",
            filename: "stdout.log"
        },
        database: { 
            type: "stdout",
            layout: {
                type: "pattern",
                pattern: "%[[%d{dd/MM/yyyy, hh:mm:ss:SSS}][%p][%c] %m %]",
            }
        },
        ibm_watson: { 
            type: "stdout",
            layout: {
                type: "pattern",
                pattern: "%[[%d{dd/MM/yyyy, hh:mm:ss:SSS}][%p][%c] %m %]",
            }
        },
        mensagem: { 
            type: "stdout",
            layout: {
                type: "pattern",
                pattern: "%[[%d{dd/MM/yyyy, hh:mm:ss:SSS}][%p][%c] %m %]",
            }
        },
    },
    categories: { 
        default: { 
            appenders: ["database", "file"], 
            level: "info" 
        } 
    }
});

const log = log4js.getLogger();
log.level = "debug";
log.debug("Iniciando configuração do servidor...");
log.debug("Logger configurado");

const logDatabase = log4js.getLogger("database");
const logIbmWatson = log4js.getLogger("ibm_watson");
const logMensagem = log4js.getLogger("mensagem");

module.exports = {
    database: logDatabase,
    ibm_watson: logIbmWatson,
    mensagem: logMensagem
};

// log4js.configure({
//     appenders: { 
//         mensagem: { 
//             type: ["stdout"],
//             layout: {
//                 type: "pattern",
//                 pattern: "%[%x{ln}[%p] [%c] %m %]",
//                 tokens: {
//                     ln: function (data: Date) {
//                         return pegaData(data);
//                     }
//                 }
//             }
//         },
//     },
//     categories: { 
//         default: { 
//             appenders: ["mensagem"],
//             level: "trace"
//         } 
//     }
// });

// const logMensagem = log4js.getLogger("mensagem");

// const logger = log4js.getLogger();

// module.exports = {
//     mensagem: logMensagem
// }

// function pegaData(data: any){
//     return "["+new Date(data.startTime).toLocaleString("pt-BR")+"]"
// }
/* 
debug - ciano
info - verde
error - vermelho
fatal - roxo
trace - azul
*/