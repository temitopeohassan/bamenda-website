import { Link } from 'react-router-dom';
import { divisions } from '../config/site.js';
import { Icon } from '../components/Icons.jsx';
import { PageHero, Feature, Media, CtaBand, usePageTitle } from '../components/Blocks.jsx';

export default function About() {
  usePageTitle('About Us');
  return (
    <>
      <PageHero eyebrow="About Bamenda" title="A Nigerian group built on service." crumbs={[{ label: 'About' }]}>
        <p className="lead" style={{ color: 'rgba(255,255,255,.82)' }}>
          {/* TODO: replace with Bamenda's real story: founding year, founder, milestones */}
          Bamenda brings together construction engineering, real estate and travel under one
          name, serving individuals, families, schools and businesses across Nigeria.
        </p>
      </PageHero>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Our story</span>
            <h2>Three companies, one standard.</h2>
            <p>
              {/* TODO: client to supply */}
              What began with formwork engineering on construction sites has grown into a group
              that helps people build, find a place to live or work, and see the world. Across every
              company, our approach is the same: listen carefully, be honest about options, and
              deliver what we promise.
            </p>
            <div className="btn-row">
              {Object.values(divisions).map((d) => (
                <Link key={d.key} to={d.path} className="btn btn--outline">{d.short}</Link>
              ))}
            </div>
          </div>
          <Media kind="formworks" tall />
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our values</span>
            <h2>What you can expect from us.</h2>
          </div>
          <div className="features">
            <Feature icon={Icon.Shield} title="Integrity">Clear advice, transparent pricing and no surprises.</Feature>
            <Feature icon={Icon.Users} title="People first">Every client gets a real person who knows their brief.</Feature>
            <Feature icon={Icon.Ruler} title="Quality">Professional standards on site, in property and on the road.</Feature>
            <Feature icon={Icon.Handshake} title="Partnership">Long-term relationships with clients and partners.</Feature>
          </div>
        </div>
      </section>

      {/* TODO: Leadership team section: photo, name, role for each leader */}

      <CtaBand title="Let’s work together." text="Tell us what you need and we’ll connect you with the right team." to="/contact" label="Contact us" />
    </>
  );
}
