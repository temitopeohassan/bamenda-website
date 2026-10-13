import { formspreeIds } from '../config/site.js';
import { Icon } from '../components/Icons.jsx';
import { PageHero, Feature, usePageTitle } from '../components/Blocks.jsx';
import {
  useEnquiryForm, required, emailOk, Fieldset, Field, Select, Choices, Chips,
  ContactFields, Consent, SubmitRow, SuccessState,
} from '../components/FormParts.jsx';

const INTENTS = [
  { value: 'Rent', label: 'Rent', desc: 'A home or apartment on yearly terms' },
  { value: 'Lease', label: 'Lease', desc: 'Commercial or long-term space' },
  { value: 'Purchase', label: 'Purchase', desc: 'Buy a house, unit or land' },
];

const TYPES = [
  'Apartment / flat', 'Mini flat / studio', 'Terraced house', 'Semi-detached house',
  'Detached house / duplex', 'Land', 'Office space', 'Shop / retail', 'Warehouse', 'Other',
];

const BUDGETS = {
  Rent: ['Under ₦2m / year', '₦2m – ₦5m / year', '₦5m – ₦10m / year', '₦10m – ₦20m / year', 'Above ₦20m / year'],
  Lease: ['Under ₦5m / year', '₦5m – ₦15m / year', '₦15m – ₦30m / year', '₦30m – ₦60m / year', 'Above ₦60m / year'],
  Purchase: ['Under ₦30m', '₦30m – ₦75m', '₦75m – ₦150m', '₦150m – ₦300m', 'Above ₦300m'],
};

const FEATURES = [
  'Parking', '24/7 security', 'Steady power / backup', 'Water supply', 'Serviced',
  'Furnished', 'Gated estate', 'Swimming pool', 'Gym', 'Boys’ quarters', 'Good road access',
];

const initial = {
  intent: '', propertyType: '', bedrooms: '', state: '', areas: '',
  budget: '', leaseDuration: '', timeline: '', features: [], notes: '',
  name: '', email: '', phone: '', contactMethod: '', consent: false,
};

function validate(v) {
  const e = required(v, ['intent', 'propertyType', 'state', 'budget', 'timeline', 'name', 'email', 'phone', 'consent']);
  if (v.email && !emailOk(v.email)) e.email = 'Please enter a valid email address.';
  return e;
}

export default function PropertiesEnquiry() {
  usePageTitle('Property Enquiry');
  const f = useEnquiryForm({ initial, formId: formspreeIds.properties, validate });
  const { values: v, errors, bind } = f;
  const isResidential = v.propertyType && !['Land', 'Office space', 'Shop / retail', 'Warehouse'].includes(v.propertyType);

  return (
    <>
      <PageHero
        kind="properties"
        eyebrow="Property enquiry"
        title="Tell us what you’re looking for."
        crumbs={[{ label: 'Properties', to: '/properties' }, { label: 'Enquiry' }]}
      >
        <p className="lead" style={{ color: 'rgba(255,255,255,.82)' }}>
          The more detail you share, the better we can match you. It takes about three minutes.
        </p>
      </PageHero>

      <section className="section">
        <div className="container form-shell">
          <aside className="form-aside">
            <Feature icon={Icon.Search} title="We search for you">Our team reviews your brief and sources matching properties.</Feature>
            <Feature icon={Icon.Clock} title="Fast response">Expect a call or WhatsApp message within one working day.</Feature>
            <Feature icon={Icon.Shield} title="No obligation">Making an enquiry is free and doesn’t commit you to anything.</Feature>
          </aside>

          {f.status === 'sent' ? (
            <SuccessState title="Thank you, we’ve got your brief." backTo="/properties" backLabel="Back to Properties">
              A member of the Bamenda Properties team will review your requirements and contact you
              shortly with suitable options.
            </SuccessState>
          ) : (
            <form className="form-card" noValidate onSubmit={(e) => f.onSubmit(e, { _subject: `Property enquiry: ${v.intent} – ${v.propertyType} (${v.state})` })}>
              <Fieldset num="1" title="What would you like to do?">
                <Choices name="intent" options={INTENTS} value={v.intent} onChange={(val) => { f.set('intent', val); f.set('budget', ''); }} error={errors.intent} />
              </Fieldset>

              <Fieldset num="2" title="The property" hint="Tell us the type, size and where you’d like it.">
                <div className="fields">
                  <Field label="Property type" name="propertyType" req error={errors.propertyType}>
                    <Select {...bind('propertyType')} options={TYPES} />
                  </Field>
                  {isResidential ? (
                    <Field label="Bedrooms" name="bedrooms">
                      <Select {...bind('bedrooms')} options={['1', '2', '3', '4', '5+']} placeholder="Any" />
                    </Field>
                  ) : (
                    <Field label="Size (if known)" name="bedrooms" help="e.g. 500 sqm, 2 plots">
                      <input {...bind('bedrooms')} />
                    </Field>
                  )}
                  <Field label="State" name="state" req error={errors.state}>
                    <Select {...bind('state')} options={['Lagos', 'Abuja (FCT)', 'Rivers', 'Ogun', 'Oyo', 'Other']} />
                  </Field>
                  <Field label="Preferred areas" name="areas" help="e.g. Lekki Phase 1, Ikoyi, Gwarinpa">
                    <input {...bind('areas')} />
                  </Field>
                </div>
              </Fieldset>

              <Fieldset num="3" title="Budget & timing">
                <div className="fields">
                  <Field label="Budget" name="budget" req error={errors.budget} help={!v.intent ? 'Choose rent, lease or purchase first.' : undefined}>
                    <Select {...bind('budget')} options={BUDGETS[v.intent] || []} disabled={!v.intent} />
                  </Field>
                  <Field label="When do you need it?" name="timeline" req error={errors.timeline}>
                    <Select {...bind('timeline')} options={['Immediately', 'Within 1 month', '1 – 3 months', '3 – 6 months', 'Just exploring']} />
                  </Field>
                  {v.intent === 'Lease' && (
                    <Field label="Lease duration" name="leaseDuration">
                      <Select {...bind('leaseDuration')} options={['1 year', '2 years', '3 – 5 years', '5+ years']} />
                    </Field>
                  )}
                </div>
              </Fieldset>

              <Fieldset num="4" title="Must-haves" hint="Select anything that matters to you.">
                <div className="fields">
                  <Chips name="features" options={FEATURES} values={v.features} onToggle={(o) => f.toggle('features', o)} />
                  <Field label="Anything else we should know?" name="notes" full>
                    <textarea {...bind('notes')} placeholder="e.g. close to a school, ground floor only, need a C of O" />
                  </Field>
                </div>
              </Fieldset>

              <Fieldset num="5" title="Your details">
                <ContactFields bind={bind} errors={errors} />
              </Fieldset>

              <Consent checked={v.consent} onChange={(val) => f.set('consent', val)} error={errors.consent} />
              <SubmitRow status={f.status} serverError={f.serverError} label="Send my property enquiry" />
            </form>
          )}
        </div>
      </section>
    </>
  );
}
