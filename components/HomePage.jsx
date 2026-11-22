'use client';
/* eslint-disable */
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../lib/gsap-global';
import AdsHero from './AdsHero';


class HomePage extends React.Component {
  constructor(...a) {
    super(...a);
    this.state = { isAds: !!(this.props && this.props.initialAds), lang: 'en', navFloat: false, scrolly: false, ckOpen: false, ckPrefs: false, prefs: { analytics: false, marketing: false } };
    this.setRoot = (el) => { this.root = el; };
    this.setTrack = (el) => { this.track = el; };
  }

  componentDidMount() {
    this._alive = true;
    let lang = 'en', consent = null;
    try { lang = localStorage.getItem('hm_lang') === 'id' ? 'id' : 'en'; } catch (e) {}
    try { consent = JSON.parse(localStorage.getItem('hm_consent') || 'null'); } catch (e) {}
    this.setState({ lang, isAds: !!this.props.initialAds || this.detectAds(), ckOpen: !consent, prefs: { analytics: !!(consent && consent.analytics), marketing: !!(consent && consent.marketing) } }, () => this.bootMotion());
    setTimeout(() => this.bindNav(), 0);
    this.markImgs();
    this._imgTimer = setTimeout(() => { if (this.root) this.root.querySelectorAll('img.fade').forEach((im) => im.classList.add('is-loaded')); }, 2500);
  }

  componentDidUpdate(pp, ps) {
    this.markImgs();
    if (this.state.scrolly && ps.lang !== this.state.lang) requestAnimationFrame(() => this.buildMotion());
  }

  componentWillUnmount() { this._alive = false; clearTimeout(this._imgTimer); if (this._navSc && this._onNav) this._navSc.removeEventListener('scroll', this._onNav); if (this.ctx) this.ctx.revert(); }

  markImgs() { if (this.root) this.root.querySelectorAll('img.fade').forEach((im) => { if (im.complete && im.naturalWidth > 0) im.classList.add('is-loaded'); }); }

  detectAds() {
    try {
      const q = new URLSearchParams(window.location.search);
      const src = (q.get('utm_source') || '').toLowerCase();
      const med = (q.get('utm_medium') || '').toLowerCase();
      const hit = q.get('hero') === 'ads' || q.has('gclid') || q.has('gbraid') || q.has('wbraid') || q.has('gad_source') || (src.indexOf('google') > -1 && /^(cpc|ppc|paid|paidsearch|sem)$/.test(med));
      if (hit) { try { sessionStorage.setItem('hm_src', 'ads'); } catch (e) {} }
      let remembered = false;
      try { remembered = sessionStorage.getItem('hm_src') === 'ads'; } catch (e) {}
      return hit || remembered;
    } catch (e) { return false; }
  }

  findScroller() {
    let el = this.root && this.root.parentElement;
    while (el && el !== document.body && el !== document.documentElement) {
      const s = getComputedStyle(el);
      if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight + 20) return el;
      el = el.parentElement;
    }
    return window;
  }

  bindNav() {
    if (!this._alive) return;
    const sc = this.findScroller();
    this._navSc = sc;
    this._onNav = () => { const y = sc === window ? (window.scrollY || 0) : sc.scrollTop; const f = y > 40; if (f !== !!this.state.navFloat) this.setState({ navFloat: f }); };
    sc.addEventListener('scroll', this._onNav, { passive: true });
    this._onNav();
  }

  bootMotion() {
    let tries = 0;
    const go = () => {
      if (!this._alive) return;
      const g = window.gsap, ST = window.ScrollTrigger;
      if (!g || !ST) { if (tries++ < 40) setTimeout(go, 100); return; }
      let reduce = false;
      try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
      const sc = this.findScroller();
      const sh = sc === window ? document.documentElement.scrollHeight : sc.scrollHeight;
      const vh = sc === window ? window.innerHeight : sc.clientHeight;
      if (reduce || !(sh > vh * 1.3)) return;
      g.registerPlugin(ST);
      if (sc !== window) ST.defaults({ scroller: sc });
      this.setState({ scrolly: true }, () => requestAnimationFrame(() => this.buildMotion()));
    };
    go();
  }

  buildMotion() {
    const g = window.gsap, ST = window.ScrollTrigger;
    if (!g || !ST || !this.root) return;
    if (this.ctx) this.ctx.revert();
    const root = this.root;
    this.ctx = g.context(() => {
      const wrap = root.querySelector('.rv'), words = root.querySelectorAll('.rw');
      if (wrap && words.length) g.fromTo(words, { opacity: 0.12, y: 12, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'none', stagger: 0.12, duration: 0.6, scrollTrigger: { trigger: wrap, start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
      root.querySelectorAll('.gs-up').forEach((el) => g.from(el, { y: 48, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
    }, root);
    ST.refresh();
  }

  setLang(l) { try { localStorage.setItem('hm_lang', l); } catch (e) {} this.setState({ lang: l }); }

  saveConsent(p) {
    const c = { necessary: true, analytics: !!p.analytics, marketing: !!p.marketing, ts: new Date().toISOString(), v: 1 };
    try { localStorage.setItem('hm_consent', JSON.stringify(c)); } catch (e) {}
    this.setState({ ckOpen: false, ckPrefs: false, prefs: { analytics: c.analytics, marketing: c.marketing } });
  }

  products() {
    return [
      { n: 'KASIMULAN', img: '/img/p-kasimulan-hd.webp', line: 'premium', pack: '500 mL', fact: { en: 'Humic compounds ≥ 20%', id: 'Senyawa humat ≥ 20%' }, w: ['Amino', 'P', 'Zn · Cu · Fe · B'], crops: { en: 'Fruit, tuber & flower', id: 'Buah, umbi & bunga' } },
      { n: 'SILIKAMINO', img: '/img/p-silikamino-hd.webp', line: 'premium', pack: '500 mL', fact: { en: 'Humic compounds ≥ 23%', id: 'Senyawa humat ≥ 23%' }, w: ['Amino', 'Si(OH)₄', 'Cu · Zn'], crops: { en: 'Oil palm & palm family', id: 'Kelapa sawit & palma' } },
      { n: 'MICROHUMIC', img: '/img/p-microhumic-hd.webp', line: 'premium', pack: '500 mL', fact: { en: 'Available micronutrients', id: 'Mikronutrien tersedia' }, w: ['Amino', 'Fe · Mn', 'Zn · B'], crops: { en: 'Flowering & healthy leaf', id: 'Pembungaan & daun sehat' } },
      { n: 'CALSILIK', img: '/img/p-calsilik.webp', line: 'premium', pack: '500 mL', fact: { en: 'Humic compounds ≥ 23.47%', id: 'Senyawa humat ≥ 23,47%' }, w: ['Amino', 'Ca · B', 'Si'], crops: { en: 'Horticulture & cucurbits', id: 'Hortikultura & timun-timunan' } },
      { n: 'CALSHUMAT', img: '/img/p-calshumat.webp', line: 'advanced', pack: '500 mL', fact: { en: 'Potassium calcium humate', id: 'Kalium kalsium humat' }, w: ['Ca', 'K'], crops: { en: 'Fruit trees & legumes', id: 'Tanaman buah & kacang' } },
      { n: 'SAMHUMAT', img: '/img/p-samhumat-liquid.webp', line: 'advanced', pack: '500 mL', fact: { en: 'Humic compounds 22%', id: 'Senyawa humat 22%' }, w: ['Si', 'Ca', 'P'], crops: { en: 'Soil health, all crops', id: 'Kesehatan tanah, semua tanaman' } },
      { n: 'SILIKAMAT', img: '/img/p-silikamat.webp', line: 'advanced', pack: '500 mL', fact: { en: 'Potassium humate + Si', id: 'Kalium humat + Si' }, w: ['Si', 'B', 'P'], crops: { en: 'Rice, corn & sugarcane', id: 'Padi, jagung & tebu' } },
      { n: 'BOROHUMIC', img: '/img/p-borohumic.webp', line: 'advanced', pack: '500 mL', fact: { en: 'Borate potassium humate', id: 'Kalium humat borat' }, w: ['B', 'P'], crops: { en: 'Vegetables & fruit', id: 'Sayuran & buah' } },
      { n: 'AMINOMICC', img: '/img/p-aminomicc.webp', line: 'specialty', pack: '500 mL', fact: { en: 'Amino acids + copper', id: 'Asam amino + tembaga' }, w: ['Amino', 'Cu', 'Fulvic'], crops: { en: 'Fruit quality & flowering', id: 'Kualitas buah & bunga' } },
      { n: 'TERAHUMIC', img: '/img/p-terahumic.webp', line: 'specialty', pack: '500 mL', fact: { en: 'Liquid humic soil conditioner', id: 'Pembenah tanah humat cair' }, w: ['Si', 'Ca'], crops: { en: 'All crops', id: 'Semua tanaman' } },
      { n: 'SAMHUMAT BC', img: '/img/p-samhumat-bag.webp', line: 'specialty', pack: '10 kg', fact: { en: 'Powdered humate fertilizer', id: 'Pupuk humat tepung' }, w: ['Humic', 'Fulvic'], crops: { en: 'Blend with fertilizer', id: 'Campur dengan pupuk' } }
    ];
  }

  dict() {
    if (this._d) return this._d;
    this._d = {
      en: {
        nav: { aria: 'Main', home: 'Home', products: 'Products', about: 'About us', contact: 'Contact', cta: 'Request product sheet', lang: 'Language' },
        hero: { h: 'Leading Biostimulant and Organic Fertilizer', crops: ['Rice', 'Oil palm', 'Corn', 'Horticulture', 'Fruit'], cardT: 'Organic Fertilizer', cardB: 'SAMHUMAT Basic Compound · 10 kg', c1: 'Humic compounds extracted from Sumatran lignite, 100% soluble with no sediment.', c2: 'Enriched with amino complex and chelated micronutrients for healthy crops.', c3: 'Made in Pekanbaru, Riau and delivered across Indonesia.' },
        reveal: 'We are *Humatindo. We extract *humic compounds from *Sumatran *lignite and craft them into *biostimulants and *organic *fertilizers that keep Indonesian soil fertile and help crops grow *stronger.',
        col: { eyebrow: 'Product collection', h1: 'Biostimulant', h2: 'Collection', all: 'All formulas', prev: 'Previous products', next: 'Next products' },
        line: { premium: 'Premium', advanced: 'Advanced', specialty: 'Specialty' },
        feat: { l: 'Premium Biostimulant', c: 'Flowering & healthy leaf', r: 'Extracted in stages. 100% soluble. No sediment.', h1: 'Featured', h2: 'Product', cap: 'Micronutrients in humic and amino acids for glossier leaves and stronger flowering.', tag: 'Horticulture & plantation', cta: 'Request sheet' },
        nc: { all: 'All formulas', allB: 'Explore the full range of humic biostimulants and organic fertilizer.', story: 'We extract humic compounds from Sumatran lignite, chosen for a balanced 6:4 humic-to-fulvic ratio.', badge: '100% soluble', eyebrow: 'Our promise', h1: 'Healthier Soil,', h2: 'No Compromise', q: 'ISO 9001 quality, fair price' },
        bs: { eyebrow: 'Best seller', h1: 'Best', h2: 'Seller', sub: 'The formulas growers ask for most, for oil palm and for food crops.', p1: 'Palm family biostimulant', p2: 'Soil health biostimulant', photoAlt: 'Humatindo factory grounds in Pekanbaru, Riau', card: 'Not sure which one fits? Tell us your crop and its stage of growth and we will recommend a formula.' },
        ft: { h1: 'Find the right formula today', h2: 'Explore the collection', cta: 'View products', best: 'Best sellers', explore: 'Explore', cookies: 'Cookie settings', rights: 'All rights reserved', privacy: 'Privacy policy' },
        ck: { title: 'We value your privacy', body: 'We use necessary cookies to run this site. With your permission we also use analytics and advertising cookies, including Google Ads.', accept: 'Accept all', reject: 'Reject optional', manage: 'Manage preferences', save: 'Save choices', nec: 'Necessary', always: 'Always on', ana: 'Analytics', mkt: 'Marketing' },
        wa: 'Hello Humatindo, I would like a product sheet and recommendation.', waF: 'Hello Humatindo, I would like the product sheet for MICROHUMIC.'
      },
      id: {
        nav: { aria: 'Utama', home: 'Beranda', products: 'Produk', about: 'Tentang kami', contact: 'Kontak', cta: 'Minta lembar produk', lang: 'Bahasa' },
        hero: { h: 'Terdepan dalam Biostimulan dan Pupuk Organik', crops: ['Padi', 'Kelapa sawit', 'Jagung', 'Hortikultura', 'Buah'], cardT: 'Pupuk Organik', cardB: 'SAMHUMAT Basic Compound · 10 kg', c1: 'Senyawa humat dari lignit Sumatera, 100% larut tanpa endapan.', c2: 'Diperkaya amino kompleks dan mikronutrien terkhelat untuk tanaman sehat.', c3: 'Diproduksi di Pekanbaru, Riau dan dikirim ke seluruh Indonesia.' },
        reveal: 'Kami *Humatindo. Kami mengekstraksi senyawa *humat dari *lignit *Sumatera dan mengolahnya menjadi *biostimulan dan *pupuk *organik yang menjaga kesuburan tanah Indonesia dan membantu tanaman tumbuh lebih *kuat.',
        col: { eyebrow: 'Koleksi produk', h1: 'Koleksi', h2: 'Biostimulan', all: 'Semua formula', prev: 'Produk sebelumnya', next: 'Produk berikutnya' },
        line: { premium: 'Premium', advanced: 'Advanced', specialty: 'Spesialis' },
        feat: { l: 'Premium Biostimulan', c: 'Pembungaan & daun sehat', r: 'Diekstraksi bertahap. 100% larut. Tanpa endapan.', h1: 'Produk', h2: 'Unggulan', cap: 'Mikronutrien dalam asam humat dan amino untuk daun lebih mengkilap dan pembungaan lebih kuat.', tag: 'Hortikultura & perkebunan', cta: 'Minta lembar produk' },
        nc: { all: 'Semua formula', allB: 'Jelajahi rangkaian lengkap biostimulan humat dan pupuk organik.', story: 'Kami mengekstraksi senyawa humat dari lignit Sumatera dengan rasio humat dan fulvat seimbang 6:4.', badge: '100% larut', eyebrow: 'Janji kami', h1: 'Tanah Lebih Sehat,', h2: 'Tanpa Kompromi', q: 'Mutu ISO 9001, harga bersaing' },
        bs: { eyebrow: 'Terlaris', h1: 'Produk', h2: 'Terlaris', sub: 'Formula yang paling banyak dicari petani, untuk kelapa sawit dan tanaman pangan.', p1: 'Biostimulan famili palma', p2: 'Biostimulan kesehatan tanah', photoAlt: 'Area pabrik Humatindo di Pekanbaru, Riau', card: 'Belum yakin pilih yang mana? Ceritakan tanaman dan fase pertumbuhannya, kami rekomendasikan formulanya.' },
        ft: { h1: 'Temukan formula yang tepat hari ini', h2: 'Jelajahi koleksinya', cta: 'Lihat produk', best: 'Produk terlaris', explore: 'Jelajahi', cookies: 'Pengaturan cookie', rights: 'Hak cipta dilindungi', privacy: 'Kebijakan privasi' },
        ck: { title: 'Kami menghargai privasi Anda', body: 'Kami menggunakan cookie yang diperlukan agar situs berjalan. Dengan izin Anda, kami juga memakai cookie analitik dan iklan, termasuk Google Ads.', accept: 'Terima semua', reject: 'Tolak opsional', manage: 'Atur preferensi', save: 'Simpan pilihan', nec: 'Diperlukan', always: 'Selalu aktif', ana: 'Analitik', mkt: 'Pemasaran' },
        wa: 'Halo Humatindo, saya ingin lembar produk dan rekomendasinya.', waF: 'Halo Humatindo, saya ingin lembar produk MICROHUMIC.'
      }
    };
    return this._d;
  }

  renderVals() {
    const L = this.state.lang === 'id' ? 'id' : 'en';
    const t = this.dict()[L];
    if (!this._h) {
      const scroll = (d) => { if (this.track) this.track.scrollBy({ left: d * 318, behavior: 'smooth' }); };
      this._h = {
        setEn: () => this.setLang('en'), setId: () => this.setLang('id'),
        prev: () => scroll(-1), next: () => scroll(1),
        onImg: (ev) => { if (ev && ev.target && ev.target.classList) ev.target.classList.add('is-loaded'); },
        openCookies: () => this.setState({ ckOpen: true, ckPrefs: true }),
        openPrefs: () => this.setState({ ckPrefs: true }),
        acceptCk: () => this.saveConsent({ analytics: true, marketing: true }),
        rejectCk: () => this.saveConsent({ analytics: false, marketing: false }),
        saveCk: () => this.saveConsent(this.state.prefs),
        toggleAna: () => this.setState((s) => ({ prefs: Object.assign({}, s.prefs, { analytics: !s.prefs.analytics }) })),
        toggleMkt: () => this.setState((s) => ({ prefs: Object.assign({}, s.prefs, { marketing: !s.prefs.marketing }) }))
      };
    }
    const crops = t.hero.crops.map((l, i) => ({ l, cls: i === 0 ? 'pill on' : 'pill lg' }));
    const cards = this.products().map((p) => ({ name: p.n, img: p.img, pack: p.pack, line: t.line[p.line], fact: p.fact[L], with: p.w, crops: p.crops[L] }));
    const words = t.reveal.split(' ').map((w) => ({ w: w.charAt(0) === '*' ? w.slice(1) : w, cls: w.charAt(0) === '*' ? 'rw hl' : 'rw' }));
    const p = this.state.prefs;
    const wa = 'https://wa.me/6287783863777?text=';
    return Object.assign({}, this._h, {
      setRoot: this.setRoot, setTrack: this.setTrack,
      hdrCls: this.state.navFloat ? 'hdr float' : 'hdr', navCls: this.state.navFloat ? 'nav float lgl' : 'nav',
      t, cards, words, lang: L, isAds: !!this.state.isAds, showRegular: !this.state.isAds, cropsA: crops.slice(0, 3), cropsB: crops.slice(3),
      rvCls: this.state.scrolly ? 'rv scrolly' : 'rv',
      isEn: L === 'en', isId: L === 'id', thumbX: L === 'en' ? 0 : 40,
      segEn: L === 'en' ? 'seg on' : 'seg', segId: L === 'id' ? 'seg on' : 'seg',
      ckOpen: this.state.ckOpen, ckPrefs: this.state.ckPrefs, ckSimple: !this.state.ckPrefs, prefs: p,
      sw: { a: p.analytics ? '#30318C' : '#C9D1DB', ax: p.analytics ? 18 : 0, m: p.marketing ? '#30318C' : '#C9D1DB', mx: p.marketing ? 18 : 0 },
      waHref: wa + encodeURIComponent(t.wa), waFeat: wa + encodeURIComponent(t.waF)
    });
  }

  render() {
    const v = this.renderVals();
    return (<><div ref={v.setRoot} style={{position: "relative", minHeight: "100%", overflowX: "clip", background: "#F4F7FA"}}><Navbar lang={v.isId ? "id" : "en"} onLang={(l) => (l === "id" ? v.setId() : v.setEn())} active="home" />
<main style={{padding: "96px 20px 0"}}>{(v.showRegular) ? (<><h1 className="in" aria-label={`Humatindo — ${v.t.hero.h}`} style={{margin: "0", textAlign: "center", fontSize: "clamp(64px, 15.6vw, 232px)", lineHeight: ".82", letterSpacing: "-.045em", fontWeight: "800", color: "#06254F"}}>HUMATINDO</h1>
<section aria-label={v.t.hero.h} className="wrap in" style={{animationDelay: ".1s", position: "relative", marginTop: "22px", borderRadius: "32px", overflow: "hidden", minHeight: "660px", background: "#2b3a1c"}}><img className="fade" onLoad={v.onImg} src="/img/moss-blue-real.webp" alt="" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover"}} />
<div style={{position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,0) 30%, rgba(0,0,0,0) 65%, rgba(0,0,0,.45))"}}></div>
<div className="hgrid" style={{position: "relative", minHeight: "660px", padding: "24px", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gridTemplateRows: "auto 1fr auto", gap: "20px"}}><div style={{display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start"}}><div style={{display: "flex", gap: "6px", flexWrap: "wrap"}}>{(v.cropsA || []).map((c, c_i) => (<React.Fragment key={c_i}><span className={c.cls}>{c.l}</span>
</React.Fragment>))}
<span className="circ circ-g" style={{width: "34px", height: "34px"}} aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"></path>
</svg>
</span>
</div>
<div style={{display: "flex", gap: "6px", flexWrap: "wrap"}}>{(v.cropsB || []).map((c, c_i) => (<React.Fragment key={c_i}><span className={c.cls}>{c.l}</span>
</React.Fragment>))}
</div>
</div>
<div className="hide-md" style={{gridRow: "1 / span 3", gridColumn: "2", position: "relative", display: "flex", alignItems: "center", justifyContent: "center"}}><span className="drop" style={{width: "26px", height: "26px", left: "14%", top: "22%"}}></span>
<span className="drop" style={{width: "16px", height: "16px", right: "18%", top: "30%", animationDelay: "-3s"}}></span>
<span className="drop" style={{width: "34px", height: "34px", right: "8%", top: "62%", filter: "blur(2px)", animationDelay: "-5s"}}></span>
<div className="bob"><img src="/img/p-silikamino-hd.webp" alt="SILIKAMINO 500 mL" style={{height: "520px", width: "auto", display: "block", transform: "rotate(-10deg)", filter: "drop-shadow(0 40px 34px rgba(0,0,0,.55))"}} />
</div>
</div>
<a className="lg" href="/products" style={{gridColumn: "3", justifySelf: "end", width: "230px", borderRadius: "22px", padding: "14px", textDecoration: "none", color: "#fff"}}><p style={{margin: "0 0 10px", fontSize: "14px", fontWeight: "600"}}>{v.t.hero.cardT}</p>
<div className="tile" style={{height: "130px"}}><img className="bg" src="/img/moss-blue-real-sm.webp" alt="" />
<img className="bt" src="/img/p-samhumat-bag.webp" alt="SAMHUMAT Basic Compound 10 kg" style={{height: "118px", marginTop: "8px"}} />
</div>
<div style={{marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px"}}><span style={{fontSize: "12.5px"}}>{v.t.hero.cardB}</span>
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"></path>
</svg>
</div>
</a>
<div style={{gridColumn: "1", gridRow: "3", display: "flex", flexDirection: "column", gap: "18px"}}><div style={{display: "flex", gap: "10px"}}><div className="lg tile" style={{width: "86px", height: "104px", borderRadius: "16px", background: "rgba(255,255,255,.12)"}}><img className="bt" src="/img/p-calshumat.webp" alt="CALSHUMAT" style={{height: "92px", marginTop: "6px"}} />
</div>
<div className="lg tile" style={{width: "86px", height: "104px", borderRadius: "16px", background: "rgba(255,255,255,.12)"}}><img className="bt" src="/img/p-calsilik.webp" alt="CALSILIK" style={{height: "92px", marginTop: "6px"}} />
</div>
</div>
<p className="cap" style={{maxWidth: "280px"}}>{v.t.hero.c1}</p>
</div>
<div style={{gridColumn: "2", gridRow: "3", alignSelf: "end", display: "flex", justifyContent: "center"}}><p className="cap" style={{maxWidth: "260px"}}>{v.t.hero.c2}</p>
</div>
<div style={{gridColumn: "3", gridRow: "3", alignSelf: "end", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px"}}><div style={{display: "flex", gap: "8px", alignItems: "center"}}><a className="btn btn-p" href={v.waHref} target="_blank" rel="noopener">{v.t.nav.cta}</a>
<a className="circ circ-g" href="/products" aria-label={v.t.nav.products}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"></path>
</svg>
</a>
</div>
<p className="cap" style={{maxWidth: "280px", textAlign: "right"}}>{v.t.hero.c3}</p>
</div>
</div>
</section>
</>) : null}
{(v.isAds) ? (<><AdsHero lang={v.lang} />
</>) : null}
<section className={v.rvCls} aria-labelledby="rv-text"><div className="rv-in"><p id="rv-text" style={{margin: "0", maxWidth: "1120px", textAlign: "center", fontSize: "clamp(28px, 3.8vw, 56px)", lineHeight: "1.18", letterSpacing: "-.02em", fontWeight: "700", color: "#06254F"}}>{(v.words || []).map((w, w_i) => (<React.Fragment key={w_i}><span className={w.cls}>{w.w}</span>
</React.Fragment>))}
</p>
</div>
</section>
<section aria-labelledby="col-title" className="wrap" style={{padding: "20px 0 100px"}}><div style={{textAlign: "center"}}><span className="eyebrow"><i></i>{v.t.col.eyebrow}</span>
<h2 id="col-title" style={{margin: "18px 0 0", fontSize: "clamp(40px, 5vw, 74px)", lineHeight: "1.02", letterSpacing: "-.035em", fontWeight: "700", color: "#06254F"}}>{v.t.col.h1} <span className="acc">{v.t.col.h2}</span>
</h2>
<p style={{margin: "14px 0 0", fontSize: "15px", color: "#342C2A"}}>{v.t.col.all} <span className="tnum" style={{display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "26px", height: "26px", marginLeft: "6px", borderRadius: "999px", background: "#00A2EA", color: "#06254F", fontSize: "12.5px", fontWeight: "700"}}>11</span>
</p>
</div>
<div className="track" ref={v.setTrack} style={{marginTop: "40px"}} aria-label={v.t.col.eyebrow}>{(v.cards || []).map((p, p_i) => (<React.Fragment key={p_i}><a className="ccard" href="/products" style={{textDecoration: "none", color: "#342C2A"}}><p style={{margin: "0", fontSize: "17px", fontWeight: "700", color: "#06254F", letterSpacing: ".02em"}}>{p.name} <span style={{fontWeight: "500", fontSize: "13px", color: "#0070AC", letterSpacing: "0"}}>{p.line}</span>
</p>
<div style={{height: "230px", display: "flex", alignItems: "center", justifyContent: "center"}}><img className="cimg" src={p.img} alt={`${p.name} ${p.pack}`} loading="lazy" style={{height: "200px", width: "auto", filter: "drop-shadow(0 16px 14px rgba(6,37,79,.22))"}} />
</div>
<p style={{margin: "0", display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", fontWeight: "500", color: "#06254F"}}><span style={{width: "7px", height: "7px", borderRadius: "50%", background: "#00A2EA"}}></span>{p.fact}</p>
<div style={{marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(6,37,79,.08)", display: "flex", gap: "6px", flexWrap: "wrap"}}>{(p.with || []).map((w, w_i) => (<React.Fragment key={w_i}><span className="chip">{w}</span>
</React.Fragment>))}
</div>
<div style={{marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "12px"}}><span style={{fontSize: "12.5px", lineHeight: "1.45", color: "#57504D"}}>{p.crops}</span>
<span className="tnum" style={{fontSize: "15px", fontWeight: "700", color: "#06254F", whiteSpace: "nowrap"}}>{p.pack}</span>
</div>
</a>
</React.Fragment>))}
</div>
<div style={{display: "flex", justifyContent: "flex-end", gap: "10px"}}><button type="button" className="circ circ-l" aria-label={v.t.col.prev} onClick={v.prev}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"></path>
</svg>
</button>
<button type="button" className="circ circ-n" aria-label={v.t.col.next} onClick={v.next}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path>
</svg>
</button>
</div>
</section>
<section aria-labelledby="feat-title" className="wrap gs-up" style={{position: "relative", borderRadius: "32px", overflow: "hidden", minHeight: "640px", background: "#3a2a1e"}}><img className="fade" onLoad={v.onImg} src="/img/moss-warm.webp" alt="" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover"}} />
<div style={{position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.05) 35%, rgba(0,0,0,.05) 60%, rgba(0,0,0,.5))"}}></div>
<div className="fgrid" style={{position: "relative", minHeight: "640px", padding: "30px", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gridTemplateRows: "auto 1fr auto", color: "#fff"}}><p style={{margin: "0", fontSize: "19px", fontWeight: "600"}}>{v.t.feat.l}</p>
<p style={{margin: "0", textAlign: "center", fontSize: "19px", fontWeight: "600"}}>{v.t.feat.c}</p>
<p className="cap" style={{justifySelf: "end", maxWidth: "240px", textAlign: "right"}}>{v.t.feat.r}</p>
<div style={{gridColumn: "1 / span 3", position: "relative", display: "flex", alignItems: "center", justifyContent: "center"}}><div className="bob" style={{position: "absolute"}}><img src="/img/p-microhumic.webp" alt="MICROHUMIC 500 mL" style={{height: "440px", width: "auto", display: "block", transform: "rotate(8deg)", filter: "drop-shadow(0 40px 34px rgba(0,0,0,.6))"}} />
</div>
<h2 id="feat-title" style={{position: "relative", margin: "0", textAlign: "center", fontSize: "clamp(44px, 6.4vw, 96px)", lineHeight: "1", letterSpacing: "-.035em", fontWeight: "700", color: "#fff", textShadow: "0 6px 30px rgba(0,0,0,.35)"}}>{v.t.feat.h1} <span style={{color: "#6FD0FF"}}>{v.t.feat.h2}</span>
</h2>
</div>
<p className="cap" style={{alignSelf: "end", maxWidth: "280px"}}>{v.t.feat.cap}</p>
<p style={{alignSelf: "end", margin: "0", textAlign: "center", fontSize: "15px", fontWeight: "500"}}>MICROHUMIC · <span className="tnum">500 mL</span> · {v.t.feat.tag}</p>
<div style={{alignSelf: "end", justifySelf: "end", display: "flex", gap: "8px", alignItems: "center"}}><a className="btn btn-w" href={v.waFeat} target="_blank" rel="noopener">{v.t.feat.cta}</a>
<a className="circ circ-g" href="/products" aria-label={v.t.nav.products}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"></path>
</svg>
</a>
</div>
</div>
</section>
<section aria-labelledby="nc-title" className="wrap" style={{padding: "110px 0 100px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "0"}}><div className="gs-up" style={{padding: "0 40px 0 0", display: "flex", flexDirection: "column", gap: "60px", borderRight: "1px solid rgba(6,37,79,.1)"}}><div style={{display: "flex", gap: "12px"}}><div className="tile" style={{width: "110px", height: "130px"}}><img className="bg" src="/img/moss-warm-sm.webp" alt="" />
<img className="bt" src="/img/p-samhumat-liquid.webp" alt="SAMHUMAT" style={{height: "116px", marginTop: "8px"}} />
</div>
<div className="tile" style={{width: "110px", height: "130px"}}><img className="bg" src="/img/moss-blue-real-sm.webp" alt="" />
<img className="bt" src="/img/p-silikamat.webp" alt="SILIKAMAT" style={{height: "116px", marginTop: "8px"}} />
</div>
</div>
<div><p style={{margin: "0", fontSize: "26px", fontWeight: "600", color: "#06254F"}}>{v.t.nc.all} <span className="tnum" style={{color: "#0070AC"}}>(11)</span>
</p>
<p style={{margin: "8px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#57504D", maxWidth: "260px"}}>{v.t.nc.allB}</p>
</div>
<div><p style={{margin: "0", fontSize: "19px", lineHeight: "1.45", fontWeight: "500", color: "#06254F", maxWidth: "340px"}}>{v.t.nc.story}</p>
<span style={{display: "inline-flex", marginTop: "12px", height: "28px", padding: "0 12px", alignItems: "center", borderRadius: "999px", background: "#30318C", color: "#fff", fontSize: "12px", fontWeight: "600"}}>{v.t.nc.badge}</span>
</div>
</div>
<div className="gs-up" style={{padding: "0 0 0 48px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "48px"}}><div><span className="eyebrow"><i></i>{v.t.nc.eyebrow}</span>
<h2 id="nc-title" style={{margin: "18px 0 0", fontSize: "clamp(38px, 4.4vw, 64px)", lineHeight: "1.04", letterSpacing: "-.03em", fontWeight: "700", color: "#06254F"}}>{v.t.nc.h1}<br />
<span className="acc">{v.t.nc.h2}</span>
</h2>
</div>
<div style={{display: "flex", gap: "16px", flexWrap: "wrap"}}><a className="tile" href="/products" style={{width: "150px", height: "170px", display: "block"}}><img className="bg" src="/img/moss-warm-sm.webp" alt="" />
<img className="bt" src="/img/p-calshumat.webp" alt="CALSHUMAT" style={{height: "150px", marginTop: "10px"}} />
</a>
<a className="tile" href="/products" style={{width: "150px", height: "170px", display: "block"}}><img className="bg" src="/img/moss-blue-real-sm.webp" alt="" />
<img className="bt" src="/img/p-silikamino.webp" alt="SILIKAMINO" style={{height: "150px", marginTop: "10px"}} />
</a>
<a className="tile" href="/products" style={{width: "150px", height: "170px", display: "block"}}><img className="bg" src="/img/moss-warm-sm.webp" alt="" />
<img className="bt" src="/img/p-borohumic.webp" alt="BOROHUMIC" style={{height: "146px", marginTop: "12px"}} />
</a>
</div>
<div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px"}}><p style={{margin: "0", fontSize: "22px", fontWeight: "500", color: "#06254F"}}>{v.t.nc.q}</p>
<a className="circ circ-n" href="/products" aria-label={v.t.nav.products}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path>
</svg>
</a>
</div>
</div>
</section>
<section aria-labelledby="bs-title" className="wrap" style={{padding: "0 0 110px"}}><div className="gs-up" style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px"}}><div><span className="eyebrow"><i></i>{v.t.bs.eyebrow}</span>
<h2 id="bs-title" style={{margin: "16px 0 0", fontSize: "clamp(40px, 5vw, 74px)", lineHeight: "1", letterSpacing: "-.035em", fontWeight: "700", color: "#06254F"}}>{v.t.bs.h1} <span className="acc">{v.t.bs.h2}</span>
</h2>
</div>
<p style={{margin: "0", maxWidth: "360px", fontSize: "14.5px", lineHeight: "1.6", color: "#57504D"}}>{v.t.bs.sub}</p>
</div>
<div style={{marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "20px"}}><a className="gs-up" href="/products" style={{textDecoration: "none", color: "#06254F"}}><div className="tile" style={{height: "300px", display: "flex", alignItems: "flex-end"}}><img className="bg" src="/img/moss-blue-real-sm.webp" alt="" />
<img className="bt" src="/img/p-silikamino.webp" alt="SILIKAMINO 500 mL" style={{height: "260px", marginBottom: "20px"}} />
</div>
<div style={{display: "flex", justifyContent: "space-between", marginTop: "14px", fontWeight: "600"}}><span>SILIKAMINO</span>
<span className="tnum">500 mL</span>
</div>
<p style={{margin: "4px 0 0", fontSize: "13px", color: "#0070AC"}}>{v.t.bs.p1}</p>
</a>
<a className="gs-up" href="/products" style={{textDecoration: "none", color: "#06254F"}}><div className="tile" style={{height: "300px", display: "flex", alignItems: "flex-end"}}><img className="bg" src="/img/moss-warm-sm.webp" alt="" />
<img className="bt" src="/img/p-samhumat-liquid.webp" alt="SAMHUMAT 500 mL" style={{height: "260px", marginBottom: "20px"}} />
</div>
<div style={{display: "flex", justifyContent: "space-between", marginTop: "14px", fontWeight: "600"}}><span>SAMHUMAT</span>
<span className="tnum">500 mL</span>
</div>
<p style={{margin: "4px 0 0", fontSize: "13px", color: "#0070AC"}}>{v.t.bs.p2}</p>
</a>
<div className="gs-up" style={{gridColumn: "span 1", position: "relative", borderRadius: "26px", overflow: "hidden", minHeight: "360px", background: "#cbd9e3"}}><img src="/img/factory.webp" alt={v.t.bs.photoAlt} style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover"}} />
<div className="lgl" style={{position: "absolute", left: "16px", right: "16px", bottom: "16px", borderRadius: "20px", padding: "18px", textAlign: "center"}}><p style={{margin: "0", fontSize: "13.5px", lineHeight: "1.55", color: "#342C2A"}}>{v.t.bs.card}</p>
<a className="btn btn-p" href={v.waHref} target="_blank" rel="noopener" style={{marginTop: "14px", width: "100%", minHeight: "46px"}}>{v.t.nav.cta}</a>
</div>
</div>
</div>
</section>
</main>
<Footer lang={v.isId ? "id" : "en"} onCookies={v.openCookies} />
{(v.ckOpen) ? (<><div className="lgl in" role="dialog" aria-modal="false" aria-labelledby="ck-title" style={{position: "fixed", left: "20px", bottom: "20px", zIndex: "70", width: "min(420px, calc(100% - 40px))", borderRadius: "28px", padding: "24px", animationDelay: ".8s"}}><h2 id="ck-title" style={{margin: "0", fontSize: "17px", fontWeight: "600", color: "#06254F"}}>{v.t.ck.title}</h2>
<p style={{margin: "10px 0 0", fontSize: "14px", lineHeight: "1.6", color: "#342C2A"}}>{v.t.ck.body}</p>
{(v.ckPrefs) ? (<><ul style={{listStyle: "none", padding: "0", margin: "16px 0 0", display: "grid", gap: "14px"}}><li style={{display: "flex", gap: "14px", alignItems: "center", justifyContent: "space-between"}}><span style={{fontSize: "13.5px"}}><strong style={{color: "#06254F", fontWeight: "600"}}>{v.t.ck.nec}</strong>
</span>
<span style={{fontSize: "12.5px", fontWeight: "600", color: "#0070AC"}}>{v.t.ck.always}</span>
</li>
<li style={{display: "flex", gap: "14px", alignItems: "center", justifyContent: "space-between"}}><span style={{fontSize: "13.5px"}}><strong style={{color: "#06254F", fontWeight: "600"}}>{v.t.ck.ana}</strong>
</span>
<button type="button" role="switch" className="sw" aria-checked={v.prefs.analytics} aria-label={v.t.ck.ana} onClick={v.toggleAna} style={{background: v.sw.a}}><span style={{transform: `translateX(${v.sw.ax}px)`}}></span>
</button>
</li>
<li style={{display: "flex", gap: "14px", alignItems: "center", justifyContent: "space-between"}}><span style={{fontSize: "13.5px"}}><strong style={{color: "#06254F", fontWeight: "600"}}>{v.t.ck.mkt}</strong>
</span>
<button type="button" role="switch" className="sw" aria-checked={v.prefs.marketing} aria-label={v.t.ck.mkt} onClick={v.toggleMkt} style={{background: v.sw.m}}><span style={{transform: `translateX(${v.sw.mx}px)`}}></span>
</button>
</li>
</ul>
<div style={{marginTop: "18px", display: "flex", gap: "10px"}}><button type="button" className="btn btn-p" onClick={v.saveCk} style={{flex: "1"}}>{v.t.ck.save}</button>
<button type="button" className="btn btn-w" onClick={v.acceptCk} style={{flex: "1", boxShadow: "inset 0 0 0 1px rgba(6,37,79,.12)"}}>{v.t.ck.accept}</button>
</div>
</>) : null}
{(v.ckSimple) ? (<><div style={{marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap"}}><button type="button" className="btn btn-p" onClick={v.acceptCk} style={{flex: "1 1 auto"}}>{v.t.ck.accept}</button>
<button type="button" className="btn btn-w" onClick={v.rejectCk} style={{flex: "1 1 auto", boxShadow: "inset 0 0 0 1px rgba(6,37,79,.12)"}}>{v.t.ck.reject}</button>
<button type="button" onClick={v.openPrefs} style={{flex: "1 1 100%", minHeight: "40px", background: "none", border: "0", cursor: "pointer", font: "600 14px 'Noto Sans', sans-serif", color: "#30318C", textDecoration: "underline"}}>{v.t.ck.manage}</button>
</div>
</>) : null}
</div>
</>) : null}
</div>

</>);
  }
}

export default HomePage;
