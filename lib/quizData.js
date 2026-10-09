/**
 * "What Watch Are You?" quiz data and scoring. Pure data, no React.
 */

export const SCALE_LABELS = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

export const CATEGORY_WEIGHTS = {
  dive:   { q1:  0, q2: +2, q3: +1, q4:  0, q5:  0, q6: +1, q7:  0, q8: -1, q9: +2, q10: +1 },
  dress:  { q1: -1, q2: -2, q3: -2, q4: +2, q5: -1, q6: -1, q7: +1, q8: -2, q9: -2, q10: +2 },
  chrono: { q1: +1, q2: -1, q3: +1, q4:  0, q5: +2, q6: -1, q7: -1, q8: +2, q9:  0, q10: +1 },
  field:  { q1: +2, q2: +2, q3: +2, q4: +1, q5:  0, q6: +2, q7: +2, q8:  0, q9:  0, q10:  0 },
  pilot:  { q1:  0, q2: +1, q3: +1, q4: +2, q5: +2, q6:  0, q7: -2, q8: +2, q9: +2, q10: +1 },
};

/** Tie-break order: earlier wins. */
export const CATEGORY_ORDER = ['dive', 'chrono', 'pilot', 'field', 'dress'];

const STATEMENTS = [
  "I'm careful with money.",
  "I'd rather be outside than anywhere else.",
  'Function always beats fashion.',
  'Old things have more character than new things.',
  'I like knowing how things work under the hood.',
  'I hate dealing with maintenance.',
  "I'd rather blend in than stand out.",
  'I measure everything - steps, time, calories, all of it.',
  "I take risks other people wouldn't.",
  'I care more about the story behind something than the price tag.',
];

export const QUIZ_QUESTIONS = STATEMENTS.map((statement, i) => {
  const id = `q${i + 1}`;
  const axes = Object.fromEntries(
    Object.entries(CATEGORY_WEIGHTS).map(([cat, weights]) => [cat, weights[id]])
  );
  return { id, statement, axes };
});

export const QUESTION_IDS = QUIZ_QUESTIONS.map((q) => q.id);

export const CATEGORY_INFO = {
  dive: {
    label: 'Dive Watch',
    definingFeature: 'Rotating bezel & high water resistance',
    originalPurpose: 'Timing oxygen tanks underwater',
    bestWornWith: 'Anything from swimwear to a casual suit',
  },
  dress: {
    label: 'Dress Watch',
    definingFeature: 'Ultra-thin case & leather strap',
    originalPurpose: 'Formal etiquette & slipping under cuffs',
    bestWornWith: 'Tuxedos, business suits, and formalwear',
  },
  chrono: {
    label: 'Chronograph',
    definingFeature: 'Built-in stopwatch & extra pushers',
    originalPurpose: 'Tracking racing lap times & navigation',
    bestWornWith: 'Jeans, t-shirts, and smart-casual jackets',
  },
  field: {
    label: 'Field Watch',
    definingFeature: 'High-contrast dial & military durability',
    originalPurpose: 'Coordinating troop movements in battle',
    bestWornWith: 'Rugged clothing, outdoor gear, and everyday casual',
  },
  pilot: {
    label: 'Pilot Watch',
    definingFeature: 'Oversized dial & massive winding crown',
    originalPurpose: 'Reading cockpit dials while wearing flight gloves',
    bestWornWith: 'Leather jackets, casual shirts, and travel clothes',
  },
};

const QUIZ_IMAGES = {
  'Seiko Pogue (6139)': '/quiz/seiko-pogue-6139.jpg',
  'Seagull 1963': '/quiz/seagull-1963.webp',
  'Seiko Speedtimer': '/quiz/seiko-speedtimer.jpg',
  'MoonSwatch (Omega x Swatch)': '/quiz/moonswatch.avif',
  'Paul Newman Daytona': '/quiz/paul-newman-daytona.jpg',
  'Omega Speedmaster Moonwatch': '/quiz/omega-speedmaster-moonwatch.png',
  'Rolex Daytona': '/quiz/rolex-daytona.png',
  'Bulova Lunar Pilot': '/quiz/bulova-lunar-pilot.webp',
  'Orient Bambino V2': '/quiz/orient-bambino-v2.webp',
  'Casio MTP-1370L-7AV': '/quiz/casio-mtp-1370l-7av.png',
  'Seiko Presage': '/quiz/seiko-presage.jpg',
  'Baltic HMS': '/quiz/baltic-hms.avif',
  'Patek Philippe Calatrava': '/quiz/patek-philippe-calatrava.avif',
  'Jaeger-LeCoultre Reverso Classic': '/quiz/jlc-reverso-classic.jpg',
  'Rolex Cellini': '/quiz/rolex-cellini.jpg',
  'Tank Must de Cartier': '/quiz/tank-must-de-cartier.jpg',
  'Vostok Amphibia': '/quiz/vostok-amphibia.jpg',
  'Casio Duro': '/quiz/casio-duro.png',
  'Seiko Captain Willard': '/quiz/seiko-captain-willard.webp',
  'Seiko Turtle (SRP series)': '/quiz/seiko-turtle-srp.webp',
  'Blancpain Fifty Fathoms': '/quiz/blancpain-fifty-fathoms.jpg',
  'Doxa Sub 200': '/quiz/doxa-sub-200.webp',
  'Omega Seamaster Diver 300M': '/quiz/omega-seamaster-diver-300m.png',
  'Rolex Submariner': '/quiz/rolex-submariner.png',
  'Benrus Military Field Watch': '/quiz/benrus-military-field.png',
  'Timex Expedition': '/quiz/timex-expedition.webp',
  'Seiko SPB121': '/quiz/seiko-spb121.jpg',
  'Hamilton Murph': '/quiz/hamilton-murph.png',
  'Omega Railmaster': '/quiz/omega-railmaster.png',
  'Weiss 38mm Standard Issue': '/quiz/weiss-38mm-standard-issue.webp',
  'Rolex Explorer': '/quiz/rolex-explorer.png',
  'Tudor Ranger': '/quiz/tudor-ranger.jpg',
  'Laco Aachen 42': '/quiz/laco-aachen-42.png',
  'Seiko 5 Sports SRPH29': '/quiz/seiko-5-sports-srph29.png',
  'Citizen Promaster Skyhawk A-T': '/quiz/citizen-promaster-skyhawk.webp',
  'Hamilton Khaki Aviation Pilot Day Date': '/quiz/hamilton-khaki-aviation-pilot.png',
  "IWC Pilot's Watch Mark XX": '/quiz/iwc-pilots-watch-mark-xx.jpg',
  'Tissot Telemeter': '/quiz/tissot-telemeter.png',
  'Breitling Navitimer B01': '/quiz/breitling-navitimer-b01.webp',
  'Rolex Air-King': '/quiz/rolex-air-king.png',
};

/* [category, budget, aesthetic, technical, name, brand, model, tagline, personality] */
const WATCH_ROWS = [
  // CHRONOGRAPH
  ['chrono', 'budget', 'vintage', 'enthusiast', 'Seiko Pogue (6139)', 'Seiko', '6139', 'The Space Nerd',
    "You're the person who reads the Wikipedia page before anyone else even knows the topic exists. You dig into the real history, you respect what came first, and you care more about the story than the hype. Everyone else is googling 'best first watch.' You're three tabs deep in a NASA mission report."],
  ['chrono', 'budget', 'vintage', 'wearit', 'Seagull 1963', 'Seagull', '1963', 'The Value Hunter',
    "You'd rather have a hand-wound column wheel chronograph for $250 than a quartz fashion watch for $500. You care about craft, you care about history, and you know when something has no business being this good at this price. Value is your language."],
  ['chrono', 'budget', 'modern', 'enthusiast', 'Seiko Speedtimer', 'Seiko', 'Speedtimer', 'The Optimizer',
    "You don't pay for names, you pay for specs. You research everything, you compare everything, and when something outperforms its price tag, you're the first one to find it. You don't settle, you optimize."],
  ['chrono', 'budget', 'modern', 'wearit', 'MoonSwatch (Omega x Swatch)', 'Omega x Swatch', 'MoonSwatch', 'The Conversation Starter',
    "You like fun more than you like rules. You're tapped into culture, you move fast when something catches your eye, and you're not interested in proving anything to the watch community. You'd rather start a conversation than win an argument."],
  ['chrono', 'spend', 'vintage', 'enthusiast', 'Paul Newman Daytona', 'Rolex', 'Daytona "Paul Newman"', 'The Archivist',
    "You're the person who knows the full story before anyone else finishes the headline. You have taste, you have patience, and you have the budget to back both up. When you care about something, you go deep, not wide."],
  ['chrono', 'spend', 'vintage', 'wearit', 'Omega Speedmaster Moonwatch', 'Omega', 'Speedmaster Moonwatch', 'The Moon Ticket',
    "You appreciate history but you're not trying to live in a museum. You like knowing the story behind something without needing to give a lecture about it at dinner. The Moonwatch went to space. You just want it on your wrist."],
  ['chrono', 'spend', 'modern', 'enthusiast', 'Rolex Daytona', 'Rolex', 'Cosmograph Daytona', 'The Closer',
    "You want the best, you know what the best is, and you're willing to work for it. You track every detail because that's how you stay ahead. The Daytona isn't a flex for you. It's a finish line."],
  ['chrono', 'spend', 'modern', 'wearit', 'Bulova Lunar Pilot', 'Bulova', 'Lunar Pilot', 'The Sleeper',
    "You don't follow the crowd and you don't need their approval. You do your own research, you find your own path, and what you end up with is always better than what everyone else settled for. You'd rather surprise people than impress them."],

  // DRESS
  ['dress', 'budget', 'vintage', 'enthusiast', 'Orient Bambino V2', 'Orient', 'Bambino V2', 'The Gentleman on a Budget',
    "You have an eye that most people have to pay for. You notice the details, you know what looks right, and you don't need a big number on the price tag to prove it. Taste isn't something you buy. It's something you already have."],
  ['dress', 'budget', 'vintage', 'wearit', 'Casio MTP-1370L-7AV', 'Casio', 'MTP-1370L-7AV', 'The Sleight of Hand',
    "Nobody believes this watch costs less than a pizza. Silver dial, leather strap, day-date window. You look like you spent $300. You didn't. You spent $25 and kept the difference. That's not cheap. That's strategy."],
  ['dress', 'budget', 'modern', 'enthusiast', 'Seiko Presage', 'Seiko', 'Presage', 'The Cocktail Hour',
    "You notice the dial texture before you notice the brand name. Details matter to you even when nobody else sees them. You dress well for yourself, not for the room, and you expect the things on your wrist to meet the same standard."],
  ['dress', 'budget', 'modern', 'wearit', 'Baltic HMS', 'Baltic', 'HMS', 'The Indie Pick',
    "You trust your own eye more than a logo. You find brands most people haven't heard of, and that's part of the appeal. You're not contrarian for the sake of it. You just know what looks good before everyone else catches on."],
  ['dress', 'spend', 'vintage', 'enthusiast', 'Patek Philippe Calatrava', 'Patek Philippe', 'Calatrava', 'The Quiet Room',
    "You don't walk into a room loud. You don't need to. You have the money and you have the restraint, and that combination is rarer than most people think. Real luxury doesn't announce itself, and neither do you."],
  ['dress', 'spend', 'vintage', 'wearit', 'Jaeger-LeCoultre Reverso Classic', 'Jaeger-LeCoultre', 'Reverso Classic', 'The Art Deco',
    "You appreciate design that solves a real problem. You gravitate toward things that are elegant because they're functional, not because someone told you they were luxury. Beauty and brains aren't separate categories for you."],
  ['dress', 'spend', 'modern', 'enthusiast', 'Rolex Cellini', 'Rolex', 'Cellini', 'The Boardroom',
    "Everyone else goes for the Submariner. You walk past it and head straight to the dress case. In-house movements, moonphase complications, finishing that competes with watches twice the price. You don't go for the popular choice. You go for the right one."],
  ['dress', 'spend', 'modern', 'wearit', 'Tank Must de Cartier', 'Cartier', 'Tank Must', 'The Icon',
    "You don't need a round watch to feel like you're wearing a real one. You gravitate toward shapes, toward design, toward things that set trends instead of following them. The Tank has been on the wrists of presidents and artists, and you'd fit right in."],

  // DIVE
  ['dive', 'budget', 'vintage', 'enthusiast', 'Vostok Amphibia', 'Vostok', 'Amphibia', 'The Cold Warrior',
    "You love a good underdog story. You're drawn to things that were built tough for a reason, not for a marketing campaign. You respect function over flash, and you'd rather have something with real history than a pretty logo."],
  ['dive', 'budget', 'vintage', 'wearit', 'Casio Duro', 'Casio', 'MDV-106', 'The $50 Legend',
    "You don't overthink it. You want something that works, works hard, and costs less than dinner. You're practical to your core, and you've never understood why people pay more for something that does the same job."],
  ['dive', 'budget', 'modern', 'enthusiast', 'Seiko Captain Willard', 'Seiko', 'Captain Willard', 'The Apocalypse',
    "You like things that look like they've been through something. You're drawn to character, to grit, to the version of things that earned their reputation the hard way. You'd rather look interesting than polished."],
  ['dive', 'budget', 'modern', 'wearit', 'Seiko Turtle (SRP series)', 'Seiko', 'Turtle (SRP series)', 'The Unkillable',
    "You don't baby your stuff and you don't need to. You want something reliable that you can forget about and it'll still be there tomorrow. Low maintenance isn't laziness for you. It's a lifestyle."],
  ['dive', 'spend', 'vintage', 'enthusiast', 'Blancpain Fifty Fathoms', 'Blancpain', 'Fifty Fathoms', 'The Original',
    "You care about who did it first, not who does it loudest. You have the budget to go anywhere, and you choose the one with the deepest roots. You respect origin stories because you know everything else is a remix."],
  ['dive', 'spend', 'vintage', 'wearit', 'Doxa Sub 200', 'Doxa', 'Sub 200', 'The Dive Bar',
    "You know all the best spots nobody else knows about. You're not trying to be exclusive, you just got there first. You value character over credentials, and you'd pick a place with a story over a place with a dress code every time."],
  ['dive', 'spend', 'modern', 'enthusiast', 'Omega Seamaster Diver 300M', 'Omega', 'Seamaster Diver 300M', 'The Double-O',
    "You like nice things and you're not shy about it. You want something that performs and looks good doing it. You're confident without being loud, and you'd rather be known for what you do than what you wear."],
  ['dive', 'spend', 'modern', 'wearit', 'Rolex Submariner', 'Rolex', 'Submariner', 'The One',
    "You don't need to explain yourself. You know what works, you know what lasts, and you don't second-guess it. You're not chasing trends. You made your choice a long time ago."],

  // FIELD
  ['field', 'budget', 'vintage', 'enthusiast', 'Benrus Military Field Watch', 'Benrus', 'Military Field Watch', 'The Grunt',
    "You don't need the newest version of anything. You respect the original, the one that actually did the job before anyone turned it into a lifestyle product. You're no-nonsense, and you'd rather have history on your side than hype."],
  ['field', 'budget', 'vintage', 'wearit', 'Timex Expedition', 'Timex', 'Expedition', 'The Scout',
    "You don't complicate things. You need something that tells the time, takes a beating, and doesn't ask for attention. You're reliable, you're low-key, and you've never cared about impressing strangers."],
  ['field', 'budget', 'modern', 'enthusiast', 'Seiko SPB121', 'Seiko', 'SPB121', 'The Ranger',
    "You want quality but you don't want to talk about it. You do your homework, you find the one that punches above its weight, and you move on. You're the kind of person who's quietly better-equipped than everyone else in the room."],
  ['field', 'budget', 'modern', 'wearit', 'Hamilton Murph', 'Hamilton', 'Khaki Field Murph', 'The Interstellar',
    "You're a romantic about the things you care about. A good story pulls you in, and you don't mind admitting it. You want something that means something, not just something that works. Function and feeling aren't separate categories for you."],
  ['field', 'spend', 'vintage', 'enthusiast', 'Omega Railmaster', 'Omega', 'Railmaster', 'The Ironside',
    "You respect the tools that built things. You're drawn to history that's industrial, not decorative. You have the money to go flashy, but you'd rather have something with a blue-collar soul and white-collar finishing."],
  ['field', 'spend', 'vintage', 'wearit', 'Weiss 38mm Standard Issue', 'Weiss', '38mm Standard Issue', 'The Patriot',
    "You care about where things come from and who made them. You'd rather pay more for something built with intention than save money on something built by committee. Craft matters to you. Origin matters to you."],
  ['field', 'spend', 'modern', 'enthusiast', 'Rolex Explorer', 'Rolex', 'Explorer', 'The Summit',
    "You don't need the loudest thing in the room. You need the one that shows up every single time. You're driven, you're consistent, and you measure yourself by what you finish, not what you start."],
  ['field', 'spend', 'modern', 'wearit', 'Tudor Ranger', 'Tudor', 'Ranger', 'The Backbone',
    "You do the work without needing the credit. You're dependable, you're steady, and you've never needed a spotlight to know your value. You'd rather be the person everyone counts on than the one everyone notices."],

  // PILOT
  ['pilot', 'budget', 'vintage', 'enthusiast', 'Laco Aachen 42', 'Laco', 'Aachen 42', 'The Flieger',
    "You respect the original blueprint. You don't need updates, redesigns, or modern reinterpretations. When something was done right the first time, you leave it alone. You're a purist, and you're comfortable with that."],
  ['pilot', 'budget', 'vintage', 'wearit', 'Seiko 5 Sports SRPH29', 'Seiko', '5 Sports SRPH29', 'The Co-Pilot',
    "You like the look without needing the lecture. You're drawn to style, not specs, and you'd rather wear something that looks good than memorize its history. You're easygoing, you trust your eye, and that's enough."],
  ['pilot', 'budget', 'modern', 'enthusiast', 'Citizen Promaster Skyhawk A-T', 'Citizen', 'Promaster Skyhawk A-T', 'The Control Tower',
    "You want every function, every feature, every piece of data on your wrist. You're the person who reads the full manual. You like complexity because you can actually use it, and you'd rather have too much information than not enough."],
  ['pilot', 'budget', 'modern', 'wearit', 'Hamilton Khaki Aviation Pilot Day Date', 'Hamilton', 'Khaki Aviation Pilot Day Date', 'The Runway',
    "You keep it clean and you keep it simple. You like things that do their job without drama. You're practical, you're sharp, and you don't need a complicated backstory to know what works."],
  ['pilot', 'spend', 'vintage', 'enthusiast', "IWC Pilot's Watch Mark XX", 'IWC', "Pilot's Watch Mark XX", 'The Officer',
    "You carry yourself with discipline. You're precise, you're intentional, and nothing about you is accidental. You have the budget to go loud, but restraint is your signature."],
  ['pilot', 'spend', 'vintage', 'wearit', 'Tissot Telemeter', 'Tissot', 'Telemeter', 'The Navigator',
    "You appreciate instruments. Not jewelry, not accessories, instruments. You're the kind of person who respects what something was designed to do, and you'd rather have a tool with heritage than a fashion piece with a campaign."],
  ['pilot', 'spend', 'modern', 'enthusiast', 'Breitling Navitimer B01', 'Breitling', 'Navitimer B01', 'The Slide Rule',
    "You're not afraid of complexity. Where other people see clutter, you see information. You like depth, you like detail, and you've never been satisfied with the simple version of anything."],
  ['pilot', 'spend', 'modern', 'wearit', 'Rolex Air-King', 'Rolex', 'Air-King', 'The Jet Setter',
    "You move. Different cities, different rooms, different energy. You're adaptable, you're confident in new spaces, and you don't need to anchor yourself to one identity. You're comfortable everywhere because you don't try too hard anywhere."],
];

function buildWatchResults() {
  const results = {};
  for (const row of WATCH_ROWS) {
    const [cat, budget, aesthetic, technical, name, brand, model, tagline, personality] = row;
    const imageUrl = QUIZ_IMAGES[name] || '';
    const { label, ...categoryInfo } = CATEGORY_INFO[cat];
    results[cat] ??= {};
    results[cat][budget] ??= {};
    results[cat][budget][aesthetic] ??= {};
    results[cat][budget][aesthetic][technical] = {
      name,
      brand,
      model,
      category: label,
      categoryInfo,
      axes: { budget, aesthetic, technical },
      personality,
      tagline,
      imageUrl,
    };
  }
  return results;
}

export const WATCH_RESULTS = buildWatchResults();

const AXIS_THRESHOLD = 3.5;

function average(a, b) {
  return (a + b) / 2;
}

/**
 * Category totals use centered answers (answer - 3) so "disagree" subtracts
 * and every category is reachable. Secondary axes use the raw 1-5 answers.
 */
export function getCategoryScores(answers) {
  return Object.fromEntries(
    CATEGORY_ORDER.map((cat) => [
      cat,
      QUESTION_IDS.reduce((sum, q) => sum + CATEGORY_WEIGHTS[cat][q] * (answers[q] - 3), 0),
    ])
  );
}

export function getQuizResult(answers) {
  const totals = getCategoryScores(answers);
  let category = CATEGORY_ORDER[0];
  for (const cat of CATEGORY_ORDER) {
    if (totals[cat] > totals[category]) category = cat;
  }

  const scores = {
    budget: average(answers.q1, answers.q3),
    aesthetic: average(answers.q4, answers.q7),
    technical: average(answers.q5, answers.q8),
  };
  const budgetAxis = scores.budget >= AXIS_THRESHOLD ? 'budget' : 'spend';
  const aestheticAxis = scores.aesthetic >= AXIS_THRESHOLD ? 'vintage' : 'modern';
  const technicalAxis = scores.technical >= AXIS_THRESHOLD ? 'enthusiast' : 'wearit';

  return {
    category,
    budgetAxis,
    aestheticAxis,
    technicalAxis,
    watch: WATCH_RESULTS[category][budgetAxis][aestheticAxis][technicalAxis],
    scores,
  };
}
