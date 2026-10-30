const API_URL = 'https://dummyjson.com/products';
let currentProducts = [];
let favorites = JSON.parse(localStorage.getItem('favoritos_trabalho1')) || [];

const productGrid = document.getElementById('productGrid');
const favoritesGrid = document.getElementById('favoritesGrid');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const statusMessage = document.getElementById('statusMessage');
const productModal = document.getElementById('productModal');
const modalDetails = document.getElementById('modalDetails');
const closeBtn = document.querySelector('.close-btn');

// Função para buscar produtos na API
async function fetchProducts(query = '') {
    try {
        statusMessage.textContent = 'Carregando produtos...';
        statusMessage.style.color = '#333';
        productGrid.innerHTML = '';

        const url = query ? `${API_URL}/search?q=${encodeURIComponent(query)}` : API_URL;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Falha na comunicação com o servidor.');
        }

        const data = await response.json();
        currentProducts = data.products;

        statusMessage.textContent = '';
        renderProducts(currentProducts, productGrid, false);
    } catch (error) {
        statusMessage.textContent = 'Erro ao carregar os dados. A API pode estar indisponível.';
        statusMessage.style.color = '#e74c3c';
        console.error('Erro HTTP:', error);
    }
}

// Função para renderizar os cartões de produtos
function renderProducts(products, container, isFavoriteSection) {
    container.innerHTML = '';

    if (products.length === 0) {
        const emptyMsg = isFavoriteSection
            ? 'Nenhum produto adicionado aos favoritos ainda.'
            : 'Nenhum produto encontrado para exibição.';
        container.innerHTML = `<p>${emptyMsg}</p>`;
        return;
    }

    products.forEach(product => {
        const isFav = favorites.some(f => f.id === product.id);
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$ ${product.price.toFixed(2)}</p>
            <div class="card-actions">
                <button onclick="showDetails(${product.id}, ${isFavoriteSection})">Detalhes</button>
                <button onclick="toggleFavorite(${product.id}, ${isFavoriteSection})">
                    ${isFav ? 'Remover' : '⭐ Favoritar'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Função para adicionar/remover favoritos com persistência
function toggleFavorite(id, isFavoriteSection) {
    const dataSource = isFavoriteSection ? favorites : currentProducts;
    const product = dataSource.find(p => p.id === id);

    const favoriteIndex = favorites.findIndex(f => f.id === id);

    if (favoriteIndex > -1) {
        favorites.splice(favoriteIndex, 1);
    } else if (product) {
        favorites.push({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            category: product.category,
            description: product.description,
            rating: product.rating
        });
    }

    localStorage.setItem('favoritos_trabalho1', JSON.stringify(favorites));

    // Atualiza a tela imediatamente
    renderProducts(currentProducts, productGrid, false);
    renderFavorites();
}

function renderFavorites() {
    renderProducts(favorites, favoritesGrid, true);
}

// Mostrar detalhes do produto no modal
function showDetails(id, isFavoriteSection) {
    const dataSource = isFavoriteSection ? favorites : currentProducts;
    const product = dataSource.find(p => p.id === id);

    if (!product) return;

    modalDetails.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.thumbnail}" alt="${product.title}" style="width:100%; height:200px; object-fit:contain; margin: 1rem 0;">
        <p><strong>Categoria:</strong> ${product.category}</p>
        <p><strong>Descrição:</strong> ${product.description}</p>
        <p><strong>Preço:</strong> $ ${product.price.toFixed(2)}</p>
        <p><strong>Avaliação:</strong> ⭐ ${product.rating}</p>
    `;
    productModal.classList.remove('hidden');
}

// Eventos da interface e do modal
closeBtn.addEventListener('click', () => {
    productModal.classList.add('hidden');
});

window.addEventListener('click', (event) => {
    if (event.target === productModal) {
        productModal.classList.add('hidden');
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !productModal.classList.contains('hidden')) {
        productModal.classList.add('hidden');
    }
});

// Evento de formulário (submit) para pesquisa
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchProducts(searchInput.value.trim());
});

// Inicialização automática ao abrir o documento
fetchProducts();
renderFavorites();
