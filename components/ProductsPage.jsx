'use client';
/* eslint-disable */
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../lib/gsap-global';


class ProductsPage extends React.Component {
  constructor(...a) {
    super(...a);
    this.state = { lang: 'en', menu: false, ckOpen: false, ckPrefs: false, prefs: { analytics: false, marketing: false }, line: 'all', crop: 'all', q: '', open: null, fx: 0 };
    this.setRoot = (el) => { this.root = el; };
    this.setCloseBtn = (el) => { this.closeBtn = el; };
  }

  componentDidMount() {
    this._alive = true;
    setTimeout(() => this.bindNav(), 0);
    let lang = 'en', consent = null;
    try { lang = localStorage.getItem('hm_lang') === 'id' ? 'id' : 'en'; } catch (e) {}
    try { consent = JSON.parse(localStorage.getItem('hm_consent') || 'null'); } catch (e) {}
    try { document.documentElement.lang = lang; } catch (e) {}
    this.setState({ lang, ckOpen: !consent, prefs: { analytics: !!(consent && consent.analytics), marketing: !!(consent && consent.marketing) } });
    this.markImgs();
    this._imgTimer = setTimeout(() => { if (this.root) this.root.querySelectorAll('img.fade').forEach((im) => im.classList.add('is-loaded')); }, 2500);
  }

  componentDidUpdate(pp, ps) {
    this.markImgs();
    if (this.state.open && !ps.open && this.closeBtn) { try { this.closeBtn.focus(); } catch (e) {} }
    if (!this.state.open && ps.open && this._opener) { try { this._opener.focus(); } catch (e) {} }
  }

  componentWillUnmount() { this._alive = false; if (this._navSc && this._onNav) this._navSc.removeEventListener('scroll', this._onNav); clearTimeout(this._imgTimer); }

  markImgs() {
    if (!this.root) return;
    this.root.querySelectorAll('img.fade').forEach((im) => { if (im.complete && im.naturalWidth > 0) im.classList.add('is-loaded'); });
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

  data() {
    if (this._data) return this._data;
    const I = {
      kasimulan: '/img/p-kasimulan.webp', microhumic: '/img/p-microhumic.webp', silikamino: '/img/p-silikamino.webp', calsilik: '/img/p-calsilik.webp',
      calshumat: '/img/p-calshumat.webp', samhumat: '/img/p-samhumat-liquid.webp', silikamat: '/img/p-silikamat.webp', borohumic: '/img/p-borohumic.webp',
      aminomicc: '/img/p-aminomicc.webp', terahumic: '/img/p-terahumic.webp', bag: '/img/p-samhumat-bag.webp'
    };
    this._data = [
      { key: 'kasimulan', name: 'KASIMULAN', line: 'premium', img: I.kasimulan, h: 260, bigH: 400, pack: '500 mL', crops: ['fruit', 'horti', 'plantation'], with: ['amino', 'p', 'zn', 'cu', 'fe', 'b'],
        comp: [['humicC', '≥ 20%'], ['ha', '± 13%'], ['fa', '± 7%'], ['amino', '± 15% v/v'], ['P₂O₅', '± 1%'], ['Zn²⁺', '± 2 000 ppm'], ['Cu²⁺ · Fe²⁺ · B', '± 1 000 ppm'], ['pH', '8–11']],
        en: { tag: 'Advanced biostimulant for fruit, tuber and flower', desc: 'Humic and fulvic acids from Sumatran lignite combined with P₂O₅, amino complex and chelated micronutrients. Helps move the products of photosynthesis into flowers, fruit and tubers.', ben: ['Stimulates fruit and tuber formation, filling and size', 'Faster, more uniform flowering with less flower drop', 'Safe for routine use without phytotoxicity'], crops: 'Cocoa, coffee, mango, mangosteen, durian, citrus, avocado, dragon fruit, cassava, sweet potato, ornamental plants', use: '1 L/ha. Spray 2–4 mL/L (250–500 L/ha). Every 30–90 days for fruit and plantation crops, 15–30 days for tubers.' },
        id: { tag: 'Biostimulan untuk buah, umbi, dan bunga', desc: 'Asam humat dan fulvat dari lignit Sumatera yang dikombinasikan dengan P₂O₅, amino kompleks, dan mikronutrien terkhelat. Membantu translokasi hasil fotosintesis menuju bunga, buah, dan umbi.', ben: ['Merangsang pembentukan, pengisian, dan pembesaran buah serta umbi', 'Pembungaan lebih cepat dan serempak, mengurangi kerontokan bunga', 'Aman diaplikasikan rutin tanpa efek fitotoksisitas'], crops: 'Kakao, kopi, mangga, manggis, durian, jeruk, alpukat, buah naga, ubi kayu, ubi jalar, tanaman hias', use: '1 L/ha. Semprot 2–4 mL/L (250–500 L/ha). Interval 30–90 hari untuk buah dan perkebunan, 15–30 hari untuk umbi.' } },
      { key: 'microhumic', name: 'MICROHUMIC', line: 'premium', img: I.microhumic, h: 260, bigH: 400, pack: '500 mL', crops: ['horti', 'fruit', 'plantation'], with: ['amino', 'fe', 'mn', 'zn', 'b', 'p'],
        en: { tag: 'Biostimulant for flowering and healthy leaf', desc: 'Available micronutrients in humic and amino acids. Micronutrients combined with humic and fulvic acids stimulate shoot growth, grain filling and photosynthesis, and thicken cell walls.', ben: ['Healthier, glossier leaves', 'Better resilience to pests and disease', 'Economical and safe at high application intensity'], crops: 'Shallot, garlic, chili, tomato, cabbage, potato, pepper, durian, citrus, banana, grape, mango, oil palm, coffee, cocoa, rubber', use: 'Spray 1–2 mL/L (1 L/ha) every 7–10 days for horticulture and every 15–30 days for fruit; 2–4 mL/L (2 L/ha) every 2–3 months for plantations.' },
        id: { tag: 'Biostimulan untuk pembungaan dan daun sehat', desc: 'Mikronutrien tersedia dalam asam humat dan asam amino. Perpaduan unsur mikro dengan asam humat dan fulvat merangsang pertumbuhan pucuk, pengisian bulir, dan fotosintesis, serta mempertebal dinding sel.', ben: ['Daun lebih sehat dan mengkilap', 'Lebih tahan terhadap hama dan penyakit', 'Ekonomis dan aman diaplikasikan intensif tanpa fitotoksisitas'], crops: 'Bawang merah, bawang putih, cabai, tomat, kubis, kentang, lada, durian, jeruk, pisang, anggur, mangga, kelapa sawit, kopi, kakao, karet', use: 'Semprot 1–2 mL/L (1 L/ha) setiap 7–10 hari untuk hortikultura dan 15–30 hari untuk buah; 2–4 mL/L (2 L/ha) setiap 2–3 bulan untuk perkebunan.' } },
      { key: 'silikamino', name: 'SILIKAMINO', line: 'premium', img: I.silikamino, h: 260, bigH: 400, pack: '500 mL', crops: ['palm', 'plantation'], with: ['amino', 'si', 'cu', 'zn'],
        comp: [['humicC', '≥ 23%'], ['ha', '± 17%'], ['fa', '± 6%'], ['amino', '± 15%'], ['si', '± 5 000 ppm'], ['Cu²⁺', '± 2 000 ppm'], ['Zn²⁺', '± 1 000 ppm'], ['pH', '8–11']],
        en: { tag: 'Palm family biostimulant', desc: 'A multi-action biostimulant combining humic compounds (17% humic, 6% fulvic acid), amino complex, monosilicic acid and chelated copper and zinc, formulated for the palm family, especially oil palm.', ben: ['Stimulates healthy new fronds and fruit bunch formation', 'Improves photosynthesis and fertilizer efficiency', 'Strengthens tissue against drought, extreme weather, pests and disease'], crops: 'Oil palm, sugar palm, salak, areca nut, date palm, sago, ornamental palms', use: '1 L/ha every 30–90 days. Spray 2–4 mL/L (250–500 L/ha) or 8–10 mL/L (40–50 L/ha).' },
        id: { tag: 'Biostimulan famili palma', desc: 'Biostimulan multi-aksi yang mengombinasikan senyawa humat (17% asam humat, 6% asam fulvat), amino kompleks, asam monosilikat, serta tembaga dan seng terkhelat, khusus untuk famili palma terutama kelapa sawit.', ben: ['Merangsang pelepah baru yang sehat dan pembentukan tandan buah', 'Meningkatkan efisiensi fotosintesis dan pemupukan', 'Memperkuat jaringan terhadap kekeringan, cuaca ekstrem, hama, dan penyakit'], crops: 'Kelapa sawit, kelapa aren, salak, pinang, kurma, sagu, palem', use: '1 L/ha setiap 30–90 hari. Semprot 2–4 mL/L (250–500 L/ha) atau 8–10 mL/L (40–50 L/ha).' } },
      { key: 'calsilik', name: 'CALSILIK', line: 'premium', img: I.calsilik, h: 260, bigH: 400, pack: '500 mL', crops: ['horti', 'food', 'fruit'], with: ['amino', 'ca', 'b', 'si'],
        comp: [['humicC', '≥ 23.47%'], ['ha', '± 16%'], ['fa', '± 7%'], ['amino', '± 15% v/v'], ['P₂O₅', '± 0.25%'], ['Fe²⁺', '± 2 000 ppm'], ['Mn²⁺ · Zn²⁺ · B', '± 1 500 ppm'], ['pH', '9–11']],
        en: { tag: 'Advanced biostimulant for horticulture', desc: 'Humic compounds with monosilicic acid, amino complex and chelated calcium and boron, designed for horticulture to support vegetative and generative growth and sturdier plant tissue.', ben: ['More uniform flowering and better fruit set', 'Less flower and young fruit drop', 'Sturdier plants, more resilient to stress'], crops: 'Cucumber, bitter gourd, melon, watermelon, chili, tomato, potato, shallot, eggplant, rice, corn, citrus, mango', use: '1 L/ha every 7–15 days for horticulture and food crops, every 30–90 days for fruit and plantation crops.' },
        id: { tag: 'Biostimulan untuk hortikultura', desc: 'Senyawa humat dengan asam monosilikat, amino kompleks, serta kalsium dan boron terkhelat, dirancang untuk hortikultura guna mendukung pertumbuhan vegetatif dan generatif serta jaringan tanaman yang lebih kokoh.', ben: ['Pembungaan lebih serempak dan fruit set lebih baik', 'Mengurangi kerontokan bunga dan bakal buah', 'Tanaman lebih kokoh dan tahan cekaman'], crops: 'Timun, paria, melon, semangka, cabai, tomat, kentang, bawang, terung, padi, jagung, jeruk, mangga', use: '1 L/ha setiap 7–15 hari untuk hortikultura dan tanaman pangan, setiap 30–90 hari untuk buah dan perkebunan.' } },
      { key: 'calshumat', name: 'CALSHUMAT', line: 'advanced', img: I.calshumat, h: 260, bigH: 400, pack: '500 mL', crops: ['fruit', 'horti', 'food'], with: ['ca', 'k'],
        en: { tag: 'Potassium calcium humate', desc: 'Formulated for dicot crops, where calcium and magnesium are key nutrients. Produces calcium pectate that strengthens the bonds between plant cells.', ben: ['Reduces flower and fruit drop', 'Stronger cells, more resistant to fruit and leaf rot', 'Improves soil aggregate and water retention'], crops: 'Durian, citrus, papaya, avocado, soybean, peanut, cashew, chili, eggplant, potato, melon, cucumber, bitter gourd', use: 'Drench 10–20 mL/L every 3–6 months for fruit trees and 3–10 mL/L every 2–4 weeks for vegetables and melons; spray 2–5 mL/L at 10 days after planting for legumes.' },
        id: { tag: 'Kalium kalsium humat', desc: 'Diformulasikan khusus untuk tanaman dikotil, yang mana Ca dan Mg sebagai sumber hara penting. Menghasilkan kalsium pektat yang memperkuat ikatan antar sel tanaman.', ben: ['Mengurangi kerontokan bunga dan buah', 'Sel lebih kuat, tahan busuk buah dan busuk daun', 'Memperbaiki agregat tanah dan retensi air'], crops: 'Durian, jeruk, pepaya, alpukat, kedelai, kacang tanah, mete, cabai, terung, kentang, melon, timun, paria', use: 'Kocor 10–20 mL/L setiap 3–6 bulan untuk tanaman buah dan 3–10 mL/L setiap 2–4 minggu untuk sayuran dan melon; semprot 2–5 mL/L pada 10 HST untuk kacang-kacangan.' } },
      { key: 'samhumat', name: 'SAMHUMAT', line: 'advanced', img: I.samhumat, h: 260, bigH: 400, pack: '500 mL', crops: ['food', 'horti', 'fruit'], with: ['si', 'ca', 'p'],
        en: { tag: 'Soil health biostimulant', desc: 'Liquid humic concentrate with 22% humic compounds that improves soil biology and chelates toxic Al³⁺ to keep soil pH stable, plus bio-available monosilicic acid, chelated calcium and phosphate.', ben: ['Raises soil CEC to hold nutrients and water', 'Optimises filling of grain, tubers and fruit', 'Helps prevent flower drop and improves harvest quality'], crops: 'Rice, corn, sugarcane, sorghum, shallot, garlic, tobacco, potato, cucumber, melon, durian, mango, citrus, avocado', use: 'Spray 1–2 mL/L every 15–25 days for food crops and 0.5–1 mL/L every 7–15 days for horticulture; drench 5–10 mL/L every 2–3 months for fruit trees. Can be mixed with synthetic fertilizer at 1–2%.' },
        id: { tag: 'Biostimulan kesehatan tanah', desc: 'Konsentrat humat cair dengan 22% senyawa humat yang meningkatkan kesehatan biologi tanah dan mengkhelat racun Al³⁺ sehingga pH tanah stabil, dilengkapi asam monosilikat, kalsium khelat, dan fosfat.', ben: ['Meningkatkan KTK tanah untuk menyimpan hara dan air', 'Mengoptimalkan pengisian bulir, umbi, dan buah', 'Membantu mencegah rontok bunga dan meningkatkan kualitas panen'], crops: 'Padi, jagung, tebu, sorgum, bawang merah, bawang putih, tembakau, kentang, timun, melon, durian, mangga, jeruk, alpukat', use: 'Semprot 1–2 mL/L setiap 15–25 hari untuk tanaman pangan dan 0,5–1 mL/L setiap 7–15 hari untuk hortikultura; kocor 5–10 mL/L setiap 2–3 bulan untuk tanaman buah. Dapat dicampur pupuk sintetis 1–2%.' } },
      { key: 'silikamat', name: 'SILIKAMAT', line: 'advanced', img: I.silikamat, h: 260, bigH: 400, pack: '500 mL', crops: ['food', 'horti', 'fruit'], with: ['si', 'b', 'p'],
        en: { tag: 'Potassium humate with mono-silicate', desc: 'Supplies silicon as Si(OH)₄, absorbed through the leaves, especially by monocot crops, to strengthen cell walls and support photosynthesis.', ben: ['Supports panicle formation and grain filling', 'More flexible stems and more rice tillers', 'Resilience to extreme temperature, low water and soil pathogens'], crops: 'Rice, corn, sugarcane, sorghum, shallot, garlic, tobacco, potato, cucumber, melon, durian, mango, citrus, avocado', use: 'Food crops 1–2 mL/L (1 L/ha) and horticulture 0.5–1 mL/L (500 mL/ha) every 7–15 days; fruit 3–4 mL/L (2 L/ha) every 2–3 months.' },
        id: { tag: 'Kalium humat dengan mono-silikat', desc: 'Menyediakan silikat (Si) dalam bentuk Si(OH)₄ yang diserap melalui daun, terutama tanaman monokotil, untuk penguatan dinding sel dan aktivitas fotosintesis.', ben: ['Menunjang pembentukan malai dan pengisian bulir', 'Batang lebih lentur dan anakan padi lebih banyak', 'Tahan suhu ekstrem, kekurangan air, dan patogen tanah'], crops: 'Padi, jagung, tebu, sorgum, bawang merah, bawang putih, tembakau, kentang, timun, melon, durian, mangga, jeruk, alpukat', use: 'Tanaman pangan 1–2 mL/L (1 L/ha) dan hortikultura 0,5–1 mL/L (500 mL/ha) setiap 7–15 hari; buah 3–4 mL/L (2 L/ha) setiap 2–3 bulan.' } },
      { key: 'borohumic', name: 'BOROHUMIC', line: 'advanced', img: I.borohumic, h: 248, bigH: 380, pack: '500 mL', crops: ['horti', 'fruit', 'plantation'], with: ['b', 'p'],
        en: { tag: 'Borate potassium humate', desc: 'Provides boron and potassium that are absorbed quickly to strengthen cell walls and cell elongation, and to maximise leaf and shoot growth.', ben: ['Glossier leaves, better aroma and oil content', 'Stimulates flowering and improves fruit quality and shape', 'Resilience against aphids, mites and leaf blight'], crops: 'Chili, tomato, eggplant, strawberry, bell pepper, durian, mangosteen, mango, avocado, citrus, papaya, oil palm, coffee, cocoa, rubber', use: 'Spray 0.5–1 mL/L every 7–15 days for vegetables; drench 5–10 mL/L every 1–2 months for fruit trees; drench every 3–4 months for plantation crops.' },
        id: { tag: 'Kalium humat borat', desc: 'Menyediakan boron dan kalium yang cepat diserap untuk memperkuat dinding sel, pemanjangan sel, serta memaksimalkan pertumbuhan daun dan pucuk.', ben: ['Daun lebih mengkilap, aroma dan kadar minyak meningkat', 'Merangsang bunga serta meningkatkan kualitas dan bentuk buah', 'Tahan terhadap kutu daun, tungau, dan hawar daun'], crops: 'Cabai, tomat, terung, stroberi, paprika, durian, manggis, mangga, alpukat, jeruk, pepaya, kelapa sawit, kopi, kakao, karet', use: 'Semprot 0,5–1 mL/L setiap 7–15 hari untuk sayuran; kocor 5–10 mL/L setiap 1–2 bulan untuk tanaman buah; kocor setiap 3–4 bulan untuk perkebunan.' } },
      { key: 'aminomicc', name: 'AMINOMICC', line: 'specialty', img: I.aminomicc, h: 260, bigH: 400, pack: '500 mL', crops: ['food', 'horti', 'fruit'], with: ['aa', 'cu', 'fulvic'],
        en: { tag: 'Amino acid and copper biostimulant', desc: 'Amino acids stimulate growth and flowering and optimise fruit shape, colour, taste and aroma. Copper (Cu²⁺) supports immunity against fungal, bacterial and viral disease, with humic acid as a biocatalyst.', ben: ['Better fruit shape, colour, taste and aroma', 'Longer fruit shelf life', 'Fulvic acid stimulates germination and growth'], crops: 'Rice, corn, porang, legumes, chili, potato, tomato, eggplant, cucumber, melon, watermelon, strawberry, fruit trees', use: 'Spray 1–2 mL/L every 7–14 days for food crops and horticulture; drench 3–5 mL/L every 15–30 days.' },
        id: { tag: 'Biostimulan asam amino dan tembaga', desc: 'Asam amino menjadi biostimulan pertumbuhan, pembungaan, serta optimalisasi bentuk, warna, rasa, dan aroma buah. Tembaga (Cu²⁺) meningkatkan imunitas terhadap penyakit akibat jamur, bakteri, dan virus, dengan asam humat sebagai biokatalisator.', ben: ['Bentuk, warna, rasa, dan aroma buah lebih baik', 'Masa simpan buah lebih panjang', 'Asam fulvat merangsang perkecambahan dan pertumbuhan'], crops: 'Padi, jagung, porang, kacang-kacangan, cabai, kentang, tomat, terung, timun, melon, semangka, stroberi, tanaman buah', use: 'Semprot 1–2 mL/L setiap 7–14 hari untuk tanaman pangan dan hortikultura; kocor 3–5 mL/L setiap 15–30 hari.' } },
      { key: 'terahumic', name: 'TERAHUMIC', line: 'specialty', img: I.terahumic, h: 260, bigH: 400, pack: '500 mL', crops: ['food', 'horti', 'fruit', 'plantation'], with: ['si', 'ca'],
        en: { tag: 'Liquid humic soil conditioner', desc: 'A biostimulant from humic substances, essential for soil fertility and plant health, extracted from high-quality Sumatran leonardite and lignite with a balanced humic and fulvic acid content.', ben: ['Raises soil CEC to hold nutrients and water', 'Improves soil biology and stabilises pH', 'Increases resistance to abiotic and biotic stress'], crops: 'Food crops, horticulture, fruit trees and plantations', use: 'See the product sheet for dose and interval by crop.' },
        id: { tag: 'Pembenah tanah senyawa humat cair', desc: 'Biostimulan dari senyawa humat yang penting bagi kesuburan tanah dan kesehatan tanaman, diekstraksi dari leonardit dan lignit Sumatera berkualitas tinggi dengan kandungan asam humat dan fulvat yang seimbang.', ben: ['Meningkatkan KTK tanah untuk menyimpan hara dan air', 'Memperbaiki biologi tanah dan menstabilkan pH', 'Meningkatkan ketahanan terhadap cekaman abiotik dan biotik'], crops: 'Tanaman pangan, hortikultura, tanaman buah, dan perkebunan', use: 'Lihat lembar produk untuk dosis dan interval per tanaman.' } },
      { key: 'samhumat-bc', name: 'SAMHUMAT BASIC COMPOUND', line: 'specialty', img: I.bag, h: 270, bigH: 400, pack: '10 kg', crops: ['food', 'horti', 'fruit', 'plantation'], with: ['ha', 'fa'],
        en: { tag: 'Powdered organic fertilizer with humates', desc: 'A powdered soil conditioner with humic and fulvic acids that improves soil biology, chelates toxic Al³⁺ and releases OH⁻ ions to stabilise soil pH.', ben: ['Improves water retention, porosity and soil aggregate', 'Raises CEC so crops absorb nutrients better', 'Helps reduce the amount of synthetic fertilizer needed'], crops: 'Food crops, vegetables, flowers, fruit trees and plantations', use: 'Blend 500 g with every 50–100 kg of synthetic fertilizer, or dissolve 1–2 g/L for drenching or spraying.' },
        id: { tag: 'Pupuk organik tepung mengandung humat', desc: 'Pembenah tanah berbentuk tepung dengan asam humat dan fulvat yang meningkatkan kesehatan biologi tanah, mengkhelat racun Al³⁺, dan melepas ion OH⁻ sehingga pH tanah stabil.', ben: ['Meningkatkan retensi air, porositas, dan agregat tanah', 'Meningkatkan KTK sehingga hara lebih mudah diserap', 'Membantu menurunkan jumlah pupuk sintetis yang dibutuhkan'], crops: 'Tanaman pangan, sayuran, bunga, tanaman buah, dan perkebunan', use: 'Campurkan 500 g untuk setiap 50–100 kg pupuk sintetis, atau larutkan 1–2 g/L untuk pengocoran atau penyemprotan.' } }
    ];
    return this._data;
  }

  dict() {
    if (this._d) return this._d;
    this._d = {
      en: {
        nav: { aria: 'Main', home: 'Home', products: 'Products', about: 'About us', contact: 'Contact', cta: 'Request product sheet', menu: 'Open menu', lang: 'Language' },
        hero: { browse: 'Browse all products', k3: 'product lines', fm: 'formulas', h1a: '11 humic biostimulants,', h1b: 'matched to your crop.', sub: 'Humic and fulvic acids from Sumatran lignite, enriched for specific crop needs. Filter by product line or crop to find the right formula.' },
        lines: { all: 'All products', premium: 'Premium Biostimulant', advanced: 'Advanced Biostimulant', specialty: 'Soil & Specialty' },
        lineDesc: { all: 'Every formula starts with humic and fulvic acids extracted from Sumatran lignite.', premium: 'Crop-targeted formulas enriched with amino complex and chelated micronutrients.', advanced: 'Potassium humate formulas enriched with calcium, mono-silicate or boron.', specialty: 'Soil conditioners in liquid and powder form, plus an amino-acid and copper formula.' },
        crops: { all: 'All crops', food: 'Food crops', horti: 'Horticulture', fruit: 'Fruit', plantation: 'Plantation', palm: 'Palm family' },
        withK: { amino: 'amino complex', p: 'phosphate', zn: 'zinc', cu: 'copper', fe: 'iron', b: 'boron', mn: 'manganese', si: 'mono-silicate', ca: 'calcium', k: 'potassium', aa: 'amino acids', fulvic: 'fulvic acid', ha: 'humic acid', fa: 'fulvic acid' },
        compK: { humicC: 'Humic compounds', ha: 'Humic acid', fa: 'Fulvic acid', amino: 'Amino complex', si: 'Monosilicic acid Si(OH)₄' },
        f: { lineLabel: 'Product line', cropLabel: 'Crop', search: 'Search products', searchPh: 'Search by name or crop…', results: 'products', gridLabel: 'Product list', withPre: 'With ', view: 'View details:', sheetLong: 'Request the product sheet', back: 'Back to products', close: 'Close', crops: 'Target crops', use: 'How to use', comp: 'Composition', compNote: 'Full composition and registration details are in the product sheet. Request it and our team will send it on WhatsApp.', emptyH: 'No products match these filters', emptyB: 'Try another crop or clear the filters.', clear: 'Clear filters' },
        req: { h: 'Not sure which product fits your land?', b: 'Start with the crop and its stage of growth. Tell us on WhatsApp and we will recommend a formula and send the product sheet.', wa: 'Chat on WhatsApp' },
        footer: { brief: 'Long-term agricultural solutions that protect and restore farmland, and reduce reliance on synthetic fertilizers for more fertile soil and productive harvests.', explore: 'Explore', hq: 'Head office & factory', branch: 'Branch warehouse', contact: 'Contact', cert: 'ISO 9001 · SGS', rights: 'All rights reserved.', privacy: 'Privacy policy', cookies: 'Cookie settings' },
        ck: { title: 'We value your privacy', body: 'We use necessary cookies to run this site. With your permission we also use analytics and advertising cookies, including Google Ads, to understand visits and measure our campaigns.', accept: 'Accept all', reject: 'Reject optional', manage: 'Manage preferences', save: 'Save choices', nec: 'Necessary', necD: 'Security, language and consent settings.', always: 'Always on', ana: 'Analytics', anaD: 'Anonymous visit statistics.', mkt: 'Marketing', mktD: 'Google Ads conversion and remarketing.' },
        wa: 'Hello Humatindo, I would like a product recommendation for my land.',
        waProduct: 'Hello Humatindo, I would like the product sheet for '
      },
      id: {
        nav: { aria: 'Utama', home: 'Beranda', products: 'Produk', about: 'Tentang kami', contact: 'Kontak', cta: 'Minta lembar produk', menu: 'Buka menu', lang: 'Bahasa' },
        hero: { browse: 'Lihat semua produk', k3: 'lini produk', fm: 'formula', h1a: '11 biostimulan humat,', h1b: 'sesuai tanaman Anda.', sub: 'Asam humat dan fulvat dari lignit Sumatera yang diperkaya sesuai kebutuhan tanaman. Saring berdasarkan lini produk atau tanaman untuk menemukan formula yang tepat.' },
        lines: { all: 'Semua produk', premium: 'Premium Biostimulan', advanced: 'Advanced Biostimulan', specialty: 'Pembenah Tanah & Spesialis' },
        lineDesc: { all: 'Setiap formula berawal dari asam humat dan fulvat hasil ekstraksi lignit Sumatera.', premium: 'Formula spesifik tanaman yang diperkaya amino kompleks dan mikronutrien terkhelat.', advanced: 'Formula kalium humat yang diperkaya kalsium, mono-silikat, atau boron.', specialty: 'Pembenah tanah berbentuk cair dan tepung, serta formula asam amino dan tembaga.' },
        crops: { all: 'Semua tanaman', food: 'Tanaman pangan', horti: 'Hortikultura', fruit: 'Buah-buahan', plantation: 'Perkebunan', palm: 'Famili palma' },
        withK: { amino: 'amino kompleks', p: 'fosfat', zn: 'seng', cu: 'tembaga', fe: 'besi', b: 'boron', mn: 'mangan', si: 'mono-silikat', ca: 'kalsium', k: 'kalium', aa: 'asam amino', fulvic: 'asam fulvat', ha: 'asam humat', fa: 'asam fulvat' },
        compK: { humicC: 'Senyawa humat', ha: 'Asam humat', fa: 'Asam fulvat', amino: 'Amino kompleks', si: 'Asam monosilikat Si(OH)₄' },
        f: { lineLabel: 'Lini produk', cropLabel: 'Tanaman', search: 'Cari produk', searchPh: 'Cari nama atau tanaman…', results: 'produk', gridLabel: 'Daftar produk', withPre: 'Dengan ', view: 'Lihat detail:', sheetLong: 'Minta lembar produk', back: 'Kembali ke produk', close: 'Tutup', crops: 'Sasaran tanaman', use: 'Cara pakai', comp: 'Komposisi', compNote: 'Komposisi lengkap dan informasi izin edar ada di lembar produk. Minta lembar produk dan tim kami akan mengirimkannya via WhatsApp.', emptyH: 'Tidak ada produk yang cocok', emptyB: 'Coba tanaman lain atau hapus filter.', clear: 'Hapus filter' },
        req: { h: 'Belum yakin produk mana yang cocok untuk lahan Anda?', b: 'Mulai dari tanaman dan fase pertumbuhannya. Ceritakan lewat WhatsApp, kami akan merekomendasikan formula dan mengirimkan lembar produknya.', wa: 'Chat via WhatsApp' },
        footer: { brief: 'Solusi pertanian jangka panjang untuk menjaga dan memperbaiki kualitas lahan, serta menurunkan pemakaian pupuk sintetis demi kesuburan tanah dan produktivitas panen.', explore: 'Jelajahi', hq: 'Kantor pusat & pabrik', branch: 'Gudang cabang', contact: 'Kontak', cert: 'ISO 9001 · SGS', rights: 'Hak cipta dilindungi.', privacy: 'Kebijakan privasi', cookies: 'Pengaturan cookie' },
        ck: { title: 'Kami menghargai privasi Anda', body: 'Kami menggunakan cookie yang diperlukan agar situs ini berjalan. Dengan izin Anda, kami juga menggunakan cookie analitik dan iklan, termasuk Google Ads, untuk memahami kunjungan dan mengukur kampanye kami.', accept: 'Terima semua', reject: 'Tolak opsional', manage: 'Atur preferensi', save: 'Simpan pilihan', nec: 'Diperlukan', necD: 'Keamanan, bahasa, dan pengaturan persetujuan.', always: 'Selalu aktif', ana: 'Analitik', anaD: 'Statistik kunjungan anonim.', mkt: 'Pemasaran', mktD: 'Konversi dan remarketing Google Ads.' },
        wa: 'Halo Humatindo, saya ingin rekomendasi produk untuk lahan saya.',
        waProduct: 'Halo Humatindo, saya ingin meminta lembar produk '
      }
    };
    return this._d;
  }

  renderVals() {
    const L = this.state.lang === 'id' ? 'id' : 'en';
    const t = this.dict()[L];
    const wa = 'https://wa.me/6287783863777?text=';
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
        toggleMkt: () => this.setState((s) => ({ prefs: Object.assign({}, s.prefs, { marketing: !s.prefs.marketing }) })),
        onQ: (ev) => { const v = ev.target.value; this.setState((s) => ({ q: v, fx: s.fx + 1 })); },
        clearAll: () => this.setState((s) => ({ q: '', line: 'all', crop: 'all', fx: s.fx + 1 })),
        closeModal: () => this.setState({ open: null }),
        onModalKey: (ev) => { if (ev.key === 'Escape') this.setState({ open: null }); }
      };
    }
    const fmt = (v) => (L === 'id' ? String(v).replace(/(\d)\.(\d)/g, '$1,$2') : v);
    const lineLabel = { premium: t.lines.premium, advanced: t.lines.advanced, specialty: t.lines.specialty };
    const view = (p) => {
      const x = p[L];
      const w = p.with.map((k) => t.withK[k]);
      return {
        key: p.key, bg: p.line === 'specialty' ? '/img/moss-warm-sm.webp' : '/img/moss-blue-real-sm.webp', name: p.name, img: p.img, h: p.h, bigH: p.bigH, pack: p.pack, alt: p.name + ' ' + p.pack,
        lineLabel: lineLabel[p.line], viewLabel: t.f.view + ' ' + p.name,
        tag: x.tag, desc: x.desc, ben: x.ben, crops: x.crops, use: x.use,
        withText: t.f.withPre + w.join(', '),
        comp: (p.comp || []).map((r) => ({ k: t.compK[r[0]] || r[0], v: fmt(r[1]) })),
        hasComp: !!p.comp, noComp: !p.comp,
        wa: wa + encodeURIComponent(t.waProduct + p.name + '.')
      };
    };
    const q = (this.state.q || '').trim().toLowerCase();
    const list = this.data().filter((p) => {
      if (this.state.line !== 'all' && p.line !== this.state.line) return false;
      if (this.state.crop !== 'all' && p.crops.indexOf(this.state.crop) < 0) return false;
      if (q) {
        const hay = (p.name + ' ' + p.en.tag + ' ' + p.id.tag + ' ' + p.en.crops + ' ' + p.id.crops).toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    const items = list.map((p) => {
      const v = view(p);
      v.open = (ev) => { this._opener = ev && ev.currentTarget; this.setState({ open: p.key }); };
      return v;
    });
    const lineTabs = ['all', 'premium', 'advanced', 'specialty'].map((k) => ({ l: t.lines[k], on: this.state.line === k, cls: this.state.line === k ? 'tab on' : 'tab', pick: () => this.setState((s) => ({ line: k, fx: s.fx + 1 })) }));
    const cropChips = ['all', 'food', 'horti', 'fruit', 'plantation', 'palm'].map((k) => ({ l: t.crops[k], on: this.state.crop === k, cls: this.state.crop === k ? 'cf on' : 'cf', pick: () => this.setState((s) => ({ crop: k, fx: s.fx + 1 })) }));
    const openP = this.state.open ? this.data().find((p) => p.key === this.state.open) : null;
    const m = openP ? view(openP) : { ben: [], comp: [], hasComp: false, noComp: true };
    const pr = this.state.prefs;
    return Object.assign({}, this._h, {
      setRoot: this.setRoot, hdrCls: this.state.navFloat ? 'hdr float' : 'hdr', navCls: this.state.navFloat ? 'nav float lg' : 'nav', setCloseBtn: this.setCloseBtn,
      t, items, lineTabs, cropChips, count: items.length, empty: items.length === 0,
      cntCls: 'cnt' + (this.state.fx % 2),
      lineDesc: t.lineDesc[this.state.line],
      q: this.state.q,
      modal: !!openP, m,
      isEn: L === 'en', isId: L === 'id', thumbX: L === 'en' ? 0 : 40,
      segEn: L === 'en' ? 'seg on' : 'seg', segId: L === 'id' ? 'seg on' : 'seg',
      menu: this.state.menu,
      ckOpen: this.state.ckOpen, ckPrefs: this.state.ckPrefs, ckSimple: !this.state.ckPrefs,
      prefs: pr,
      sw: { a: pr.analytics ? '#30318C' : '#C9D1DB', ax: pr.analytics ? 18 : 0, m: pr.marketing ? '#30318C' : '#C9D1DB', mx: pr.marketing ? 18 : 0 },
      waHref: wa + encodeURIComponent(t.wa)
    });
  }

  render() {
    const v = this.renderVals();
    return (<><div ref={v.setRoot} style={{position: "relative", minHeight: "100%", overflowX: "clip", background: "#F4F7FA"}}><Navbar lang={v.isId ? "id" : "en"} onLang={(l) => (l === "id" ? v.setId() : v.setEn())} active="products" ctaHref="#request" />
<main><section aria-labelledby="pg-title" style={{padding: "108px 20px 20px"}}><div className="wrap in" style={{position: "relative", borderRadius: "32px", overflow: "hidden", minHeight: "600px", background: "#2b3a1c"}}><img src="/img/moss-blue-real.webp" alt="" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover"}} />
<div style={{position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(4,20,12,.72) 0%, rgba(4,20,12,.35) 45%, rgba(4,20,12,0) 70%), linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,.4))"}}></div>
<div style={{position: "relative", minHeight: "600px", padding: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: "24px", alignItems: "end"}}><div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", gap: "40px"}}><div style={{display: "flex", gap: "8px", flexWrap: "wrap"}}><span className="lg" style={{height: "36px", padding: "0 16px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "13px", fontWeight: "600", color: "#06254F"}}>{v.t.lines.premium}</span>
<span style={{height: "36px", padding: "0 16px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "13px", fontWeight: "500", color: "#fff", background: "rgba(255,255,255,.16)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)"}}>{v.t.lines.advanced}</span>
<span style={{height: "36px", padding: "0 16px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "13px", fontWeight: "500", color: "#fff", background: "rgba(255,255,255,.16)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)"}}>{v.t.lines.specialty}</span>
</div>
<div><h1 id="pg-title" style={{margin: "0", fontSize: "clamp(44px, 5.4vw, 80px)", lineHeight: "1.02", letterSpacing: "-.03em", fontWeight: "700", color: "#fff"}}>{v.t.hero.h1a} <span style={{color: "#6FD0FF"}}>{v.t.hero.h1b}</span>
</h1>
<p style={{margin: "18px 0 0", maxWidth: "480px", fontSize: "17px", lineHeight: "1.6", color: "rgba(255,255,255,.88)"}}>{v.t.hero.sub}</p>
<div style={{marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap"}}><a className="btn btn-w" href="/products">{v.t.hero.browse}<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path>
</svg>
</a>
<a className="btn" href={v.waHref} target="_blank" rel="noopener" style={{color: "#fff", background: "rgba(255,255,255,.16)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)"}}>{v.t.nav.cta}</a>
</div>
</div>
</div>
<div className="hide-md" style={{position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "10px"}}><div style={{position: "absolute", left: "50%", bottom: "150px", transform: "translateX(-50%) rotate(5deg)", zIndex: "0"}}><div className="float" style={{animationDelay: "-2.4s"}}><img src="/img/p-samhumat-bag.webp" alt="SAMHUMAT Basic Compound 10 kg" style={{height: "360px", width: "auto", display: "block", filter: "drop-shadow(0 26px 22px rgba(0,0,0,.5)) brightness(.95)"}} />
</div>
</div>
<div style={{position: "relative", zIndex: "1", marginRight: "-30px", marginBottom: "30px"}}><div className="float" style={{animationDelay: "-1.6s"}}><img src="/img/p-kasimulan-hd.webp" alt="KASIMULAN 500 mL" style={{height: "300px", width: "auto", display: "block", transform: "rotate(-8deg)", filter: "drop-shadow(0 26px 22px rgba(0,0,0,.5))"}} />
</div>
</div>
<div style={{position: "relative", zIndex: "2"}}><div className="float" style={{animationDelay: "-0.1s"}}><img src="/img/p-silikamino-hd.webp" alt="SILIKAMINO 500 mL" style={{height: "400px", width: "auto", display: "block", transform: "rotate(0deg)", filter: "drop-shadow(0 26px 22px rgba(0,0,0,.5))"}} />
</div>
</div>
<div style={{position: "relative", zIndex: "1", marginLeft: "-30px", marginBottom: "40px"}}><div className="float" style={{animationDelay: "-0.8s"}}><img src="/img/p-microhumic-hd.webp" alt="MICROHUMIC 500 mL" style={{height: "290px", width: "auto", display: "block", transform: "rotate(8deg)", filter: "drop-shadow(0 26px 22px rgba(0,0,0,.5))"}} />
</div>
</div>
<div className="lg" style={{position: "absolute", right: "0", top: "0", borderRadius: "22px", padding: "16px 20px", color: "#fff", background: "rgba(255,255,255,.14)"}}><div className="tnum" style={{fontSize: "34px", fontWeight: "700", lineHeight: "1"}}>11</div>
<div style={{marginTop: "6px", fontSize: "13px"}}>{v.t.hero.k1}</div>
</div>
</div>
</div>
</div>
</section>
<section aria-label={v.t.f.gridLabel} style={{padding: "10px 24px 110px"}}><div className="wrap"><div style={{display: "flex", flexWrap: "wrap", gap: "16px 32px", alignItems: "center", justifyContent: "space-between"}}><div role="group" aria-label={v.t.f.lineLabel} style={{display: "flex", gap: "28px", overflowX: "auto", maxWidth: "100%"}}>{(v.lineTabs || []).map((c, c_i) => (<React.Fragment key={c_i}><button type="button" className={c.cls} aria-pressed={c.on} onClick={c.pick}>{c.l}</button>
</React.Fragment>))}
</div>
<div style={{position: "relative", flex: "0 1 340px", minWidth: "240px"}}><label htmlFor="psearch" style={{position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)"}}>{v.t.f.search}</label>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#57504D" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" style={{position: "absolute", left: "19px", top: "16px"}}><circle cx="11" cy="11" r="7"></circle>
<path d="M20 20l-3.5-3.5"></path>
</svg>
<input id="psearch" className="fs" type="search" placeholder={v.t.f.searchPh} value={v.q} onChange={v.onQ} />
</div>
</div>
<div role="group" aria-label={v.t.f.cropLabel} style={{marginTop: "18px", display: "flex", flexWrap: "wrap", gap: "8px"}}>{(v.cropChips || []).map((c, c_i) => (<React.Fragment key={c_i}><button type="button" className={c.cls} aria-pressed={c.on} onClick={c.pick}>{c.l}</button>
</React.Fragment>))}
</div>
<p aria-live="polite" style={{margin: "28px 0 0", fontSize: "15px", color: "#342C2A"}}><strong className={`tnum ${v.cntCls}`} style={{color: "#06254F", fontWeight: "600"}}>{v.count}</strong> {v.t.f.results} · <span style={{color: "#57504D"}}>{v.lineDesc}</span>
</p>
<div style={{marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "48px 28px"}}>{(v.items || []).map((p, p_i) => (<React.Fragment key={p_i}><article className="pop" style={{display: "flex", flexDirection: "column"}}><button type="button" className="plate" tabIndex="-1" aria-hidden="true" onClick={p.open}><img className="pbg" src={p.bg} alt="" />
<span className="cs"></span>
<img className="fade" onLoad={v.onImg} src={p.img} alt="" loading="lazy" style={{height: `${p.h}px`}} />
</button>
<div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginTop: "20px"}}><div style={{minWidth: "0"}}><p style={{margin: "0", fontSize: "13px", fontWeight: "500", color: "#0070AC"}}>{p.lineLabel} · <span className="tnum">{p.pack}</span>
</p>
<h2 className="h3" style={{marginTop: "6px", fontSize: "21px", letterSpacing: ".03em"}}>{p.name}</h2>
<p className="p" style={{marginTop: "4px", fontSize: "15px"}}>{p.tag}</p>
</div>
<button type="button" className="plus" onClick={p.open} aria-label={p.viewLabel}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path>
</svg>
</button>
</div>
<p style={{margin: "10px 0 0", fontSize: "13.5px", lineHeight: "1.55", color: "#57504D"}}>{p.withText}</p>
</article>
</React.Fragment>))}
</div>
{(v.empty) ? (<><div className="pop" style={{padding: "60px 24px", textAlign: "center"}}><h2 className="h3" style={{fontSize: "22px"}}>{v.t.f.emptyH}</h2>
<p className="p" style={{margin: "10px 0 22px"}}>{v.t.f.emptyB}</p>
<button type="button" className="btn btn-p" onClick={v.clearAll}>{v.t.f.clear}</button>
</div>
</>) : null}
</div>
</section>
<section id="request" aria-labelledby="req-title" style={{padding: "0 24px 100px", scrollMarginTop: "90px"}}><div className="wrap" style={{position: "relative", borderRadius: "36px", overflow: "hidden", background: "#DDE7E0"}}><img className="fade" onLoad={v.onImg} src="/img/field.webp" alt="" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% 100%"}} />
<div style={{position: "absolute", inset: "0", background: "linear-gradient(90deg, rgba(244,247,250,.95) 0%, rgba(244,247,250,.75) 40%, rgba(244,247,250,0) 68%)"}}></div>
<div style={{position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "24px", alignItems: "end"}}><div style={{padding: "clamp(28px, 4vw, 60px)", maxWidth: "560px"}}><h2 id="req-title" className="h2">{v.t.req.h}</h2>
<p className="lead" style={{marginTop: "16px", fontSize: "17px"}}>{v.t.req.b}</p>
<div style={{marginTop: "28px", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center"}}><a className="btn btn-p" href={v.waHref} target="_blank" rel="noopener">{v.t.req.wa}<svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path>
</svg>
</a>
<a className="link" href="mailto:sales@humatindo.com">sales@humatindo.com</a>
</div>
</div>
<div className="hide-md" style={{display: "flex", justifyContent: "center", alignItems: "flex-end"}}><img className="fade" onLoad={v.onImg} src="/img/apri-point.webp" alt="" style={{height: "380px", width: "auto", display: "block"}} />
</div>
</div>
</div>
</section>
</main>
<Footer lang={v.isId ? "id" : "en"} onCookies={v.openCookies} />
{(v.modal) ? (<><div role="dialog" aria-modal="true" aria-labelledby="pm-title" onKeyDown={v.onModalKey} style={{position: "fixed", inset: "0", zIndex: "80", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"}}><button type="button" tabIndex="-1" aria-label={v.t.f.close} onClick={v.closeModal} style={{position: "absolute", inset: "0", border: "0", cursor: "pointer", background: "rgba(6,37,79,.4)", WebkitBackdropFilter: "blur(10px)", backdropFilter: "blur(10px)"}}></button>
<div className="lg pop" style={{position: "relative", width: "100%", maxWidth: "1060px", maxHeight: "calc(100% - 24px)", overflow: "auto", borderRadius: "32px", padding: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "28px", background: "linear-gradient(150deg, rgba(255,255,255,.94), rgba(255,255,255,.84))"}}><div style={{position: "relative", overflow: "hidden", minHeight: "440px", borderRadius: "16px", background: "#2f3d22", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "30px"}}><img src={v.m.bg} alt="" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover"}} />
<div className="float"><img src={v.m.img} alt={v.m.alt} style={{height: `${v.m.bigH}px`, maxHeight: "100%", width: "auto", display: "block", filter: "drop-shadow(0 26px 24px rgba(6,37,79,.28))"}} />
</div>
<div className="gshadow" style={{width: "180px", marginTop: "6px"}}></div>
</div>
<div style={{padding: "16px 12px 12px"}}><div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px"}}><p style={{margin: "0", fontSize: "13.5px", fontWeight: "500", color: "#0070AC"}}>{v.m.lineLabel} · <span className="tnum">{v.m.pack}</span>
</p>
<button type="button" ref={v.setCloseBtn} className="plus" aria-label={v.t.f.close} onClick={v.closeModal} style={{width: "44px", height: "44px"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path>
</svg>
</button>
</div>
<h2 id="pm-title" style={{margin: "2px 0 0", fontSize: "clamp(30px, 3vw, 40px)", fontWeight: "700", letterSpacing: ".01em", color: "#06254F", lineHeight: "1.1"}}>{v.m.name}</h2>
<p style={{margin: "6px 0 0", fontSize: "16px", fontWeight: "500", color: "#342C2A"}}>{v.m.tag}</p>
<p className="p" style={{marginTop: "16px"}}>{v.m.desc}</p>
<ul style={{listStyle: "none", padding: "0", margin: "20px 0 0", display: "grid", gap: "10px"}}>{(v.m.ben || []).map((b, b_i) => (<React.Fragment key={b_i}><li style={{display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#342C2A"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flex: "none", marginTop: "1px"}}><path d="M5 12.5l4.5 4.5L19 7.5"></path>
</svg>{b}</li>
</React.Fragment>))}
</ul>
<h3 style={{margin: "24px 0 0", fontSize: "14px", fontWeight: "600", color: "#06254F"}}>{v.t.f.crops}</h3>
<p className="p" style={{marginTop: "6px", fontSize: "14.5px"}}>{v.m.crops}</p>
<h3 style={{margin: "18px 0 0", fontSize: "14px", fontWeight: "600", color: "#06254F"}}>{v.t.f.use}</h3>
<p className="p tnum" style={{marginTop: "6px", fontSize: "14.5px"}}>{v.m.use}</p>
{(v.m.hasComp) ? (<><h3 style={{margin: "18px 0 0", fontSize: "14px", fontWeight: "600", color: "#06254F"}}>{v.t.f.comp}</h3>
<table className="tnum" style={{width: "100%", marginTop: "6px", borderCollapse: "collapse", fontSize: "14px"}}><tbody>{(v.m.comp || []).map((r, r_i) => (<React.Fragment key={r_i}><tr><th scope="row" style={{textAlign: "left", padding: "9px 0", fontWeight: "400", color: "#342C2A", borderBottom: "1px solid rgba(6,37,79,.08)"}}>{r.k}</th>
<td style={{textAlign: "right", padding: "9px 0", fontWeight: "600", color: "#06254F", borderBottom: "1px solid rgba(6,37,79,.08)"}}>{r.v}</td>
</tr>
</React.Fragment>))}
</tbody>
</table>
</>) : null}
{(v.m.noComp) ? (<><p style={{margin: "18px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#57504D"}}>{v.t.f.compNote}</p>
</>) : null}
<div style={{marginTop: "26px", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center"}}><a className="btn btn-p" href={v.m.wa} target="_blank" rel="noopener">{v.t.f.sheetLong}<svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path>
</svg>
</a>
<button type="button" className="link" onClick={v.closeModal} style={{background: "none", border: "0", cursor: "pointer", fontFamily: "inherit"}}>{v.t.f.back}</button>
</div>
</div>
</div>
</div>
</>) : null}
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

export default ProductsPage;
