import { Link } from 'react-router-dom';
import { divisions } from '../config/site.js';
import { Icon } from '../components/Icons.jsx';
import { Media, Feature, CtaBand, usePageTitle } from '../components/Blocks.jsx';
import Hero from '../components/Hero.jsx';

const cards = [
  { ...divisions.formworks, cta: 'Explore Formworks', accent: 'var(--formworks)' },
  { ...divisions.properties, cta: 'Find a property', accent: 'var(--properties)' },
  { ...divisions.travels, cta: 'Plan a trip', accent: 'var(--travels)' },
];

export default function Home() {
  usePageTitle('Formworks, Real Estate & Travel in Nigeria');
  return (
    <>
      <Hero />

      <div className="container">
        {/* TODO: swap for real numbers once confirmed (projects, years, clients) */}
        <div className="stats stats--below">
          <div className="stat"><strong>3</strong><span>Specialist companies</span></div>
          <div className="stat"><strong>Lagos · Abuja</strong><span>And across Nigeria</span></div>
          <div className="stat"><strong>1</strong><span>Point of contact</span></div>
          <div className="stat"><strong>100%</strong><span>Tailored to your brief</span></div>
        </div>
      </div>

      <section className="section" id="companies">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Our companies</span>
            <h2>One group. Three ways we can help.</h2>
            <p className="lead">Choose where you’d like to start. Each team works directly with you from first conversation to delivery.</p>
          </div>
          <div className="grid-3">
            {cards.map((c) => (
              <Link key={c.key} to={c.path} className="division" style={{ '--accent': c.accent }}>
                <Media kind={c.key} />
                <div className="division__body">
                  <span className="tag">{c.short}</span>
                  <h3>{c.name}</h3>
                  <p>{c.summary}</p>
                  <span className="division__link">{c.cta}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why Bamenda</span>
            <h2>Built on listening first.</h2>
            <p className="lead">We don’t push off-the-shelf options. We start with what you need, then do the legwork.</p>
          </div>
          <div className="features">
            <Feature icon={Icon.Search} title="We do the searching">
              Tell us your brief once. We shortlist properties, partners and itineraries that fit.
            </Feature>
            <Feature icon={Icon.Shield} title="Trusted and verified">
              We work with vetted landlords, developers, suppliers and travel partners.
            </Feature>
            <Feature icon={Icon.Handshake} title="One relationship">
              A single team across construction, property and travel, so you’re never passed around.
            </Feature>
            <Feature icon={Icon.Clock} title="Quick responses">
              Every enquiry is reviewed by a real person, usually within one working day.
            </Feature>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure where to start?"
        text="Send us a message or chat on WhatsApp, and we’ll point you to the right team."
        to="/contact"
        label="Contact us"
      />
    </>
  );
}
