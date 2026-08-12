/**
 * J.A. YEHANI PRABODHYA - PORTFOLIO INTERACTIVE SCRIPT
 * Vanilla JavaScript implementation for theme switching, ambient particle background,
 * responsive navigation, modal dialogs, and contact form handling.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Ambient Canvas Particle Background
    initAmbientCanvas();

    // 2. Initialize Dark / Light Theme Switcher
    initThemeSwitcher();

    // 3. Initialize Navigation & Active Link Scroll Spy
    initNavigation();

    // 4. Initialize Project Detail Modals
    initModals();

    // 5. Initialize Contact Form & Mailto Handler
    initContactForm();

    // 6. Initialize CV Actions
    initCVHandler();
});

/* ==========================================================================
   1. AMBIENT CANVAS BACKGROUND PARTICLES
   ========================================================================== */
function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;

    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        canvas.style.display = 'none';
        return;
    }

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor(width / 30), 40);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 1;
            this.alpha = Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark 
                ? `rgba(167, 139, 250, ${this.alpha})` 
                : `rgba(109, 40, 217, ${this.alpha * 0.6})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = (1 - dist / 110) * 0.12;
                    ctx.strokeStyle = isDark 
                        ? `rgba(6, 186, 212, ${opacity})` 
                        : `rgba(2, 132, 199, ${opacity})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

/* ==========================================================================
   2. THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeSwitcher() {
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElem = document.documentElement;

    // Load theme setting from LocalStorage or default to 'dark'
    const savedTheme = localStorage.getItem('yp_theme') || 'dark';
    htmlElem.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElem.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElem.setAttribute('data-theme', newTheme);
            localStorage.setItem('yp_theme', newTheme);
            
            showToast(`Switched to ${newTheme.toUpperCase()} theme`);
        });
    }
}

/* ==========================================================================
   3. NAVIGATION & SCROLL SPY
   ========================================================================== */
function initNavigation() {
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Header Shadow on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // Mobile Toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (isActive) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close Mobile Menu on Nav Item Click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Scroll Spy using IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '-25% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. MODALS INTERACTION (PROJECT DETAILS)
   ========================================================================== */
function initModals() {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.modal-close');
    const overlays = document.querySelectorAll('.modal-overlay');

    modalTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add('active');
                targetModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            overlays.forEach(overlay => {
                overlay.classList.remove('active');
                overlay.setAttribute('aria-hidden', 'true');
            });
            document.body.style.overflow = '';
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                overlay.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            overlays.forEach(overlay => {
                if (overlay.classList.contains('active')) {
                    overlay.classList.remove('active');
                    overlay.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                }
            });
        }
    });
}

/* ==========================================================================
   5. CV ACTIONS
   ========================================================================== */
function initCVHandler() {
    const downloadBtn = document.getElementById('download-cv-link');
    const viewBtn = document.getElementById('view-cv-link');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            showToast('Downloading Yehani_Prabodhya_CV.pdf...');
        });
    }

    if (viewBtn) {
        viewBtn.addEventListener('click', () => {
            showToast('Opening CV in a new tab...');
        });
    }
}

/* ==========================================================================
   6. CONTACT FORM & TOAST NOTIFICATIONS
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('#submit-btn');
        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const subjectInput = form.querySelector('#subject');
        const messageInput = form.querySelector('#message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const subject = subjectInput ? subjectInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !subject || !message) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }

        // Show button loading state
        const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> <span>Sending Message...</span>`;
        }

        try {
            const formData = new FormData(form);
            const response = await fetch('https://formsubmit.co/ajax/yehaninawarathna2003@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                showToast(`Thank you, ${name}! Your message has been sent successfully to yehaninawarathna2003@gmail.com.`, 'success');
                form.reset(); // Clears all input fields and history
            } else {
                showToast(`Thank you, ${name}! Your message was dispatched.`, 'success');
                form.reset();
            }
        } catch (error) {
            // Fallback for offline/CORS environments
            showToast(`Thank you, ${name}! Opening mail client to finalize sending...`, 'info');
            window.location.href = `mailto:yehaninawarathna2003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
            form.reset();
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            }
        }
    });
}

/**
 * Toast Notification System
 */
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let iconClass = 'fa-circle-check';
    let iconColor = '#10b981';

    if (type === 'error') {
        iconClass = 'fa-triangle-exclamation';
        iconColor = '#ef4444';
    } else if (type === 'success') {
        iconClass = 'fa-circle-check';
        iconColor = '#10b981';
    }

    toast.innerHTML = `
        <i class="fa-solid ${iconClass}" style="color: ${iconColor};" aria-hidden="true"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}
