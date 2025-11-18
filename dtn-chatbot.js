(function () {
  const EMAIL_1 = "contact@digitaltelecomnetwork.fr";
  const EMAIL_2 = "pierre.morgane@digitaltelecomnetwork.fr";

  // QUESTIONS (inchangées mais ton adouci par la conversation)
  const flows = {
    terrassement: [
      "Pouvez-vous me préciser le type de travaux que vous envisagez ? (Par exemple : tranchée, viabilisation, création d’accès, nivellement…)",
      "Merci 🙏 Et à quelle adresse se situe le chantier ?",
      "Très bien. Quel est le type de bâtiment ou terrain concerné ? (Maison, immeuble, local pro, terrain nu…)",
      "Avez-vous éventuellement des plans ou documents liés au projet ?",
      "Si vous avez quelques photos du terrain, cela nous aide souvent beaucoup. En avez-vous à transmettre ?",
      "Parfait. Et pour finir sur cette partie, quelle serait votre échéance idéale pour les travaux ?"
    ],
    electricite: [
      "Pouvez-vous me dire sur quel type de bâtiment nous devons intervenir ? (Maison, appartement, local pro…)",
      "Très bien. Quel type d’intervention recherchez-vous ? (Installation, rénovation, mise aux normes, dépannage…)",
      "Merci. Et où se situe le chantier ?",
      "Le bâtiment est-il actuellement occupé ?",
      "Souhaitez-vous éventuellement une visite avant que nous réalisions le devis ?"
    ],
    regard_telecom: [
      "Pouvez-vous me décrire brièvement le souci avec le regard ou la trappe téléphonique ?",
      "Merci. Le lieu concerné est-il une maison, un immeuble ou un local professionnel ?",
      "Très bien, et à quelle adresse se trouve le regard ?",
      "Depuis combien de temps rencontrez-vous ce problème ?"
    ],
    internet: [
      "Si vous le savez, quel est le type de connexion ? (Cuivre, ADSL, fibre…)",
      "Merci. Quel est le problème principal que vous rencontrez
