const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()


// ==> Rotas da API:
const ttsRoute = require('./src/routes/tts.routes');

app.use(express.json()); //type: 'application/vnd.api+json', 
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(ttsRoute);

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3001;

app.listen(port, () => {
    // console.log('Aplicação executando na porta ' + port);
})