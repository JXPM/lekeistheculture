document.addEventListener('DOMContentLoaded', function() {
    // Sélectionne toutes les slides
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    let slideInterval;

    // Fonction pour passer à la slide suivante
    function nextSlide() {
        // Enlève la classe active de la slide actuelle
        slides[currentSlide].classList.remove('active');
        
        // Calcule la prochaine slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Ajoute la classe active à la nouvelle slide
        slides[currentSlide].classList.add('active');
    }

    // Démarrer le diaporama (change de slide toutes les 5 secondes)
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Arrêter le diaporama (au cas où)
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Initialisation
    function init() {
        // Active la première slide
        slides[0].classList.add('active');
        
        // Démarre le diaporama
        startSlideshow();
    }

    // Lance l'initialisation
    init();
});
    
// MODIFIEZ LA FONCTION animateOnScroll COMME SUIT :
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.gallery-grid, .blog-posts, .contact form');
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    
    animatedElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top + scrollY;
        const elementVisible = 150;
        
        if (scrollY > elementTop - windowHeight + elementVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            
            // Réinitialise les transformations pour les liens enfants
            el.querySelectorAll('a').forEach(link => {
                link.style.transform = 'none';
            });
        }
    });
}

// AJOUTEZ CE CODE POUR LES LIENS DE LA GALERIE :
document.querySelectorAll('.gallery-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Empêche tout autre gestionnaire d'interférer
        e.stopPropagation();
        
        // Ouvre le lien normalement (vérifiez que l'URL est correcte)
        window.open(this.href, '_blank');
    });
});

// Initialisation des animations
const animatedElements = document.querySelectorAll('.gallery-grid, .blog-posts, .contact form');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Trigger on load
    
    // Form submission
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            const formData = new FormData(this);
            
            // Simulate form submission
            setTimeout(() => {
                alert('Merci pour votre message! Nous vous contacterons bientôt.');
                this.reset();
            }, 500);
        });
    }
    


    document.addEventListener('DOMContentLoaded', function() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryPosts = document.querySelectorAll('.gallery-post');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Retire la classe active de tous les boutons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Ajoute la classe active au bouton cliqué
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                
                // Filtre les posts
                galleryPosts.forEach(post => {
                    if (filter === 'all' || post.dataset.category === filter) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    });


// Gestion du formulaire WhatsApp
document.getElementById('whatsappForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const countryCode = document.getElementById('countryCode').value;
    const phoneNumber = document.getElementById('whatsappNumber').value.replace(/\D/g, '');
    const fullNumber = `whatsapp:+${countryCode}${phoneNumber}`;
    const feedbackEl = document.getElementById('formFeedback');

    // Validation
    if (!phoneNumber.match(/^[0-9]{8,15}$/)) {
        feedbackEl.textContent = "Numéro invalide (8-15 chiffres requis)";
        feedbackEl.style.color = "red";
        return;
    }

    try {
        // Envoi au backend (NE PAS appeler Twilio directement depuis le frontend!)
        const response = await fetch('/api/send-whatsapp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                to: fullNumber,
                body: "Rejoignez notre communauté Leke Culture : https://chat.whatsapp.com/H2mIrOnGyQX8O7euaAu6r7"
            })
        });

        const result = await response.json();
        
        if (response.ok) {
            feedbackEl.textContent = "✅ Lien envoyé avec succès ! Vérifiez WhatsApp.";
            feedbackEl.style.color = "green";
        } else {
            throw new Error(result.error || "Erreur lors de l'envoi");
        }
    } catch (error) {
        console.error("Erreur:", error);
        feedbackEl.textContent = "❌ Échec de l'envoi. Réessayez plus tard.";
        feedbackEl.style.color = "red";
    }
});

// Lien direct (optionnel)
document.getElementById('directWhatsappLink').href = "https://chat.whatsapp.com/H2mIrOnGyQX8O7euaAu6r7";