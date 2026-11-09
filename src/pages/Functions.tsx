import type {CSSProperties} from 'react';
import {functions} from '../content';
import {Img} from '../components/Img';
import {PhotoGrid} from '../components/PhotoGrid';
import {Cta, Eyebrow, Lines, PageHero, Statement} from '../components/Sections';

export function Functions() {
  return (
    <>
      <PageHero n="02" eyebrow={functions.eyebrow} lines={functions.lines} photo={functions.photo} />
      <Statement>{functions.intro}</Statement>

      {/* What we host: a numbered list in the display face. */}
      <section className="on-light bg-paper px-5 pb-[clamp(80px,13vh,150px)] text-ink md:px-14">
        <div className="mx-auto max-w-[1680px]">
          <Eyebrow light>What we host</Eyebrow>
          <ol className="mt-10 border-t border-line">
            {functions.types.map(([t, d], i) => (
              <li
                key={t}
                data-reveal=""
                style={{'--d': `${i * 70}ms`} as CSSProperties}
                className="grid gap-3 border-b border-line py-8 md:grid-cols-[90px_1fr_1fr] md:items-baseline md:gap-10"
              >
                <span className="caps text-gold">0{i + 1}</span>
                <h3 className="display text-[clamp(32px,3.6vw,60px)]">{t}</h3>
                <p className="prose-body max-w-[46ch] text-ink/75">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* One hall, many moods: four tall panels, each a different styling. */}
      <section className="bg-ink px-5 py-[clamp(80px,13vh,150px)] text-white md:px-14">
        <div className="mx-auto max-w-[1680px]">
          <Eyebrow>Styled your way</Eyebrow>
          <Lines lines={[{t: 'One hall,'}, {t: 'many moods.', i: true}]} className="mt-6 text-[clamp(42px,5vw,88px)]" />
          <div className="mt-12 grid grid-cols-2 gap-[3px] lg:grid-cols-4">
            {functions.styles.map((s, i) => (
              <figure key={s.name} className="relative aspect-[3/4] overflow-hidden" data-reveal="photo" style={{'--d': `${i * 140}ms`} as CSSProperties}>
                <Img photo={s.photo} sizes="(max-width: 1023px) 50vw, 25vw" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(8_20_16/0.8))]" />
                <figcaption className="display it absolute bottom-5 left-5 text-[clamp(22px,2.2vw,34px)]">{s.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="on-light bg-paper px-5 py-[clamp(80px,13vh,150px)] text-ink md:px-14">
        <div className="mx-auto max-w-[1680px]">
          <Eyebrow light>Celebrations at Emerald</Eyebrow>
          <Lines lines={[{t: 'Milestones'}, {t: 'worth gathering for.', i: true}]} className="mt-6 mb-12 text-[clamp(42px,5vw,88px)]" />
          <PhotoGrid photos={functions.moments} />
        </div>
      </section>

      <Cta />
    </>
  );
}
