import { redirect } from 'next/navigation';
import StoryHome from '../components/story/StoryHome';
import PhoneHome from '../components/story/PhoneHome';

// Google Ads visitors (gclid / gbraid / wbraid / gad_source, or utm_source=google with a paid utm_medium)
// keep the lead-form landing page, now served at /ads. Add ?hero=ads to preview it.
function isAdsVisit(sp) {
  const g = (k) => (Array.isArray(sp[k]) ? sp[k][0] : sp[k]) || '';
  const src = g('utm_source').toLowerCase();
  const med = g('utm_medium').toLowerCase();
  return g('hero') === 'ads' || !!(sp.gclid || sp.gbraid || sp.wbraid || sp.gad_source) ||
    (src.includes('google') && /^(cpc|ppc|paid|paidsearch|sem)$/.test(med));
}

export default async function Page({ searchParams }) {
  const sp = (await searchParams) || {};
  if (isAdsVisit(sp)) {
    const qs = new URLSearchParams();
    for (const [k, val] of Object.entries(sp)) (Array.isArray(val) ? val : [val]).forEach((x) => qs.append(k, x));
    redirect('/ads?' + qs.toString());
  }
  return (
    <>
      <div className="v-desk"><StoryHome /></div>
      <div className="v-mob"><PhoneHome /></div>
    </>
  );
}
