import { createPageMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';
import GlossaryContent from './GlossaryContent';

export const metadata = createPageMetadata({
  title: 'Watch Glossary',
  description:
    'A plain-language glossary of watch collecting terms. From beat rate to franken builds, Regul8d Caffein8d breaks down the hobby so every collector can keep up.',
  path: '/glossary',
});

const glossaryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': `${absoluteUrl('/glossary')}#glossary`,
  name: 'The T1NKER Watch Glossary',
  description: 'A plain-language glossary of watch collecting terms.',
  url: absoluteUrl('/glossary'),
  definedTerm: [
    {
      '@type': 'DefinedTerm',
      name: 'Beat Rate',
      description:
        'The number of times a mechanical watch movement oscillates per hour, often 28,800 beats on an everyday watch.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Regulation',
      description:
        'The process of adjusting a mechanical watch movement so it keeps time more accurately.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Power Reserve',
      description: 'How long a mechanical watch runs on a full wind before it stops.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Automatic Movement',
      description:
        'A self-winding mechanical movement that uses a rotor to wind the mainspring as you wear the watch.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Manual Wind',
      description: 'A mechanical movement you wind by hand at the crown, usually once a day.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'NH35 / NH38',
      description:
        'Popular Seiko automatic movements used in affordable watches, with the NH35 adding a date and the NH38 leaving it off.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Dial',
      description:
        'The face of the watch, made from materials that range from enamel and lacquer to meteorite and wood.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Case',
      description:
        'The housing that holds the movement and dial, shaped and finished in steel, titanium, gold, or other alloys.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Lug Width',
      description:
        'The millimeter distance between the lugs, which decides which straps and bracelets fit the watch.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Bezel',
      description:
        'The ring around the crystal, fixed or rotating, used for looks or for timing functions like a dive or GMT scale.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Crown',
      description:
        'The knob on the side of the case used to set the time and date and to wind the movement.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Sapphire Crystal',
      description:
        'A synthetic sapphire watch glass that resists scratches and is the usual choice on mid-range and higher watches.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Complication',
      description:
        'Any function beyond telling the time, such as a date, chronograph, moon phase, GMT, or tourbillon.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'GMT',
      description:
        'A complication that tracks a second time zone, often with an extra hand and a 24-hour bezel.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Chronograph',
      description:
        'A watch with a built-in stopwatch, started and stopped with pushers on the side of the case.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Homage Watch',
      description:
        'A watch inspired by a famous, more expensive design without copying its trademarks or logos.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Franken Build',
      description:
        'A watch built from parts taken from different watches, references, or even brands.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Watch Modding',
      description:
        'Customizing a stock watch by swapping parts such as the dial, hands, bezel, or crown.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Patina',
      description:
        'The natural aging and color shift of a dial, hands, or case that vintage collectors often want.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Tropical Dial',
      description:
        'A vintage dial that has faded toward brown, chocolate, or caramel after years of UV exposure.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Movement',
      description: 'The mechanism inside the watch that keeps time, either mechanical or quartz.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Water Resistance',
      description:
        'A rating, in ATM or meters, for how much water pressure a watch is built to handle.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Lume',
      description:
        'Luminous material on the hands and markers that charges in light and glows in the dark.',
    },
    {
      '@type': 'DefinedTerm',
      name: 'Service Interval',
      description:
        'The recommended time between full services of a mechanical movement, often every 5 to 10 years.',
    },
  ],
};

export default function GlossaryPage() {
  return (
    <main id="main-content" className="glossary-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryJsonLd) }}
      />
      <GlossaryContent />
    </main>
  );
}
