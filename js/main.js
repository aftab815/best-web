// main.js for Best Nation Welfare Organization
console.log('JS loaded for Best Nation Welfare Organization');

// Show custom popup function
function showContactPopup(message) {
  let popup = document.getElementById('contact-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'contact-popup';
    popup.style.position = 'fixed';
    popup.style.top = '30px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.background = 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)';
    popup.style.color = '#fff';
    popup.style.padding = '16px 32px';
    popup.style.borderRadius = '8px';
    popup.style.fontSize = '1.1rem';
    popup.style.boxShadow = '0 2px 12px rgba(0,0,0,0.12)';
    popup.style.zIndex = '9999';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.3s';
    document.body.appendChild(popup);
  }
  popup.textContent = message;
  popup.style.opacity = '1';
  setTimeout(() => {
    popup.style.opacity = '0';
  }, 2500);
}

// Contact form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Optional: Show loading or disable button
    const btn = contactForm.querySelector('.contact-btn');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if (res.ok) {
        showContactPopup('Your message has been sent!');
        contactForm.reset();
      } else {
        showContactPopup('Failed to send message. Please try again.');
      }
    } catch (err) {
      showContactPopup('Error connecting to server.');
    }
    btn.disabled = false;
    btn.textContent = 'Send Message';
  });
} 