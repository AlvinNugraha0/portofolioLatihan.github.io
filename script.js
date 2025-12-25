// --- 1. Typing Effect ---
const typingText = document.getElementById('typing-text');
const words = ["Clean Code", "Web Interfaces", "Responsive Apps", "Digital Solutions"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster when deleting
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
        // Finished typing the word, pause before deleting
        isDeleting = true;
        typeSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Start typing effect if element exists
if (typingText) {
    document.addEventListener('DOMContentLoaded', type);
}


// --- 2. Active Link Highlighting (Scroll Spy) ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // 150px offset to trigger highlight a bit earlier
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


// --- 3. Form Validation ---
const contactForm = document.querySelector('form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Stop default generic submission

        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');

        // Simple Reset Borders
        [nameInput, emailInput, messageInput].forEach(input => {
            input.style.borderColor = 'var(--border-color)';
        });

        let isValid = true;
        let errorMessage = "";

        if (nameInput.value.trim() === "") {
            isValid = false;
            nameInput.style.borderColor = "#ef4444"; // Red color
            errorMessage += "Name is required.\n";
        }

        if (emailInput.value.trim() === "") {
            isValid = false;
            emailInput.style.borderColor = "#ef4444";
            errorMessage += "Email is required.\n";
        }

        if (messageInput.value.trim() === "") {
            isValid = false;
            messageInput.style.borderColor = "#ef4444";
            errorMessage += "Message is required.\n";
        }

        if (isValid) {
            // Simulate Success
            alert(`Thanks ${nameInput.value}! Your message has been sent successfully.`);
            this.reset(); // Clear the form
        } else {
            alert("Please fix the following errors:\n" + errorMessage);
        }
    });
}
