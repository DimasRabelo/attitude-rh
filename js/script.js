/**
 * PROJETO: Attitude RH 
 * DESENVOLVEDOR: Dimtech (Dimas Aparecido Rabelo de Souza)
 * VERSÃO: 2.0 (SEO & Performance Optimized)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INICIALIZAR ANIMAÇÕES (AOS)
    // Delay de 100ms para garantir que o layout base já carregou
    setTimeout(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100, // Inicia a animação 100px antes do elemento aparecer
            disable: 'mobile' // Opcional: desativa em celulares muito antigos para poupar bateria
        });
    }, 100);

    // 2. LIGHTBOX (Galeria de Imagens)
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        zoomable: true
    });

    // 3. CONTADOR DE RESULTADOS ANIMADO
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounting = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const targetValue = +targetElement.getAttribute('data-target');
                
                let count = 0;
                const updateCount = () => {
                    const inc = targetValue / speed;
                    if (count < targetValue) {
                        count += inc;
                        targetElement.innerText = Math.ceil(count) + "+";
                        setTimeout(updateCount, 15);
                    } else {
                        targetElement.innerText = targetValue + "+";
                    }
                };
                updateCount();
                observer.unobserve(targetElement);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounting, {
        threshold: 0.5
    });

    counters.forEach(counter => counterObserver.observe(counter));

    // 4. CONTROLE DE VÍDEOS (UX: Pausa um ao dar play no outro)
    const todosOsVideos = document.querySelectorAll('video');
    todosOsVideos.forEach(videoAtivo => {
        videoAtivo.addEventListener('play', () => {
            todosOsVideos.forEach(outroVideo => {
                if (outroVideo !== videoAtivo) {
                    outroVideo.pause();
                }
            });
        });
    });

    // 5. SCROLL SUAVE (Navegação Interna)
    document.querySelectorAll('.nav-link, .btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    window.scrollTo({
                        top: target.offsetTop - navHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 6. LOG DE SUCESSO DIMTECH
    console.log("Attitude RH - Site carregado com sucesso via Dimtech Engine.");
});

// Função para a Barra de Cookies
function aceitarCookies() {
    localStorage.setItem("cookiesAceitos", "true");
    document.getElementById("cookie-bar").style.display = "none";
}

window.onload = function() {
    if (!localStorage.getItem("cookiesAceitos")) {
        document.getElementById("cookie-bar").style.display = "flex";
    }
};