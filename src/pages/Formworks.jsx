import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons.jsx';
import { PageHero, Feature, Media, CtaBand, usePageTitle } from '../components/Blocks.jsx';

export default function Formworks() {
  usePageTitle('Bamenda Formworks: Formwork, Scaffolding & Engineering');
  return (
    <>
      <PageHero
        kind="formworks"
        eyebrow="Bamenda Formworks"
        title="Formwork and scaffolding that keep your project on schedule."
        crumbs={[{ label: 'Formworks' }]}
      >
        <p className="lead" style={{ color: 'rgba(255,255,255,.82)' }}>
          We design and lease formwork and scaffolding systems for buildings, roads and
          bridges, with engineering support from first drawing to final pour.
        </p>
        <div className="btn-row">
          <Link to="/formworks/quote" className="btn btn--primary">Request a quote</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2>One of Nigeria’s formwork and scaffolding pioneers.</h2>
            <p>
              Bamenda Formworks serves small, medium and large projects across civil engineering,
              roads and bridges. Our technical team keeps improving our systems, and we work with
              timber beam producers, steel workshops and international formwork manufacturers to
              supply the right equipment for each job.
            </p>
            <ul className="checklist">
              <li>Formwork and scaffolding available on lease</li>
              <li>Steel and timber systems, including imported formwork</li>
              <li>Engineering design and on-site technical support</li>
              <li>After-sales service on every project</li>
            </ul>
            <Link to="/formworks/quote" className="btn btn--dark">Discuss your project</Link>
          </div>
          <Media kind="formworks" tall />
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our services</span>
            <h2>Everything your structure needs, foundation to roof.</h2>
          </div>
          <div className="features">
            <Feature icon={Icon.Building} title="Raft foundation formwork">
              Reusable steel forms for raft foundations. They cost less than timber, leave a clean
              finish with no honeycombing, and suit soft ground and basements.
            </Feature>
            <Feature icon={Icon.Ruler} title="Decking (slab)">
              Horizontal formwork for casting in-situ floor and roof slabs, including flat, hollow
              core, waffle and composite slabs.
            </Feature>
            <Feature icon={Icon.Crane} title="Columns & pillars">
              Formwork for square, rectangular, circular and polygonal columns, whether plain,
              tapered or decorative.
            </Feature>
            <Feature icon={Icon.Check} title="Reinforced concrete slabs">
              Solid, ribbed and precast slabs spanning one or two ways, for floors, roofs, walls
              and bridge decks.
            </Feature>
            <Feature icon={Icon.Key} title="Traditional formwork">
              Timber and plywood shuttering built by experienced carpenters for one-off shapes and
              smaller pours.
            </Feature>
            <Feature icon={Icon.Shield} title="Scaffolding solutions">
              Tube-and-coupler, modular and frame scaffolding with access stairs, ladders and debris
              chutes, for construction, maintenance and repair.
            </Feature>
            <Feature icon={Icon.Doc} title="Engineering solutions">
              Civil, structural and architectural engineering input to plan formwork layouts and
              solve problems on site.
            </Feature>
            <Feature icon={Icon.Handshake} title="Consultancy">
              Project advice covering strategy, management, operations, finance, HR and IT for
              construction work.
            </Feature>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why contractors choose us</span>
            <h2>Quality work at a fair price.</h2>
          </div>
          <div className="features">
            <Feature icon={Icon.Clock} title="Reasonable prices">Competitive rates without cutting corners on quality.</Feature>
            <Feature icon={Icon.Doc} title="Certified work">Every job is backed by engineer certification.</Feature>
            <Feature icon={Icon.Users} title="Technical support">Hands-on help during the job and after-sales service once it’s done.</Feature>
            <Feature icon={Icon.Handshake} title="Trusted partner">Long-standing relationships with contractors and construction firms.</Feature>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>From enquiry to completion in three steps.</h2>
          </div>
          <div className="steps">
            <div className="step"><h3>Talk to our team</h3><p>A dedicated team member learns about your project and its requirements.</p></div>
            <div className="step"><h3>Share your details</h3><p>We tell you exactly which drawings and information we need.</p></div>
            <div className="step"><h3>We get to work</h3><p>We stay with you from start to finish, on site and after handover.</p></div>
          </div>
        </div>
      </section>

      {/* TODO: add a Projects gallery here once photos and project names are available */}

      <CtaBand
        title="Have drawings ready?"
        text="Send us your project details and we’ll come back with a formwork proposal."
        to="/formworks/quote"
        label="Request a quote"
      />
    </>
  );
}
