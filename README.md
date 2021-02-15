<h1 id="sobre">texto-para-fala-node-mysql</h1>
<h4>Projeto de conversão de texto para fala</h4>

<img src="https://img.shields.io/static/v1?label=license&message=MIT&color=95c30e" />
<img src="https://img.shields.io/static/v1?label=node&message=15.8.0&color=0172b2" />
<img src="https://img.shields.io/static/v1?label=react&message=16.12.0&color=0172b2" />
<img src="https://img.shields.io/static/v1?label=typescript&message=3.7.4&color=0172b2" />

Tabela de conteúdos
=================
<!--ts-->
   * [Sobre](#sobre)
   * [Tabela de Conteudo](#tabela-de-conteudo)
   * [Tecnologias](#tecnologias)
   * [Pré-Requisitos](#pre-requisitos)
   * [Backend](#backend)
   * [Frontend](#frontend)
   * [Comandos SQL](#sql)
<!--te-->

<h1 id="tecnologias">🛠 Tecnologias</h1>

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [MySql](https://www.mysql.com/)
- [IBM Watson TTS](https://www.ibm.com/br-pt/cloud/watson-text-to-speech)
- [React](https://pt-br.reactjs.org/)
- [Material-Ui](https://material-ui.com/pt/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)

<h1 id="pre-requisitos">💈 Pré-requisitos</h1>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en/) e um banco de dados [MySql](https://www.mysql.com/).

<h1 id="backend">🎲 Rodando o Back-End (servidor)</h1>

```bash
# Acesse a pasta backend do projeto
$ cd backend

# Instale as dependências
$ npm install
$ yarn install

# Configure os parãmetros do MySql
Editar o arquivo .env, da seguinte forma: 
HOST=<endereço do servidor>
DB_USER=<Usuário do banco de dados>
PASSWORD=<Senha do banco de dados>
DATABASE=<Nome do banco de dados>
API=<Api key da IBM Watson>
SERVICE_URL=<URL do serviço da sua conta da IBM Watson>

O servidor está configurado para criar tanto o banco quanto a tabela com os campos baseados nessas configurações.
Será gerado um arquivo stdout.log, e também aperecerá no output do sistema, todas as interações realizada scom o sistema.

# Inicie o servidor
$ npm start
$ yarn start

# O servidor inciará na porta:3001
```

<h1 id="frontend">💎 Rodando o Front-End (site web)</h1>

```bash
# Acesse a pasta backend do projeto
$ cd frontend

# Instale as dependências
$ npm install
$ yarn install

# Inicie o servidor
$ npm dev
$ yarn dev

# O servidor inciará em localhost:3000

# Para criar a versão de produção
$ npm build
$ yarn build
```

<h1 id="sql">📚 Comandos SQL</h1>

Comandos usanos na criação da estrutura do banco de dados

```
SET time_zone='-03:00'

CREATE DATABASE IF NOT EXISTS dbname

CREATE TABLE IF NOT EXISTS dbname.tbname (
    id                   INT AUTO_INCREMENT PRIMARY KEY,
    mensagem             VARCHAR(100) NOT NULL,
    hora                 TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```