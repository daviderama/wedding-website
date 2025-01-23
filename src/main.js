import './style.css'

// Add smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const section = document.querySelector(this.getAttribute('href'))
    section.scrollIntoView({ behavior: 'smooth' })
  })
})

// Add date countdown
const weddingDate = new Date('2025-09-13T11:30:00')
function updateCountdown() {
  const now = new Date()
  const difference = weddingDate - now
  
  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    const countdownElement = document.getElementById('countdown')
    if (countdownElement) {
      countdownElement.textContent = `Mancano ${days} giorni e ${hours} ore al nostro matrimonio!`
    }
  }
}

updateCountdown()
setInterval(updateCountdown, 1000 * 60) // Update every minute

// Initialize map
const map = L.map('map').setView([45.71664, 9.31826], 15) // Villa Lattuada coordinates
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map)

L.marker([45.71664, 9.31826]) // Villa Lattuada coordinates
  .addTo(map)
  .bindPopup('Villa Lattuada')
  .openPopup()

// RSVP form handling
document.getElementById('rsvpForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)
  
  // Here you would typically send this data to your server
  console.log('RSVP Data:', data)
  
  alert('Grazie per aver confermato la tua presenza!')
})

// Your JavaScript code here
console.log('Wedding website loaded!') 