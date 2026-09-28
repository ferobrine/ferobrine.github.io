document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle para mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cerrar menu al hacer click en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer para animaciones fade-in al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Formulario de contacto funcional
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            const subject = encodeURIComponent('Contacto desde portfolio - ' + name);
            const body = encodeURIComponent(
                'Nombre: ' + name + '\n' +
                'Email: ' + email + '\n\n' +
                'Mensaje:\n' + message
            );

            window.location.href = 'mailto:fferobrine@gmail.com?subject=' + subject + '&body=' + body;

            // Mostrar mensaje de éxito
            contactForm.innerHTML = '<div class="form-success"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><h3>¡Mensaje preparado!</h3><p>Se ha abierto tu cliente de correo. Si no se abrió, puedes escribirme directamente a <a href="mailto:fferobrine@gmail.com">fferobrine@gmail.com</a></p></div>';
        });
    }
});
