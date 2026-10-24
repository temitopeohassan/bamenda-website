import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Hero.css';

// Featured division on load is ORDER[0]; the rest fill the left / right slots in order.
const ORDER = ['formwork', 'travels', 'properties'];

// Photos live in public/hero (Unsplash License). `focus` is the backdrop's
// object-position, so narrow screens keep the subject in frame.
const DIVISIONS = {
  formwork: {
    name: 'FORMWORK',
    title: 'Bamenda Formworks',
    image: '/hero/formwork.jpg', // Julia Taubitz, unsplash.com/photos/OKZRUxijthA
    thumb: '/hero/formwork-thumb.jpg',
    focus: '50% 60%',
    lede: [
      'Formwork systems, engineering support and site execution for residential, commercial',
      'and infrastructure projects. Tell us about your site and we’ll scope it with you.',
    ],
    to: '/formworks/quote',
  },
  travels: {
    name: 'TRAVELS',
    title: 'Bamenda Travels',
    image: '/hero/travels.jpg', // Ben (@bendp), unsplash.com/photos/UH7OPfi-gw8
    thumb: '/hero/travels-thumb.jpg',
    focus: '72% 45%',
    lede: [
      'Educational tours, family holidays and group trips, designed around your goals,',
      'dates and budget. Tell us where you’d like to go and we’ll plan the rest.',
    ],
    to: '/travels/enquiry',
  },
  properties: {
    name: 'PROPERTIES',
    title: 'Bamenda Properties',
    image: '/hero/properties.jpg', // Michael Brown, unsplash.com/photos/G48h926L2qo
    thumb: '/hero/properties-thumb.jpg',
    focus: '55% 50%',
    lede: [
      'Looking to rent, lease or buy? Tell us what you need and we’ll source the right',
      'property for you across Lagos, Abuja and beyond.',
    ],
    to: '/properties/enquiry',
  },
};

// The entrance sequence: index.html adds .anim to <html> before first paint;
// this adds .play once fonts are ready, then removes both.
function useEntrance() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('anim')) return undefined;
    let cancelled = false;
    let raf = 0;
    let done = 0;
    const start = () => {
      if (cancelled) return;
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => {
          if (cancelled) return;
          root.classList.add('play');
          done = setTimeout(() => root.classList.remove('anim', 'play'), 2150);
        });
      });
    };
    const guard = setTimeout(start, 500);
    const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fontsReady.then(() => {
      clearTimeout(guard);
      start();
    });
    return () => {
      cancelled = true;
      clearTimeout(guard);
      clearTimeout(done);
      cancelAnimationFrame(raf);
    };
  }, []);
}

function Nav() {
  const [open, setOpen] = useState(false);
  const rowRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      const links = rowRef.current?.querySelector('.links');
      if (!links?.contains(e.target) && !burgerRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navrow" ref={rowRef} data-open={open ? 'true' : 'false'}>
        <Link className="logo" to="/" aria-label="Bamenda home">
          <img src="/logo.jpg" alt="Bamenda FormWorks" width="1080" height="749" />
        </Link>
        <nav className="links" id="site-nav" aria-label="Main" onClick={(e) => e.target.closest('a') && close()}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/formworks">Formworks</NavLink>
          <NavLink to="/properties">Properties</NavLink>
          <NavLink to="/travels">Travels</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <Link className="enroll" to="/contact">Talk to us</Link>
        </nav>
        <button
          ref={burgerRef}
          className="burger"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

export default function Hero() {
  const [featured, setFeatured] = useState(ORDER[0]);
  const stageRef = useRef(null);
  useEntrance();

  const rest = ORDER.filter((k) => k !== featured);
  const slots = { l: rest[0], r: rest[1] };
  const current = DIVISIONS[featured];

  const show = (next) => {
    if (!DIVISIONS[next] || next === featured) return;
    setFeatured(next);
  };

  const scrollNext = () => {
    stageRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const slotButton = (side) => {
    const key = slots[side];
    return (
      <button
        className={`planet planet-${side}`}
        type="button"
        data-slot={side}
        data-planet={key}
        aria-label={`Show ${DIVISIONS[key].title}`}
        onClick={() => show(key)}
      >
        {/* All thumbnails stay mounted; switching toggles a class, never img.src. */}
        {ORDER.map((k) => (
          <img key={k} data-planet={k} alt="" src={DIVISIONS[k].thumb} className={k === key ? 'is-shown' : undefined} />
        ))}
      </button>
    );
  };

  return (
    <section className="sh" ref={stageRef} aria-label="Bamenda companies">
      {/* All backdrops stay mounted and crossfade on .is-active, so a switch never waits on a download. */}
      <div className="sky" aria-hidden="true">
        {ORDER.map((k, i) => (
          <img
            key={k}
            data-planet={k}
            className={k === featured ? 'is-active' : undefined}
            src={DIVISIONS[k].image}
            alt=""
            decoding="async"
            fetchpriority={i === 0 ? 'high' : 'low'}
            style={{ objectPosition: DIVISIONS[k].focus }}
          />
        ))}
      </div>

      <div className="ui">
        <Nav />
        <div className="copy">
          <div className="col eyebrow"><span className="ent-mask"><span className="ent-line">BAMENDA</span></span></div>
          <h1 className="col title" style={{ '--chars': current.name.length }}>
            <span className="ent-mask"><span className="ent-line">{current.name}</span></span>
          </h1>
          <div className="col rule"><span /></div>
          <p className="col lede">
            {current.lede[0]} <br />{current.lede[1]}
          </p>
          <div className="col cta">
            {slotButton('l')}
            {slotButton('r')}
            <Link to={current.to}>GET STARTED</Link>
            <span className="label label-l">{DIVISIONS[slots.l].name}</span>
            <span className="label label-r">{DIVISIONS[slots.r].name}</span>
          </div>
        </div>
      </div>

      <button className="scroll" type="button" aria-label="Scroll to next section" onClick={scrollNext}>
        <svg viewBox="0 0 26 33" fill="none" aria-hidden="true">
          <path
            d="M13 1.5 V31.5 M1.9 20.4 L13 31.5 L24.1 20.4"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </button>
    </section>
  );
}
