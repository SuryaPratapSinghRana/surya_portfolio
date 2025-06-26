document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const nav = document.querySelector('.nav-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // --- Theme Toggle ---
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        const isLight = body.classList.contains('light-theme');
        icon.classList.toggle('fa-moon', !isLight);
        icon.classList.toggle('fa-sun', isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-theme');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    // --- Typing Effect ---
    const typingText = document.querySelector('.typing-text');
    const words = ['a Web Developer.', 'a Tech Enthusiast.', 'a Problem Solver.', 'a B.Tech CSE Student.'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        typingText.textContent = currentWord.substring(0, charIndex);

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, isDeleting ? 1000 : 1200);
        }
    }
    type();

    // --- Scroll Reveal Animation ---
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));

    // --- Back to Top Button ---
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 300);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // --- Smooth Scroll & Close Mobile Menu ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
});