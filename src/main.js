// Initialize language handling first
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");

  // First, clear any existing language selection (for testing)
  localStorage.removeItem("selectedLanguage");

  const selectedLang = localStorage.getItem("selectedLanguage");
  const languageSelector = document.getElementById("language-selector");
  const mainContent = document.getElementById("main-content");

  console.log("Selected Language:", selectedLang);
  console.log("Language Selector Element:", languageSelector);
  console.log("Main Content Element:", mainContent);

  if (selectedLang) {
    // If language is already selected, show main content
    languageSelector.classList.add("hidden");
    mainContent.style.display = "block";
    mainContent.classList.add("visible");
    updateContent(selectedLang);
    initializeMainContent(selectedLang);
  } else {
    // If no language is selected, show language selector
    console.log("No language selected, showing selector");
    languageSelector.classList.remove("hidden");
    languageSelector.style.display = "block";
    mainContent.style.display = "none";
    mainContent.classList.remove("visible");
  }
});

function initializeMainContent(lang) {
  // Initialize countdown
  updateCountdown(lang);
  setInterval(() => updateCountdown(lang), 1000 * 60);

  // Initialize map
  const map = L.map("map").setView([45.71664, 9.31826], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  L.marker([45.71664, 9.31826])
    .addTo(map)
    .bindPopup("Villa Lattuada")
    .openPopup();

  // Initialize other event listeners
  initializeEventListeners();
}

function initializeEventListeners() {
  // Add smooth scrolling
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const section = document.querySelector(this.getAttribute("href"));
      section.scrollIntoView({ behavior: "smooth" });
    });
  });

  // RSVP form handling
  document.getElementById("rsvpForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("RSVP Data:", data);
    alert("Grazie per aver confermato la tua presenza!");
  });

  // Mobile menu handling
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest("nav")) {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });
}

// Add date countdown
const weddingDate = new Date("2025-09-13T11:30:00");
function updateCountdown(lang) {
  const now = new Date();
  const difference = weddingDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
      const message =
        lang === "it"
          ? `Mancano ${days} giorni e ${hours} ore al nostro matrimonio!`
          : `${days} days and ${hours} hours until our wedding!`;
      countdownElement.textContent = message;
    }
  }
}

// Your JavaScript code here
console.log("Wedding website loaded!");

// Move the selectLanguage function to the top level
window.selectLanguage = function (lang) {
  console.log("Language selected:", lang);
  localStorage.setItem("selectedLanguage", lang);

  const languageSelector = document.getElementById("language-selector");
  const mainContent = document.getElementById("main-content");

  // Start transition
  languageSelector.classList.add("hidden");
  mainContent.style.display = "block";

  // Wait for fade out to complete before showing main content
  setTimeout(() => {
    mainContent.classList.add("visible");
    updateContent(lang);
    initializeMainContent(lang);
  }, 500);
};

// Function to update content based on language
function updateContent(lang) {
  const translations = {
    it: {
      // Navigation
      benvenuti: "Benvenuti",
      location: "Location",
      programma: "Programma",
      regalo: "Regalo",
      rsvp: "RSVP",
      contatti: "Contatti",
      dove_dormire: "Se vieni da fuori",

      // Welcome section
      welcome_title: "Benvenuti!",
      welcome_text:
        "Care invitate e cari invitati,<br>siamo emozionati di condividere con voi questo momento speciale.",
      welcome_text_2:
        "Abbiamo creato questo spazio per raccogliere tutti i dettagli della nostra giornata e per assicurarci che ognuno di voi si senta a proprio agio.",
      welcome_text_3:
        "Non vediamo l'ora di festeggiare insieme e creare nuovi ricordi indimenticabili!",

      // Schedule section
      schedule_title: "Una giornata insieme",
      arrival_time: "Ore 15:30: Arrivo",
      arrival_text:
        "Vi aspettiamo a Villa Lattuada a Casatenovo per iniziare la giornata immersi nei paesaggi della nostra Brianza.",
      ceremony_time: "Ore 16:00: Cerimonia",
      ceremony_text:
        "Ci accompagnerete in questo momento importante insieme ai nostri testimoni Lucia, Melania, Xavi, Luca e Alessio.",
      aperitivo_time: "Ore 17:00: Aperitivo",
      aperitivo_text:
        "Brindiamo insieme al nostro nuovo inizio accompagnati da specialità locali e dal buon vino.",
      dinner_time: "Ore 19:00: Cena",
      dinner_text:
        "Un menu speciale che celebra le tradizioni culinarie delle nostre terre d'origine, dal Nord al Sud Italia.",
      cake_time: "Ore 21:30: Taglio torta",
      cake_text:
        "Il momento più dolce della serata: festeggiamo insieme il nostro amore con il simbolico taglio della torta.",
      dance_time: "Ore 22:00: Festa!",
      dance_text:
        "Musica e divertimento con i nostri amici musicisti e DJ, per ballare e festeggiare insieme fino a tardi.",
      closing_time: "Ore 3:00: Saluti",
      closing_text:
        "Ultimo brindisi e saluti finali. Grazie per aver condiviso con noi questo giorno speciale.",

      // Location section
      directions_title: "Come Arrivare",
      directions_text:
        "La villa è facilmente raggiungibile in auto. Un ampio parcheggio è disponibile all'interno del parco. In caso di esaurimento posti, un ulteriore parcheggio è disponibile di fronte alla villa, a pochi metri di distanza.",
      maps_button: "Apri in Google Maps",

      // Gift section
      gift_title: "Regalo",
      gift_text:
        "La vostra presenza e il vostro affetto saranno per noi il regalo il più bello. Se desiderate comunque farci un regalo, potete contribuire al nostro viaggio di nozze in California e Aruba:",
      gift_iban: "IBAN:",
      gift_name: "Intestato a:",
      gift_reason: "Causale:",
      gift_reason_text: "Regalo di nozze",
      gift_account_holder: "Davide Ramaglietta e Francesca Biffi",

      // RSVP section
      rsvp_text:
        "<em>Vi preghiamo di confermare la vostra presenza entro il <strong>31 luglio 2025</strong>.<br><br>Per permetterci di accogliervi al meglio, vi chiediamo gentilmente di segnalarci eventuali esigenze alimentari o intolleranze.</em>",
      name_label: "Nome e Cognome",
      email_label: "Email",
      guests_label: "Numero di persone",
      dietary_label: "Intolleranze o preferenze alimentari",
      confirm_button: "Conferma presenza",
      confirmation_message: "Grazie per aver confermato la tua presenza!",

      // Accommodation section
      accommodation_title: "Hotel Sant'Eustorgio",
      accommodation_description:
        "Per i nostri ospiti che vengono da fuori, abbiamo organizzato una sistemazione speciale presso",
      accommodation_how_to_reach_title: "Come arrivare",
      accommodation_how_to_reach_text:
        "L'hotel si trova ad Arcore, facilmente raggiungibile in treno da tutti gli aeroporti di Milano.",
      accommodation_rate_title: "Tariffa Agevolata",
      accommodation_rate_text: "Disponibile per le notti del 12 e 13 settembre",
      accommodation_transfer_title: "Transfer Organizzato",
      accommodation_transfer_text:
        "Il giorno del matrimonio, un servizio navetta vi porterà alla location e vi riaccompagnerà a fine serata",
      accommodation_welcome_title: "Aperitivo di Benvenuto",
      accommodation_welcome_text:
        "Venerdì 12 settembre, un aperitivo di benvenuto per tutti gli ospiti che arrivano in anticipo",
      accommodation_contact_note:
        "Per prenotare e ricevere informazioni sulla tariffa speciale, contattateci direttamente",
    },
    en: {
      // Navigation
      benvenuti: "Welcome",
      location: "Location",
      programma: "Schedule",
      regalo: "Gift",
      rsvp: "RSVP",
      contatti: "Contacts",
      dove_dormire: "If you're coming from out of town",

      // Welcome section
      welcome_title: "Welcome!",
      welcome_text:
        "Dear guests,<br>we are excited to share this special moment with you.",
      welcome_text_2:
        "We created this space to gather all the details of our day and to ensure that each of you feels comfortable.",
      welcome_text_3:
        "We can't wait to celebrate together and create unforgettable memories!",

      // Schedule section
      schedule_title: "A Day Together",
      arrival_time: "3:30 PM: Arrival",
      arrival_text:
        "We await you at Villa Lattuada in Casatenovo to begin the day surrounded by the landscapes of our Brianza.",
      ceremony_time: "4:00 PM: Ceremony",
      ceremony_text:
        "You will join us in this important moment together with our wedding witnesses Lucia, Melania, Xavier and Luca.",
      aperitivo_time: "5:00 PM: Aperitivo",
      aperitivo_text:
        "Let's toast together to our new beginning, with local specialties and fine wine.",
      dinner_time: "7:00 PM: Dinner",
      dinner_text:
        "A special menu celebrating the culinary traditions of our homelands, from Northern to Southern Italy.",
      cake_time: "9:30 PM: Cake Cutting",
      cake_text:
        "The sweetest moment of the evening: let's celebrate our love together with the symbolic cake cutting.",
      dance_time: "10:00 PM: Party!",
      dance_text:
        "Music and entertainment with our musician friends and DJ, to dance and celebrate together until late.",
      closing_time: "3:00 AM: Farewell",
      closing_text:
        "Final toast and farewells. Thank you for sharing this special day with us.",

      // Location section
      directions_title: "How to Get There",
      directions_text:
        "The villa is easily accessible by car. A large parking area is available inside the park. In case the main parking is full, an additional parking area is available in front of the villa, just a few meters away.",
      maps_button: "Open in Google Maps",

      // Gift section
      gift_title: "Gift",
      gift_text:
        "Your presence and affection will be the most beautiful gift for us. If you still wish to give us a present, you can contribute to our honeymoon in California and Aruba:",
      gift_iban: "IBAN:",
      gift_name: "Account holder:",
      gift_reason: "Reference:",
      gift_reason_text: "Wedding gift",
      gift_account_holder: "Davide Ramaglietta and Francesca Biffi",

      // RSVP section
      rsvp_text:
        "<em>Please confirm your attendance by <strong>July 31, 2025</strong>.<br><br>To help us accommodate you better, please let us know of any dietary requirements or restrictions.</em>",
      name_label: "Full Name",
      email_label: "Email",
      guests_label: "Number of guests",
      dietary_label: "Dietary requirements or preferences",
      confirm_button: "Confirm attendance",
      confirmation_message: "Thank you for confirming your attendance!",

      // Accommodation section
      accommodation_title: "Hotel Sant'Eustorgio",
      accommodation_description:
        "For our guests coming from out of town, we have arranged special accommodation at",
      accommodation_how_to_reach_title: "How to Get There",
      accommodation_how_to_reach_text:
        "The hotel is located in Arcore, easily accessible by train from all Milan airports.",
      accommodation_rate_title: "Special Rate",
      accommodation_rate_text:
        "Available for the nights of September 12th and 13th",
      accommodation_transfer_title: "Organized Transfer",
      accommodation_transfer_text:
        "On the wedding day, a shuttle service will take you to the venue and bring you back at the end of the evening",
      accommodation_welcome_title: "Welcome Aperitivo",
      accommodation_welcome_text:
        "Friday, September 12th, a welcome aperitivo for all guests arriving early",
      accommodation_contact_note:
        "To book and receive information about the special rate, please contact us directly",
    },
  };

  // Update navigation
  document.querySelectorAll("nav a").forEach((link) => {
    const key = link.getAttribute("href").replace("#", "");
    if (translations[lang][key]) {
      link.textContent = translations[lang][key];
    }
  });

  // Update welcome section
  document.querySelector("#benvenuti h2").textContent =
    translations[lang].welcome_title;
  const welcomeParagraphs = document.querySelectorAll("#benvenuti p");
  welcomeParagraphs[0].innerHTML = translations[lang].welcome_text;
  welcomeParagraphs[1].textContent = translations[lang].welcome_text_2;
  welcomeParagraphs[2].textContent = translations[lang].welcome_text_3;

  // Update schedule section
  document.querySelector("#programma h2").textContent =
    translations[lang].schedule_title;
  const events = document.querySelectorAll(".event");
  events[0].querySelector("h3").textContent = translations[lang].arrival_time;
  events[0].querySelector("p").textContent = translations[lang].arrival_text;
  events[1].querySelector("h3").textContent = translations[lang].ceremony_time;
  events[1].querySelector("p").textContent = translations[lang].ceremony_text;
  events[2].querySelector("h3").textContent = translations[lang].aperitivo_time;
  events[2].querySelector("p").textContent = translations[lang].aperitivo_text;
  events[3].querySelector("h3").textContent = translations[lang].dinner_time;
  events[3].querySelector("p").textContent = translations[lang].dinner_text;
  events[4].querySelector("h3").textContent = translations[lang].cake_time;
  events[4].querySelector("p").textContent = translations[lang].cake_text;
  events[5].querySelector("h3").textContent = translations[lang].dance_time;
  events[5].querySelector("p").textContent = translations[lang].dance_text;
  events[6].querySelector("h3").textContent = translations[lang].closing_time;
  events[6].querySelector("p").textContent = translations[lang].closing_text;

  // Update location section
  document.querySelector("#location h2").textContent =
    translations[lang].location;
  document.querySelector(".directions h4").textContent =
    translations[lang].directions_title;
  document.querySelector(".directions p").textContent =
    translations[lang].directions_text;
  document.querySelector(".directions .button").textContent =
    translations[lang].maps_button;

  // Update gift section
  document.querySelector("#regalo h2").textContent =
    translations[lang].gift_title;
  document.querySelector("#regalo > p").textContent =
    translations[lang].gift_text;
  document.querySelectorAll(".gift-info p").forEach((p) => {
    const strong = p.querySelector("strong");
    if (strong) {
      if (strong.textContent.includes("IBAN"))
        strong.textContent = translations[lang].gift_iban;
      if (strong.textContent.includes("Intestato"))
        strong.textContent = translations[lang].gift_name;
      if (strong.textContent.includes("Causale"))
        strong.textContent = translations[lang].gift_reason;
    }
  });

  // Update RSVP section
  document.querySelector("#rsvp h2").textContent = "RSVP";
  document.querySelector("#rsvp > p").innerHTML = translations[lang].rsvp_text;
  document.querySelector('label[for="name"]').textContent =
    translations[lang].name_label;
  document.querySelector('label[for="email"]').textContent =
    translations[lang].email_label;
  document.querySelector('label[for="guests"]').textContent =
    translations[lang].guests_label;
  document.querySelector('label[for="dietary"]').textContent =
    translations[lang].dietary_label;
  document.querySelector("#rsvpForm button").textContent =
    translations[lang].confirm_button;

  // Update contacts section
  document.querySelector("#contatti h2").textContent =
    translations[lang].contatti;

  // Update countdown message
  updateCountdown(lang);

  // Update accommodation section
  const accommodationSection = document.querySelector("#dove-dormire");
  if (accommodationSection) {
    // Update section title in both the header and navigation
    const sectionTitle =
      accommodationSection.querySelector(".section-header h2");
    const navLink = document.querySelector('nav a[href="#dove-dormire"]');

    if (sectionTitle) {
      const isActive = accommodationSection
        .querySelector(".section-header")
        .classList.contains("active");
      sectionTitle.textContent =
        translations[lang].dove_dormire + (isActive ? " −" : " +");
    }
    if (navLink) {
      navLink.textContent = translations[lang].dove_dormire;
    }

    // Update hotel title
    const hotelTitle = accommodationSection.querySelector(
      ".accommodation-info h3"
    );
    if (hotelTitle) {
      hotelTitle.textContent = translations[lang].accommodation_title;
    }

    // Update description
    const description = accommodationSection.querySelector(
      ".accommodation-description"
    );
    if (description) {
      description.innerHTML =
        translations[lang].accommodation_description +
        ' <a href="https://maps.app.goo.gl/ycApxzt7aGGt59e4A" target="_blank"><strong>Hotel Sant\'Eustorgio di Arcore</strong></a>.';
    }

    // Update detail items
    const detailItems = accommodationSection.querySelectorAll(".detail-item");
    if (detailItems.length >= 4) {
      // How to reach
      detailItems[0].querySelector("h4").textContent =
        translations[lang].accommodation_how_to_reach_title;
      detailItems[0].querySelector("p").textContent =
        translations[lang].accommodation_how_to_reach_text;

      // Rate
      detailItems[1].querySelector("h4").textContent =
        translations[lang].accommodation_rate_title;
      detailItems[1].querySelector("p").textContent =
        translations[lang].accommodation_rate_text;

      // Transfer
      detailItems[2].querySelector("h4").textContent =
        translations[lang].accommodation_transfer_title;
      detailItems[2].querySelector("p").textContent =
        translations[lang].accommodation_transfer_text;

      // Welcome
      detailItems[3].querySelector("h4").textContent =
        translations[lang].accommodation_welcome_title;
      detailItems[3].querySelector("p").textContent =
        translations[lang].accommodation_welcome_text;
    }

    // Update contact note
    const contactNote = accommodationSection.querySelector(".contact-note");
    if (contactNote) {
      contactNote.textContent = translations[lang].accommodation_contact_note;
    }
  }
}

// Add a function to reset language
function resetLanguage() {
  localStorage.removeItem("selectedLanguage");
  window.location.reload();
}

// Add menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    // Optional: Close menu when clicking outside
    document.addEventListener("click", function (event) {
      const isClickInside =
        navLinks.contains(event.target) || menuToggle.contains(event.target);
      if (!isClickInside && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  });

  // Close menu when clicking a link
  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
});

// Handle collapsible sections
document.addEventListener("DOMContentLoaded", function () {
  const sectionHeaders = document.querySelectorAll(".section-header");

  sectionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const isActive = this.classList.contains("active");
      const title = this.querySelector("h2");
      const baseText = title.textContent.replace(/[+−]$/, "").trim();

      // Toggle active class on header
      this.classList.toggle("active");

      // Update the text
      if (isActive) {
        title.textContent = baseText + " +";
        content.classList.remove("active");
      } else {
        title.textContent = baseText + " −";
        content.classList.add("active");
      }
    });
  });
});
