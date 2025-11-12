// server.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para servir arquivos estáticos da pasta 'public'
// Isso inclui index.html, style.css e script.js
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para servir arquivos da pasta 'data'
// Isso torna o arquivo meu-blog-json/data/posts.json acessível via /data/posts.json
app.use('/data', express.static(path.join(__dirname, 'data'))); 

// Iniciar o servidor
app.listen(port, () => {
    console.log(`🚀 Blog rodando em http://localhost:${port}`);
});
