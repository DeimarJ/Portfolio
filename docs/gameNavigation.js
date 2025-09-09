// ============================================
// SISTEMA DE NAVEGACIÓN CÍCLICA ENTRE PÁGINAS DE VIDEOJUEGOS
// gameNavigation.js - Archivo externo para controlar toda la navegación
// ============================================

// Array de páginas en orden cíclico - PERSONALIZAR AQUÍ
const pages = [
    'scape.html',
    'origins.html',
    'n-rgeia.html', 
    'timeRunners.html'
];

// Configuración - PERSONALIZAR AQUÍ
const AUTO_CHANGE_TIME = 8000; // 8 segundos
const SCROLL_THRESHOLD = 300; // Píxeles de scroll para cambiar página

// Variables de control
let currentPageIndex = 0;
let autoChangeInterval;
let scrollAccumulated = 0;
let lastScrollTime = 0;
let isTransitioning = false;

// Determinar página actual
function getCurrentPageIndex() {
    const currentPage = window.location.pathname.split('/').pop();
    for (let i = 0; i < pages.length; i++) {
        if (pages[i] === currentPage) {
            return i;
        }
    }
    return 0;
}

// Función para crear overlay de transición
function createTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'transition-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        pointer-events: none;
    `;
    document.body.appendChild(overlay);
    return overlay;
}

// Navegar a la siguiente página con transición
function navigateToNextPage() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const nextIndex = (currentPageIndex + 1) % pages.length;
    const nextPage = pages[nextIndex];
    
    // Crear overlay de transición
    const overlay = createTransitionOverlay();
    
    // Fade out
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 50);
    
    // Navegar después del fade out
    setTimeout(() => {
        window.location.href = nextPage;
    }, 600);
}

// Navegar a la página anterior con transición
function navigateToPreviousPage() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const previousIndex = (currentPageIndex - 1 + pages.length) % pages.length;
    const previousPage = pages[previousIndex];
    
    // Crear overlay de transición
    const overlay = createTransitionOverlay();
    
    // Fade out
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 50);
    
    // Navegar después del fade out
    setTimeout(() => {
        window.location.href = previousPage;
    }, 600);
}

// Función para el cambio automático
function startAutoChange() {
    autoChangeInterval = setInterval(() => {
        navigateToNextPage();
    }, AUTO_CHANGE_TIME);
}

function stopAutoChange() {
    if (autoChangeInterval) {
        clearInterval(autoChangeInterval);
        autoChangeInterval = null;
    }
}

// Manejar wheel para cambio de página (reemplaza handleScroll)
function handleWheel(event) {
    const currentTime = Date.now();
    
    // Resetear acumulación si ha pasado mucho tiempo
    if (currentTime - lastScrollTime > 1000) {
        scrollAccumulated = 0;
    }
    
    // Acumular movimiento con dirección (positivo = abajo, negativo = arriba)
    scrollAccumulated += event.deltaY;
    lastScrollTime = currentTime;
    
    // Cambiar página hacia adelante (scroll hacia abajo)
    if (scrollAccumulated >= SCROLL_THRESHOLD) {
        navigateToNextPage();
        scrollAccumulated = 0;
    }

    // Cambiar página hacia atrás (scroll hacia arriba)
    if (scrollAccumulated <= -SCROLL_THRESHOLD) {
        navigateToPreviousPage();
        scrollAccumulated = 0;
    }
    
    // Prevenir scroll real para mantener la estética
    event.preventDefault();
}

// Pausar auto-cambio cuando mouse está sobre el contenido
function setupMouseEvents() {
    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoChange);
        container.addEventListener('mouseleave', startAutoChange);
    }
}

// Función de inicialización principal
function initGameNavigation() {
    // Solo ejecutar en páginas de videojuegos
    const currentPage = window.location.pathname.split('/').pop();
    if (!pages.includes(currentPage)) {
        return; // No ejecutar en otras páginas
    }
    
    // Determinar página actual
    currentPageIndex = getCurrentPageIndex();
    
    // Efecto fade in al cargar la página
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Iniciar funcionalidades
    startAutoChange();
    setupMouseEvents();
    
    // Event listener para wheel (reemplaza scroll)
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Limpiar al salir de la página
    window.addEventListener('beforeunload', stopAutoChange);
}

// Función manual para ir a página específica (opcional)
function goToPage(index) {
    if (index >= 0 && index < pages.length && index !== currentPageIndex) {
        currentPageIndex = index;
        const targetPage = pages[index];
        
        const overlay = createTransitionOverlay();
        setTimeout(() => overlay.style.opacity = '1', 50);
        setTimeout(() => window.location.href = targetPage, 600);
    }
}

// Auto-inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initGameNavigation);

// También exportar las funciones principales para uso manual si es necesario
window.gameNavigation = {
    goToPage,
    navigateToNextPage,
    navigateToPreviousPage,
    startAutoChange,
    stopAutoChange,
    getCurrentPageIndex
};
