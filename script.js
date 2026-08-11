/**
 * J.A. YEHANI PRABODHYA - PORTFOLIO INTERACTIVE SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. AMBIENT CANVAS BACKGROUND PARTICLES
    initAmbientCanvas();

    // 2. THEME SWITCHER (DARK / LIGHT MODE)
    initThemeSwitcher();

    // 3. NAVIGATION & MOBILE DRAWER
    initNavigation();

    // 4. MODALS INTERACTION (PROJECTS & CV)
    initModals();

    // 5. CV DOWNLOAD & PRINT HANDLING
    initCVHandler();

    // 6. CONTACT FORM & TOAST NOTIFICATION
    initContactForm();
});

// /* ===========================================
//    1. AMBIENT CANVAS BACKGROUND
//    =========================================== */
// function initAmbientCanvas() {
//     const canvas = document.getElementById('ambient-canvas');
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     let width = canvas.width = window.innerWidth;
//     let height = canvas.height = window.innerHeight;

//     let particles = [];
//     const particleCount = Math.min(Math.floor(width / 25), 45);

//     class Particle {
//         constructor() {
//             this.reset();
//         }

//         reset() {
//             this.x = Math.random() * width;
//             this.y = Math.random() * height;
//             this.vx = (Math.random() - 0.5) * 0.6;
//             this.vy = (Math.random() - 0.5) * 0.6;
//             this.radius = Math.random() * 2 + 1;
//             this.alpha = Math.random() * 0.5 + 0.2;
//         }

//         update() {
//             this.x += this.vx;
//             this.y += this.vy;

//             if (this.x < 0 || this.x > width) this.vx *= -1;
//             if (this.y < 0 || this.y > height) this.vy *= -1;
//         }

//         draw() {
//             const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
//             ctx.beginPath();
//             ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//             ctx.fillStyle = isDark 
//                 ? `rgba(167, 139, 250, ${this.alpha})` 
//                 : `rgba(124, 58, 237, ${this.alpha * 0.6})`;
//             ctx.fill();
//         }
//     }

//     for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle());
//     }

//     function animate() {
//         ctx.clearRect(0, 0, width, height);

//         const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

//         for (let i = 0; i < particles.length; i++) {
//             particles[i].update();
//             particles[i].draw();

//             // Connect nearby nodes
//             for (let j = i + 1; j < particles.length; j++) {
//                 const dx = particles[i].x - particles[j].x;
//                 const dy = particles[i].y - particles[j].y;
//                 const dist = Math.sqrt(dx * dx + dy * dy);

//                 if (dist < 120) {
//                     ctx.beginPath();
//                     ctx.moveTo(particles[i].x, particles[i].y);
//                     ctx.lineTo(particles[j].x, particles[j].y);
//                     const opacity = (1 - dist / 120) * 0.15;
//                     ctx.strokeStyle = isDark 
//                         ? `rgba(6, 182, 212, ${opacity})` 
//                         : `rgba(2, 132, 199, ${opacity})`;
//                     ctx.lineWidth = 0.8;
//                     ctx.stroke();
//                 }
//             }
//         }

//         requestAnimationFrame(animate);
//     }

//     animate();

//     window.addEventListener('resize', () => {
//         width = canvas.width = window.innerWidth;
//         height = canvas.height = window.innerHeight;
//     });
// }

/* ==========================================
   2. THEME SWITCHER
   ========================================== */
function initThemeSwitcher() {
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElem = document.documentElement;

    // Check saved theme
    const savedTheme = localStorage.getItem('yp_theme') || 'dark';
    htmlElem.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElem.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElem.setAttribute('data-theme', newTheme);
            localStorage.setItem('yp_theme', newTheme);
            showToast(`Switched to ${newTheme.toUpperCase()} mode!`);
        });
    }
}

/* ==========================================
   3. NAVIGATION & SCROLL SPY
   ========================================== */
function initNavigation() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Mobile Toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close mobile drawer on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // Scroll Spy using IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
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

/* ==========================================
   4. MODALS INTERACTION
   ========================================== */
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
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            overlays.forEach(overlay => overlay.classList.remove('active'));
            document.body.style.overflow = '';
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

/* ==========================================
   5. CV HANDLER (PREVIEW & DOWNLOAD)
   ========================================== */
function initCVHandler() {
    const previewBtn = document.getElementById('preview-cv-btn');
    const downloadBtn = document.getElementById('download-cv-btn');
    const printModalBtn = document.getElementById('print-cv-modal-btn');
    const cvModal = document.getElementById('modal-cv');

    if (previewBtn && cvModal) {
        previewBtn.addEventListener('click', () => {
            cvModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    function triggerPrint() {
        showToast('Preparing CV for printing/PDF download...');
        setTimeout(() => {
            window.print();
        }, 500);
    }

    if (downloadBtn) downloadBtn.addEventListener('click', triggerPrint);
    if (printModalBtn) printModalBtn.addEventListener('click', triggerPrint);
}

/* ==========================================
   6. CONTACT FORM & TOASTS
   ========================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();

        if (name && email) {
            showToast(`Thank you, ${name}! Your message has been sent successfully.`);
            form.reset();
        } else {
            showToast('Please fill in all required fields.', 'error');
        }
    });
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fa-solid ${type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-check'}" style="color: ${type === 'error' ? '#ef4444' : '#10b981'};"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
