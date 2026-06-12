const apiKey = 'YOUR_GIPHY_API_KEY'; // Substitua pela sua chave da Giphy
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const gifContainer = document.getElementById('gif-container');

async function fetchGifs(query) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=12&rating=g`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayGifs(data.data);
    } catch (error) {
        console.error('Erro ao buscar GIFs:', error);
    }
}

function displayGifs(gifs) {
    gifContainer.innerHTML = ''; // Limpa os GIFs anteriores
    gifs.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        gifContainer.appendChild(img);
    });
}

// Buscar GIFs ao clicar no botão
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) fetchGifs(query);
});

// Buscar GIFs ao pressionar Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) fetchGifs(query);
    }
});

// Carregar GIFs iniciais sobre "natureza"
fetchGifs('natureza, meio ambiente, floresta');
