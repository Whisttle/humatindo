'use client';
/* eslint-disable */
/* Generated from the design canvas (StoryAbout.dc.html). */
import React from 'react';
import Nav from './Nav';
import '../../lib/gsap-global';
import './StoryAbout.css';

class StoryAbout extends React.Component {
  constructor(...a) {
    super(...a);
    this.state = { navFloat: false, menu: false };
    this.setRoot = (el) => { this.root = el; };
    this.onImg = (ev) => { if (ev && ev.target && ev.target.classList) ev.target.classList.add('is-loaded'); };
    this.toggleMenu = () => this.setState((s) => ({ menu: !s.menu }));
    this.closeMenu = () => this.setState({ menu: false });
  }

  componentDidMount() {
    this._alive = true;
    setTimeout(() => this.bindNav(), 0);
    this.markImgs();
    this._imgTimer = setTimeout(() => { if (this.root) this.root.querySelectorAll('img.fade').forEach((im) => im.classList.add('is-loaded')); }, 2500);
    this.bootMotion();
  }

  componentDidUpdate() { this.markImgs(); }

  componentWillUnmount() { this._alive = false; clearTimeout(this._imgTimer); if (this._navSc && this._onNav) this._navSc.removeEventListener('scroll', this._onNav); if (this.ctx) this.ctx.revert(); }

  markImgs() { if (this.root) this.root.querySelectorAll('img.fade').forEach((im) => { if (im.complete && im.naturalWidth > 0) im.classList.add('is-loaded'); }); }

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
      if (reduce || !(sh > vh * 1.3) || !this.root) return;
      g.registerPlugin(ST);
      if (sc !== window) ST.defaults({ scroller: sc });
      const root = this.root;
      this.ctx = g.context(() => {
        const img = root.querySelector('.px-img');
        if (img) g.fromTo(img, { scale: 1.12, yPercent: -4 }, { scale: 1, yPercent: 4, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
        root.querySelectorAll('.gs-up').forEach((el) => g.from(el, { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
      }, root);
      ST.refresh();
    };
    go();
  }

  renderVals() {
    return {
      setRoot: this.setRoot, onImg: this.onImg,
      toggleMenu: this.toggleMenu, closeMenu: this.closeMenu, menu: this.state.menu,
      hdrCls: this.state.navFloat ? 'hdr float' : 'hdr',
      navCls: this.state.navFloat ? 'nav float lgl' : 'nav'
    };
  }

  render() {
    const v = this.renderVals();
    return (<><div className="story-about" ref={v.setRoot} style={{position: "relative", minHeight: "100%", overflowX: "clip", background: "#F4F7FA"}}>

<Nav active={"about"} cta={"#contact"} preview={false} />

<main>
<section aria-labelledby="ab-title" style={{position: "relative", minHeight: "780px", display: "flex", alignItems: "flex-end", background: "#2b3a1c", overflow: "hidden"}}>
<img className="fade" onLoad={v.onImg} src="/img/moss-blue-real.webp" alt="" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover"}} />
<div style={{position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(4,22,44,.35) 0%, rgba(4,22,44,.2) 35%, rgba(4,22,44,.86) 100%), linear-gradient(90deg, rgba(4,22,44,.55) 0%, rgba(4,22,44,0) 65%)"}}></div>
<div className="wrap in" style={{position: "relative", width: "100%", padding: "160px 24px 72px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "32px 80px", alignItems: "end"}}>
<div style={{display: "flex", flexDirection: "column", gap: "26px"}}>
<p className="eb lt">About Humatindo</p>
<h1 id="ab-title" style={{margin: "0", fontSize: "clamp(44px, 6.4vw, 100px)", lineHeight: ".98", letterSpacing: "-.04em", fontWeight: "300", color: "#fff"}}>From Sumatran lignite, <span style={{fontWeight: "600"}}>for world agriculture.</span></h1>
</div>
<p style={{margin: "0", maxWidth: "520px", fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: "1.65", color: "rgba(255,255,255,.88)"}}>PT Artha Prima Humatindo is an Indonesian private company producing complete biostimulant formulations, for farming that gives back to the soil.</p>
</div>
</section>

<section aria-labelledby="who-title" className="wrap" style={{padding: "130px 24px 120px", display: "flex", flexDirection: "column", gap: "72px"}}>
<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: "40px 80px", alignItems: "start"}}>
<div className="gs-up" style={{display: "flex", flexDirection: "column", gap: "24px"}}>
<p className="eb">Who we are</p>
<h2 id="who-title" style={{margin: "0", fontSize: "clamp(34px, 3.8vw, 56px)", lineHeight: "1.08", letterSpacing: "-.03em", fontWeight: "300", color: "#06254F"}}>Indonesia's first private producer of <span style={{fontWeight: "600"}}>the most complete range of humic compound variants.</span></h2>
</div>
<div className="gs-up" style={{display: "flex", flexDirection: "column", gap: "18px", fontSize: "17px", lineHeight: "1.7", color: "#342C2A", paddingTop: "44px"}}>
<p style={{margin: "0"}}>Humatindo was established in Riau in January 2016. We combine humate compounds, amino compounds, seaweed extract and essential micronutrients into complete biostimulant formulations.</p>
<p style={{margin: "0"}}>From our head office in Pekanbaru and our branch in Tangerang, we supply government projects, businesses, retailers and plantations across Indonesia, and export to growers in seven Asian markets.</p>
</div>
</div>
<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "40px 32px"}}>
<div className="stat gs-up"><span className="tnum" style={{fontSize: "clamp(40px, 4vw, 56px)", lineHeight: "1", fontWeight: "300", letterSpacing: "-.035em", color: "#06254F"}}>2016</span><span style={{fontSize: "15px", lineHeight: "1.55", color: "#342C2A"}}>Established in Riau, Indonesia</span></div>
<div className="stat gs-up"><span className="tnum" style={{fontSize: "clamp(40px, 4vw, 56px)", lineHeight: "1", fontWeight: "300", letterSpacing: "-.035em", color: "#06254F"}}>3,000,000 L</span><span style={{fontSize: "15px", lineHeight: "1.55", color: "#342C2A"}}>Biostimulant production capacity each year</span></div>
<div className="stat gs-up"><span className="tnum" style={{fontSize: "clamp(40px, 4vw, 56px)", lineHeight: "1", fontWeight: "300", letterSpacing: "-.035em", color: "#06254F"}}>9</span><span style={{fontSize: "15px", lineHeight: "1.55", color: "#342C2A"}}>Biostimulant formulations across two product lines</span></div>
<div className="stat gs-up"><span className="tnum" style={{fontSize: "clamp(40px, 4vw, 56px)", lineHeight: "1", fontWeight: "300", letterSpacing: "-.035em", color: "#06254F"}}>5</span><span style={{fontSize: "15px", lineHeight: "1.55", color: "#342C2A"}}>Business segments, from government projects to export</span></div>
</div>
</section>

<figure className="gs-up" style={{margin: "0", padding: "0 16px"}}>
<div className="wrap" style={{position: "relative", height: "clamp(360px, 46vw, 680px)", borderRadius: "32px", overflow: "hidden", background: "#cbd9e3"}}>
<img className="fade px-img" onLoad={v.onImg} src="/img/factory.webp" alt="Humatindo head office and factory grounds in Pekanbaru" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%"}} />
</div>
<figcaption className="wrap" style={{padding: "14px 8px 0", fontSize: "13px", color: "#57504D"}}>Head office and production grounds, Pekanbaru, Riau.</figcaption>
</figure>

<section aria-labelledby="why-title" style={{background: "#06254F", color: "#fff", padding: "130px 0", marginTop: "120px"}}>
<div className="wrap" style={{padding: "0 24px", display: "flex", flexDirection: "column", gap: "64px"}}>
<div className="gs-up" style={{display: "flex", flexDirection: "column", gap: "24px", maxWidth: "1040px"}}>
<p className="eb lt">Why humic substances</p>
<h2 id="why-title" style={{margin: "0", fontSize: "clamp(34px, 4.2vw, 62px)", lineHeight: "1.06", letterSpacing: "-.035em", fontWeight: "300", color: "#fff"}}>Heavy tropical rain washes nutrients out of the soil. <span style={{fontWeight: "600"}}>Humic substances help hold them in.</span></h2>
</div>
<figure className="gs-up" style={{margin: "0", display: "flex", flexDirection: "column", gap: "14px"}}>
<div style={{position: "relative", height: "clamp(200px, 22vw, 320px)", borderRadius: "24px", overflow: "hidden", background: "#e9e4dc"}}>
<img className="fade" onLoad={v.onImg} src="/img/lignite.webp" alt="Raw lignite from Sumatra" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 85%"}} />
</div>
<figcaption style={{fontSize: "13px", color: "rgba(255,255,255,.7)"}}>Sumatran lignite, our raw material.</figcaption>
</figure>
<ol style={{listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "40px"}}>
<li className="gs-up" style={{display: "flex", flexDirection: "column", gap: "14px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,.25)"}}><span style={{fontSize: "13px", fontWeight: "600", letterSpacing: ".14em", color: "#7FD3FF"}}>01</span><h3 style={{margin: "0", fontSize: "26px", fontWeight: "500", color: "#fff"}}>The challenge</h3><p style={{margin: "0", fontSize: "15.5px", lineHeight: "1.65", color: "rgba(255,255,255,.78)"}}>Year-round rain and sunshine speed up land degradation. Intensive monoculture lowers soil organic carbon, and heavy rain leaches potassium, sodium, calcium and magnesium.</p></li>
<li className="gs-up" style={{display: "flex", flexDirection: "column", gap: "14px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,.25)"}}><span style={{fontSize: "13px", fontWeight: "600", letterSpacing: ".14em", color: "#7FD3FF"}}>02</span><h3 style={{margin: "0", fontSize: "26px", fontWeight: "500", color: "#fff"}}>The answer</h3><p style={{margin: "0", fontSize: "15.5px", lineHeight: "1.65", color: "rgba(255,255,255,.78)"}}>Humic acid, fulvic acid and humin act as soil conditioners that raise cation exchange capacity: a suitable, affordable technology for tropical land.</p></li>
<li className="gs-up" style={{display: "flex", flexDirection: "column", gap: "14px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,.25)"}}><span style={{fontSize: "13px", fontWeight: "600", letterSpacing: ".14em", color: "#7FD3FF"}}>03</span><h3 style={{margin: "0", fontSize: "26px", fontWeight: "500", color: "#fff"}}>Our source</h3><p style={{margin: "0", fontSize: "15.5px", lineHeight: "1.65", color: "rgba(255,255,255,.78)"}}>Leonardite and lignite from Sumatra, formed by tropical weathering and high microbial activity, with a balanced 6:4 humic-to-fulvic content.</p></li>
</ol>
</div>
</section>

<section aria-labelledby="vision-title" style={{background: "#fff", padding: "130px 0"}}>
<div className="wrap" style={{padding: "0 24px", display: "flex", flexDirection: "column", gap: "88px"}}>
<div className="gs-up" style={{display: "flex", flexDirection: "column", gap: "28px"}}>
<p className="eb">Our vision</p>
<h2 id="vision-title" style={{margin: "0", maxWidth: "1180px", fontSize: "clamp(30px, 3.6vw, 52px)", lineHeight: "1.2", letterSpacing: "-.025em", fontWeight: "300", color: "#06254F"}}>To become a leading company in developing and providing high-quality, consistent, innovative and competitive biostimulants, <span style={{fontWeight: "600"}}>supporting regenerative agriculture across the Asian region.</span></h2>
</div>
<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "40px 88px", alignItems: "start"}}>
<div className="gs-up" style={{display: "flex", flexDirection: "column", gap: "24px"}}>
<p className="eb">Our mission</p>
<h3 style={{margin: "0", fontSize: "clamp(28px, 2.8vw, 40px)", lineHeight: "1.12", letterSpacing: "-.025em", fontWeight: "300", color: "#06254F"}}>Four commitments <span style={{fontWeight: "600"}}>we hold ourselves to.</span></h3>
</div>
<ol style={{listStyle: "none", margin: "0", padding: "0"}}>
<li className="row gs-up"><span className="tnum" style={{fontSize: "30px", fontWeight: "300", color: "#0070AC", lineHeight: "1.1"}}>01</span><div style={{display: "flex", flexDirection: "column", gap: "6px"}}><h4 style={{margin: "0", fontSize: "20px", fontWeight: "600", color: "#06254F"}}>Quality you can rely on</h4><p style={{margin: "0", fontSize: "15.5px", lineHeight: "1.65", color: "#342C2A"}}>Producing premium-quality biostimulants with guaranteed quality standards and competitive prices.</p></div></li>
<li className="row gs-up"><span className="tnum" style={{fontSize: "30px", fontWeight: "300", color: "#0070AC", lineHeight: "1.1"}}>02</span><div style={{display: "flex", flexDirection: "column", gap: "6px"}}><h4 style={{margin: "0", fontSize: "20px", fontWeight: "600", color: "#06254F"}}>Restore the soil</h4><p style={{margin: "0", fontSize: "15.5px", lineHeight: "1.65", color: "#342C2A"}}>Restoring, repairing and improving soil quality while reducing reliance on synthetic fertilizers.</p></div></li>
<li className="row gs-up"><span className="tnum" style={{fontSize: "30px", fontWeight: "300", color: "#0070AC", lineHeight: "1.1"}}>03</span><div style={{display: "flex", flexDirection: "column", gap: "6px"}}><h4 style={{margin: "0", fontSize: "20px", fontWeight: "600", color: "#06254F"}}>Share what we know</h4><p style={{margin: "0", fontSize: "15.5px", lineHeight: "1.65", color: "#342C2A"}}>Educating and empowering customers in sustainable practices that are effective, efficient and environmentally friendly.</p></div></li>
<li className="row gs-up" style={{borderBottom: "1px solid rgba(6,37,79,.12)"}}><span className="tnum" style={{fontSize: "30px", fontWeight: "300", color: "#0070AC", lineHeight: "1.1"}}>04</span><div style={{display: "flex", flexDirection: "column", gap: "6px"}}><h4 style={{margin: "0", fontSize: "20px", fontWeight: "600", color: "#06254F"}}>Safe and responsible</h4><p style={{margin: "0", fontSize: "15.5px", lineHeight: "1.65", color: "#342C2A"}}>Ensuring products and services comply with government regulation, for agriculture that is safe and responsible.</p></div></li>
</ol>
</div>
</div>
</section>

<section aria-labelledby="quality-title" className="wrap" style={{padding: "130px 24px", display: "flex", flexDirection: "column", gap: "64px"}}>
<div className="gs-up" style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: "32px 80px", alignItems: "end"}}>
<div style={{display: "flex", flexDirection: "column", gap: "24px"}}>
<p className="eb">Quality and innovation</p>
<h2 id="quality-title" style={{margin: "0", fontSize: "clamp(36px, 4.4vw, 64px)", lineHeight: "1.04", letterSpacing: "-.035em", fontWeight: "300", color: "#06254F"}}>Certified quality, <span style={{fontWeight: "600"}}>local innovation.</span></h2>
</div>
<div style={{display: "flex", alignItems: "center", gap: "20px"}}>
<img src="/img/iso-sgs.webp" alt="SGS ISO 9001 system certification" style={{width: "80px", height: "80px", objectFit: "contain", display: "block", flex: "none"}} />
<p style={{margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#342C2A"}}>Our quality management system is certified to ISO 9001:2015 by SGS.</p>
</div>
</div>
<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "48px 80px"}}>
<div className="gs-up" style={{display: "flex", flexDirection: "column", gap: "18px"}}>
<h3 style={{margin: "0", fontSize: "13px", fontWeight: "600", letterSpacing: ".14em", textTransform: "uppercase", color: "#57504D"}}>Commitment to quality</h3>
<ul style={{listStyle: "none", margin: "0", padding: "0"}}>
<li className="tick"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flex: "none", marginTop: "2px"}}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>ISO 9001:2015 quality management</li>
<li className="tick"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flex: "none", marginTop: "2px"}}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>Product quality control</li>
<li className="tick"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flex: "none", marginTop: "2px"}}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>A consistent production process</li>
<li className="tick" style={{borderBottom: "1px solid rgba(6,37,79,.12)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flex: "none", marginTop: "2px"}}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>A focus on what agriculture actually needs</li>
</ul>
</div>
<div className="gs-up" style={{display: "flex", flexDirection: "column", gap: "18px"}}>
<h3 style={{margin: "0", fontSize: "13px", fontWeight: "600", letterSpacing: ".14em", textTransform: "uppercase", color: "#57504D"}}>Innovation in local raw materials</h3>
<ul style={{listStyle: "none", margin: "0", padding: "0"}}>
<li className="tick"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flex: "none", marginTop: "2px"}}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>Local raw materials from Sumatra</li>
<li className="tick"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flex: "none", marginTop: "2px"}}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>Solutions for agricultural challenges</li>
<li className="tick"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flex: "none", marginTop: "2px"}}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>Greater efficiency for growers</li>
<li className="tick" style={{borderBottom: "1px solid rgba(6,37,79,.12)"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flex: "none", marginTop: "2px"}}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>Support for regenerative agriculture</li>
</ul>
</div>
</div>
</section>

<section aria-labelledby="apri-title" style={{padding: "0 16px 120px"}}>
<div className="wrap gs-up" style={{position: "relative", borderRadius: "32px", overflow: "hidden", background: "#E6F1F8"}}>
<div style={{position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "24px", alignItems: "end", padding: "clamp(32px, 5vw, 72px) clamp(32px, 5vw, 72px) 0"}}>
<div style={{display: "flex", flexDirection: "column", gap: "22px", paddingBottom: "clamp(32px, 5vw, 72px)"}}>
<p className="eb">Coming soon on Google Play</p>
<h2 id="apri-title" style={{margin: "0", fontSize: "clamp(34px, 3.8vw, 54px)", lineHeight: "1.06", letterSpacing: "-.03em", fontWeight: "300", color: "#06254F"}}>APRI, <span style={{fontWeight: "600"}}>Humatindo Loyalty.</span></h2>
<p style={{margin: "0", maxWidth: "460px", fontSize: "17px", lineHeight: "1.7", color: "#342C2A"}}>A loyalty app for our growers and partners, with APRI as your guide.</p>
<ul style={{listStyle: "none", margin: "0", padding: "0", maxWidth: "460px"}}>
<li className="tick">Integrated<span style={{fontWeight: "400", color: "#57504D", marginLeft: "auto"}}>All in one platform</span></li>
<li className="tick">Efficient<span style={{fontWeight: "400", color: "#57504D", marginLeft: "auto"}}>Smart process, better result</span></li>
<li className="tick" style={{borderBottom: "1px solid rgba(6,37,79,.12)"}}>Connected<span style={{fontWeight: "400", color: "#57504D", marginLeft: "auto"}}>Stronger relationships</span></li>
</ul>
</div>
<div style={{display: "flex", justifyContent: "center", alignItems: "flex-end"}}>
<img className="fade float" onLoad={v.onImg} src="/img/apri-hi.webp" alt="APRI, the Humatindo character, waving" style={{height: "440px", width: "auto", display: "block"}} />
</div>
</div>
</div>
</section>

<section id="contact" aria-labelledby="cta-title" style={{padding: "0 16px 16px", scrollMarginTop: "80px"}}>
<div className="wrap gs-up" style={{borderRadius: "32px", background: "#30318C", color: "#fff", padding: "clamp(36px, 5vw, 80px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "48px 80px"}}>
<div style={{display: "flex", flexDirection: "column", gap: "24px"}}>
<p className="eb lt">Where to find us</p>
<h2 id="cta-title" style={{margin: "0", fontSize: "clamp(36px, 4.4vw, 64px)", lineHeight: "1.04", letterSpacing: "-.035em", fontWeight: "300", color: "#fff"}}>From Riau to Banten, <span style={{fontWeight: "600"}}>and beyond.</span></h2>
<p style={{margin: "0", maxWidth: "520px", fontSize: "17px", lineHeight: "1.7", color: "rgba(255,255,255,.86)"}}>For partnerships, distribution and export enquiries, our team is ready to talk.</p>
<div style={{display: "flex", flexWrap: "wrap", gap: "12px"}}>
<a className="btn btn-w" href="mailto:sales@humatindo.com">Contact our team</a>
<a className="btn btn-o" href="https://wa.me/6287783863777" target="_blank" rel="noopener">WhatsApp</a>
</div>
</div>
<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "32px", alignContent: "end"}}>
<div style={{display: "flex", flexDirection: "column", gap: "10px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,.3)"}}><h3 style={{margin: "0", fontSize: "13px", fontWeight: "600", letterSpacing: ".14em", textTransform: "uppercase", color: "#9FE0FF"}}>Head office</h3><p style={{margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#fff"}}>Jl. Riau No. 18, Kel. Air Hitam, Kec. Payung Sekaki, Pekanbaru, Riau 28291</p><a className="mlink" href="https://www.google.com/maps/search/?api=1&query=Jl.%20Riau%20No.%2018%20Air%20Hitam%20Payung%20Sekaki%20Pekanbaru" target="_blank" rel="noopener" style={{color: "#fff"}}>Open in Google Maps</a></div>
<div style={{display: "flex", flexDirection: "column", gap: "10px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,.3)"}}><h3 style={{margin: "0", fontSize: "13px", fontWeight: "600", letterSpacing: ".14em", textTransform: "uppercase", color: "#9FE0FF"}}>Branch office</h3><p style={{margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#fff"}}>Pergudangan Tunas Bitung, Blok C2 No. 7, Pasir Jaya, Cikupa, Tangerang, Banten 15710</p><a className="mlink" href="https://www.google.com/maps/search/?api=1&query=Pergudangan%20Tunas%20Bitung%20Cikupa%20Tangerang" target="_blank" rel="noopener" style={{color: "#fff"}}>Open in Google Maps</a></div>
</div>
</div>
</section>
</main>

<footer style={{background: "#fff", padding: "80px 24px 32px"}}>
<div className="wrap" style={{display: "flex", flexDirection: "column", gap: "56px"}}>
<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "40px"}}>
<div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
<img src="/img/logo-full.webp" alt="PT Artha Prima Humatindo \u2014 Leading in biostimulant and organic fertilizer" style={{width: "190px", height: "auto", display: "block"}} />
<p style={{margin: "0", fontSize: "14px", lineHeight: "1.6", color: "#57504D", maxWidth: "260px"}}>Leading in biostimulant and organic fertilizer, from Riau since 2016.</p>
</div>
<nav aria-label="Company" style={{display: "flex", flexDirection: "column", gap: "4px"}}><h3 style={{margin: "0 0 8px", fontSize: "13px", fontWeight: "600", letterSpacing: ".1em", textTransform: "uppercase", color: "#06254F"}}>Company</h3><a className="fl" href="/about">About us</a><a className="fl" href="/">Our story</a><a className="fl" href="#vision-title">Vision and mission</a><a className="fl" href="#quality-title">Quality and ISO</a></nav>
<nav aria-label="Products" style={{display: "flex", flexDirection: "column", gap: "4px"}}><h3 style={{margin: "0 0 8px", fontSize: "13px", fontWeight: "600", letterSpacing: ".1em", textTransform: "uppercase", color: "#06254F"}}>Products</h3><a className="fl" href="/products">Premium biostimulant</a><a className="fl" href="/products">Advanced biostimulant</a></nav>
<nav aria-label="Contact" style={{display: "flex", flexDirection: "column", gap: "4px"}}><h3 style={{margin: "0 0 8px", fontSize: "13px", fontWeight: "600", letterSpacing: ".1em", textTransform: "uppercase", color: "#06254F"}}>Contact</h3><a className="fl" href="mailto:sales@humatindo.com">sales@humatindo.com</a><a className="fl tnum" href="tel:+6287783863777">+62 877 8386 3777</a><a className="fl" href="https://wa.me/6287783863777" target="_blank" rel="noopener">WhatsApp</a></nav>
<nav aria-label="Follow us" style={{display: "flex", flexDirection: "column", gap: "4px"}}><h3 style={{margin: "0 0 8px", fontSize: "13px", fontWeight: "600", letterSpacing: ".1em", textTransform: "uppercase", color: "#06254F"}}>Follow us</h3><a className="fl" href="https://www.instagram.com/bio_stimulant" target="_blank" rel="noopener">Instagram</a><a className="fl" href="https://www.youtube.com/@humatindo" target="_blank" rel="noopener">YouTube</a><a className="fl" href="https://www.facebook.com/share/1EuycTwTWW/" target="_blank" rel="noopener">Facebook</a><a className="fl" href="https://www.tiktok.com/@aph.humatindo" target="_blank" rel="noopener">TikTok</a></nav>
</div>
<div style={{paddingTop: "24px", borderTop: "1px solid rgba(6,37,79,.12)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px", fontSize: "13px", color: "#57504D"}}>
<span>© 2026 PT Artha Prima Humatindo. All rights reserved.</span>
<span style={{display: "flex", alignItems: "center", gap: "10px"}}><img src="/img/iso-sgs.webp" alt="SGS ISO 9001 system certification" style={{width: "40px", height: "40px", objectFit: "contain"}} />ISO 9001:2015 · SGS</span>
<a href="#contact" style={{color: "#57504D"}}>Privacy policy</a>
</div>
</div>
</footer>
</div></>);
  }
}

export default StoryAbout;
