import './home.css';
import HomePage from '../components/HomePage';

// Google Ads visitors (gclid / gbraid / wbraid / gad_source, or utm_source=google with a paid utm_medium)
// get the lead-form hero. Add ?hero=ads to preview it.
function isAdsVisit(sp) {
  const g = (k) => (Array.isArray(sp[k]) ? sp[k][0] : sp[k]) || '';
  const src = g('utm_source').toLowerCase();
  const med = g('utm_medium').toLowerCase();
  return g('hero') === 'ads' || !!(sp.gclid || sp.gbraid || sp.wbraid || sp.gad_source) ||
    (src.includes('google') && /^(cpc|ppc|paid|paidsearch|sem)$/.test(med));
}

export default async function Page({ searchParams }) {
  const sp = (await searchParams) || {};
  return <HomePage initialAds={isAdsVisit(sp)} />;
}
