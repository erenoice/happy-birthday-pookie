import { useState, useEffect, useRef } from 'react';
import content from './content.js';
import { getPhoto } from './loadPhotos.js';
import cssText from './styles.css?raw';

/* ---------- little helpers ---------------------------------------------- */

const CONFETTI_COLORS = ['#EE5A3A', '#F6B8C4', '#9EC9E2', '#F2B33D', '#8FA97E', '#7C5AA6'];
const TAPE_COLORS = ['rgba(158,201,226,.75)', 'rgba(246,184,196,.8)', 'rgba(242,179,61,.75)', 'rgba(143,169,126,.7)'];
const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* hand-rolled canvas confetti (no libraries needed) */
function useConfetti() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => p.life > 0);
      particles.current.forEach((p) => {
        p.vy += 0.16; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 1;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.life / p.max);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
        ctx.restore();
      });
      raf.current = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('resize', resize); };
  }, []);

  const fire = (x, y, count = 90) => {
    if (reduceMotion()) return;
    const cx = x ?? window.innerWidth / 2;
    const cy = y ?? window.innerHeight / 3;
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 4 + Math.random() * 7;
      const max = 55 + Math.random() * 45;
      particles.current.push({
        x: cx, y: cy,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 4,
        rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
        s: 6 + Math.random() * 8, color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        life: max, max,
      });
    }
  };

  return { canvasRef, fire };
}

/* reveal-on-scroll wrapper */
function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`}>{children}</div>;
}

/* a taped, tilted photo (shows a friendly placeholder until you add the file) */
function Photo({ file, caption, tape }) {
  const src = getPhoto(file);
  return (
    <figure className="photo" style={tape ? { '--tape-color': tape } : undefined}>
      <span className="tape" />
      {src ? (
        <img className="photo__img" src={src} alt={caption || ''} />
      ) : (
        <div className="photo__placeholder">
          <span className="big">📷</span>
          <span className="hint">
            drop <code>{file}</code>
            <br />into src/assets/photos/
          </span>
        </div>
      )}
      {caption && <figcaption className="photo__cap">{caption}</figcaption>}
    </figure>
  );
}

function Scallop({ band }) {
  return <div className="scallop" style={{ '--band': band }} />;
}

/* ---------- the interactive cake (signature moment) --------------------- */
function Cake({ count = 5, onAllOut }) {
  const [lit, setLit] = useState(() => Array(count).fill(true));
  const [smoking, setSmoking] = useState(() => Array(count).fill(false));
  const firedRef = useRef(false);
  const allOut = lit.every((l) => !l);

  useEffect(() => {
    if (allOut && !firedRef.current) { firedRef.current = true; onAllOut(); }
  }, [allOut, onAllOut]);

  const blow = (i) => {
    setLit((prev) => (prev[i] ? prev.map((l, idx) => (idx === i ? false : l)) : prev));
    setSmoking((prev) => prev.map((s, idx) => (idx === i ? true : s)));
  };

  const xs = Array.from({ length: count }, (_, i) => 90 + (i * 220) / (count - 1 || 1));

  return (
    <svg className="cake__svg" viewBox="0 0 400 300" role="img" aria-label="birthday cake, click the candles">
      {/* plate */}
      <ellipse cx="200" cy="262" rx="150" ry="18" fill="#e9d8c2" stroke="#3B2A2A" strokeWidth="3" />
      {/* cake body */}
      <rect x="80" y="176" width="240" height="80" rx="10" fill="#f6c8a8" stroke="#3B2A2A" strokeWidth="3" />
      <rect x="80" y="150" width="240" height="40" rx="12" fill="#fff1f3" stroke="#3B2A2A" strokeWidth="3" />
      {/* drips */}
      {[110, 150, 195, 240, 285].map((x, i) => (
        <path key={i} d={`M ${x} 176 q 8 24 16 0`} fill="#f7a1b4" stroke="#3B2A2A" strokeWidth="2" />
      ))}
      {/* sprinkles */}
      {[[120, 210], [170, 226], [220, 208], [270, 228], [200, 236], [150, 244]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="10" height="4" rx="2" fill={CONFETTI_COLORS[i % CONFETTI_COLORS.length]} transform={`rotate(${i * 33} ${x} ${y})`} />
      ))}
      {/* candles */}
      {xs.map((x, i) => (
        <g key={i}>
          <rect x={x - 6} y="108" width="12" height="46" rx="3" fill={CONFETTI_COLORS[i % CONFETTI_COLORS.length]} stroke="#3B2A2A" strokeWidth="2" />
          <line x1={x} y1="108" x2={x} y2="100" stroke="#3B2A2A" strokeWidth="2" />
          <g className={`candle-flame ${lit[i] ? 'lit' : 'out'}`}>
            <path d={`M ${x} 82 C ${x - 8} 92 ${x - 6} 104 ${x} 104 C ${x + 6} 104 ${x + 8} 92 ${x} 82 Z`} fill="#F2B33D" />
            <path d={`M ${x} 90 C ${x - 4} 96 ${x - 3} 103 ${x} 103 C ${x + 3} 103 ${x + 4} 96 ${x} 90 Z`} fill="#EE5A3A" />
          </g>
          <circle className={`smoke ${smoking[i] ? 'show' : ''}`} cx={x} cy="96" r="5" fill="#b9a9a0" />
          {/* big invisible hit area */}
          <rect x={x - 16} y="78" width="32" height="80" fill="transparent" style={{ cursor: 'pointer' }}
            onClick={() => blow(i)} tabIndex={0} role="button" aria-label={`blow out candle ${i + 1}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); blow(i); } }} />
        </g>
      ))}
    </svg>
  );
}

/* ---------- main app ---------------------------------------------------- */
export default function App() {
  const { canvasRef, fire } = useConfetti();
  const [wishOut, setWishOut] = useState(false);

  // welcome confetti on load
  useEffect(() => {
    const t1 = setTimeout(() => fire(window.innerWidth / 2, 140, 120), 500);
    const t2 = setTimeout(() => fire(window.innerWidth * 0.25, 180, 70), 900);
    const t3 = setTimeout(() => fire(window.innerWidth * 0.75, 180, 70), 1200);
    return () => { [t1, t2, t3].forEach(clearTimeout); };
  }, []);

  const c = content;
  const days = c.distance.reunionDate ? daysUntil(c.distance.reunionDate) : null;

  const finale = () => {
    fire(window.innerWidth / 2, window.innerHeight * 0.4, 140);
    setTimeout(() => fire(window.innerWidth * 0.2, window.innerHeight * 0.5, 90), 250);
    setTimeout(() => fire(window.innerWidth * 0.8, window.innerHeight * 0.5, 90), 450);
  };

  return (
    <div className="app">
      <style>{cssText}</style>
      <canvas ref={canvasRef} className="confetti-canvas" />

      {/* floating background bits */}
      <div className="floaties" aria-hidden="true">
        {['🎈', '💛', '✨', '🎂', '💫', '🎉', '🌟', '💌'].map((e, i) => (
          <span key={i} className="floaty"
            style={{ left: `${8 + i * 11}%`, fontSize: `${1.2 + (i % 3) * 0.5}rem`, animationDuration: `${16 + i * 3}s`, animationDelay: `${i * 1.4}s` }}>
            {e}
          </span>
        ))}
      </div>

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <span className="eyebrow">{c.hero.eyebrow}</span>
          <h1 className="hero__title">Happy Birthday,<br /><span className="name">{c.names.him}!</span></h1>
          <div style={{ margin: '14px 0' }}><span className="badge">★ {c.hero.badge} ★</span></div>
          <p className="hero__sub">{c.hero.subtitle}</p>
          {c.hero.photoFile && <div className="hero__photo"><Photo file={c.hero.photoFile} caption="" tape={TAPE_COLORS[0]} /></div>}
          <div className="scroll-cue">keep scrolling, there's more ↓</div>
        </div>
      </header>

      {/* LETTER */}
      <Scallop band="#fff7ee" />
      <section className="section letter">
        <div className="wrap">
          <Reveal>
            <div className="letter__card">
              <h2 style={{ fontSize: '1.9rem', marginBottom: '14px' }}>{c.letter.heading}</h2>
              {c.letter.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              <div className="letter__sign">{c.letter.signoff}<br />— {c.names.me}</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <Scallop band="#eef6fb" />
      <section className="section gallery">
        <div className="wrap">
          <Reveal>
            <h2 className="section-h">{c.gallery.heading}</h2>
            <p className="section-lead">{c.gallery.lead}</p>
          </Reveal>
          <div className="gallery__grid">
            {c.gallery.photos.map((ph, i) => (
              <Reveal key={i}><Photo file={ph.file} caption={ph.caption} tape={TAPE_COLORS[i % TAPE_COLORS.length]} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REASONS */}
      <Scallop band="#fdeff0" />
      <section className="section reasons">
        <div className="wrap">
          <Reveal>
            <h2 className="section-h">{c.reasons.heading}</h2>
            <p className="section-lead">{c.reasons.lead}</p>
          </Reveal>
          <div className="reasons__grid">
            {c.reasons.items.map((r, i) => (
              <Reveal key={i}>
                <div className="reason">
                  <div className="reason__num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="reason__txt">{r}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <Scallop band="#f2f7ee" />
      <section className="section timeline">
        <div className="wrap">
          <Reveal>
            <h2 className="section-h">{c.timeline.heading}</h2>
            <p className="section-lead">{c.timeline.lead}</p>
          </Reveal>
          <div className="tl">
            {c.timeline.items.map((it, i) => (
              <Reveal key={i}>
                <div className="tl__item">
                  <div className="tl__dot">{it.emoji}</div>
                  <div className="tl__date">{it.date}</div>
                  <div className="tl__title">{it.title}</div>
                  <div className="tl__text">{it.text}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAKE A WISH */}
      <Scallop band="#f4eefb" />
      <section className="section cake">
        <div className="wrap">
          <Reveal>
            <h2 className="section-h">{c.wish.heading}</h2>
            <div className="cake__stage">
              <div className="cake__hint">{c.wish.hint}</div>
              <Cake count={5} onAllOut={() => { setWishOut(true); fire(window.innerWidth / 2, window.innerHeight * 0.45, 130); }} />
              <div className={`cake__wish ${wishOut ? 'show' : ''}`}>
                <p>{c.wish.secret}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DISTANCE */}
      <Scallop band="#eaf5f4" />
      <section className="section distance">
        <div className="wrap">
          <Reveal>
            <h2 className="section-h">{c.distance.heading}</h2>
            <p className="section-lead">{c.distance.lead}</p>
            <div className="miles">
              <div className="pin"><div className="emoji">{c.distance.me.emoji}</div><div className="city">{c.distance.me.city}</div><div className="who">me</div></div>
              <div className="dots">· · · 💛 · · ·</div>
              <div className="pin"><div className="emoji">{c.distance.him.emoji}</div><div className="city">{c.distance.him.city}</div><div className="who">you</div></div>
            </div>
            <p className="section-lead" style={{ marginTop: '24px', marginBottom: 0 }}>{c.distance.note}</p>
            {days != null && days >= 0 && (
              <div className="countdown"><span className="big">{days}</span>{days === 1 ? 'day' : 'days'} until I get to see you</div>
            )}
          </Reveal>
        </div>
      </section>

      {/* CLOSING */}
      <Scallop band="#fdf3df" />
      <section className="section closing">
        <div className="wrap">
          <Reveal>
            <h2 className="closing__big">{c.closing.big}</h2>
            <button className="bday-btn" onClick={finale}>{c.closing.button} 🎉</button>
            <div className="closing__sign">{c.closing.signoff}<br />{c.names.me} 💛</div>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        made with 🧡 and too many browser tabs · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

/* days-until helper for the optional reunion countdown */
function daysUntil(dateStr) {
  try {
    const then = new Date(dateStr + 'T00:00:00');
    const now = new Date();
    return Math.ceil((then - now) / (1000 * 60 * 60 * 24));
  } catch { return null; }
}
