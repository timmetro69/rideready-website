/* RideReady Website — Interactions */

(function () {
    'use strict';

    // Nav scroll state
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    function onScroll() {
        const y = window.scrollY;
        if (y > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        // Stagger siblings
                        const parent = entry.target.parentElement;
                        const siblings = Array.from(parent.querySelectorAll('.reveal'));
                        const idx = siblings.indexOf(entry.target);
                        const delay = idx >= 0 ? idx * 80 : 0;

                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, delay);

                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        reveals.forEach((el) => observer.observe(el));
    } else {
        // Fallback: show everything
        reveals.forEach((el) => el.classList.add('visible'));
    }

    // Close mobile nav on link click
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // Smooth scroll for anchor links (fallback for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
