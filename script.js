// =================================================================== //
// ✨ ENHANCED SCRIPT.JS - LDKS FST Website                            //
// Modern interactions, animations, and micro-interactions             //
// =================================================================== //

document.addEventListener('DOMContentLoaded', function() {
  initializeNavbar();
  initializeAnimations();
  initializeCounters();
  initializeCountdown();
  initializeTypingEffect();
  initializeBackToTop();
  initializeMobileMenu();
  initializeTabMenu();
  initializeGalleryLightbox();
  initializeTestimonialSlider();
  initializeProgressBars();
  initializeContactForm();
});

// =================================================================== //
// 🎪 TESTIMONIAL SLIDER                                               //
// =================================================================== //
function initializeTestimonialSlider() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialBtns = document.querySelectorAll('.testimonial-btn');
  
  if (testimonialCards.length === 0) return;
  
  let currentSlide = 0;
  
  function showSlide(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialBtns.forEach(btn => btn.classList.remove('active'));
    
    testimonialCards[index].classList.add('active');
    testimonialBtns[index].classList.add('active');
  }
  
  testimonialBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  // Auto-slide every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
  }, 5000);
}

// =================================================================== //
// 📊 PROGRESS BARS ANIMATION                                          //
// =================================================================== //
function initializeProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.style.width;
        progressBar.style.width = '0%';
        
        setTimeout(() => {
          progressBar.style.width = width;
        }, 200);
        
        progressObserver.unobserve(progressBar);
      }
    });
  });
  
  progressBars.forEach(bar => progressObserver.observe(bar));
}

// =================================================================== //
// 🧭 ENHANCED NAVBAR FUNCTIONALITY                                    //
// =================================================================== //
function initializeNavbar() {
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class for styling
    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });

  // Smooth scroll for same-page navigation
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
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

// =================================================================== //
// ✨ INTERSECTION OBSERVER ANIMATIONS                                  //
// =================================================================== //
function initializeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Special animations for specific elements
        if (entry.target.classList.contains('stat-item')) {
          animateCounter(entry.target.querySelector('.stat-number'));
        }
        
        if (entry.target.classList.contains('program-card')) {
          setTimeout(() => {
            entry.target.style.transform = 'translateY(0) scale(1)';
          }, Math.random() * 200);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe elements for animation
  document.querySelectorAll('.reveal-on-scroll, .program-card, .blog-card, .stat-item').forEach(el => {
    observer.observe(el);
  });
}

// =================================================================== //
// 🔢 ANIMATED COUNTERS                                                //
// =================================================================== //
function initializeCounters() {
  // This will be called by intersection observer when stats come into view
}

function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// =================================================================== //
// ⏰ ENHANCED COUNTDOWN TIMER (Multi-instance support)               //
// =================================================================== //
function initializeCountdown() {
  const countdownElements = document.querySelectorAll('.countdown-timer');
  if (countdownElements.length === 0) return;

  countdownElements.forEach(element => {
    const targetDate = new Date(element.dataset.targetDate).getTime();

    // Buat interval unik untuk setiap elemen countdown
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        element.innerHTML = `
          <div class="countdown-item">
            <span class="countdown-number">${days}</span>
            <span class="countdown-label">Hari</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">${hours}</span>
            <span class="countdown-label">Jam</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">${minutes}</span>
            <span class="countdown-label">Menit</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">${seconds}</span>
            <span class="countdown-label">Detik</span>
          </div>
        `;
      } else {
        element.innerHTML = '<div class="countdown-expired">Waktu Pendaftaran Habis</div>';
        clearInterval(interval); // Hentikan countdown jika waktu habis
      }
    }, 1000);
  });
}

// =================================================================== //
// ⌨️ ENHANCED TYPING EFFECT                                           //
// =================================================================== //
function initializeTypingEffect() {
  const typingElements = document.querySelectorAll('.typing-text');
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    const typeSpeed = 80;
    
    function typeWriter() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, typeSpeed);
      } else {
        // Remove cursor after typing is done
        setTimeout(() => {
          element.style.setProperty('--cursor-display', 'none');
        }, 2000);
      }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
  });
}

// =================================================================== //
// 🔝 BACK TO TOP BUTTON                                               //
// =================================================================== //
function initializeBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// =================================================================== //
// 📱 ENHANCED MOBILE MENU                                             //
// =================================================================== //
function initializeMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isActive = navLinks.classList.contains('active');
    
    menuToggle.innerHTML = isActive 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
      
    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
  });

  // Close menu when clicking on a link
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && !e.target.parentElement.classList.contains('dropdown')) {
      navLinks.classList.remove('active');
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      document.body.style.overflow = 'auto';
    }
  });

  // Enhanced dropdown for mobile
  document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = dropdownToggle.parentElement;
        dropdown.classList.toggle('open');
        
        // Animate dropdown icon
        const icon = dropdownToggle.querySelector('i');
        if (dropdown.classList.contains('open')) {
          icon.style.transform = 'rotate(180deg)';
        } else {
          icon.style.transform = 'rotate(0deg)';
        }
      }
    });
  });
}

// =================================================================== //
// 📑 TAB MENU FUNCTIONALITY                                           //
// =================================================================== //
function initializeTabMenu() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabButtons.length === 0) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
        
        // Add entrance animation
        targetContent.style.opacity = '0';
        targetContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          targetContent.style.opacity = '1';
          targetContent.style.transform = 'translateY(0)';
        }, 50);
      }
    });
  });
}

// =================================================================== //
// 🖼️ GALLERY LIGHTBOX                                                //
// =================================================================== //
function initializeGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery img, .gallery-item img');
  
  galleryItems.forEach(img => {
    img.addEventListener('click', () => {
      createLightbox(img.src, img.alt);
    });
    
    // Add cursor pointer
    img.style.cursor = 'pointer';
  });
}

function createLightbox(src, alt) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-backdrop"></div>
    <div class="lightbox-content">
      <button class="lightbox-close">
        <i class="fas fa-times"></i>
      </button>
      <img src="${src}" alt="${alt}">
      <div class="lightbox-caption">${alt}</div>
    </div>
  `;
  
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
  
  // Add styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .lightbox {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.3s ease;
    }
    .lightbox-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(5px);
    }
    .lightbox-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      text-align: center;
    }
    .lightbox-close {
      position: absolute;
      top: -3rem;
      right: 0;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      transition: var(--transition-fast);
    }
    .lightbox-close:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
    .lightbox img {
      max-width: 100%;
      max-height: 80vh;
      border-radius: 12px;
      box-shadow: var(--shadow-2xl);
    }
    .lightbox-caption {
      color: white;
      margin-top: 1rem;
      font-size: 0.9rem;
      opacity: 0.8;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  // Close lightbox functionality
  function closeLightbox() {
    lightbox.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(lightbox);
      document.head.removeChild(style);
      document.body.style.overflow = 'auto';
    }, 300);
  }
  
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
  
  // Close with Escape key
  document.addEventListener('keydown', function escapeHandler(e) {
    if (e.key === 'Escape') {
      closeLightbox();
      document.removeEventListener('keydown', escapeHandler);
    }
  });
}

// =================================================================== //
// 🌟 PARTICLE BACKGROUND (Only for homepage)                          //
// =================================================================== //
function initializeParticles() {
  if (document.body.id !== 'page-beranda') return;
  
  const canvas = document.createElement('canvas');
  canvas.className = 'particle-canvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    opacity: 0.6;
  `;
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    };
  }
  
  function initParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle());
    }
  }
  
  function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
      ctx.fill();
    });
    
    requestAnimationFrame(updateParticles);
  }
  
  resizeCanvas();
  initParticles();
  updateParticles();
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
}

// =================================================================== //
// 🎨 PROGRAM CARD INTERACTIONS                                        //
// =================================================================== //
function initializeProgramCards() {
  const programCards = document.querySelectorAll('.program-card');
  
  programCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.setProperty('--card-rotation', `${Math.random() * 4 - 2}deg`);
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--card-rotation', '0deg');
    });
    
    // Add ripple effect on click
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('div');
      const rect = this.getBoundingClientRect();
      const size = 100;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(37, 99, 235, 0.3);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
      `;
      
      if (!document.querySelector('#ripple-styles')) {
        const rippleStyles = document.createElement('style');
        rippleStyles.id = 'ripple-styles';
        rippleStyles.textContent = `
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(rippleStyles);
      }
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// =================================================================== //
// 🎭 THEME TOGGLE (Optional)                                          //
// =================================================================== //
function initializeThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.toggle('dark', savedTheme === 'dark');
    updateThemeIcon(savedTheme === 'dark');
  }
  
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
  });
  
  function updateThemeIcon(isDark) {
    themeToggle.innerHTML = isDark 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
  }
}

// =================================================================== //
// 🎯 ENHANCED FORM INTERACTIONS                                       //
// =================================================================== //
function initializeFormEnhancements() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Add floating labels effect
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
      
      // Add success/error states
      input.addEventListener('input', () => {
        validateInput(input);
      });
    });
  });
}

function validateInput(input) {
  const value = input.value.trim();
  const type = input.type;
  
  // Remove previous validation classes
  input.classList.remove('valid', 'invalid');
  
  if (value) {
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      input.classList.add(emailRegex.test(value) ? 'valid' : 'invalid');
    } else {
      input.classList.add('valid');
    }
  }
}

// =================================================================== //
// 🔄 LAZY LOADING FOR IMAGES                                          //
// =================================================================== //
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('lazy-loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// =================================================================== //
// 🎪 SCROLL PROGRESS INDICATOR                                        //
// =================================================================== //
function initializeScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--brand), var(--brand-2));
    z-index: 10001;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${Math.min(scrolled, 100)}%`;
  });
}

// =================================================================== //
// 🎵 SOUND EFFECTS (Optional)                                         //
// =================================================================== //
function initializeSoundEffects() {
  // Create audio context for subtle UI sounds
  let audioContext;
  
  function createTone(frequency, duration = 0.1, volume = 0.1) {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }
  
  // Add subtle sounds to interactions
  document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary, .btn-secondary, .program-link')) {
      createTone(800, 0.1, 0.05);
    }
  });
}

// =================================================================== //
// 🎨 DYNAMIC BACKGROUND COLORS                                        //
// =================================================================== //
function initializeDynamicBackground() {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  ];
  
  let currentIndex = 0;
  const hero = document.querySelector('.hero');
  
  if (!hero) return;
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % colors.length;
    hero.style.background = colors[currentIndex];
  }, 10000); // Change every 10 seconds
}

// =================================================================== //
// 🔧 UTILITY FUNCTIONS                                                //
// =================================================================== //
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// =================================================================== //
// 🚀 PERFORMANCE OPTIMIZATIONS                                        //
// =================================================================== //
window.addEventListener('scroll', throttle(() => {
  // Throttled scroll events
}, 16)); // ~60fps

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
  initializeProgramCards();
  initializeScrollProgress();
  initializeFormEnhancements();
  initializeLazyLoading();
  initializeParticles();
  
  // Optional: Enable sound effects (uncomment to activate)
  // initializeSoundEffects();
  
  // Optional: Enable dynamic backgrounds (uncomment to activate)
  // initializeDynamicBackground();
});

// =================================================================== //
// 📧 ENHANCED CONTACT FORM                                            //
// =================================================================== //
function initializeContactForm() {
  const contactForm = document.querySelector('.join-form, .contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      showNotification('Pesan berhasil dikirim!', 'success');
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: ${type === 'success' ? 'var(--success)' : 'var(--brand)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow-xl);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notificationStyles);