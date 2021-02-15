const fs = require('fs');
const db = require("../config/database");
const tts = require("../config/ibm-watson");
const logger = require("../logger");

// ==> Método responsável por incluir filial:
exports.mensagemIncluir = async (req, res) => {
    const { mensagem } = req.body;

    logger.mensagem.info("Incluindo mensagem: " + mensagem);

    await db.promise().query(`
        INSERT INTO mensagens (mensagem) 
        VALUES (?)`,
    [mensagem])
    .then(() => {
        logger.mensagem.info("Mensagem incluida com sucesso. ("+mensagem+")");
        res.status(201).send("Mensagem incluida com sucesso!");
    })
    .catch(e => {
            logger.mensagem.error("Erro ao incluir mensagem: " + e.code + " - " + e.errno);
            if (e.fatal) {
                logger.mensagem.fatal(e.stack);
            }
            return res.status(400).send("Erro ao incluir mensagem. Código: " + e.code);
    });
};
// ==> Método responsável por converter texto em fala:
exports.mensagemTTS = async (req, res) => {
    // const { mensagem, voz } = req.body;
    const { mensagem, voz } = req.query;
    let aux = Math.random().toString().split(".")[1];

    if(mensagem !== undefined && voz !== undefined){
        logger.mensagem.info("Gerando TTS da mensagem: " + mensagem);
        const synthesizeParams = {
            text: mensagem,
            accept: 'audio/wav',
            voice: voz,
        };
          
        logger.ibm_watson.info("Sintetizando audio");
        tts.synthesize(synthesizeParams)
        .then(response => {
            // only necessary for wav formats,
            // otherwise `response.result` can be directly piped to a file
            return tts.repairWavHeaderStream(response.result);
        })
        .then(buffer => {
            fs.writeFileSync(`sons/${aux}.wav`, buffer);
            res.download(`sons/${aux}.wav`, (erro) => {
                if(erro) {
                    logger.mensagem.error(`Erro no download do áudio ${aux}.wav: ${erro}`);
                }
                fs.unlinkSync(`sons/${aux}.wav`)
            })
        })
        .catch(err => {
            logger.ibm_watson.error(err)
            res.status(500).send("Erro ao sintetizar a mensagem")
        });
    } else {
        res.status(400).send("Parâmetros inválidos")
    }
}
// ==> Método responsável por listar todos os perfis:
exports.mensagemListar = async (req, res) => {
    logger.mensagem.info("Listando mensagens");
    db.query(
        `SELECT * FROM mensagens 
        ORDER BY hora DESC`, 
    (error, results) => {
        if(error){
            logger.mensagem.error("Erro ao buscar mensagens: " + error.code + " - " + error.errno);
            if(error.fatal){
                logger.mensagem.fatal(error.stack);
            }
            return res.status(400).send("Erro buscar mensagens. Código" + error.code)
        }

        logger.mensagem.info("Mensagens listadas com sucesso.");
        res.status(200).send({
            mensagens: results,
        });
    });
};
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
// ==> Método responsável por listar todos os idiomas e vozes:
exports.idiomaListar = async (req, res) => {
    let idiomas = [
        {
            nome: "ar-AR",
            descricao: "Árabe"
        },
        {
            nome: "de-DE",
            descricao: "Alemão"
        },
        {
            nome: "en-AU",
            descricao: "Inglês Australiano"
        },
        {
            nome: "en-GB",
            descricao: "Inglês Britânico"
        },
        {
            nome: "en-US",
            descricao: "Inglês Americano"
        },
        {
            nome: "es-ES",
            descricao: "Espanhol"
        },
        {
            nome: "es-LA",
            descricao: "Espanhol ??"
        },
        {
            nome: "es-US",
            descricao: "Espanhol 2 ??"
        },
        {
            nome: "fr-FR",
            descricao: "Francês"
        },
        {
            nome: "it-IT",
            descricao: "Italiano"
        },
        {
            nome: "ja-JP",
            descricao: "Japonês"
        },
        {
            nome: "ko-KR",
            descricao: "Coreano"
        },
        {
            nome: "nl-NL",
            descricao: "Holândes"
        },
        {
            nome: "pt-BR",
            descricao: "Português Brasileiro"
        },
        {
            nome: "zh-CN",
            descricao: "Chinês"
        },
    ];
    let vozes = [
        {
            nome: "ar-MS_OmarVoice",
            descricao: "Omar"
        },
        {
            nome: "de-DE_BirgitVoice",
            descricao: "Birgit"
        },
        {
            nome: "de-DE_BirgitV3Voice",
            descricao: "Birgit (V3)"
        },
        {
            nome: "de-DE_DieterVoice",
            descricao: "Dieter"
        },
        {
            nome: "de-DE_DieterV3Voice",
            descricao: "Dieter (V3)"
        },
        {
            nome: "de-DE_ErikaV3Voice",
            descricao: "Erika (V3)"
        },
        {
            nome: "en-AU_CraigVoice",
            descricao: "Craig"
        },
        {
            nome: "en-AU_MadisonVoice",
            descricao: "Madison"
        },
        {
            nome: "en-GB_CharlotteV3Voice",
            descricao: "Charlotte (V3)"
        },
        {
            nome: "en-GB_JamesV3Voice",
            descricao: "James (V3)"
        },
        {
            nome: "en-GB_KateVoice",
            descricao: "Kate"
        },
        {
            nome: "en-GB_KateV3Voice",
            descricao: "Kate (V3)"
        },
        {
            nome: "en-US_AllisonVoice",
            descricao: "Allison"
        },
        {
            nome: "en-US_AllisonV3Voice",
            descricao: "Allison (V3)"
        },
        {
            nome: "en-US_EmilyV3Voice",
            descricao: "Emily (V3)"
        },
        {
            nome: "en-US_HenryV3Voice",
            descricao: "Henry (V3)"
        },
        {
            nome: "en-US_KevinV3Voice",
            descricao: "Kevin (V3)"
        },
        {
            nome: "en-US_LisaVoice",
            descricao: "Lisa"
        },
        {
            nome: "en-US_LisaV3Voice",
            descricao: "Lisa (V3)"
        },
        {
            nome: "en-US_MichaelVoice",
            descricao: "Michael"
        },
        {
            nome: "en-US_MichaelV3Voice",
            descricao: "Michael (V3)"
        },
        {
            nome: "en-US_OliviaV3Voice",
            descricao: "Olivia (V3)"
        },
        {
            nome: "es-ES_EnriqueVoice",
            descricao: "Enrique"
        },
        {
            nome: "es-ES_EnriqueV3Voice",
            descricao: "Enrique (V3)"
        },
        {
            nome: "es-ES_LauraVoice",
            descricao: "Laura"
        },
        {
            nome: "es-ES_LauraV3Voice",
            descricao: "Laura (V3)"
        },
        {
            nome: "es-LA_SofiaVoice",
            descricao: "Sofia"
        },
        {
            nome: "es-LA_SofiaV3Voice",
            descricao: "Sofia (V3)"
        },
        {
            nome: "es-US_SofiaVoice",
            descricao: "Sofia"
        },
        {
            nome: "es-US_SofiaV3Voice",
            descricao: "Sofia (V3)"
        },
        {
            nome: "fr-FR_NicolasV3Voice",
            descricao: "Nicolas (V3)"
        },
        {
            nome: "fr-FR_ReneeVoice",
            descricao: "Renee"
        },
        {
            nome: "fr-FR_ReneeV3Voice",
            descricao: "Renee (V3)"
        },
        {
            nome: "it-IT_FrancescaVoice",
            descricao: "Francesca"
        },
        {
            nome: "it-IT_FrancescaV3Voice",
            descricao: "Francesca (V3)"
        },
        {
            nome: "ja-JP_EmiVoice",
            descricao: "Emi"
        },
        {
            nome: "ja-JP_EmiV3Voice",
            descricao: "Emi (V3)"
        },
        {
            nome: "ko-KR_HyunjunVoice",
            descricao: "Hyunjun"
        },
        {
            nome: "ko-KR_SiWooVoice",
            descricao: "Si Woo"
        },
        {
            nome: "ko-KR_YoungmiVoice",
            descricao: "Youngmi"
        },
        {
            nome: "ko-KR_YunaVoice",
            descricao: "Yuna"
        },
        {
            nome: "nl-NL_EmmaVoice",
            descricao: "Emma"
        },
        {
            nome: "nl-NL_LiamVoice",
            descricao: "Liam"
        },
        {
            nome: "pt-BR_IsabelaVoice",
            descricao: "Isabela"
        },
        {
            nome: "pt-BR_IsabelaV3Voice",
            descricao: "Isabela (V3)"
        },
        {
            nome: "zh-CN_LiNaVoice",
            descricao: "Li Na"
        },
        {
            nome: "zh-CN_WangWeiVoice",
            descricao: "Wang Wei"
        },
        {
            nome: "zh-CN_ZhangJingVoice",
            descricao: "Zhang Jing"
        },
        {
        }

    ];
    
    // TODO: Atualualizar automaticamente lista de idiomas e linguagens


    // let aux = [];
    // logger.ibm_watson.info("Pegando a lista de idiomas disponíveis");
    // tts.listVoices()
    // .then(voices => {
    //     voices.result.voices.map(voz => {
    //         aux.push({
    //             nome: voz.language
    //         })

    //         vozes.push({
    //             nome: voz.name,
    //             descricao: voz.description,
    //             idioma: voz.language,
    //         })
    //     });

    //     aux.map((item) => {
    //         console.log(idiomas.indexOf(item))
    //         if(idiomas.indexOf(item) !== -1){
    //             idiomas.push(item)
    //         }
    //     })
    //     console.log(idiomas);

        res.status(200).send({
            idiomas,
            vozes
        })
    // })
    // .catch(err => {
    //     logger.ibm_watson.error("Erro ao buscar lista de vozes: " + err);
    //     console.log('error:', err);
    // });
};
