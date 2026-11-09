import {Hero} from '../components/Hero';
import {Spaces} from '../components/Spaces';
import {Cta, Intro, Strip} from '../components/Sections';

export function Home() {
  return (
    <>
      <Hero />
      <Spaces />
      <Intro />
      <Strip />
      <Cta />
    </>
  );
}
