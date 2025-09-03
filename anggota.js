document.addEventListener('DOMContentLoaded', function() {
    const members = [
        // BPH (Badan Pengurus Harian)
        { name: "Muhammad Syafiq Radyan", major: "Kimia", year: 2023, division: "BPH", position: "Ketua Umum", photo: "syafiq.jpg", instagram: "muhammadsyafiq25_", quote: "Memimpin dengan hati, berdakwah dengan aksi." },
        { name: "Nur Anisa Lisnia Dewi", major: "Matematika", year: 2023, division: "BPH", position: "Ketua Keputrian", photo: "nuranisa.png", instagram: "nalisniadewi_", quote: "Menjadi muslimah cerdas yang menginspirasi sesama." },
        { name: "Ammar Hawari", major: "Matematika", year: 2023, division: "BPH", position: "Sekretaris Jendral", photo: "ammar.png", instagram: "ammrhwri_", quote: "Kebaikan itu menular, mari kita mulai dari diri sendiri." },
        { name: "Izhara Fania Citradewi", major: "Biologi", year: 2023, division: "BPH", position: "Bendahara", photo: "izhara.png", instagram: "thisizhaar_", quote: "Amanah dalam setiap hitungan, berkah dalam setiap langkah." },
        { name: "Muhammad Rizki Hariyanto", major: "Sistem Informasi", year: 2024, division: "BPH", position: "Wakil Sekretaris", photo: "hariyanto.jpg", instagram: "mrizkihariyan", quote: "Administrasi rapi, dakwah pun lancar." },
        { name: "Najma Fawza", major: "Matematika", year: 2024, division: "BPH", position: "Wakil Bendahara", photo: "najma.png", instagram: "", quote: "Teliti dalam mengelola, ikhlas dalam melayani." },

        // PSDM (Pengembangan Sumber Daya Muslim)
        { name: "Muhammad Amar Primus Firdaus", major: "Matematika", year: 2023, division: "PSDM", position: "Koordinator Ikhwan", photo: "amar.png", instagram: "amarfirdaus09", quote: "Kaderisasi adalah jantung organisasi, mari rawat bersama." },
        { name: "Nesya Ayu Syifa Yanti", major: "Kimia", year: 2023, division: "PSDM", position: "Koordinator Akhwat", photo: "nesya.png", instagram: "sya.nes_", quote: "Setiap langkah kecil dalam pembinaan adalah investasi masa depan." },
        { name: "Rahman Faruq Alqorni", major: "Sistem Informasi", year: 2024, division: "PSDM", position: "Sekretaris Divisi", photo: "faruq.png", instagram: "rahmanfaruq", quote: "Mencatat setiap proses untuk perbaikan berkelanjutan." },
        { name: "Shaskia Dwi Ramadhani", major: "Biologi", year: 2024, division: "PSDM", position: "Bendahara Divisi", photo: "shaskia.png", instagram: "shaskiadwi", quote: "Mengelola sumber daya untuk keberkahan bersama." },
        { name: "Adila Naila", major: "Kimia", year: 2024, division: "PSDM", position: "Anggota", photo: "adila.png", instagram: "adilanailaa_", quote: "Semangat dalam pembinaan, ikhlas dalam pengabdian." },
        { name: "Lira Marcella", major: "Biologi", year: 2023, division: "PSDM", position: "Anggota", photo: "lira.png", instagram: "lyrnmrcll.ix", quote: "Belajar bersama, tumbuh bersama, kuat bersama." },
        { name: "Muhammad Hafidz Rizky Rahmawan", major: "Teknik Informatika", year: 2024, division: "PSDM", position: "Anggota", photo: "awan.jpg", instagram: "mhafidzerr", quote: "Membentuk generasi Rabbani yang siap memimpin." },
        { name: "Nayla Taqiyya", major: "Teknik Informatika", year: 2024, division: "PSDM", position: "Anggota", photo: "nayla.png", instagram: "naylataqiyya", quote: "Ukhuwah adalah perekat barisan dakwah." },

        // Syiar & Keilmuan
        { name: "Muhammad Fakhri Alfarisi", major: "Teknik Informatika", year: 2023, division: "Syiar & Keilmuan", position: "Koordinator Ikhwan", photo: "fakhri.jpg", instagram: "farisi_fakhri26", quote: "Dakwah tak mengenal kata henti, terus belajar dan berkarya." },
        { name: "Avrielle Mauliaraudhah Farmudya", major: "Biologi", year: 2023, division: "Syiar & Keilmuan", position: "Koordinator Akhwat", photo: "avrielle.png", instagram: "avriellemlee_", quote: "Menyemai ilmu, menuai iman." },
        { name: "Muhammad Fakhri Jihadil Aslam", major: "Agribisnis", year: 2024, division: "Syiar & Keilmuan", position: "Sekretaris Divisi", photo: "jihadil.png", instagram: "fakhrlll", quote: "Tulisan adalah jejak dakwah yang abadi." },
        { name: "Rifdah Fathimah Az-Zahra", major: "Kimia", year: 2023, division: "Syiar & Keilmuan", position: "Bendahara Divisi", photo: "rifdah.png", instagram: "rifdahfaaz_", quote: "Ilmu dan iman adalah dua sisi mata uang yang tak terpisahkan." },
        { name: "Indana Zulfa", major: "Biologi", year: 2024, division: "Syiar & Keilmuan", position: "Anggota", photo: "indana.jpg", instagram: "indanazulfa", quote: "Berbagi ilmu adalah cara terbaik untuk mengikatnya." },
        { name: "Anisa Dilla", major: "Biologi", year: 2024, division: "Syiar & Keilmuan", position: "Anggota", photo: "anisa.jpg", instagram: "anisadilla", quote: "Setiap kajian adalah oase di tengah padang pasir." },
        { name: "Ayu Syahla Nursafitri Rachman", major: "Kimia", year: 2024, division: "Syiar & Keilmuan", position: "Anggota", photo: "ayu.jpg", instagram: "aysnura_", quote: "Sains menguatkan iman, iman menuntun sains." },
        { name: "Ismail Ahmad Muzaki", major: "Biologi", year: 2024, division: "Syiar & Keilmuan", position: "Anggota", photo: "ismail.jpg", instagram: "ismailmuzaki", quote: "Menyebarkan cahaya ilmu di tengah kegelapan." },
        

        // Media Kreatif
        { name: "Rajif Ramadhan", major: "Sistem Informasi", year: 2023, division: "Media Kreatif", position: "Koordinator Ikhwan", photo: "rajif.jpg", instagram: "ajipp_r", quote: "Dakwah di era digital, kreatifitas tanpa batas." },
        { name: "Unaisah", major: "Biologi", year: 2023, division: "Media Kreatif", position: "Koordinator Akhwat", photo: "unaisah.png", instagram: "una.sh_", quote: "Satu desain, sejuta pesan kebaikan." },
        { name: "Azka Acuzio Raines Respati", major: "Sistem Informasi", year: 2024, division: "Media Kreatif", position: "Sekretaris Divisi", photo: "azka.png", instagram: "dwnzzy", quote: "Kreativitas adalah anugerah untuk berdakwah." },
        { name: "Ghein Karimah", major: "Sistem Informasi", year: 2024, division: "Media Kreatif", position: "Bendahara Divisi", photo: "ghein.png", instagram: "gheinkarim", quote: "Desain yang indah adalah dakwah bil hal." },
        { name: "Aisyah Anfaul Ummah", major: "Matematika", year: 2023, division: "Media Kreatif", position: "Anggota", photo: "aisyah.jpg", instagram: "aisyahau", quote: "Visual yang baik menyentuh hati lebih cepat." },
        { name: "Raka Indrasetiawan", major: "Teknik Informatika", year: 2023, division: "Media Kreatif", position: "Anggota", photo: "raka.png", instagram: "rakaindra_26", quote: "Kode dan desain untuk syiar Islam." },
        

        // Pengembangan Ekonomi
        { name: "Muthia Hanifah", major: "Biologi", year: 2024, division: "Pengembangan Ekonomi", position: "Koordinator Akhwat", photo: "muthia.jpg", instagram: "muthiah_", quote: "Wirausaha adalah salah satu pintu rezeki." },
        { name: "Muhammad Farhan Ridho", major: "Sistem Informasi", year: 2024, division: "Pengembangan Ekonomi", position: "Koordinator Ikhwan", photo: "farhan.jpg", instagram: "farhanridho", quote: "Inovasi bisnis untuk kemaslahatan umat." },
        { name: "Rayhan Hilmy Ghotama", major: "Sistem Informasi", year: 2023, division: "Pengembangan Ekonomi", position: "Anggota", photo: "rayhan.jpg", instagram: "rayhan_hilmy", quote: "Ekonomi kuat, dakwah pun mandiri." },
        { name: "Nabila Suci Haryanti", major: "Biologi", year: 2024, division: "Pengembangan Ekonomi", position: "Sekretaris Divisi", photo: "nabila.jpg", instagram: "nabilasuci", quote: "Mencatat setiap transaksi sebagai bentuk amanah." },
        { name: "Pahiriah", major: "Biologi", year: 2024, division: "Pengembangan Ekonomi", position: "Bendahara Divisi", photo: "pahiriah.png", instagram: "pahrhh_", quote: "Keuangan yang sehat, program yang berkah." },
        { name: "Siti Maisaroh Shadrina Syaiputri", major: "Agribisnis", year: 2024, division: "Pengembangan Ekonomi", position: "Anggota", photo: "maisaroh.jpg", instagram: "sitimaisaroh", quote: "Agribisnis syariah untuk kesejahteraan bersama." },

        // Keputrian
        { name: "Sabrina Izzatun Nisa", major: "Matematika", year: 2023, division: "Keputrian", position: "Koordinator Akhwat", photo: "sabrina.jpg", instagram: "sabrinaizzatun", quote: "Muslimah adalah tiang negara, mari perkokoh bersama." },
        { name: "Ratu Amaliah", major: "Teknik Informatika", year: 2023, division: "Keputrian", position: "Sekretaris Divisi", photo: "ratu.jpg", instagram: "ratuamlh_", quote: "Membangun ukhuwah di antara para muslimah." },
        { name: "Farah Syahrani", major: "Agribisnis", year: 2024, division: "Keputrian", position: "Bendahara Divisi", photo: "farah.jpg", instagram: "farahsyahrani", quote: "Muslimah berdaya, umat berjaya." },
        { name: "Aisyah Fitri Sofianti", major: "Kimia", year: 2023, division: "Keputrian", position: "Anggota", photo: "aisyahfitri.jpg", instagram: "aisyahfitri", quote: "Menjadi sebaik-baik perhiasan dunia." },
        { name: "Wafdatul 'Urfi", major: "Teknik Informatika", year: 2024, division: "Keputrian", position: "Anggota", photo: "urfi.png", instagram: "wafdaurfi", quote: "Kecerdasan dan keshalihan berjalan beriringan." },
        
    ];

    const gridContainer = document.getElementById('members-grid');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-buttons .filter-btn');

    function displayMembers(filteredMembers) {
        gridContainer.innerHTML = '';
        if (filteredMembers.length === 0) {
            gridContainer.innerHTML = '<p class="no-articles">Anggota tidak ditemukan.</p>';
            return;
        }

        filteredMembers.forEach(member => {
            const originalIndex = members.findIndex(m => m.name === member.name);
            const card = document.createElement('div');
            card.className = 'member-card';
            card.dataset.index = originalIndex;

            card.innerHTML = `
                <div class="member-photo">
                    <img src="assets/anggota/${member.photo}" alt="Foto ${member.name}" onerror="this.onerror=null;this.src='assets/anggota/default.png';">
                </div>
                <div class="member-info">
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-major">${member.major} ${member.year}</p>
                    <div class="member-division">${member.position}</div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }

    function showProfileModal(memberIndex) {
        const member = members[memberIndex];
        if (!member) return;

        const modal = document.createElement('div');
        modal.className = 'profile-modal-backdrop';
        modal.innerHTML = `
            <div class="profile-modal">
                <button class="profile-close-btn"><i class="fas fa-times"></i></button>
                <div class="profile-header">
                    <img src="assets/anggota/${member.photo}" alt="Foto ${member.name}" onerror="this.onerror=null;this.src='assets/anggota/default.png';">
                </div>
                <div class="profile-body">
                    <h2>${member.name}</h2>
                    <p class="profile-major">${member.major} angkatan ${member.year}</p>
                    <div class="profile-position">
                        <i class="fas fa-briefcase"></i> ${member.position}, ${member.division}
                    </div>
                    <blockquote class="profile-quote">
                        <i class="fas fa-quote-left"></i>
                        ${member.quote || "Berjuang di jalan dakwah adalah sebuah kehormatan."}
                    </blockquote>
                    <a href="https://www.instagram.com/${member.instagram}" target="_blank" class="profile-instagram-btn">
                        <i class="fab fa-instagram"></i> Kunjungi Instagram
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.profile-close-btn').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    gridContainer.addEventListener('click', function(e) {
        const card = e.target.closest('.member-card');
        if (card && card.dataset.index) {
            showProfileModal(parseInt(card.dataset.index));
        }
    });

    function filterAndSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-buttons .filter-btn.active').dataset.filter;

        let filtered = members;

        if (activeFilter !== 'all') {
            filtered = filtered.filter(member => member.division === activeFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(member => 
                member.name.toLowerCase().includes(searchTerm) || 
                member.major.toLowerCase().includes(searchTerm) ||
                member.year.toString().includes(searchTerm)
            );
        }

        displayMembers(filtered);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterAndSearch();
        });
    });

    searchInput.addEventListener('input', filterAndSearch);

    // Initial display
    displayMembers(members);
});