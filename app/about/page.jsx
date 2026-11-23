import StoryAbout from '../../components/story/StoryAbout';
import PhoneAbout from '../../components/story/PhoneAbout';

export const metadata = { title: 'About us — Humatindo' };

export default function Page() {
  return (
    <>
      <div className="v-desk"><StoryAbout /></div>
      <div className="v-mob"><PhoneAbout /></div>
    </>
  );
}
