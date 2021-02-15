const router = require("express-promise-router")();
const mensagemController = require("../controllers/tts.controller");
const logger = require("../logger");

// ==> Rota responsável por incluir uma mensagem: (POST): /mensagem/incluir
try {
    router.post("/mensagem/incluir", mensagemController.mensagemIncluir);
} catch (e) {
    logger.fatal("Erro no post mensagem/autenticar: " + e);
}
// ==> Rota responsável por alterar uma mensagem: (POST): /mensagem/alterar
// try {
//     router.post("/mensagem/alterar", mensagemAlterar);
// } catch (e) {
//     logger.mensagem.fatal("Erro no post mensagem/alterar: " + e);
// }

// ==> Rota responsável por excluir uma mensagem: (POST): /mensagem/excluir
// try {
//     router.post("/mensagem/excluir", mensagemExcluir);
// } catch (e) {
//     logger.mensagem.fatal("Erro no post mensagem/excluir: " + e);
// }

// ==> Rota responsável por listar todas as mensagens: (POST): /mensagem/listar
try {
    router.post("/mensagem/listar", mensagemController.mensagemListar);
} catch (e) {
    logger.fatal("Erro no post mensagem/listar: " + e);
}
// ==> Rota responsável por converter a mensagem em voz: (POST): /mensagem/tts
try {
    router.get("/mensagem/tts", mensagemController.mensagemTTS);
} catch (e) {
    logger.fatal("Erro no post mensagem/tts: " + e);
}
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
// ==> Rota responsável por listar todas as mensagens: (POST): /idioma/listar
try {
    router.post("/idioma/listar", mensagemController.idiomaListar);
} catch (e) {
    logger.fatal("Erro no post idioma/listar: " + e);
}

module.exports = router;