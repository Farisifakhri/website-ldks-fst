// File: chatbot.js (Versi Final dengan Alur & Memori Cerdas)

document.addEventListener('DOMContentLoaded', function() {
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatWindow = document.getElementById('chatWindow');
  const closeChat = document.getElementById('closeChat');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatBody = document.getElementById('chatBody');

  if (!chatbotToggle || !chatWindow || !closeChat || !chatInput || !sendBtn || !chatBody) {
    return;
  }

  // ===== MEMORI CHATBOT =====
  let conversationMemory = {
    username: null,
    last_topic: null,
    conversation_started: false
  };

  // ===== DATABASE PERCAKAPAN (KNOWLEDGE BASE BARU) =====
  const knowledgeBase = [
    // --- Aturan Sapaan Awal & Perkenalan ---
    {
      keywords: ["assalamualaikum", "assalam", "salam", "halo", "hai", "punteun"],
      response: "Wa'alaikumussalam warahmatullah. Dengan siapa saya berbicara?",
      action: (memory) => { memory.last_topic = 'tanya_nama'; },
      is_greeting: true
    },
    {
      keywords: [], // Aturan ini khusus merespons setelah ditanya nama
      response: (message, memory) => {
        const name = message.split(' ').filter(word => word.length > 2).pop() || message;
        memory.username = name.charAt(0).toUpperCase() + name.slice(1);
        memory.last_topic = null;
        return `Halo A ${memory.username}! Senang berkenalan. Ada beberapa hal yang sering ditanyakan, mungkin salah satunya yang Aa cari?`;
      },
      required_topic: 'tanya_nama',
      quick_replies: ["Info Pendaftaran", "Program LDKS", "Jadwal Kajian"]
    },
    
    // --- Aturan Info Pendaftaran ---
    {
      keywords: ["daftar", "gabung", "join", "recruitment", "ekspresi", "pendaftaran"],
      response: "Pendaftaran LDKS FST dibuka melalui program EKSPRESI setiap tahun ajaran baru. Info lengkapnya ada di halaman 'How to Join Us' ya! Ada lagi yang bisa dibantu?",
      action: (memory) => { memory.last_topic = 'pendaftaran'; },
      quick_replies: ["Lihat Program LDKS", "Terima Kasih"]
    },

    // --- Aturan Info Program (Multi-langkah) ---
    {
      keywords: ["program", "kegiatan", "divisi"],
      response: "Tentu! Kami punya 4 program utama: Syiar, Keilmuan, Mentoring, dan Dakwah Digital. Mau dibahas lebih detail tentang yang mana?",
      action: (memory) => { memory.last_topic = 'program_detail'; },
      quick_replies: ["Syiar", "Keilmuan", "Mentoring", "Dakwah Digital"]
    },
    {
      keywords: ["syiar"],
      response: "Program Syiar fokus pada penyebaran nilai Islam melalui kajian, media kreatif, dan kegiatan sosial. Keren kan? Mau tahu program lain?",
      action: (memory) => { memory.last_topic = 'program_detail'; },
      quick_replies: ["Keilmuan", "Mentoring", "Sudah Cukup"]
    },
    {
      keywords: ["keilmuan"],
      response: "Program Keilmuan bertujuan mengintegrasikan sains dan Islam melalui workshop, diskusi, dan riset. Cocok banget buat anak FST! Mau tahu yang lain?",
      action: (memory) => { memory.last_topic = 'program_detail'; },
      quick_replies: ["Syiar", "Mentoring", "Sudah Cukup"]
    },
    // (Tambahkan detail untuk Mentoring dan Dakwah Digital dengan pola yang sama)

    // --- Aturan Umum Lainnya ---
    {
      keywords: ["jadwal kajian", "kajian"],
      response: "Kajian rutin biasanya diadakan setiap Jumat. Untuk jadwal pastinya, pantau terus Instagram kami di @ldksyahid_fst ya!",
      action: (memory) => { memory.last_topic = 'kajian'; }
    },
    {
      keywords: ["terima kasih", "makasih", "syukron", "sudah cukup"],
      response: (message, memory) => `Sama-sama, A ${memory.username || ''}! Jika ada pertanyaan lain, jangan ragu hubungi saya lagi ya. Assalamualaikum.`,
      action: (memory) => { memory.last_topic = null; memory.conversation_started = false; } // Reset percakapan
    }
  ];

  // (Sisa kode JavaScript di bawah ini tidak perlu diubah, biarkan sama seperti sebelumnya)
  // ... (Salin semua fungsi handleSendMessage, getBotResponse, addMessage, dll. dari kode lengkap saya sebelumnya) ...

  // ===== FUNGSI INTI CHATBOT (JANGAN DIUBAH) =====
  const handleSendMessage = (messageText) => {
    const userMessage = messageText || chatInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, 'user');
    chatInput.value = '';
    conversationMemory.conversation_started = true;

    showTypingIndicator();

    setTimeout(() => {
      hideTypingIndicator();
      const botResponseRule = getBotResponse(userMessage, conversationMemory);
      let responseText = botResponseRule.response;

      if (typeof responseText === 'function') {
        responseText = responseText(userMessage, conversationMemory);
      }
      if (botResponseRule.action) {
        botResponseRule.action(conversationMemory);
      }
      addMessage(responseText, 'bot', botResponseRule.quick_replies);
    }, 1500);
  };

  function getBotResponse(message, memory) {
    const lowerCaseMessage = message.toLowerCase();

    const contextualRule = knowledgeBase.find(rule => rule.required_topic === memory.last_topic);
    if (contextualRule) {
      return contextualRule;
    }

    for (const rule of knowledgeBase) {
      if (memory.conversation_started && rule.is_greeting) {
        continue;
      }
      if (rule.keywords && rule.keywords.length > 0) {
        for (const keyword of rule.keywords) {
          const regex = new RegExp('\\b' + keyword.toLowerCase() + '\\b', 'i');
          if (regex.test(lowerCaseMessage)) {
            return rule;
          }
        }
      }
    }
    
    return { response: `Maaf A ${memory.username || ''}, saya belum mengerti pertanyaan itu. Coba tanyakan hal lain seputar LDKS FST.` };
  }
  
  chatbotToggle.addEventListener('click', () => chatWindow.classList.toggle('active'));
  closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));
  sendBtn.addEventListener('click', () => handleSendMessage());
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });
  chatBody.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('quick-reply-btn')) {
      handleSendMessage(e.target.textContent);
    }
  });

   function addMessage(text, sender, quickReplies = []) {
    const oldQuickReplies = chatBody.querySelector('.quick-replies-container');
    if (oldQuickReplies) oldQuickReplies.remove();
  
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);

    if (sender === 'bot' && quickReplies && quickReplies.length > 0) {
      const repliesContainer = document.createElement('div');
      repliesContainer.className = 'quick-replies-container';
      quickReplies.forEach(replyText => {
        const replyBtn = document.createElement('button');
        replyBtn.className = 'quick-reply-btn';
        replyBtn.textContent = replyText;
        repliesContainer.appendChild(replyBtn);
      });
      chatBody.appendChild(repliesContainer);
    }
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  function hideTypingIndicator() {
    const typingIndicator = chatBody.querySelector('.typing-indicator');
    if (typingIndicator) typingIndicator.remove();
  }
  
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat Pagi!";
    if (hour < 15) return "Selamat Siang!";
    if (hour < 19) return "Selamat Sore!";
    return "Selamat Malam!";
  }
  
  const initialBotMessage = chatBody.querySelector('.chat-message.bot');
  if (initialBotMessage) {
    const sapaanAwal = `${getGreeting()} Assalamualaikum! Ada yang bisa dibantu seputar LDKS FST?`;
    addMessage(sapaanAwal, 'bot');
    initialBotMessage.remove();
  }
});