(function () {

  console.log("📨 DTN Mail Module chargé");

  // ---------------------------------------------------------
  // 🔧 CONFIGURATION EMAILJS
  // ---------------------------------------------------------
  const PUBLIC_KEY = "U_SAAVe1bEpxcT99N";               // Ta clé publique EmailJS
  const SERVICE_ID = "service_h71cqzk";                 // Ton service SMTP Hostinger
  const TEMPLATE_ID = "template_dtn_mail";              // Ton futur template EmailJS

  // ---------------------------------------------------------
  // 📤 FONCTION D’ENVOI D’EMAIL (APPELABLE DEPUIS LE CHATBOT)
  // ---------------------------------------------------------
  window.sendDTNMail = function (name, phone, message) {

    if (!name || !phone || !message) {
      console.warn("⚠️ Champs manquants pour l’envoi du message");
      alert("Merci de remplir toutes les informations avant d'envoyer.");
      return;
    }

    const params = {
      from_name: name,
      phone: phone,
      message: message,
      reply_to: "contact@digitaltelecomnetwork.fr"
    };

    console.log("📨 Tentative d’envoi du mail…", params);

    emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY)
      .then(() => {
        console.log("✅ Email envoyé avec succès via EmailJS");
        alert("Merci ! Votre demande a bien été envoyée à Digital Telecom Network.");
      })
      .catch(err => {
        console.error("❌ Erreur EmailJS :", err);
        alert("Une erreur est survenue. Impossible d’envoyer le message pour le moment.");
      });
  };


  // ---------------------------------------------------------
  // 🚀 INITIALISATION EMAILJS AUTOMATIQUE
  // ---------------------------------------------------------
  function initEmailJS() {
    if (typeof emailjs === "undefined") {

      console.log("📦 Injection EmailJS CDN…");

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

      script.onload = () => {
        console.log("📦 EmailJS chargé, initialisation…");
        emailjs.init({ publicKey: PUBLIC_KEY });
      };

      script.onerror = () => {
        console.error("❌ Impossible de charger EmailJS depuis le CDN");
      };

      document.head.appendChild(script);

    } else {
      console.log("📦 EmailJS déjà chargé, initialisation…");
      emailjs.init({ publicKey: PUBLIC_KEY });
    }
  }

  // Lance l’initialisation EmailJS
  initEmailJS();


})();
