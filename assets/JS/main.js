// Texte pour l'animation de la section hero
const typedText = document.querySelector('.typed-text');
const textArray = ["Développeur", "Designer", "Créatif"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedText.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, typingDelay);
    }
}

// Fonction pour envoyer une notification de visite via Formspree
function notifyVisit() {
    const visitData = new FormData();
    visitData.append('message', 'Un recruteur a visité votre portfolio');
    visitData.append('timestamp', new Date().toLocaleString());

    fetch("https://formspree.io/f/xyzywpke", {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: visitData
    })
    .then(response => {
        if (response.ok) {
            console.log('Notification de visite envoyée avec succès');
        } else {
            console.error('Erreur lors de l\'envoi de la notification de visite');
        }
    })
    .catch(error => console.error('Erreur lors de la connexion à Formspree :', error));
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, newTextDelay);
    
    // Code pour le menu hamburger
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show'); // Affiche ou cache le menu
    });

    // Envoi de la notification de visite
    notifyVisit();

    // Formulaire de contact - Envoi AJAX
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Empêche le rechargement de la page

            // Collecte les données du formulaire
            const formData = new FormData(contactForm);

            try {
                // Envoie des données avec Fetch
                const response = await fetch("https://formspree.io/f/xyzywpke", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData
                });

                // Vérifie la réponse
                if (response.ok) {
                    alert('Message envoyé avec succès !');
                    contactForm.reset(); // Réinitialise le formulaire
                } else {
                    alert('Une erreur est survenue. Veuillez réessayer.');
                }
            } catch (error) {
                console.error("Erreur d'envoi du formulaire : ", error);
                alert('Impossible d\'envoyer le message. Veuillez vérifier votre connexion.');
            }
        });
    }
});
