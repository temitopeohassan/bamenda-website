import { formspreeIds } from '../config/site.js';
import { Icon } from '../components/Icons.jsx';
import { PageHero, Feature, usePageTitle } from '../components/Blocks.jsx';
import {
  useEnquiryForm, required, emailOk, Fieldset, Field, Select, Chips,
  ContactFields, Consent, SubmitRow, SuccessState,
} from '../components/FormParts.jsx';

const SERVICES = [
  'Raft foundation formwork', 'Decking (slab)', 'Columns & pillars', 'Reinforced concrete slabs',
  'Traditional formwork', 'Scaffolding', 'Engineering solutions', 'Consultancy',
];

const PROJECT_TYPES = [
  'Residential (bungalow / duplex)', 'Residential (multi-storey)', 'Commercial / office',
  'Industrial / warehouse', 'Road / bridge', 'Other infrastructure', 'Other',
];

const initial = {
  services: [], projectType: '', floors: '', area: '', state: '', siteLocation: '',
  startDate: '', hireDuration: '', drawings: '', supervision: '', notes: '',
  name: '', company: '', email: '', phone: '', contactMethod: '', consent: false,
};

function validate(v) {
  const e = required(v, ['services', 'projectType', 'state', 'startDate', 'name', 'email', 'phone', 'consent']);
  if (v.email && !emailOk(v.email)) e.email = 'Please enter a valid email address.';
  return e;
}

export default function FormworksQuote() {
  usePageTitle('Request a Formwork Quote');
  const f = useEnquiryForm({ initial, formId: formspreeIds.formworks, validate });
  const { values: v, errors, bind } = f;

  return (
    <>
      <PageHero
        kind="formworks"
        eyebrow="Request a quote"
        title="Tell us about your project."
        crumbs={[{ label: 'Formworks', to: '/formworks' }, { label: 'Request a quote' }]}
      >
        <p className="lead" style={{ color: 'rgba(255,255,255,.82)' }}>
          Share the basics of your structure and site and we’ll prepare a formwork proposal. It
          takes about three minutes.
        </p>
      </PageHero>

      <section className="section">
        <div className="container form-shell">
          <aside className="form-aside">
            <Feature icon={Icon.Ruler} title="Engineered proposal">Our engineers review your brief and recommend the right systems.</Feature>
            <Feature icon={Icon.Clock} title="Fast response">Expect a call or WhatsApp message within one working day.</Feature>
            <Feature icon={Icon.Shield} title="No obligation">Requesting a quote is free and doesn’t commit you to anything.</Feature>
          </aside>

          {f.status === 'sent' ? (
            <SuccessState title="Thank you, we’ve got your project brief." backTo="/formworks" backLabel="Back to Formworks">
              A member of the Bamenda Formworks team will review your requirements and contact you
              shortly to discuss drawings and pricing.
            </SuccessState>
          ) : (
            <form className="form-card" noValidate onSubmit={(e) => f.onSubmit(e, { _subject: `Formwork quote: ${v.projectType} (${v.state})` })}>
              <Fieldset num="1" title="What do you need?" hint="Select every service that applies.">
                <div className="fields">
                  <Chips name="services" options={SERVICES} values={v.services} onToggle={(o) => f.toggle('services', o)} error={errors.services} />
                </div>
              </Fieldset>

              <Fieldset num="2" title="The project" hint="Tell us what you’re building and where.">
                <div className="fields">
                  <Field label="Project type" name="projectType" req error={errors.projectType}>
                    <Select {...bind('projectType')} options={PROJECT_TYPES} />
                  </Field>
                  <Field label="Number of floors" name="floors">
                    <Select {...bind('floors')} options={['Ground floor only', '1 – 2', '3 – 5', '6 – 10', 'More than 10', 'Not applicable']} placeholder="Not sure" />
                  </Field>
                  <Field label="Approximate area (if known)" name="area" help="e.g. 450 sqm slab, 20 columns">
                    <input {...bind('area')} />
                  </Field>
                  <Field label="State" name="state" req error={errors.state}>
                    <Select {...bind('state')} options={['Lagos', 'Abuja (FCT)', 'Rivers', 'Ogun', 'Oyo', 'Other']} />
                  </Field>
                  <Field label="Site location" name="siteLocation" full help="e.g. Ajah, Lekki">
                    <input {...bind('siteLocation')} />
                  </Field>
                </div>
              </Fieldset>

              <Fieldset num="3" title="Timing & support">
                <div className="fields">
                  <Field label="When do you plan to start?" name="startDate" req error={errors.startDate}>
                    <Select {...bind('startDate')} options={['Immediately', 'Within 2 weeks', 'Within 1 month', '1 – 3 months', 'Just budgeting']} />
                  </Field>
                  <Field label="Lease duration" name="hireDuration">
                    <Select {...bind('hireDuration')} options={['Under 1 month', '1 – 3 months', '3 – 6 months', '6+ months']} placeholder="Not sure" />
                  </Field>
                  <Field label="Do you have drawings?" name="drawings">
                    <Select {...bind('drawings')} options={['Yes, structural drawings', 'Architectural drawings only', 'Not yet']} />
                  </Field>
                  <Field label="On-site supervision needed?" name="supervision">
                    <Select {...bind('supervision')} options={['Yes', 'No', 'Not sure']} />
                  </Field>
                  <Field label="Anything else we should know?" name="notes" full>
                    <textarea {...bind('notes')} placeholder="e.g. tight site access, specific finish required, pour schedule" />
                  </Field>
                </div>
              </Fieldset>

              <Fieldset num="4" title="Your details">
                <ContactFields bind={bind} errors={errors} />
                <div className="fields" style={{ marginTop: 16 }}>
                  <Field label="Company (optional)" name="company" full>
                    <input {...bind('company')} autoComplete="organization" />
                  </Field>
                </div>
              </Fieldset>

              <Consent checked={v.consent} onChange={(val) => f.set('consent', val)} error={errors.consent} />
              <SubmitRow status={f.status} serverError={f.serverError} label="Send my quote request" />
            </form>
          )}
        </div>
      </section>
    </>
  );
}
