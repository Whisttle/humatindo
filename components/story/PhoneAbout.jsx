'use client';
/* eslint-disable */
/* Generated from the design canvas (PhoneAbout.dc.html). */
import React from 'react';
import Nav from './Nav';
import './PhoneAbout.css';

class PhoneAbout extends React.Component {
  constructor(...a) {
    super(...a);
    this.state = { why: 0, acc: 0, q: 0, foot: -1, prog: 0, bar: false };
    this.setRoot = (el) => { this.root = el; };
    this.setWhy = (el) => { this.whyEl = el; };
    this.setStats = (el) => { this.statsEl = el; };
    this.onWhy = (ev) => {
      const el = ev && ev.currentTarget; if (!el || !el.firstElementChild) return;
      const i = Math.max(0, Math.min(2, Math.round(el.scrollLeft / (el.firstElementChild.offsetWidth + 14))));
      if (i !== this.state.why) this.setState({ why: i });
    };
  }

  componentDidMount() {
    this._alive = true;
    setTimeout(() => this.bindScroll(), 0);
    try {
      if ('IntersectionObserver' in window && this.statsEl) {
        this._sio = new IntersectionObserver((es) => { if (es[0] && es[0].isIntersecting) { this.countUp(); this._sio.disconnect(); } }, { threshold: 0.3 });
        this._sio.observe(this.statsEl);
      } else this.setState({ prog: 1 });
    } catch (e) { this.setState({ prog: 1 }); }
  }

  componentWillUnmount() { this._alive = false; cancelAnimationFrame(this._craf); if (this._sio) this._sio.disconnect(); if (this._sc && this._onScroll) this._sc.removeEventListener('scroll', this._onScroll); }

  countUp() {
    let reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    if (reduce) { this.setState({ prog: 1 }); return; }
    const t0 = performance.now();
    const tick = (now) => { if (!this._alive) return; const p = Math.min(1, (now - t0) / 1600); this.setState({ prog: p }); if (p < 1) this._craf = requestAnimationFrame(tick); };
    this._craf = requestAnimationFrame(tick);
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

  bindScroll() {
    if (!this._alive) return;
    const sc = this.findScroller();
    this._sc = sc;
    this._onScroll = () => { const y = sc === window ? (window.scrollY || 0) : sc.scrollTop; const b = y > 480; if (b !== this.state.bar) this.setState({ bar: b }); };
    sc.addEventListener('scroll', this._onScroll, { passive: true });
    this._onScroll();
  }

  renderVals() {
    const s = this.state;
    const ease = (x) => 1 - Math.pow(1 - x, 3), p = ease(s.prog);
    const fmt = (n) => Math.round(n).toLocaleString('en-US');
    const stats = [
      { v: s.prog >= 1 ? '2016' : String(Math.round(1990 + 26 * p)), l: 'Established in Riau' },
      { v: fmt(3000000 * p) + ' L', l: 'Biostimulant capacity each year' },
      { v: fmt(9 * p), l: 'Formulations in two lines' },
      { v: fmt(5 * p), l: 'Business segments served' }
    ];
    const why = [
      { n: '01', t: 'The challenge', b: 'Year-round rain and sunshine speed up land degradation. Monoculture lowers soil organic carbon, and heavy rain leaches potassium, sodium, calcium and magnesium.' },
      { n: '02', t: 'The answer', b: 'Humic acid, fulvic acid and humin act as soil conditioners that raise cation exchange capacity: a suitable, affordable technology for tropical land.' },
      { n: '03', t: 'Our source', b: 'Leonardite and lignite from Sumatra, formed by tropical weathering and high microbial activity, with a balanced 6:4 humic-to-fulvic content.' }
    ];
    const missions = [
      ['01', 'Quality you can rely on', 'Producing premium-quality biostimulants with guaranteed quality standards and competitive prices.'],
      ['02', 'Restore the soil', 'Restoring, repairing and improving soil quality while reducing reliance on synthetic fertilizers.'],
      ['03', 'Share what we know', 'Educating and empowering customers in sustainable practices that are effective, efficient and environmentally friendly.'],
      ['04', 'Safe and responsible', 'Ensuring products and services comply with government regulation, for agriculture that is safe and responsible.']
    ].map((m, i) => ({ n: m[0], t: m[1], b: m[2], open: s.acc === i, toggle: () => this.setState({ acc: s.acc === i ? -1 : i }) }));
    const qData = [
      { t: 'Quality', items: ['ISO 9001:2015 quality management', 'Product quality control', 'A consistent production process', 'A focus on what agriculture actually needs'] },
      { t: 'Local materials', items: ['Local raw materials from Sumatra', 'Solutions for agricultural challenges', 'Greater efficiency for growers', 'Support for regenerative agriculture'] }
    ];
    const qTabs = qData.map((q, i) => ({ t: q.t, on: s.q === i, cls: s.q === i ? 'sg on' : 'sg', pick: () => this.setState({ q: i }) }));
    const offices = [
      { t: 'Head office', a: 'Jl. Riau No. 18, Kel. Air Hitam, Kec. Payung Sekaki, Pekanbaru, Riau 28291', map: 'https://www.google.com/maps/search/?api=1&query=Jl.%20Riau%20No.%2018%20Air%20Hitam%20Payung%20Sekaki%20Pekanbaru' },
      { t: 'Branch office', a: 'Pergudangan Tunas Bitung, Blok C2 No. 7, Pasir Jaya, Cikupa, Tangerang, Banten 15710', map: 'https://www.google.com/maps/search/?api=1&query=Pergudangan%20Tunas%20Bitung%20Cikupa%20Tangerang' }
    ];
    const footData = [
      { t: 'Company', links: [{ t: 'Home', h: '/', tg: '_self' }, { t: 'Products', h: '/products', tg: '_self' }] },
      { t: 'Contact', links: [{ t: 'sales@humatindo.com', h: 'mailto:sales@humatindo.com', tg: '_self' }, { t: '+62 877 8386 3777', h: 'tel:+6287783863777', tg: '_self' }] },
      { t: 'Follow us', links: [{ t: 'Instagram', h: 'https://www.instagram.com/bio_stimulant', tg: '_blank' }, { t: 'YouTube', h: 'https://www.youtube.com/@humatindo', tg: '_blank' }, { t: 'TikTok', h: 'https://www.tiktok.com/@aph.humatindo', tg: '_blank' }] }
    ];
    const foot = footData.map((f, i) => ({ t: f.t, links: f.links, open: s.foot === i, rot: s.foot === i ? 180 : 0, toggle: () => this.setState({ foot: s.foot === i ? -1 : i }) }));
    return {
      setRoot: this.setRoot, setWhy: this.setWhy, setStats: this.setStats, onWhy: this.onWhy,
      stats, why, whyDots: why.map((w, i) => (i === s.why ? 'dot on' : 'dot')), missions, qTabs, qItems: qData[s.q].items, offices, foot,
      barCls: s.bar ? 'bar' : 'bar off'
    };
  }

  render() {
    const v = this.renderVals();
    return (<><div className="m-about" ref={v.setRoot} style={{position: "relative", minHeight: "100%", overflowX: "clip", background: "#F4F7FA", paddingBottom: "84px"}}>
<Nav active={"about"} set={"Phone"} cta={"#m-contact"} preview={false} />

<main>
<section aria-labelledby="m-ab-title" style={{position: "relative", minHeight: "600px", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "#2b3a1c", overflow: "hidden"}}>
<img src="/img/moss-blue-real.webp" alt="" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "40% 50%"}} />
<div style={{position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(4,22,44,.45) 0%, rgba(4,22,44,.2) 30%, rgba(4,22,44,.9) 100%)"}}></div>
<div className="in px" style={{position: "relative", paddingTop: "120px", paddingBottom: "36px", display: "flex", flexDirection: "column", gap: "18px"}}>
<p className="eb lt">About Humatindo</p>
<h1 id="m-ab-title" className="hero-h" style={{margin: "0", fontSize: "42px", lineHeight: "1", letterSpacing: "-.04em", fontWeight: "300", color: "#fff"}}>From Sumatran lignite, <span style={{fontWeight: "600"}}>for world agriculture.</span></h1>
<p style={{margin: "0", maxWidth: "560px", fontSize: "15.5px", lineHeight: "1.6", color: "rgba(255,255,255,.88)"}}>An Indonesian private company producing complete biostimulant formulations, for farming that gives back to the soil.</p>
</div>
</section>

<section aria-labelledby="m-who-title" className="px" style={{paddingTop: "56px"}}>
<div className="t2" style={{display: "flex", flexDirection: "column", gap: "18px"}}>
<div style={{display: "flex", flexDirection: "column", gap: "16px"}}><p className="eb">Who we are</p><h2 id="m-who-title" className="h2">Indonesia's first private producer of <b>the most complete range of humic compound variants.</b></h2></div>
<div style={{display: "flex", flexDirection: "column", gap: "14px", fontSize: "15.5px", lineHeight: "1.7"}}>
<p style={{margin: "0"}}>Established in Riau in January 2016, we combine humate compounds, amino compounds, seaweed extract and essential micronutrients into complete biostimulant formulations.</p>
<p style={{margin: "0"}}>From Pekanbaru and Tangerang we supply government projects, businesses, retailers and plantations across Indonesia, and export to seven Asian markets.</p>
</div>
</div>
<div ref={v.setStats} className="stats" style={{marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px"}}>
{(v.stats || []).map((s, s_i1) => (<React.Fragment key={s_i1}><div className="stat"><span className="v tnum">{s.v}</span><span className="l">{s.l}</span></div></React.Fragment>))}
</div>
<figure style={{margin: "24px 0 0", display: "flex", flexDirection: "column", gap: "10px"}}>
<div style={{position: "relative", height: "260px", borderRadius: "22px", overflow: "hidden", background: "#cbd9e3"}}><img src="/img/factory.webp" alt="Humatindo head office and factory grounds in Pekanbaru" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%"}} /></div>
<figcaption style={{fontSize: "13px", color: "#57504D"}}>Head office and production grounds, Pekanbaru, Riau.</figcaption>
</figure>
</section>

<section aria-labelledby="m-why-title" style={{marginTop: "56px", paddingTop: "56px", paddingBottom: "48px", background: "#06254F", color: "#fff"}}>
<div className="px" style={{display: "flex", flexDirection: "column", gap: "16px"}}>
<p className="eb lt">Why humic substances</p>
<h2 id="m-why-title" className="h2" style={{color: "#fff"}}>Tropical rain washes nutrients away. <b>Humic substances hold them in.</b></h2>
</div>
<div className="car" ref={v.setWhy} onScroll={v.onWhy} style={{marginTop: "24px"}}>
{(v.why || []).map((w, w_i2) => (<React.Fragment key={w_i2}>
<article style={{display: "flex", flexDirection: "column", gap: "12px", padding: "22px 20px", minHeight: "260px", borderRadius: "22px", background: "rgba(255,255,255,.07)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.14)"}}>
<span className="tnum" style={{fontSize: "40px", fontWeight: "300", lineHeight: "1", color: "#7FD3FF"}}>{w.n}</span>
<h3 style={{margin: "0", fontSize: "22px", fontWeight: "500"}}>{w.t}</h3>
<p style={{margin: "0", fontSize: "15px", lineHeight: "1.65", color: "rgba(255,255,255,.82)"}}>{w.b}</p>
</article>
</React.Fragment>))}
</div>
<div className="px" style={{marginTop: "18px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
<div className="dots">{(v.whyDots || []).map((d, d_i3) => (<React.Fragment key={d_i3}><span className={d}></span></React.Fragment>))}</div>
<span style={{fontSize: "13px", color: "rgba(255,255,255,.7)"}}>Swipe to read</span>
</div>
</section>

<section aria-labelledby="m-vision-title" className="px" style={{paddingTop: "56px"}}>
<div style={{padding: "26px 22px", borderRadius: "24px", background: "#fff", boxShadow: "0 18px 40px -30px rgba(6,37,79,.5)", display: "flex", flexDirection: "column", gap: "14px"}}>
<p className="eb">Our vision</p>
<h2 id="m-vision-title" style={{margin: "0", fontSize: "22px", lineHeight: "1.4", letterSpacing: "-.01em", fontWeight: "300", color: "#06254F"}}>To become a leading company in developing and providing high-quality, consistent, innovative and competitive biostimulants, <b style={{fontWeight: "600"}}>supporting regenerative agriculture across the Asian region.</b></h2>
</div>
</section>

<section aria-labelledby="m-mis-title" className="px" style={{paddingTop: "48px"}}>
<p className="eb">Our mission</p>
<h2 id="m-mis-title" className="h2" style={{marginTop: "14px", fontSize: "28px"}}>Four commitments <b>we hold ourselves to.</b></h2>
<div style={{marginTop: "18px", borderBottom: "1px solid rgba(6,37,79,.12)"}}>
{(v.missions || []).map((m, m_i4) => (<React.Fragment key={m_i4}>
<div className="acc">
<button type="button" className="acc-b" aria-expanded={m.open} onClick={m.toggle}><span className="n tnum">{m.n}</span>{m.t}<span className="pm" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg></span></button>
{(m.open) ? (<><p className="acc-p in" style={{animationDuration: ".45s"}}>{m.b}</p></>) : null}
</div>
</React.Fragment>))}
</div>
</section>

<section aria-labelledby="m-q-title" className="px" style={{paddingTop: "56px", display: "flex", flexDirection: "column", gap: "16px"}}>
<p className="eb">Quality and innovation</p>
<h2 id="m-q-title" className="h2">Certified quality, <b>local innovation.</b></h2>
<div style={{display: "flex", alignItems: "center", gap: "14px", padding: "14px", borderRadius: "18px", background: "#fff"}}><img src="/img/iso-sgs.webp" alt="SGS ISO 9001 system certification" style={{width: "56px", height: "56px", objectFit: "contain", flex: "none"}} /><p style={{margin: "0", fontSize: "14.5px", lineHeight: "1.55"}}>Quality management certified to ISO 9001:2015 by SGS.</p></div>
<div className="seg" role="tablist" aria-label="Quality and innovation">
{(v.qTabs || []).map((q, q_i5) => (<React.Fragment key={q_i5}><button type="button" role="tab" className={q.cls} aria-selected={q.on} onClick={q.pick}>{q.t}</button></React.Fragment>))}
</div>
<ul role="tabpanel" style={{listStyle: "none", margin: "0", padding: "0", borderBottom: "1px solid rgba(6,37,79,.12)"}}>
{(v.qItems || []).map((i, i_i6) => (<React.Fragment key={i_i6}><li className="tick in" style={{animationDuration: ".45s"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flex: "none", marginTop: "2px"}}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>{i}</li></React.Fragment>))}
</ul>
</section>

<section aria-labelledby="m-apri-title" className="px" style={{paddingTop: "56px"}}>
<div style={{position: "relative", overflow: "hidden", borderRadius: "26px", background: "#E6F1F8", padding: "26px 22px 0", display: "flex", flexDirection: "column", gap: "12px"}}>
<p className="eb">Coming soon on Google Play</p>
<h2 id="m-apri-title" className="h2" style={{fontSize: "30px"}}>APRI, <b>Humatindo Loyalty.</b></h2>
<p style={{margin: "0", fontSize: "15px", lineHeight: "1.6"}}>A loyalty app for our growers and partners, with APRI as your guide.</p>
<img className="float" src="/img/apri-hi.webp" alt="APRI, the Humatindo character, waving" style={{alignSelf: "center", height: "260px", width: "auto", display: "block"}} />
</div>
</section>

<section id="m-contact" aria-labelledby="m-off-title" className="px" style={{paddingTop: "56px", scrollMarginTop: "80px", display: "flex", flexDirection: "column", gap: "14px"}}>
<p className="eb">Where to find us</p>
<h2 id="m-off-title" className="h2">From Riau to Banten, <b>and beyond.</b></h2>
<div className="t2" style={{display: "flex", flexDirection: "column", gap: "12px"}}>
{(v.offices || []).map((o, o_i7) => (<React.Fragment key={o_i7}>
<article style={{padding: "20px", borderRadius: "22px", background: "#fff", boxShadow: "0 16px 34px -28px rgba(6,37,79,.5)", display: "flex", flexDirection: "column", gap: "12px"}}>
<h3 style={{margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".14em", textTransform: "uppercase", color: "#0070AC"}}>{o.t}</h3>
<p style={{margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#06254F"}}>{o.a}</p>
<div style={{display: "flex", gap: "8px"}}>
<a className="btn btn-p" href={o.map} target="_blank" rel="noopener" style={{flex: "1", padding: "0 14px"}}>Directions</a>
<a className="btn btn-on" href="tel:+6287783863777" style={{flex: "1", padding: "0 14px"}}>Call</a>
</div>
</article>
</React.Fragment>))}
</div>
</section>
</main>

<footer className="px" style={{paddingTop: "48px", paddingBottom: "24px"}}>
<img src="/img/logo-full.webp" alt="PT Artha Prima Humatindo \u2014 Leading in biostimulant and organic fertilizer" style={{width: "170px", height: "auto", display: "block"}} />
<div style={{marginTop: "24px", borderBottom: "1px solid rgba(6,37,79,.1)"}}>
{(v.foot || []).map((f, f_i8) => (<React.Fragment key={f_i8}>
<button type="button" className="flb" aria-expanded={f.open} onClick={f.toggle}>{f.t}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{transform: `rotate(${f.rot}deg)`, transition: "transform .3s"}}><path d="M6 9l6 6 6-6"></path></svg></button>
{(f.open) ? (<><div className="in" style={{paddingBottom: "10px", animationDuration: ".4s"}}>{(f.links || []).map((l, l_i9) => (<React.Fragment key={l_i9}><a className="fl" href={l.h} target={l.tg} rel="noopener">{l.t}</a></React.Fragment>))}</div></>) : null}
</React.Fragment>))}
</div>
<div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "12.5px", color: "#57504D"}}>
<span style={{display: "flex", alignItems: "center", gap: "10px"}}><img src="/img/iso-sgs.webp" alt="SGS ISO 9001 system certification" style={{width: "36px", height: "36px", objectFit: "contain"}} />ISO 9001:2015 · SGS</span>
<span>© 2026 PT Artha Prima Humatindo. All rights reserved.</span>
</div>
</footer>

<nav aria-label="Quick contact" className={v.barCls}>
<a className="btn btn-on" href="https://wa.me/6287783863777" target="_blank" rel="noopener" style={{padding: "0 12px"}}>WhatsApp</a>
<a className="btn btn-p" href="#m-contact" style={{padding: "0 12px"}}>Contact us</a>
</nav>
</div></>);
  }
}

export default PhoneAbout;
