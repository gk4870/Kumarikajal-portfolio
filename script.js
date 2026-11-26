/**
 * Portfolio data & Work & Experience renderer for Kumari Kajal.
 * Update PORTFOLIO_DATA below to add new roles, details, or social URLs.
 */
const PORTFOLIO_DATA = {
  portraits: [
    {
      src: 'assets/portrait-hospital-2.jpg',
      alt: 'Kumari Kajal standing in hospital corridor wearing white medical coat and stethoscope (1 of 3)'
    },
    {
      src: 'assets/portrait-hospital-1.jpg',
      alt: 'Kumari Kajal hospital close-up portrait in white medical coat and stethoscope (2 of 3)'
    },
    {
      src: 'assets/portrait-hospital-3.jpg',
      alt: 'Kumari Kajal seated in hospital reception wearing white medical coat and stethoscope (3 of 3)'
    }
  ],
  experiences: [
    {
      id: 'garkha-anm',
      company: 'Government of Bihar',
      role: 'Auxiliary Nurse Midwife (ANM) / Nurse',
      period: 'March 2026 — Present',
      location: 'Garkha Hospital, Chapra, Bihar',
      department: 'Healthcare / Public Health',
      image: 'assets/hospital.jpg',
      imageAlt: 'Modern sunlit hospital building representing service at Garkha Hospital',
      summary:
        'Currently working as an Auxiliary Nurse Midwife (ANM) at Garkha Hospital under the Government of Bihar. Dedicated to providing quality patient care, supporting maternal and child healthcare services, and promoting community health and awareness.',
      highlights: [
        'Providing basic nursing care, monitoring patients, and assisting in healthcare services.',
        'Supporting maternal and child health programs, including antenatal and postnatal care.',
        'Promoting health awareness, hygiene, immunization, and preventive healthcare in the community.'
      ],
      tags: [
        'Patient Care',
        'Nursing Care',
        'Maternal Health',
        'Child Healthcare',
        'Community Health',
        'Immunization',
        'Health Education',
        'Patient Monitoring'
      ]
    }
  ]
};

const ARROW_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 17L17 7" />
    <path d="M9 7H17V15" />
  </svg>
`;

function renderExperienceCard() {
  const list = document.getElementById('experience-list');
  const item = PORTFOLIO_DATA.experiences[0];
  if (!list || !item) return;

  list.innerHTML = `
    <article class="exp-primary" data-exp-id="${item.id}">
      <div class="exp-trigger">
        <div class="exp-heading-group">
          <span class="exp-company">${item.company}</span>
          <span class="exp-role">${item.role}</span>
          <span class="exp-meta">${item.location} &middot; ${item.department}</span>
        </div>
        <button
          type="button"
          class="exp-action-btn"
          data-open-exp="${item.id}"
          aria-label="Open full details for ${item.company}"
          title="View full role details"
        >
          ${ARROW_SVG}
        </button>
      </div>

      <div class="exp-preview-wrap" data-open-exp="${item.id}" role="button" tabindex="0" aria-label="View full Work and Experience details">
        <img class="exp-preview-img" src="${item.image}" alt="${item.imageAlt}" />
        <span class="exp-preview-badge">View details</span>
      </div>

      <p class="exp-summary">${item.summary}</p>
    </article>

    <section class="exp-section-block" aria-label="Key Responsibilities and Highlights">
      <h3 class="exp-subhead">Key Responsibilities &amp; Highlights</h3>
      <ul class="exp-bullets">
        ${item.highlights.map((point) => `<li>${point}</li>`).join('')}
      </ul>
    </section>

    <section class="exp-section-block" aria-label="Skills and Expertise">
      <h3 class="exp-subhead">Skills &amp; Expertise</h3>
      <div class="exp-skills-row">
        ${item.tags.map((tag) => `<span class="exp-skill-chip">${tag}</span>`).join('')}
      </div>
    </section>
  `;
}

function openExperienceDialog(id) {
  const item = PORTFOLIO_DATA.experiences.find((entry) => entry.id === id);
  const dialog = document.getElementById('experience-dialog');
  if (!item || !dialog) return;

  document.getElementById('exp-dialog-period').textContent = `${item.period} · ${item.department}`;
  document.getElementById('exp-dialog-title').textContent = item.company;
  document.getElementById('exp-dialog-role').textContent = `${item.role} — ${item.location}`;

  const img = document.getElementById('exp-dialog-img');
  img.src = item.image;
  img.alt = item.imageAlt;

  document.getElementById('exp-dialog-summary').textContent = item.summary;
  document.getElementById('exp-dialog-highlights').innerHTML = item.highlights
    .map((point) => `<li>${point}</li>`)
    .join('');
  document.getElementById('exp-dialog-tags').innerHTML = item.tags
    .map((tag) => `<span class="exp-tag">${tag}</span>`)
    .join('');

  dialog.showModal();
}

function highlightSection(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  target.classList.add('is-highlighted');
  window.setTimeout(() => target.classList.remove('is-highlighted'), 1100);
}

function initPortraitSwitcher() {
  const card = document.getElementById('portrait-card');
  const img = document.getElementById('portrait-img');
  const dotsContainer = document.getElementById('portrait-dots');
  const counter = document.getElementById('portrait-counter');
  const portraits = PORTFOLIO_DATA.portraits;
  if (!card || !img || !portraits?.length) return;

  let currentIndex = 0;

  // Preload all portraits so click switching is instantaneous
  portraits.forEach((p) => {
    const preload = new Image();
    preload.src = p.src;
  });

  if (dotsContainer) {
    dotsContainer.innerHTML = portraits
      .map(
        (_, idx) =>
          `<button type="button" class="portrait-dot ${idx === 0 ? 'is-active' : ''}" data-portrait-index="${idx}" tabindex="-1"></button>`
      )
      .join('');
  }

  function applyPortrait(nextIndex, immediate = false) {
    currentIndex = (nextIndex + portraits.length) % portraits.length;
    const active = portraits[currentIndex];

    if (immediate) {
      img.src = active.src;
      img.alt = active.alt;
    } else {
      img.classList.add('is-switching');
      window.setTimeout(() => {
        img.src = active.src;
        img.alt = active.alt;
        img.classList.remove('is-switching');
      }, 110);
    }

    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${portraits.length}`;
    }
    card.setAttribute(
      'aria-label',
      `Portrait photo ${currentIndex + 1} of ${portraits.length}. Click to switch photo.`
    );
    dotsContainer?.querySelectorAll('.portrait-dot').forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === currentIndex);
    });
  }

  applyPortrait(0, true);

  card.addEventListener('click', (event) => {
    const dot = event.target.closest('[data-portrait-index]');
    if (dot) {
      event.stopPropagation();
      applyPortrait(Number(dot.getAttribute('data-portrait-index')));
      return;
    }
    applyPortrait(currentIndex + 1);
  });

  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    applyPortrait(currentIndex + 1);
  });
}

function initInteractions() {
  initPortraitSwitcher();
  renderExperienceCard();

  const expList = document.getElementById('experience-list');
  expList?.addEventListener('click', (event) => {
    const openTrigger = event.target.closest('[data-open-exp]');
    if (openTrigger) {
      openExperienceDialog(openTrigger.getAttribute('data-open-exp'));
    }
  });

  expList?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const openTrigger = event.target.closest('[data-open-exp]');
    if (openTrigger) {
      event.preventDefault();
      openExperienceDialog(openTrigger.getAttribute('data-open-exp'));
    }
  });

  // Header navigation links
  document.querySelectorAll('[data-focus-target]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetClass = link.getAttribute('data-focus-target');
      highlightSection(`.${targetClass}`);
    });
  });

  // Contact modal triggers
  const contactDialog = document.getElementById('contact-dialog');
  const openContact = () => contactDialog?.showModal();
  document.getElementById('contact-card-btn')?.addEventListener('click', openContact);
  document.getElementById('nav-contact-btn')?.addEventListener('click', openContact);

  // Close buttons & backdrop clicks
  document.querySelectorAll('[data-close-dialog]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.getElementById(btn.getAttribute('data-close-dialog'))?.close();
    });
  });

  document.querySelectorAll('.blush-dialog').forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  // Contact form feedback
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const sender = String(formData.get('name') || '').trim();
    if (formStatus) {
      formStatus.textContent = `Thank you${sender ? `, ${sender}` : ''}! Your message is recorded.`;
    }
    contactForm.reset();
  });
}

document.addEventListener('DOMContentLoaded', initInteractions);
