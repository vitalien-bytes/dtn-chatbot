(function () {
  const EMAIL_1 = "contact@digitaltelecomnetwork.fr";
  const EMAIL_2 = "pierre.morgane@digitaltelecomnetwork.fr";

  // FLOWS DEVIS
  const flows = {
    terrassement: [
      "Très bien. Pouvez-vous me préciser le type de travaux que vous envisagez ? (Tranchée, viabilisation, accès, nivellement…) ?",
      "Merci 🙏 Et à quelle adresse se situe le chantier ?",
      "Quel est le type de bâtiment ou terrain concerné ? (Maison, immeuble, local pro, terrain nu…)",
      "Avez-vous éventuellement des plans ou documents liés au projet ?",
      "Si vous avez quelques photos, cela peut beaucoup nous aider. En avez-vous ?",
      "Et enfin, quelle serait votre échéance idéale pour ces travaux ?"
    ],
    electricite: [
      "Sur quel type de bâtiment devons-nous intervenir ? (Maison, appartement, local pro…) ?",
      "Quel type d’intervention recherchez-vous ? (Installation, rénovation, mise aux normes, dépannage…) ?",
      "Merci. Et où se situe le chantier ?",
      "Le bâtiment est-il actuellement occupé ?",
      "Souhaitez-vous une visite avant devis ?"
    ],
    regard_telecom: [
      "Pouvez-vous me décrire brièvement le souci avec le regard ou la trappe téléphonique ?",
      "Merci. Est-ce pour une maison, un immeuble ou un local professionnel ?",
      "Très bien, et à quelle adresse se trouve le regard ?",
      "Depuis combien de temps rencontrez-vous ce problème ?"
    ],
    internet: [
      "Quel est le type de connexion ? (Cuivre, ADSL, fibre…)",
      "Quel est le problème principal que vous rencontrez ?",
      "Quel est votre opérateur actuel ?",
      "Le souci concerne-t-il une habitation ou un local professionnel ?",
      "Depuis quand ce problème dure-t-il ?"
    ],
    irve: [
      "S’agit-il d’une installation pour une maison, une entreprise, un immeuble ou un parking ?",
      "Combien de bornes souhaitez-vous installer (même approximativement) ?",
      "Avez-vous déjà une étude ou un devis d’un autre installateur ?",
      "À quelle adresse se situerait l’installation ?",
      "Souhaitez-vous un accompagnement sur les aides / subventions ?"
    ],
    pv: [
      "Quel type de bâtiment est concerné ? (Maison, bâtiment agricole, industriel…)",
      "Connaissez-vous votre consommation électrique annuelle ?",
      "La toiture est plutôt orientée sud, est/ouest, ou autre ?",
      "À quelle adresse se situe le bâtiment ?",
      "Souhaitez-vous de l’autoconsommation ou une revente de surplus ?"
    ],
    autre: [
      "Pouvez-vous m’en dire un peu plus sur votre besoin ?",
      "S’agit-il d’un besoin ponctuel ou récurrent ?",
      "Est-ce pour un particulier, une entreprise ou une collectivité ?",
      "Dans quelle commune se situe le projet ?"
    ]
  };

  // Flow "aide / renseignements"
  const flowInfo = [
    "Très bien 😊 Dites-moi, quel renseignement puis-je vous apporter ?",
    "Je vous écoute — expliquez-moi simplement votre question.",
    "Merci 🙏 Je prends note. Avez-vous une autre question ou besoin d’un complément ?"
  ];

  let state = {
    started: false,
    mode: null, // "info" ou "devis"
    typeKey: null,
    step: 0,
    answers: [],
    infoStep: 0,
    contact: { nom: "", tel: "", email: "" },
    contactStep: null
  };

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  function createUI() {
    const root = document.createElement("div");
    root.id = "dtn-chat-root";
    document.body.appendChild(root);

    const style = document.createElement("style");
    style.textContent = `
#dtn-chat-btn {
  position: fixed; right:20px; bottom:20px;
  background:#0b7f8f; color:#fff; border-radius:999px;
  padding:12px 18px; font-size:15px; cursor:pointer;
  z-index:999999; box-shadow:0 10px 25px rgba(0,0,0,0.30);
  font-weight:600;
}
#dtn-chat-win {
  position:fixed; right:20px; bottom:80px;
  width:360px; max-height:520px; background:#ffffff;
  border-radius:20px; box-shadow:0 18px 45px rgba(0,0,0,0.38);
  display:none; flex-direction:column; z-index:999999;
  overflow:hidden;
}
#dtn-chat-head {
  background:#0b7f8f; color:#fff; padding:14px;
  display:flex; justify-content:space-between; align-items:center;
  font-size:15px; font-weight:600;
}
#dtn-chat-msgs { flex:1; overflow-y:auto; padding:14px; background:#f6fafc; }
#dtn-chat-input { display:flex; border-top:1px solid #ddd; }
#dtn-chat-input input {
  flex:1; border:none; padding:12px;
  font-size:14px; outline:none; border-radius:0;
}
#dtn-chat-input button {
  background:#0b7f8f; border:none; color:#fff;
  padding:0 18px; cursor:pointer; font-size:14px; font-weight:600;
}
.dtn-msg { margin-bottom:12px; display:flex; line-height:1.45; }
.dtn-bot .bubble {
  background:#eaf6f7; padding:10px 12px; border-radius:14px;
  font-size:14px; color:#0b4b57;
}
.dtn-user { justify-content:flex-end; }
.dtn-user .bubble {
  background:#0b7f8f; color:#fff; border-radius:14px;
  padding:10px 12px; font-size:14px;
}
.dtn-options button {
  margin:6px 6px 0 0;
  padding:8px 12px; background:#fff;
  border:1px solid #0b7f8f; color:#0b7f8f;
  border-radius:14px; cursor:pointer; font-size:13px; font-weight:500;
}
`;
    document.head.appendChild(style);

    root.innerHTML = `
<button id="dtn-chat-btn">Besoin d’un devis ? 💬</button>

<div id="dtn-chat-win">
  <div id="dtn-chat-head">
