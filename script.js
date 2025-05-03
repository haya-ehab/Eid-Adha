// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });

    // Countdown Timer
    const eidDate = new Date("2025-06-06T18:00:00").getTime(); // Set the Eid al-Adha date for 2025
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eidDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update countdown numbers with animation
        updateCountdownElement('days', days);
        updateCountdownElement('hours', hours);
        updateCountdownElement('minutes', minutes);
        updateCountdownElement('seconds', seconds);
        
        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').innerHTML = "00";
            document.getElementById('hours').innerHTML = "00";
            document.getElementById('minutes').innerHTML = "00";
            document.getElementById('seconds').innerHTML = "00";
            
            // Show Eid message
            const countdownSection = document.querySelector('.countdown');
            const eidMessage = document.createElement('div');
            eidMessage.classList.add('eid-message', 'animate__animated', 'animate__fadeIn');
            eidMessage.innerHTML = `
                <h2>Eid al-Adha Mubarak!</h2>
                <p>May Allah accept your sacrifices and shower you with his blessings!</p>
            `;
            countdownSection.appendChild(eidMessage);
        }
    }
    
    function updateCountdownElement(id, value) {
        const element = document.getElementById(id);
        const currentValue = element.innerHTML;
        const newValue = value < 10 ? "0" + value : value.toString();
        
        if (currentValue !== newValue) {
            // Add flip animation
            element.classList.add('flip');
            
            // Update the value after a short delay
            setTimeout(() => {
                element.innerHTML = newValue;
                element.classList.remove('flip');
            }, 250);
        }
    }
    
    // Update countdown every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Sticky Navigation
    const navbar = document.getElementById('navbar');
    const navbarOffset = navbar.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > navbarOffset) {
            navbar.classList.add('nav-shrink');
            document.querySelector('.logo-small').style.display = 'block';
        } else {
            navbar.classList.remove('nav-shrink');
            if (window.innerWidth > 768) {
                document.querySelector('.logo-small').style.display = 'none';
            }
        }
        
        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('fa-bars');
        this.classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.classList.add('fa-bars');
                menuToggle.classList.remove('fa-times');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Card Template Selection
    const templateButtons = document.querySelectorAll('.btn-card');
    templateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const template = this.getAttribute('data-template');
            document.getElementById('template').value = template;
            
            // Scroll to card creator
            const cardCreator = document.querySelector('.card-creator');
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = cardCreator.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Focus on recipient field
            setTimeout(() => {
                document.getElementById('recipient').focus();
            }, 800);
        });
    });
    
    // Card Preview Function
    window.previewCard = function() {
        const recipient = document.getElementById('recipient').value || 'Friend';
        const sender = document.getElementById('sender').value || 'You';
        const message = document.getElementById('message').value || 'Wishing you a blessed Eid al-Adha!';
        const template = document.getElementById('template').value;
        
        const cardPreview = document.getElementById('cardPreview');
        
        // Define template styles
        const templateStyles = {
            traditional: {
                background: 'linear-gradient(135deg, #8d5524, #e3b778)',
                border: '10px solid #e3b778',
                font: "'Amiri', serif",
                icon: '<i class="fas fa-mosque"></i>'
            },
            modern: {
                background: 'linear-gradient(135deg, #3a6b35, #a3c585)',
                border: '10px solid #a3c585',
                font: "'Roboto', sans-serif",
                icon: '<i class="fas fa-moon"></i>'
            },
            family: {
                background: 'linear-gradient(135deg, #9e5a63, #f0b7a4)',
                border: '10px solid #f0b7a4',
                font: "'Amiri', serif",
                icon: '<i class="fas fa-heart"></i>'
            }
        };
        
        // Apply template
        const selectedTemplate = templateStyles[template];
        
        // Create card HTML
        cardPreview.innerHTML = `
            <div class="card-preview-content" style="
                background: ${selectedTemplate.background};
                border: ${selectedTemplate.border};
                border-radius: 8px;
                padding: 30px;
                color: white;
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                position: relative;
                overflow: hidden;
            ">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15L38.66 30L30 45L21.33 30L30 15z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E'); opacity: 0.3;"></div>
                <div style="font-size: 2.5rem; margin-bottom: 15px;">${selectedTemplate.icon}</div>
                <h2 style="font-family: ${selectedTemplate.font}; margin-bottom: 15px; font-size: 1.8rem; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">Eid al-Adha Mubarak</h2>
                <p style="margin-bottom: 20px; font-size: 1.1rem;">Dear ${recipient},</p>
                <p style="margin-bottom: 20px; font-size: 1rem; line-height: 1.5;">
                    ${message}
                </p>
                <p style="font-size: 1.1rem;">From, ${sender}</p>
            </div>
        `;
        
        // Add animation
        cardPreview.classList.add('animate__animated', 'animate__fadeIn');
        setTimeout(() => {
            cardPreview.classList.remove('animate__animated', 'animate__fadeIn');
        }, 1000);
    };
    
    // Send Card Function
    function sendCard() {
        const recipient = document.getElementById('recipient').value;
        const sender = document.getElementById('sender').value;
        const message = document.getElementById('message').value;
        const template = document.getElementById('template').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Create the card view URL with parameters
        const cardUrl = `./card-view.html?recipient=${encodeURIComponent(recipient)}&sender=${encodeURIComponent(sender)}&message=${encodeURIComponent(message)}&template=${encodeURIComponent(template)}`;

        // Show success modal with the card URL
        const modal = document.getElementById('successModal');
        const modalContent = modal.querySelector('.modal-body');
        modalContent.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Success!</h3>
            <p>Your Eid greeting card has been created!</p>
            <div class="card-url-container">
                <p>Share this link with your recipient:</p>
                <div class="card-url">
                    <input type="text" value="${window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/' + cardUrl}" readonly>
                    <button onclick="copyCardUrl()" class="copy-btn">Copy</button>
                </div>
            </div>
            <button class="btn btn-primary" id="closeModalBtn">OK</button>
        `;
        modal.style.display = "block";

        // Close modal when clicking the close button
        const closeBtn = document.getElementById('closeModalBtn');
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    function copyCardUrl() {
        const urlInput = document.querySelector('.card-url input');
        urlInput.select();
        document.execCommand('copy');
        alert('Card URL copied to clipboard!');
    }
    
    // Share Card Function
    window.shareCard = function() {
        const recipient = document.getElementById('recipient').value || 'Friend';
        const sender = document.getElementById('sender').value || 'You';
        const message = document.getElementById('message').value || 'Wishing you a blessed Eid al-Adha!';
        const template = document.getElementById('template').value;
        
        const shareText = `Check out this beautiful Eid al-Adha greeting card from ${sender}!\n\nDear ${recipient},\n${message}\n\nFrom, ${sender}`;
        const url = window.location.href;
        
        // Update share buttons with the custom message
        const shareButtons = document.querySelectorAll('.preview-share-buttons .share-btn');
        shareButtons[0].onclick = () => shareOnFacebook(shareText);
        shareButtons[1].onclick = () => shareOnTwitter(shareText);
        shareButtons[2].onclick = () => shareOnWhatsApp(shareText);
    };
    
    // Close Modal
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.getElementById('successModal').style.display = 'none';
    });
    
    document.getElementById('closeModalBtn').addEventListener('click', function() {
        document.getElementById('successModal').style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('successModal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Card Animation
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-animation');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-animation');
        });
    });
    
    // Image placeholder fallback
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            
            const placeholder = document.createElement('div');
            placeholder.classList.add('placeholder-image');
            placeholder.textContent = img.alt || 'Image';
            
            this.parentNode.appendChild(placeholder);
        });
    });
    
    // Add keyframe animation for flip effect
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes flip {
            0% {
                transform: rotateX(0);
            }
            50% {
                transform: rotateX(90deg);
            }
            100% {
                transform: rotateX(0);
            }
        }
        
        .flip {
            animation: flip 0.5s;
        }
    `;
    document.head.appendChild(style);
    
    // Add scroll reveal animations to elements
    const scrollElements = document.querySelectorAll('.about-text p, .section-title, .about-buttons, .fact-card, .card');
    scrollElements.forEach((el, index) => {
        if (!el.hasAttribute('data-aos')) {
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', (index % 3) * 100 + '');
        }
    });
    
    // Initialize any dynamic content
    if (document.querySelector('.card-preview') && !document.querySelector('.card-preview').innerHTML.trim()) {
        document.querySelector('.card-preview').innerHTML = '<p>No preview available</p>';
    }

    // Social Media Sharing Functions
    window.shareOnFacebook = function(cardTitle) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(`Check out this beautiful ${cardTitle} Eid al-Adha greeting card!`);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, 'facebook-share-dialog', 'width=626,height=436');
    };

    window.shareOnTwitter = function(cardTitle) {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Check out this beautiful ${cardTitle} Eid al-Adha greeting card!`);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, 'twitter-share-dialog', 'width=626,height=436');
    };

    window.shareOnWhatsApp = function(cardTitle) {
        const text = encodeURIComponent(`Check out this beautiful ${cardTitle} Eid al-Adha greeting card! ${window.location.href}`);
        window.open(`https://wa.me/?text=${text}`, 'whatsapp-share-dialog', 'width=626,height=436');
    };

    window.shareOnInstagram = function(cardTitle) {
        const text = encodeURIComponent(`Check out this beautiful ${cardTitle} Eid al-Adha greeting card! ${window.location.href}`);
        window.open(`https://www.instagram.com/?text=${text}`, 'instagram-share-dialog', 'width=626,height=436');
    };

    window.shareOnTelegram = function(cardTitle) {
        const text = encodeURIComponent(`Check out this beautiful ${cardTitle} Eid al-Adha greeting card! ${window.location.href}`);
        window.open(`https://t.me/share/url?url=${window.location.href}&text=${text}`, 'telegram-share-dialog', 'width=626,height=436');
    };

    window.shareOnLinkedin = function(cardTitle) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(`Check out this beautiful ${cardTitle} Eid al-Adha greeting card!`);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, 'linkedin-share-dialog', 'width=626,height=436');
    };

    window.shareOnYoutube = function(cardTitle) {
        const text = encodeURIComponent(`Check out this beautiful ${cardTitle} Eid al-Adha greeting card! ${window.location.href}`);
        window.open(`https://www.youtube.com/?text=${text}`, 'youtube-share-dialog', 'width=626,height=436');
    };

    // Function to check if we're in card view mode
    function isCardViewMode() {
        return window.location.hash.startsWith('#card/');
    }

    // Function to display card in view mode
    function displayCardView() {
        if (!isCardViewMode()) return;

        const cardData = window.location.hash.replace('#card/', '');
        try {
            const decodedData = decodeURIComponent(atob(cardData));
            const card = JSON.parse(decodedData);
            
            // Hide all sections except the card view
            document.querySelectorAll('section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Create and display the card
            const cardView = document.createElement('div');
            cardView.className = 'card-view';
            cardView.innerHTML = `
                <div class="card">
                    <div class="card-content">
                        <h2>${card.title}</h2>
                        <p>${card.message}</p>
                        <p class="signature">- ${card.sender}</p>
                    </div>
                    <div class="share-buttons">
                        <a href="#" class="share-btn" onclick="shareCard('facebook')">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="share-btn" onclick="shareCard('twitter')">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="share-btn" onclick="shareCard('whatsapp')">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
            `;
            
            document.body.appendChild(cardView);
        } catch (error) {
            console.error('Error displaying card:', error);
            window.location.href = '/';
        }
    }

    // Update the shareCard function to include direct card link
    function shareCard(platform) {
        const cardData = {
            title: document.getElementById('card-title').value,
            message: document.getElementById('card-message').value,
            sender: document.getElementById('sender-name').value
        };
        
        const encodedData = btoa(JSON.stringify(cardData));
        const directCardUrl = `${window.location.origin}${window.location.pathname}#card/${encodedData}`;
        
        let shareUrl = '';
        const shareText = `Check out this Eid greeting card from ${cardData.sender}!`;
        
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(directCardUrl)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(directCardUrl)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + directCardUrl)}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${encodeURIComponent('Eid Greeting Card')}&body=${encodeURIComponent(shareText + '\n\n' + directCardUrl)}`;
                break;
            case 'sms':
                const phoneNumber = document.getElementById('phone-number').value;
                shareUrl = `sms:${phoneNumber}?body=${encodeURIComponent(shareText + ' ' + directCardUrl)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    }

    // Initialize card view on page load
    document.addEventListener('DOMContentLoaded', () => {
        if (isCardViewMode()) {
            displayCardView();
        }
    });

    // Generate a shareable card-view link
    window.generateCardViewLink = function() {
        const recipient = document.getElementById('recipient').value || 'Friend';
        const sender = document.getElementById('sender').value || 'You';
        const message = document.getElementById('message').value || 'Wishing you a blessed Eid al-Adha!';
        const template = document.getElementById('template').value || 'traditional';
        const cardData = { recipient, sender, message, template };
        const encoded = btoa(encodeURIComponent(JSON.stringify(cardData)));
        const link = `${window.location.origin}/card-view.html?data=${encoded}`;
        return link;
    };

    // Optionally, add a button to show/copy the link in the preview area
    function addShareableLinkButton() {
        const previewActions = document.querySelector('.preview-actions');
        if (!previewActions) return;
        let linkBtn = document.getElementById('showCardLinkBtn');
        if (!linkBtn) {
            linkBtn = document.createElement('button');
            linkBtn.id = 'showCardLinkBtn';
            linkBtn.className = 'btn btn-secondary';
            linkBtn.textContent = 'Get Shareable Card Link';
            linkBtn.style.marginTop = '10px';
            previewActions.appendChild(linkBtn);
        }
        linkBtn.onclick = function() {
            const link = window.generateCardViewLink();
            let linkBox = document.getElementById('cardLinkBox');
            if (!linkBox) {
                linkBox = document.createElement('input');
                linkBox.id = 'cardLinkBox';
                linkBox.type = 'text';
                linkBox.readOnly = true;
                linkBox.style.width = '100%';
                linkBox.style.marginTop = '8px';
                previewActions.appendChild(linkBox);
            }
            linkBox.value = link;
            linkBox.select();
            document.execCommand('copy');
            linkBtn.textContent = 'Link Copied!';
            setTimeout(() => { linkBtn.textContent = 'Get Shareable Card Link'; }, 1500);
        };
    }

    // Add the button after preview is shown
    window.previewCard = (function(origPreviewCard) {
        return function() {
            origPreviewCard();
            addShareableLinkButton();
        };
    })(window.previewCard);
}); 