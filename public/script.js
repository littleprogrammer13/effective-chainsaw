// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');

    // Função para buscar os posts da API do Node.js
    async function fetchPosts() {
        try {
            // Faz a requisição GET para a rota que lê o JSON
            const response = await fetch('/data/posts');
            
            // Verifica se a requisição foi bem-sucedida (status 200)
            if (!response.ok) {
                throw new Error(`Erro de rede: ${response.statusText}`);
            }

            // Converte a resposta para JSON
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
                // Nota: O 'Ler Mais' aqui é uma simulação simples. Em um blog real, levaria a outra página HTML.
                
                postsContainer.appendChild(postCard);
            });

        } catch (error) {
            console.error('Erro ao carregar os dados do blog:', error);
            postsContainer.innerHTML = '<p style="color: red;">Não foi possível carregar as publicações.</p>';
        }
    }

    fetchPosts();
});
