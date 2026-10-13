import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons.jsx';
import { PageHero, Feature, Media, CtaBand, usePageTitle } from '../components/Blocks.jsx';

export default function Properties() {
  usePageTitle('Bamenda Properties: Rent, Lease or Buy in Lagos & Abuja');
  return (
    <>
      <PageHero
        kind="properties"
        eyebrow="Bamenda Properties"
        title="The right property, found for you."
        crumbs={[{ label: 'Properties' }]}
      >
        <p className="lead" style={{ color: 'rgba(255,255,255,.82)' }}>
          Whether you want to rent a home, lease commercial space or buy land or a house, tell us
          what you need. We search our network, shortlist suitable options and guide you through
          inspection, negotiation and paperwork.
        </p>
        <div className="btn-row">
          <Link to="/properties/enquiry" className="btn btn--primary">Tell us what you need</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">What we do</span>
            <h2>Real estate marketing and consulting, built around your brief.</h2>
            <p>
              Bamenda Properties connects tenants, buyers and businesses with verified properties
              across Lagos, Abuja and other parts of Nigeria. Instead of scrolling through endless
              listings, you share your requirements once, and our team does the searching.
            </p>
            <ul className="checklist">
              <li><strong>Rent:</strong> apartments, flats and family homes on yearly terms</li>
              <li><strong>Lease:</strong> offices, shops, warehouses and long-term residential</li>
              <li><strong>Purchase:</strong> houses, off-plan units and land with proper title checks</li>
            </ul>
            <Link to="/properties/enquiry" className="btn btn--dark">Start your property enquiry</Link>
          </div>
          <Media kind="properties" tall />
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>From brief to keys in four steps.</h2>
          </div>
          <div className="steps">
            <div className="step"><h3>Share your brief</h3><p>Complete the short enquiry form: rent, lease or buy, location, budget and must-haves.</p></div>
            <div className="step"><h3>We shortlist</h3><p>We search our network and send you properties that match.</p></div>
            <div className="step"><h3>Inspect</h3><p>We arrange viewings at times that suit you, in person or by video.</p></div>
            <div className="step"><h3>Close with confidence</h3><p>We support negotiation, documentation and title checks through to handover.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container features">
          <Feature icon={Icon.Shield} title="Verified properties">We check ownership and documentation before we recommend a property.</Feature>
          <Feature icon={Icon.Map} title="Local knowledge">Advice on neighbourhoods, access, security and value.</Feature>
          <Feature icon={Icon.Key} title="Residential & commercial">Homes, offices, retail space and land for individuals and businesses.</Feature>
        </div>
      </section>

      <CtaBand
        title="Ready to find your property?"
        text="It takes about three minutes. We’ll get back to you with options that fit."
        to="/properties/enquiry"
        label="Go to the enquiry form"
      />
    </>
  );
}
