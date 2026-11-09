import {weddings} from '../content';
import {PhotoGrid} from '../components/PhotoGrid';
import {Chapter, Cta, Eyebrow, Lines, PageHero, Statement, Steps} from '../components/Sections';

export function Weddings() {
  return (
    <>
      <PageHero n="01" eyebrow={weddings.eyebrow} lines={weddings.lines} photo={weddings.photo} />
      <Statement>{weddings.intro}</Statement>
      {weddings.chapters.map((c, i) => (
        <Chapter key={c.n} n={c.n} title={c.title as [string, string]} body={c.body} photos={c.photos} flip={i % 2 === 1} />
      ))}

      <section className="on-light bg-paper px-5 pt-10 pb-[clamp(80px,13vh,150px)] text-ink md:px-14">
        <div className="mx-auto max-w-[1680px]">
          <Eyebrow light>Their day at Emerald</Eyebrow>
          <Lines lines={[{t: 'Real couples,'}, {t: 'real moments.', i: true}]} className="mt-6 mb-12 text-[clamp(42px,5vw,88px)]" />
          <PhotoGrid photos={weddings.moments} />
        </div>
      </section>

      <Steps title={[{t: 'From first call'}, {t: 'to last dance.', i: true}]} steps={weddings.steps} />
      <Cta />
    </>
  );
}
