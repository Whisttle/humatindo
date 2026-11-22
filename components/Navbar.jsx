'use client';
import React from 'react';
import './navbar.css';

const WA = 'https://wa.me/6287783863777?text=';

const T = {
  en: { aria: 'Main', home: 'Home', products: 'Products', about: 'About us', contact: 'Contact', cta: 'Request product sheet', lang: 'Language', menu: 'Open menu', wa: 'Hello Humatindo, I would like a product sheet and recommendation.' },
  id: { aria: 'Utama', home: 'Beranda', products: 'Produk', about: 'Tentang kami', contact: 'Kontak', cta: 'Minta lembar produk', lang: 'Bahasa', menu: 'Buka menu', wa: 'Halo Humatindo, saya ingin lembar produk dan rekomendasi.' },
};

function findScroller(el) {
  let n = el && el.parentElement;
  while (n && n !== document.body && n !== document.documentElement) {
    const s = getComputedStyle(n);
    if (/(auto|scroll)/.test(s.overflowY) && n.scrollHeight > n.clientHeight + 20) return n;
    n = n.parentElement;
  }
  return window;
}

/**
 * Site-wide navbar.
 * props: lang ('en'|'id'), onLang(l), active ('home'|'products'|'about'), ctaHref (optional; defaults to WhatsApp)
 */
export default function Navbar({ lang = 'en', onLang, active, ctaHref }) {
  const t = T[lang === 'id' ? 'id' : 'en'];
  const [float, setFloat] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const sc = findScroller(ref.current);
    const on = () => {
      const y = sc === window ? (window.scrollY || document.documentElement.scrollTop || 0) : sc.scrollTop;
      setFloat(y > 40);
    };
    sc.addEventListener('scroll', on, { passive: true });
    on();
    return () => sc.removeEventListener('scroll', on);
  }, []);

  React.useEffect(() => { setMenu(false); }, [lang]);

  const href = ctaHref || WA + encodeURIComponent(t.wa);
  const ext = /^https?:/.test(href);
  const extProps = ext ? { target: '_blank', rel: 'noopener' } : {};
  const close = () => setMenu(false);
  const links = [
    { k: 'home', href: '/' },
    { k: 'products', href: '/products' },
    { k: 'about', href: '/about' },
    { k: 'contact', href: '#contact' },
  ];
  const link = (l, onClick) => (
    <a key={l.k} className={active === l.k ? 'hn-l on' : 'hn-l'} href={l.href} aria-current={active === l.k ? 'page' : undefined} onClick={onClick}>{t[l.k]}</a>
  );

  return (
    <header ref={ref} className={float ? 'hn-hdr float' : 'hn-hdr'}>
      <nav className={float ? 'hn-nav float' : 'hn-nav'} aria-label={t.aria}>
        <a className="hn-brand" href="/" aria-label="Humatindo — home">
          <img src="/img/logo-symbol.webp" alt="" />
          <span>HUMATINDO</span>
        </a>
        <div className="hn-links">{links.map((l) => link(l))}</div>
        <div className="hn-right">
          <div className="hn-lt" role="group" aria-label={t.lang}>
            <span className="hn-th" style={{ transform: `translateX(${lang === 'id' ? 40 : 0}px)` }}></span>
            <button type="button" className={lang !== 'id' ? 'hn-seg on' : 'hn-seg'} aria-pressed={lang !== 'id'} onClick={() => onLang && onLang('en')}>EN</button>
            <button type="button" className={lang === 'id' ? 'hn-seg on' : 'hn-seg'} aria-pressed={lang === 'id'} onClick={() => onLang && onLang('id')}>ID</button>
          </div>
          <a className="hn-cta" href={href} {...extProps}>{t.cta}</a>
          <button type="button" className="hn-burger" aria-label={t.menu} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>
          </button>
        </div>
      </nav>
      {menu ? (
        <div className="hn-menu">
          {links.map((l) => link(l, close))}
          <a className="hn-cta" href={href} onClick={close} {...extProps}>{t.cta}</a>
        </div>
      ) : null}
    </header>
  );
}
