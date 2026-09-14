// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Navbar Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effects
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const progress = document.getElementById('progress-bar');
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progress.style.width = scrolled + '%';
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

window.addEventListener('load', () => {
    const typingTitle = document.getElementById('typing-title');
    typeWriter(typingTitle, 'Mobile App Development Student', 150);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Skills progress bars
            if (entry.target.classList.contains('skill-card')) {
                const progress = entry.target.querySelector('.progress');
                const width = progress.getAttribute('data-width');
                setTimeout(() => {
                    progress.style.width = width + '%';
                }, 500);
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements and skills
document.querySelectorAll('.hero, .about, .skills, .projects, .asd-section, .contact').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

// Smooth scrolling for CTA button
document.querySelector('.cta-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Project data
const graphicDesignImages = [
    '01.jpeg',
    '02.jpeg',
    '03.jpeg',
    '04.jpeg',
    '05.jpeg',
    '06.jpeg',
    '07.jpeg'
];

const projectData = [
    {
        type: 'coming-soon',
        categories: ['all', 'web'],
        title: 'Projects Coming Soon',
        subtitle: "I'm currently working on exciting projects. Stay tuned!",
        icon: 'fas fa-rocket'
    },
    ...Array.from({ length: 15 }, (_, index) => ({
        type: 'ui',
        categories: ['all', 'ui'],
        src: `images/asd/${index + 1}.png`,
        alt: `UI project ${index + 1}`
    })),
    ...graphicDesignImages.map((fileName) => ({
        type: 'graphic',
        categories: ['all', 'graphic'],
        src: `images/design/${fileName}`,
        alt: ''
    }))
];

const projectGrid = document.getElementById('project-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-content">
        <button class="lightbox-close" type="button" aria-label="Close image">&times;</button>
        <img src="" alt="Project preview">
    </div>
`;
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

function openLightbox(src) {
    lightboxImage.src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImage.src = '';
}

lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target === lightboxClose) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

function renderProjects(filter = 'all') {
    if (!projectGrid) return;

    projectGrid.innerHTML = '';

    projectData
        .filter((project) => project.categories.includes(filter))
        .forEach((project) => {
            const card = document.createElement('article');
            card.className = project.type === 'coming-soon' ? 'project-card project-card--soon' : 'project-card';

            if (project.type === 'coming-soon') {
                card.innerHTML = `
                    <div>
                        <i class="${project.icon}"></i>
                        <h3>${project.title}</h3>
                        <p>${project.subtitle}</p>
                    </div>
                `;
            } else {
                card.classList.toggle('project-card--graphic', project.type === 'graphic');
                card.innerHTML = `<img src="${project.src}" alt="${project.alt}" loading="lazy">`;
                card.addEventListener('click', () => openLightbox(project.src));
            }

            projectGrid.appendChild(card);
        });
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');

        filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
        renderProjects(filterValue);
    });
});

renderProjects();

// Button click animation
document.querySelectorAll('.cta-btn, .social-link, .asd-instagram, .asd-visit-button').forEach(btn => {
    btn.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

