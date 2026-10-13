import { formspreeIds } from '../config/site.js';
import { Icon } from '../components/Icons.jsx';
import { PageHero, Feature, usePageTitle } from '../components/Blocks.jsx';
import {
  useEnquiryForm, required, emailOk, Fieldset, Field, Select, Choices, Chips,
  ContactFields, Consent, SubmitRow, SuccessState,
} from '../components/FormParts.jsx';

const WHO = [
  { value: 'Individual / couple', label: 'Individual / couple', desc: 'Just me, or two of us' },
  { value: 'Family', label: 'Family', desc: 'Parents, children and relatives' },
  { value: 'School / student group', label: 'School group', desc: 'Educational tours for students' },
  { value: 'Organisation', label: 'Organisation', desc: 'Staff, church or association trips' },
];

const PURPOSES = [
  'Educational / curriculum tour', 'Holiday / leisure', 'University campus visits',
  'Conference / business', 'Retreat / team trip', 'Other',
];

const DESTINATIONS = [
  'USA', 'United Kingdom', 'Europe', 'Canada', 'Dubai / Middle East',
  'Asia', 'Africa', 'Not sure yet, advise me',
];

const SERVICES = [
  'Visa guidance', 'Flights', 'Accommodation', 'Tours & activities',
  'Airport transfers', 'Travel insurance', 'Chaperones / supervision',
];

const initial = {
  travellerType: '', purpose: '', destinations: [], destinationNotes: '',
  adults: '', children: '', ageRange: '', travelMonth: '', duration: '', flexibility: '',
  budget: '', passports: '', services: [], notes: '', organisation: '',
  name: '', email: '', phone: '', contactMethod: '', consent: false,
};

function validate(v) {
  const e = required(v, ['travellerType', 'purpose', 'destinations', 'adults', 'travelMonth', 'budget', 'name', 'email', 'phone', 'consent']);
  if (v.email && !emailOk(v.email)) e.email = 'Please enter a valid email address.';
  if (e.destinations) e.destinations = 'Pick at least one destination, or “Not sure yet”.';
  return e;
}

export default function TravelsEnquiry() {
  usePageTitle('Travel Enquiry');
  const f = useEnquiryForm({ initial, formId: formspreeIds.travels, validate });
  const { values: v, errors, bind } = f;
  const isGroup = v.travellerType === 'School / student group' || v.travellerType === 'Organisation';

  return (
    <>
      <PageHero
        kind="travels"
        eyebrow="Travel enquiry"
        title="Tell us about your trip."
        crumbs={[{ label: 'Travels', to: '/travels' }, { label: 'Enquiry' }]}
      >
        <p className="lead" style={{ color: 'rgba(255,255,255,.82)' }}>
          Share as much or as little as you know. We’ll use it to design a proposal tailored to you.
        </p>
      </PageHero>

      <section className="section">
        <div className="container form-shell">
          <aside className="form-aside">
            <Feature icon={Icon.Map} title="Tailored, not templated">Every proposal is built around your travellers, dates and budget.</Feature>
            <Feature icon={Icon.Doc} title="Visa support">We help you prepare the right documents early.</Feature>
            <Feature icon={Icon.Shield} title="No obligation">Making an enquiry is free and doesn’t commit you to anything.</Feature>
          </aside>

          {f.status === 'sent' ? (
            <SuccessState title="Thank you, your trip is on our desk." backTo="/travels" backLabel="Back to Travels">
              A Bamenda Travels consultant will review your details and get in touch with ideas and
              a tailored proposal.
            </SuccessState>
          ) : (
            <form className="form-card" noValidate onSubmit={(e) => f.onSubmit(e, { _subject: `Travel enquiry: ${v.travellerType} – ${v.destinations.join(', ')}` })}>
              <Fieldset num="1" title="Who’s travelling?">
                <Choices name="travellerType" options={WHO} value={v.travellerType} onChange={(val) => f.set('travellerType', val)} error={errors.travellerType} />
                <div className="fields" style={{ marginTop: 16 }}>
                  <Field label="Adults (18+)" name="adults" req error={errors.adults}>
                    <input {...bind('adults')} type="number" min="0" inputMode="numeric" />
                  </Field>
                  <Field label="Children / students (under 18)" name="children">
                    <input {...bind('children')} type="number" min="0" inputMode="numeric" />
                  </Field>
                  {isGroup && (
                    <>
                      <Field label="School or organisation name" name="organisation">
                        <input {...bind('organisation')} />
                      </Field>
                      <Field label="Age range / class level" name="ageRange" help="e.g. JSS3 – SS2, ages 13–16">
                        <input {...bind('ageRange')} />
                      </Field>
                    </>
                  )}
                </div>
              </Fieldset>

              <Fieldset num="2" title="Where and why?">
                <div className="fields">
                  <Field label="Main purpose of the trip" name="purpose" req error={errors.purpose} full>
                    <Select {...bind('purpose')} options={PURPOSES} />
                  </Field>
                  <Chips
                    name="destinations"
                    label="Destinations you’re considering *"
                    options={DESTINATIONS}
                    values={v.destinations}
                    onToggle={(o) => f.toggle('destinations', o)}
                    error={errors.destinations}
                  />
                  <Field label="Specific cities or places (optional)" name="destinationNotes" full>
                    <input {...bind('destinationNotes')} placeholder="e.g. London and Paris, Disney World, NASA Space Center" />
                  </Field>
                </div>
              </Fieldset>

              <Fieldset num="3" title="Dates & budget">
                <div className="fields">
                  <Field label="When would you like to travel?" name="travelMonth" req error={errors.travelMonth} help="A month or school holiday is fine.">
                    <input {...bind('travelMonth')} placeholder="e.g. July 2027, Easter break" />
                  </Field>
                  <Field label="Trip length" name="duration">
                    <Select {...bind('duration')} options={['Under 1 week', '1 – 2 weeks', '2 – 3 weeks', '3+ weeks']} />
                  </Field>
                  <Field label="Budget per person" name="budget" req error={errors.budget} help="Excluding visa fees.">
                    <Select {...bind('budget')} options={['Under ₦3m', '₦3m – ₦6m', '₦6m – ₦10m', '₦10m – ₦15m', 'Above ₦15m', 'Need advice']} />
                  </Field>
                  <Field label="Are the dates flexible?" name="flexibility">
                    <Select {...bind('flexibility')} options={['Fixed dates', 'Flexible by a few days', 'Very flexible']} />
                  </Field>
                </div>
              </Fieldset>

              <Fieldset num="4" title="What should we arrange?" hint="Select everything you’d like help with.">
                <div className="fields">
                  <Chips name="services" options={SERVICES} values={v.services} onToggle={(o) => f.toggle('services', o)} />
                  <Field label="Passport status" name="passports">
                    <Select {...bind('passports')} options={['All travellers have valid passports', 'Some travellers need passports', 'Not sure']} />
                  </Field>
                  <Field label="Anything else?" name="notes" full>
                    <textarea {...bind('notes')} placeholder="Learning goals, special requirements, dietary needs, past visa history…" />
                  </Field>
                </div>
              </Fieldset>

              <Fieldset num="5" title="Your details">
                <ContactFields bind={bind} errors={errors} />
              </Fieldset>

              <Consent checked={v.consent} onChange={(val) => f.set('consent', val)} error={errors.consent} />
              <SubmitRow status={f.status} serverError={f.serverError} label="Send my travel enquiry" />
            </form>
          )}
        </div>
      </section>
    </>
  );
}
