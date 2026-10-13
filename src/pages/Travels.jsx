import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons.jsx';
import { PageHero, Feature, Media, CtaBand, usePageTitle } from '../components/Blocks.jsx';

export default function Travels() {
  usePageTitle('Bamenda Travels: Tailored Educational & Leisure Trips');
  return (
    <>
      <PageHero
        kind="travels"
        eyebrow="Bamenda Travels"
        title="Trips designed around your goals, not a brochure."
        crumbs={[{ label: 'Travels' }]}
      >
        <p className="lead" style={{ color: 'rgba(255,255,255,.82)' }}>
          We don’t sell fixed packages. Tell us who’s travelling, where you’d like to go and what
          you want to get out of it, and we’ll design a trip around your dates and budget.
        </p>
        <div className="btn-row">
          <Link to="/travels/enquiry" className="btn btn--primary">Plan my trip</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">What we do</span>
            <h2>Educational, family and group travel, done properly.</h2>
            <p>
              Bamenda Travels organises curriculum-based educational tours for schools, holidays for
              families and trips for organisations, to destinations across the USA, Europe and beyond.
              Through our partner network we can also secure good rates on flights, hotels and
              experiences.
            </p>
            <ul className="checklist">
              <li><strong>Schools & student groups:</strong> learning-led tours with supervision built in</li>
              <li><strong>Families & individuals:</strong> holidays planned around your pace and interests</li>
              <li><strong>Organisations:</strong> retreats, incentive trips and conference travel</li>
            </ul>
            <Link to="/travels/enquiry" className="btn btn--dark">Start your travel enquiry</Link>
          </div>
          <Media kind="travels" tall />
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we can arrange</span>
            <h2>Everything handled, start to finish.</h2>
          </div>
          <div className="features">
            <Feature icon={Icon.Doc} title="Visa guidance">Document checklists, appointment booking support and interview preparation.</Feature>
            <Feature icon={Icon.Plane} title="Flights & transfers">Competitive fares, group bookings and airport pick-ups.</Feature>
            <Feature icon={Icon.Building} title="Accommodation">Hotels and student-friendly stays, matched to your budget.</Feature>
            <Feature icon={Icon.Book} title="Tours & experiences">Museums, campuses, landmarks and guided activities.</Feature>
            <Feature icon={Icon.Shield} title="Insurance & safety">Travel insurance and supervision plans for minors.</Feature>
            <Feature icon={Icon.Users} title="Group coordination">One point of contact for parents, schools and organisers.</Feature>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Your trip in four steps.</h2>
          </div>
          <div className="steps">
            <div className="step"><h3>Tell us your plans</h3><p>Share travellers, destinations, dates and budget in the enquiry form.</p></div>
            <div className="step"><h3>Get a tailored proposal</h3><p>We send an itinerary and cost breakdown built for you.</p></div>
            <div className="step"><h3>Refine and confirm</h3><p>Adjust anything you like, then confirm with flexible payment options.</p></div>
            <div className="step"><h3>Travel with support</h3><p>We handle bookings and stay reachable throughout your trip.</p></div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Where would you like to go?"
        text="Share a few details and we’ll design a trip around them."
        to="/travels/enquiry"
        label="Go to the enquiry form"
      />
    </>
  );
}
