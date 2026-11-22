'use client';
/* eslint-disable */
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../lib/gsap-global';


class AboutPage extends React.Component {
  constructor(...a) {
    super(...a);
    this.state = { lang: 'en', menu: false, ckOpen: false, ckPrefs: false, prefs: { analytics: false, marketing: false } };
    this.setRoot = (el) => { this.root = el; };
  }

  componentDidMount() {
    this._alive = true;
    setTimeout(() => this.bindNav(), 0);
    let lang = 'en', consent = null;
    try { lang = localStorage.getItem('hm_lang') === 'id' ? 'id' : 'en'; } catch (e) {}
    try { consent = JSON.parse(localStorage.getItem('hm_consent') || 'null'); } catch (e) {}
    try { document.documentElement.lang = lang; } catch (e) {}
    this.setState({ lang, ckOpen: !consent, prefs: { analytics: !!(consent && consent.analytics), marketing: !!(consent && consent.marketing) } }, () => this.bootMotion());
    this.markImgs();
    this._imgTimer = setTimeout(() => { if (this.root) this.root.querySelectorAll('img.fade').forEach((im) => im.classList.add('is-loaded')); }, 2500);
  }

  componentDidUpdate() { this.markImgs(); }

  componentWillUnmount() { this._alive = false; if (this._navSc && this._onNav) this._navSc.removeEventListener('scroll', this._onNav); clearTimeout(this._imgTimer); if (this.ctx) this.ctx.revert(); }

  markImgs() {
    if (!this.root) return;
    this.root.querySelectorAll('img.fade').forEach((im) => { if (im.complete && im.naturalWidth > 0) im.classList.add('is-loaded'); });
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
      if (reduce || !(sh > vh * 1.3) || !this.root) return;
      g.registerPlugin(ST);
      if (sc !== window) ST.defaults({ scroller: sc });
      const root = this.root;
      this.ctx = g.context(() => {
        const img = root.querySelector('.px-img');
        if (img) g.fromTo(img, { scale: 1.14, yPercent: -4 }, { scale: 1, yPercent: 4, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
        root.querySelectorAll('.gs-up').forEach((el) => {
          g.from(el, { y: 48, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
        });
      }, root);
      ST.refresh();
    };
    go();
  }

  bindNav() {
    if (!this._alive) return;
    const sc = this.findNavScroller();
    this._navSc = sc;
    this._onNav = () => {
      const y = sc === window ? (window.scrollY || document.documentElement.scrollTop || 0) : sc.scrollTop;
      const f = y > 40;
      if (f !== !!this.state.navFloat) this.setState({ navFloat: f });
    };
    sc.addEventListener('scroll', this._onNav, { passive: true });
    this._onNav();
  }

  findNavScroller() {
    let el = this.root && this.root.parentElement;
    while (el && el !== document.body && el !== document.documentElement) {
      const s = getComputedStyle(el);
      if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight + 20) return el;
      el = el.parentElement;
    }
    return window;
  }

  setLang(l) {
    try { localStorage.setItem('hm_lang', l); } catch (e) {}
    try { document.documentElement.lang = l; } catch (e) {}
    this.setState({ lang: l, menu: false });
  }

  saveConsent(p) {
    const c = { necessary: true, analytics: !!p.analytics, marketing: !!p.marketing, ts: new Date().toISOString(), v: 1 };
    try { localStorage.setItem('hm_consent', JSON.stringify(c)); } catch (e) {}
    this.setState({ ckOpen: false, ckPrefs: false, prefs: { analytics: c.analytics, marketing: c.marketing } });
  }

  dict() {
    if (this._d) return this._d;
    this._d = {
      en: {
        nav: { aria: 'Main', home: 'Home', products: 'Products', about: 'About us', contact: 'Contact', cta: 'Request product sheet', menu: 'Open menu', lang: 'Language' },
        hero: { h1a: 'From Sumatran lignite', h1b: 'for world agriculture.', sub: 'PT. Artha Prima Humatindo develops and supplies biostimulants and organic fertilizers that help growers strengthen crops and improve yields.', photoAlt: 'Humatindo head office and factory grounds in Pekanbaru, Riau', capE: 'Head office & factory' },
        story: { h: 'Indonesia’s first private producer of the most complete range of potassium humate variants.', p1: 'PT. Artha Prima Humatindo was established in Pekanbaru, Riau in January 2016. From our base in Riau we serve markets across Indonesia, supported by dedicated marketing and logistics.', p2: 'We consistently collaborate on research and development with people working in agriculture. Beyond the domestic market we export to Malaysia, and are starting to expand to other countries.' },
        stats: [
          { v: '2016', u: '', l: 'Founded in Pekanbaru, Riau' },
          { v: '1,500,000', u: 'L', l: 'Liquid formulation capacity per year' },
          { v: '750', u: 't', l: 'Soluble powder capacity per year' },
          { v: '2,000', u: 't', l: 'Solid humin capacity per year' }
        ],
        why: { h: 'Heavy tropical rain washes nutrients out of the soil. Humic substances help hold them in.', photoAlt: 'Raw lignite from Sumatra', cap: 'Sumatran lignite, our raw material', steps: [
          { n: '01', h: 'The challenge', b: 'Year-round rain and sunshine speed up land degradation. Intensive monoculture lowers soil organic carbon, and heavy rain leaches potassium, sodium, calcium and magnesium.' },
          { n: '02', h: 'The answer', b: 'Humic substances (humic acid, fulvic acid and humin) act as soil conditioners that raise cation exchange capacity: a suitable, affordable technology for tropical land.' },
          { n: '03', h: 'Our source', b: 'Leonardite and lignite from Sumatra, formed by tropical weathering and high microbial activity, with a balanced 6:4 humic-to-fulvic acid content for a quick response through soil or leaf.' }
        ] },
        vm: { vLabel: 'Our vision', mLabel: 'Our mission', vision: 'To become a leading company in developing and providing high-quality, consistent, innovative and competitive biostimulant solutions that support sustainable agriculture in Indonesia.', missions: [
          { n: '01', h: 'Premium quality', b: 'Develop and produce premium-quality biostimulants with assured quality standards and competitive pricing for modern, efficient farming.' },
          { n: '02', h: 'Regenerative agriculture', b: 'Restore and improve soil health while reducing dependency on synthetic fertilizers, for healthier soil and higher productivity.' },
          { n: '03', h: 'Education & support', b: 'Empower customers with education and technical support on effective, efficient and environmentally responsible practices.' },
          { n: '04', h: 'Full compliance', b: 'Ensure every product and service complies with the regulations set by the relevant government authorities.' }
        ] },
        loc: { h: 'Certified quality, from Riau to Banten.', isoH: 'ISO 9001 system certification', isoB: 'Our quality management system is certified to ISO 9001 by SGS.', hqH: 'Head office & factory', brH: 'Branch warehouse', map: 'Open in Google Maps' },
        apri: { eyebrow: 'Coming soon on Google Play', b: 'A loyalty app for our growers and partners, with APRI as your guide.', f: [{ h: 'Integrated', b: 'All in one platform' }, { h: 'Efficient', b: 'Smart process, better result' }, { h: 'Connected', b: 'Stronger relationship, lasting impact' }], alt: 'APRI, the Humatindo character, waving' },
        footer: { brief: 'Long-term agricultural solutions that protect and restore farmland, and reduce reliance on synthetic fertilizers for more fertile soil and productive harvests.', explore: 'Explore', hq: 'Head office & factory', branch: 'Branch warehouse', contact: 'Contact', cert: 'ISO 9001 · SGS', rights: 'All rights reserved.', privacy: 'Privacy policy', cookies: 'Cookie settings' },
        ck: { title: 'We value your privacy', body: 'We use necessary cookies to run this site. With your permission we also use analytics and advertising cookies, including Google Ads, to understand visits and measure our campaigns.', accept: 'Accept all', reject: 'Reject optional', manage: 'Manage preferences', save: 'Save choices', nec: 'Necessary', necD: 'Security, language and consent settings.', always: 'Always on', ana: 'Analytics', anaD: 'Anonymous visit statistics.', mkt: 'Marketing', mktD: 'Google Ads conversion and remarketing.' },
        wa: 'Hello Humatindo, I would like to request a product sheet.'
      },
      id: {
        nav: { aria: 'Utama', home: 'Beranda', products: 'Produk', about: 'Tentang kami', contact: 'Kontak', cta: 'Minta lembar produk', menu: 'Buka menu', lang: 'Bahasa' },
        hero: { h1a: 'Dari lignit Sumatera', h1b: 'untuk pertanian dunia.', sub: 'PT. Artha Prima Humatindo mengembangkan dan memasok biostimulan dan pupuk organik yang membantu petani memperkuat tanaman dan meningkatkan hasil panen.', photoAlt: 'Kantor pusat dan area pabrik Humatindo di Pekanbaru, Riau', capE: 'Kantor pusat & pabrik' },
        story: { h: 'Perusahaan swasta pertama di Indonesia yang memproduksi varian kalium humat terlengkap.', p1: 'PT. Artha Prima Humatindo didirikan di Pekanbaru, Riau pada Januari 2016. Berbasis di Riau, kami melayani pasar di berbagai wilayah Indonesia dengan dukungan sarana pemasaran dan logistik.', p2: 'Kami konsisten melakukan kerja sama penelitian dan pengembangan dengan para pelaku pertanian. Selain pasar domestik, kami juga mengekspor ke Malaysia dan mulai berkembang ke negara lain.' },
        stats: [
          { v: '2016', u: '', l: 'Didirikan di Pekanbaru, Riau' },
          { v: '1.500.000', u: 'L', l: 'Kapasitas formulasi cair per tahun' },
          { v: '750', u: 't', l: 'Kapasitas tepung larut per tahun' },
          { v: '2.000', u: 't', l: 'Kapasitas humin padat per tahun' }
        ],
        why: { h: 'Hujan tropis yang tinggi mencuci hara dari tanah. Senyawa humat membantu menahannya.', photoAlt: 'Lignit mentah dari Sumatera', cap: 'Lignit Sumatera, bahan baku kami', steps: [
          { n: '01', h: 'Tantangannya', b: 'Hujan dan sinar matahari sepanjang tahun mempercepat degradasi lahan. Monokultur intensif menurunkan C-organik tanah, dan curah hujan tinggi mencuci kalium, natrium, kalsium, dan magnesium.' },
          { n: '02', h: 'Solusinya', b: 'Senyawa humat (asam humat, asam fulvat, dan humin) berperan sebagai pembenah tanah yang meningkatkan kapasitas tukar kation: teknologi yang cocok dan terjangkau untuk lahan tropis.' },
          { n: '03', h: 'Sumber kami', b: 'Leonardit dan lignit dari Sumatera, terbentuk dari pelapukan iklim tropis dan aktivitas mikrob tinggi, dengan kandungan asam humat dan fulvat seimbang (6:4) yang cepat direspons tanaman lewat tanah maupun daun.' }
        ] },
        vm: { vLabel: 'Visi kami', mLabel: 'Misi kami', vision: 'Menjadi perusahaan terdepan dalam pengembangan dan penyediaan varian biostimulan berkualitas tinggi yang konsisten, inovatif, dan berdaya saing, untuk mendukung terwujudnya pertanian berkelanjutan di Indonesia.', missions: [
          { n: '01', h: 'Kualitas premium', b: 'Menghasilkan produk biostimulan berkualitas premium dengan standar mutu terjamin dan harga kompetitif untuk praktik pertanian modern.' },
          { n: '02', h: 'Pertanian regeneratif', b: 'Memulihkan dan memperbaiki kualitas tanah serta menurunkan ketergantungan pada pupuk sintetis demi kesuburan lahan dan produktivitas yang lebih tinggi.' },
          { n: '03', h: 'Edukasi & pendampingan', b: 'Memberdayakan pelanggan melalui edukasi dan dukungan teknis tentang praktik pertanian yang efektif, efisien, dan ramah lingkungan.' },
          { n: '04', h: 'Kepatuhan penuh', b: 'Memastikan seluruh produk dan layanan sesuai regulasi yang ditetapkan instansi pemerintah terkait.' }
        ] },
        loc: { h: 'Mutu tersertifikasi, dari Riau hingga Banten.', isoH: 'Sertifikasi sistem ISO 9001', isoB: 'Sistem manajemen mutu kami tersertifikasi ISO 9001 oleh SGS.', hqH: 'Kantor pusat & pabrik', brH: 'Gudang cabang', map: 'Buka di Google Maps' },
        apri: { eyebrow: 'Segera hadir di Google Play', b: 'Aplikasi loyalitas untuk petani dan mitra kami, bersama APRI sebagai pemandu Anda.', f: [{ h: 'Terintegrasi', b: 'Semua dalam satu platform' }, { h: 'Efisien', b: 'Proses cerdas, hasil lebih baik' }, { h: 'Terhubung', b: 'Hubungan lebih erat, dampak berkelanjutan' }], alt: 'APRI, karakter Humatindo, melambaikan tangan' },
        footer: { brief: 'Solusi pertanian jangka panjang untuk menjaga dan memperbaiki kualitas lahan, serta menurunkan pemakaian pupuk sintetis demi kesuburan tanah dan produktivitas panen.', explore: 'Jelajahi', hq: 'Kantor pusat & pabrik', branch: 'Gudang cabang', contact: 'Kontak', cert: 'ISO 9001 · SGS', rights: 'Hak cipta dilindungi.', privacy: 'Kebijakan privasi', cookies: 'Pengaturan cookie' },
        ck: { title: 'Kami menghargai privasi Anda', body: 'Kami menggunakan cookie yang diperlukan agar situs ini berjalan. Dengan izin Anda, kami juga menggunakan cookie analitik dan iklan, termasuk Google Ads, untuk memahami kunjungan dan mengukur kampanye kami.', accept: 'Terima semua', reject: 'Tolak opsional', manage: 'Atur preferensi', save: 'Simpan pilihan', nec: 'Diperlukan', necD: 'Keamanan, bahasa, dan pengaturan persetujuan.', always: 'Selalu aktif', ana: 'Analitik', anaD: 'Statistik kunjungan anonim.', mkt: 'Pemasaran', mktD: 'Konversi dan remarketing Google Ads.' },
        wa: 'Halo Humatindo, saya ingin meminta lembar produk.'
      }
    };
    return this._d;
  }

  renderVals() {
    const L = this.state.lang === 'id' ? 'id' : 'en';
    const t = this.dict()[L];
    if (!this._h) {
      this._h = {
        setEn: () => this.setLang('en'), setId: () => this.setLang('id'),
        toggleMenu: () => this.setState((s) => ({ menu: !s.menu })), closeMenu: () => this.setState({ menu: false }),
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
    const p = this.state.prefs;
    return Object.assign({}, this._h, {
      setRoot: this.setRoot, hdrCls: this.state.navFloat ? 'hdr float' : 'hdr', navCls: this.state.navFloat ? 'nav float lg' : 'nav',
      t,
      isEn: L === 'en', isId: L === 'id', thumbX: L === 'en' ? 0 : 40,
      segEn: L === 'en' ? 'seg on' : 'seg', segId: L === 'id' ? 'seg on' : 'seg',
      menu: this.state.menu,
      ckOpen: this.state.ckOpen, ckPrefs: this.state.ckPrefs, ckSimple: !this.state.ckPrefs,
      prefs: p,
      sw: { a: p.analytics ? '#30318C' : '#C9D1DB', ax: p.analytics ? 18 : 0, m: p.marketing ? '#30318C' : '#C9D1DB', mx: p.marketing ? 18 : 0 },
      waHref: 'https://wa.me/6287783863777?text=' + encodeURIComponent(t.wa)
    });
  }

  render() {
    const v = this.renderVals();
    return (<><div ref={v.setRoot} style={{position: "relative", minHeight: "100%", overflowX: "clip", background: "#F4F7FA"}}><Navbar lang={v.isId ? "id" : "en"} onLang={(l) => (l === "id" ? v.setId() : v.setEn())} active="about" />
<main><section aria-labelledby="ab-title" style={{padding: "160px 24px 40px"}}><div className="wrap"><div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "32px", alignItems: "end"}}><h1 id="ab-title" className="h1 in">{v.t.hero.h1a} <span className="acc">{v.t.hero.h1b}</span>
</h1>
<p className="lead in" style={{animationDelay: ".1s", maxWidth: "500px", justifySelf: "end"}}>{v.t.hero.sub}</p>
</div>
<figure className="in" style={{animationDelay: ".2s", position: "relative", margin: "52px 0 0", height: "clamp(380px, 46vw, 640px)", borderRadius: "36px", overflow: "hidden", background: "#CBD9E3"}}><img className="fade px-img" onLoad={v.onImg} src="/img/factory.webp" alt={v.t.hero.photoAlt} style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%"}} />
<figcaption className="lg" style={{position: "absolute", left: "20px", bottom: "20px", borderRadius: "22px", padding: "14px 20px", maxWidth: "calc(100% - 40px)"}}><span style={{display: "block", fontSize: "13px", fontWeight: "500", color: "#342C2A"}}>{v.t.hero.capE}</span>
<span style={{display: "block", marginTop: "2px", fontSize: "17px", fontWeight: "600", color: "#06254F"}}>Pekanbaru, Riau</span>
</figcaption>
</figure>
</div>
</section>
<section aria-labelledby="story-title" style={{padding: "100px 24px 120px"}}><div className="wrap"><div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: "48px"}}><h2 id="story-title" className="h2 gs-up">{v.t.story.h}</h2>
<div className="gs-up"><p className="lead" style={{fontSize: "17px", lineHeight: "1.7"}}>{v.t.story.p1}</p>
<p className="lead" style={{fontSize: "17px", lineHeight: "1.7", marginTop: "18px"}}>{v.t.story.p2}</p>
</div>
</div>
<dl style={{margin: "80px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "40px 32px"}}>{(v.t.stats || []).map((s, s_i) => (<React.Fragment key={s_i}><div className="gs-up"><dt className="tnum" style={{fontSize: "clamp(34px, 3.4vw, 50px)", fontWeight: "600", letterSpacing: "-.025em", lineHeight: "1", color: "#06254F"}}>{s.v}<span style={{fontSize: ".5em", marginLeft: "6px", color: "#0070AC"}}>{s.u}</span>
</dt>
<dd style={{margin: "12px 0 0", fontSize: "14.5px", lineHeight: "1.45", color: "#57504D"}}>{s.l}</dd>
</div>
</React.Fragment>))}
</dl>
</div>
</section>
<section aria-labelledby="why-title" style={{padding: "0 24px 130px"}}><div className="wrap"><h2 id="why-title" className="h2 gs-up" style={{maxWidth: "760px"}}>{v.t.why.h}</h2>
<div style={{marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: "28px", alignItems: "stretch"}}><figure className="gs-up" style={{position: "relative", margin: "0", minHeight: "520px", borderRadius: "28px", overflow: "hidden", background: "#6B5A4A"}}><img className="fade" onLoad={v.onImg} src="/img/lignite.webp" alt={v.t.why.photoAlt} style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 70%", transform: "scale(1.35)", transformOrigin: "50% 80%"}} />
<figcaption className="lg" style={{position: "absolute", left: "18px", bottom: "18px", borderRadius: "20px", padding: "12px 18px", fontSize: "14px", fontWeight: "600", color: "#06254F"}}>{v.t.why.cap}</figcaption>
</figure>
<ol style={{listStyle: "none", padding: "0", margin: "0", display: "grid", gap: "18px"}}>{(v.t.why.steps || []).map((st, st_i) => (<React.Fragment key={st_i}><li className="card gs-up" style={{padding: "28px 30px"}}><div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px"}}><h3 className="h3" style={{fontSize: "22px"}}>{st.h}</h3>
<span className="tnum" style={{fontSize: "34px", fontWeight: "400", color: "#0070AC", lineHeight: "1"}}>{st.n}</span>
</div>
<p className="p" style={{marginTop: "10px"}}>{st.b}</p>
</li>
</React.Fragment>))}
</ol>
</div>
</div>
</section>
<section aria-labelledby="vm-title" style={{padding: "0 24px 130px"}}><div className="wrap"><p className="label gs-up">{v.t.vm.vLabel}</p>
<h2 id="vm-title" className="gs-up" style={{margin: "16px 0 0", maxWidth: "1040px", fontSize: "clamp(26px, 2.8vw, 40px)", lineHeight: "1.3", letterSpacing: "-.015em", fontWeight: "600", color: "#06254F"}}>{v.t.vm.vision}</h2>
<p className="label gs-up" style={{marginTop: "72px"}}>{v.t.vm.mLabel}</p>
<ol style={{listStyle: "none", padding: "0", margin: "20px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "40px 36px"}}>{(v.t.vm.missions || []).map((mi, mi_i) => (<React.Fragment key={mi_i}><li className="gs-up"><span className="tnum" style={{fontSize: "15px", fontWeight: "600", color: "#0070AC"}}>{mi.n}</span>
<h3 className="h3" style={{marginTop: "12px"}}>{mi.h}</h3>
<p className="p" style={{marginTop: "10px", fontSize: "15px"}}>{mi.b}</p>
</li>
</React.Fragment>))}
</ol>
</div>
</section>
<section aria-labelledby="loc-title" style={{padding: "0 24px 130px"}}><div className="wrap"><h2 id="loc-title" className="h2 gs-up" style={{maxWidth: "720px"}}>{v.t.loc.h}</h2>
<div style={{marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "44px 36px"}}><div className="gs-up"><img src="/img/iso-sgs.webp" alt="SGS ISO 9001 system certification" style={{width: "72px", height: "72px", objectFit: "contain", display: "block"}} />
<h3 className="h3" style={{marginTop: "20px"}}>{v.t.loc.isoH}</h3>
<p className="p" style={{marginTop: "10px", fontSize: "15px"}}>{v.t.loc.isoB}</p>
</div>
<div className="gs-up"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{margin: "16px 0"}}><path d="M3 21V10l6-4v4l6-4v4l6-4v15z"></path>
<path d="M7 21v-4h3v4M14 15h3"></path>
</svg>
<h3 className="h3" style={{marginTop: "16px"}}>{v.t.loc.hqH}</h3>
<p className="p" style={{marginTop: "10px", fontSize: "15px"}}>Jl. Riau No. 18, Kel. Air Hitam, Kec. Payung Sekaki, Pekanbaru, Riau 28291</p>
<a className="link" href="https://www.google.com/maps/search/?api=1&query=Jl.%20Riau%20No.%2018%20Air%20Hitam%20Payung%20Sekaki%20Pekanbaru" target="_blank" rel="noopener" style={{marginTop: "14px"}}>{v.t.loc.map}<svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path>
</svg>
</a>
</div>
<div className="gs-up"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{margin: "16px 0"}}><path d="M3 10l9-6 9 6v11H3z"></path>
<path d="M7 21v-7h10v7M7 17h10"></path>
</svg>
<h3 className="h3" style={{marginTop: "16px"}}>{v.t.loc.brH}</h3>
<p className="p" style={{marginTop: "10px", fontSize: "15px"}}>Kawasan Pergudangan dan Industri Tunas Bitung, Jl. Raya Serang KM 13 C2/7, Sukadamai, Kab. Tangerang, Banten 15710</p>
<a className="link" href="https://www.google.com/maps/search/?api=1&query=Kawasan%20Pergudangan%20Tunas%20Bitung%20Jl.%20Raya%20Serang%20KM%2013%20Tangerang" target="_blank" rel="noopener" style={{marginTop: "14px"}}>{v.t.loc.map}<svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path>
</svg>
</a>
</div>
</div>
</div>
</section>
<section aria-labelledby="apri-title" style={{padding: "0 24px 100px"}}><div className="wrap gs-up" style={{position: "relative", borderRadius: "36px", overflow: "hidden", background: "radial-gradient(70% 90% at 80% 30%, #CDEBFA 0%, #E6F1F8 45%, #EEF3F7 100%)"}}><div style={{position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "24px", alignItems: "end", padding: "clamp(28px, 4vw, 60px) clamp(28px, 4vw, 60px) 0"}}><div style={{paddingBottom: "clamp(28px, 4vw, 60px)"}}><p className="label">{v.t.apri.eyebrow}</p>
<h2 id="apri-title" className="h2" style={{marginTop: "12px"}}>APRI <span className="acc">Humatindo Loyalty</span>
</h2>
<p className="lead" style={{marginTop: "14px", fontSize: "17px", maxWidth: "460px"}}>{v.t.apri.b}</p>
<ul style={{listStyle: "none", padding: "0", margin: "28px 0 0", display: "grid", gap: "14px"}}>{(v.t.apri.f || []).map((ft, ft_i) => (<React.Fragment key={ft_i}><li style={{display: "flex", gap: "12px", alignItems: "baseline", fontSize: "15.5px", lineHeight: "1.45"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flex: "none", transform: "translateY(3px)"}}><path d="M5 12.5l4.5 4.5L19 7.5"></path>
</svg>
<span><strong style={{color: "#06254F", fontWeight: "600"}}>{ft.h}</strong>
<span style={{color: "#57504D"}}> · {ft.b}</span>
</span>
</li>
</React.Fragment>))}
</ul>
</div>
<div style={{display: "flex", justifyContent: "center", alignItems: "flex-end"}}><img className="fade float" onLoad={v.onImg} src="/img/apri-hi.webp" alt={v.t.apri.alt} style={{height: "440px", width: "auto", display: "block"}} />
</div>
</div>
</div>
</section>
</main>
<Footer lang={v.isId ? "id" : "en"} onCookies={v.openCookies} />
{(v.ckOpen) ? (<><div className="lg in" role="dialog" aria-modal="false" aria-labelledby="ck-title" style={{position: "fixed", left: "20px", bottom: "20px", zIndex: "70", width: "min(420px, calc(100% - 40px))", borderRadius: "28px", padding: "24px", animationDelay: ".8s"}}><h2 id="ck-title" style={{margin: "0", fontSize: "17px", fontWeight: "600", color: "#06254F"}}>{v.t.ck.title}</h2>
<p style={{margin: "10px 0 0", fontSize: "14px", lineHeight: "1.6", color: "#342C2A"}}>{v.t.ck.body}</p>
{(v.ckPrefs) ? (<><ul style={{listStyle: "none", padding: "0", margin: "16px 0 0", display: "grid", gap: "14px"}}><li style={{display: "flex", gap: "14px", alignItems: "center", justifyContent: "space-between"}}><span style={{fontSize: "13.5px", lineHeight: "1.45"}}><strong style={{color: "#06254F", fontWeight: "600"}}>{v.t.ck.nec}</strong>
<br />
<span style={{color: "#57504D"}}>{v.t.ck.necD}</span>
</span>
<span style={{fontSize: "12.5px", fontWeight: "600", color: "#0070AC", whiteSpace: "nowrap"}}>{v.t.ck.always}</span>
</li>
<li style={{display: "flex", gap: "14px", alignItems: "center", justifyContent: "space-between"}}><span style={{fontSize: "13.5px", lineHeight: "1.45"}}><strong style={{color: "#06254F", fontWeight: "600"}}>{v.t.ck.ana}</strong>
<br />
<span style={{color: "#57504D"}}>{v.t.ck.anaD}</span>
</span>
<button type="button" role="switch" className="sw" aria-checked={v.prefs.analytics} aria-label={v.t.ck.ana} onClick={v.toggleAna} style={{background: v.sw.a}}><span style={{transform: `translateX(${v.sw.ax}px)`}}></span>
</button>
</li>
<li style={{display: "flex", gap: "14px", alignItems: "center", justifyContent: "space-between"}}><span style={{fontSize: "13.5px", lineHeight: "1.45"}}><strong style={{color: "#06254F", fontWeight: "600"}}>{v.t.ck.mkt}</strong>
<br />
<span style={{color: "#57504D"}}>{v.t.ck.mktD}</span>
</span>
<button type="button" role="switch" className="sw" aria-checked={v.prefs.marketing} aria-label={v.t.ck.mkt} onClick={v.toggleMkt} style={{background: v.sw.m}}><span style={{transform: `translateX(${v.sw.mx}px)`}}></span>
</button>
</li>
</ul>
<div style={{marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap"}}><button type="button" className="btn btn-p" onClick={v.saveCk} style={{flex: "1 1 auto", minHeight: "48px"}}>{v.t.ck.save}</button>
<button type="button" className="btn btn-w" onClick={v.acceptCk} style={{flex: "1 1 auto", minHeight: "48px"}}>{v.t.ck.accept}</button>
</div>
</>) : null}
{(v.ckSimple) ? (<><div style={{marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center"}}><button type="button" className="btn btn-p" onClick={v.acceptCk} style={{flex: "1 1 auto", minHeight: "48px"}}>{v.t.ck.accept}</button>
<button type="button" className="btn btn-w" onClick={v.rejectCk} style={{flex: "1 1 auto", minHeight: "48px"}}>{v.t.ck.reject}</button>
<button type="button" className="link" onClick={v.openPrefs} style={{flex: "1 1 100%", justifyContent: "center", minHeight: "40px", background: "none", border: "0", cursor: "pointer", fontFamily: "inherit"}}>{v.t.ck.manage}</button>
</div>
</>) : null}
</div>
</>) : null}
</div>

</>);
  }
}

export default AboutPage;
