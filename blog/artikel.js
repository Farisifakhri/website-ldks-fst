document.addEventListener('DOMContentLoaded', function() {
  // Pastikan data 'articles' dan 'members' tersedia
  if (typeof articles === 'undefined' || typeof members === 'undefined') {
    return;
  }

  // Ambil judul dari H1 halaman artikel ini
  const pageTitle = document.querySelector('.article-header h1').textContent.trim();

  // Cari data artikel ini di 'blog.js' berdasarkan judul
  const currentArticle = articles.find(article => article.title === pageTitle);
  if (!currentArticle) return;

  // Ambil nama penulisnya
  const authorName = currentArticle.author;

  // Cari profil penulis di 'anggota.js' berdasarkan nama
  const authorData = members.find(member => member.name === authorName);
  if (!authorData) {
    // Jika penulis tidak ditemukan, sembunyikan kotak profil
    document.querySelector('.author-box-container').style.display = 'none';
    return;
  }

  // Jika ditemukan, isi "wadah" HTML dengan data profil
  document.getElementById('author-photo').src = `../assets/anggota/${authorData.photo}`;
  document.getElementById('author-photo').alt = `Foto ${authorData.name}`;
  document.getElementById('author-name').textContent = authorData.name;
  document.getElementById('author-position').textContent = `${authorData.position}, Divisi ${authorData.division}`;

  const instagramLink = document.getElementById('author-instagram');
  if (authorData.instagram) {
    instagramLink.href = `https://instagram.com/${authorData.instagram}`;
  } else {
    instagramLink.style.display = 'none';
  }
});