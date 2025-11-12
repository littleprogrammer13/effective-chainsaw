// server.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 1. Configura a pasta 'public' para arquivos como index.html e script.js
app.use(express.static(path.join(__dirname, 'public')));

// 2. Configura a pasta 'data' para ser acessível diretamente
//    Qualquer arquivo dentro de 'data' será acessível via /data/nome_do_arquivo
app.use('/data', express.static(path.join(__dirname, 'data'))); 

// REMOVA a rota app.get('/api/posts', ...)
// Não precisamos mais dela, pois o arquivo será acessado diretamente.

// Iniciar o servidor
app.listen(port, () => {
    console.log(`🚀 Blog rodando em http://localhost:${port}`);
});
