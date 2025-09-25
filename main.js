document.addEventListener('DOMContentLoaded', function() {
    
    // CAROUSEL  
    let currentSlideIndex = 0;
    let autoSlideInterval;
    const slides = document.getElementById('carouselSlides');
    
    // Chercher les nouveaux dots avec la bonne classe
    const dots = document.querySelectorAll('.carousel-dots-external .dot');

    // Vérif que les éléments existent
    if (!slides) {
        console.error('Slides du carrousel non trouvés !');
        return;
    }
    
    if (dots.length === 0) {
        console.error('Dots du carrousel non trouvés !');
        console.log('Tentative de recherche des dots...');
        console.log('Dots avec .carousel-dot:', document.querySelectorAll('.carousel-dot').length);
        console.log('Dots avec .carousel-dots-external .dot:', document.querySelectorAll('.carousel-dots-external .dot').length);
        console.log('Élément .carousel-dots-external existe:', document.querySelector('.carousel-dots-external') !== null);
        return;
    }

    console.log('✅ Slides trouvés:', slides);
    console.log('✅ Dots trouvés:', dots.length);

    // Fonction pour aller à une slide spécifique
    function currentSlide(index) {
        currentSlideIndex = index;
        updateCarousel();
        console.log('Navigation vers slide:', index);
    }

    // Fonction pour mettre à jour le carousel
    function updateCarousel() {
        slides.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        
        // Mettre à jour les dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
        
        console.log('Carousel mis à jour - Slide actuelle:', currentSlideIndex);
    }

    // Navigation avec flèches
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % 5;
        updateCarousel();
    }

    function prevSlide() {
        currentSlideIndex = currentSlideIndex === 0 ? 4 : currentSlideIndex - 1;
        updateCarousel();
    }

    // AUTO-SLIDE FUNCTIONALITY 
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 2500);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // EVENT LISTENERS 
    
    // Event listeners pour les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            console.log('Dot cliqué:', index);
            currentSlide(index);
        });
    });

    // Event listeners pour le carousel container (pause au hover)
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    //  FONCTIONS GLOBALES 
    
    // Rendre les fonctions accessibles globalement pour les onclick
    window.currentSlide = currentSlide;
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;

    // Image click handlers
    function openImage(imageNumber) {
        alert(`Ouverture de l'image ${imageNumber}`);
    }
    window.openImage = openImage;

    function openBlog(blogNumber) {
        alert(`Ouverture de l'article de blog ${blogNumber}`);
    }
    window.openBlog = openBlog;

    // Form submission
    function submitForm(event) {
        event.preventDefault();
        alert('Message envoyé avec succès !');
        event.target.reset();
    }
    window.submitForm = submitForm;

    // ===== AUTRES FONCTIONNALITÉS 

    // scroll  navbar links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            alert('Menu mobile activé - Implémentation complète nécessaire');
        });
    }

    // SCROLL ANIMATIONS 
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });

    // SKILLS ANIMATIONS
    
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 100);
        });
    }

    // Observer pour déclencher l'animation au scroll
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'competences') {
                animateSkillBars();
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observer la section skills
    const skillsSection = document.getElementById('competences');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Fonction pour ajouter dynamiquement une compétence
    function addSkill(category, name, level, percentage, skillClass) {
        const categoryElement = document.querySelector(`.skills-category:nth-child(${category})`);
        
        if (categoryElement) {
            const skillHTML = `
                <div class="skill-item ${skillClass}">
                    <div class="skill-header">
                        <span class="skill-name">${name}</span>
                        <span class="skill-level">${level}</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: ${percentage}%;"></div>
                    </div>
                </div>
            `;
            
            categoryElement.insertAdjacentHTML('beforeend', skillHTML);
        }
    }
    window.addSkill = addSkill;

    // ===== INITIALISATION 
    
    // Démarrer l'auto-slide
    startAutoSlide();
    
    // Initialiser la première slide
    updateCarousel();

    console.log('🎠 Carrousel initialisé avec succès !');
    console.log('📊 Animations des compétences activées !');
    console.log('🚀 Toutes les fonctionnalités sont chargées !');
    console.log('🎯 Dots configurés pour:', dots.length, 'éléments');
});