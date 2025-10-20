// Common JS for all pages: año, FAQ, form, mobile menu (si existe)

// Update year in footer (backup para PHP)
document.addEventListener('DOMContentLoaded', function() {
  const yearSpan = document.getElementById('year');
  if (yearSpan && !yearSpan.textContent) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// FAQ toggle: change +/− when opened
document.querySelectorAll('#faq-list details').forEach(d => {
  d.addEventListener('toggle', () => {
    const span = d.querySelector('summary span');
    if (span) span.textContent = d.open ? '－' : '＋';
  });
});

// Contact form submission handler (solo si existe la página con form)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const formMessage = document.getElementById('formMessage');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (formMessage) {
      formMessage.textContent = '';
      formMessage.classList.remove('text-brand-700', 'text-red-600');
    }
    const data = new FormData(contactForm);
    const payload = {
      nombre: data.get('nombre'),
      email: data.get('email'),
      telefono: data.get('telefono'),
      mensaje: data.get('mensaje'),
    };
    try {
      const res = await fetch('/contact-handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        if (formMessage) {
          formMessage.textContent = '¡Gracias por contactarnos! Te responderemos pronto.';
          formMessage.classList.add('text-brand-700');
        }
        contactForm.reset();
      } else {
        throw new Error('Error al enviar');
      }
    } catch (err) {
      if (formMessage) {
        formMessage.textContent = 'Hubo un error al enviar tu mensaje. Intenta de nuevo más tarde.';
        formMessage.classList.add('text-red-600');
      }
    }
  });
}

// Mobile menu toggle (si existe, del truncado original)
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });
}

// JS específico para planificador-lite si se carga aquí (pero como es iframe, maneja su propio JS)