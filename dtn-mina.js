(function () {

  // --- Configuration emails ---
  const EMAIL_1 = "contact@digitaltelecomnetwork.fr";
  const EMAIL_2 = "pierre.morgane@digitaltelecomnetwork.fr";

  // Inject CSS
  const css = `
  #dtn-chat-btn {
    position: fixed; right:20px; bottom:20px;
    background:#0b7f8f; color:#fff; border-radius:999px;
    padding:14px 22px; font-size:15px; cursor:pointer;
    z-index:999999; font-weight:600; box-shadow:0 6px 18px rgba(0,0,0,0.25);
  }
  #dtn-chat-win {
    position:fixed; right:20px; bottom:80px;
    width:360px; max-height:520px; background:white;
    border-radius:18px; display:none; flex-direction:column;
    z-index:99999999; box-shadow:0 20px 45px rgba(0,0,0,0.35);
    overflow:hidden;
  }
  #dtn-chat-head {
    background:#0b7f8f; padding:14px; color:white;
    font-weight:600; font-size:15px;
    display:flex; justify-content:space-between; align-items:center;
  }
  #dtn-chat-msgs { flex:1; padding:14px; overflow-y:auto; background:#f6fafc; }
  .dtn-msg { margin-bottom:10px; line-height:1.4; }
  .bubble { padding:10px 12px; border-radius:14px; display:inline-block; max-width:80%; }
  .bot { background:#e8f6f7; color:#0b4a57; }
  .user { background:#0b7f8f; color:white; float:right; }
  #dtn-chat-input { display:flex; border-top:1px solid #ddd; }
  #dtn-chat-input input { flex:1; border:none; padding:12px; outline:none; }
  #dtn-chat-input button {
    background:#0b7f8f; color:white; border:none;
    padding:0 18px; font-weight:600; cursor:pointer;
  }
  .dtn-options button {
    margin:6px 6px 0 0; padding:6px 10px; border-radius:14px;
    background:white; border:1px solid #0b7f8f; color:#0b7f8f;
    cursor:pointer; font-size:13px;
  }
  `;
  
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // Inject UI
  const root = document.createElement("div");
  root.innerHTML = `
    <button id="dtn-chat-btn">Besoin d’un devis ? 💬</button>
    <div id="dtn-chat-win">
      <div id="dtn-chat-head">
        Assistant DTN
        <span id="dtn-chat-close" style="cursor:pointer;font-weight:bold;">✖</span>
      </div>
      <div id="dtn-chat-msgs"></div>
      <div id="dtn-chat-input">
        <input id="dtn-chat-text" placeholder="Écrivez ici...">
        <button id="dtn-chat-send">Envoyer</button>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  // Add message
  function addMsg(text, from="bot") {
    const box = document.getElementById("dtn-chat-msgs");
    const el = document.createElement("div");
    el.className = "dtn-msg";
    el.innerHTML = `<div class="bubble ${from}">${text}</div>`;
    box.appendChild(el);
    box.scrollTop = box.scrollHeight;
  }

  // Open / close
  const btn = document.getElementById("dtn-chat-btn");
  const win = document.getElementById("dtn-chat-win");
  const close = document.getElementById("dtn-chat-close");

  btn.onclick = () => {
    win.style.display = "flex";
    btn.style.display = "none";
    startConversation();
  };

  close.onclick = () => {
    win.style.display = "none";
    btn.style.display = "block";
  };

  // Start conversation
  function startConversation() {
    addMsg("Bonjour 👋 Je suis l’assistant de Digital Telecom Network, entreprise locale vendéenne.");
    addMsg("Puis-je vous aider, ou souhaitez-vous demander un devis ?");
    showOptions();
  }

  function showOptions() {
    const box = document.getElementById("dtn-chat-msgs");
    const opt = document.createElement("div");
    opt.className = "dtn-options";
    opt.innerHTML = `
      <button onclick="window.dtnChoose('info')">Aide / renseignements</button>
      <button onclick="window.dtnChoose('devis')">Demander un devis</button>
    `;
    box.appendChild(opt);
    box.scrollTop = box.scrollHeight;
  }

  // Global response
  window.dtnChoose = function(type) {
    addMsg(type === "info" ? "Aide / renseignements" : "Demander un devis", "user");

    if (type === "info") {
      addMsg("Avec plaisir 😊 Dites-moi, que puis-je faire pour vous ?");
    } else {
      addMsg("Parfait 👍 Pour quel type de besoin souhaitez-vous un devis ?");
      showDevisOptions();
    }
  };

  function showDevisOptions() {
    const box = document.getElementById("dtn-chat-msgs");
    const opt = document.createElement("div");
    opt.className = "dtn-options";
    opt.innerHTML = `
      <button onclick="addMsg('Terrassement', 'user'); askInfo('terrassement')">Terrassement</button>
      <button onclick="addMsg('Électricité', 'user'); askInfo('electricite')">Électricité</button>
      <button onclick="addMsg('Regard telecom', 'user'); askInfo('regard')">Regard télécom</button>
      <button onclick="addMsg('Internet', 'user'); askInfo('internet')">Internet</button>
      <button onclick="addMsg('IRVE', 'user'); askInfo('irve')">IRVE</button>
      <button onclick="addMsg('Photovoltaïque', 'user'); askInfo('pv')">Photovoltaïque</button>
      <button onclick="addMsg('Autre besoin', 'user'); askInfo('autre')">Autre</button>
    `;
    box.appendChild(opt);
    box.scrollTop = box.scrollHeight;
  }

  // First question after selection
  function askInfo(type) {
    addMsg("Très bien, merci ! 😊 Pouvez-vous m’en dire un peu plus sur votre besoin ?");
  }

  // Auto open after 3s
  setTimeout(() => {
    if (win.style.display === "none") {
      btn.onclick();
    }
  }, 3000);

})();
