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
  const knowledgeBase = {
    "cara daftar": "Pendaftaran LDKS FST dibuka melalui program EKSPRESI setiap tahun ajaran baru. Info lengkapnya ada di halaman 'How to Join Us' ya!",
    "program": "Kami punya 4 program utama: Syiar, Keilmuan, Mentoring, dan Dakwah Digital. Aa bisa cek detailnya di menu 'Program'.",
    "jadwal kajian": "Kajian rutin biasanya diadakan setiap Jumat. Untuk jadwal pastinya, pantau terus Instagram kami di @ldksyahid_fst ya!",
    "lokasi": "Sekretariat kami ada di FST UIN Jakarta. Musala FST adalah pusat kegiatan kami.",
    "terima kasih": "Sama-sama! Senang bisa membantu.",
    "assalamualaikum": "Wa'alaikumussalam warahmatullah. Ada yang bisa dibantu?"
  };

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

  function getBotResponse(message) {
    for (const keyword in knowledgeBase) {
      if (message.includes(keyword)) {
        return knowledgeBase[keyword];
      }
    }
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