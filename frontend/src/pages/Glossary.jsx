const GlossaryCallout = ({ label, linkText, url }) => (
  <div className="glossary-callout">
    <span className="glossary-callout-label">{label}</span>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="glossary-callout-link"
    >
      {linkText}
    </a>
  </div>
);

const Term = ({ name, children }) => (
  <div className="glossary-term">
    <h3 className="glossary-term-name">{name}</h3>
    <p className="glossary-term-def">{children}</p>
  </div>
);

const GlossarySection = ({ heading, children }) => (
  <section className="glossary-section">
    <h2 className="glossary-section-heading">{heading}</h2>
    {children}
  </section>
);

const Glossary = () => (
  <main className="glossary-page">

    <header className="glossary-header">
      <h1>The T1NKER Glossary</h1>
      <p className="glossary-subhead">Watch collecting has a language. Here&apos;s your decoder ring.</p>
    </header>

    {/* ── Section 1: Movement & Mechanics ── */}
    <GlossarySection heading="Movement &amp; Mechanics">
      <div className="glossary-terms">
        <Term name="Beat Rate">
          The number of times a mechanical watch movement oscillates per hour. Most everyday
          mechanical watches beat at 28,800 bph (beats per hour). A higher beat rate generally
          means smoother seconds hand movement and better accuracy. When you regulate a watch,
          you&apos;re adjusting how fast or slow it beats relative to true time.
        </Term>
        <Term name="Regulation">
          The process of adjusting a mechanical watch movement to improve its timekeeping
          accuracy. Regulation is done by moving a small lever on the movement that controls the
          effective length of the hairspring. A well-regulated watch should gain or lose no more
          than a few seconds per day.
        </Term>
        <Term name="Power Reserve">
          How long a mechanical watch will run on a full wind before stopping. A typical
          manual-wind watch has a 40–48 hour power reserve. Automatic watches wind themselves
          through wrist movement but will stop if left unworn long enough.
        </Term>
        <Term name="Automatic Movement">
          A self-winding mechanical movement that uses a rotor to wind the mainspring through
          the natural motion of the wearer&apos;s wrist. No battery required. If you wear it
          regularly, it stays wound.
        </Term>
        <Term name="Manual Wind">
          A mechanical movement that requires the wearer to wind the crown by hand, typically
          daily. Simpler in construction than an automatic, often found in vintage and dress
          watches.
        </Term>
        <Term name="NH35 / NH38">
          Popular Seiko-made automatic movements widely used in affordable and mid-range
          watches. The NH35 includes a date complication, the NH38 does not. These movements
          are reliable, serviceable, and a common starting point for watch modders and franken
          builders.
        </Term>
      </div>
      <div className="glossary-callouts">
        <GlossaryCallout
          label="Tools for getting on the bench"
          linkText="Shop the T1NKER Tool List"
          url="https://benable.com/regul8dcaffien8d/best-value-tools-for-watch-tinkering-cd"
        />
      </div>
    </GlossarySection>

    {/* ── Section 2: Case & Dial ── */}
    <GlossarySection heading="Case &amp; Dial">
      <div className="glossary-terms">
        <Term name="Dial">
          The face of the watch. What most people think of when they picture a watch. Dials can
          be made from an enormous range of materials including enamel, lacquer, meteorite,
          wood, and more.
        </Term>
        <Term name="Case">
          The housing that holds the movement and dial. Cases come in a range of materials
          including stainless steel, titanium, gold, and various alloys. Case shape, size, and
          finishing are major factors in how a watch wears and looks.
        </Term>
        <Term name="Lug Width">
          The distance between the lugs (the protruding parts of the case where the strap or
          bracelet attaches), measured in millimeters. Lug width determines which straps and
          bracelets are compatible with a given watch. Knowing your lug width is essential for
          swapping straps.
        </Term>
        <Term name="Bezel">
          The ring surrounding the watch crystal. Bezels can be fixed or rotating and serve
          decorative or functional purposes. A dive watch bezel tracks elapsed time underwater.
          A GMT bezel tracks a second time zone.
        </Term>
        <Term name="Crown">
          The small knob on the side of the watch case used to set the time, date, and wind the
          movement. Crowns can be screwed down for water resistance or left unsecured on dress
          watches.
        </Term>
        <Term name="Sapphire Crystal">
          A watch glass made from synthetic sapphire, rated 9 on the Mohs hardness scale.
          Extremely scratch resistant. The standard for mid to high-end watches. Contrast with
          mineral crystal, which is cheaper and scratches more easily, and acrylic crystal,
          common on vintage watches.
        </Term>
      </div>
      <div className="glossary-callouts">
        <GlossaryCallout
          label="Everything a real collector needs"
          linkText="Shop Must Have Collector Accessories"
          url="https://benable.com/regul8dcaffien8d/must-have-watch-collector-accessories-in-2026-real-collector-picks"
        />
      </div>
    </GlossarySection>

    {/* ── Section 3: Complications ── */}
    <GlossarySection heading="Complications">
      <div className="glossary-terms">
        <Term name="Complication">
          Any watch function beyond basic timekeeping. Common complications include date,
          chronograph, moon phase, GMT, and tourbillon. The more complications, the more
          complex and typically more expensive the watch.
        </Term>
        <Term name="GMT">
          Greenwich Mean Time. A GMT complication allows the wearer to track a second time zone
          simultaneously. Often displayed via an additional hand pointing to a 24-hour bezel.
          Popular with travelers and watch nerds who just think they look cool.
        </Term>
        <Term name="Chronograph">
          A watch with a built-in stopwatch function. Operated via pushers on the side of the
          case. Chronographs are one of the most popular complications in collecting.
        </Term>
      </div>
      <div className="glossary-callouts">
        <GlossaryCallout
          label="Great watches with complications under $200"
          linkText="Shop Best Watches Under $200"
          url="https://benable.com/regul8dcaffien8d/20-watches-under-200-worth-every-dollar"
        />
      </div>
    </GlossarySection>

    {/* ── Section 4: The Culture ── */}
    <GlossarySection heading="The Culture">
      <div className="glossary-terms">
        <Term name="Homage Watch">
          A watch that is inspired by or closely resembles a more expensive, iconic timepiece
          without directly copying trademarks or logos. Homage watches are legal, often
          well-made, and a legitimate entry point into the hobby. The debate around them is one
          of the most heated in watch collecting. T1NKER covers them honestly.
        </Term>
        <Term name="Franken Build">
          A watch assembled from parts sourced from different watches, often different
          references or even brands. Named after Frankenstein. A well-executed franken build can
          produce a unique timepiece that performs as well as any stock watch. A bad one is just
          chaos on a strap.
        </Term>
        <Term name="Watch Modding">
          The practice of customizing a stock watch by swapping parts such as dials, hands,
          bezels, or crowns. Modding is a growing segment of the hobby and a gateway into
          understanding how watches are assembled.
        </Term>
        <Term name="Patina">
          The natural aging and discoloration of watch dials, hands, and cases over time. In
          vintage collecting, patina is often desirable and adds to the character and value of a
          piece. Tropical dials, which develop a brown tone from UV exposure, are among the most
          sought-after examples.
        </Term>
        <Term name="Tropical Dial">
          A vintage watch dial that has shifted in color over decades of UV exposure, typically
          from black or dark tones to brown, chocolate, or caramel. Tropical dials command
          significant premiums in the vintage market.
        </Term>
      </div>
      <div className="glossary-callouts">
        <GlossaryCallout
          label="Value picks from a real collector"
          linkText="Shop Best Bang for Your Buck Watches"
          url="https://benable.com/regul8dcaffien8d/my-watches-fe"
        />
        <GlossaryCallout
          label="Get on the bench"
          linkText="Shop T1NKER Tool List"
          url="https://benable.com/regul8dcaffien8d/best-value-tools-for-watch-tinkering-cd"
        />
      </div>
    </GlossarySection>

    {/* ── Section 5: Collecting Basics ── */}
    <GlossarySection heading="Collecting Basics">
      <div className="glossary-terms">
        <Term name="Movement">
          The engine of the watch. The movement is the internal mechanism that powers
          timekeeping. Movements can be mechanical (manual or automatic) or quartz (battery
          powered). Collectors generally geek out over mechanical movements.
        </Term>
        <Term name="Water Resistance">
          A rating that indicates how much water pressure a watch can withstand. Commonly
          expressed in ATM or meters. 3ATM means splash resistant only. 10ATM or 100m is
          suitable for swimming. 20ATM or 200m is suitable for diving. These ratings are tested
          under static pressure and do not account for the additional force of moving water.
        </Term>
        <Term name="Lume">
          Short for luminous material. Applied to watch hands and hour markers to allow reading
          in low light or darkness. Modern lume is typically Super-LumiNova, a non-radioactive
          photoluminescent material that charges in light and glows in the dark.
        </Term>
        <Term name="Service Interval">
          The recommended period between full mechanical servicing of a watch movement. Most
          manufacturers recommend servicing every 5–10 years. A service typically involves
          disassembly, cleaning, lubrication, and regulation of the movement.
        </Term>
      </div>
      <div className="glossary-callouts">
        <GlossaryCallout
          label="Straps, storage, and collector essentials"
          linkText="Shop Must Have Collector Accessories"
          url="https://benable.com/regul8dcaffien8d/must-have-watch-collector-accessories-in-2026-real-collector-picks"
        />
        <GlossaryCallout
          label="Start your collection the right way"
          linkText="Shop Best Watches Under $200"
          url="https://benable.com/regul8dcaffien8d/20-watches-under-200-worth-every-dollar"
        />
      </div>
    </GlossarySection>

  </main>
);

export default Glossary;
