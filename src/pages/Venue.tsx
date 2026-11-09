import {useState} from 'react';
import {contact, gallery, mapDirections, mapEmbed, venue, type Photo} from '../content';
import {Gem} from '../components/Gem';
import {PhotoGrid} from '../components/PhotoGrid';
import {btn, Chapter, Cta, Eyebrow, Lines, PageHero, Statement} from '../components/Sections';

const filters: {id: 'all' | Photo['tags'][number]; label: string}[] = [
  {id: 'all', label: 'All'},
  {id: 'weddings', label: 'Weddings'},
  {id: 'functions', label: 'Functions'},
  {id: 'venue', label: 'The venue'},
];

export function Venue() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all');
  const shown = filter === 'all' ? gallery : gallery.filter((p) => p.tags.includes(filter));

  return (
    <>
      <PageHero n="03" eyebrow={venue.eyebrow} lines={venue.lines} photo={venue.photo} />
      <Statement>{venue.intro}</Statement>

      {venue.spaces.map((s, i) => (
        <Chapter key={s.name.join(' ')} n={`0${i + 1}`} title={s.name as [string, string]} body={s.body} photos={s.photos} flip={i % 2 === 1} />
      ))}

      <section className="bg-emerald px-5 py-[clamp(80px,13vh,140px)] text-white md:px-14">
        <div className="mx-auto grid max-w-[1680px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Eyebrow>On site</Eyebrow>
            <Lines lines={[{t: 'Everything'}, {t: 'under one roof.', i: true}]} className="mt-6 text-[clamp(42px,5vw,88px)]" />
          </div>
          <ul className="grid border-t border-white/20 sm:grid-cols-2" data-reveal="">
            {venue.facilities.map((f) => (
              <li key={f} className="caps flex items-center gap-3 border-b border-white/20 py-5 text-[13px] sm:odd:pr-6">
                <Gem className="size-4 shrink-0 text-champagne" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="gallery" className="on-light bg-paper px-5 py-[clamp(80px,13vh,150px)] text-ink md:px-14">
        <div className="mx-auto max-w-[1680px]">
          <Eyebrow light>Gallery</Eyebrow>
          <div className="mt-6 mb-12 flex flex-wrap items-end justify-between gap-8">
            <Lines lines={[{t: 'Every corner,'}, {t: 'every occasion.', i: true}]} className="text-[clamp(42px,5vw,88px)]" />
            <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
              {filters.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  aria-pressed={filter === x.id}
                  onClick={() => setFilter(x.id)}
                  className={`caps min-h-11 cursor-pointer border px-5 py-2 transition-colors duration-300 ${
                    filter === x.id ? 'border-emerald bg-emerald text-white' : 'border-ink/25 text-ink hover:border-emerald hover:text-emerald'
                  }`}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>
          <PhotoGrid key={filter} photos={shown} cols="columns-2 md:columns-3 xl:columns-4" />
        </div>
      </section>

      <section id="location" className="bg-ink text-white">
        <div className="mx-auto grid max-w-[1680px] lg:grid-cols-[0.8fr_1.2fr]">
          <div className="px-5 py-[clamp(72px,12vh,130px)] md:px-14">
            <Eyebrow>Find us</Eyebrow>
            <Lines lines={[{t: 'Pieter-'}, {t: 'maritzburg.', i: true}]} className="mt-6 text-[clamp(42px,5vw,88px)]" />
            <address className="prose-body mt-8 not-italic text-white/85">
              {contact.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={mapDirections} target="_blank" rel="noopener" className={btn.solid}>
                Get directions
              </a>
              <a href={contact.phoneHref} className={btn.ghost}>
                Call {contact.phone}
              </a>
            </div>
          </div>
          <iframe
            title="Map showing Emerald Function Venue in Pietermaritzburg"
            src={mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[60svh] min-h-[380px] w-full border-0 grayscale-[0.3] lg:h-full"
          />
        </div>
      </section>

      <Cta />
    </>
  );
}
