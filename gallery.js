document.addEventListener('DOMContentLoaded', function() {
    const photos = [
        { src: "assets/doc1.jpg", alt: "Foto bersama peserta kajian", category: "kajian" },
        { src: "assets/doc2.jpg", alt: "Suasana kegiatan mentoring", category: "mentoring" },
        { src: "assets/doc3.jpg", alt: "Kegiatan bakti sosial", category: "sosial" },
        { src: "assets/doc4.jpg", alt: "Peserta workshop IT", category: "kajian" },
        // Tambahkan foto lain di sini
    ];

    const galleryContainer = document.getElementById('gallery-container');
    const filterBtns = document.querySelectorAll('.filter-menu .filter-btn');

    function displayPhotos(filter = 'all') {
        galleryContainer.innerHTML = '';
        const filteredPhotos = (filter === 'all')
            ? photos
            : photos.filter(p => p.category === filter);

        filteredPhotos.forEach(photo => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${photo.src}" alt="${photo.alt}">
                <div class="gallery-overlay">
                    <div class="gallery-info"><h4>${photo.alt}</h4></div>
                </div>`;
            galleryContainer.appendChild(item);
        });
        
        // Re-initialize lightbox for new items
        initializeGalleryLightbox();
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayPhotos(btn.dataset.filter);
        });
    });

    displayPhotos();
});