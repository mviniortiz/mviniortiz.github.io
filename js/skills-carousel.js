document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Configuração do carousel
    const SLIDE_DURATION = 4000; // 4 segundos por slide
    const CARDS_PER_GROUP = 1; // Mostrar 1 card por vez
    const totalGroups = Math.ceil(skillCards.length / CARDS_PER_GROUP);
    
    // Função para mostrar um grupo de cards
    function showSlideGroup(groupIndex) {
        // Esconder todos os cards
        skillCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Mostrar cards do grupo atual
        const startIndex = groupIndex * CARDS_PER_GROUP;
        const endIndex = Math.min(startIndex + CARDS_PER_GROUP, skillCards.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            if (skillCards[i]) {
                setTimeout(() => {
                    skillCards[i].classList.add('active');
                }, (i - startIndex) * 200); // Delay escalonado para efeito cascata
            }
        }
        
        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === groupIndex);
        });
        
        currentSlide = groupIndex;
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalGroups;
        showSlideGroup(nextIndex);
    }
    
    // Função para iniciar o auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, SLIDE_DURATION);
    }
    
    // Função para parar o auto-slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Event listeners para os indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            showSlideGroup(index);
            // Reiniciar auto-slide após 2 segundos
            setTimeout(startAutoSlide, 2000);
        });
    });
    
    // Pausar auto-slide quando o mouse estiver sobre o carousel
    const carousel = document.querySelector('.skills-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Pausar auto-slide quando a aba não estiver visível
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
    
    // Inicializar o carousel
    if (skillCards.length > 0) {
        showSlideGroup(0);
        startAutoSlide();
    }
    
    // Responsividade - ajustar para mobile
    function handleResize() {
        // Sempre mostrar apenas 1 card por vez
        showSlideGroup(currentSlide);
    }
    
    window.addEventListener('resize', handleResize);
});