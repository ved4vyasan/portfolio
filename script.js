// Portfolio Script - Handles dynamic content loading and animations

// Load data and populate the page
document.addEventListener('DOMContentLoaded', function() {
    loadPortfolioData();
    setupScrollAnimations();
    setupSmoothScrolling();
});

// Load and display portfolio data
function loadPortfolioData() {
    // Display name and bio
    const nameDisplay = document.getElementById('name-display');
    const bioDisplay = document.getElementById('bio-display');
    const heroImage = document.getElementById('hero-image');
    
    if (nameDisplay && portfolioData.name) {
        // Display name
        nameDisplay.textContent = portfolioData.name;
        
        // Display bio
        bioDisplay.textContent = portfolioData.bio;
        
        // Display image if available
        if (heroImage && portfolioData.image) {
            const img = document.createElement('img');
            img.src = portfolioData.image;
            img.alt = portfolioData.name;
            heroImage.innerHTML = '';
            heroImage.appendChild(img);
        }
    }
    
    // Load education
    loadEducation();
    
    // Load skills
    loadSkills();
    
    // Load achievements
    loadAchievements();
    
    // Load social links
    loadSocialLinks();
}

// Load education section
function loadEducation() {
    const container = document.getElementById('education-container');
    if (!container || !portfolioData.education) return;
    
    container.innerHTML = portfolioData.education.map(edu => `
        <div class="education-card fade-in-up">
            <div class="education-degree">${edu.degree}</div>
            <div class="education-school">${edu.school}</div>
            <div class="education-year">${edu.year}</div>
        </div>
    `).join('');
}

// Load skills section
function loadSkills() {
    const container = document.getElementById('skills-container');
    if (!container || !portfolioData.skills) return;
    
    container.innerHTML = Object.entries(portfolioData.skills).map(([category, items]) => `
        <div class="skill-category fade-in-up">
            <div class="skill-category-title">${category}</div>
            <ul class="skill-list">
                ${items.map(skill => `<li class="skill-item">${skill}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Load achievements section
function loadAchievements() {
    const container = document.getElementById('achievements-container');
    if (!container || !portfolioData.achievements) return;
    
    container.innerHTML = portfolioData.achievements.map(achievement => `
        <div class="achievement-card fade-in-up">
            <div class="achievement-title">${achievement.title}</div>
            <div class="achievement-description">${achievement.description}</div>
            <div class="achievement-date">${achievement.date}</div>
        </div>
    `).join('');
}

// Load social links
function loadSocialLinks() {
    const container = document.getElementById('social-container');
    if (!container || !portfolioData.social) return;
    
    container.innerHTML = portfolioData.social.map(link => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link fade-in-up">
            <span class="social-icon">${link.icon}</span>
            <span>${link.name}</span>
        </a>
    `).join('');
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.8,
        rootMargin: '0px 0px -10px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.education-card, .skill-category, .achievement-card, .social-link').forEach(el => {
        observer.observe(el);
    });
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
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
}

// Add some terminal-like effects
document.addEventListener('keydown', function(e) {
    // Easter egg: Press 'h' to show help
    if (e.key === 'h' && e.ctrlKey) {
        console.log(`
╔═══════════════════════════════════════╗
║   CYBER SECURITY PORTFOLIO COMMANDS   ║
╠═══════════════════════════════════════╣
║  Ctrl+H  - Show this help            ║
║  Scroll  - Navigate sections         ║
║  Click   - Interact with elements    ║
╚═══════════════════════════════════════╝
        `);
    }
});

