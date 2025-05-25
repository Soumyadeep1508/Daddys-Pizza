// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if(elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Add falling ingredients animation
    const createFallingTopping = () => {
        const toppings = ['🍕', '🍅', '🧀', '🍄', '🥓', '🌶️'];
        const topping = document.createElement('div');
        topping.style.position = 'fixed';
        topping.style.top = '-50px';
        topping.style.left = Math.random() * window.innerWidth + 'px';
        topping.style.fontSize = Math.random() * 20 + 15 + 'px';
        topping.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        topping.textContent = toppings[Math.floor(Math.random() * toppings.length)];
        
        document.body.appendChild(topping);
        
        setTimeout(() => topping.remove(), 5000);
    };

    // Cart notification system
    let cartCount = 0;
    const updateCart = () => {
        const cartBadge = document.getElementById('cart-badge');
        cartBadge.textContent = cartCount;
        cartBadge.classList.add('bounce');
        setTimeout(() => cartBadge.classList.remove('bounce'), 500);
    };

    // Interactive pizza card hover
    const addPizzaHover = () => {
        document.querySelectorAll('.pizza-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const x = e.pageX - card.offsetLeft;
                const y = e.pageY - card.offsetTop;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${(y - card.offsetHeight/2) / 10}deg)
                    rotateY(${-(x - card.offsetWidth/2) / 10}deg)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    };

    // Add magic sparkles effect
    const createSparkle = (x, y) => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    };

    // Initialize event listeners
    const init = () => {
        // Add animations to elements
        document.querySelectorAll('.pizza-card, .offer-banner, .membership-card').forEach(el => {
            el.classList.add('animate');
        });

        // Create falling toppings periodically
        setInterval(createFallingTopping, 1500);

        // Add cart functionality
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                cartCount++;
                updateCart();
                createSparkle(e.clientX, e.clientY);
            });
        });

        // Add sparkle effect on click
        document.addEventListener('click', (e) => {
            createSparkle(e.clientX, e.clientY);
        });

        // Initialize scroll animations
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll();
        
        // Add 3D hover effect
        addPizzaHover();
    };

    // Add dynamic time-based greeting
    const updateGreeting = () => {
        const hour = new Date().getHours();
        const greeting = document.getElementById('greeting');
        if(hour < 12) greeting.textContent = 'Good Morning! 🍳';
        else if(hour < 18) greeting.textContent = 'Good Afternoon! 🍕';
        else greeting.textContent = 'Good Evening! 🌙';
    };

    // For Js File
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to { transform: translateY(110vh) rotate(360deg); }
        }
        
        .animate {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .sparkle {
            position: fixed;
            inline-size: 10px;
            block-size: 10px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            animation: sparkle 0.8s linear;
        }
        
        @keyframes sparkle {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
        }
        
        .bounce {
            animation: bounce 0.5s;
        }
        
        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);

    // Initialize all features
    init();
    updateGreeting();
});