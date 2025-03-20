document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el carrusel
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(document.querySelectorAll('.character-card'));
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let cardWidth = calculateCardWidth();
    
    // Función para determinar cuántas tarjetas mostrar según el ancho de la ventana
    function getCardsPerView() {
        if (window.innerWidth >= 992) {
            return 3; // Pantallas grandes: 3 tarjetas
        } else if (window.innerWidth >= 768) {
            return 2; // Pantallas medianas: 2 tarjetas
        } else {
            return 1; // Pantallas pequeñas: 1 tarjeta
        }
    }
    
    // Calcular el ancho de cada tarjeta basado en cuántas son visibles
    function calculateCardWidth() {
        const trackWidth = track.clientWidth;
        const gap = 30; // El espacio entre tarjetas (definido en CSS)
        return (trackWidth - ((cardsPerView - 1) * gap)) / cardsPerView;
    }
    
    // Función para actualizar la posición del carrusel
    function updateCarousel() {
        // Actualizar el ancho de las tarjetas
        cardWidth = calculateCardWidth();
        
        // Calcular la posición del carrusel
        const gap = 30; // El espacio entre tarjetas (definido en CSS)
        const position = -currentIndex * (cardWidth + gap);
        
        // Aplicar transformación con animación
        track.style.transform = `translateX(${position}px)`;
        
        // Actualizar clases para efectos visuales
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            
            if (index === currentIndex) {
                card.classList.add('active');
            } else if (
                (cardsPerView >= 3 && index === currentIndex - 1) || 
                (currentIndex === 0 && index === cards.length - 1)
            ) {
                card.classList.add('prev');
            } else if (
                (cardsPerView >= 3 && index === currentIndex + 1) || 
                (currentIndex === cards.length - 1 && index === 0)
            ) {
                card.classList.add('next');
            }
        });
        
        // Si estamos en modo de 3 tarjetas, asegúrate de que las tarjetas laterales tengan el efecto correcto
        if (cardsPerView >= 3) {
            // Para pantallas grandes, aplicamos efectos a las tarjetas adyacentes visibles
            if (currentIndex > 0) {
                cards[currentIndex - 1].classList.add('prev');
            } else {
                cards[cards.length - 1].classList.add('prev');
            }
            
            if (currentIndex < cards.length - 1) {
                cards[currentIndex + 1].classList.add('next');
            } else {
                cards[0].classList.add('next');
            }
        }
    }
    
    // Event listeners para los botones
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });
    
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });
    
    // Evento para pantalla táctil
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const minSwipeDistance = 50;
        if (touchStartX - touchEndX > minSwipeDistance) {
            // Swipe izquierda
            nextButton.click();
        } else if (touchEndX - touchStartX > minSwipeDistance) {
            // Swipe derecha
            prevButton.click();
        }
    }
    
    // Manejar cambios en el tamaño de la ventana
    window.addEventListener('resize', () => {
        const newCardsPerView = getCardsPerView();
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            updateCarousel();
        }
    });
    
    // Inicializar el carrusel
    updateCarousel();
    
    // Modal de presentación
    const modal = document.querySelector('.modal');
    const modalLogo = document.querySelector('.modal-logo');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            modalLogo.style.opacity = 1;
            setTimeout(() => {
                modalLogo.style.opacity = 0;
                setTimeout(() => {
                    modal.style.opacity = 0;
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 500); // Duración de la transición del modal
                }, 1000); // Duración del fade out del logo
            }, 2000); // Duración del logo visible
        }, 500); // Retardo inicial antes de mostrar el logo
    });
});