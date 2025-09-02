document.addEventListener('DOMContentLoaded', function() {

    const articles = [
        {
            title: "Keajaiban Sains dalam Al-Qur’an",
            image: "../assets/blog1.png",
            category: ["syiar", "keilmuan"],
            author: "Divisi Syiar & Keilmuan",
            date: "18 Agustus 2025",
            excerpt: "Menyingkap fakta-fakta ilmiah modern tentang embriologi, alam semesta, dan geologi yang ternyata telah diisyaratkan dalam Al-Qur’an.",
            link: "artikel1.html"
        },
        {
            title: "Dakwah Kampus: Cahaya yang Tak Boleh Padam",
            image: "../assets/blog2.jpg",
            category: ["syiar", "opini"],
            author: "Divisi Syiar & Keilmuan",
            date: "19 Agustus 2025",
            excerpt: "Mengapa dakwah di kampus itu penting? Mari kita bahas tantangan, cara, dan semangat untuk menjadi penebar kebaikan di lingkungan akademis.",
            link: "artikel2.html"
        },
        {
            title: "Keajaiban Istighfar: Kisah Imam Ahmad & Penjual Roti",
            image: "../assets/blog3.jpg",
            category: ["syiar"],
            author: "Divisi Syiar & Keilmuan",
            date: "19 Agustus 2025",
            excerpt: "Sebuah kisah nyata yang mengharukan tentang bagaimana amalan istighfar yang istiqamah bisa mendatangkan hal-hal yang tak terduga.",
            link: "artikel3.html"
        },
        {
            title: "Hasil Diskusi Mind & Ink: Alih Fungsi Hutan & Sawit",
            image: "../assets/blog4.jpg",
            category: ["keilmuan", "opini"],
            author: "Divisi Keilmuan",
            date: "15 Mei 2025",
            excerpt: "Mengupas isu alih fungsi hutan menjadi lahan kelapa sawit dari berbagai sudut pandang, merujuk pada data ilmiah dan nilai keislaman.",
            link: "mind-and-ink-diskusi1.html"
        }
        // Tambahkan artikel baru di sini
    ];

    const blogContainer = document.querySelector('.blog-grid-container');
    const filterBtns = document.querySelectorAll(".filter-btn");

    function displayArticles(filter = 'all') {
        blogContainer.innerHTML = ''; // Kosongkan kontainer
        
        const filteredArticles = (filter === 'all') 
            ? articles 
            : articles.filter(article => article.category.includes(filter));

        if (filteredArticles.length === 0) {
            blogContainer.innerHTML = `<p class="no-articles">Tidak ada artikel dalam kategori ini.</p>`;
            return;
        }
        
        filteredArticles.forEach(article => {
            const articleCard = document.createElement('a');
            articleCard.href = article.link;
            articleCard.className = 'blog-card-modern';
            
            articleCard.innerHTML = `
                <div class="card-image">
                    <img src="${article.image}" alt="${article.title}">
                    <div class="card-category">${article.category.join(', ').replace(/^\w/, c => c.toUpperCase())}</div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${article.title}</h3>
                    <p class="card-excerpt">${article.excerpt}</p>
                    <div class="card-meta">
                        <span><i class="fas fa-user"></i> ${article.author}</span>
                        <span><i class="fas fa-calendar-alt"></i> ${article.date}</span>
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

    // Tampilkan semua artikel saat pertama kali halaman dimuat
    displayArticles();
});