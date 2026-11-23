'use client';
/* eslint-disable */
/* Generated from the design canvas (Nav.dc.html). */
import React from 'react';

class Nav extends React.Component {
  constructor(...a) {
    super(...a);
    this.state = { float: false, menu: false, narrow: false };
    this.setRoot = (el) => { this.root = el; };
    this.toggleMenu = () => this.setState((s) => ({ menu: !s.menu }));
    this.closeMenu = () => this.setState({ menu: false });
  }

  componentDidMount() {
    this._alive = true;
    this._onResize = () => { const n = (window.innerWidth || 1440) < 1040; if (n !== this.state.narrow) this.setState({ narrow: n, menu: n ? this.state.menu : false }); };
    window.addEventListener('resize', this._onResize);
    this._onResize();
    setTimeout(() => this.bindScroll(), 0);
  }

  componentWillUnmount() {
    this._alive = false;
    window.removeEventListener('resize', this._onResize);
    if (this._sc && this._onScroll) this._sc.removeEventListener('scroll', this._onScroll);
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
    this._onScroll = () => { const y = sc === window ? (window.scrollY || 0) : sc.scrollTop; const f = y > 40; if (f !== this.state.float) this.setState({ float: f }); };
    sc.addEventListener('scroll', this._onScroll, { passive: true });
    this._onScroll();
  }

  renderVals() {
    const active = this.props.active ?? 'home';
    const preview = this.props.preview ?? true;
    const narrow = this.state.narrow, menuOpen = this.state.menu && narrow;
    const f = this.state.float || menuOpen;
    const set = this.props.set ?? 'Story';
    const pages = [
      { k: 'home', label: 'Home', href: '/' },
      { k: 'about', label: 'About us', href: '/about' },
      { k: 'products', label: 'Products', href: '/products' }
    ];
    const links = pages.map((p) => {
      const on = p.k === active;
      return { href: p.href, label: p.label, cur: on ? 'page' : 'false', fw: on ? 600 : 500,
        c: on ? (f ? '#fff' : '#06254F') : (f ? '#06254F' : '#fff'),
        bg: on ? (f ? '#06254F' : '#fff') : 'transparent' };
    });
    const mlinks = pages.map((p) => {
      const on = p.k === active;
      return { href: p.href, label: p.label, cur: on ? 'page' : 'false', fw: on ? 600 : 400, c: on ? '#0070AC' : '#06254F' };
    });
    return {
      setRoot: this.setRoot, toggleMenu: this.toggleMenu, closeMenu: this.closeMenu,
      menu: this.state.menu, menuOpen, homeHref: '/',
      menuLabel: menuOpen ? 'Close menu' : 'Open menu',
      menuIcon: menuOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16',
      links, mlinks, cta: this.props.cta ?? '#contact',
      wrapH: preview ? '80px' : '0px', wrapBg: preview ? '#06254F' : 'transparent',
      hdrPad: f ? '14px 16px 0' : '0',
      navMw: f ? '1240px' : '100%', navH: f ? 66 : 80,
      navPad: f ? '0 10px 0 22px' : '0 max(24px, calc((100% - 1360px) / 2))',
      navR: f ? 999 : 0,
      navBg: f ? 'linear-gradient(150deg, rgba(255,255,255,.82), rgba(255,255,255,.6) 55%, rgba(255,255,255,.72))' : 'transparent',
      navBf: f ? 'blur(26px) saturate(180%)' : 'none',
      navSh: f ? 'inset 0 1px 1px rgba(255,255,255,.95), inset 0 0 0 1px rgba(255,255,255,.45), 0 24px 50px -24px rgba(6,37,79,.35)' : 'none',
      logoF: f ? 'none' : 'brightness(0) invert(1)',
      lw1: f ? '#06254F' : '#fff', lw2: f ? '#57504D' : 'rgba(255,255,255,.82)',
      deskFlex: narrow ? 'none' : 'flex', mobFlex: narrow ? 'flex' : 'none'
    };
  }

  render() {
    const v = this.renderVals();
    return (<><div className="nav" ref={v.setRoot} style={{position: "relative", height: v.wrapH, background: v.wrapBg, fontFamily: "'Noto Sans', system-ui, -apple-system, 'Segoe UI', sans-serif", color: "#06254F"}}>
<header style={{position: "fixed", top: "0", left: "0", right: "0", zIndex: "50", pointerEvents: "none", padding: v.hdrPad, transition: "padding .5s cubic-bezier(.2,.7,.2,1)"}}>
{(v.menuOpen) ? (<>
<div style={{position: "fixed", inset: "0", zIndex: "1", pointerEvents: "auto", padding: "108px 24px 32px", display: "flex", flexDirection: "column", gap: "6px", overflowY: "auto", background: "linear-gradient(160deg, rgba(255,255,255,.97), rgba(236,243,249,.95))", WebkitBackdropFilter: "blur(30px) saturate(180%)", backdropFilter: "blur(30px) saturate(180%)"}}>
{(v.mlinks || []).map((l, l_i1) => (<React.Fragment key={l_i1}><a href={l.href} aria-current={l.cur} onClick={v.closeMenu} style={{display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "64px", padding: "0 4px", borderBottom: "1px solid rgba(6,37,79,.1)", textDecoration: "none", fontSize: "30px", fontWeight: l.fw, letterSpacing: "-.02em", color: l.c}}>{l.label}<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a></React.Fragment>))}
<div style={{marginTop: "auto", paddingTop: "28px", display: "flex", flexDirection: "column", gap: "10px"}}>
<a href={v.cta} onClick={v.closeMenu} style={{display: "flex", alignItems: "center", justifyContent: "center", minHeight: "54px", borderRadius: "999px", background: "#30318C", color: "#fff", textDecoration: "none", fontSize: "16px", fontWeight: "600"}}>Contact us</a>
<a href="https://wa.me/6287783863777" target="_blank" rel="noopener" style={{display: "flex", alignItems: "center", justifyContent: "center", minHeight: "54px", borderRadius: "999px", background: "#fff", boxShadow: "inset 0 0 0 1.5px rgba(6,37,79,.25)", color: "#06254F", textDecoration: "none", fontSize: "16px", fontWeight: "600"}}>WhatsApp +62 877 8386 3777</a>
<p style={{margin: "12px 0 0", fontSize: "13px", lineHeight: "1.5", color: "#57504D", textAlign: "center"}}>PT Artha Prima Humatindo · Pekanbaru, Riau</p>
</div>
</div>
</>) : null}
<nav aria-label="Main" style={{zIndex: "2", position: "relative", pointerEvents: "auto", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", maxWidth: v.navMw, height: `${v.navH}px`, padding: v.navPad, borderRadius: `${v.navR}px`, background: v.navBg, WebkitBackdropFilter: v.navBf, backdropFilter: v.navBf, boxShadow: v.navSh, boxSizing: "border-box", transition: "max-width .55s cubic-bezier(.2,.7,.2,1), height .55s, padding .55s, border-radius .55s, background .4s, box-shadow .4s"}}>
<a href={v.homeHref} aria-label="Humatindo \u2014 home" style={{display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flex: "none"}}>
<img src="/img/logo-symbol.webp" alt="" style={{width: "34px", height: "auto", display: "block", filter: v.logoF, transition: "filter .4s"}} />
<span style={{display: "flex", flexDirection: "column", gap: "2px"}}><span style={{fontWeight: "700", fontSize: "16px", letterSpacing: ".04em", lineHeight: "1", color: v.lw1, transition: "color .4s"}}>HUMATINDO</span><span style={{fontWeight: "500", fontSize: "10.5px", letterSpacing: ".06em", lineHeight: "1", color: v.lw2, transition: "color .4s"}}>PT ARTHA PRIMA HUMATINDO</span></span>
</a>
<div style={{display: v.deskFlex, gap: "4px"}}>
{(v.links || []).map((l, l_i2) => (<React.Fragment key={l_i2}><a href={l.href} aria-current={l.cur} style={{display: "inline-flex", alignItems: "center", height: "40px", padding: "0 16px", borderRadius: "999px", textDecoration: "none", fontSize: "14.5px", fontWeight: l.fw, color: l.c, background: l.bg, transition: "background-color .3s, color .3s"}}>{l.label}</a></React.Fragment>))}
</div>
<div style={{display: "flex", alignItems: "center", gap: "8px"}}>
<a href={v.cta} style={{display: v.deskFlex, alignItems: "center", justifyContent: "center", minHeight: "44px", padding: "0 20px", borderRadius: "999px", background: "#30318C", color: "#fff", textDecoration: "none", fontSize: "14px", fontWeight: "600", whiteSpace: "nowrap"}}>Contact us</a>
<button type="button" aria-label={v.menuLabel} aria-expanded={v.menu} onClick={v.toggleMenu} style={{display: v.mobFlex, width: "44px", height: "44px", borderRadius: "50%", border: "0", background: "#fff", boxShadow: "inset 0 0 0 1.5px rgba(6,37,79,.3)", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#06254F", padding: "0"}}>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d={v.menuIcon}></path></svg>
</button>
</div>
</nav>
</header>
</div></>);
  }
}

export default Nav;
