import StoryProducts from '../../components/story/StoryProducts';
import PhoneProducts from '../../components/story/PhoneProducts';

export const metadata = { title: 'Products — Humatindo' };

export default function Page() {
  return (
    <>
      <div className="v-desk"><StoryProducts /></div>
      <div className="v-mob"><PhoneProducts /></div>
    </>
  );
}
