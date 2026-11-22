'use client';
/* eslint-disable */
import React from 'react';


class AdsHero extends React.Component {
  constructor(...a) {
    super(...a);
    this.state = { lang: 'en', navFloat: false, status: 'idle', errs: {}, form: { name: '', wa: '', region: '', crop: '', role: 'grower', agree: false } };
    this.setRoot = (el) => { this.root = el; };
  }

  componentDidMount() {
    this._alive = true;
    let lang = 'en';
    try { lang = localStorage.getItem('hm_lang') === 'id' ? 'id' : 'en'; } catch (e) {}
    this.setState({ lang });
    setTimeout(() => this.bindNav(), 0);
    this.markImgs();
    this._imgTimer = setTimeout(() => { if (this.root) this.root.querySelectorAll('img.fade').forEach((im) => im.classList.add('is-loaded')); }, 2500);
  }

  componentDidUpdate() { this.markImgs(); }

  componentWillUnmount() { this._alive = false; clearTimeout(this._imgTimer); clearTimeout(this._sendTimer); if (this._navSc && this._onNav) this._navSc.removeEventListener('scroll', this._onNav); }

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

  setLang(l) { try { localStorage.setItem('hm_lang', l); } catch (e) {} this.setState({ lang: l }); }

  submit(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    if (this.state.status === 'sending') return;
    const t = this.dict()[this.state.lang];
    const f = this.state.form, er = {};
    if (!f.name.trim()) er.name = t.form.errName;
    const d = (f.wa || '').replace(/\D/g, '');
    if (d.length < 9 || d.length > 15) er.wa = t.form.errWa;
    if (!f.crop) er.crop = t.form.errCrop;
    if (!f.agree) er.agree = t.form.errAgree;
    if (Object.keys(er).length) { this.setState({ errs: er }); return; }
    this.setState({ status: 'sending', errs: {} });
    this._sendTimer = setTimeout(() => { if (this._alive) this.setState({ status: 'sent' }); }, 1200);
  }

  dict() {
    if (this._d) return this._d;
    this._d = {
      en: {
        nav: { aria: 'Main', home: 'Home', products: 'Products', about: 'About us', contact: 'Contact', cta: 'Request product sheet', lang: 'Language' },
        hero: { h1a: 'Leading Biostimulant', h1b: 'and Organic Fertilizer', sub: 'Biostimulants from 100% soluble Sumatran humic compounds for food crops, horticulture and plantations. Tell us about your land and we will recommend the right formula.', crops: ['Oil palm', 'Rice', 'Corn', 'Horticulture'], trust: ['ISO 9001 certified by SGS', 'Made in Pekanbaru, Riau since 2016', 'Reply on WhatsApp within one working day'] },
        form: {
          title: 'Tell us about your land.', title2: "Let's find the right product.",
          sub: 'Our team will recommend a product and send you the product sheet.',
          name: 'Full name', namePh: 'e.g. Budi Santoso', wa: 'WhatsApp number',
          crop: 'Main crop', cropPh: 'Select a crop', region: 'Province', regionPh: 'e.g. Riau', role: 'I am a',
          agree: 'I agree to be contacted by PT. Artha Prima Humatindo by WhatsApp or phone about this request.',
          submit: 'Get my recommendation', sending: 'Sending…',
          errName: 'Please enter your name.', errWa: 'Please enter a valid WhatsApp number.', errCrop: 'Please choose your main crop.', errAgree: 'Please agree so we can contact you.',
          okTitle: 'Thank you', okBody: 'We have received your request. Our team will contact you on WhatsApp soon.', okCta: 'Browse products',
          crops: [{ v: 'palm', l: 'Oil palm' }, { v: 'rice', l: 'Rice' }, { v: 'corn', l: 'Corn' }, { v: 'horti', l: 'Horticulture' }, { v: 'fruit', l: 'Fruit trees' }, { v: 'coffee', l: 'Coffee & cocoa' }, { v: 'other', l: 'Other' }],
          roles: [{ v: 'grower', l: 'Grower' }, { v: 'distributor', l: 'Distributor' }, { v: 'plantation', l: 'Plantation' }]
        },
        wa: 'Hello Humatindo, I would like a product sheet and recommendation.'
      },
      id: {
        nav: { aria: 'Utama', home: 'Beranda', products: 'Produk', about: 'Tentang kami', contact: 'Kontak', cta: 'Minta lembar produk', lang: 'Bahasa' },
        hero: { h1a: 'Terdepan dalam Biostimulan', h1b: 'dan Pupuk Organik', sub: 'Biostimulan dari senyawa humat Sumatera yang 100% larut untuk tanaman pangan, hortikultura, dan perkebunan. Ceritakan kondisi lahan Anda, kami rekomendasikan formula yang tepat.', crops: ['Kelapa sawit', 'Padi', 'Jagung', 'Hortikultura'], trust: ['Bersertifikat ISO 9001 oleh SGS', 'Diproduksi di Pekanbaru, Riau sejak 2016', 'Dibalas via WhatsApp dalam satu hari kerja'] },
        form: {
          title: 'Ceritakan kondisi lahan Anda.', title2: 'Mari kenali pilihan produknya.',
          sub: 'Tim kami akan merekomendasikan produk dan mengirimkan lembar produknya.',
          name: 'Nama lengkap', namePh: 'mis. Budi Santoso', wa: 'Nomor WhatsApp',
          crop: 'Tanaman utama', cropPh: 'Pilih tanaman', region: 'Provinsi', regionPh: 'mis. Riau', role: 'Saya adalah',
          agree: 'Saya setuju dihubungi oleh PT. Artha Prima Humatindo melalui WhatsApp atau telepon terkait permintaan ini.',
          submit: 'Dapatkan rekomendasi', sending: 'Mengirim…',
          errName: 'Mohon isi nama Anda.', errWa: 'Mohon isi nomor WhatsApp yang valid.', errCrop: 'Mohon pilih tanaman utama Anda.', errAgree: 'Mohon centang persetujuan agar kami dapat menghubungi Anda.',
          okTitle: 'Terima kasih', okBody: 'Permintaan Anda sudah kami terima. Tim kami akan segera menghubungi Anda melalui WhatsApp.', okCta: 'Lihat produk',
          crops: [{ v: 'palm', l: 'Kelapa sawit' }, { v: 'rice', l: 'Padi' }, { v: 'corn', l: 'Jagung' }, { v: 'horti', l: 'Hortikultura' }, { v: 'fruit', l: 'Tanaman buah' }, { v: 'coffee', l: 'Kopi & kakao' }, { v: 'other', l: 'Lainnya' }],
          roles: [{ v: 'grower', l: 'Petani' }, { v: 'distributor', l: 'Distributor' }, { v: 'plantation', l: 'Perkebunan' }]
        },
        wa: 'Halo Humatindo, saya ingin lembar produk dan rekomendasinya.'
      }
    };
    return this._d;
  }

  renderVals() {
    const L = (this.props.lang || this.state.lang) === 'id' ? 'id' : 'en';
    const t = this.dict()[L];
    if (!this._h) {
      const set = (k) => (ev) => { const el = ev && ev.target; const val = el ? (el.type === 'checkbox' ? el.checked : el.value) : ev; this.setState((s) => ({ form: Object.assign({}, s.form, { [k]: val }), errs: Object.assign({}, s.errs, { [k]: null }) })); };
      this._h = {
        setEn: () => this.setLang('en'), setId: () => this.setLang('id'),
        onImg: (ev) => { if (ev && ev.target && ev.target.classList) ev.target.classList.add('is-loaded'); },
        onSubmit: (ev) => this.submit(ev),
        on: { name: set('name'), wa: set('wa'), region: set('region'), crop: set('crop'), agree: set('agree') }
      };
    }
    const f = this.state.form, errs = this.state.errs || {}, st = this.state.status;
    const roles = t.form.roles.map((r) => ({ l: r.l, on: f.role === r.v, cls: f.role === r.v ? 'role on' : 'role', pick: () => this.setState((s) => ({ form: Object.assign({}, s.form, { role: r.v }) })) }));
    const cropsA = t.hero.crops.map((l, i) => ({ l, cls: i === 0 ? 'pill on' : 'pill lg' }));
    return Object.assign({}, this._h, {
      setRoot: this.setRoot,
      hdrCls: this.state.navFloat ? 'hdr float' : 'hdr', navCls: this.state.navFloat ? 'nav float lgl' : 'nav',
      t, roles, cropsA, crops: t.form.crops, form: f, errs,
      inv: { name: !!errs.name, wa: !!errs.wa, crop: !!errs.crop },
      sending: st === 'sending', idle: st !== 'sending', sent: st === 'sent', notSent: st !== 'sent',
      isEn: L === 'en', isId: L === 'id', thumbX: L === 'en' ? 0 : 40,
      segEn: L === 'en' ? 'seg on' : 'seg', segId: L === 'id' ? 'seg on' : 'seg',
      waHref: 'https://wa.me/6287783863777?text=' + encodeURIComponent(t.wa)
    });
  }

  render() {
    const v = this.renderVals();
    return (<><div ref={v.setRoot}><section aria-labelledby="ah-title" className="wrap in" style={{position: "relative", borderRadius: "32px", overflow: "hidden", minHeight: "780px", background: "#2b3a1c"}}><img className="fade" onLoad={v.onImg} src="/img/moss-blue-real.webp" alt="" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover"}} />
<div style={{position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(10,20,6,.55), rgba(10,20,6,.2) 45%, rgba(10,20,6,0) 70%), linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,.4))"}}></div>
<p aria-hidden="true" style={{position: "absolute", left: "0", right: "0", bottom: "-0.16em", margin: "0", textAlign: "center", fontSize: "228px", lineHeight: "1", letterSpacing: "-.05em", fontWeight: "800", color: "rgba(255,255,255,.1)", pointerEvents: "none"}}>HUMATINDO</p>
<div className="agrid" style={{position: "relative", minHeight: "780px", padding: "28px", display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, .75fr) 440px", gap: "24px"}}><div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "32px", padding: "12px 0 8px 12px"}}><div style={{display: "flex", gap: "6px", flexWrap: "wrap"}}>{(v.cropsA || []).map((c, c_i) => (<React.Fragment key={c_i}><span className={c.cls}>{c.l}</span>
</React.Fragment>))}
</div>
<div><h1 id="ah-title" style={{margin: "0", fontSize: "clamp(44px, 4.6vw, 68px)", lineHeight: "1.02", letterSpacing: "-.035em", fontWeight: "700", color: "#fff"}}>{v.t.hero.h1a}<br />
<span style={{color: "#8FD8FF"}}>{v.t.hero.h1b}</span>
</h1>
<p style={{margin: "22px 0 0", maxWidth: "470px", fontSize: "16.5px", lineHeight: "1.6", color: "rgba(255,255,255,.88)"}}>{v.t.hero.sub}</p>
</div>
<ul style={{listStyle: "none", margin: "0", padding: "0", display: "grid", gap: "12px"}}>{(v.t.hero.trust || []).map((x, x_i) => (<React.Fragment key={x_i}><li className="trust"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path>
</svg>{x}</li>
</React.Fragment>))}
</ul>
</div>
<div className="mid" style={{position: "relative", display: "flex", alignItems: "center", justifyContent: "center"}}><span className="drop" style={{width: "24px", height: "24px", left: "10%", top: "24%"}}></span>
<span className="drop" style={{width: "15px", height: "15px", right: "14%", top: "18%", animationDelay: "-3s"}}></span>
<span className="drop" style={{width: "30px", height: "30px", right: "6%", top: "66%", filter: "blur(2px)", animationDelay: "-5s"}}></span>
<div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-96%, -62%) rotate(-9deg)", zIndex: "1"}}><div className="bob" style={{animationDelay: "-1.2s"}}><img className="fade" onLoad={v.onImg} src="/img/p-silikamino-hd.webp" alt="SILIKAMINO 500 mL" style={{height: "380px", width: "auto", maxWidth: "none", display: "block", filter: "drop-shadow(0 30px 26px rgba(0,0,0,.5))"}} />
</div>
</div>
<div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-4%, -66%) rotate(8deg)", zIndex: "1"}}><div className="bob" style={{animationDelay: "-3.8s"}}><img className="fade" onLoad={v.onImg} src="/img/p-samhumat-liquid.webp" alt="SAMHUMAT 500 mL" style={{height: "360px", width: "auto", maxWidth: "none", display: "block", filter: "drop-shadow(0 30px 26px rgba(0,0,0,.5))"}} />
</div>
</div>
<div style={{position: "absolute", left: "50%", bottom: "70px", transform: "translateX(-50%) rotate(-3deg)", zIndex: "2"}}><div className="bob"><img className="fade" onLoad={v.onImg} src="/img/p-samhumat-bag.webp" alt="SAMHUMAT Basic Compound 10 kg" style={{height: "340px", width: "auto", maxWidth: "none", display: "block", filter: "drop-shadow(0 40px 34px rgba(0,0,0,.6))"}} />
</div>
</div>
</div>
<div className="lgl" style={{alignSelf: "center", borderRadius: "28px", padding: "28px"}}>{(v.notSent) ? (<><form onSubmit={v.onSubmit} noValidate={true} aria-labelledby="lead-title"><h2 id="lead-title" style={{margin: "0", fontSize: "24px", lineHeight: "1.2", letterSpacing: "-.015em", fontWeight: "600", color: "#06254F"}}>{v.t.form.title} <span className="acc">{v.t.form.title2}</span>
</h2>
<p style={{margin: "8px 0 20px", fontSize: "14px", lineHeight: "1.55", color: "#342C2A"}}>{v.t.form.sub}</p>
<div style={{display: "grid", gap: "14px"}}><div><label className="fl" htmlFor="a-name">{v.t.form.name}</label>
<input id="a-name" className="fi" type="text" autoComplete="name" placeholder={v.t.form.namePh} value={v.form.name} onChange={v.on.name} aria-invalid={v.inv.name} />
{(v.errs.name) ? (<><p className="err">{v.errs.name}</p>
</>) : null}
</div>
<div><label className="fl" htmlFor="a-wa">{v.t.form.wa}</label>
<input id="a-wa" className="fi tnum" type="tel" inputMode="tel" autoComplete="tel" placeholder="+62 812 3456 7890" value={v.form.wa} onChange={v.on.wa} aria-invalid={v.inv.wa} />
{(v.errs.wa) ? (<><p className="err">{v.errs.wa}</p>
</>) : null}
</div>
<div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px"}}><div><label className="fl" htmlFor="a-crop">{v.t.form.crop}</label>
<select id="a-crop" className="fi" value={v.form.crop} onChange={v.on.crop} aria-invalid={v.inv.crop}><option value="">{v.t.form.cropPh}</option>
{(v.crops || []).map((c, c_i) => (<React.Fragment key={c_i}><option value={c.v}>{c.l}</option>
</React.Fragment>))}
</select>
{(v.errs.crop) ? (<><p className="err">{v.errs.crop}</p>
</>) : null}
</div>
<div><label className="fl" htmlFor="a-region">{v.t.form.region}</label>
<input id="a-region" className="fi" type="text" autoComplete="address-level1" placeholder={v.t.form.regionPh} value={v.form.region} onChange={v.on.region} />
</div>
</div>
<fieldset style={{border: "0", margin: "0", padding: "0"}}><legend className="fl" style={{padding: "0"}}>{v.t.form.role}</legend>
<div style={{display: "flex", gap: "8px", flexWrap: "wrap"}}>{(v.roles || []).map((r, r_i) => (<React.Fragment key={r_i}><button type="button" className={r.cls} aria-pressed={r.on} onClick={r.pick}>{r.l}</button>
</React.Fragment>))}
</div>
</fieldset>
<div><label style={{display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "12.5px", lineHeight: "1.5", color: "#342C2A", cursor: "pointer"}}><input type="checkbox" checked={!!v.form.agree} onChange={v.on.agree} style={{width: "20px", height: "20px", margin: "1px 0 0", accentColor: "#30318C", flex: "none"}} />{v.t.form.agree}</label>
{(v.errs.agree) ? (<><p className="err">{v.errs.agree}</p>
</>) : null}
</div>
<button type="submit" className="btn btn-p" disabled={v.sending} aria-busy={v.sending} style={{width: "100%", minHeight: "54px"}}>{(v.sending) ? (<><span className="spin" aria-hidden="true"></span>{v.t.form.sending}</>) : null}
{(v.idle) ? (<>{v.t.form.submit}<svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path>
</svg>
</>) : null}
</button>
</div>
</form>
</>) : null}
{(v.sent) ? (<><div role="status" className="in" style={{textAlign: "center", padding: "60px 8px"}}><div style={{width: "76px", height: "76px", margin: "0 auto", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#30318C", boxShadow: "0 0 0 10px rgba(48,49,140,.12)"}}><svg className="check" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path>
</svg>
</div>
<h2 style={{margin: "24px 0 0", fontSize: "24px", fontWeight: "600", color: "#06254F"}}>{v.t.form.okTitle}, {v.form.name}.</h2>
<p style={{margin: "12px auto 26px", maxWidth: "320px", fontSize: "14.5px", lineHeight: "1.6", color: "#342C2A"}}>{v.t.form.okBody}</p>
<a className="btn btn-p" href="/products">{v.t.form.okCta}</a>
</div>
</>) : null}
</div>
</div>
</section>
</div>
</>);
  }
}

export default AdsHero;
