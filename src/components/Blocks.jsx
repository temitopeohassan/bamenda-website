import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons.jsx';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Bamenda` : 'Bamenda';
  }, [title]);
}

const mediaIcons = { formworks: Icon.Crane, properties: Icon.Building, travels: Icon.Plane };

// Placeholder image block. Pass `src` once real photos are available.
export function Media({ kind = 'properties', src, alt = '', tall = false }) {
  const I = mediaIcons[kind] || Icon.Building;
  return (
    <div className={`media media--${kind} ${tall ? 'media--tall' : ''}`}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : <div className="media__icon"><I /></div>}
    </div>
  );
}

export function PageHero({ kind, eyebrow, title, children, crumbs = [] }) {
  return (
    <section className={`hero page-hero ${kind ? `page-hero--${kind}` : ''}`}>
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label}> / {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}</span>
            ))}
          </nav>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}

export function Feature({ icon: I, title, children }) {
  return (
    <div className="feature">
      <div className="feature__icon"><I /></div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function CtaBand({ title, text, to, label }) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <Link to={to} className="btn btn--primary">{label}</Link>
        </div>
      </div>
    </section>
  );
}
