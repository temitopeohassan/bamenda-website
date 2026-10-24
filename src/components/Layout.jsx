import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { site, divisions, whatsappLink } from '../config/site.js';
import { Icon } from './Icons.jsx';

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Bamenda home">
      <img className="logo__img" src="/logo.jpg" alt="Bamenda FormWorks" width="1080" height="749" />
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="header">
      <div className="container header__inner">
        <Logo />
        <button
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
        <nav id="site-nav" className={`nav ${open ? 'open' : ''}`} aria-label="Main">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/formworks">Formworks</NavLink>
          <NavLink to="/properties">Properties</NavLink>
          <NavLink to="/travels">Travels</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <Link to="/contact" className="btn btn--dark">Talk to us</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="logo">
              <img className="logo__img logo__img--footer" src="/logo.jpg" alt="Bamenda FormWorks" width="1080" height="749" />
            </div>
            <p>{site.tagline}</p>
          </div>
          <div>
            <h4>Our companies</h4>
            <ul>
              {Object.values(divisions).map((d) => (
                <li key={d.key}><Link to={d.path}>{d.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Get started</h4>
            <ul>
              <li><Link to="/properties/enquiry">Find a property</Link></li>
              <li><Link to="/travels/enquiry">Plan a trip</Link></li>
              <li><Link to="/formworks/quote">Request a formwork quote</Link></li>
              <li><Link to="/about">About us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp us</a></li>
              <li>{site.address}</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {year} {site.name}. All rights reserved.</span>
          <span>{site.hours}</span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      {/* the home hero carries its own nav */}
      {pathname !== '/' && <Header />}
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <a
        className="wa-float"
        href={whatsappLink('Hello Bamenda, I would like to make an enquiry.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Bamenda on WhatsApp"
      >
        <Icon.WhatsApp />
      </a>
    </>
  );
}
