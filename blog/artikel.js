// File ini bertugas sebagai "lem perekat" antara data artikel dan data pengurus

document.addEventListener('DOMContentLoaded', function() {
  // 1. Cek apakah data dari 'blog.js' dan 'anggota.js' sudah siap
  if (typeof articles === 'undefined' || typeof members === 'undefined') {
    console.error("GAGAL: Pastikan file anggota.js dan blog.js sudah dipanggil di HTML sebelum file ini.");
    return;
  }

  // 2. Cari tahu artikel mana yang sedang dibuka berdasarkan judul di H1
  const pageTitleElement = document.querySelector('.article-header h1');
  if (!pageTitleElement) return; // Keluar jika halaman tidak punya judul
  const pageTitle = pageTitleElement.textContent.trim();

  // 3. Cari data lengkap artikel ini di dalam array 'articles'
  const currentArticle = articles.find(article => article.title === pageTitle);
  if (!currentArticle) return; // Keluar jika artikel ini tidak terdaftar di blog.js

  // 4. Dapatkan "kunci"-nya, yaitu nama penulis
  const authorName = currentArticle.author;
  
  // 5. Gunakan "kunci" untuk mencari profil lengkap penulis di array 'members'
  const authorData = members.find(member => member.name === authorName);
  
  const authorBox = document.querySelector('.author-box-container');
  if (!authorBox) return;

  // 6. Jika profil penulis tidak ditemukan di anggota.js, sembunyikan kotak profil
  if (!authorData) {
    authorBox.style.display = 'none';
    return;
  }

  // 7. JIKA DITEMUKAN, saatnya mengisi "wadah" di HTML dengan data yang benar
  const authorPhotoEl = document.getElementById('author-photo');
  const authorNameEl = document.getElementById('author-name');
  const authorPositionEl = document.getElementById('author-position');
  const authorInstagramEl = document.getElementById('author-instagram');
  const authorProfileLinkEl = document.getElementById('author-profile-link');

  // Mengisi FOTO, NAMA, dan JABATAN
  authorPhotoEl.src = `../assets/anggota/${authorData.photo}`;
  authorPhotoEl.alt = `Foto ${authorData.name}`;
  authorNameEl.textContent = authorData.name;
  authorPositionEl.textContent = `${authorData.position}, Divisi ${authorData.division}`;
  
  // Mengisi link INSTAGRAM (hanya jika ada)
  if (authorData.instagram) {
    authorInstagramEl.href = `https://instagram.com/${authorData.instagram}`;
    authorInstagramEl.style.display = 'inline-flex'; // Tampilkan tombol IG
  }
  
  // Membuat LINK ke halaman PENGURUS
  const searchUrl = `../anggota.html?search=${encodeURIComponent(authorData.name)}`;
  authorProfileLinkEl.href = searchUrl;
});