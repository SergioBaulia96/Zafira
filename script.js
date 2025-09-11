// Estado de navegación
let currentSection = 'inicio';
let cart = [];

// Productos (con descripción incluida)
const products = [
    { id: 1, name: "Armonía", price: 17800, img: "img/ARMONIA.jpg", category: "velas", desc: "Caramelera de vidrio 10cm de alto." },
    { id: 2, name: "Luxury", price: 21900, img: "img/LUXURY.jpg", category: "velas", desc: "Cuenco de vidrio, tiple pabilo, 13cm de diametro." },
    { id: 3, name: "Equilibrio", price: 20000, img: "img/equilibrio1.jpg", category: "velas", desc: "Cuenco de vidrio, tiple pabilo, 12cm de alto." },
    { id: 4, name: "Equilibrio - chico", price: 12500, img: "img/equilibrio-chico.jpg", category: "velas", desc: "Cuenco de vidrio chico, 9cm de alto." },
    { id: 5, name: "Volcán Deco", price: 15500, img: "img/volcan-deco.jpg",img2:"img/volcan-deco-dos.jpg", category: "velas", desc: "Cuenco de vidrio, 8cm de alto." },
    { id: 6, name: "Sublime Deco", price: 16500, img: "img/sublime-deco.jpg",img2:"img/sublime-deco-dos.jpg", category: "velas", desc: "Recipiente de vidrio, 9cm de alto." },
    { id: 7, name: "Sublime Deco", price: 16500, img: "img/sublime-deco-lavanda.jpg",img2:"img/sublime-deco-lavanda-dos.jpg", category: "velas", desc: "Recipiente de vidrio, 9cm de alto." },
    { id: 8, name: "Clásica Deco", price: 15500, img: "img/clasica-deco.jpg",img2:"img/clasica-deco-dos.jpg", category: "velas", desc: "Recipiente de vidrio, 9cm de alto." },
    { id: 9, name: "Conexión", price: 13000, img: "img/conexion.jpg", category: "velas", desc: "Cuenco de vidrio, 8cm de alto." },
    { id: 10, name: "Petit Deco", price: 13500, img: "img/petit-deco.jpg",img2:"img/petit-deco-dos.jpg", category: "velas", desc: "Recipiente de vidrio, 9cm de alto." },
    { id: 11, name: "Aluminio", price: 17800, img: "img/aluminio.jpg",img2:"img/aluminio-dos.jpg", category: "velas", desc: "Rosa brillosa - Plata, 10cm de alto." },
    { id: 12, name: "Cera de Soja", price: 5700, img: "img/cera70.jpg", category: "velas", desc: "Lata 70grs." },
    { id: 13, name: "Cera de Soja", price: 8500, img: "img/cera130.jpg", category: "velas", desc: "Lata 130   grs." },
    { id: 14, name: "Serenidad", price: 16500, img: "img/serenidad.jpg",img2:"img/conTapas.jpg", category: "velas", desc: "Cuenco de vidrio con tapa, 10cm de alto." },
    { id: 15, name: "Vitalidad", price: 15000, img: "img/vitalidad.jpg", img2:"img/conTapas.jpg", category: "velas", desc: "Cuenco de vidrio con tapa, 8.5cm de alto." },
    { id: 16, name: "Tennesse - Flores Blancas", price: 17000, img: "img/florblanca.jpg",img2:"img/florblanca-dos.jpg", category: "decoradas", desc: "Cuenco de vidrio con tapa, 8.5cm de alto." },
    { id: 17, name: "Tennesse - Café", price: 17000, img: "img/cafe.jpg",img2:"img/cafe-dos.jpg", category: "decoradas", desc: "Cuenco de vidrio con tapa, 8.5cm de alto." },
    { id: 18, name: "Tennesse - Naranja", price: 17000, img: "img/naranja.jpg",img2:"img/naranja-dos.jpg", category: "decoradas", desc: "Cuenco de vidrio con tapa, 8.5cm de alto." },
    { id: 19, name: "Tennesse - Limon", price: 17000, img: "img/limon.jpg",img2:"img/limon-dos.jpg", category: "decoradas", desc: "Cuenco de vidrio con tapa, 8.5cm de alto." },
    { id: 20, name: "Tennesse - Frambuesa", price: 17000, img: "img/frambuesa.jpg",img2:"img/frambuesa-dos.jpg", category: "decoradas", desc: "Cuenco de vidrio con tapa, 8.5cm de alto." },
    { id: 21, name: "Tennesse - Budín Vainillado", price: 17000, img: "img/budin.jpg",img2:"img/budin-dos.jpg", category: "decoradas", desc: "Cuenco de vidrio con tapa, 8.5cm de alto." },
    { id: 22, name: "Tennesse - Chocolate", price: 17000, img: "img/chocolate.jpg",img2:"img/chocolate-dos.jpg", category: "decoradas", desc: "Cuenco de vidrio con tapa, 8.5cm de alto." },
    { id: 23, name: "Tennesse - Crumble de Peras", price: 17000, img: "img/crumble.jpg",img2:"img/crumble-dos.jpg", category: "decoradas", desc: "Cuenco de vidrio con tapa, 8.5cm de alto." },
    { id: 24, name: "Tennesse - Chico", price: 14500, img: "img/variedad.jpg",img2:"img/variedad-dos.jpg", category: "decoradas", desc: "Cuenco de vidrio con tapa, 8cm de alto. Frutos rojos, Chocolate, Peras, Frambuesa" },
    { id: 25, name: "Home - Diffuser", price: 17000, img: "img/diffuser-pvc.jpg", category: "difusores", desc: "PVC, 250ml." },
    { id: 26, name: "Home - Diffuser", price: 15000, img: "img/diffuser-vidrio-dos.jpg", category: "difusores", desc: "Envase por 250ml." },
    { id: 27, name: "Home - Diffuser", price: 20000, img: "img/diffuser-vidrio.jpg", category: "difusores", desc: "VIDRIO, 250ml." },
    { id: 28, name: "Home - Diffuser", price: 10000, img: "img/diffuser-lulu.jpg", category: "difusores", desc: "By Lulu, 125ml." },
    { id: 29, name: "Difusores - Autos", price: 6000, img: "img/diffuser-auto.jpg", category: "difusores", desc: "Envase de vidrio." },
    { id: 30, name: "Perfumina", price: 17500, img: "img/perfumina-grande.jpg", category: "spray", desc: "Envase por 500ml." },
    { id: 31, name: "Perfumina", price: 10000, img: "img/perfumina-chico.jpg", category: "spray", desc: "Envase por 250ml." },
    { id: 32, name: "Home Spray", price: 11000, img: "img/home-spray.jpg", category: "spray", desc: "Envase por 250ml." },    
    { id: 33, name: "Aceite para Hornillo", price: 5000, img: "img/aceite-lulu.jpg", category: "otros", desc: "Aceite By Lulu,envase de vidrio" },
    { id: 34, name: "Pills", price: 10000, img: "img/pills-tres.jpg", img2:"img/pills-dos.jpg", category: "otros", desc: "Box por 6 unidades" },
    { id: 35, name: "Perlas Aromaticas", price: 7000, img: "img/perla-lata.jpg", category: "otros", desc: "Envase de Lata" },
    { id: 36, name: "Perlas Aromaticas", price: 5000, img: "img/perla-bolsa.jpg", category: "otros", desc: "Envase en bolsa" },
    { id: 37, name: "Apagavelas", price: 5000, img: "img/apagavela.jpg", category: "otros", desc: "Diferentes modelos, precio por unidad." },
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
    setupModal();// <-- Añadido: Configura el menú móvil y el logo
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
    // Mostrar modal de error
    const errorModal = document.getElementById('errorModal');
    errorModal.style.display = 'flex';
    setTimeout(() => errorModal.classList.add('show'), 10);
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
// === MODAL DE PRODUCTO CON CARRUSEL DE IMÁGENES ===
function setupModal() {
    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const modalImg = document.getElementById('modalProductImg');
    const modalPrevBtn = document.getElementById('modalPrevBtn');
    const modalNextBtn = document.getElementById('modalNextBtn');
    const currentImageIndex = document.getElementById('currentImageIndex');
    const totalImages = document.getElementById('totalImages');

    let currentImgIndex = 0;
    let productImages = [];

    // --- Definimos openProductDetail ---
    window.openProductDetail = function (id) {
        const product = products.find(p => p.id === id);
        if (!product || !modal) return;

        // Crear array de imágenes (mínimo 1, máximo 2)
        productImages = [product.img];
        if (product.img2) productImages.push(product.img2);

        currentImgIndex = 0;
        totalImages.textContent = productImages.length;

        // Mostrar imagen actual
        modalImg.src = productImages[currentImgIndex];

        // Actualizar información del producto
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductDesc').textContent = product.desc;
        document.getElementById('modalProductPrice').textContent = `$${product.price}`;

        // Botón de añadir al carrito
        document.getElementById('modalAddToCart').onclick = () => {
            addToCart(id);
            modal.classList.remove('show');
        };

        // Mostrar/ocultar flechas según cantidad de imágenes
        if (productImages.length <= 1) {
            modalPrevBtn.classList.add('disabled');
            modalNextBtn.classList.add('disabled');
        } else {
            modalPrevBtn.classList.remove('disabled');
            modalNextBtn.classList.remove('disabled');
        }

        // Mostrar modal
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    };

    // Navegación entre imágenes
    modalPrevBtn?.addEventListener('click', () => {
        if (productImages.length <= 1) return;
        currentImgIndex = (currentImgIndex - 1 + productImages.length) % productImages.length;
        modalImg.src = productImages[currentImgIndex];
        currentImageIndex.textContent = currentImgIndex + 1;
    });

    modalNextBtn?.addEventListener('click', () => {
        if (productImages.length <= 1) return;
        currentImgIndex = (currentImgIndex + 1) % productImages.length;
        modalImg.src = productImages[currentImgIndex];
        currentImageIndex.textContent = currentImgIndex + 1;
    });

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

// Cerrar modal de error
document.getElementById('closeErrorModal')?.addEventListener('click', () => {
    const modal = document.getElementById('errorModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
});

document.getElementById('acceptError')?.addEventListener('click', () => {
    const modal = document.getElementById('errorModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
});

// Cerrar al hacer clic fuera
window.addEventListener('click', (e) => {
    const modal = document.getElementById('errorModal');
    if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
});

// === BOTÓN PARA VACIAR EL CARRITO ===
document.getElementById('clearCartBtn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        // Si está vacío, muestra mensaje
        const errorModal = document.getElementById('errorModal');
        errorModal.style.display = 'flex';
        setTimeout(() => errorModal.classList.add('show'), 10);
        document.querySelector('#errorModal .error-content p').textContent = 
            'Tu carrito ya está vacío.';
        return;
    }

    // Mostrar modal de confirmación
    const modal = document.getElementById('confirmModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);

    // Guardar acción para confirmar
    window.confirmClearCart = () => {
        cart = [];
        saveCart();
        updateCartUI();
        updateCartCount();
        showToast('Carrito vaciado correctamente');

        // Cerrar modal
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    };

    // Cambiar acción del botón "Eliminar" a "Vaciar"
    document.getElementById('confirmDelete').onclick = () => {
        window.confirmClearCart();
    };
});

// Actualizar UI
updateCartUI();