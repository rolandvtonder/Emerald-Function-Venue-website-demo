/**
 * All copy, contact details and photos live here. Change a phone number,
 * a headline or a caption in this one file and every page picks it up.
 *
 * Contact details are the ones on the venue's Facebook page. Nothing here
 * states capacity, prices or reviews — add those only once they're confirmed.
 */

export const brand = {
  name: 'Emerald',
  full: 'Emerald Function Venue',
  tagline: 'Wedding & function venue',
};

export const contact = {
  phone: '081 446 8059',
  phoneHref: 'tel:+27814468059',
  whatsapp: '27814468059',
  email: 'londekan27@icloud.com',
  address: ['Emerald Function Venue', 'Pietermaritzburg', 'KwaZulu-Natal, 3101'],
  facebook: 'https://www.facebook.com/p/Emerald-Wedding-Function-Venue-61573340739303/',
  mapQuery: 'Emerald Function Venue, Pietermaritzburg',
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`;
export const mapDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapQuery)}`;

/* ------------------------------------------------------------------ pages */

export type PageId = 'home' | 'weddings' | 'functions' | 'venue' | 'contact';

const base = import.meta.env.BASE_URL;
export const pages: {id: PageId; label: string; href: string}[] = [
  {id: 'home', label: 'Home', href: base},
  {id: 'weddings', label: 'Weddings', href: `${base}weddings/`},
  {id: 'functions', label: 'Functions & events', href: `${base}functions/`},
  {id: 'venue', label: 'The venue', href: `${base}venue/`},
  {id: 'contact', label: 'Contact', href: `${base}contact/`},
];
export const href = (id: PageId) => pages.find((p) => p.id === id)!.href;

/* ----------------------------------------------------------------- photos */

export type Photo = {src: string; w: number; h: number; alt: string; tags: ('weddings' | 'functions' | 'venue')[]};

const p = (src: string, w: number, h: number, alt: string, tags: Photo['tags']): Photo => ({src, w, h, alt, tags});

/** Every photo, in gallery order. Files are in public/media as `<src>-800.webp` and `<src>-1600.webp`. */
export const photos = {
  hallAisle: p('hall-aisle', 1280, 960, 'Reception hall laid with round tables, gold chairs and a white aisle under soft draping', ['venue', 'weddings']),
  stageWide: p('stage-wide', 1360, 1020, 'Wedding stage with a white carved backdrop, rose garland and white chaise under a draped ceiling', ['weddings']),
  hallChandelier: p('hall-chandelier', 1360, 1020, 'Hall set for a reception with a chandelier, draped ceiling and gold-rimmed glassware', ['venue', 'weddings']),
  gardenCeremony: p('garden-ceremony', 1280, 960, 'Garden ceremony set-up on the lawn with white chairs and a red aisle runner', ['weddings', 'venue']),
  stageClose: p('stage-close', 1360, 1020, 'Close view of the white tufted chaise in front of a carved floral backdrop', ['weddings']),
  stageGlass: p('stage-glass-table', 1290, 960, 'Bridal table of glass and crystal candelabras on the white stage', ['weddings']),
  stageChaise: p('stage-chaise', 1360, 1020, 'The full white wedding stage with crystal stands, fairy lights and a floral arch', ['weddings']),
  tableSetting: p('table-setting', 1360, 1020, 'Round table with gold charger plates, pink napkins and a tall floral centrepiece', ['weddings']),
  coupleCertificate: p('couple-certificate', 960, 833, 'Bride and groom smiling with their marriage certificate', ['weddings']),
  coupleWave: p('couple-wave', 960, 735, 'Bride and groom waving to guests at their reception', ['weddings']),
  couplePortrait: p('couple-portrait', 768, 960, 'Bride holding a bouquet beside the groom in a white tuxedo jacket', ['weddings']),
  weddingParty: p('wedding-party', 960, 638, 'Bride and groom with groomsmen in black suits', ['weddings']),
  groomsmen: p('groomsmen', 960, 638, 'Groom and groomsmen in front of the named wedding backdrop', ['weddings']),
  tablesBlackGold: p('tables-black-gold', 1600, 1064, 'Tables dressed in champagne cloths with black plates, black goblets and gold cutlery', ['functions']),
  tablesGoblets: p('tables-goblets', 1600, 1064, 'Black goblets and crystal candle holders on a champagne table', ['functions']),
  tablesRow: p('tables-row', 1600, 1064, 'Rows of black velvet chairs around set tables', ['functions']),
  tablesDetail: p('tables-detail', 1600, 1064, 'Place setting with a printed programme on a black charger plate', ['functions']),
  conferenceMenu: p('conference-menu', 1064, 1600, 'Conference programme card resting on a black patterned plate with gold cutlery', ['functions']),
  celebrationCouple: p('celebration-couple', 1290, 1586, 'Celebrating couple posing in front of a dressed head table', ['functions']),
  celebrationSpeech: p('celebration-speech', 1284, 866, 'Guests of honour sharing a joyful moment at the head table', ['functions']),
  celebrationGift: p('celebration-gift', 930, 960, 'A guest of honour opening a gift at a celebration', ['functions']),
  celebrationGuest: p('celebration-guest', 960, 800, 'Guest of honour in a sequinned gown seated at the head table', ['functions']),
  thankyouBalloons: p('thankyou-balloons', 1600, 1064, 'Black and gold balloon arch beside a thank-you sign', ['functions']),
  thankyouBalloons2: p('thankyou-balloons-2', 1600, 1064, 'Gold and black balloons framing a welcome board', ['functions']),
  churchSpeaker: p('church-speaker', 1360, 906, 'A speaker addressing guests from a glass lectern', ['functions']),
  hallGreenGold: p('hall-green-gold', 1280, 960, 'Hall styled in emerald and gold with a balloon arch and long tables', ['functions', 'venue']),
  hallLongTables: p('hall-long-tables', 1280, 960, 'Long banquet tables with clear chairs and gold accents', ['functions', 'venue']),
  hallRedDecor: p('hall-red-decor', 1280, 960, 'Hall laid with dozens of round tables, white chair covers and red lanterns', ['functions', 'venue']),
  hallPanorama: p('hall-panorama', 1280, 365, 'Wide view of the hall dressed in red and gold with a chandelier', ['functions', 'venue']),
  hallEmpty: p('hall-empty', 765, 1020, 'The empty hall: a clear floor and high ceiling ready to be styled', ['venue']),
  entrance: p('entrance', 1280, 960, 'Covered entrance with the Emerald Function Venue sign', ['venue']),
  exteriorLawn: p('exterior-lawn', 1280, 960, 'The venue building behind a green lawn and palm trees', ['venue']),
  exteriorPalms: p('exterior-palms', 1280, 960, 'The venue seen across the lawn on a bright day', ['venue']),
  exteriorDusk: p('exterior-dusk', 960, 720, 'The venue lit up across the lawn at dusk', ['venue']),
} satisfies Record<string, Photo>;

export const gallery: Photo[] = Object.values(photos);

/* -------------------------------------------------------------------- home */

/** Headline lines; `i` lines are set in italic. */
export const hero = {
  lines: [
    {t: 'Say I do'},
    {t: 'in the garden.', i: true},
    {t: 'Celebrate'},
    {t: 'in Emerald.', i: true},
  ],
  body: 'A wedding and function venue in Pietermaritzburg — a lawn for your vows, a draped hall for the celebration, and a stage dressed for the two of you.',
  /**
   * Full-screen slides, in order. `focus` is the part of the photo kept in frame
   * when it's cropped to the screen (Tailwind object-position classes, so it can
   * differ on phones). The first is preloaded in index.html — keep the two in step.
   */
  slides: [
    // On wider screens show more of the left so the chaise sits beside the headline.
    {photo: photos.stageChaise, focus: 'object-[45%_60%] md:object-[18%_60%]'},
    {photo: photos.gardenCeremony, focus: 'object-[55%_45%]'},
    {photo: photos.hallChandelier, focus: 'object-center'},
    {photo: photos.tableSetting, focus: 'object-center'},
    {photo: photos.tablesBlackGold, focus: 'object-center'},
  ] as {photo: Photo; focus: string}[],
  book: ['Book a', 'viewing'],
};

export type Space = {
  id: PageId;
  name: [string, string];
  specs: [string, string][];
  photo: Photo;
  tint: string;
};

export const spaces: Space[] = [
  {id: 'weddings', name: ['Weddings', '& vows'], specs: [['Ceremony', 'Garden lawn'], ['Reception', 'Draped hall']], photo: photos.stageWide, tint: '#0d4a37'},
  {id: 'functions', name: ['Functions', '& events'], specs: [['Celebrations', 'Birthdays · anniversaries'], ['Gatherings', 'Conferences · church']], photo: photos.tablesBlackGold, tint: '#7a5c24'},
  {id: 'venue', name: ['The', 'venue'], specs: [['Grounds', 'Hall · garden · parking'], ['Access', 'Wheelchair friendly']], photo: photos.exteriorLawn, tint: '#2f5f52'},
];

export const intro = {
  eyebrow: 'The venue',
  lines: [{t: 'One address.'}, {t: 'A garden, a hall,'}, {t: 'and every detail', i: true}, {t: 'in between.', i: true}],
  body: 'Emerald sits on open lawns in Pietermaritzburg. Hold your ceremony on the grass, walk in to a hall dressed in soft draping and fairy lights, and finish the night on a stage set for you. The same hall turns black-and-gold for a milestone birthday or clean and bright for a conference.',
  facts: ['Garden ceremonies', 'Draped reception hall', 'Stage & backdrop', 'On-site parking', 'Wheelchair-accessible entrance', 'Accessible restrooms'],
  photo: photos.hallChandelier,
};

export const strip = [photos.tableSetting, photos.coupleWave, photos.hallGreenGold, photos.stageClose, photos.celebrationSpeech, photos.exteriorDusk, photos.tablesGoblets, photos.weddingParty];

export const cta = {
  lines: [{t: "Let's set"}, {t: 'the date.', i: true}],
  body: 'Tell us your date and the kind of day you have in mind. We’ll check availability and set up a time for you to see the venue.',
};

/* ---------------------------------------------------------------- weddings */

export const weddings = {
  eyebrow: 'Weddings',
  lines: [{t: 'Vows on'}, {t: 'the lawn,', i: true}, {t: 'dancing in'}, {t: 'the hall.', i: true}],
  photo: photos.stageWide,
  intro: 'From the first walk down the aisle to the last dance, your whole wedding can happen in one place. No convoy between venues, no lost time — just one beautiful day, start to finish.',
  chapters: [
    {
      n: '01',
      title: ['The', 'ceremony'],
      body: 'Say your vows outdoors on the garden lawn, with white chairs lined up either side of the aisle and the green hills of the Midlands behind you.',
      photos: [photos.gardenCeremony, photos.exteriorPalms],
    },
    {
      n: '02',
      title: ['The', 'reception'],
      body: 'Inside, the hall is softened with ceiling draping and fairy lights. Round tables, gold chairs and tall centrepieces turn it into a dining room for your guests.',
      photos: [photos.hallChandelier, photos.tableSetting],
    },
    {
      n: '03',
      title: ['The', 'stage'],
      body: 'A raised white stage with a carved backdrop, a rose garland and a tufted chaise — the place for photos, speeches and the two of you to be seen.',
      photos: [photos.stageClose, photos.stageGlass],
    },
  ],
  moments: [photos.coupleCertificate, photos.couplePortrait, photos.coupleWave, photos.weddingParty, photos.groomsmen, photos.stageChaise],
  steps: [
    ['Check your date', 'Call or WhatsApp us with your date and rough guest count.'],
    ['Come for a viewing', 'Walk the garden and the hall and picture the day.'],
    ['Plan the details', 'Talk through layout, décor and what you need from us.'],
    ['Celebrate', 'Arrive, say I do, and enjoy every minute.'],
  ] as [string, string][],
};

/* --------------------------------------------------------------- functions */

export const functions = {
  eyebrow: 'Functions & events',
  lines: [{t: 'Every'}, {t: 'occasion,', i: true}, {t: 'set with'}, {t: 'care.', i: true}],
  photo: photos.tablesBlackGold,
  intro: 'Weddings are only half the story. Emerald hosts milestone birthdays, anniversaries, conferences, church services and community gatherings — with a hall that changes character for each one.',
  types: [
    ['Birthdays & milestones', 'Twenty-first, fortieth, sixtieth — balloon arches, a dressed head table and room to dance.'],
    ['Anniversaries', 'Renew your vows or simply celebrate the years with family around you.'],
    ['Conferences & seminars', 'A bright, open hall with space for rows, round tables or a banquet layout.'],
    ['Church & community', 'Services, prayer meetings, awards and community days under one roof.'],
    ['Year-end functions', 'Thank your team with a proper night out, close to home.'],
    ['Family gatherings', 'Umemulo, umembeso, reunions, memorials and every family occasion in between.'],
  ] as [string, string][],
  styles: [
    {name: 'Black & gold', photo: photos.tablesBlackGold},
    {name: 'Emerald & gold', photo: photos.hallGreenGold},
    {name: 'Red & gold', photo: photos.hallRedDecor},
    {name: 'Long banquet', photo: photos.hallLongTables},
  ],
  moments: [photos.celebrationCouple, photos.celebrationSpeech, photos.conferenceMenu, photos.churchSpeaker, photos.thankyouBalloons, photos.celebrationGift],
};

/* ------------------------------------------------------------------- venue */

export const venue = {
  eyebrow: 'The venue',
  lines: [{t: 'A garden,'}, {t: 'a hall,', i: true}, {t: 'room to'}, {t: 'celebrate.', i: true}],
  photo: photos.entrance,
  intro: 'Emerald is a single-storey function hall set on open lawns in Pietermaritzburg, with parking on site and a wheelchair-accessible entrance.',
  spaces: [
    {name: ['The', 'hall'], body: 'A wide, high-ceilinged hall with a clear floor — a blank canvas for draping, a stage and any table layout you need.', photos: [photos.hallEmpty, photos.hallRedDecor]},
    {name: ['The', 'garden'], body: 'Open lawns around the building for outdoor ceremonies, photographs and guests to step out into the fresh air.', photos: [photos.gardenCeremony, photos.exteriorLawn]},
    {name: ['After', 'dark'], body: 'As the sun goes down the hall glows across the lawn — the evening is when the celebration really starts.', photos: [photos.exteriorDusk, photos.hallChandelier]},
  ],
  facilities: ['On-site parking', 'Wheelchair-accessible entrance', 'Accessible restrooms', 'Indoor hall & garden lawn', 'Raised stage & backdrop', 'Draping & fairy lights'],
};

/* ---------------------------------------------------------------- contact */

export const contactPage = {
  eyebrow: 'Contact',
  lines: [{t: "Let's talk"}, {t: 'about your day.', i: true}],
  body: 'Send us your date and a few details. The form opens WhatsApp with your message ready to send — or email it if you prefer. We’ll reply to confirm availability and arrange a viewing.',
  eventTypes: ['Wedding', 'Birthday / milestone', 'Anniversary', 'Conference / seminar', 'Church / community event', 'Year-end function', 'Family gathering', 'Something else'],
};

export const footer = {
  note: 'Weddings, celebrations and gatherings in Pietermaritzburg.',
};
