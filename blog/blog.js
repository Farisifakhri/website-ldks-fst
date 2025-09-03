document.addEventListener('DOMContentLoaded', function() {
    const articles = [
        {
            title: "Keajaiban Sains dalam Al-Qur’an",
            image: "../assets/blog1.png",
            category: ["syiar", "keilmuan"],
            author: "Muhammad Fakhri Alfarisi",
            date: "2025-08-18", // Gunakan format YYYY-MM-DD untuk pengurutan
            excerpt: "Menyingkap fakta-fakta ilmiah modern tentang embriologi, alam semesta, dan geologi yang ternyata telah diisyaratkan dalam Al-Qur’an.",
            link: "artikel1.html"
        },
        {
            title: "Dakwah Kampus: Cahaya yang Tak Boleh Padam",
            image: "../assets/blog2.jpg",
            category: ["syiar", "opini"],
            author: "Muhammad Syafiq Radyan",
            date: "2025-08-19",
            excerpt: "Mengapa dakwah di kampus itu penting? Mari kita bahas tantangan, cara, dan semangat untuk menjadi penebar kebaikan di lingkungan akademis.",
            link: "artikel2.html"
        },
        
        {
            title: "Manajemen Waktu ala Rasulullah untuk Mahasiswa Sibuk",
            image: "../assets/blog3.jpg",
            category: ["psdm", "keilmuan"], 
            author: "Rahman Faruq Alqorni",
            date: "2025-08-20",
            excerpt: "Tips praktis mengatur waktu kuliah, organisasi, dan ibadah dengan inspirasi dari pola hidup Rasulullah SAW.",
            link: "artikel3.html"
        },
        
        {
            title: "Hasil Diskusi Mind & Ink: Alih Fungsi Hutan & Sawit - LDKS FST",
            image: "../assets/mind-and-ink1.jpg",
            category: ["syiar", "opini"], 
            author: "Avrielle Mauliaraudhah Farmudya",
            date: "2025-08-21",
            excerpt: "Forum diskusi Mind & Ink - edisi perdana telah sukses diselenggarakan dengan tema Menelaah Pernyataan Prabowo Subianto Terkait Alih Fungsi Hutan Menjadi Lahan Kelapa Sawit",
            link: "mind-and-ink-diskusi1.html",
        }// Tambahkan artikel lainnya
    ];

    const blogContainer = document.querySelector('.blog-grid-container');
    const filterBtns = document.querySelectorAll(".filter-btn");

    // Urutkan artikel dari yang paling baru
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    function displayArticles(filter = 'all') {
        blogContainer.innerHTML = '';
        
        const filteredArticles = (filter === 'all') 
            ? articles 
            : articles.filter(article => article.category.includes(filter));

        if (filteredArticles.length === 0) {
            blogContainer.innerHTML = `<p class="no-articles">Tidak ada artikel dalam kategori ini.</p>`;
            return;
        }

        // Artikel pertama akan menjadi featured
        const featuredArticle = filteredArticles[0];
        const regularArticles = filteredArticles.slice(1);

        // Tampilkan artikel featured
        const featuredCard = document.createElement('a');
        featuredCard.href = featuredArticle.link;
        featuredCard.className = 'blog-card-modern featured';
        featuredCard.innerHTML = `
            <div class="card-image">
                <img src="${featuredArticle.image}" alt="${featuredArticle.title}">
                <div class="card-category">${featuredArticle.category.join(', ')}</div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${featuredArticle.title}</h3>
                <p class="card-excerpt">${featuredArticle.excerpt}</p>
                <div class="card-meta">
                    <span><i class="fas fa-user"></i> ${featuredArticle.author}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${new Date(featuredArticle.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
            </div>
        `;
        blogContainer.appendChild(featuredCard);

        // Tampilkan artikel reguler
        regularArticles.forEach(article => {
            const articleCard = document.createElement('a');
            articleCard.href = article.link;
            articleCard.className = 'blog-card-modern';
            articleCard.innerHTML = `
                <div class="card-image">
                    <img src="${article.image}" alt="${article.title}">
                    <div class="card-category">${article.category.join(', ')}</div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${article.title}</h3>
                    <p class="card-excerpt">${article.excerpt}</p>
                    <div class="card-meta">
                        <span><i class="fas fa-user"></i> ${article.author}</span>
                        <span><i class="fas fa-calendar-alt"></i> ${new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                </div>
            `;
            blogContainer.appendChild(articleCard);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filterValue = btn.dataset.filter;
            displayArticles(filterValue);
        });
    });

    displayArticles();
});