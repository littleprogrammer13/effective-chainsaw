// server.js

const express = require('express');
const path = require('path');
const fs = require('fs'); // Necessário para ler o arquivo JSON
const app = express();
const port = 3000;

// 1. Servir a pasta 'public' (seu HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 2. Rota API para /posts
// Quando o frontend requisitar /posts, ele lê o JSON e envia o conteúdo.
app.get('/posts', (req, res) => {
    // Caminho completo para o arquivo JSON
    const filePath = path.join(__dirname, 'data', 'posts.json');
    
    // Tenta ler o arquivo
    try {
        const postsData = fs.readFileSync(filePath, 'utf8');
        // Define o cabeçalho como JSON e envia o conteúdo
        res.setHeader('Content-Type', 'application/json');
        res.send(postsData);
    } catch (error) {
        // Se houver qualquer erro (ex: arquivo não encontrado), retorna 500
        console.error("Erro ao ler o arquivo JSON:", error);
        res.status(500).json({ message: "Erro interno do servidor ao carregar os posts." });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`🚀 Blog rodando em http://localhost:${port}`);
});
