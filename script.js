// =================================================================== //
// ✨ FUNGSI-FUNGSI UTAMA WEBSITE LDKS FST                            //
// =================================================================== //

// Smooth scroll untuk navigasi di halaman yang sama
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    // Cek apakah link adalah link internal untuk scroll (dimulai dengan #)
    if (link.hash !== "") {
      // Cek apakah kita berada di halaman yang sama dengan link tujuan
      if (location.pathname.replace(/^\//, '') == link.pathname.replace(/^\//, '') && location.hostname == link.hostname) {
        e.preventDefault();
        const target = document.querySelector(link.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });
});

// Efek kecil: mengubah background navbar saat scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0,0,0,0.6)";
  } else {
    navbar.style.background = "rgba(0,0,0,0.3)";
  }
});

// 🌙 Toggle mode siang/malam
const toggleBtn = document.getElementById("toggle-theme");
const body = document.body;

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("light-mode");
      if (body.classList.contains("light-mode")) {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
}

// =================================================================== //
// ✨ SCROLL-TRIGGERED ANIMATIONS (Intersection Observer)             //
// =================================================================== //
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Hentikan pengamatan setelah animasi muncul sekali
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1 // Animasi muncul saat 10% elemen terlihat
});

// Pilih semua elemen yang akan dianimasikan saat scroll
const elementsToAnimate = document.querySelectorAll('.reveal-on-scroll');
elementsToAnimate.forEach((el) => observer.observe(el));

// =================================================================== //
// ✨ ANIMASI TAMBAHAN UNTUK UPGRADE TAMPILAN                         //
// =================================================================== //

// Generate bintang di background
const starsContainer = document.createElement('div');
starsContainer.className = 'stars';
document.body.appendChild(starsContainer);

for (let i = 0; i < 40; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  s.style.top = Math.random() * 100 + 'vh';
  s.style.left = Math.random() * 100 + 'vw';
  s.style.animationDuration = (2 + Math.random() * 3) + 's';
  starsContainer.appendChild(s);
}

// Efek typing untuk header (jika ada elemen dengan class typing-text)
const typingEl = document.querySelector('.typing-text');
if (typingEl) {
  const text = typingEl.textContent;
  typingEl.textContent = '';
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      typingEl.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  typeWriter();
}

// =================================================================== //
// 📱 HAMBURGER MENU                                                   //
// =================================================================== //
const menuToggle = document.createElement("button");
menuToggle.className = "menu-toggle";
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
const navbar = document.querySelector(".navbar");
navbar.insertBefore(menuToggle, navbar.lastElementChild);

const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// =================================================================== //
// TAB MENU UNTUK SYIAR & KEILMUAN                                     //
// =================================================================== //
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    // reset semua
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    // set aktif
    btn.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

