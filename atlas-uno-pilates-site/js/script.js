/* =========================================================
   ATLAS UNO PILATES — SCRIPT PRINCIPAL
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initLeadForm();
});

/**
 * Abre/fecha o menu mobile e fecha automaticamente
 * ao clicar em um link ou fora do menu.
 */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      closeNav();
    }
  });
}

/**
 * Valida e "envia" o formulário de captação de leads.
 * Redireciona os dados preenchidos para o WhatsApp do estúdio.
 */
function initLeadForm() {
  const form = document.getElementById('leadForm');
  const note = document.getElementById('formNote');
  if (!form || !note) return;

  const WHATSAPP_NUMBER = '5588981505678';
  const defaultNote = note.textContent;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const nome = form.nome.value.trim();
    const whatsapp = form.whatsapp.value.trim();
    const objetivo = form.objetivo.value;

    const mensagem =
      `Olá! Meu nome é ${nome}.\n` +
      `Meu WhatsApp: ${whatsapp}\n` +
      `Objetivo: ${objetivo}\n` +
      `Quero fazer parte do Atlas Uno e agendar minha aula experimental.`;

    const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(mensagem)}`;

    note.textContent = 'Perfeito! Abrindo o WhatsApp para confirmar seu agendamento...';
    note.classList.add('is-success');

    window.open(url, '_blank', 'noopener');
    form.reset();

    setTimeout(() => {
      note.textContent = defaultNote;
      note.classList.remove('is-success');
    }, 6000);
  });
}
