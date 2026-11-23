'use client';
/* eslint-disable */
/* Generated from the design canvas (PhoneProducts.dc.html). */
import React from 'react';
import Nav from './Nav';
import './PhoneProducts.css';

class PhoneProducts extends React.Component {
  constructor(...a) {
    super(...a);
    this.state = { line: 'premium', open: null, foot: -1, bar: false };
    this.setRoot = (el) => { this.root = el; };
    this.setCloseBtn = (el) => { this.closeBtn = el; };
    this.close = () => this.setState({ open: null });
    this.onKey = (ev) => { if (ev.key === 'Escape') this.setState({ open: null }); };
    const step = (d) => { const L = this.data().filter((p) => p.line === this.state.line); const i = L.findIndex((p) => p.key === this.state.open); if (i < 0) return; this.setState({ open: L[(i + d + L.length) % L.length].key }); };
    this.prevP = () => step(-1);
    this.nextP = () => step(1);
  }

  componentDidMount() { this._alive = true; setTimeout(() => this.bindScroll(), 0); }
  componentDidUpdate(pp, ps) { if (this.state.open && !ps.open && this.closeBtn) { try { this.closeBtn.focus(); } catch (e) {} } }
  componentWillUnmount() { this._alive = false; if (this._sc && this._onScroll) this._sc.removeEventListener('scroll', this._onScroll); }

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
      { key: 'terahumic', name: 'TERAHUMIC', line: 'advanced', img: I.terahumic, h: 260, bigH: 400, pack: '500 mL', crops: ['food', 'horti', 'fruit', 'plantation'], with: ['si', 'ca'],
        en: { tag: 'Liquid humic soil conditioner', desc: 'A biostimulant from humic substances, essential for soil fertility and plant health, extracted from high-quality Sumatran leonardite and lignite with a balanced humic and fulvic acid content.', ben: ['Raises soil CEC to hold nutrients and water', 'Improves soil biology and stabilises pH', 'Increases resistance to abiotic and biotic stress'], crops: 'Food crops, horticulture, fruit trees and plantations', use: 'See the product sheet for dose and interval by crop.' },
        id: { tag: 'Pembenah tanah senyawa humat cair', desc: 'Biostimulan dari senyawa humat yang penting bagi kesuburan tanah dan kesehatan tanaman, diekstraksi dari leonardit dan lignit Sumatera berkualitas tinggi dengan kandungan asam humat dan fulvat yang seimbang.', ben: ['Meningkatkan KTK tanah untuk menyimpan hara dan air', 'Memperbaiki biologi tanah dan menstabilkan pH', 'Meningkatkan ketahanan terhadap cekaman abiotik dan biotik'], crops: 'Tanaman pangan, hortikultura, tanaman buah, dan perkebunan', use: 'Lihat lembar produk untuk dosis dan interval per tanaman.' } },
      { key: 'samhumat-bc', name: 'SAMHUMAT BASIC COMPOUND', line: 'specialty', img: I.bag, h: 270, bigH: 400, pack: '10 kg', crops: ['food', 'horti', 'fruit', 'plantation'], with: ['ha', 'fa'],
        en: { tag: 'Powdered organic fertilizer with humates', desc: 'A powdered soil conditioner with humic and fulvic acids that improves soil biology, chelates toxic Al³⁺ and releases OH⁻ ions to stabilise soil pH.', ben: ['Improves water retention, porosity and soil aggregate', 'Raises CEC so crops absorb nutrients better', 'Helps reduce the amount of synthetic fertilizer needed'], crops: 'Food crops, vegetables, flowers, fruit trees and plantations', use: 'Blend 500 g with every 50–100 kg of synthetic fertilizer, or dissolve 1–2 g/L for drenching or spraying.' },
        id: { tag: 'Pupuk organik tepung mengandung humat', desc: 'Pembenah tanah berbentuk tepung dengan asam humat dan fulvat yang meningkatkan kesehatan biologi tanah, mengkhelat racun Al³⁺, dan melepas ion OH⁻ sehingga pH tanah stabil.', ben: ['Meningkatkan retensi air, porositas, dan agregat tanah', 'Meningkatkan KTK sehingga hara lebih mudah diserap', 'Membantu menurunkan jumlah pupuk sintetis yang dibutuhkan'], crops: 'Tanaman pangan, sayuran, bunga, tanaman buah, dan perkebunan', use: 'Campurkan 500 g untuk setiap 50–100 kg pupuk sintetis, atau larutkan 1–2 g/L untuk pengocoran atau penyemprotan.' } }
    ];
    return this._data;
  }

  renderVals() {
    const s = this.state, wa = 'https://wa.me/6287783863777?text=';
    const compK = { humicC: 'Humic compounds', ha: 'Humic acid', fa: 'Fulvic acid', amino: 'Amino complex', si: 'Monosilicic acid Si(OH)₄' };
    const lineInfo = {
      premium: { t: 'Premium', h1: 'Premium', h2: 'Biostimulant', desc: 'Humic and fulvic compounds, amino acids and monosilicic acid, enriched with macro and micronutrients for flowering, fruiting and plantation crops.' },
      advanced: { t: 'Advanced', h1: 'Advanced', h2: 'Biostimulant', desc: 'Humic formulations with specific functional nutrients such as calcium, silicon and boron, for strong results at a competitive price.' }
    };
    const all = this.data().filter((p) => p.line === 'premium' || p.line === 'advanced');
    const inLine = all.filter((p) => p.line === s.line);
    const view = (p, i, arr) => ({
      key: p.key, name: p.name, img: p.img, pack: p.pack, tag: p.en.tag, desc: p.en.desc, ben: p.en.ben, crops: p.en.crops, use: p.en.use,
      bg: '/img/moss-blue-real-sm.webp', alt: p.name + ' ' + p.pack, lineLabel: lineInfo[p.line].t + ' Biostimulant',
      comp: (p.comp || []).map((r) => ({ k: compK[r[0]] || r[0], v: r[1] })), hasComp: !!p.comp,
      wa: wa + encodeURIComponent('Hello Humatindo, I would like the product sheet for ' + p.name + '.'),
      pos: (i + 1) + ' / ' + arr.length
    });
    const items = inLine.map((p, i) => Object.assign(view(p, i, inLine), { aria: 'View details: ' + p.name, delay: (i * 0.06).toFixed(2), open: () => this.setState({ open: p.key }) }));
    const lines = ['premium', 'advanced'].map((k) => ({ t: lineInfo[k].t, n: all.filter((p) => p.line === k).length, on: s.line === k, cls: s.line === k ? 'sg on' : 'sg', pick: () => this.setState({ line: k }) }));
    const oi = inLine.findIndex((p) => p.key === s.open);
    const m = oi >= 0 ? view(inLine[oi], oi, inLine) : { ben: [], comp: [], hasComp: false };
    const footData = [
      { t: 'Company', links: [{ t: 'Home', h: '/', tg: '_self' }, { t: 'About us', h: '/about', tg: '_self' }] },
      { t: 'Contact', links: [{ t: 'sales@humatindo.com', h: 'mailto:sales@humatindo.com', tg: '_self' }, { t: '+62 877 8386 3777', h: 'tel:+6287783863777', tg: '_self' }] },
      { t: 'Follow us', links: [{ t: 'Instagram', h: 'https://www.instagram.com/bio_stimulant', tg: '_blank' }, { t: 'YouTube', h: 'https://www.youtube.com/@humatindo', tg: '_blank' }, { t: 'TikTok', h: 'https://www.tiktok.com/@aph.humatindo', tg: '_blank' }] }
    ];
    const foot = footData.map((f, i) => ({ t: f.t, links: f.links, open: s.foot === i, rot: s.foot === i ? 180 : 0, toggle: () => this.setState({ foot: s.foot === i ? -1 : i }) }));
    return {
      setRoot: this.setRoot, setCloseBtn: this.setCloseBtn, close: this.close, onKey: this.onKey, prevP: this.prevP, nextP: this.nextP,
      lines, line: lineInfo[s.line], items, m, sheetOpen: oi >= 0, foot,
      barCls: s.bar && oi < 0 ? 'bar' : 'bar off',
      waHref: wa + encodeURIComponent('Hello Humatindo, I would like a product recommendation for my crop.')
    };
  }

  render() {
    const v = this.renderVals();
    return (<><div className="m-products" ref={v.setRoot} style={{position: "relative", minHeight: "100%", overflowX: "clip", background: "#F4F7FA", paddingBottom: "84px"}}>
<Nav active={"products"} set={"Phone"} cta={"#m-request"} preview={false} />

<main>
<section aria-labelledby="m-pg-title" style={{position: "relative", minHeight: "600px", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "#2b3a1c", overflow: "hidden"}}>
<img src="/img/moss-blue-real.webp" alt="" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover"}} />
<div style={{position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(4,22,44,.5) 0%, rgba(4,22,44,.15) 35%, rgba(4,22,44,.9) 100%)"}}></div>
<div aria-hidden="true" style={{position: "absolute", left: "0", right: "0", top: "96px", display: "flex", justifyContent: "center", alignItems: "flex-end"}}>
<div className="float" style={{animationDelay: "-2s", transformOrigin: "bottom"}}><img src="/img/p-calshumat.webp" alt="" style={{height: "170px", width: "auto", display: "block", transform: "rotate(-8deg)", marginRight: "-18px", filter: "drop-shadow(0 18px 14px rgba(0,0,0,.45))"}} /></div>
<div className="float" style={{position: "relative", zIndex: "2"}}><img src="/img/p-borohumic.webp" alt="" style={{height: "210px", width: "auto", display: "block", filter: "drop-shadow(0 22px 16px rgba(0,0,0,.5))"}} /></div>
<div className="float" style={{animationDelay: "-4s"}}><img src="/img/p-silikamat.webp" alt="" style={{height: "170px", width: "auto", display: "block", transform: "rotate(8deg)", marginLeft: "-18px", filter: "drop-shadow(0 18px 14px rgba(0,0,0,.45))"}} /></div>
</div>
<div className="in px" style={{position: "relative", paddingTop: "330px", paddingBottom: "32px", display: "flex", flexDirection: "column", gap: "16px"}}>
<p className="eb lt">Our portfolio</p>
<h1 id="m-pg-title" className="hero-h" style={{margin: "0", fontSize: "42px", lineHeight: "1", letterSpacing: "-.04em", fontWeight: "300", color: "#fff"}}>Formulations rooted <span style={{fontWeight: "600"}}>in Sumatran soil.</span></h1>
<p style={{margin: "0", maxWidth: "560px", fontSize: "15.5px", lineHeight: "1.6", color: "rgba(255,255,255,.88)"}}>Two biostimulant lines built on humic compounds from Sumatran lignite, made under ISO 9001:2015 quality management.</p>
</div>
</section>

<div className="px" style={{position: "sticky", top: "80px", zIndex: "30", paddingTop: "16px", paddingBottom: "8px"}}>
<div className="segwrap" style={{margin: "0 auto"}}>
<div className="seg" role="tablist" aria-label="Product line">
{(v.lines || []).map((l, l_i1) => (<React.Fragment key={l_i1}><button type="button" role="tab" className={l.cls} aria-selected={l.on} onClick={l.pick}>{l.t} <span className="tnum">({l.n})</span></button></React.Fragment>))}
</div>
</div>
</div>

<section id="m-range" aria-labelledby="m-line-title" className="px" style={{paddingTop: "20px", paddingBottom: "56px"}}>
<div className="in" style={{display: "flex", flexDirection: "column", gap: "10px", animationDuration: ".5s"}}>
<h2 id="m-line-title" className="h2">{v.line.h1} <b>{v.line.h2}</b></h2>
<p style={{margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#57504D", maxWidth: "620px"}}>{v.line.desc}</p>
</div>
<div className="grid" style={{marginTop: "24px"}}>
{(v.items || []).map((p, p_i2) => (<React.Fragment key={p_i2}>
<button type="button" className="card in" onClick={p.open} aria-label={p.aria} style={{animationDelay: `${p.delay}s`, animationDuration: ".6s"}}>
<span className="plate"><img className="bg" src={p.bg} alt="" /><img className="bt" src={p.img} alt="" loading="lazy" style={{height: "78%"}} /><span className="plus" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg></span></span>
<span style={{display: "flex", flexDirection: "column", gap: "3px", padding: "0 2px"}}>
<span className="tnum" style={{fontSize: "12px", fontWeight: "500", color: "#0070AC"}}>{p.pack}</span>
<span style={{fontSize: "16px", fontWeight: "700", letterSpacing: ".03em", color: "#06254F"}}>{p.name}</span>
<span style={{fontSize: "13px", lineHeight: "1.45", color: "#57504D"}}>{p.tag}</span>
</span>
</button>
</React.Fragment>))}
</div>
</section>

<section id="m-request" aria-labelledby="m-req-title" style={{padding: "0 12px", scrollMarginTop: "80px"}}>
<div style={{position: "relative", overflow: "hidden", borderRadius: "28px", background: "#30318C", color: "#fff", padding: "32px 20px 0", display: "flex", flexDirection: "column", gap: "16px"}}>
<p className="eb lt">Recommendation</p>
<h2 id="m-req-title" className="h2" style={{color: "#fff"}}>Not sure which formulation <b>fits your crop?</b></h2>
<p style={{margin: "0", fontSize: "15.5px", lineHeight: "1.65", color: "rgba(255,255,255,.86)"}}>Tell us your crop and its stage of growth. We will recommend a formulation and send the product sheet.</p>
<div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
<a className="btn btn-w" href={v.waHref} target="_blank" rel="noopener">Chat on WhatsApp</a>
<a className="btn btn-o" href="mailto:sales@humatindo.com">sales@humatindo.com</a>
</div>
<img src="/img/apri-point.webp" alt="" style={{alignSelf: "center", height: "230px", width: "auto", display: "block", marginTop: "6px"}} />
</div>
</section>
</main>

<footer className="px" style={{paddingTop: "48px", paddingBottom: "24px"}}>
<img src="/img/logo-full.webp" alt="PT Artha Prima Humatindo \u2014 Leading in biostimulant and organic fertilizer" style={{width: "170px", height: "auto", display: "block"}} />
<div style={{marginTop: "24px", borderBottom: "1px solid rgba(6,37,79,.1)"}}>
{(v.foot || []).map((f, f_i3) => (<React.Fragment key={f_i3}>
<button type="button" className="flb" aria-expanded={f.open} onClick={f.toggle}>{f.t}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{transform: `rotate(${f.rot}deg)`, transition: "transform .3s"}}><path d="M6 9l6 6 6-6"></path></svg></button>
{(f.open) ? (<><div className="in" style={{paddingBottom: "10px", animationDuration: ".4s"}}>{(f.links || []).map((l, l_i4) => (<React.Fragment key={l_i4}><a className="fl" href={l.h} target={l.tg} rel="noopener">{l.t}</a></React.Fragment>))}</div></>) : null}
</React.Fragment>))}
</div>
<div style={{marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "12.5px", color: "#57504D"}}>
<span style={{display: "flex", alignItems: "center", gap: "10px"}}><img src="/img/iso-sgs.webp" alt="SGS ISO 9001 system certification" style={{width: "36px", height: "36px", objectFit: "contain"}} />ISO 9001:2015 · SGS</span>
<span>© 2026 PT Artha Prima Humatindo. All rights reserved.</span>
</div>
</footer>

<nav aria-label="Quick contact" className={v.barCls}>
<a className="btn btn-on" href={v.waHref} target="_blank" rel="noopener" style={{padding: "0 12px"}}>WhatsApp</a>
<a className="btn btn-p" href="#m-request" style={{padding: "0 12px"}}>Ask for advice</a>
</nav>

{(v.sheetOpen) ? (<>
<div onKeyDown={v.onKey}>
<button type="button" aria-label="Close product details" onClick={v.close} style={{position: "fixed", inset: "0", zIndex: "80", border: "0", padding: "0", cursor: "pointer", background: "rgba(4,22,44,.5)", WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)", animation: "fadeIn-m-products .3s both"}}></button>
<div className="sheet" role="dialog" aria-modal="true" aria-labelledby="m-sh-title">
<div style={{position: "sticky", top: "0", zIndex: "2", display: "flex", justifyContent: "center", padding: "10px 0 0"}}><span style={{width: "44px", height: "5px", borderRadius: "999px", background: "rgba(6,37,79,.2)"}}></span></div>
<div style={{position: "relative", margin: "10px 14px 0", height: "300px", borderRadius: "20px", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center", background: "#3d4a2a"}}>
<img src={v.m.bg} alt="" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover"}} />
<img className="float" src={v.m.img} alt={v.m.alt} style={{position: "relative", height: "250px", width: "auto", marginBottom: "18px", filter: "drop-shadow(0 20px 16px rgba(0,0,0,.5))"}} />
<button type="button" ref={v.setCloseBtn} aria-label="Close" onClick={v.close} style={{position: "absolute", right: "12px", top: "12px", width: "44px", height: "44px", borderRadius: "50%", border: "0", background: "rgba(255,255,255,.92)", color: "#06254F", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>
<button type="button" aria-label="Previous product" onClick={v.prevP} style={{position: "absolute", left: "12px", top: "50%", marginTop: "-22px", width: "44px", height: "44px", borderRadius: "50%", border: "0", background: "rgba(255,255,255,.85)", color: "#06254F", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"></path></svg></button>
<button type="button" aria-label="Next product" onClick={v.nextP} style={{position: "absolute", right: "12px", top: "50%", marginTop: "-22px", width: "44px", height: "44px", borderRadius: "50%", border: "0", background: "rgba(255,255,255,.85)", color: "#06254F", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg></button>
<span className="tnum" style={{position: "absolute", left: "14px", bottom: "12px", minHeight: "28px", padding: "0 10px", borderRadius: "999px", display: "flex", alignItems: "center", background: "rgba(4,22,44,.6)", color: "#fff", fontSize: "12px", fontWeight: "600"}}>{v.m.pos}</span>
</div>
<div style={{padding: "20px 20px 28px", display: "flex", flexDirection: "column", gap: "14px"}}>
<p className="tnum" style={{margin: "0", fontSize: "13px", fontWeight: "600", color: "#0070AC"}}>{v.m.lineLabel} · {v.m.pack}</p>
<h2 id="m-sh-title" style={{margin: "-6px 0 0", fontSize: "30px", fontWeight: "700", letterSpacing: ".02em", color: "#06254F"}}>{v.m.name}</h2>
<p style={{margin: "-4px 0 0", fontSize: "16px", fontWeight: "500", color: "#342C2A"}}>{v.m.tag}</p>
<p style={{margin: "0", fontSize: "15px", lineHeight: "1.65", color: "#342C2A"}}>{v.m.desc}</p>
<ul style={{listStyle: "none", margin: "0", padding: "0", display: "grid", gap: "10px"}}>
{(v.m.ben || []).map((b, b_i5) => (<React.Fragment key={b_i5}><li style={{display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14.5px", lineHeight: "1.5", color: "#342C2A"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flex: "none", marginTop: "1px"}}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>{b}</li></React.Fragment>))}
</ul>
<div style={{paddingTop: "12px", borderTop: "1px solid rgba(6,37,79,.1)"}}><h3 style={{margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".12em", textTransform: "uppercase", color: "#57504D"}}>Target crops</h3><p style={{margin: "6px 0 0", fontSize: "14.5px", lineHeight: "1.6"}}>{v.m.crops}</p></div>
<div style={{paddingTop: "12px", borderTop: "1px solid rgba(6,37,79,.1)"}}><h3 style={{margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".12em", textTransform: "uppercase", color: "#57504D"}}>How to use</h3><p className="tnum" style={{margin: "6px 0 0", fontSize: "14.5px", lineHeight: "1.6"}}>{v.m.use}</p></div>
{(v.m.hasComp) ? (<>
<div style={{paddingTop: "12px", borderTop: "1px solid rgba(6,37,79,.1)"}}><h3 style={{margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: ".12em", textTransform: "uppercase", color: "#57504D"}}>Composition</h3>
<table className="tnum" style={{width: "100%", marginTop: "6px", borderCollapse: "collapse", fontSize: "14px"}}><tbody>{(v.m.comp || []).map((r, r_i6) => (<React.Fragment key={r_i6}><tr><th scope="row" style={{textAlign: "left", padding: "9px 0", fontWeight: "400", borderBottom: "1px solid rgba(6,37,79,.08)"}}>{r.k}</th><td style={{textAlign: "right", padding: "9px 0", fontWeight: "600", color: "#06254F", borderBottom: "1px solid rgba(6,37,79,.08)"}}>{r.v}</td></tr></React.Fragment>))}</tbody></table></div>
</>) : null}
<a className="btn btn-p" href={v.m.wa} target="_blank" rel="noopener" style={{marginTop: "6px"}}>Request the product sheet</a>
</div>
</div>
</div>
</>) : null}
</div></>);
  }
}

export default PhoneProducts;
