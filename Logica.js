/**
  * OMBELA MARKET - LÓGICA DA APLICAÇÃO
 
// ==================== ESTADO GLOBAL DA APLICAÇÃO ====================

/**
 * AppState - Gerenciador centralizado de estado
 * Implementa Observer Pattern para notificação de mudanças
 * Qualquer alteração no estado notifica automaticamente a UI
 */
const AppState = {
    currentPage: 'home',
    user: null,
    cart: [],
    selectedCategory: 'Todos',
    selectedProduct: null, // Produto selecionado para visualização detalhada
    
    // Observer Pattern: lista de funções observadoras
    listeners: [],
    
    /**
     * Adiciona um observador (listener) ao estado
     */
    subscribe(listener) {
        this.listeners.push(listener);
    },
    
    /**
     * Notifica todos os observadores sobre mudanças
     */
    notify() {
        this.listeners.forEach(listener => listener());
    }
};

// ==================== SERVICES (CAMADA DE DADOS) ====================

/**
 * ProductService - Singleton Pattern
 * Responsável APENAS por fornecer dados de produtos (SRP)
 * Centraliza toda a lógica relacionada a produtos
 */
const ProductService = {
    // Base de dados de produtos com imagens
    products: [
        { 
            id: 1, 
            name: "iPhone 13 Pro Max", 
            price: 650000, 
            category: "Electrónica",
            image: "Img/iPhone.jpeg",
            description: "iPhone 13 Pro Max com tela Super Retina XDR de 6.7 polegadas, chip A15 Bionic e sistema de câmera Pro. Perfeito para fotos, vídeos em 4K e desempenho excepcional.",
            specifications: {
                "Tela": "6.7\" Super Retina XDR",
                "Chip": "A15 Bionic",
                "Câmera": "Pro 12MP tripla",
                "Armazenamento": "256GB",
                "Bateria": "Até 28h de vídeo",
                "5G": "Sim"
            },
            stock: 8,
            seller: "Daniel Sacur",
            rating: 4.9
        },
        { 
            id: 2, 
            name: "Fones Bluetooth JBL", 
            price: 35000, 
            category: "Acessórios",
            image: "Img/JBL1.jpeg",
            description: "Fones de ouvido Bluetooth JBL com som de alta qualidade, bateria de longa duração e design confortável. Ideal para música e chamadas.",
            specifications: {
                "Conectividade": "Bluetooth 5.0",
                "Bateria": "Até 20h",
                "Peso": "250g",
                "Cor": "Preto",
                "Microfone": "Embutido"
            },
            stock: 25,
            seller: "Divino Bussiness",
            rating: 4.6
        },
        { 
            id: 7, 
            name: "Kit de Maquilhagem Profissional", 
            price: 50000, 
            category: "Cosmeticos",
            image: "Img/Kitm.jpeg",
            description: "Kit completo de maquilhagem profissional com paleta de sombras, bases, batons e pincéis. Produtos de alta qualidade para todos os tipos de pele.",
            specifications: {
                "Itens": "35 peças",
                "Sombras": "20 cores",
                "Batons": "6 cores",
                "Pincéis": "12 unidades",
                "Hipoalergênico": "Sim"
            },
            stock: 12,
            seller: "Anadia Express",
            rating: 4.8
        },
        { 
            id: 4, 
            name: "Laptop Dell", 
            price: 280000, 
            category: "Computadores",
            image: "Img/Dell.jpeg",
            description: "Notebook Dell com processador Intel Core i5, ideal para trabalho, estudos e entretenimento. Design fino e leve com tela Full HD.",
            specifications: {
                "Processador": "Intel Core i5",
                "RAM": "8GB DDR4",
                "Armazenamento": "512GB SSD",
                "Tela": "15.6\" Full HD",
                "Sistema": "Windows 11"
            },
            stock: 5,
            seller: "Daniel Sacur",
            rating: 4.7
        },
        { 
            id: 5, 
            name: "Teclado Mecânico RGB", 
            price: 45000, 
            category: "Acessórios",
            image: "Img/Tec.jpg",
            description: "Teclado mecânico gamer com iluminação RGB personalizável e design anti-ghosting. Perfeito para jogos e digitação.",
            specifications: {
                "Switches": "Mecânico",
                "Iluminação": "RGB 16.8M cores",
                "Conectividade": "USB",
                "Anti-ghosting": "Full N-Key",
                "Layout": "ABNT2"
            },
            stock: 18,
            seller: "Daniel Sacur",
            rating: 4.5
        },
        { 
            id: 6, 
            name: "PlayStation 5", 
            price: 450000, 
            category: "Electrónica",
            image: "Img/Play.jpeg",
            description: "Console PlayStation 5 com SSD ultra-rápido, gráficos em 4K e Ray Tracing. Inclui controle DualSense com feedback háptico.",
            specifications: {
                "GPU": "10.28 TFLOPS",
                "SSD": "825GB",
                "Resolução": "Até 4K",
                "Ray Tracing": "Sim",
                "Controle": "DualSense incluído"
            },
            stock: 3,
            seller: "Divino Bussiness",
            rating: 5.0
        },
        { 
            id: 3, 
            name: "Fones Bluetooth Oraimo", 
            price: 15000, 
            category: "Acessórios",
            image: "Img/Oraimo1.jpeg",
            description: "Fones Bluetooth Oraimo com ótimo custo-benefício, som de qualidade e design moderno. Perfeito para o dia a dia.",
            specifications: {
                "Conectividade": "Bluetooth 5.0",
                "Bateria": "Até 12h",
                "Peso": "180g",
                "Cor": "Preto",
                "Tipo": "Over-ear"
            },
            stock: 30,
            seller: "Anadia Express",
            rating: 4.3
        },
        { 
            id: 8, 
            name: "Ténis Nike Air Max", 
            price: 25000,
            category: "Calçados",
            image: "Img/Nike.jpeg",
            description: "Tênis Nike Air Max com tecnologia de amortecimento, design moderno e confortável. Nº 41 Uni-Sexo, ideal para uso diário e práticas esportivas.",
            specifications: {
                "Tamanho": "Nº 41",
                "Gênero": "Unissex",
                "Material": "Mesh + Sintético",
                "Sola": "Borracha",
                "Cores": "Preto/Branco"
            },
            stock: 15,
            seller: "Anadia Express",
            rating: 4.6
        },
        { 
            id: 9, 
            name: "Tablet Samsung Galaxy Tab S8", 
            price: 150000, 
            category: "Electrónica",
            image: "Img/Tablet.jpeg",
            description: "Tablet Samsung Galaxy Tab S8 com tela de 11 polegadas e desempenho premium para trabalho e entretenimento.",
            specifications: {
                "Tela": "11\" LCD",
                "Processador": "Snapdragon",
                "RAM": "6GB",
                "Armazenamento": "128GB",
                "Bateria": "8000mAh"
            },
            stock: 7,
            seller: "Divino Bussiness",
            rating: 4.7
        },
        { 
            id: 10, 
            name: "Câmera Digital Canon EOS", 
            price: 320000, 
            category: "Electrónica",
            image: "Img/Canon.jpg",
            description: "Câmera DSLR Canon EOS com sensor de alta resolução, vídeo Full HD e lente incluída. Ideal para fotógrafos iniciantes e intermediários.",
            specifications: {
                "Sensor": "CMOS 24.1MP",
                "Vídeo": "Full HD 1080p",
                "ISO": "100-6400",
                "Lente": "18-55mm incluída",
                "Tela": "3\" LCD"
            },
            stock: 4,
            seller: "Divino Bussines",
            rating: 4.8
        },
        { 
            id: 11, 
            name: "Mac Book", 
            price: 1200000, 
            category: "Computadores",
            image: "Img/Apple-MacBook-Pro-2up-231030_Full-Bleed-Image.jpg.large_2x.jpg",
            description: "MacBook Pro com chip M2, desempenho excepcional e tela Retina. Ideal para profissionais criativos e desenvolvedores.",
            specifications: {
                "Chip": "Apple M2",
                "RAM": "16GB",
                "Armazenamento": "512GB SSD",
                "Tela": "13.3\" Retina",
                "Bateria": "Até 20h"
            },
            stock: 2,
            seller: "Daniel Sacur",
            rating: 5.0
        },
        { 
            id: 12, 
            name: "Perfumes", 
            price: 8000, 
            category: "Cosmeticos",
            image: "Img/Cosm.jpeg",
            description: "Kit de cosméticos variados incluindo cremes, perfumes e produtos de cuidados pessoais. Qualidade garantida.",
            specifications: {
                "Itens": "10 peças",
                "Tipo": "Misto",
                "Validade": "24 meses",
                "Origem": "Importado",
                "Testado": "Dermatologicamente"
            },
            stock: 40,
            seller: "Anadia Express",
            rating: 4.2
        },
        { 
            id: 13, 
            name: "Laptop HP", 
            price: 200000, 
            category: "Computadores",
            image: "Img/White-Minimalist-Girl-Quote-Instagram-Post3-430x430.jpg",
            description: "Laptop HP com bom desempenho para estudos e trabalho. Leve e portátil com bateria de longa duração.",
            specifications: {
                "Processador": "Intel Core i3",
                "RAM": "4GB",
                "Armazenamento": "256GB SSD",
                "Tela": "14\" HD",
                "Sistema": "Windows 11"
            },
            stock: 10,
            seller: "Divino Bussiness",
            rating: 4.3
        }
    ],
    
    /**
     * Retorna todos os produtos
     */
    getProducts() {
        return this.products;
    },
    
    /**
     * Busca produto por ID
     */
    getProductById(id) {
        return this.products.find(p => p.id === id);
    },
    
    /**
     * Retorna categorias únicas
     */
    getCategories() {
        const categories = ['Todos', ...new Set(this.products.map(p => p.category))];
        return categories;
    },
    
    /**
     * Retorna lista de vendedores únicos
     */
    getSellers() {
        return [...new Set(this.products.map(p => p.seller))];
    },
    
    /**
     * Retorna produtos de um vendedor específico
     */
    getProductsBySeller(sellerName) {
        return this.products.filter(p => p.seller === sellerName);
    },
    
    /**
     * Adiciona um novo produto ao catálogo
     * @param {Object} productData - Dados do novo produto
     * @returns {Object} - Produto adicionado
     */
    addProduct(productData) {
        const newId = Math.max(...this.products.map(p => p.id), 0) + 1;
        const newProduct = {
            id: newId,
            ...productData,
            rating: productData.rating || 0
        };
        this.products.push(newProduct);
        return newProduct;
    },
    
    /**
     * Atualiza um produto existente
     * @param {number} productId - ID do produto
     * @param {Object} updates - Dados atualizados
     * @returns {Object|null} - Produto atualizado ou null se não encontrado
     */
    updateProduct(productId, updates) {
        const index = this.products.findIndex(p => p.id === productId);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updates };
            return this.products[index];
        }
        return null;
    },
    
    /**
     * Remove um produto do catálogo
     * @param {number} productId - ID do produto
     * @returns {boolean} - True se removido com sucesso
     */
    deleteProduct(productId) {
        const index = this.products.findIndex(p => p.id === productId);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }
};

/**
 * AuthService - Singleton Pattern
 * Responsável APENAS por autenticação de usuários (SRP)
 */
const AuthService = {
    /**
     * Realiza autenticação do usuário
     * @param {string} email - Email do usuário
     * @param {string} password - Senha do usuário
     * @returns {Object|null} Dados do usuário ou null se falhar
     */
    login(email, password) {
        // Login de cliente demo
        if (email === "admin@ombela.com" && password === "1234") {
            return { name: "Utilizador Demo", email, role: "customer" };
        }
        
        // Login de vendedor demo
        if (email === "vendedor@ombela.com" && password === "1234") {
            return { 
                name: "Daniel Sacur", 
                email, 
                role: "seller",
                storeName: "Daniel Sacur",
                rating: 4.8,
                totalSales: 127
            };
        }
        
        return null;
    }
};

/**
 * OrderService - Singleton Pattern
 * Responsável APENAS por dados de encomendas (SRP)
 */
const OrderService = {
    // Simulação de encomendas do usuário
    orders: [
        {
            id: 1,
            date: "2025-01-20",
            status: "Pendente",
            total: 45000,
            items: [{ name: "Fones Bluetooth", quantity: 3 }]
        },
        {
            id: 2,
            date: "2025-01-18",
            status: "Enviado",
            total: 78000,
            items: [
                { name: "Mouse Gamer", quantity: 2 },
                { name: "Teclado RGB", quantity: 1 }
            ]
        },
        {
            id: 3,
            date: "2025-01-15",
            status: "Entregue",
            total: 120000,
            items: [{ name: "Telemóvel Samsung", quantity: 1 }]
        }
    ],
    
    /**
     * Retorna todas as encomendas
     */
    getOrders() {
        return this.orders;
    }
};

// ==================== FUNÇÕES DO CARRINHO ====================

/**
 * Adiciona produto ao carrinho
 * Implementa lógica de incremento se produto já existir
 * @param {Object} product - Produto a ser adicionado
 */
function addToCart(product) {
    const existing = AppState.cart.find(item => item.id === product.id);
    
    if (existing) {
        existing.quantity++;
    } else {
        AppState.cart.push({ ...product, quantity: 1 });
    }
    
    showToast(`${product.name} adicionado ao carrinho!`, 'success');
    updateCartBadge();
    AppState.notify();
}

/**
 * Remove produto do carrinho
 * @param {number} id - ID do produto a remover
 */
function removeFromCart(id) {
    AppState.cart = AppState.cart.filter(item => item.id !== id);
    updateCartBadge();
    AppState.notify();
    showToast('Produto removido do carrinho', 'info');
}

/**
 * Atualiza quantidade de produto no carrinho
 * @param {number} id - ID do produto
 * @param {number} quantity - Nova quantidade
 */
function updateQuantity(id, quantity) {
    const item = AppState.cart.find(item => item.id === id);
    if (item && quantity > 0) {
        item.quantity = quantity;
        AppState.notify();
    }
}

/**
 * Limpa todo o carrinho
 */
function clearCart() {
    AppState.cart = [];
    updateCartBadge();
    AppState.notify();
}

/**
 * Calcula o total do carrinho
 * @returns {number} Valor total
 */
function getCartTotal() {
    return AppState.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Atualiza badge visual do carrinho (Observer Pattern)
 * Mostra quantidade de itens no carrinho
 */
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const count = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

// ==================== FUNÇÕES DE AUTENTICAÇÃO ====================

/**
 * Realiza login do usuário
 * @param {string} email - Email
 * @param {string} password - Senha
 * @returns {boolean} Sucesso do login
 */
function login(email, password) {
    const user = AuthService.login(email, password);
    
    if (user) {
        AppState.user = user;
        updateAuthUI();
        showToast("Login realizado com sucesso!", 'success');
        navigateTo('home');
        return true;
    } else {
        showToast("Credenciais inválidas", 'error');
        return false;
    }
}

/**
 * Realiza logout do usuário
 */
function logout() {
    AppState.user = null;
    clearCart();
    updateAuthUI();
    showToast("Logout realizado", 'info');
    navigateTo('home');
}

/**
 * Atualiza interface de autenticação
 * Mostra/oculta informações do usuário
 */
function updateAuthUI() {
    const authBtn = document.getElementById('authBtn');
    const userInfo = document.getElementById('userInfo');
    const sellerDashboardBtn = document.getElementById('sellerDashboardBtn');
    
    if (AppState.user) {
        // Exibe nome do usuário/loja
        const displayName = AppState.user.role === 'seller' 
            ? ` ${AppState.user.storeName}` 
            : `Olá, ${AppState.user.name}`;
        
        userInfo.textContent = displayName;
        userInfo.classList.remove('hidden');
        
        // Se for vendedor, mostra botão da loja
        if (AppState.user.role === 'seller' && sellerDashboardBtn) {
            sellerDashboardBtn.classList.remove('hidden');
        } else if (sellerDashboardBtn) {
            sellerDashboardBtn.classList.add('hidden');
        }
        
        authBtn.textContent = ' Logout';
        authBtn.onclick = logout;
    } else {
        userInfo.classList.add('hidden');
        if (sellerDashboardBtn) {
            sellerDashboardBtn.classList.add('hidden');
        }
        userInfo.onclick = null;
        authBtn.innerHTML = '<span></span> Login';
        authBtn.onclick = () => navigateTo('login');
    }
}

// ==================== SISTEMA DE NOTIFICAÇÕES ====================

/**
 * Exibe notificação toast
 * @param {string} message - Mensagem a exibir
 * @param {string} type - Tipo: 'success', 'error', 'info'
 */
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    
    // Ícones por tipo
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span style="font-size: 24px;">${icons[type]}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Remove após 3 segundos
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== NAVEGAÇÃO ====================

/**
 * Navega para uma página
 * @param {string} page - Nome da página
 */
function navigateTo(page) {
    AppState.currentPage = page;
    AppState.notify();
}

/**
 * Renderiza a página atual
 * Implementa roteamento SPA (Single Page Application)
 */
function renderPage() {
    const content = document.getElementById('mainContent');
    
    switch(AppState.currentPage) {
        case 'home':
            content.innerHTML = renderHome();
            break;
        case 'catalog':
            content.innerHTML = renderCatalog();
            break;
        case 'product-detail':
            content.innerHTML = renderProductDetail();
            break;
        case 'cart':
            content.innerHTML = renderCart();
            break;
        case 'checkout':
            content.innerHTML = renderCheckout();
            break;
        case 'orders':
            content.innerHTML = renderOrders();
            break;
        case 'seller-dashboard':
            content.innerHTML = renderSellerDashboard();
            break;
        case 'seller':
            content.innerHTML = renderSellerManagement();
            break;
        case 'login':
            content.innerHTML = renderLogin();
            break;
        default:
            content.innerHTML = renderHome();
    }
}

// ==================== RENDERIZAÇÃO DE PÁGINAS ====================

/**
 * Renderiza página inicial (Home)
 */
function renderHome() {
    const featuredProducts = ProductService.getProducts().slice(0, 6);
    
    return `
        <!-- Hero Banner -->
        <div class="hero">
            <h1> Bem-vindo à Ombela Alpha</h1>
            <p>Descubra os melhores produtos com qualidade garantida</p>
            <button class="cta-btn" onclick="navigateTo('catalog')">
                Explorar Catálogo Completo
            </button>
        </div>

        <!-- Produtos em Destaque -->
        <h2 style="font-size: 32px; margin-bottom: 24px; color: var(--text-dark);">
            ⭐ Produtos em Destaque
        </h2>
        
        <div class="products-grid">
            ${featuredProducts.map(product => createProductCard(product)).join('')}
        </div>

        <!-- Seção de Benefícios -->
        <div style="margin-top: 48px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
            <div class="white-box" style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 12px;">🚚</div>
                <h3 style="margin-bottom: 8px;">Entrega Rápida</h3>
                <p style="color: var(--text-light);">Receba seus produtos em até 3 dias úteis</p>
            </div>
            <div class="white-box" style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 12px;">💳</div>
                <h3 style="margin-bottom: 8px;">Pagamento Seguro</h3>
                <p style="color: var(--text-light);">Múltiplas formas de pagamento</p>
            </div>
            <div class="white-box" style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 12px;">🛡️</div>
                <h3 style="margin-bottom: 8px;">Garantia Total</h3>
                <p style="color: var(--text-light);">30 dias para trocas e devoluções</p>
            </div>
        </div>
    `;
}

/**
 * Renderiza página do catálogo completo
 */
function renderCatalog() {
    const categories = ProductService.getCategories();
    const products = AppState.selectedCategory === 'Todos' 
        ? ProductService.getProducts()
        : ProductService.getProducts().filter(p => p.category === AppState.selectedCategory);
    
    return `
        <h1 style="font-size: 36px; margin-bottom: 12px;"> Catálogo Completo</h1>
        <p style="color: var(--text-light); margin-bottom: 32px;">
            Explore todos os ${ProductService.getProducts().length} produtos disponíveis
        </p>

        <!-- Filtros de Categoria -->
        <div class="filters-section">
            <strong style="margin-right: 8px;">Categorias:</strong>
            ${categories.map(cat => `
                <button 
                    class="filter-btn ${AppState.selectedCategory === cat ? 'active' : ''}"
                    onclick="filterByCategory('${cat}')"
                >
                    ${cat}
                </button>
            `).join('')}
        </div>

        <!-- Grid de Produtos -->
        <div class="products-grid">
            ${products.map(product => createProductCard(product)).join('')}
        </div>

        ${products.length === 0 ? `
            <div class="empty-state white-box">
                <div class="icon"></div>
                <h2>Nenhum produto encontrado</h2>
                <p>Tente selecionar outra categoria</p>
            </div>
        ` : ''}
    `;
}

/**
 * Cria card HTML de produto
 * @param {Object} product - Dados do produto
 * @returns {string} HTML do card
 */
function createProductCard(product) {
    // Calcula estrelas de rating
    const stars = '⭐'.repeat(Math.floor(product.rating || 0));
    
    // Verifica se o usuário é vendedor (vendedores NÃO podem adicionar ao carrinho)
    const isSeller = AppState.user && AppState.user.role === 'seller';
    
    return `
        <div class="product-card" onclick="viewProductDetail(${product.id})">
            <!-- Container da Imagem -->
            <div class="product-image-container">
                ${product.image ? `
                    <img 
                        src="${product.image}" 
                        alt="${product.name}"
                        class="product-image"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                    />
                    <div class="product-icon" style="display: none;">${product.icon || ''}</div>
                ` : `
                    <div class="product-icon">${product.icon || ''}</div>
                `}
                <span class="category-badge">${product.category}</span>
            </div>

            <!-- Informações do Produto -->
            <div class="product-info">
                <h3>${product.name}</h3>
                
                <!-- Rating e Vendedor -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 12px;">${stars || '⭐⭐⭐⭐'}</span>
                    <span style="font-size: 11px; color: var(--text-light);">
                        ${product.stock || 10} em estoque
                    </span>
                </div>
                
                <p class="product-category"> ${product.seller || 'Ombela Market'}</p>
                <p class="product-price">${product.price.toLocaleString()} Kz</p>
                
                <!-- Botão Adicionar ao Carrinho (DESABILITADO para vendedores) -->
                ${isSeller ? `
                    <button 
                        class="add-cart-btn"
                        style="opacity: 0.5; cursor: not-allowed; background: var(--text-light);"
                        title="Vendedores não podem adicionar produtos ao carrinho"
                        disabled
                    >
                        <span></span>
                        <span></span>
                    </button>
                ` : `
                    <button 
                        class="add-cart-btn"
                        onclick="event.stopPropagation(); addToCart(ProductService.getProductById(${product.id}))"
                    >
                        <span>🛒</span>
                        <span>Adicionar ao Carrinho</span>
                    </button>
                `}
                
                <!-- Link para detalhes -->
                <button 
                    class="filter-btn"
                    style="width: 100%; margin-top: 8px; font-size: 13px;"
                    onclick="event.stopPropagation(); viewProductDetail(${product.id})"
                >
                    Ver Detalhes
                </button>
            </div>
        </div>
    `;
}

/**
 * Navega para página de detalhes do produto
 * @param {number} productId - ID do produto
 */
function viewProductDetail(productId) {
    AppState.selectedProduct = productId;
    navigateTo('product-detail');
}

/**
 * Filtra produtos por categoria
 * @param {string} category - Nome da categoria
 */
function filterByCategory(category) {
    AppState.selectedCategory = category;
    AppState.notify();
}

/**
 * Renderiza página do carrinho
 */
function renderCart() {
    if (AppState.cart.length === 0) {
        return `
            <div class="empty-state white-box">
                <div class="icon">🛒</div>
                <h2>Seu carrinho está vazio</h2>
                <p>Adicione produtos ao carrinho para continuar comprando</p>
                <button class="cta-btn" style="margin-top: 24px;" onclick="navigateTo('catalog')">
                    Ir para o Catálogo
                </button>
            </div>
        `;
    }

    const total = getCartTotal();

    return `
        <h1 style="font-size: 36px; margin-bottom: 12px;">🛒 Meu Carrinho</h1>
        <p style="color: var(--text-light); margin-bottom: 32px;">
            ${AppState.cart.length} ${AppState.cart.length === 1 ? 'produto' : 'produtos'} no carrinho
        </p>

        <!-- Lista de Produtos -->
        <div class="white-box" style="margin-bottom: 24px;">
            ${AppState.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p style="color: var(--primary); font-weight: bold;">
                            ${item.price.toLocaleString()} Kz
                        </p>
                    </div>
                    
                    <div class="cart-item-controls">
                        <input 
                            type="number" 
                            class="quantity-input" 
                            value="${item.quantity}" 
                            min="1"
                            onchange="updateQuantity(${item.id}, parseInt(this.value))"
                        />
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">
                             Remover
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Resumo do Carrinho -->
        <div class="white-box">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h3 style="font-size: 24px;">Total:</h3>
                <strong style="font-size: 32px; color: var(--accent);">
                    ${total.toLocaleString()} Kz
                </strong>
            </div>
            
            <button class="cta-btn" style="width: 100%;" onclick="navigateTo('checkout')">
                💳 Finalizar Compra
            </button>
            
            <button 
                class="filter-btn" 
                style="width: 100%; margin-top: 12px;" 
                onclick="clearCart()"
            >
                🗑️ Limpar Carrinho
            </button>
        </div>
    `;
}

/**
 * Renderiza página de checkout (finalização)
 */
function renderCheckout() {
    const total = getCartTotal();

    return `
        <h1 style="font-size: 36px; margin-bottom: 12px;">💳 Finalizar Compra</h1>
        <p style="color: var(--text-light); margin-bottom: 32px;">
            Complete os dados para finalizar sua encomenda
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <!-- Formulário de Dados -->
            <div class="white-box">
                <h3 style="margin-bottom: 20px;">Dados de Entrega</h3>
                
                <form onsubmit="processPayment(event)">
                    <label class="form-label">Nome Completo</label>
                    <input type="text" id="checkoutName" class="form-input" required />
                    
                    <label class="form-label">Email</label>
                    <input type="email" id="checkoutEmail" class="form-input" required />
                    
                    <label class="form-label">Telefone</label>
                    <input type="tel" id="checkoutPhone" class="form-input" required />
                    
                    <label class="form-label">Endereço</label>
                    <input type="text" id="checkoutAddress" class="form-input" required />
                    
                    <label class="form-label">Cidade</label>
                    <input type="text" id="checkoutCity" class="form-input" required />
                    
                    <button type="submit" class="cta-btn" style="width: 100%; margin-top: 16px;">
                         Confirmar Pagamento
                    </button>
                </form>
                
                <p style="margin-top: 16px; font-size: 12px; color: var(--text-light); text-align: center;">
                    🔒 Seus dados estão seguros e protegidos
                </p>
            </div>

            <!-- Resumo da Compra -->
            <div class="white-box">
                <h3 style="margin-bottom: 16px;"> Resumo da Compra</h3>
                
                ${AppState.cart.map(item => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border);">
                        <div>
                            <p style="font-weight: 500;">${item.name}</p>
                            <p style="color: var(--text-light); font-size: 14px;">
                                ${item.price.toLocaleString()} Kz × ${item.quantity}
                            </p>
                        </div>
                        <strong style="color: var(--primary);">
                            ${(item.price * item.quantity).toLocaleString()} Kz
                        </strong>
                    </div>
                `).join('')}

                <hr style="margin: 16px 0; border: none; border-top: 2px solid var(--border);" />

                <div style="display: flex; justify-content: space-between; font-size: 20px;">
                    <strong>Total:</strong>
                    <strong style="color: var(--accent);">${total.toLocaleString()} Kz</strong>
                </div>
            </div>
        </div>
    `;
}

/**
 * Processa pagamento (simulação)
 * @param {Event} event - Evento do formulário
 */
function processPayment(event) {
    event.preventDefault();
    
    const email = document.getElementById('checkoutEmail').value;
    
    clearCart();
    showToast("Pagamento realizado com sucesso!", 'success');
    
    // Mostra confirmação
    document.getElementById('mainContent').innerHTML = `
        <div class="empty-state white-box">
            <div style="font-size: 80px; margin-bottom: 24px;"></div>
            <h2 style="font-size: 32px; margin-bottom: 16px; color: var(--primary);">
                Pagamento Realizado com Sucesso!
            </h2>
            <p style="font-size: 18px; color: var(--text-light); margin-bottom: 32px;">
                Sua encomenda foi confirmada e será processada em breve.
            </p>
            <p style="margin-bottom: 8px;"> Um email de confirmação foi enviado para ${email}</p>
            <p style="color: var(--text-light);"> Acompanhe seu pedido na página de Encomendas</p>
            
            <button class="cta-btn" style="margin-top: 32px;" onclick="navigateTo('orders')">
                Ver Encomendas
            </button>
        </div>
    `;
}

/**
 * Renderiza página de Encomendas
 */
function renderOrders() {
    const orders = OrderService.getOrders();

    const statusColors = {
        "Pendente": "var(--accent)",
        "Enviado": "var(--primary)",
        "Entregue": "#4CAF50"
    };

    return `
        <h1 style="font-size: 36px; margin-bottom: 12px;"> Minhas Encomendas</h1>
        <p style="color: var(--text-light); margin-bottom: 32px;">
            Acompanhe o estado das suas encomendas
        </p>

        <!-- Legenda de Status -->
        <div class="white-box" style="margin-bottom: 24px; display: flex; gap: 24px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background-color: var(--accent);"></div>
                <span style="font-size: 14px;">Pendente - Aguardando processamento</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background-color: var(--primary);"></div>
                <span style="font-size: 14px;">Enviado - Em trânsito</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #4CAF50;"></div>
                <span style="font-size: 14px;">Entregue - Concluído</span>
            </div>
        </div>

        <!-- Lista de Encomendas -->
        ${orders.map(order => `
            <div class="order-item">
                <div class="order-header">
                    <div>
                        <p style="font-size: 18px; font-weight: bold;">Pedido #${order.id}</p>
                        <p style="color: var(--text-light); font-size: 14px;"> ${order.date}</p>
                    </div>
                    <div class="status-badge" style="background-color: ${statusColors[order.status]};">
                        ${order.status}
                    </div>
                </div>

                <div style="margin-bottom: 12px; padding-top: 12px; border-top: 1px solid var(--border);">
                    ${order.items.map(item => `
                        <p style="color: var(--text-light); font-size: 14px; margin-bottom: 4px;">
                            • ${item.name} (x${item.quantity})
                        </p>
                    `).join('')}
                </div>

                <strong style="color: var(--accent); font-size: 18px;">
                    Total: ${order.total.toLocaleString()} Kz
                </strong>
            </div>
        `).join('')}
    `;
}

/**
 * Renderiza página de detalhes do produto
 */
function renderProductDetail() {
    const product = ProductService.getProductById(AppState.selectedProduct);
    
    if (!product) {
        return `
            <div class="empty-state white-box">
                <div class="icon">❌</div>
                <h2>Produto não encontrado</h2>
                <button class="cta-btn" onclick="navigateTo('catalog')">
                    Voltar ao Catálogo
                </button>
            </div>
        `;
    }
    
    const stars = '⭐'.repeat(Math.floor(product.rating || 4));
    const stockStatus = (product.stock || 0) > 10 ? '✅ Em estoque' : 
                       (product.stock || 0) > 0 ? '⚠️ Últimas unidades' : '❌ Fora de estoque';
    
    return `
        <!-- Breadcrumb -->
        <div style="margin-bottom: 24px; color: var(--text-light); font-size: 14px;">
            <a href="#" onclick="navigateTo('home')" style="color: var(--primary);">Início</a>
            <span> > </span>
            <a href="#" onclick="navigateTo('catalog')" style="color: var(--primary);">${product.category}</a>
            <span> > ${product.name}</span>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 40px;">
            <!-- Imagem do Produto -->
            <div class="white-box">
                <div style="width: 100%; height: 400px; background: linear-gradient(135deg, var(--primary-bg) 0%, #E8E4FF 100%); 
                            border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; 
                            overflow: hidden;">
                    ${product.image ? `
                        <img 
                            src="${product.image}" 
                            alt="${product.name}"
                            style="width: 100%; height: 100%; object-fit: cover;"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                        />
                        <div style="font-size: 120px; display: none;">${product.icon || '📦'}</div>
                    ` : `
                        <div style="font-size: 120px;">${product.icon || '📦'}</div>
                    `}
                </div>
            </div>
            
            <!-- Informações do Produto -->
            <div>
                <h1 style="font-size: 32px; margin-bottom: 12px;">${product.name}</h1>
                
                <!-- Rating e Categoria -->
                <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
                    <span style="font-size: 18px;">${stars}</span>
                    <span style="color: var(--text-light);">${product.rating || 4}/5</span>
                    <span class="category-badge" style="position: relative; top: 0; right: 0;">
                        ${product.category}
                    </span>
                </div>
                
                <!-- Preço -->
                <div class="white-box" style="background: var(--primary-bg); margin-bottom: 20px;">
                    <p style="font-size: 36px; color: var(--primary); font-weight: bold; margin-bottom: 8px;">
                        ${product.price.toLocaleString()} Kz
                    </p>
                    <p style="color: var(--text-light); font-size: 14px;">
                        ${stockStatus} • ${product.stock || 10} unidades disponíveis
                    </p>
                </div>
                
                <!-- Descrição -->
                <div class="white-box" style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 12px;"> Descrição</h3>
                    <p style="color: var(--text-dark); line-height: 1.6;">
                        ${product.description || 'Produto de qualidade da Ombela Alpha.'}
                    </p>
                </div>
                
                <!-- Vendedor -->
                <div class="white-box" style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 12px;"> Vendedor</h3>
                    <p style="font-size: 18px; font-weight: 600; color: var(--primary); margin-bottom: 4px;">
                        ${product.seller || 'Ombela Alpha'}
                    </p>
                    <p style="color: var(--text-light); font-size: 14px;">
                        Vendedor verificado
                    </p>
                </div>
                
                <!-- Botões de Ação -->
                <div style="display: flex; gap: 12px;">
                    ${AppState.user && AppState.user.role === 'seller' ? `
                        <button 
                            class="cta-btn" 
                            style="flex: 1; opacity: 0.5; cursor: not-allowed; background: var(--text-light);"
                            title="Vendedores não podem adicionar produtos ao carrinho"
                            disabled
                        >
                            
                        </button>
                    ` : `
                        <button 
                            class="cta-btn" 
                            style="flex: 1;"
                            onclick="addToCart(ProductService.getProductById(${product.id})); showToast('${product.name} adicionado!', 'success')"
                            ${(product.stock || 0) === 0 ? 'disabled' : ''}
                        >
                            🛒 Adicionar ao Carrinho
                        </button>
                    `}
                    <button 
                        class="filter-btn"
                        onclick="navigateTo('catalog')"
                    >
                        ← Voltar
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Especificações Técnicas -->
        ${product.specifications ? `
            <div class="white-box">
                <h2 style="font-size: 24px; margin-bottom: 20px;"> Especificações Técnicas</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                    ${Object.entries(product.specifications).map(([key, value]) => `
                        <div style="padding: 16px; background: var(--primary-bg); border-radius: var(--radius-md); 
                                    border-left: 4px solid var(--primary);">
                            <p style="font-size: 12px; color: var(--text-light); margin-bottom: 4px; font-weight: 600;">
                                ${key}
                            </p>
                            <p style="font-size: 16px; color: var(--text-dark); font-weight: 500;">
                                ${value}
                            </p>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        <!-- Produtos Relacionados -->
        <h2 style="font-size: 24px; margin-top: 48px; margin-bottom: 20px;">
             Produtos Relacionados
        </h2>
        <div class="products-grid">
            ${ProductService.getProducts()
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map(p => createProductCard(p))
                .join('')}
        </div>
    `;
}

/**
 * Renderiza página de Login
 */
function renderLogin() {
    return `
        <div style="max-width: 450px; margin: 60px auto;" class="white-box">
            <div style="text-align: center; margin-bottom: 32px;">
                <div style="font-size: 48px; margin-bottom: 12px;"></div>
                <h2 style="font-size: 28px; margin-bottom: 8px;">Login</h2>
                <p style="color: var(--text-light); font-size: 14px;">
                    Entre com sua conta Ombela Market
                </p>
            </div>

            <form onsubmit="handleLogin(event)">
                <label class="form-label">Email</label>
                <input 
                    type="email" 
                    id="loginEmail" 
                    class="form-input" 
                    placeholder="seu@email.com" 
                    required 
                />
                
                <label class="form-label">Senha</label>
                <input 
                    type="password" 
                    id="loginPassword" 
                    class="form-input" 
                    placeholder="********" 
                    required 
                />
                
                <button type="submit" class="cta-btn" style="width: 100%; margin-top: 20px;">
                     Entrar
                </button>
            </form>

            
        </div>
    `;
}

/**
 * RENDERIZA PÁGINA DE GESTÃO DO VENDEDOR
 * RESTRIÇÃO: Vendedores NÃO podem adicionar produtos ao carrinho
 */
function renderSellerManagement() {
    // Verifica se o usuário é vendedor
    if (!AppState.user || AppState.user.role !== 'seller') {
        return `
            <div class="empty-state white-box">
                <div class="icon"></div>
                <h2>Acesso Negado</h2>
                <p>Esta página é exclusiva para vendedores.</p>
                <button class="cta-btn" onclick="navigateTo('login')">Fazer Login</button>
            </div>
        `;
    }
    
    // Obtém produtos do vendedor
    const sellerProducts = ProductService.getProductsBySeller(AppState.user.storeName);
    const totalProducts = sellerProducts.length;
    const totalStock = sellerProducts.reduce((sum, p) => sum + (p.stock || 0), 0);
    const totalValue = sellerProducts.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
    
    // Busca encomendas relacionadas aos produtos do vendedor
    const sellerOrders = AppState.user.orders || [];
    const pendingOrders = sellerOrders.filter(o => o.status !== 'Entregue');
    
    return `
        <!-- Cabeçalho da Loja -->
        <div class="white-box" style="margin-bottom: 32px; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: white;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
                <div>
                    <h1 style="font-size: 36px; margin-bottom: 8px;"> ${AppState.user.storeName}</h1>
                    <p style="opacity: 0.9; font-size: 16px;">Gestão Completa da Loja</p>
                </div>
                <div style="text-align: right;">
                    <p style="font-size: 28px; margin-bottom: 4px;"> ${AppState.user.rating}</p>
                    <p style="opacity: 0.9; font-size: 14px;">${AppState.user.totalSales} vendas totais</p>
                </div>
            </div>
        </div>
        
        <!-- Estatísticas Rápidas -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 32px;">
            <div class="white-box" style="text-align: center; background: linear-gradient(135deg, #4CAF50 0%, #45A049 100%); color: white;">
                <div style="font-size: 36px; margin-bottom: 8px;"></div>
                <h3 style="font-size: 32px; margin-bottom: 4px;">${totalProducts}</h3>
                <p style="opacity: 0.9;">Produtos Cadastrados</p>
            </div>
            
            <div class="white-box" style="text-align: center; background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%); color: white;">
                <div style="font-size: 36px; margin-bottom: 8px;"></div>
                <h3 style="font-size: 32px; margin-bottom: 4px;">${totalStock}</h3>
                <p style="opacity: 0.9;">Itens em Estoque</p>
            </div>
            
            <div class="white-box" style="text-align: center; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: white;">
                <div style="font-size: 36px; margin-bottom: 8px;"></div>
                <h3 style="font-size: 24px; margin-bottom: 4px;">${totalValue.toLocaleString()} Kz</h3>
                <p style="opacity: 0.9;">Valor em Estoque</p>
            </div>
            
            <div class="white-box" style="text-align: center; background: linear-gradient(135deg, #FF6B6B 0%, #EE5A52 100%); color: white;">
                <div style="font-size: 36px; margin-bottom: 8px;"></div>
                <h3 style="font-size: 32px; margin-bottom: 4px;">${pendingOrders.length}</h3>
                <p style="opacity: 0.9;">Encomendas Pendentes</p>
            </div>
        </div>
        
        <!-- Botão Cadastrar Novo Produto -->
        <div style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <h2 style="font-size: 28px;"> Gestão de Produtos</h2>
            <button class="cta-btn" onclick="showAddProductForm()" style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 20px;"></span>
                <span>Cadastrar Novo Produto</span>
            </button>
        </div>
        
        <!-- Formulário de Cadastro de Produto (Inicialmente Oculto) -->
        <div id="addProductFormContainer" class="white-box hidden" style="margin-bottom: 32px; background: #F0FFF4; border: 2px solid var(--success);">
            <h3 style="font-size: 24px; margin-bottom: 20px; color: var(--success);">
                 Cadastrar Novo Produto
            </h3>
            <form id="addProductForm" onsubmit="handleAddProduct(event)">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <!-- Nome do Produto -->
                    <div>
                        <label class="form-label">Nome do Produto *</label>
                        <input type="text" id="newProductName" class="form-input" placeholder="Ex: iPhone 14 Pro" required />
                    </div>
                    
                    <!-- Preço -->
                    <div>
                        <label class="form-label">Preço (Kz) *</label>
                        <input type="number" id="newProductPrice" class="form-input" placeholder="Ex: 450000" min="1" required />
                    </div>
                    
                    <!-- Categoria -->
                    <div>
                        <label class="form-label">Categoria *</label>
                        <select id="newProductCategory" class="form-input" required>
                            <option value="">Selecione...</option>
                            <option value="Electrónica">Electrónica</option>
                            <option value="Acessórios">Acessórios</option>
                            <option value="Computadores">Computadores</option>
                            <option value="Cosmeticos">Cosmeticos</option>
                            <option value="Calçados">Calçados</option>
                            <option value="Roupa">Roupa</option>
                        </select>
                    </div>
                    
                    <!-- Estoque -->
                    <div>
                        <label class="form-label">Estoque (unidades) *</label>
                        <input type="number" id="newProductStock" class="form-input" placeholder="Ex: 10" min="0" required />
                    </div>
                    
                    <!-- Ícone (Emoji) -->
                    <div>
                        <label class="form-label">Ícone (Emoji)</label>
                        <input type="text" id="newProductIcon" class="form-input" placeholder="Ex: " maxlength="2" />
                    </div>
                </div>
                
                <!-- Upload de Imagem do Produto -->
                <div style="margin-top: 16px;">
                    <label class="form-label">Imagem do Produto</label>
                    <div style="display: grid; grid-template-columns: 1fr auto; gap: 16px; align-items: start;">
                        <div>
                            <!-- Input de arquivo para upload de imagem -->
                            <input 
                                type="file" 
                                id="newProductImageFile" 
                                class="form-input" 
                                accept="image/*"
                                onchange="previewProductImage(event, 'newProductImagePreview')"
                                style="padding: 8px;"
                            />
                            <small style="color: var(--text-light); display: block; margin-top: 4px;">
                                Selecione uma imagem (JPG, PNG, WEBP) ou deixe em branco para usar o ícone
                            </small>
                        </div>
                        <!-- Preview da imagem -->
                        <div id="newProductImagePreview" style="width: 120px; height: 120px; border: 2px dashed var(--border); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; background: var(--primary-bg); overflow: hidden;">
                            <span style="color: var(--text-light); font-size: 12px; text-align: center; padding: 8px;">Sem imagem</span>
                        </div>
                    </div>
                </div>
                
                <!-- Descrição -->
                <div style="margin-top: 16px;">
                    <label class="form-label">Descrição do Produto *</label>
                    <textarea id="newProductDescription" class="form-input" rows="3" placeholder="Descreva o produto detalhadamente..." required></textarea>
                </div>
                
                <!-- Especificações (JSON) -->
                <div style="margin-top: 16px;">
                    <label class="form-label">Especificações (Opcional - uma por linha)</label>
                    <textarea id="newProductSpecifications" class="form-input" rows="4" 
                        placeholder='Tela: 6.7" OLED&#10;Processador: A15 Bionic&#10;RAM: 6GB&#10;Câmera: 12MP tripla'></textarea>
                    <small style="color: var(--text-light);"> Digite cada especificação em uma linha no formato "Chave: Valor"</small>
                </div>
                
                <!-- Botões -->
                <div style="margin-top: 24px; display: flex; gap: 12px;">
                    <button type="submit" class="cta-btn" style="flex: 1;">
                         Cadastrar Produto
                    </button>
                    <button type="button" class="remove-btn" onclick="hideAddProductForm()" style="flex: 1; background: var(--text-light);">
                         Cancelar
                    </button>
                </div>
            </form>
        </div>
        
        <!-- Lista de Produtos do Vendedor -->
        <div class="white-box" style="margin-bottom: 32px;">
            <h3 style="font-size: 22px; margin-bottom: 20px;"> Meus Produtos (${totalProducts})</h3>
            
            ${sellerProducts.length === 0 ? `
                <div class="empty-state">
                    <div class="icon"></div>
                    <h3>Nenhum produto cadastrado</h3>
                    <p>Clique em "Cadastrar Novo Produto" para começar</p>
                </div>
            ` : `
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: var(--primary-bg); text-align: left;">
                                <th style="padding: 12px; border-bottom: 2px solid var(--border);">Produto</th>
                                <th style="padding: 12px; border-bottom: 2px solid var(--border);">Categoria</th>
                                <th style="padding: 12px; border-bottom: 2px solid var(--border);">Preço</th>
                                <th style="padding: 12px; border-bottom: 2px solid var(--border);">Estoque</th>
                                <th style="padding: 12px; border-bottom: 2px solid var(--border);">Avaliação</th>
                                <th style="padding: 12px; border-bottom: 2px solid var(--border); text-align: center;">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sellerProducts.map(product => `
                                <tr style="border-bottom: 1px solid var(--border);">
                                    <td style="padding: 12px;">
                                        <div style="display: flex; align-items: center; gap: 12px;">
                                            <span style="font-size: 24px;">${product.icon || ''}</span>
                                            <span style="font-weight: 600;">${product.name}</span>
                                        </div>
                                    </td>
                                    <td style="padding: 12px;">${product.category}</td>
                                    <td style="padding: 12px; font-weight: bold; color: var(--primary);">
                                        ${product.price.toLocaleString()} Kz
                                    </td>
                                    <td style="padding: 12px;">
                                        <span style="color: ${(product.stock || 0) <= 5 ? 'var(--error)' : 'var(--success)'}; font-weight: bold;">
                                            ${product.stock || 0} un.
                                        </span>
                                    </td>
                                    <td style="padding: 12px;"> ${product.rating || 0}</td>
                                    <td style="padding: 12px;">
                                        <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                                            <button onclick="showEditProductForm(${product.id})" 
                                                    style="padding: 6px 12px; background: var(--primary); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;"
                                                    title="Editar Produto">
                                                 Editar
                                            </button>
                                            <button onclick="confirmDeleteProduct(${product.id}, '${product.name}')" 
                                                    style="padding: 6px 12px; background: var(--error); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;"
                                                    title="Excluir Produto">
                                                 Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `}
        </div>
        
        <!-- Produtos com Estoque Baixo (Alerta) -->
        ${sellerProducts.filter(p => (p.stock || 0) <= 5 && (p.stock || 0) > 0).length > 0 ? `
            <div class="white-box" style="margin-bottom: 32px; background: #FFF3E0; border: 2px solid var(--accent);">
                <h3 style="color: var(--accent-strong); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 24px;">⚠️</span>
                    <span>Atenção: Produtos com Estoque Baixo</span>
                </h3>
                <div style="display: grid; gap: 12px;">
                    ${sellerProducts.filter(p => (p.stock || 0) <= 5 && (p.stock || 0) > 0).map(p => `
                        <div style="display: flex; justify-content: space-between; align-items: center; 
                                    padding: 12px; background: white; border-radius: var(--radius-sm);">
                            <span style="font-weight: 600;">${p.icon || ''} ${p.name}</span>
                            <span style="font-weight: bold; color: var(--error);">
                                Apenas ${p.stock || 0} ${(p.stock || 0) === 1 ? 'unidade' : 'unidades'}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        <!-- Produtos Sem Estoque (Alerta Crítico) -->
        ${sellerProducts.filter(p => (p.stock || 0) === 0).length > 0 ? `
            <div class="white-box" style="margin-bottom: 32px; background: #FFEBEE; border: 2px solid var(--error);">
                <h3 style="color: var(--error); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 24px;">🚨</span>
                    <span>Produtos Sem Estoque (Reposição Urgente)</span>
                </h3>
                <div style="display: grid; gap: 12px;">
                    ${sellerProducts.filter(p => (p.stock || 0) === 0).map(p => `
                        <div style="display: flex; justify-content: space-between; align-items: center; 
                                    padding: 12px; background: white; border-radius: var(--radius-sm);">
                            <span style="font-weight: 600;">${p.icon || ''} ${p.name}</span>
                            <span style="font-weight: bold; color: var(--error);">
                                ESGOTADO
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        <!-- Encomendas dos Clientes -->
        <div class="white-box">
            <h3 style="font-size: 22px; margin-bottom: 20px;">🔔 Encomendas Pendentes (${pendingOrders.length})</h3>
            
            ${pendingOrders.length === 0 ? `
                <div class="empty-state">
                    <div class="icon">✅</div>
                    <h3>Nenhuma encomenda pendente</h3>
                    <p>Todas as encomendas foram processadas</p>
                </div>
            ` : `
                ${pendingOrders.map(order => `
                    <div class="order-item">
                        <div class="order-header">
                            <div>
                                <h4 style="font-size: 16px; margin-bottom: 4px;">Encomenda #${order.id}</h4>
                                <p style="color: var(--text-light); font-size: 14px;">${order.date}</p>
                            </div>
                            <span class="status-badge" style="background: ${
                                order.status === 'Pendente' ? 'var(--warning)' : 
                                order.status === 'Processando' ? 'var(--primary)' : 
                                'var(--success)'
                            };">
                                ${order.status}
                            </span>
                        </div>
                        <div style="margin-top: 12px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">Produtos:</p>
                            <ul style="list-style: none; padding-left: 0;">
                                ${order.items.map(item => `
                                    <li style="padding: 4px 0; color: var(--text-light);">
                                        ${item.icon || ''} ${item.name} - ${item.quantity}x = ${item.total.toLocaleString()} Kz
                                    </li>
                                `).join('')}
                            </ul>
                            <p style="margin-top: 12px; font-size: 18px; font-weight: bold; color: var(--primary);">
                                Total: ${order.total.toLocaleString()} Kz
                            </p>
                        </div>
                    </div>
                `).join('')}
            `}
        </div>
    `;
}

/**
 * Renderiza Painel do Vendedor
 */
function renderSellerDashboard() {
    // Verifica se o usuário é vendedor
    if (!AppState.user || AppState.user.role !== 'seller') {
        return `
            <div class="empty-state white-box">
                <div class="icon"></div>
                <h2>Acesso Negado</h2>
                <p>Esta página é exclusiva para vendedores</p>
                <button class="cta-btn" onclick="navigateTo('home')">Voltar ao Início</button>
            </div>
        `;
    }
    
    const sellerProducts = ProductService.getProductsBySeller(AppState.user.storeName);
    const totalProducts = sellerProducts.length;
    const totalStock = sellerProducts.reduce((sum, p) => sum + (p.stock || 0), 0);
    const totalValue = sellerProducts.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
    const avgRating = totalProducts > 0 ? (sellerProducts.reduce((sum, p) => sum + (p.rating || 0), 0) / totalProducts).toFixed(1) : '0.0';
    
    return `
        <!-- Header do Painel -->
        <div class="white-box" style="margin-bottom: 32px; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: white;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h1 style="font-size: 36px; margin-bottom: 8px;"> ${AppState.user.storeName}</h1>
                    <p style="opacity: 0.9; font-size: 16px;">Painel do Vendedor</p>
                </div>
                <div style="text-align: right;">
                    <p style="font-size: 32px; margin-bottom: 4px;"> ${AppState.user.rating}</p>
                    <p style="opacity: 0.9; font-size: 14px;">${AppState.user.totalSales} vendas</p>
                </div>
            </div>
        </div>
        
        <!-- Estatísticas -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px;">
            <div class="white-box" style="text-align: center; background: linear-gradient(135deg, #4CAF50 0%, #45A049 100%); color: white;">
                <div style="font-size: 36px; margin-bottom: 8px;"></div>
                <h3 style="font-size: 32px; margin-bottom: 4px;">${totalProducts}</h3>
                <p style="opacity: 0.9;">Produtos</p>
            </div>
            
            <div class="white-box" style="text-align: center; background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%); color: white;">
                <div style="font-size: 36px; margin-bottom: 8px;"></div>
                <h3 style="font-size: 32px; margin-bottom: 4px;">${totalStock}</h3>
                <p style="opacity: 0.9;">Em Estoque</p>
            </div>
            
            <div class="white-box" style="text-align: center; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: white;">
                <div style="font-size: 36px; margin-bottom: 8px;"></div>
                <h3 style="font-size: 28px; margin-bottom: 4px;">${totalValue.toLocaleString()} Kz</h3>
                <p style="opacity: 0.9;">Valor Total</p>
            </div>
            
            <div class="white-box" style="text-align: center; background: linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%); color: white;">
                <div style="font-size: 36px; margin-bottom: 8px;"></div>
                <h3 style="font-size: 32px; margin-bottom: 4px;">${avgRating}</h3>
                <p style="opacity: 0.9;">Avaliação Média</p>
            </div>
        </div>
        
        <!-- Lista de Produtos do Vendedor -->
        <div class="white-box">
            <h2 style="font-size: 24px; margin-bottom: 20px;"> Meus Produtos (${totalProducts})</h2>
            
            <div class="products-grid">
                ${sellerProducts.map(product => createProductCard(product)).join('')}
            </div>
            
            ${sellerProducts.length === 0 ? `
                <div class="empty-state">
                    <div class="icon">📭</div>
                    <h3>Nenhum produto cadastrado</h3>
                    <p>Comece adicionando produtos à sua loja</p>
                </div>
            ` : ''}
        </div>
        
        <!-- Produtos com Estoque Baixo -->
        ${sellerProducts.filter(p => (p.stock || 0) <= 5).length > 0 ? `
            <div class="white-box" style="margin-top: 24px; background: #FFF3E0; border: 2px solid var(--accent);">
                <h3 style="color: var(--accent-strong); margin-bottom: 16px;">
                    ⚠️ Atenção: Produtos com Estoque Baixo
                </h3>
                <div style="display: grid; gap: 12px;">
                    ${sellerProducts.filter(p => (p.stock || 0) <= 5).map(p => `
                        <div style="display: flex; justify-content: space-between; align-items: center; 
                                    padding: 12px; background: white; border-radius: var(--radius-sm);">
                            <span>${p.icon || ''} ${p.name}</span>
                            <span style="font-weight: bold; color: var(--error);">
                                Apenas ${p.stock || 0} ${(p.stock || 0) === 1 ? 'unidade' : 'unidades'}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;
}

/**
 * FUNÇÕES DE GESTÃO DE PRODUTOS (VENDEDOR)
 */

/**
 
 * @param {Event} event - Evento de mudança do input file
 * @param {string} previewElementId - ID do elemento onde mostrar o preview
 */
function previewProductImage(event, previewElementId) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById(previewElementId);
    
    if (!file) {
        // Se não houver arquivo, volta ao estado inicial
        previewContainer.innerHTML = '<span style="color: var(--text-light); font-size: 12px; text-align: center; padding: 8px;">Sem imagem</span>';
        return;
    }
    
    // Valida se é uma imagem
    if (!file.type.startsWith('image/')) {
        showToast('Por favor, selecione apenas arquivos de imagem', 'error');
        event.target.value = '';
        return;
    }
    
    // Valida tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB em bytes
    if (file.size > maxSize) {
        showToast('A imagem deve ter no máximo 5MB', 'error');
        event.target.value = '';
        return;
    }
    
    // Lê o arquivo e converte para Base64
    const reader = new FileReader();
    
    reader.onload = function(e) {
        // Mostra preview da imagem
        previewContainer.innerHTML = `
            <img 
                src="${e.target.result}" 
                alt="Preview" 
                style="width: 100%; height: 100%; object-fit: cover;"
            />
        `;
        
        // Armazena o Base64 em um atributo data para uso posterior
        previewContainer.setAttribute('data-image-base64', e.target.result);
    };
    
    reader.onerror = function() {
        showToast('Erro ao carregar a imagem', 'error');
        event.target.value = '';
    };
    
    // Inicia a leitura do arquivo
    reader.readAsDataURL(file);
}

/**
 * Mostra o formulário de cadastro de produto
 */
function showAddProductForm() {
    const formContainer = document.getElementById('addProductFormContainer');
    if (formContainer) {
        formContainer.classList.remove('hidden');
        // Rola suavemente até o formulário
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Oculta o formulário de cadastro de produto
 */
function hideAddProductForm() {
    const formContainer = document.getElementById('addProductFormContainer');
    const form = document.getElementById('addProductForm');
    const previewContainer = document.getElementById('newProductImagePreview');
    
    if (formContainer) {
        formContainer.classList.add('hidden');
        if (form) form.reset();
        
        // Limpa o preview da imagem
        if (previewContainer) {
            previewContainer.innerHTML = '<span style="color: var(--text-light); font-size: 12px; text-align: center; padding: 8px;">Sem imagem</span>';
            previewContainer.removeAttribute('data-image-base64');
        }
    }
}

/**
 * Processa o cadastro de um novo produto
 * @param {Event} event - Evento do formulário
 */
function handleAddProduct(event) {
    event.preventDefault();
    
    // Verifica se é vendedor
    if (!AppState.user || AppState.user.role !== 'seller') {
        showToast('Apenas vendedores podem cadastrar produtos', 'error');
        return;
    }
    
    // Coleta dados do formulário
    const name = document.getElementById('newProductName').value.trim();
    const price = parseFloat(document.getElementById('newProductPrice').value);
    const category = document.getElementById('newProductCategory').value;
    const stock = parseInt(document.getElementById('newProductStock').value);
    const icon = document.getElementById('newProductIcon').value.trim() || '';
    const description = document.getElementById('newProductDescription').value.trim();
    const specsText = document.getElementById('newProductSpecifications').value.trim();
    
    // Obtém a imagem Base64 do preview (se houver)
    const previewContainer = document.getElementById('newProductImagePreview');
    const imageBase64 = previewContainer.getAttribute('data-image-base64');
    const image = imageBase64 || 'Img/default.jpg'; // Usa Base64 ou imagem padrão
    
    // Processa especificações (formato: "Chave: Valor" por linha)
    const specifications = {};
    if (specsText) {
        specsText.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                specifications[key.trim()] = valueParts.join(':').trim();
            }
        });
    }
    
    // Validação
    if (!name || price < 0 || stock < 0 || !category || !description) {
        showToast('Preencha todos os campos obrigatórios corretamente', 'error');
        return;
    }
    
    // Cria objeto do produto
    const productData = {
        name,
        price,
        category,
        stock,
        icon,
        image,
        description,
        specifications,
        seller: AppState.user.storeName,
        rating: 0
    };
    
    // Adiciona produto
    const newProduct = ProductService.addProduct(productData);
    
    if (newProduct) {
        showToast(`Produto "${name}" cadastrado com sucesso!`, 'success');
        hideAddProductForm();
        // Atualiza a página
        navigateTo('seller');
    } else {
        showToast('Erro ao cadastrar produto', 'error');
    }
}

/**
 * Mostra formulário de edição de produto com dados preenchidos
 * @param {number} productId - ID do produto a editar
 */
function showEditProductForm(productId) {
    const product = ProductService.getProductById(productId);
    
    if (!product) {
        showToast('Produto não encontrado', 'error');
        return;
    }
    
    // Cria modal de edição
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 20px;
        overflow-y: auto;
    `;
    
    // Converte especificações de objeto para texto
    let specsText = '';
    if (product.specifications) {
        specsText = Object.entries(product.specifications)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
    }
    
    modal.innerHTML = `
        <div class="white-box" style="max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto;">
            <h2 style="font-size: 28px; margin-bottom: 20px; color: var(--primary);">
                 Editar Produto: ${product.name}
            </h2>
            
            <form id="editProductForm">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <!-- Nome -->
                    <div>
                        <label class="form-label">Nome do Produto *</label>
                        <input type="text" id="editProductName" class="form-input" value="${product.name}" required />
                    </div>
                    
                    <!-- Preço -->
                    <div>
                        <label class="form-label">Preço (Kz) *</label>
                        <input type="number" id="editProductPrice" class="form-input" value="${product.price}" min="1" required />
                    </div>
                    
                    <!-- Categoria -->
                    <div>
                        <label class="form-label">Categoria *</label>
                        <select id="editProductCategory" class="form-input" required>
                            <option value="Electrónica" ${product.category === 'Electrónica' ? 'selected' : ''}>Electrónica</option>
                            <option value="Acessórios" ${product.category === 'Acessórios' ? 'selected' : ''}>Acessórios</option>
                            <option value="Computadores" ${product.category === 'Computadores' ? 'selected' : ''}>Computadores</option>
                            <option value="Beleza" ${product.category === 'Cosmeticos' ? 'selected' : ''}>Cosmeticos</option>
                            <option value="Calçados" ${product.category === 'Calçados' ? 'selected' : ''}>Calçados</option>
                            <option value="Roupa" ${product.category === 'Roupa' ? 'selected' : ''}>Roupa</option>
                        </select>
                    </div>
                    
                    <!-- Estoque -->
                    <div>
                        <label class="form-label">Estoque (unidades) *</label>
                        <input type="number" id="editProductStock" class="form-input" value="${product.stock || 0}" min="0" required />
                    </div>
                    
                    <!-- Ícone -->
                    <div>
                        <label class="form-label">Ícone (Emoji)</label>
                        <input type="text" id="editProductIcon" class="form-input" value="${product.icon || ''}" maxlength="2" />
                    </div>
                </div>
                
                <!-- Upload de Imagem do Produto -->
                <div style="margin-top: 16px;">
                    <label class="form-label">Imagem do Produto</label>
                    <div style="display: grid; grid-template-columns: 1fr auto; gap: 16px; align-items: start;">
                        <div>
                            <!-- Input de arquivo para upload de imagem -->
                            <input 
                                type="file" 
                                id="editProductImageFile" 
                                class="form-input" 
                                accept="image/*"
                                onchange="previewProductImage(event, 'editProductImagePreview')"
                                style="padding: 8px;"
                            />
                            <small style="color: var(--text-light); display: block; margin-top: 4px;">
                               Selecione uma nova imagem para substituir a atual
                            </small>
                        </div>
                        <!-- Preview da imagem -->
                        <div id="editProductImagePreview" style="width: 120px; height: 120px; border: 2px dashed var(--border); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; background: var(--primary-bg); overflow: hidden;">
                            ${product.image && product.image.startsWith('data:image') ? `
                                <img src="${product.image}" alt="Preview atual" style="width: 100%; height: 100%; object-fit: cover;" />
                            ` : product.image && product.image !== 'Img/default.jpg' ? `
                                <img src="${product.image}" alt="Preview atual" style="width: 100%; height: 100%; object-fit: cover;" 
                                     onerror="this.parentElement.innerHTML='<span style=\\'color: var(--text-light); font-size: 40px;\\'>${product.icon || '📦'}</span>';" />
                            ` : `
                                <span style="font-size: 40px;">${product.icon || ''}</span>
                            `}
                        </div>
                    </div>
                </div>
                
                <!-- Descrição -->
                <div style="margin-top: 16px;">
                    <label class="form-label">Descrição *</label>
                    <textarea id="editProductDescription" class="form-input" rows="3" required>${product.description || ''}</textarea>
                </div>
                
                <!-- Especificações -->
                <div style="margin-top: 16px;">
                    <label class="form-label">Especificações (uma por linha)</label>
                    <textarea id="editProductSpecifications" class="form-input" rows="4">${specsText}</textarea>
                    <small style="color: var(--text-light);"> Formato: "Chave: Valor" em cada linha</small>
                </div>
                
                <!-- Botões -->
                <div style="margin-top: 24px; display: flex; gap: 12px;">
                    <button type="submit" class="cta-btn" style="flex: 1;">
                        Salvar Alterações
                    </button>
                    <button type="button" class="remove-btn" onclick="this.closest('[style*=\\'position: fixed\\']').remove()" style="flex: 1; background: var(--text-light);">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handler de submit do formulário de edição
    const form = modal.querySelector('#editProductForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        
        // Obtém a imagem Base64 do preview (se houver nova imagem)
        const previewContainer = document.getElementById('editProductImagePreview');
        const imageBase64 = previewContainer.getAttribute('data-image-base64');
        
        // Coleta dados atualizados
        const updates = {
            name: document.getElementById('editProductName').value.trim(),
            price: parseFloat(document.getElementById('editProductPrice').value),
            category: document.getElementById('editProductCategory').value,
            stock: parseInt(document.getElementById('editProductStock').value),
            icon: document.getElementById('editProductIcon').value.trim(),
            // Usa nova imagem Base64 se houver, senão mantém a imagem atual
            image: imageBase64 || product.image,
            description: document.getElementById('editProductDescription').value.trim()
        };
        
        // Processa especificações
        const specsText = document.getElementById('editProductSpecifications').value.trim();
        const specifications = {};
        if (specsText) {
            specsText.split('\n').forEach(line => {
                const [key, ...valueParts] = line.split(':');
                if (key && valueParts.length > 0) {
                    specifications[key.trim()] = valueParts.join(':').trim();
                }
            });
        }
        updates.specifications = specifications;
        
        // Atualiza produto
        const updatedProduct = ProductService.updateProduct(productId, updates);
        
        if (updatedProduct) {
            showToast(`Produto "${updates.name}" atualizado com sucesso!`, 'success');
            modal.remove();
            navigateTo('seller');
        } else {
            showToast('Erro ao atualizar produto', 'error');
        }
    };
    
    // Fecha modal ao clicar fora
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
}

/**
 * Confirma e exclui um produto
 * @param {number} productId - ID do produto
 * @param {string} productName - Nome do produto
 */
function confirmDeleteProduct(productId, productName) {
    // Confirmação de exclusão
    const confirmDelete = confirm(
        `⚠️ ATENÇÃO!\n\nDeseja realmente excluir o produto "${productName}"?\n\nEsta ação não pode ser desfeita.`
    );
    
    if (!confirmDelete) {
        return;
    }
    
    // Exclui produto
    const success = ProductService.deleteProduct(productId);
    
    if (success) {
        showToast(`Produto "${productName}" excluído com sucesso`, 'success');
        navigateTo('seller');
    } else {
        showToast('Erro ao excluir produto', 'error');
    }
}

/**
 * Processa formulário de login
 * @param {Event} event - Evento do formulário
 */
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    login(email, password);
}

// ==================== INICIALIZAÇÃO DA APLICAÇÃO ====================

/**
 * Função de inicialização
 * Configura observadores e renderiza estado inicial
 */
function init() {
    // Subscreve renderPage para reagir a mudanças de estado
    AppState.subscribe(renderPage);
    
    // Renderiza página inicial
    renderPage();
    updateAuthUI();
    updateCartBadge();
    
    console.log(' Ombela Market inicializado com sucesso!');
    console.log(' Padrões aplicados: Observer, Singleton, SRP, DIP');
    console.log(' Produtos com imagens carregados:', ProductService.getProducts().length);
}

// Inicia aplicação quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
