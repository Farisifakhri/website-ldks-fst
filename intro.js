// =================================================================== //
// ✨ ENHANCED INTRO.JS - Modern Intro Animation for LDKS FST          //
// =================================================================== //

document.addEventListener("DOMContentLoaded", () => {
  initializeIntroScreen();
  createDynamicElements();
});

function initializeIntroScreen() {
  const introScreen = document.getElementById("introScreen");
  if (!introScreen) {
    // Create intro screen if it doesn't exist
    createIntroScreen();
    return;
  }
  
  // Add loading indicator
  addLoadingIndicator();
  
  // Add interactive elements
  addInteractiveElements();
  
  // Auto-hide after animation completes
  setTimeout(() => {
    hideIntroScreen();
  }, 4000); // 4 seconds total duration
  
  // Allow manual skip
  addSkipButton();
}

function createIntroScreen() {
  const introHTML = `
    <div class="intro-screen" id="introScreen">
      <div class="intro-content">
        <div class="intro-logo">
          <img src="assets/logo.png" alt="Logo LDKS FST" class="logo-animate">
        </div>
        <h1 class="intro-text">LDKS FST</h1>
        <p class="intro-subtitle">Syiar • Keilmuan • Dakwah Digital</p>
        <div class="intro-icons">
          <i class="fas fa-mosque"></i>
          <i class="fas fa-flask"></i>
          <i class="fas fa-laptop-code"></i>
        </div>
      </div>
      <div class="intro-cloud one"></div>
      <div class="intro-cloud two"></div>
      <div class="intro-cloud three"></div>
      <div class="glass-element glass-1"></div>
      <div class="glass-element glass-2"></div>
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('afterbegin', introHTML);
  setTimeout(() => initializeIntroScreen(), 100);
}

function addLoadingIndicator() {
  const introContent = document.querySelector('.intro-content');
  if (!introContent) return;
  
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'intro-loading';
  loadingIndicator.innerHTML = `
    <span>Memuat</span>
    <div class="loading-dots">
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
    </div>
  `;
  
  introContent.appendChild(loadingIndicator);
}

function addSkipButton() {
  const introScreen = document.getElementById("introScreen");
  if (!introScreen) return;
  
  const skipButton = document.createElement('button');
  skipButton.className = 'intro-skip';
  skipButton.innerHTML = '<i class="fas fa-forward"></i> Skip';
  skipButton.style.cssText = `
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    animation: skipButtonEntry 1s 2s ease-out both;
  `;
  
  // Add skip button styles
  const skipStyles = document.createElement('style');
  skipStyles.textContent = `
    .intro-skip:hover {
      background: rgba(255, 255, 255, 0.3) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
    }
    @keyframes skipButtonEntry {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(skipStyles);
  
  skipButton.addEventListener('click', () => {
    hideIntroScreen();
  });
  
  introScreen.appendChild(skipButton);
}

function addInteractiveElements() {
  const icons = document.querySelectorAll('.intro-icons i');
  
  icons.forEach((icon, index) => {
    icon.addEventListener('mouseenter', () => {
      playIconSound(index);
      icon.style.transform = 'scale(1.3) rotate(15deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
    
    icon.addEventListener('click', () => {
      createIconRipple(icon);
    });
  });
}

function playIconSound(index) {
  // Simple audio feedback (optional - uncomment to enable)
  /*
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
  oscillator.frequency.setValueAtTime(frequencies[index] || 523.25, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
  */
}

function createIconRipple(icon) {
  const ripple = document.createElement('div');
  const rect = icon.getBoundingClientRect();
  const size = 60;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: iconRipple 0.8s ease-out;
    left: ${rect.left + rect.width/2 - size/2}px;
    top: ${rect.top + rect.height/2 - size/2}px;
    pointer-events: none;
    z-index: 10000;
  `;
  
  // Add ripple animation if not exists
  if (!document.querySelector('#icon-ripple-styles')) {
    const rippleStyles = document.createElement('style');
    rippleStyles.id = 'icon-ripple-styles';
    rippleStyles.textContent = `
      @keyframes iconRipple {
        to {
          transform: scale(3);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(rippleStyles);
  }
  
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 800);
}

function hideIntroScreen() {
  const introScreen = document.getElementById("introScreen");
  if (!introScreen) return;
  
  // Add exit animation
  introScreen.classList.add('fade-out');
  
  // Play exit sound effect
  playExitSound();
  
  setTimeout(() => {
    introScreen.classList.add("hidden");
    
    // Remove from DOM after transition
    setTimeout(() => {
      if (introScreen.parentNode) {
        introScreen.parentNode.removeChild(introScreen);
      }
      
      // Trigger main page entrance animations
      triggerMainPageAnimations();
    }, 1000);
  }, 100);
}

function playExitSound() {
  // Optional sound effect for intro exit
  /*
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(261.63, audioContext.currentTime + 0.5);
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
  */
}

function triggerMainPageAnimations() {
  // Add entrance animations to main page elements
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.animation = 'heroEntrance 1s ease-out';
  }
  
  // Add hero entrance animation
  const heroStyles = document.createElement('style');
  heroStyles.textContent = `
    @keyframes heroEntrance {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(heroStyles);
  
  // Trigger other page animations with stagger
  const animatedElements = document.querySelectorAll('.reveal-on-scroll');
  animatedElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('visible');
    }, index * 100); // Stagger animations
  });
}

function createDynamicElements() {
  const introScreen = document.getElementById("introScreen");
  if (!introScreen) return;
  
  // Create floating particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'intro-particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 6 + 2}px;
      height: ${Math.random() * 6 + 2}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    
    introScreen.appendChild(particle);
  }
  
  // Add particle animation
  const particleStyles = document.createElement('style');
  particleStyles.textContent = `
    @keyframes particleFloat {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(particleStyles);
}

// =================================================================== //
// 🎮 EASTER EGGS AND INTERACTIONS                                     //
// =================================================================== //
function addEasterEggs() {
  let clickCount = 0;
  const logo = document.querySelector('.logo-animate');
  
  if (logo) {
    logo.addEventListener('click', () => {
      clickCount++;
      
      if (clickCount === 5) {
        // Secret animation after 5 clicks
        logo.style.animation = 'logoSecret 2s ease-in-out';
        
        const secretStyles = document.createElement('style');
        secretStyles.textContent = `
          @keyframes logoSecret {
            0% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.5) rotate(90deg); }
            50% { transform: scale(1.2) rotate(180deg); }
            75% { transform: scale(1.8) rotate(270deg); }
            100% { transform: scale(1) rotate(360deg); }
          }
        `;
        document.head.appendChild(secretStyles);
        
        // Reset counter
        setTimeout(() => {
          clickCount = 0;
          logo.style.animation = '';
        }, 2000);
      }
    });
  }
}

// Initialize easter eggs after intro loads
setTimeout(addEasterEggs, 1000);