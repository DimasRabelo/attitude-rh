// Inicializar Animações AOS
AOS.init({
    duration: 1000,
    once: true
});

// Contador de Resultados Animado
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounting = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const updateCount = () => {
                const target = +entry.target.getAttribute('data-target');
                const count = +entry.target.innerText.replace('+', ''); // Remove o + se houver
                const inc = target / speed;

                if (count < target) {
                    entry.target.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    entry.target.innerText = target + "+";
                }
            };
            updateCount();
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(startCounting, {
    threshold: 0.5
});

counters.forEach(counter => observer.observe(counter));

// Scroll Suave para o Menu
document.querySelectorAll('.nav-link, .btn').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Inicializa o GLightbox (Função de expandir fotos)
const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    zoomable: true
});
