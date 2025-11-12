// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');

    async function fetchPosts() {
        try {
            // A URL agora é apenas /posts
            const response = await fetch('/posts'); 
            
            if (!response.ok) {
                throw new Error(`Erro de rede ou API: ${response.statusText} (${response.status})`);
            }

            const posts = await response.json();
            postsContainer.innerHTML = ''; 

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
            postsContainer.innerHTML = `<p style="color: red;">Não foi possível carregar as publicações. Detalhe: ${error.message}</p>`;
        }
    }

    fetchPosts();
});
