/* ==========================================================
   ANGGOTA.JS (Versi Semi-Dinamis 100% Online)
   Data: Google Sheets
   Foto: Google Drive
   Fallback: Hosted PNG
   ========================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Variabel Global
    let allMembersData = []; 
    const gridContainer = document.getElementById('members-grid');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-buttons .filter-btn');

    // URL Google Sheet CSV
    const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTrlzd-fZ4QTH4FDHZW_NPS9l7CQklEBLhmILf9Rbzm5oRtu-2xPilt9hokv2qKm64KXflSO2wgdsJ0/pub?gid=0&single=true&output=csv";

    // URL Gambar Fallback (Online)
    const FALLBACK_IMAGE_URL = 
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    

    // 2. Fungsi Utama: Memuat Data dari Google Sheet
    async function loadMemberData() {
        gridContainer.innerHTML = '<p class="no-articles">Memuat data anggota...</p>';
        try {
            const response = await fetch(GOOGLE_SHEET_CSV_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const csvText = await response.text();
            
            allMembersData = parseCSV(csvText);
            setupEventListeners();
            
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('search');

            if (searchQuery) {
                searchInput.value = searchQuery;
            }

            filterAndSearch();

        } catch (error) {
            console.error("Gagal memuat data anggota:", error);
            gridContainer.innerHTML = "<p class='no-articles'>Gagal memuat data anggota. Coba segarkan halaman.</p>";
        }
    }

    // 3. Fungsi Parse CSV
    function parseCSV(text) {
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const membersArray = [];
        const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line.trim()) continue; 
            const data = line.split(regex);
            
            if (data.length === headers.length) {
                const member = {};
                headers.forEach((header, index) => {
                    member[header] = data[index] ? data[index].trim().replace(/"/g, '') : '';
                });
                membersArray.push(member);
            }
        }
        return membersArray;
    }

    // 4. Fungsi Tampilan: displayMembers 
    function displayMembers(filteredMembers) {
        gridContainer.innerHTML = '';
        if (filteredMembers.length === 0) {
            gridContainer.innerHTML = '<p class="no-articles">Anggota tidak ditemukan.</p>';
            return;
        }

        filteredMembers.forEach(member => {
            const card = document.createElement('div');
            card.className = 'member-card';
            card.dataset.name = member.name; 

            card.innerHTML = `
                <div class="member-photo">
                    <img src="${member.photo}" alt="Foto ${member.name}" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE_URL}';">
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

    // 5. Fungsi Tampilan: showProfileModal 
    function showProfileModal(memberIndex) {
        const member = allMembersData[memberIndex]; 
        if (!member) return;

        const modal = document.createElement('div');
        modal.className = 'profile-modal-backdrop';
        modal.innerHTML = `
            <div class="profile-modal">
                <button class="profile-close-btn"><i class="fas fa-times"></i></button>
                <div class="profile-header">
                    <img src="${member.photo}" alt="Foto ${member.name}" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE_URL}';">
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

    // 6. Fungsi Logika: filterAndSearch
    function filterAndSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-buttons .filter-btn.active').dataset.filter;

        let filtered = allMembersData; 

        if (activeFilter !== 'all') {
            filtered = filtered.filter(member => member.division === activeFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(member => 
                member.name.toLowerCase().includes(searchTerm) || 
                member.major.toLowerCase().includes(searchTerm) ||
                (member.year && member.year.toString().includes(searchTerm))
            );
        }

        displayMembers(filtered);
    }

    // 7. Fungsi Setup Event Listeners
    function setupEventListeners() {
        gridContainer.addEventListener('click', function(e) {
            const card = e.target.closest('.member-card');
            
            if (card && card.dataset.name) {
                const memberName = card.dataset.name;
                const memberIndex = allMembersData.findIndex(m => m.name === memberName);
                
                if (memberIndex > -1) {
                    showProfileModal(memberIndex);
                }
            }
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterAndSearch();
            });
        });

        searchInput.addEventListener('input', filterAndSearch);
    }

    // 8. Mulai Proses!
    loadMemberData();

});