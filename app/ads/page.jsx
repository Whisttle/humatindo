import './home.css';
import HomePage from '../../components/HomePage';

export const metadata = { title: 'Humatindo — Request a product recommendation', robots: { index: false } };

// Landing page for Google Ads visitors (redirected here from / with their tracking parameters).
export default function Page() {
  return <HomePage initialAds />;
}
