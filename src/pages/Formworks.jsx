import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons.jsx';
import { PageHero, Feature, Media, CtaBand, usePageTitle } from '../components/Blocks.jsx';

export default function Formworks() {
  usePageTitle('Bamenda Formworks: Formwork Construction & Engineering');
  return (
    <>
      <PageHero
        kind="formworks"
        eyebrow="Bamenda Formworks"
        title="Formwork that keeps your project on schedule."
        crumbs={[{ label: 'Formworks' }]}
      >
        <p className="lead" style={{ color: 'rgba(255,255,255,.82)' }}>
          Formwork systems, engineering design and on-site support for contractors and developers
          building residential, commercial and infrastructure projects.
        </p>
        <div className="btn-row">
          <Link to="/contact?division=formworks" className="btn btn--primary">Request a quote</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">What we do</span>
            <h2>Engineering-led formwork, from design to strike.</h2>
            <p>
              We help contractors pour faster, safer and with less waste. Our team designs formwork
              layouts for your structure, supplies the systems and supports your site crew through
              erection, pouring and striking.
            </p>
            <ul className="checklist">
              <li>Slab, column, wall and beam formwork</li>
              <li>Shoring and falsework for high-rise and heavy loads</li>
              <li>Formwork design, drawings and load calculations</li>
              <li>Hire or supply, with on-site technical supervision</li>
            </ul>
            <Link to="/contact?division=formworks" className="btn btn--dark">Discuss your project</Link>
          </div>
          <Media kind="formworks" tall />
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why contractors choose us</span>
            <h2>Built for Nigerian sites.</h2>
          </div>
          <div className="features">
            <Feature icon={Icon.Ruler} title="Engineered layouts">Designs and drawings matched to your structural plans.</Feature>
            <Feature icon={Icon.Clock} title="Faster cycles">Reusable systems that cut pour-to-pour time.</Feature>
            <Feature icon={Icon.Shield} title="Safety first">Load-checked shoring and trained supervision on site.</Feature>
            <Feature icon={Icon.Crane} title="Any scale">From duplexes to high-rise and infrastructure works.</Feature>
          </div>
        </div>
      </section>

      {/* TODO: add a Projects gallery here once photos and project names are available */}

      <CtaBand
        title="Have drawings ready?"
        text="Send us your project details and we’ll come back with a formwork proposal."
        to="/contact?division=formworks"
        label="Request a quote"
      />
    </>
  );
}
