import {useEffect, useRef, useState} from 'react';
import {href, spaces} from '../content';
import {Img} from './Img';

/**
 * The three ways in — Weddings, Functions, The venue: three tall panels slide
 * in from the right one after another, each a link through to its page.
 */
export function Spaces() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      {threshold: 0.2},
    );
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} id="spaces" className="relative bg-ink" aria-label="Weddings, functions and the venue">
      <div className="grid h-svh min-h-[640px] grid-cols-3 gap-[3px] overflow-hidden max-md:h-auto max-md:grid-cols-1">
        {spaces.map((s, i) => (
          <a
            key={s.id}
            href={href(s.id)}
            className={`group relative block overflow-hidden transition-transform duration-[1100ms] ease-wipe max-md:h-[78svh] ${
              shown ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'
            }`}
            style={{transitionDelay: `${0.12 + i * 0.16}s`, background: s.tint}}
          >
            <Img
              photo={s.photo}
              sizes="(max-width: 767px) 100vw, 34vw"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_20_16/0.7),rgb(8_20_16/0.1)_45%,rgb(8_20_16/0.65))]" />
            <div className="relative flex h-full flex-col justify-between p-7 pt-28 md:p-9 md:pt-32">
              <div>
                <h2 className="display text-[clamp(38px,3.6vw,64px)] text-white">
                  <span className="block">{s.name[0]}</span>
                  <span className="it block">{s.name[1]}</span>
                </h2>
                <dl className={`mt-6 space-y-3 transition-opacity delay-[1400ms] duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>
                  {s.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt className="caps text-white/70">{k}</dt>
                      <dd className="caps text-[13px] text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <span className="caps flex items-center gap-3 text-white">
                Explore
                <span aria-hidden className="inline-block h-px w-10 bg-current transition-[width] duration-500 ease-silk group-hover:w-20" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
