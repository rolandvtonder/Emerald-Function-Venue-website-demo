import {brand, contact, footer, mapDirections, pages, whatsappLink} from '../content';
import {useFitText} from '../hooks/useFitText';

const year = new Date().getFullYear();

/** Contact columns over a wordmark that runs edge to edge at every width. */
export function Footer() {
  const word = useFitText<HTMLSpanElement>();

  return (
    <footer className="relative overflow-hidden bg-ink px-5 pt-20 pb-28 text-white md:px-14 md:pb-10">
      <div className="mx-auto grid max-w-[1680px] gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="caps text-champagne">Visit</p>
          <address className="prose-body mt-4 not-italic text-white/85">
            {contact.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <a href={mapDirections} target="_blank" rel="noopener" className="caps mt-4 inline-block border-b border-white/30 py-1 hover:border-champagne hover:text-champagne">
            Get directions
          </a>
        </div>
        <div>
          <p className="caps text-champagne">Talk</p>
          <ul className="prose-body mt-4 space-y-1 text-white/85">
            <li>
              <a href={contact.phoneHref} className="hover:text-champagne">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener" className="hover:text-champagne">
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="break-all hover:text-champagne">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label="Footer">
          <p className="caps text-champagne">Pages</p>
          <ul className="prose-body mt-4 space-y-1 text-white/85">
            {pages.map((p) => (
              <li key={p.id}>
                <a href={p.href} className="hover:text-champagne">
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="caps text-champagne">Follow</p>
          <a href={contact.facebook} target="_blank" rel="noopener" className="prose-body mt-4 block text-white/85 hover:text-champagne">
            Facebook
          </a>
          <p className="prose-body mt-6 max-w-[28ch] text-white/60">{footer.note}</p>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1680px] text-center" aria-hidden>
        <span ref={word} className="display inline-block whitespace-nowrap leading-[0.8] text-emerald">
          {brand.name}
        </span>
      </div>

      <p className="caps mx-auto mt-6 max-w-[1680px] text-white/50">
        © {year} {brand.full} · Pietermaritzburg
      </p>
    </footer>
  );
}
