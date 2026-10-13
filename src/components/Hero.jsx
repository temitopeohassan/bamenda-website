import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Hero.css';

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/';

// Featured division on load is ORDER[0]; the rest fill the left / right slots in order.
const ORDER = ['formwork', 'travels', 'properties'];

const DIVISIONS = {
  formwork: {
    name: 'FORMWORK',
    title: 'Bamenda Formworks',
    clip: `${CDN}hf_20260827_202422_3ffb4889-c520-432d-8458-038009eb40df.mp4`,
    still: `${CDN}hf_20260827_202133_508c64b8-a31e-4290-bdfc-1187df70e0a6.png`,
    cutout: `${CDN}hf_20260827_202005_3346cc4d-ec3b-44ab-825c-b18e49f5021a.png`,
    lede: [
      'Formwork systems, engineering support and site execution for residential, commercial',
      'and infrastructure projects. Tell us about your site and we’ll scope it with you.',
    ],
    to: '/contact?division=formworks',
  },
  travels: {
    name: 'TRAVELS',
    title: 'Bamenda Travels',
    clip: `${CDN}hf_20260827_202422_b211cd74-013b-4dd3-bfd0-64491d8696fa.mp4`,
    still: `${CDN}hf_20260827_202133_cf55d1d8-7b59-4a64-80da-d72052ae974e.png`,
    cutout: `${CDN}hf_20260827_202012_640b239a-d08a-4200-adb2-741bbe129ac8.png`,
    lede: [
      'Educational tours, family holidays and group trips, designed around your goals,',
      'dates and budget. Tell us where you’d like to go and we’ll plan the rest.',
    ],
    to: '/travels/enquiry',
  },
  properties: {
    name: 'PROPERTIES',
    title: 'Bamenda Properties',
    clip: `${CDN}hf_20260827_202422_51eae59a-2459-4c84-907c-cc5edfe5fea7.mp4`,
    still: `${CDN}hf_20260827_202133_0ba6de7c-285d-43dc-b7ab-8c54c73707cb.png`,
    cutout: `${CDN}hf_20260827_202018_3d559490-f613-4ed7-a3bb-3b7e9fc90fb8.png`,
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
  const videos = useRef({});
  useEntrance();

  const rest = ORDER.filter((k) => k !== featured);
  const slots = { l: rest[0], r: rest[1] };
  const current = DIVISIONS[featured];

  // First-use fetch for a clip that only carries data-src.
  const warm = (key) => {
    const v = videos.current[key];
    if (v && !v.getAttribute('src') && v.dataset.src) {
      v.preload = 'auto';
      v.src = v.dataset.src;
      v.load();
    }
  };

  // Runs before paint so the clip swap lands in the same frame as the copy swap.
  useLayoutEffect(() => {
    ORDER.forEach((key) => {
      const v = videos.current[key];
      if (!v) return;
      if (key === featured) {
        if (!v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src;
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [featured]);

  // After first paint, pull the remaining clips down in idle time.
  useEffect(() => {
    const warmAll = () => ORDER.forEach(warm);
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(warmAll, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(warmAll, 2500);
    return () => clearTimeout(id);
  }, []);

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
        onPointerEnter={() => warm(key)}
        onFocus={() => warm(key)}
      >
        {/* All cut-outs stay mounted; switching toggles a class, never img.src. */}
        {ORDER.map((k) => (
          <img key={k} data-planet={k} alt="" src={DIVISIONS[k].cutout} className={k === key ? 'is-shown' : undefined} />
        ))}
      </button>
    );
  };

  return (
    <section className="sh" ref={stageRef} aria-label="Bamenda companies">
      <div className="sky" style={{ backgroundImage: `url(${current.still})` }}>
        {ORDER.map((k, i) => (
          <video
            key={k}
            ref={(el) => {
              if (el) {
                el.muted = true;
                el.setAttribute('muted', '');
              }
              videos.current[k] = el;
            }}
            data-planet={k}
            className={k === featured ? 'is-active' : undefined}
            autoPlay={i === 0}
            muted
            loop
            playsInline
            preload={i === 0 ? 'auto' : 'none'}
            src={i === 0 ? DIVISIONS[k].clip : undefined}
            data-src={DIVISIONS[k].clip}
            poster={DIVISIONS[k].still}
            aria-hidden="true"
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
