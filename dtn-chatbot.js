(function () {
  const EMAIL_1 = "contact@digitaltelecomnetwork.fr";
  const EMAIL_2 = "pierre.morgane@digitaltelecomnetwork.fr";

  const flows = {
    terrassement: [
      "Pouvez-vous me préciser le type de travaux (tranchée, viabilisation, accès, nivellement...) ?",
      "À quelle adresse se situe le chantier ?",
      "Maison individuelle, immeuble, terrain, local pro ?",
      "Avez-vous des plans ou documents ?",
      "Avez-vous des photos du terrain ?",
      "Quelle est l’échéance souhaitée ?"
    ],
    electricite: [
      "Quel type de bâtiment (maison, appartement, local pro...) ?",
      "Quel est le besoin (installation, rénovation, mise aux normes, dépannage...) ?",
      "Où se situe le chantier ?",
      "Le bâtiment est-il occupé ?",
      "Souhaitez-vous une visite avant devis ?"
    ],
    regard_telecom: [
      "Quel est le problème (regard introuvable, bloqué, trappe cassée...) ?",
      "Maison, immeuble ou local pro ?",
      "Quelle est l'adresse ?",
      "Depuis combien de temps le problème est présent ?"
    ],
    internet: [
      "Type de connexion (cuivre, ADSL, fibre...) ?",
      "Quel est le problème principal ?",
      "Votre opérateur ?",
      "Maison ou local professionnel ?",
      "Depuis quand le problème existe ?"
    ],
    irve: [
      "Maison, immeuble, entreprise ou parking ?",
      "Combien de bornes prévues ?",
      "Avez-vous déjà un devis ou étude ?",
      "À quelle adresse se situe l'installation ?",
      "Besoin d'aide pour les aides/subventions ?"
    ],
    pv: [
      "Maison, bâtiment agricole, industriel... ?",
      "Connaissez-vous votre consommation annuelle ?",
      "Orientation de la toiture ?",
      "À quelle adresse ?",
      "Autoconsommation ou revente ?"
    ],
    autre: [
      "Pouvez-vous décrire votre besoin ?",
      "Ponctuel ou récurrent ?",
      "Particulier, entreprise ou collectivité ?",
      "À quelle adresse se situe le projet ?"
    ]
  };

  let state = {
    started: false,
    typeKey: null,
    step: 0,
    answers: [],
    contact: { nom: "", tel: "", email: "" },
    contactStep: null
  };

  function createUI() {
    const root = document.createElement("div");
    root.id = "dtn-chat-root";
    document.body.appendChild(root);

    const style = document.createElement("style");
    style.textContent = `
#dtn-chat-btn {
  position: fixed; right:20px; bottom:20px;
  background:#0b7f8f; color:#fff; border-radius:999px;
  padding:10px 18px; font-size:14px; cursor:pointer;
  z-index:999999; box-shadow:0 8px 20px rgba(0,0,0,0.25);
}
#dtn-chat-win {
  position:fixed; right:20px; bottom:80px;
  width:340px; max-height:480px; background:#fff;
  border-radius:18px; box-shadow:0 16px 40px rgba(0,0,0,0.35);
  display:none; flex-direction:column; z-index:999999;
}
#dtn-chat-head {
  background:#0b7f8f; color:#fff; padding:12px;
  display:flex; justify-content:space-between; align-items:center;
}
#dtn-chat-msgs { flex:1; overflow-y:auto; padding:10px; background:#f8fafc; }
#dtn-chat-input { display:flex; border-top:1px solid #ddd; }
#dtn-chat-input input {
  flex:1; border:none; padding:10px;
  font-size:13px; outline:none;
}
#dtn-chat-input button {
  background:#0b7f8f; border:none; color:#fff;
  padding:0 16px; cursor:pointer;
}
.dtn-msg { margin-bottom:8px; display:flex; }
.dtn-bot .bubble {
  background:#e5f3f6; padding:8px 10px; border-radius:12px;
}
.dtn-user { justify-content:flex-end; }
.dtn-user .bubble {
  background:#0b7f8f; color:#fff; border-radius:12px;
  padding:8px 10px;
}
.dtn-options button {
  margin:4px 4px 0 0;
  padding:6px 10px; background:#fff;
  border:1px solid #0b7f8f; color:#0b7f8f;
  border-radius:12px; cursor:pointer; font-size:12px;
}
`;
    document.head.appendChild(style);

    root.innerHTML = `
<button id="dtn-chat-btn">Besoin d’un devis ? 💬</button>

<div id="dtn-chat-win">
  <div id="dtn-chat-head">
    <div>Assistant DTN</div>
    <div id="dtn-close" style="cursor:pointer;font-size:18px;">×</div>
  </div>
  <div id="dtn-chat-msgs"></div>
  <div id="dtn-chat-input">
    <input type="text" placeholder="Écrivez ici...">
    <button>Envoyer</button>
  </div>
</div>
`;
  }

  function show() {
    document.getElementById("dtn-chat-win").style.display = "flex";
  }

  function hide() {
    document.getElementById("dtn-chat-win").style.display = "none";
  }

  function msg(text, from = "bot", html = false) {
    const box = document.getElementById("dtn-chat-msgs");
    const row = document.createElement("div");
    row.className = "dtn-msg dtn-" + from;
    const b = document.createElement("div");
    b.className = "bubble";
    if (html) b.innerHTML = text;
    else b.textContent = text;
    row.appendChild(b);
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;
  }

  function start() {
    state.started = true;
    msg("Bonjour 👋 Je suis l’assistant de Digital Telecom Network, entreprise locale vendéenne.");
    setTimeout(() => {
      msg("Je vais vous poser quelques questions pour préparer votre demande de devis.");
      setTimeout(askType, 400);
    }, 400);
  }

  function askType() {
    const html = `
Pour quel type de besoin souhaitez-vous un devis ?<br><br>
<div class="dtn-options">
<button data-t="terrassement">Terrassement</button>
<button data-t="electricite">Électricité</button>
<button data-t="regard_telecom">Regard télécom</button>
<button data-t="internet">Internet</button>
<button data-t="irve">IRVE</button>
<button data-t="pv">Photovoltaïque</button>
<button data-t="autre">Autre</button>
</div>`;
    msg(html, "bot", true);

    const last = document.getElementById("dtn-chat-msgs").lastElementChild;
    last.querySelectorAll("button").forEach((btn) => {
      btn.onclick = () => {
        state.typeKey = btn.dataset.t;
        state.step = 0;
        state.answers = [];
        msg(btn.textContent, "user");
        msg("Très bien, merci !");
        setTimeout(askNext, 300);
      };
    });
  }

  function askNext() {
    const list = flows[state.typeKey];
    if (!list || state.step >= list.length) return askContact();

    msg(list[state.step]);
  }

  function askContact() {
    if (!state.contact.nom) {
      state.contactStep = "nom";
      return msg("Pour finaliser, quel est votre *nom complet* ?");
    }
    if (!state.contact.tel) {
      state.contactStep = "tel";
      return msg("Quel est votre *numéro de téléphone* ?");
    }
    if (!state.contact.email) {
      state.contactStep = "email";
      return msg("Quel est votre *adresse email* ?");
    }
    return finish();
  }

  function finish() {
    msg("Merci 🙏 Votre demande va être transmise à notre équipe.");
    const summary = buildSummary();
    console.log("Résumé à envoyer :", summary);
    msg("Nous revenons vers vous très rapidement.");
  }

  function buildSummary() {
    let t = "";
    t += "Type : " + state.typeKey + "\n\n";
    const list = flows[state.typeKey] || [];
    for (let i = 0; i < list.length; i++) {
      t += list[i] + "\n";
      t += "→ " + (state.answers[i] || "(non renseigné)") + "\n\n";
    }
    t += "Nom : " + state.contact.nom + "\n";
    t += "Téléphone : " + state.contact.tel + "\n";
    t += "Email : " + state.contact.email + "\n";
    return t;
  }

  function inputMessage(text) {
    if (!state.typeKey) return msg("Merci, cliquez sur un bouton ci-dessus.");

    if (state.step < (flows[state.typeKey] || []).length) {
      state.answers[state.step] = text;
      state.step++;
      return askNext();
    }

    if (state.contactStep === "nom") {
      state.contact.nom = text;
      return askContact();
    }

    if (state.contactStep === "tel") {
      state.contact.tel = text;
      return askContact();
    }

    if (state.contactStep === "email") {
      state.contact.email = text;
      return finish();
    }
  }

  createUI();

  document.getElementById("dtn-chat-btn").onclick = () => {
    show();
    if (!state.started) start();
  };

  document.getElementById("dtn-close").onclick = () => hide();

  const input = document.querySelector("#dtn-chat-input input");
  const send = document.querySelector("#dtn-chat-input button");

  send.onclick = () => {
    const txt = input.value.trim();
    if (!txt) return;
    msg(txt, "user");
    input.value = "";
    inputMessage(txt);
  };

  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      const txt = input.value.trim();
      if (!txt) return;
      msg(txt, "user");
      input.value = "";
      inputMessage(txt);
    }
  };

  setTimeout(() => {
    show();
    if (!state.started) start();
  }, 3500);
})();
