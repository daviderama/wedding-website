// Initialize language handling first
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded');
  
  // First, clear any existing language selection (for testing)
  localStorage.removeItem('selectedLanguage');
  
  const selectedLang = localStorage.getItem('selectedLanguage');
  const languageSelector = document.getElementById('language-selector');
  const mainContent = document.getElementById('main-content');

  console.log('Selected Language:', selectedLang);
  console.log('Language Selector Element:', languageSelector);
  console.log('Main Content Element:', mainContent);

  if (selectedLang) {
    // If language is already selected, show main content
    languageSelector.classList.add('hidden');
    mainContent.style.display = 'block';
    mainContent.classList.add('visible');
    updateContent(selectedLang);
    initializeMainContent(selectedLang);
  } else {
    // If no language is selected, show language selector
    console.log('No language selected, showing selector');
    languageSelector.classList.remove('hidden');
    languageSelector.style.display = 'block';
    mainContent.style.display = 'none';
    mainContent.classList.remove('visible');
  }
});

function initializeMainContent(lang) {
  // Initialize countdown
  updateCountdown(lang);
  setInterval(() => updateCountdown(lang), 1000 * 60);

  // Initialize map
  const map = L.map('map').setView([45.71664, 9.31826], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([45.71664, 9.31826])
    .addTo(map)
    .bindPopup('Villa Lattuada')
    .openPopup();

  // Initialize other event listeners
  initializeEventListeners();
}

function initializeEventListeners() {
  // Add smooth scrolling
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const section = document.querySelector(this.getAttribute('href'));
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // RSVP form handling
  document.getElementById('rsvpForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('RSVP Data:', data);
    alert('Grazie per aver confermato la tua presenza!');
  });

  // Mobile menu handling
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}

// Add date countdown
const weddingDate = new Date('2025-09-13T11:30:00')
function updateCountdown(lang) {
  const now = new Date()
  const difference = weddingDate - now
  
  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    const countdownElement = document.getElementById('countdown')
    if (countdownElement) {
      const message = lang === 'it' 
        ? `Mancano ${days} giorni e ${hours} ore al nostro matrimonio!`
        : `${days} days and ${hours} hours until our wedding!`;
      countdownElement.textContent = message;
    }
  }
}

// Your JavaScript code here
console.log('Wedding website loaded!')

// Move the selectLanguage function to the top level
window.selectLanguage = function(lang) {
  console.log('Language selected:', lang);
  localStorage.setItem('selectedLanguage', lang);
  
  const languageSelector = document.getElementById('language-selector');
  const mainContent = document.getElementById('main-content');
  
  // Start transition
  languageSelector.classList.add('hidden');
  mainContent.style.display = 'block';
  
  // Wait for fade out to complete before showing main content
  setTimeout(() => {
    mainContent.classList.add('visible');
    updateContent(lang);
    initializeMainContent(lang);
  }, 500);
};

// Function to update content based on language
function updateContent(lang) {
  const translations = {
    it: {
      // Navigation
      benvenuti: 'Benvenuti',
      programma: 'Programma',
      location: 'Location',
      regalo: 'Regalo',
      rsvp: 'RSVP',
      contatti: 'Contatti',

      // Welcome section
      welcome_title: 'Benvenuti!',
      welcome_text: 'Care invitate e cari invitati, vi diamo il benvenuto in questa pagina. Abbiamo pensato di creare questo spazio per darvi alcune informazioni utili e raccogliere le esigenze di tutti.',

      // Schedule section
      schedule_title: 'Una giornata insieme',
      arrival_time: 'Ore 11:30: Arrivo',
      arrival_text: 'Vi aspettiamo a Villa Lattuada a Casatenovo. Un aperitivo e del buon vino vi faranno da benvenuto.',
      ceremony_time: 'Ore 12:30: Cerimonia',
      ceremony_text: 'La cerimonia si terrà nel parco della villa.',
      lunch_time: 'Dalle ore 13:00: Pranzo',
      lunch_text: 'Gusteremo insieme un pranzo preparato con cura, con attenzione alle intolleranze e preferenze alimentari.',
      cake_time: 'Dalle ore 17:30: Taglio torta',
      cake_text: 'Festeggeremo insieme con il taglio della torta e i saluti finali.',

      // Location section
      directions_title: 'Come Arrivare',
      directions_text: 'La villa è facilmente raggiungibile in auto. Ampio parcheggio disponibile in loco.',
      maps_button: 'Apri in Google Maps',

      // Gift section
      gift_title: 'Lista Nozze',
      gift_text: 'Il vostro affetto e la vostra presenza sono il regalo più grande. Se desiderate comunque farci un regalo, potete contribuire al nostro viaggio di nozze:',
      gift_iban: 'IBAN:',
      gift_name: 'Intestato a:',
      gift_reason: 'Causale:',
      gift_reason_text: 'Regalo di nozze',

      // RSVP section
      rsvp_text: 'Vi preghiamo di confermare la vostra presenza entro il 13 Agosto 2025',
      name_label: 'Nome e Cognome',
      email_label: 'Email',
      guests_label: 'Numero di persone',
      dietary_label: 'Intolleranze o preferenze alimentari',
      confirm_button: 'Conferma presenza',
      confirmation_message: 'Grazie per aver confermato la tua presenza!'
    },
    en: {
      // Navigation
      benvenuti: 'Welcome',
      programma: 'Schedule',
      location: 'Location',
      regalo: 'Gift',
      rsvp: 'RSVP',
      contatti: 'Contacts',

      // Welcome section
      welcome_title: 'Welcome!',
      welcome_text: 'Dear guests, welcome to our wedding website. We created this space to provide you with useful information and gather everyone\'s needs.',

      // Schedule section
      schedule_title: 'Schedule of the Day',
      arrival_time: '11:30 AM: Arrival',
      arrival_text: 'We await you at Villa Lattuada in Casatenovo. Welcome aperitif and wine will be served.',
      ceremony_time: '12:30 PM: Ceremony',
      ceremony_text: 'The ceremony will be held in the villa\'s park.',
      lunch_time: 'From 1:00 PM: Lunch',
      lunch_text: 'We will enjoy lunch together, carefully prepared with attention to dietary requirements.',
      cake_time: 'From 5:30 PM: Cake Cutting',
      cake_text: 'We will celebrate together with the cake cutting and final greetings.',

      // Location section
      directions_title: 'How to Get There',
      directions_text: 'The villa is easily accessible by car. Ample parking available on site.',
      maps_button: 'Open in Google Maps',

      // Gift section
      gift_title: 'Wedding Gift',
      gift_text: 'Your love and presence are the greatest gift. However, if you wish to give us a present, you can contribute to our honeymoon:',
      gift_iban: 'IBAN:',
      gift_name: 'Account holder:',
      gift_reason: 'Reference:',
      gift_reason_text: 'Wedding gift',

      // RSVP section
      rsvp_text: 'Please confirm your attendance by August 13, 2025',
      name_label: 'Full Name',
      email_label: 'Email',
      guests_label: 'Number of guests',
      dietary_label: 'Dietary requirements or preferences',
      confirm_button: 'Confirm attendance',
      confirmation_message: 'Thank you for confirming your attendance!'
    }
  };

  // Update navigation
  document.querySelectorAll('nav a').forEach(link => {
    const key = link.getAttribute('href').replace('#', '');
    if (translations[lang][key]) {
      link.textContent = translations[lang][key];
    }
  });

  // Update welcome section
  document.querySelector('#benvenuti h2').textContent = translations[lang].welcome_title;
  document.querySelector('#benvenuti p').textContent = translations[lang].welcome_text;

  // Update schedule section
  document.querySelector('#programma h2').textContent = translations[lang].schedule_title;
  const events = document.querySelectorAll('.event');
  events[0].querySelector('h3').textContent = translations[lang].arrival_time;
  events[0].querySelector('p').textContent = translations[lang].arrival_text;
  events[1].querySelector('h3').textContent = translations[lang].ceremony_time;
  events[1].querySelector('p').textContent = translations[lang].ceremony_text;
  events[2].querySelector('h3').textContent = translations[lang].lunch_time;
  events[2].querySelector('p').textContent = translations[lang].lunch_text;
  events[3].querySelector('h3').textContent = translations[lang].cake_time;
  events[3].querySelector('p').textContent = translations[lang].cake_text;

  // Update location section
  document.querySelector('#location h2').textContent = translations[lang].location;
  document.querySelector('.directions h4').textContent = translations[lang].directions_title;
  document.querySelector('.directions p').textContent = translations[lang].directions_text;
  document.querySelector('.directions .button').textContent = translations[lang].maps_button;

  // Update gift section
  document.querySelector('#regalo h2').textContent = translations[lang].gift_title;
  document.querySelector('#regalo > p').textContent = translations[lang].gift_text;
  document.querySelectorAll('.gift-info p').forEach(p => {
    const strong = p.querySelector('strong');
    if (strong) {
      if (strong.textContent.includes('IBAN')) strong.textContent = translations[lang].gift_iban;
      if (strong.textContent.includes('Intestato')) strong.textContent = translations[lang].gift_name;
      if (strong.textContent.includes('Causale')) strong.textContent = translations[lang].gift_reason;
    }
  });

  // Update RSVP section
  document.querySelector('#rsvp h2').textContent = 'RSVP';
  document.querySelector('#rsvp > p').textContent = translations[lang].rsvp_text;
  document.querySelector('label[for="name"]').textContent = translations[lang].name_label;
  document.querySelector('label[for="email"]').textContent = translations[lang].email_label;
  document.querySelector('label[for="guests"]').textContent = translations[lang].guests_label;
  document.querySelector('label[for="dietary"]').textContent = translations[lang].dietary_label;
  document.querySelector('#rsvpForm button').textContent = translations[lang].confirm_button;

  // Update contacts section
  document.querySelector('#contatti h2').textContent = translations[lang].contatti;

  // Update countdown message
  updateCountdown(lang);
}

// Add a function to reset language
function resetLanguage() {
  localStorage.removeItem('selectedLanguage');
  window.location.reload();
} 