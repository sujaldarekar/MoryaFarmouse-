document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================
       1. NAVBAR & SCROLL EFFECTS
       ========================================== */
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Navbar styling on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";

        // Back to Top button visibility
        if (window.scrollY > 500) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ==========================================
       2. MOBILE MENU
       ========================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    /* ==========================================
       3. LIGHTBOX GALLERY
       ========================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryImgs = document.querySelectorAll('.gallery-img');

    galleryImgs.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.remove('hidden');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.classList.add('hidden');
        }
    });

    /* ==========================================
       4. SMART CHATBOT LOGIC
       ========================================== */
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotText = document.getElementById('chatbot-text');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotTyping = document.getElementById('chatbot-typing');
    const quickBtns = document.querySelectorAll('.quick-btn');

    // Toggle Chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.remove('chatbot-hidden');
        chatbotText.focus();
    });

    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.add('chatbot-hidden');
    });

    // Knowledge Base Rules
    const knowledgeBase = [
        {
            keywords: ['price', 'cost', 'money', 'charge', 'rs', 'rupee', 'pricing'],
            response: "Our pricing is <strong>₹1500 per person</strong>, which includes breakfast, lunch, dinner, and a welcome drink 😊"
        },
        {
            keywords: ['food', 'lunch', 'dinner', 'breakfast', 'eat', 'meal', 'veg', 'nonveg'],
            response: "Yes! Delicious food is included in the plan. You will get a Welcome drink, Breakfast, Lunch, and Dinner. 🍽️"
        },
        {
            keywords: ['location', 'address', 'where', 'map', 'reach', 'situated'],
            response: "We are located at: <strong>Morya Farmhouse, AT. Post: Wavarle, Tal: Khalapur, PIN: 410206</strong> 📍"
        },
        {
            keywords: ['amenities', 'facility', 'facilities', 'pool', 'swimming', 'music', 'parking'],
            response: "We offer premium amenities including: <br>- A relaxing Swimming Pool 🏊<br>- Lush Green Garden 🌳<br>- Outdoor Seating <br>- Music System 🎵<br>- Secure Parking 🚗"
        },
        {
            keywords: ['activities', 'game', 'games', 'play', 'sports', 'cricket', 'indoor', 'outdoor'],
            response: "We have lots of fun activities! <br><strong>Outdoor:</strong> Cricket, Football, Badminton, Volleyball 🏏⚽<br><strong>Indoor:</strong> Carrom, Chess, Ludo, Cards ♟️🃏"
        },
        {
            keywords: ['book', 'booking', 'reserve', 'reservation', 'contact', 'number', 'call', 'whatsapp'],
            response: "You can easily book your stay by calling or messaging us on <a href='https://wa.me/919923147046' target='_blank' style='color:#1b5e20; text-decoration:underline;'>WhatsApp</a>. Or <a href='#contact' style='color:#1b5e20; text-decoration:underline;'>Scroll down to our Contact Section</a>! 👇"
        },
        {
            keywords: ['hello', 'hi', 'hey', 'namaste'],
            response: "Hello there! 👋 How can I assist you with your booking at Morya Farmhouse today?"
        }
    ];

    const fallbackResponse = "Sorry, I didn’t understand. Please contact us directly via <a href='https://wa.me/919923147046' target='_blank' style='color:#1b5e20; text-decoration:underline;'>WhatsApp</a> 😊";

    // Detect user intent
    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();
        
        for (let item of knowledgeBase) {
            const isMatch = item.keywords.some(keyword => lowerInput.includes(keyword));
            if (isMatch) return item.response;
        }
        
        return fallbackResponse;
    }

    // Scroll to bottom of chat
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Add message to DOM
    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        
        if (sender === 'user') {
            msgDiv.classList.add('user-message');
        } else {
            msgDiv.classList.add('bot-message');
        }
        
        msgDiv.innerHTML = text;
        chatbotMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    // Handle sending message
    function handleSend() {
        const text = chatbotText.value.trim();
        if (!text) return;

        // Display user message
        appendMessage('user', text);
        chatbotText.value = '';

        // Show typing indicator
        chatbotTyping.classList.remove('hidden');
        scrollToBottom();

        // Simulate network delay for bot processing
        setTimeout(() => {
            chatbotTyping.classList.add('hidden');
            const response = getBotResponse(text);
            appendMessage('bot', response);
            
            // Add quick options back to the end occasionally if needed, but not required yet.
        }, 1000); // 1 second delay
    }

    // Event Listeners for Chatbot Input
    chatbotSend.addEventListener('click', handleSend);

    chatbotText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    // Quick Option buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            let userText = "";
            switch(query) {
                case 'price': userText = "What is the price?"; break;
                case 'location': userText = "Where is it located?"; break;
                case 'amenities': userText = "What amenities do you have?"; break;
                case 'booking': userText = "How to book?"; break;
            }
            
            chatbotText.value = userText;
            handleSend();
            
            // Optionally hide quick options after first use
            // document.getElementById('quick-options').style.display = 'none';
        });
    });
});
