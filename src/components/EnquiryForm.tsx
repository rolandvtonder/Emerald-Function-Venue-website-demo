import {useId, useRef, useState, type FormEvent} from 'react';
import {contact, contactPage, whatsappLink} from '../content';

type Fields = {name: string; phone: string; email: string; type: string; date: string; guests: string; message: string};
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {name: '', phone: '', email: '', type: '', date: '', guests: '', message: ''};

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please tell us your name.';
  if (!f.phone.trim() && !f.email.trim()) e.phone = 'Add a phone number or an email so we can reply.';
  else if (f.phone.trim() && f.phone.replace(/\D/g, '').length < 9) e.phone = 'That number looks too short — include the area code, e.g. 081 234 5678.';
  if (f.email.trim() && !/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Check the email address — it should look like name@example.com.';
  if (!f.type) e.type = 'Choose the kind of event.';
  return e;
}

function compose(f: Fields) {
  const date = f.date ? new Date(`${f.date}T12:00:00`).toLocaleDateString('en-ZA', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}) : 'not decided yet';
  return [
    `Hi Emerald, I'd like to enquire about an event.\n`,
    `Name: ${f.name.trim()}`,
    f.phone.trim() && `Phone: ${f.phone.trim()}`,
    f.email.trim() && `Email: ${f.email.trim()}`,
    `Event: ${f.type}`,
    `Date: ${date}`,
    f.guests && `Guests: about ${f.guests}`,
    f.message.trim() && `\n${f.message.trim()}`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * The enquiry form. There is no server: on send it opens WhatsApp (or the
 * visitor's email app) with the enquiry written out, ready to send to the
 * venue. Errors show under each field after a failed send, and focus moves to
 * the first one.
 */
export function EnquiryForm() {
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<'' | 'whatsapp' | 'email'>('');

  const set = (k: keyof Fields) => (e: {target: {value: string}}) => {
    setF((v) => ({...v, [k]: e.target.value}));
    if (errors[k]) setErrors((x) => ({...x, [k]: undefined}));
  };

  const send = (via: 'whatsapp' | 'email') => {
    const e = validate(f);
    setErrors(e);
    const firstBad = (Object.keys(e) as (keyof Fields)[])[0];
    if (firstBad) {
      form.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      setSent('');
      return;
    }
    const body = compose(f);
    if (via === 'whatsapp') {
      window.open(whatsappLink(body), '_blank', 'noopener');
    } else {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Event enquiry — ${f.type}`)}&body=${encodeURIComponent(body)}`;
    }
    setSent(via);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send('whatsapp');
  };

  const field = 'mt-2 block min-h-12 w-full border border-line bg-ivory px-4 py-3 text-[17px] text-ink placeholder:text-ink/45 focus:border-emerald focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-emerald';
  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} className="mt-2 text-[15px] text-[#9b2c1f]">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Fields) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${id}-${k}-err` : undefined,
  });
  const label = 'caps text-ink/75';

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="on-light grid gap-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-name`} className={label}>
          Your name <span className="text-[#9b2c1f]">*</span>
        </label>
        <input id={`${id}-name`} name="name" autoComplete="name" value={f.name} onChange={set('name')} className={field} {...a11y('name')} />
        {err('name')}
      </div>
      <div>
        <label htmlFor={`${id}-phone`} className={label}>
          Phone / WhatsApp
        </label>
        <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} className={field} {...a11y('phone')} />
        {err('phone')}
      </div>
      <div>
        <label htmlFor={`${id}-email`} className={label}>
          Email
        </label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" value={f.email} onChange={set('email')} className={field} {...a11y('email')} />
        {err('email')}
      </div>
      <p className="-mt-3 text-[15px] text-ink/60 sm:col-span-2">A phone number or an email is needed so we can reply.</p>
      <div>
        <label htmlFor={`${id}-type`} className={label}>
          Kind of event <span className="text-[#9b2c1f]">*</span>
        </label>
        <select id={`${id}-type`} name="type" value={f.type} onChange={set('type')} className={`${field} cursor-pointer`} {...a11y('type')}>
          <option value="">Choose one…</option>
          {contactPage.eventTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {err('type')}
      </div>
      <div>
        <label htmlFor={`${id}-date`} className={label}>
          Preferred date
        </label>
        <input id={`${id}-date`} name="date" type="date" value={f.date} onChange={set('date')} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-guests`} className={label}>
          Roughly how many guests?
        </label>
        <input id={`${id}-guests`} name="guests" type="number" inputMode="numeric" min={1} value={f.guests} onChange={set('guests')} className={`${field} sm:max-w-[220px]`} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={label}>
          Anything else?
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          value={f.message}
          onChange={set('message')}
          placeholder="Ceremony in the garden, décor colours, catering questions…"
          className={`${field} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <button type="submit" className="caps inline-flex min-h-12 cursor-pointer items-center gap-3 bg-emerald px-7 py-3.5 text-white transition-colors duration-300 hover:bg-emerald-deep">
          Send on WhatsApp
        </button>
        <button
          type="button"
          onClick={() => send('email')}
          className="caps inline-flex min-h-12 cursor-pointer items-center gap-3 border border-ink/30 px-7 py-3.5 text-ink transition-colors duration-300 hover:border-emerald hover:text-emerald"
        >
          Send by email instead
        </button>
      </div>

      <p role="status" className="text-[16px] text-emerald sm:col-span-2">
        {sent === 'whatsapp' && 'WhatsApp has opened with your enquiry written out — press send there and we’ll reply soon.'}
        {sent === 'email' && 'Your email app has opened with your enquiry written out — press send there and we’ll reply soon.'}
      </p>
    </form>
  );
}
