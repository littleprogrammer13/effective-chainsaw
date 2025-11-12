// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');

    // Função para buscar os posts da API/JSON
    async function fetchPosts() {
        try {
            // Requisição GET para o caminho do arquivo JSON exposto pelo Express
            const response = await fetch('/data/posts.json');
            
            if (!response.ok) {
                // Se a requisição falhar (ex: 404, 500), lança um erro
                throw new Error(`Erro de rede ou arquivo não encontrado: ${response.statusText} (${response.status})`);
            }

            // Converte a resposta para um objeto JavaScript
            const posts = await response.json();
            
            // Limpa o conteúdo de "Carregando posts..."
            postsContainer.innerHTML = ''; 

            // Itera sobre cada post e cria o HTML
            posts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.className = 'post-card';
                
                postCard.innerHTML = `
                    <h3>${post.title}</h3>
                    <p class="date">**Publicado em:** ${post.date}</p>
                    <p>${post.summary}</p>
                    <button onclick="alert('${post.content.replace(/'/g, "\\'")}')">Ler Mais</button>
                `; 
                
                postsContainer.appendChild(postCard);
            });

        } catch (error) {
            console.error('Erro ao carregar os dados do blog:', error);
            postsContainer.innerHTML = `
                <p style="color: red;">Não foi possível carregar as publicações.</p>
                <p style="font-size: small;">Detalhe: ${error.message}</p>
            `;
        }
    }

    fetchPosts();
});
