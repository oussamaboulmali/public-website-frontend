const currentYear = new Date().getFullYear();
const translations = {
  // Titres principaux
  multimedia: "Multimédia",
  langage: "Langues",
  followUsTitle: "Suivez-nous",
  "aps-products": "PRESTATION APS",
  Search: "Rechercher",
  lastInfo: "Dernières nouvelles ",
  category: "CATEGORIES",
  noArticleMenu: "Aucun article récent",
  chooseLanguage: "Choisir une langue",

  //read more
  more_artricles: "Les Plus Lus",
  //header
  authentifier: "S’authentifier",

  // Éléments du menu multimédia
  galeriesPhotos: "Galeries Photos",
  videos: "Videos",
  infographie: "Infographie",
  cahiersMultimedias: "Cahiers Multimédias",
  dossier: "Dossier",
  archives: "Archives",
  next: "Suivant",
  previous: "Précédent",
  cahierPage: "Page",
  of: "sur",
  zoomIn: "Zoomer",
  zoomOut: "Dézoomer",

  // Éléments du menu réseaux sociaux
  "aps-online": "APS Online",
  "aps-videos": "APS Videos",
  "aps-photos": "APS Photos",
  home: "Accueil",

  //footer
  adresse: "Avenue Des Frères Bouadou, Bir Mourad Rais 16 000 Alger Algérie.",
  contact: "+213 (0) 23 56 96 90  /  91 - 92 - 93 - 94 - 95 - 97",
  fax: "+213 (0) 23 56 96 47  /  63",
  readMore: "VOIR PLUS",
  copyright:
    "Copyright © " +
    currentYear +
    " Algérie Presse Service -  Tous droits réservés",
  description: " À propos de l’APS ",
  contactUs: "Nous Contacter",
  phoneLabel: "Téléphone",
  faxLabel: "Fax",
  LocationLabel: "Adresse",
  emailLabel: "Email",
  //404 not-found
  "404_title": "Oups ! Page introuvable",
  "404_description":
    "Il semble que vous ayez pris un chemin qui n'existe pas dans notre univers numérique.",
  "404_backToHome": "Retourner à l'accueil",
  //error page
  pageTitle: "Site en maintenance | Nous revenons bientôt",
  metaDescription:
    "Notre site est actuellement en maintenance. Nous travaillons pour améliorer votre expérience.",
  mainTitle: "Site en maintenance",
  subtitle: "Nous améliorons votre expérience",
  mainMessage:
    "Notre équipe travaille activement pour vous offrir un service optimisé. Merci de votre patience.",
  countdownLabel: "Retour estimé dans :",
  hoursLabel: "Heures",
  minutesLabel: "Minutes",
  secondsLabel: "Secondes",
  supportTitle: "Besoin d'assistance ?",
  support: "Contactez-nous à ",
  twitterLabel: "Twitter",
  facebookLabel: "Facebook",
  linkedinLabel: "LinkedIn",
  YoutubeLabel: "Youtube",

  //banniere publicitaire
  pub_banner: "Bannière publicitaire",
  //read more
  readMore: "Voir plus",
  //actualité
  actualité: "Actualités",
  //Dossier
  dossier: "Dossiers",
  //viodo
  video: "Vidéos",
  //galerie
  galerie: "Galeries photos",
  //cahiers
  cahier: "Magazines Multimédias",
  cahierSlug: "Cahier Multimédia",
  browse: "Feuilleter",
  //infographie
  infographie: "Infographies",
  //posts
  nopost: "Aucun article disponible",
  tags: "Tags : ",
  restricted_content_title: "Contenu Réservé aux Abonnés",
  restricted_content_description:
    "Pour continuer la lecture de cet article, veuillez vous connecter ou vous abonner.",
  restricted_content_login_button: "Se connecter",
  readPost: "Lire l'article ",
  relatedArticle: "Articles connexes",

  //dossier
  relatedDossier: "Dossiers connexes",
  dossier_articles: "Articles dans ce dossier",

  //video
  relatedVideo: "Vidéos connexes",
  //galerie photo
  relatedGalerie: "Galeries Photos connexes",
  //cahier multimédia
  relatedCahier: "Cahiers Multimédias connexes",
  //infographie
  relatedInfographie: "Infographies connexes",
  //Recherche
  resultSearch: "Résultats pour ",
  sortByLabel: "Trier par :",
  categoryLabel: "Catégorie : ",
  recent: "Plus récent",
  oldest: "Plus ancien",
  popular: "Populaire",
  foundPost: "articles trouvés",
  clanderOption: ["Mode intervalle", "Mode normal"],
  clanderClear: "Effacer",
  //Calanderier
  months: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  today: "Aujourd'hui",
  selectYear: "Sélectionner l'année",
  searchResult: "Résultats pour ",
  tryDifferentSearch:
    "Essayez de modifier vos critères de recherche ou consultez tous nos articles.",
  noDataFound: "Aucun résultat trouvé",
  dateLabel: "Date",
  allCat: "Toutes les catégories",

  //login form
  connected: "Se connecter",
  disconnected: "Se déconnecter",
  connexion: "Connexion",
  connexionLabel: "Bienvenue sur votre espace professionnel",
  password: "Mot de passe",
  username: "Email",
  flashInfo: "Flash info",
  urgence: "Urgent",
  important: "Important",
  latestNews: "Dernières actualités",
  captchaLabel: "Entrez le captcha",
  captchaError: " Code incorrect. Veuillez réessayer.",
  captchAttempts: "Vous avez atteint le nombre maximal de réinitialisations.",

  //Archives
  archivesLabel: "Archives des Articles",
  allTags: "Tous les tags",
  searchButton: "Rechercher",
  errorMessage: "Vous devez saisir au minimum un mot clé",

  //Otp
  otpDescription:
    "Veuillez saisir le code à 6 chiffres que nous avons envoyé à votre adresse email.",
  verifyOtp: "Vérifier",
  resending: "Envoi en cours...",
  resendOtp: "Renvoyer le code",
  errorOtp: "Le code de vérification est incorrect.",
  errorSubmitForm: "Veuillez remplir tous les champs du formulaire.",
  otpMsg: "Veuillez saisir le code de vérification.",
  otpMsgError: "Le code de vérification est incorrect.",
  timeRemaining: "Temps restant",
  otpTitle: "Vérification",
  resendError: "Impossible de renvoyer le code. Veuillez réessayer.",
  otpError: "Une erreur est survenue. Veuillez réessayer.",
  otpIncomplete: "Veuillez remplir tous les champs",
  captchAttempts:
    "Nombre maximum de tentatives atteint. Veuillez réessayer plus tard.",
  verifying: "Vérification...",
  verified: "Vérifié",
  apropos: {
    title: "L’Agence ; Algérie Presse Service (APS)",
    introduction: [
      " Établie en une première et principale source de l’information sur l’Algérie, l’APS couvre l’actualité à partir de cinq (05) Directions régionales (Alger, Oran, Constantine, Ouargla et Béchar), qui coordonnent l’activité de 58 bureaux de wilaya. A l’étranger, l’APS est représentée dans plusieurs capitales (Paris, Bruxelles, Londres, Rome, Madrid, Moscou, Amman, Le Caire, Dakar, Tunis, Nouakchott, Addis-Abeba et Washington…).",
      "A l’APS, les informations sont collectées, traitées, hiérarchisées et diffusées en temps réel par des rédactions centrales et régionales : nationale, sport, économique, internationale, traduction. Outre son propre réseau de collecte, l’APS reçoit, soit par satellite, ou par FTP, le fil d’informations des agences de presse de différents pays du monde avec qui elle est liée par des accords d’échange.",
    ],
    histoireTitle:
      "L’APS : UNE AGENCE NATIONALE D’INFORMATION..UN MODÈLE DE MEDIA GLOBAL",
    histoire: [
      "L’APS a été créée le 1er décembre 1961 à Tunis, durant la glorieuse guerre de libération nationale pour être le porte-drapeau de la Révolution algérienne sur la scène médiatique mondiale. Au lendemain du recouvrement de la souveraineté nationale, son siège a été naturellement transféré à Alger. ",
      "L’APS exerce sa mission de service public en développant la production d’informations générales et spécialisées écrites et audiovisuelles, à caractère politique, économique, culturel et social notamment pour faire connaître les faits, les actions et les réalisations de l’Algérie, ainsi qu’à l’actualité mondiale.",
      "A ce titre, l’agence collecte, traite, diffuse tant en Algérie qu’à l’étranger, tout fait, nouvelle, commentaire et documentation écrite, photographique ou audiovisuelle pour une information complète, fiable, objective et recoupée dans le respect des règles déontologiques et les exigences de la mission de service public",
      "Les informations collectées et traitées sont mises à la disposition de son large réseau d’abonnés (institutions, médias audiovisuels, presse écrite et électronique, sites web, ainsi que d’autres abonnés de divers horizons).",
    ],
    histoireSubTitle: "LES SERVICES DE L’APS ",
    histoire1: [
      "Présente à l’évènement, l’APS diffuse des centaines de dépêches d’information par jour dans plusieurs langues (arabe, tamazight, anglais, français, espagnol et russe) et assure une large couverture traitant de l’actualité générale nationale et internationale. Elle utilise les liaisons satellitaires via trois satellites et la diffusion par internet. Le service photo, relancé en 1998, propose des reportages traitant de différents domaines ; politique, économie, culture, sport et société tant au plan national qu’international. Les photos sont mises en ligne à travers le site http://photo.aps.dz (réservé exclusivement aux abonnés)",
      "En outre, grâce au déploiement entamé, l’APS est présente sur le paysage médiatique à travers son contenu et produits multimédias s’appuyant sur le texte, la vidéo, la photo et l’infographie (animée et statique).",
      "L’APS a également investi les réseaux sociaux et dispose de pages Facebook dans toutes les langues de reprise sur ses sites web et d’un compte X sur lesquelles sont partagés des dépêches, photos ainsi que l’actualité en vidéo.",
    ],
    histoire2: [
      " Les services de l’APS, sont disponibles sur internet :",
      "https://apsnews.aps.dz/",
      "http://photo.aps.dz ",
      "Le service texte est réceptionné par satellite en temps réel. Pour recevoir ce service, l’utilisateur doit disposer d’un ordinateur, d’une parabole domestique avec une tête universelle 12 GHZ + démodulateur avec sortie vidéo. L’APS fournit un kit logiciel plus un décodeur de données pour la réception des informations. ",
      "Le service vidéo (fil audiovisuel de l’information) est assuré via une plate-forme de diffusion par internet (lancée en 2024) au profit des abonnés (chaînes TV et web TV …). Le service assure la couverture de l’actualité nationale à travers les 58 wilayas du pays et présent aux grands événements internationaux.",
      "Ainsi, une équipe technique pluridisciplinaire, constituée d’ingénieurs et de techniciens, assure, 24x24h une dynamique de prise en charge des aspects liés à la maintenance et à la veille technologique.",
      "L’équipe technique, en contact permanent avec les abonnés de l’agence, veille entre autres à la qualité de la réception des services d’informations de l’APS aussi bien par satellite et le service online.",
      "L’APS est dirigée par un Directeur général, nommé par un décret présidentiel, M. Gaid Samir qui préside son conseil d’administration.",
      "Algérie Presse Service- Avenue des frères Bouadou, Bir Mourad Rais - Alger Algérie",
    ],
    histoireSubTitle1: "RÉCEPTION DES SERVICES APS",
    /*  missionValeurs: {
      mission:
        "Diffuser une information objectivement sélectionnée, fiable, crédible qui contribue à l'ouverture et au progrès.",
      veracite:
        "Intégrité, exactitude, transparence, objectivité et vérité sont au cœur de nos valeurs.",
      independance:
        "Fournir une information complète, contextuelle et conforme aux standards du journalisme professionnel.",
    }, */
    contact: {
      telephone: "+213 (0) 23 56 96 90 / 91 - 92 - 93 - 94 - 95 - 97",
      fax: "+213 (0) 23 56 96 47 / 63",
      email: "contact@aps.dz / commercial@aps.dz / redaction@aps.dz",
    },
  },
  metadata: {
    title: "Algérie Presse Service",
    titleTemplate: "%s | Algérie Presse Service",
    description:
      "Site officiel de l'Agence de Presse Algérienne (APS). Retrouvez l'actualité nationale et internationale, les dossiers, reportages et communiqués de presse.",
    authorName: "Algérie Presse Service",
    creator: "Algérie Presse Service",
    publisher: "APS",
    openGraph: {
      title: "Algérie Presse Service",
      description:
        "Actualité en continu depuis l'Algérie et le monde. APS vous informe en temps réel sur l'économie, la politique, la culture et le sport.",
      siteName: "APS",
      locale: "fr_DZ",
      type: "website",
      imageAlt: "Logo APS - Algérie Presse Service",
    },
  },
};

export default translations;
