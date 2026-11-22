'use client';
import React from 'react';
import './footer.css';

const WA = 'https://wa.me/6287783863777?text=';

const T = {
  en: { h1: 'Find the right formula today', h2: 'Explore the collection', cta: 'View products', best: 'Best sellers', explore: 'Explore', contact: 'Contact', home: 'Home', products: 'Products', about: 'About us', cookies: 'Cookie settings', rights: 'All rights reserved', privacy: 'Privacy policy', wa: 'Hello Humatindo, I would like a product sheet and recommendation.' },
  id: { h1: 'Temukan formula yang tepat hari ini', h2: 'Jelajahi koleksinya', cta: 'Lihat produk', best: 'Produk terlaris', explore: 'Jelajahi', contact: 'Kontak', home: 'Beranda', products: 'Produk', about: 'Tentang kami', cookies: 'Pengaturan cookie', rights: 'Hak cipta dilindungi', privacy: 'Kebijakan privasi', wa: 'Halo Humatindo, saya ingin lembar produk dan rekomendasinya.' },
};

/** Site-wide footer. props: lang ('en'|'id'), onCookies() opens the cookie preferences dialog. */
export default function Footer({ lang = 'en', onCookies }) {
  const t = T[lang === 'id' ? 'id' : 'en'];
  return (
    <footer id="contact" className="hf">
      <div className="hf-card">
        <div className="hf-top">
          <div>
            <p className="hf-h1">{t.h1}</p>
            <p className="hf-h2">{t.h2}</p>
          </div>
          <div className="hf-acts">
            <a className="hf-btn" href="/products">{t.cta}</a>
            <a className="hf-circ" href="/products" aria-label={t.products}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"></path></svg>
            </a>
          </div>
        </div>
        <div className="hf-grid">
          <div>
            <div className="hf-prods">
              <img src="/img/p-borohumic.webp" alt="BOROHUMIC" />
              <img src="/img/p-calsilik.webp" alt="CALSILIK" />
            </div>
            <p className="hf-best">{t.best}</p>
            <p className="hf-addr">Jl. Riau No. 18, Air Hitam, Payung Sekaki, Pekanbaru, Riau 28291</p>
          </div>
          <nav aria-label={t.explore}>
            <a className="hf-link" href="/">{t.home}<i></i></a>
            <a className="hf-link" href="/products">{t.products} <span className="hf-count">(11)</span><i></i></a>
            <a className="hf-link" href="/about">{t.about}<i></i></a>
            <a className="hf-link" href="#contact">{t.contact}<i></i></a>
          </nav>
          <nav aria-label={t.contact}>
            <a className="hf-link" href={WA + encodeURIComponent(t.wa)} target="_blank" rel="noopener">WhatsApp<i></i></a>
            <a className="hf-link" href="mailto:sales@humatindo.com">sales@humatindo.com<i></i></a>
            <a className="hf-link" href="tel:+6287783863777">+62 877 8386 3777<i></i></a>
            <button type="button" className="hf-link" onClick={onCookies}>{t.cookies}<i></i></button>
          </nav>
        </div>
        <p className="hf-word" aria-hidden="true">Humatindo<span>.</span></p>
        <div className="hf-legal">
          <span>© 2026 PT. Artha Prima Humatindo · {t.rights}</span>
          <span>ISO 9001 · SGS</span>
          <a href="#contact">{t.privacy}</a>
        </div>
      </div>
    </footer>
  );
}
