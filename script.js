// Estado de navegación
let currentSection = 'inicio';
let cart = [];

// Productos (con descripción incluida)
const products = [
    { id: 1, name: "Vela Aromática - Lavanda", price: 1200, img: "img/velas-carrousel.jpg", category: "velas", desc: "Vela de lavanda 100% natural, ideal para relajación y buen descanso." },
    { id: 2, name: "Vela Aromática - Vainilla", price: 1150, img: "https://placehold.co/600x400/D2B48C/5C4033?text=Vainilla", category: "velas", desc: "Vela de vainilla con esencia orgánica, perfecta para ambientes cálidos." },
    { id: 3, name: "Vela Aromática - Limón", price: 1180, img: "https://placehold.co/600x400/5C4033/F5F5DC?text=Limón", category: "velas", desc: "Revitaliza tu ambiente con este aroma cítrico natural." },
    { id: 4, name: "Difusor Aromático - Rosa", price: 1800, img: "img/difusor.jpg", category: "difusores", desc: "Difusor con esencia de rosa y varillas de mimbre duraderas." },
    { id: 5, name: "Difusor Aromático - Sándalo", price: 1850, img: "https://placehold.co/600x400/8B5A2B/D2B48C?text=Sándalo", category: "difusores", desc: "Ideal para meditación y concentración. Aroma profundo y cálido." },
    { id: 6, name: "Kit Regalo Premium", price: 3500, img: "https://placehold.co/600x400/D2B48C/5C4033?text=Kit+Premium", category: "kits", desc: "Incluye vela, difusor y sales de baño. Perfecto para regalar." },
    { id: 7, name: "Kit Pareja - Relajación", price: 2800, img: "https://placehold.co/600x400/F5F5DC/5C4033?text=Kit+Pareja", category: "kits", desc: "Dos velas y un difusor para compartir momentos de bienestar." }
];

// === NAVEGACIÓN Y MENÚ MÓVIL ===
document.addEventListener('DOMContentLoaded', () => {
    showSection('inicio');
    initCarousel();
    loadCart();
    loadProducts('all');
    updateCartCount();
    setupEventListeners();
    setupNavbar();
    setupModal ();// <-- Añadido: Configura el menú móvil y el logo
});

function navigateTo(id) {
    showSection(id);
    window.history.pushState({ section: id }, '', `#${id}`);

    // Obtener la sección y hacer scroll suave al inicio
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showSection(id) {
    document.querySelectorAll('#mainContent > section').forEach(sec => {
        sec.classList.remove('active');
    });
    const section = document.getElementById(id);
    if (section) {
        section.classList.add('active');
    }

    // Actualizar navbar
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
        }
    });
}

// Eventos de navegación en el navbar
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href').substring(1);
        navigateTo(target);
    });
});

// === NAVEGACIÓN Y MENÚ MÓVIL (CORREGIDO Y MEJORADO) ===
function setupNavbar() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    // Alternar menú móvil
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
            }
        });
    });

    // Logo ZAFIRA - Volver al inicio
    const logo = document.querySelector('.navbar-brand');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('inicio');
            // Cerrar menú si está abierto
            if (navbarMenu) navbarMenu.classList.remove('active');
        });
    }
}

// Manejar el historial (botón de retroceso del navegador)
window.addEventListener('popstate', (e) => {
    const section = e.state?.section || 'inicio';
    showSection(section);
});

// === CAROUSEL ===
let carouselIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
const indicatorsContainer = document.getElementById('indicators');

function initCarousel() {
    carouselItems.forEach((_, i) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    });
    showSlide(carouselIndex);
}

function showSlide(index) {
    if (index < 0) index = carouselItems.length - 1;
    if (index >= carouselItems.length) index = 0;
    carouselIndex = index;

    carouselItems.forEach((item, i) => {
        item.classList.remove('active');
        if (i === carouselIndex) item.classList.add('active');
    });

    document.querySelectorAll('.indicator').forEach((ind, i) => {
        ind.classList.toggle('active', i === carouselIndex);
    });
}

function nextSlide() { showSlide(carouselIndex + 1); }
function prevSlide() { showSlide(carouselIndex - 1); }
setInterval(nextSlide, 6000);

// === CARRITO ===
function loadCart() {
    const saved = localStorage.getItem('zafiraCart');
    if (!saved) return;

    const cartData = JSON.parse(saved);
    const now = new Date().getTime();
    const tenMinutes = 10 * 60 * 1000; // 10 minutos en milisegundos

    // Si pasaron más de 10 minutos, no cargamos
    if (now - cartData.timestamp > tenMinutes) {
        localStorage.removeItem('zafiraCart'); // Limpiar carrito caducado
        return;
    }

    // Si está dentro del tiempo, cargamos los productos
    cart = cartData.items;
}

function saveCart() {
    const cartData = {
        items: cart,
        timestamp: new Date().getTime() // Guardamos cuándo se guardó
    };
    localStorage.setItem('zafiraCart', JSON.stringify(cartData));
}

// === CARRITO ===
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartMessage = document.getElementById('cartMessage');
    const cartContainer = document.getElementById('cartContainer');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems) return;
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.style.display = 'none';
        cartMessage.style.display = 'block';
        cartTotal.textContent = '$0';
        return;
    }

    cartMessage.style.display = 'none';
    cartContainer.style.display = 'block';

    let total = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        total += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <img src="${item.img}" alt="${item.name}" width="50">
                ${item.name}
            </td>
            <td>$${item.price}</td>
            <td>
                <div class="qty-control">
                    <button onclick="changeQty(${item.id}, -1)">−</button>
                    <input type="number" value="${item.qty}" readonly>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            </td>
            <td>$${subtotal}</td>
            <td>
                <button class="btn-remove" onclick="removeProduct(${item.id})" title="Eliminar producto">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        cartItems.appendChild(tr);
    });

    cartTotal.textContent = `$${total}`;
}


// Abrir carrito
document.getElementById('cartFloat')?.addEventListener('click', () => {
    navigateTo('carrito');
    updateCartUI();
});

// Añadir al carrito
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    updateCartCount();
    showToast();
}

// Cambiar cantidad
function changeQty(id, delta) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        removeProduct(id);
        return;
    }
    saveCart();
    updateCartUI();
    updateCartCount();
}

// Contador del carrito
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const countElement = document.querySelector('.cart-count');
    if (countElement) countElement.textContent = count;
}

// Variable para guardar el ID del producto a eliminar
let productToDelete = null;

// === Eliminar producto con modal estético ===
function removeProduct(id) {
    productToDelete = id;

    // Mostrar modal
    const modal = document.getElementById('confirmModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Cerrar modal
document.getElementById('closeConfirmModal')?.addEventListener('click', () => {
    const modal = document.getElementById('confirmModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
});

document.getElementById('cancelDelete')?.addEventListener('click', () => {
    document.getElementById('confirmModal').classList.remove('show');
    setTimeout(() => {
        document.getElementById('confirmModal').style.display = 'none';
    }, 300);
});

// Confirmar eliminación
document.getElementById('confirmDelete')?.addEventListener('click', () => {
    if (productToDelete !== null) {
        cart = cart.filter(item => item.id !== productToDelete);
        saveCart();
        updateCartUI();
        updateCartCount();
        showToast('Producto eliminado del carrito');
    }

    // Cerrar modal
    const modal = document.getElementById('confirmModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);

    // Reset
    productToDelete = null;
});

// Cerrar al hacer clic fuera
window.addEventListener('click', (e) => {
    const modal = document.getElementById('confirmModal');
    if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
});

// Mostrar toast personalizado
function showToast(message = 'Producto añadido al carrito') {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
}


// Finalizar compra con formulario emergente
document.getElementById('checkoutWhatsApp')?.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de finalizar el pedido.');
        return;
    }

    // Mostrar modal
    const modal = document.getElementById('checkoutModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);

    // Enfocar el input
    document.getElementById('clientNameInput').focus();
});

// Cerrar modal
document.getElementById('closeCheckoutModal')?.addEventListener('click', () => {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
});

document.getElementById('cancelCheckout')?.addEventListener('click', () => {
    document.getElementById('checkoutModal').classList.remove('show');
    setTimeout(() => {
        document.getElementById('checkoutModal').style.display = 'none';
    }, 400);
});

// Enviar pedido
document.getElementById('sendCheckout')?.addEventListener('click', () => {
    const clientNameInput = document.getElementById('clientNameInput');
    const clientName = clientNameInput.value.trim();

    if (!clientName) {
        alert('Por favor, ingresa tu nombre para continuar.');
        clientNameInput.focus();
        return;
    }

    // ✅ Nombre en mayúsculas
    const clientNameUpper = clientName.toUpperCase();

    // ✅ Emojis como Unicode (WhatsApp los soporta bien)
    let message = `🌿 *ZAFIRA - Aromas con Alma*\n\n`;
    message += `HOLA, SOY *${clientNameUpper}* \u{1F44B}\n`; // 👋
    message += `QUIERO HACER UN PEDIDO:\n\n`;

    let total = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        message += `• *${item.name}*\n  CANTIDAD: ${item.qty} × $${item.price} = *$${subtotal}*\n`;
    });

    message += `\n\u{1F6D2} *TOTAL DEL PEDIDO: $${total}*\n`; // 🛒
    message += `📍 ¿CÓMO SEGUIMOS CON EL PAGO Y LA ENTREGA?\n\n`;
    message += `GRACIAS \u{1F49B}`; // 💛

    // Cerrar modal y enviar
    document.getElementById('checkoutModal').classList.remove('show');
    setTimeout(() => {
        document.getElementById('checkoutModal').style.display = 'none';
        clientNameInput.value = ''; // Limpiar
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/5493562542281?text=${encodedMessage}`, '_blank');
    }, 400);
});

// Cerrar al hacer clic fuera
window.addEventListener('click', (e) => {
    const modal = document.getElementById('checkoutModal');
    if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    }
});



function setupEventListeners() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadProducts(btn.getAttribute('data-filter'));
        });
    });
}

// === MODAL DE PRODUCTO ===
function setupModal() {
    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');

    // Hacer que openProductDetail esté disponible globalmente
    window.openProductDetail = function(id) {
        const product = products.find(p => p.id === id);
        if (!product || !modal) {
            console.error('Producto no encontrado o modal no existe');
            return;
        }

        // Actualizar contenido del modal
        document.getElementById('modalProductImg').src = product.img;
        document.getElementById('modalProductImg').alt = product.name;
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductDesc').textContent = product.desc;
        document.getElementById('modalProductPrice').textContent = `$${product.price}`;

        // Botón de añadir
        document.getElementById('modalAddToCart').onclick = () => {
            addToCart(id);
            modal.classList.remove('show');
        };

        // Mostrar modal
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    };

    // Cerrar con X
    modalClose?.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 400);
    });

    // Cerrar al hacer clic fuera
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 400);
        }
    });
}

// === CATÁLOGO ===
function loadProducts(filter = 'all') {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    // Vaciar contenedor
    grid.innerHTML = '';

    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    if (filtered.length === 0) {
        grid.innerHTML = '<p class="no-products">No hay productos en esta categoría.</p>';
        return;
    }

    // Añadir con retraso escalonado y animación suave
    filtered.forEach((p, index) => {
        const el = document.createElement('div');
        el.className = 'product-card';
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        el.innerHTML = `
            <img src="${p.img}" alt="${p.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <span class="product-price">$${p.price}</span>
                <button class="btn-add-cart" onclick="openProductDetail(${p.id})">
                    <i class="fas fa-eye"></i> Ver Detalle
                </button>
            </div>
        `;
        grid.appendChild(el);

        // Animación escalonada más lenta
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 150 * index); // Aumenté el delay para un efecto más cinematográfico
    });
}

// === OCULTAR/SHOW NAVBAR AL HACER SCROLL ===
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Evitar comportamiento en tope
        if (scrollTop <= 50) {
            navbar.classList.remove('hidden');
            lastScrollTop = scrollTop;
            return;
        }

        // Scroll hacia abajo → ocultar
        if (scrollTop > lastScrollTop) {
            navbar.classList.add('hidden');
        } 
        // Scroll hacia arriba → mostrar
        else {
            navbar.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
    });
}

// Actualizar UI
updateCartUI();