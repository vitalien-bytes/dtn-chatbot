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
  background:#0b7f8f; color:#fff; pa

