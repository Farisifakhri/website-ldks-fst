// =================================================================== //
// ✨ FUNGSI-FUNGSI UTAMA WEBSITE LDKS FST                            //
// =================================================================== //

// Smooth scroll untuk navigasi di halaman yang sama
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    if (link.hash !== "") {
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
    // Memberi sedikit transparansi agar lebih elegan
    navbar.style.backgroundColor = "rgba(2, 136, 209, 0.9)";
    navbar.style.backdropFilter = "blur(5px)"; // Efek blur (opsional, tapi keren)
  } else {
    navbar.style.backgroundColor = "var(--brand)";
    navbar.style.backdropFilter = "none";
  }
});

// 🌙 Toggle mode siang/malam
const toggleBtn = document.getElementById("toggle-theme");
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      if (document.body.classList.contains("dark")) {
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
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

const elementsToAnimate = document.querySelectorAll('.reveal-on-scroll');
elementsToAnimate.forEach((el) => observer.observe(el));

// =================================================================== //
// ✨ [PERBAIKAN] EFEK BINTANG HANYA DI BERANDA                        //
// =================================================================== //
if (document.body.id === 'page-beranda') {
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars'; // Pastikan ada style untuk .stars di CSS
  document.body.appendChild(starsContainer);

  for (let i = 0; i < 40; i++) {
    const s = document.createElement('div');
    s.className = 'star'; // Pastikan ada style untuk .star di CSS
    s.style.top = Math.random() * 100 + 'vh';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.animationDuration = (2 + Math.random() * 3) + 's';
    starsContainer.appendChild(s);
  }
}

// Efek typing untuk header (jika ada elemen dengan class typing-text)
const typingEl = document.querySelector('.typing-text');
// Cek dulu apakah elemennya ada sebelum menjalankan fungsi
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
const menuToggle = document.querySelector(".menu-toggle"); // Ambil dari HTML/CSS
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
}

// =================================================================== //
// TAB MENU UNTUK SYIAR & KEILMUAN                                     //
// =================================================================== //
const tabBtns = document.querySelectorAll(".tab-btn");
// Cek jika tombol tab ada di halaman ini
if (tabBtns.length > 0) {
    const tabContents = document.querySelectorAll(".tab-content");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        document.getElementById(target).classList.add("active");
      });
    });
}

// =================================================================== //
// 💧 [PERBAIKAN] DROPDOWN MENU DI MOBILE                               //
// =================================================================== //
document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
  dropdownToggle.addEventListener('click', (e) => {
    // Cek apakah kita berada di tampilan mobile (hamburger menu terlihat)
    const menuToggle = document.querySelector(".menu-toggle");
    if (window.getComputedStyle(menuToggle).display !== 'none') {
      e.preventDefault(); // Mencegah link pindah halaman
      const dropdown = dropdownToggle.parentElement;
      dropdown.classList.toggle('open');
    }
  });
});