import { useSearchParams, Link } from 'react-router-dom';
import { site, formspreeIds, whatsappLink } from '../config/site.js';
import { Icon } from '../components/Icons.jsx';
import { PageHero, usePageTitle } from '../components/Blocks.jsx';
import {
  useEnquiryForm, required, emailOk, Field, Select, Consent, SubmitRow, SuccessState,
} from '../components/FormParts.jsx';

const DIVISION_OPTIONS = {
  formworks: 'Bamenda Formworks (quote)',
  properties: 'Bamenda Properties',
  travels: 'Bamenda Travels',
  general: 'General enquiry',
};

function validate(v) {
  const e = required(v, ['division', 'name', 'email', 'phone', 'message', 'consent']);
  if (v.email && !emailOk(v.email)) e.email = 'Please enter a valid email address.';
  return e;
}

function ContactForm() {
  usePageTitle('Contact Us');
  const [params] = useSearchParams();
  const preset = DIVISION_OPTIONS[params.get('division')] || '';
  const f = useEnquiryForm({
    initial: { division: preset, name: '', company: '', email: '', phone: '', projectLocation: '', message: '', consent: false },
    formId: formspreeIds.contact,
    validate,
  });
  const { values: v, errors, bind } = f;
  const isFormworks = v.division === DIVISION_OPTIONS.formworks;

  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk." crumbs={[{ label: 'Contact' }]}>
        <p className="lead" style={{ color: 'rgba(255,255,255,.82)' }}>
          Send us a message, call, or chat on WhatsApp. Looking for a property or planning a trip?
          Our <Link to="/properties/enquiry" style={{ color: 'var(--green)' }}>property</Link> and{' '}
          <Link to="/travels/enquiry" style={{ color: 'var(--green)' }}>travel</Link> forms get you a faster, tailored answer.
        </p>
      </PageHero>

      <section className="section">
        <div className="container form-shell">
          <aside className="form-aside">
            <div className="form-card">
              <h3>Reach us directly</h3>
              <ul className="contact-list">
                <li><span className="feature__icon"><Icon.Phone /></span><div><small>Call</small><a href={site.phoneHref}>{site.phone}</a></div></li>
                <li><span className="feature__icon"><Icon.WhatsApp /></span><div><small>WhatsApp</small><a href={whatsappLink()} target="_blank" rel="noreferrer">Chat with us</a></div></li>
                <li><span className="feature__icon"><Icon.Mail /></span><div><small>Email</small><a href={`mailto:${site.email}`}>{site.email}</a></div></li>
                <li><span className="feature__icon"><Icon.Pin /></span><div><small>Office</small>{site.address}<small>{site.hours}</small></div></li>
              </ul>
            </div>
          </aside>

          {f.status === 'sent' ? (
            <SuccessState title="Message received." backTo="/" backLabel="Explore our companies">
              Thanks for reaching out. The right member of our team will get back to you shortly.
            </SuccessState>
          ) : (
            <form className="form-card" noValidate onSubmit={(e) => f.onSubmit(e, { _subject: `Website enquiry: ${v.division}` })}>
              <h2 className="mt-0">{isFormworks ? 'Request a formwork quote' : 'Send us a message'}</h2>
              <div className="fields" style={{ marginBottom: 20 }}>
                <Field label="What is this about?" name="division" req error={errors.division} full>
                  <Select {...bind('division')} options={Object.values(DIVISION_OPTIONS)} />
                </Field>
                <Field label="Full name" name="name" req error={errors.name}>
                  <input {...bind('name')} autoComplete="name" />
                </Field>
                <Field label="Company (optional)" name="company">
                  <input {...bind('company')} autoComplete="organization" />
                </Field>
                <Field label="Email address" name="email" req error={errors.email}>
                  <input {...bind('email')} type="email" autoComplete="email" />
                </Field>
                <Field label="Phone / WhatsApp" name="phone" req error={errors.phone}>
                  <input {...bind('phone')} type="tel" autoComplete="tel" />
                </Field>
                {isFormworks && (
                  <Field label="Project location" name="projectLocation" full>
                    <input {...bind('projectLocation')} placeholder="e.g. Lekki, Lagos" />
                  </Field>
                )}
                <Field
                  label={isFormworks ? 'Project details' : 'Message'}
                  name="message"
                  req
                  error={errors.message}
                  full
                  help={isFormworks ? 'Structure type, floors, approximate slab area, start date. We can request drawings afterwards.' : undefined}
                >
                  <textarea {...bind('message')} />
                </Field>
              </div>
              <Consent checked={v.consent} onChange={(val) => f.set('consent', val)} error={errors.consent} />
              <SubmitRow status={f.status} serverError={f.serverError} label="Send message" />
            </form>
          )}
        </div>
      </section>
    </>
  );
}

// Re-mount when ?division= changes so the dropdown preset updates.
export default function Contact() {
  const [params] = useSearchParams();
  return <ContactForm key={params.get('division') || 'none'} />;
}
