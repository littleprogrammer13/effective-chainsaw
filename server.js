// server.js

const express = require('express');
const path = require('path');
const fs = require('fs'); // Para ler o arquivo JSON
const app = express();
const port = 3000;

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota da API para retornar todos os posts
app.get('/api/posts', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'posts.json');
    
    // Ler o arquivo JSON de forma síncrona (simples para um blog pequeno)
    try {
        const postsData = fs.readFileSync(filePath, 'utf8');
        // Retorna os dados como JSON
        res.json(JSON.parse(postsData));
    } catch (error) {
        console.error("Erro ao ler o arquivo JSON:", error);
        res.status(500).json({ message: "Erro ao carregar os posts." });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`🚀 Blog rodando em http://localhost:${port}`);
});
