// =================================================================== //
// ✨ UPGRADED INTRO.JS - Ultra Modern Intro for LDKS FST Website     //
// =================================================================== //

document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("introScreen");
  
  // Jika tidak ada intro screen, hentikan script
  if (!introScreen) {
    // Pastikan body tidak tersembunyi jika intro tidak ada
    document.body.style.overflow = ''; 
    return;
  }

  // Membuat partikel dinamis untuk latar belakang
  createDynamicParticles(introScreen, 25);

  // Menambahkan tombol Skip
  const skipButton = createSkipButton();
  introScreen.appendChild(skipButton);

  const hideIntro = () => {
    // Jangan jalankan lagi jika sudah hidden
    if (introScreen.classList.contains('hidden')) return;

    // Tambahkan kelas untuk animasi keluar dari CSS
    introScreen.classList.add('fade-out');
    
    // Tampilkan konten utama setelah animasi selesai
    setTimeout(() => {
      introScreen.style.display = 'none';
      document.body.style.overflow = 'auto'; // Kembalikan scroll
    }, 1500); // Sesuaikan dengan durasi animasi di .fade-out
  };

  // Sembunyikan intro setelah 4 detik
  const autoHideTimeout = setTimeout(hideIntro, 4000);

  // Fungsi skip jika tombol diklik
  skipButton.addEventListener('click', () => {
    clearTimeout(autoHideTimeout); // Hentikan auto-hide
    hideIntro();
  });
});

/**
 * Membuat dan menambahkan partikel-partikel ke layar intro.
 * @param {HTMLElement} container - Elemen kontainer untuk partikel.
 * @param {number} count - Jumlah partikel yang akan dibuat.
 */
function createDynamicParticles(container, count) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle'; // Gunakan class dari CSS

    // Atur properti acak
    const size = Math.random() * 5 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(particle);
  }
}

/**
 * Membuat tombol skip dan mengembalikannya sebagai elemen.
 * @returns {HTMLButtonElement}
 */
function createSkipButton() {
  const button = document.createElement('button');
  button.className = 'intro-skip';
  button.innerHTML = 'Skip <i class="fas fa-forward"></i>';
  return button;
}