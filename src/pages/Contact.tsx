import {contact, contactPage, mapDirections, mapEmbed, photos, whatsappLink} from '../content';
import {EnquiryForm} from '../components/EnquiryForm';
import {Eyebrow, PageHero} from '../components/Sections';

const rows = [
  {k: 'Call', v: contact.phone, href: contact.phoneHref},
  {k: 'WhatsApp', v: contact.phone, href: whatsappLink('Hi Emerald, I would like to check a date for an event.'), ext: true},
  {k: 'Email', v: contact.email, href: `mailto:${contact.email}`},
  {k: 'Facebook', v: 'Emerald Wedding & Function Venue', href: contact.facebook, ext: true},
];

export function Contact() {
  return (
    <>
      <PageHero n="04" eyebrow={contactPage.eyebrow} lines={contactPage.lines} photo={photos.exteriorDusk} />

      <section className="on-light bg-paper px-5 py-[clamp(72px,12vh,140px)] text-ink md:px-14">
        <div className="mx-auto grid max-w-[1680px] gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <Eyebrow light>Talk to us</Eyebrow>
            <p data-reveal="" className="prose-body mt-6 max-w-[44ch] text-ink/80">
              {contactPage.body}
            </p>
            <dl data-reveal="" className="mt-10 border-t border-line">
              {rows.map((r) => (
                <div key={r.k} className="grid grid-cols-[110px_1fr] items-baseline gap-4 border-b border-line py-5">
                  <dt className="caps text-ink/60">{r.k}</dt>
                  <dd className="min-w-0">
                    <a
                      href={r.href}
                      {...(r.ext ? {target: '_blank', rel: 'noopener'} : {})}
                      className="display text-[clamp(22px,2vw,30px)] [overflow-wrap:anywhere] normal-case tracking-normal hover:text-emerald"
                    >
                      {r.v}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="grid grid-cols-[110px_1fr] items-baseline gap-4 border-b border-line py-5">
                <dt className="caps text-ink/60">Visit</dt>
                <dd>
                  <address className="prose-body not-italic">
                    {contact.address.slice(1).join(', ')}
                  </address>
                  <a href={mapDirections} target="_blank" rel="noopener" className="caps mt-2 inline-block border-b border-ink/30 py-1 hover:border-emerald hover:text-emerald">
                    Get directions
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div data-reveal="" className="bg-ivory p-6 shadow-[0_30px_80px_-40px_rgb(11_20_17/0.35)] md:p-12">
            <h2 className="display text-[clamp(36px,3.4vw,58px)]">
              Check <span className="it text-emerald">your date</span>
            </h2>
            <p className="prose-body mt-3 mb-10 text-ink/70">Fields marked * are required.</p>
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section aria-label="Map" className="bg-ink">
        <iframe
          title="Map showing Emerald Function Venue in Pietermaritzburg"
          src={mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[60svh] min-h-[380px] w-full border-0 grayscale-[0.3]"
        />
      </section>
    </>
  );
}
