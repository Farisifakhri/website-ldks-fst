document.addEventListener('DOMContentLoaded', function() {
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatWindow = document.getElementById('chatWindow');
  const closeChat = document.getElementById('closeChat');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatBody = document.getElementById('chatBody');

  // Pastikan semua elemen ada sebelum melanjutkan
  if (!chatbotToggle || !chatWindow || !closeChat || !chatInput || !sendBtn || !chatBody) {
    console.error("Elemen chatbot tidak ditemukan. Pastikan HTML sudah benar.");
    return;
  }

  // Database Jawaban Bot
  // Ganti knowledgeBase yang lama dengan ini:
// Ganti knowledgeBase yang lama dengan ini
const knowledgeBase = [
  {
    keywords: ["assalamualaikum", "assalam", "salam"],
    response: "Wa'alaikumussalam warahmatullah. Ada yang bisa dibantu?"
  },
  {
    // Jawaban khusus untuk balasan salam dari user
    keywords: ["waalaikumsalam", "waalaikum salam"],
    response: "Alhamdulillah. Ada lagi yang bisa saya bantu?"
  },
  {
    keywords: ["daftar", "gabung", "join", "recruitment", "ekspresi"],
    response: "Pendaftaran LDKS FST dibuka melalui program EKSPRESI setiap tahun ajaran baru. Info lengkapnya ada di halaman 'How to Join Us' ya!"
  },
  {
    keywords: ["program", "kegiatan", "divisi"],
    response: "Kami punya 4 program utama: Syiar, Keilmuan, Mentoring, dan Dakwah Digital. Aa bisa cek detailnya di menu 'Program'."
  },
  {
    keywords: ["jadwal kajian", "kajian"],
    response: "Kajian rutin biasanya diadakan setiap Jumat. Untuk jadwal pastinya, pantau terus Instagram kami di @ldksyahid_fst ya!"
  },
  {
    keywords: ["lokasi", "sekretariat", "sekre"],
    response: "Sekretariat kami ada di FST UIN Jakarta. Musala FST adalah pusat kegiatan kami."
  },
  {
    keywords: ["terima kasih", "makasih", "syukron"],
    response: "Sama-sama! Senang bisa membantu."
  }
];

  // Fungsi untuk menampilkan/menyembunyikan jendela chat
  chatbotToggle.addEventListener('click', () => chatWindow.classList.toggle('active'));
  closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));

  const handleSendMessage = () => {
    const userMessage = chatInput.value.trim().toLowerCase();
    if (!userMessage) return;

    addMessage(userMessage, 'user');
    chatInput.value = '';

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      addMessage(botResponse, 'bot');
    }, 1000);
  };

  sendBtn.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });

  // Ganti fungsi getBotResponse yang lama dengan ini:
function getBotResponse(message) {
  // Loop melalui setiap aturan di knowledgeBase
  for (const rule of knowledgeBase) {
    // Di dalam setiap aturan, loop melalui setiap kata kunci
    for (const keyword of rule.keywords) {
      // Jika pesan pengguna mengandung salah satu kata kunci
      if (message.includes(keyword)) {
        // Langsung kembalikan jawabannya
        return rule.response;
      }
    }
  }
  // Jika tidak ada kata kunci yang cocok sama sekali
  return "Maaf, saya belum mengerti pertanyaan itu. Coba tanyakan hal lain seputar LDKS FST ya.";
}

  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
});