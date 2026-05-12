// Références DOM : formulaires de la page d'accueil et notification (toast)
const searchForm = document.getElementById("searchForm");
const messageForm = document.getElementById("messageForm");
const reservationForm = document.getElementById("reservationForm");
const feedbackForm = document.getElementById("feedbackForm");
const statusToast = document.getElementById("statusToast");

// Éléments de la page détail véhicule (titre, prix, galerie, bouton réserver)
const mainDetailImage = document.getElementById("mainDetailImage");
const detailCarName = document.getElementById("detailCarName");
const detailCarPrice = document.getElementById("detailCarPrice");
const detailCarTransmission = document.getElementById("detailCarTransmission");
const detailCarSpecs = document.getElementById("detailCarSpecs");
const detailCarDescription = document.getElementById("detailCarDescription");
const detailThumbRow = document.getElementById("detailThumbRow");
const extraDetailImage = document.getElementById("extraDetailImage");
const detailTriggers = document.querySelectorAll(".car-detail-trigger");
const detailReserveBtn = document.getElementById("detailReserveBtn");
const reservationPreviewContent = document.getElementById("reservationPreviewContent");

// Menu rapide flottant (bouton, panneau, conteneur) et barre de navigation pour le scroll
const quickMenuToggle = document.getElementById("quickMenuToggle");
const quickMenuPanel = document.getElementById("quickMenuPanel");
const quickMenu = document.getElementById("quickMenu");
const siteHeader = document.querySelector(".site-header");

// Détection de la page courante et clés du stockage local (véhicule choisi / réservation)
const isDetailPage = window.location.pathname.toLowerCase().endsWith("detail.html");
const SELECTED_CAR_KEY = "driveRentSelectedCarId";
const RESERVED_CAR_NAME_KEY = "reservedCarName";
const RESERVED_CAR_IMG_KEY = "reservedCarImg";

// Données centralisées de chaque véhicule (affichage détail + galerie + images par défaut)
const CAR_DATA = {
  "TOYOTA LAND CRUISER": {
    id: "TOYOTA LAND CRUISER",
    name: "TOYOTA LAND CRUISER",
    price: "1,500 MAD / jour",
    transmission: "Automatique",
    specs: "V8 / 7 places / 4x4",
    description: "SUV robuste pour trajets urbains et longs parcours avec un confort premium.",
    mainImage: "images/toyota.png",
    detailImage: "imgdetail/toyo2.png",
    galleryImages: ["imgdetail/toyo1.png", "imgdetail/toyo2.png", "imgdetail/toyo3.png", "imgdetail/toyo4.png"],
  },
  "MERCEDES-BENZ GLE": {
    id: "MERCEDES-BENZ GLE",
    name: "MERCEDES-BENZ GLE",
    price: "2,200 MAD / jour",
    transmission: "Automatique",
    specs: "429 ch / Turbo 6 cylindres",
    description:
      "Une transmission ultra-rapide et intelligente pour un confort de conduite inégalé et une réactivité sportive.",
    mainImage: "images/png4.png",
    detailImage: "imgdetail/merc2.png",
    galleryImages: ["imgdetail/merc1.png", "imgdetail/merc2.png", "imgdetail/oip.webp", "imgdetail/merc4.png"],
  },
  "DACIA DUSTER": {
    id: "DACIA DUSTER",
    name: "DACIA DUSTER",
    price: "400 MAD / jour",
    transmission: "Manuelle",
    specs: "SUV compact / 5 places",
    description: "Idéale pour une location économique avec un excellent compromis confort et consommation.",
    mainImage: "images/dacia.png",
    detailImage: "imgdetail/dus2.png",
    galleryImages: ["imgdetail/dus1.png", "imgdetail/dus2.png", "imgdetail/dus3.png", "imgdetail/dus4.png"],
  },
  "BMW X6": {
    id: "BMW X6",
    name: "BMW X6",
    price: "2,500 MAD / jour",
    transmission: "Automatique",
    specs: "400 ch / SUV coupé",
    description: "Design dynamique et conduite sportive pour une expérience haut de gamme.",
    mainImage: "images/BMW1.png",
    detailImage: "images/BMW1.png",
    galleryImages: ["imgdetail/BMW1.png", "imgdetail/BMW2.png", "imgdetail/BMW3.png", "imgdetail/BMW4.png"],
  },
  "VOLKSWAGEN TIGUAN": {
    id: "VOLKSWAGEN TIGUAN",
    name: "VOLKSWAGEN TIGUAN",
    price: "800 MAD / jour",
    transmission: "Automatique",
    specs: "SUV familial / 5 places",
    description: "Polyvalent et fiable, parfait pour les familles et les déplacements quotidiens.",
    mainImage: "images/tiguan.png",
    detailImage: "images/tiguan.png",
    galleryImages: ["imgdetail/tig1.png", "imgdetail/tig2.png", "imgdetail/tig3.png", "imgdetail/tig4.png"],
  },
  "BENTLEY BENTAYGA": {
    id: "BENTLEY BENTAYGA",
    name: "BENTLEY BENTAYGA",
    price: "8,500 MAD / jour",
    transmission: "Automatique",
    specs: "W12 / ultra-luxe",
    description: "Le summum du luxe avec des finitions exclusives et un confort exceptionnel.",
    mainImage: "images/bentely.png",
    detailImage: "images/bentely.png",
    galleryImages: ["imgdetail/bent1.png", "imgdetail/bent2.png", "imgdetail/bent3.png", "imgdetail/bent4.png"],
  },
  CLIO: {
    id: "CLIO",
    name: "CLIO",
    price: "350 MAD / jour",
    transmission: "Automatique",
    specs: "Citadine / 5 places",
    description: "Citadine agile et économique, idéale pour la conduite en ville.",
    mainImage: "images/clio.png",
    detailImage: "images/clio.png",
    galleryImages: ["imgdetail/clio1.png", "imgdetail/clio2.png", "imgdetail/clio3.png", "imgdetail/clio4.png"],
  },
  "RENAULT SYMBOL": {
    id: "RENAULT SYMBOL",
    name: "RENAULT SYMBOL",
    price: "300 MAD / jour",
    transmission: "Manuelle",
    specs: "Berline compacte",
    description: "Option pratique et économique pour un usage quotidien.",
    mainImage: "images/renault symbol.png",
    detailImage: "images/renault symbol.png",
    galleryImages: ["imgdetail/ren1.png", "imgdetail/ren2.png", "imgdetail/ren3.png", "imgdetail/ren4.png"],
  },
  "SKODA KAROQ": {
    id: "SKODA KAROQ",
    name: "SKODA KAROQ",
    price: "600 MAD / jour",
    transmission: "Automatique",
    specs: "SUV / 5 places",
    description: "SUV confortable avec une très bonne tenue de route pour tous les trajets.",
    mainImage: "images/skoda.png",
    detailImage: "images/skoda.png",
    galleryImages: ["imgdetail/skoda1.png", "imgdetail/skoda2.png", "imgdetail/skoda3.png", "imgdetail/skoda4.png"],
  },
};

// Convertit les champs d'un formulaire HTML en objet clé/valeur simple
function formDataToObject(formElement) {
  return Object.fromEntries(new FormData(formElement).entries());
}

// Affiche un message court en bas d'écran puis le masque automatiquement
function showStatusToast(message) {
  if (!statusToast) return;
  statusToast.textContent = message;
  statusToast.classList.remove("hidden");
  clearTimeout(showStatusToast.timeoutId);
  showStatusToast.timeoutId = setTimeout(() => {
    statusToast.classList.add("hidden");
  }, 3000);
}

// Branche l'envoi d'un formulaire : validation native, log console, toast optionnel, reset
function bindFormLog(formElement, formName, successMessage) {
  if (!formElement) return;

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    const payload = formDataToObject(formElement);
    console.log(`[${formName}]`, payload);
    if (successMessage) showStatusToast(successMessage);
    formElement.reset();
  });
}

// Connexion des formulaires (recherche, message, réservation, avis) au comportement commun ci-dessus
bindFormLog(searchForm, "Recherche");
bindFormLog(messageForm, "Message", "Message envoyé avec succès ! ✨");
bindFormLog(reservationForm, "Réservation", "Réservation confirmée ! Nous vous contacterons bientôt. ✅");
bindFormLog(feedbackForm, "Feedback", "Merci pour votre avis ! ⭐");

// Clic sur « voir détail » : mémorise l'identifiant du véhicule puis ouvre la page détail
detailTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const card = trigger.closest(".car-card");
    if (!card) return;
    const selectedCarId = card.dataset.name || "";
    if (!selectedCarId) return;
    localStorage.setItem(SELECTED_CAR_KEY, selectedCarId);
    window.location.href = "detail.html";
  });
});

// Met à jour l'image principale et le texte alternatif sur la page détail
function setMainDetailImage(imageSrc, carName) {
  if (!mainDetailImage || !imageSrc) return;
  mainDetailImage.src = imageSrc;
  mainDetailImage.alt = carName ? `${carName} détail` : "Véhicule détail";
}

// Met à jour une image secondaire de détail si l'élément existe dans le DOM
function setExtraDetailImage(imageSrc, carName) {
  if (!extraDetailImage || !imageSrc) return;
  extraDetailImage.src = imageSrc;
  extraDetailImage.alt = carName ? `Détail ${carName}` : "Détail véhicule";
}

// Construit la rangée de miniatures et le clic pour changer l'image principale
function renderCarGallery(car) {
  if (!detailThumbRow || !car) return;
  const gallerySource = car.galleryImages && car.galleryImages.length ? [...car.galleryImages] : [car.mainImage];
  while (gallerySource.length < 4) {
    gallerySource.push(car.mainImage);
  }
  const gallery = gallerySource.slice(0, 4);
  detailThumbRow.innerHTML = "";

  // Crée chaque miniature cliquable et synchronise l'état « actif » avec l'image principale
  gallery.forEach((imageSrc, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `thumb-btn${index === 0 ? " active" : ""}`;
    button.dataset.image = imageSrc;
    button.innerHTML = `<img src="${imageSrc}" alt="Vue ${index + 1} ${car.name}">`;

    button.addEventListener("click", () => {
      setMainDetailImage(imageSrc, car.name);
      detailThumbRow.querySelectorAll(".thumb-btn").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });

    detailThumbRow.appendChild(button);
  });
}

// Sur la page détail : lit le véhicule choisi dans le stockage local et remplit texte + images
function hydrateDetailFromStorage() {
  if (!isDetailPage) return;
  const selectedCarId = localStorage.getItem(SELECTED_CAR_KEY) || "TOYOTA LAND CRUISER";
  const selectedCar = CAR_DATA[selectedCarId] || CAR_DATA["TOYOTA LAND CRUISER"];
  if (!selectedCar) return;

  if (detailCarName) detailCarName.textContent = selectedCar.name;
  if (detailCarPrice) detailCarPrice.textContent = selectedCar.price;
  if (detailCarTransmission) detailCarTransmission.textContent = selectedCar.transmission;
  if (detailCarSpecs) detailCarSpecs.textContent = selectedCar.specs;
  if (detailCarDescription) detailCarDescription.innerHTML = `Description<br>${selectedCar.description}`;
  setMainDetailImage(selectedCar.mainImage, selectedCar.name);
  setExtraDetailImage(selectedCar.detailImage || selectedCar.mainImage, selectedCar.name);
  renderCarGallery(selectedCar);
}

// Exécute une fois au chargement : peuple la fiche détail si on est sur detail.html
hydrateDetailFromStorage();

// Avant de quitter la page détail vers la réservation : enregistre nom et image pour l'aperçu
function saveReservationSelectionFromDetail() {
  if (!isDetailPage || !detailReserveBtn) return;

  detailReserveBtn.addEventListener("click", () => {
    const selectedCarId = localStorage.getItem(SELECTED_CAR_KEY) || "TOYOTA LAND CRUISER";
    const selectedCar = CAR_DATA[selectedCarId] || CAR_DATA["TOYOTA LAND CRUISER"];
    const reservedCarName = selectedCar ? selectedCar.name : detailCarName ? detailCarName.textContent.trim() : "";
    const reservedCarImg = mainDetailImage ? mainDetailImage.src : selectedCar ? selectedCar.mainImage : "";

    localStorage.setItem(RESERVED_CAR_NAME_KEY, reservedCarName);
    localStorage.setItem(RESERVED_CAR_IMG_KEY, reservedCarImg);
    localStorage.setItem(
      "driveRentReservationCar",
      JSON.stringify({
        name: reservedCarName,
        image: reservedCarImg,
      }),
    );
  });
}

// Affiche dans le bloc « Vous avez choisi » le véhicule issu du stockage local (ou une valeur par défaut)
function hydrateReservationPreview() {
  if (!reservationPreviewContent) return;

  const reservedCarName = localStorage.getItem(RESERVED_CAR_NAME_KEY);
  const reservedCarImg = localStorage.getItem(RESERVED_CAR_IMG_KEY);

  if (reservedCarName && reservedCarImg) {
    reservationPreviewContent.innerHTML = `
      <img src="${reservedCarImg}" alt="${reservedCarName}">
      <p class="preview-name">${reservedCarName}</p>
    `;
    return;
  }

  const raw = localStorage.getItem("driveRentReservationCar");
  if (raw) {
    try {
      const selected = JSON.parse(raw);
      if (selected.name && selected.image) {
        localStorage.setItem(RESERVED_CAR_NAME_KEY, selected.name);
        localStorage.setItem(RESERVED_CAR_IMG_KEY, selected.image);
        reservationPreviewContent.innerHTML = `
          <img src="${selected.image}" alt="${selected.name}">
          <p class="preview-name">${selected.name}</p>
        `;
        return;
      }
    } catch (error) {
      console.warn("Impossible de lire la réservation sauvegardée.", error);
    }
  }

  const fallbackCar = CAR_DATA["TOYOTA LAND CRUISER"];
  localStorage.setItem(RESERVED_CAR_NAME_KEY, fallbackCar.name);
  localStorage.setItem(RESERVED_CAR_IMG_KEY, fallbackCar.mainImage);
  reservationPreviewContent.innerHTML = `
    <img src="${fallbackCar.mainImage}" alt="${fallbackCar.name}">
    <p class="preview-name">${fallbackCar.name}</p>
  `;
}

// Initialise la persistance réservation depuis la page détail puis l'aperçu sur l'accueil
saveReservationSelectionFromDetail();
hydrateReservationPreview();

// Menu mobile / rapide : ouverture du panneau, navigation par ancres ou vers index.html, fermeture au clic extérieur
if (quickMenuToggle && quickMenuPanel) {
  quickMenuToggle.addEventListener("click", () => {
    quickMenuPanel.classList.toggle("hidden");
  });

  quickMenuPanel.querySelectorAll("button[data-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.target;
      if (isDetailPage) {
        window.location.href = target === "accueil" ? "index.html" : `index.html#${target}`;
      } else if (target === "accueil") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const section = document.getElementById(target);
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      quickMenuPanel.classList.add("hidden");
    });
  });

  document.addEventListener("click", (event) => {
    if (!quickMenu) return;
    if (!quickMenu.contains(event.target)) quickMenuPanel.classList.add("hidden");
  });
}

// En-tête : masque la barre quand on descend, la réaffiche quand on remonte (scroll)
function initNavbarScrollBehavior() {
  if (!siteHeader) return;

  let lastScrollY = window.scrollY;
  const scrollThreshold = 12;

  // Compare la position de scroll pour afficher ou masquer l'en-tête fixe
  function onScroll() {
    const current = window.scrollY;

    if (current <= scrollThreshold) {
      siteHeader.classList.remove("nav-hidden");
    } else if (current > lastScrollY) {
      siteHeader.classList.add("nav-hidden");
    } else {
      siteHeader.classList.remove("nav-hidden");
    }

    lastScrollY = current;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
}

// Active le comportement de la barre de navigation au chargement
initNavbarScrollBehavior();
