// ─────────────────────────────────────────────────────────────
// Central site settings. Replace every TODO with Bamenda's real
// details before launch — these values feed the header, footer,
// contact page and WhatsApp button.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Bamenda',
  tagline: 'Building, housing and moving Nigerians forward.',
  // TODO: real details
  phone: '+234 800 000 0000',
  phoneHref: 'tel:+2348000000000',
  whatsapp: '2348000000000', // international format, digits only
  email: 'info@bamenda.com.ng',
  address: 'Lagos, Nigeria', // TODO: full office address
  hours: 'Mon – Fri, 9:00am – 5:00pm',
  socials: {
    instagram: '', // TODO: e.g. https://instagram.com/bamendagroup
    facebook: '',
    linkedin: '',
  },
};

export const divisions = {
  formworks: {
    key: 'formworks',
    name: 'Bamenda Formworks',
    short: 'Formworks',
    path: '/formworks',
    summary:
      'Formwork systems, engineering support and site execution for residential, commercial and infrastructure projects.',
  },
  properties: {
    key: 'properties',
    name: 'Bamenda Properties',
    short: 'Properties',
    path: '/properties',
    summary:
      'Tell us what you need — to rent, lease or buy — and we source the right property for you across Lagos, Abuja and beyond.',
  },
  travels: {
    key: 'travels',
    name: 'Bamenda Travels',
    short: 'Travels',
    path: '/travels',
    summary:
      'Educational tours, family holidays and group trips, designed around your goals, dates and budget.',
  },
};

export const formspreeIds = {
  formworks: import.meta.env.VITE_FORMSPREE_FORMWORKS,
  properties: import.meta.env.VITE_FORMSPREE_PROPERTIES,
  travels: import.meta.env.VITE_FORMSPREE_TRAVELS,
  contact: import.meta.env.VITE_FORMSPREE_CONTACT,
};

export const whatsappLink = (text = '') =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
