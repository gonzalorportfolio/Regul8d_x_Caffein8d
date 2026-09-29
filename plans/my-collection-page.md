# Watch Collection Page — Build Spec

This document is the complete specification for a personal watch collection page. It is written to be handed directly to Cursor. Everything needed to build the page is here: the data model, every dropdown's options, the silhouette system, and the display rules.

---

## 1. Project goal

A page that showcases a personal watch collection. It is **picture-focused**: each watch is presented mainly through photos and a clean set of attributes, so that anyone looking at a watch knows exactly what they are looking at.

Two things need to be built:

1. **An entry form** to add or edit a watch (dropdowns, checkboxes, and text inputs, with an "Other" option that reveals a free-text box).
2. **A display page** that shows each watch's photos and its attributes, with silhouette icons next to the shape-based values.

IMPORTANT!
The form must not be visible to the public. This will be accesible to admin only. This must also be a part of the build.
---

## 1.5 Tech stack

| Layer | Choice |
|---|---|
| Framework | **Next.js** (App Router) |
| Database | **PostgreSQL on Neon** |
| Hosting / deployment | **Vercel** |
| Language | TypeScript |

**Stack notes for Cursor:**

- **Neon connection.** Vercel functions are serverless, so use Neon's **pooled connection string** (the one with `-pooler` in the hostname) for app queries. Use the **direct (unpooled) connection string** only for migrations. Store both as environment variables (`DATABASE_URL` and `DATABASE_URL_UNPOOLED`) in Vercel and in a local `.env.local`. Never commit them.
- **Database client.** Use either the `@neondatabase/serverless` driver or an ORM that supports it (Drizzle or Prisma). Drizzle is a good default for a small project. Pick one and stay consistent.
- **Photo storage.** A Postgres database should not store image files. Store only the image URLs in the database and keep the files in object storage. **Vercel Blob** is the simplest fit when deploying on Vercel. See section 8.3.
- **Rendering.** The public display page reads from the database and can be a Server Component. Use ISR (revalidate) or on-demand revalidation when a watch is added or edited, so the page stays fast and up to date.
- **Admin access.** The entry form must not be publicly writable. See section 7.1.
- **Silhouette files** live in `/public/silhouettes/` and ship with the deployment. They are not stored in Blob or the database.

---

## 2. How the attribute list was derived

The field list was worked out backwards from four real product spec sheets:

| Source | Watch | Style of listing |
|---|---|---|
| Jomashop | Rolex Datejust 41 (M126300-0001) | Retail catalog, grouped sections |
| Seiko | Prospex SPB155 | Manufacturer, Overview / Case / Movement |
| Omega | Seamaster Diver 300M 38 mm (220.12.38.20.03.001) | Manufacturer, summary plus detailed block |
| Pagani Design | GMT with DG5833GMT movement | Marketing copy mixed with specs |

**What was intentionally dropped** (retail/catalog data that does not help someone understand a watch): UPC code, warranty, department, category, item variation, box type, gender.

**Label decisions where sources disagreed:**

| Use this label | Instead of |
|---|---|
| Case Diameter | Case Size |
| Thickness (Case Height) | Case Height / Thickness |
| Lug Width | Between Lugs |
| Movement Type | Movement |
| Caliber | Engine |

---

## 3. Field conventions

Each field has a **type**. Use these types consistently.

| Type | Meaning |
|---|---|
| `text` | Free text input |
| `number` | Numeric input with a unit shown next to it |
| `select` | Single-choice dropdown. Always includes **Other**. |
| `multiselect` | Checkbox group. Always includes **Other**. |
| `select+silhouette` | Single-choice dropdown where each option shows a silhouette icon |
| `optional-group` | The whole group only appears if the watch has that feature (for example, a bezel) |

### The "Other" rule

Every `select`, `multiselect`, and `select+silhouette` field ends with an **Other** option. When **Other** is chosen, a text input appears so the user can type a custom value. The custom value is stored alongside the field, and the display page shows the custom text in place of the word "Other".

### Units

- Lengths: **millimeters (mm)**
- Weight: **grams (g)**
- Water resistance: store in **meters**, display feet alongside (1 m = 3.281 ft, round to the nearest whole number). Example: `100 m / 328 ft`
- Power reserve: **hours**

---

## 4. The field list

### 4.1 Identity

| Field | Key | Type | Options |
|---|---|---|---|
| Brand | `brand` | text | |
| Collection / Model name | `collection` | text | |
| Reference number | `reference` | text | |
| Style | `style` | select | Dive, Field, Dress, Pilot, GMT, Chronograph, Racing, Sport, Casual, Other |

### 4.2 Case

| Field | Key | Type | Options / unit |
|---|---|---|---|
| Case diameter | `caseDiameter` | number | mm |
| Thickness (Case Height) | `thickness` | number | mm |
| Lug-to-lug | `lugToLug` | number | mm |
| Lug width | `lugWidth` | number | mm |
| Weight | `weight` | number | g |
| Water resistance | `waterResistance` | number | m (show ft alongside) |
| Case material | `caseMaterial` | select | Stainless steel, Titanium, Bronze, Gold, Ceramic, Carbon, Other |
| Case material grade | `caseMaterialGrade` | text | Optional, for example `316L` |
| Case finish | `caseFinish` | select | Polished, Brushed, Mixed, Bead-blasted / Matte, Other |
| **Case shape** | `caseShape` | select+silhouette | Round, Cushion, Tonneau, Square, Rectangular, Oval, Octagonal, Asymmetrical, Other |
| **Case back** | `caseBack` | select+silhouette | Solid, Exhibition, Other |
| Case back fastening | `caseBackFastening` | select | Screw-down, Snap-on, Bayonet, Other |
| **Crown type** | `crownType` | select+silhouette | Push-pull, Screw-down, Screw-down with guards, Recessed, Onion, Other |
| **Lug style** | `lugStyle` | select+silhouette | Straight, Curved, Hooded, Drilled, Articulated, Integrated (no lugs), Other |

### 4.3 Dial and crystal

| Field | Key | Type | Options |
|---|---|---|---|
| Dial color | `dialColor` | text | Free text, for example "Sunburst blue" |
| Crystal | `crystal` | select | Sapphire, Mineral, Acrylic (Hesalite), Other |
| Crystal notes | `crystalNotes` | text | Optional. Shape and coating, for example "Domed, AR coating both sides" |
| Lume | `lume` | select | Super-LumiNova, LumiBrite, Tritium, None, Other |
| Lume placement | `lumePlacement` | text | Optional, for example "Hands and indices" |
| **Hands** | `hands` | select+silhouette | Sword, Dauphine, Baton, Leaf, Cathedral, Mercedes, Snowflake, Alpha, Breguet, Pencil, Syringe, Arrow, Other |
| **Dial markers** | `dialMarkers` | select+silhouette | Baton, Stick, Dot / Round, Arabic numerals, Roman numerals, Dagger, Triangle / Arrow, Mixed, None, Other |

### 4.4 Bezel (`optional-group`)

Show this group only if the watch has a bezel. Include a top-level checkbox: **"This watch has a bezel."**

| Field | Key | Type | Options |
|---|---|---|---|
| Bezel material | `bezelMaterial` | select | Steel, Ceramic, Aluminum, Sapphire, Other |
| Bezel color | `bezelColor` | text | |
| Bezel action | `bezelAction` | select | Fixed, Unidirectional, Bidirectional, Other |
| **Bezel scale** | `bezelScale` | select+silhouette | Plain, Minutes (dive), 24-hour / GMT, Tachymeter, Countdown, Other |

### 4.5 Movement

| Field | Key | Type | Options / unit |
|---|---|---|---|
| Movement type | `movementType` | select | Automatic, Manual-winding, Quartz, Solar, Spring Drive, Kinetic, Other |
| Caliber | `caliber` | text | For example `Omega 8800` |
| Power reserve | `powerReserve` | number | hours |
| Jewels | `jewels` | number | Optional |

### 4.6 Features (`optional-group`)

| Field | Key | Type | Options |
|---|---|---|---|
| Complications | `complications` | multiselect | Date, Day-date, GMT / dual time, Chronograph, Moon phase, Power reserve indicator, Other |
| Certifications | `certifications` | multiselect | Chronometer, Master Chronometer, Anti-magnetic, Other |

### 4.7 Strap / bracelet

| Field | Key | Type | Options |
|---|---|---|---|
| Strap type | `strapType` | select | Bracelet, Leather, Rubber, Nylon / NATO, Canvas, Other |
| Strap material | `strapMaterial` | text | |
| Strap color | `strapColor` | text | |
| Clasp / buckle type | `claspType` | select | Folding clasp, Deployant, Pin buckle, Butterfly, Other |

### 4.8 Extras (not from the source listings, but recommended)

| Field | Key | Type | Notes |
|---|---|---|---|
| Photos | `photos` | image list | Primary focus of the page. First image is the hero. |
| Notes | `notes` | text (multi-line) | Optional. Purchase year, story, mods. Gives each watch personality. |

---

## 5. Silhouette system

Fields marked `select+silhouette` show a small icon next to each option, both in the **entry dropdown** and on the **finished display page** next to the chosen value.

### 5.1 Folder structure

Icons live in `/public/silhouettes/` and are named after the option value in lowercase kebab-case. The filename is derived directly from the option label, so no lookup table is needed.

```
/public/silhouettes/
  case-shape/
    round.svg
    cushion.svg
    tonneau.svg
    square.svg
    rectangular.svg
    oval.svg
    octagonal.svg
    asymmetrical.svg
  case-back/
    solid.svg
    exhibition.svg
  crown-type/
    push-pull.svg
    screw-down.svg
    screw-down-with-guards.svg
    recessed.svg
    onion.svg
  lug-style/
    straight.svg
    curved.svg
    hooded.svg
    drilled.svg
    articulated.svg
    integrated.svg
  hands/
    sword.svg
    dauphine.svg
    baton.svg
    leaf.svg
    cathedral.svg
    mercedes.svg
    snowflake.svg
    alpha.svg
    breguet.svg
    pencil.svg
    syringe.svg
    arrow.svg
  dial-markers/
    baton.svg
    stick.svg
    dot-round.svg
    arabic-numerals.svg
    roman-numerals.svg
    dagger.svg
    triangle-arrow.svg
    mixed.svg
    none.svg
  bezel-scale/
    plain.svg
    minutes-dive.svg
    24-hour-gmt.svg
    tachymeter.svg
    countdown.svg
  other.svg
```

**Filename rule:** lowercase the label, replace spaces, slashes, and parentheses with hyphens, collapse repeated hyphens, and trim hyphens from the ends. Examples: `Screw-down with guards` becomes `screw-down-with-guards`, `Dot / Round` becomes `dot-round`, `Minutes (dive)` becomes `minutes-dive`, `24-hour / GMT` becomes `24-hour-gmt`.

### 5.2 Fallback behavior (important)

The SVG files may not all exist when the code is first built. **The UI must not break when a file is missing.**

- If `/public/silhouettes/{field}/{value}.svg` fails to load, show a neutral placeholder box with the option's first letter, and keep the text label visible.
- The **Other** option always uses `/public/silhouettes/other.svg`.
- Build the component so that adding an SVG file to the folder makes it appear automatically, with no code change.

### 5.3 Icon style requirements

When the SVGs are created or sourced, they must all follow one visual style:

- Single color, using `currentColor` for stroke and fill so the icons inherit theme colors
- Consistent stroke weight across the whole set
- Square `viewBox` (for example `0 0 64 64`) so they align in a grid
- Simple outlines, not photographs
- No embedded raster images, no external references, no text inside the SVG

### 5.4 Where the icons come from (open item)

Research found **no open-licensed set of watch-component diagrams** (case shapes, hand styles, crown types) on Wikimedia Commons. Blog and manufacturer images are copyrighted and must not be used on a public page. The plan is to **draw a consistent SVG set**, delivered separately. Until then, rely on the fallback behavior above.

---

## 6. Display page requirements

- **Photos first.** The photo gallery is the visual anchor of each watch entry. Show the hero image large, with the remaining photos as thumbnails or a swipeable gallery.
- **Grouped attributes.** Show attributes in the same groups as section 4 (Identity, Case, Dial and crystal, Bezel, Movement, Features, Strap / bracelet). Use section headings.
- **Silhouettes beside values.** For `select+silhouette` fields, show the icon next to the chosen value.
- **Hide empty fields.** If a field has no value, do not render it or its label. If an entire group is empty, hide the group. This is especially important for Bezel and Features.
- **Show the "Other" custom text**, not the word "Other".
- **Format units on display:** `38 mm`, `12.2 mm`, `90 g`, `55 hours`, `100 m / 328 ft`.
- **Multiselect values** display as a comma-separated list or small tags.
- **Responsive.** Works on phone and desktop. On a phone, the attribute groups stack in one column.

---

## 7. Entry form requirements

- One section per group from section 4, in the same order.
- Each `select` is a dropdown. Each `select+silhouette` is a dropdown or visual picker where every option shows its icon.
- Choosing **Other** reveals a text input directly beneath the field.
- The **Bezel** group is hidden until the "This watch has a bezel" checkbox is ticked.
- `number` fields show their unit as a suffix, and reject non-numeric input.
- Only **brand**, **collection**, and **at least one photo** should be required. Everything else is optional, because different watches have different data available.
- Photo upload supports multiple files and lets the user choose which one is the hero.

### 7.1 Admin access

The public site is read-only. The entry form and any create, update, or delete endpoints must be **protected** so that only the collection owner can use them.

- Put the form under an admin route, for example `/admin`, and protect it with Next.js middleware.
- Simplest option for a single owner: a password checked against an environment variable (`ADMIN_PASSWORD`), with the session stored in an HTTP-only cookie. If you later want proper accounts, swap in Auth.js.
- **Protect the API and server actions too, not just the page.** Hiding the form is not enough; every write operation must verify the admin session on the server.
- Public routes only ever read from the database.

---

## 8. Suggested data shape

A watch record. Use this as a starting point. Adjust to fit the chosen framework or database.

```json
{
  "id": "omega-seamaster-38-blue",
  "brand": "Omega",
  "collection": "Seamaster Diver 300M",
  "reference": "220.12.38.20.03.001",
  "style": "Dive",

  "caseDiameter": 38,
  "thickness": 12.24,
  "lugToLug": 45,
  "lugWidth": 19,
  "weight": 90,
  "waterResistance": 150,
  "caseMaterial": "Stainless steel",
  "caseMaterialGrade": "",
  "caseFinish": "Mixed",
  "caseShape": "Round",
  "caseBack": "Exhibition",
  "caseBackFastening": "Screw-down",
  "crownType": "Screw-down",
  "lugStyle": "Straight",

  "dialColor": "Blue",
  "crystal": "Sapphire",
  "crystalNotes": "Domed, anti-reflective treatment on both sides",
  "lume": "Super-LumiNova",
  "lumePlacement": "",
  "hands": "Sword",
  "dialMarkers": "Baton",

  "hasBezel": true,
  "bezelMaterial": "Ceramic",
  "bezelColor": "Blue",
  "bezelAction": "Unidirectional",
  "bezelScale": "Minutes (dive)",

  "movementType": "Automatic",
  "caliber": "Omega 8800",
  "powerReserve": 55,
  "jewels": null,

  "complications": ["Date"],
  "certifications": ["Master Chronometer", "Anti-magnetic"],

  "strapType": "Rubber",
  "strapMaterial": "Rubber",
  "strapColor": "Blue",
  "claspType": "Folding clasp",

  "photos": ["/photos/omega-seamaster-38-blue/1.jpg"],
  "notes": ""
}
```

**For `Other` values**, store both the selection and the custom text. Suggested pattern:

```json
{
  "caseShape": "Other",
  "caseShapeOther": "Rounded octagon"
}
```

The rule is: any field named `xyz` that supports **Other** has a companion field `xyzOther`.

---

## 9. Reference: sample data from the source listings

These four watches can be used as seed data to test the form and display page. Values marked "not listed" were absent from the source and should be left blank, which also tests the "hide empty fields" behavior.

| Field | Rolex Datejust 41 | Seiko SPB155 | Omega Seamaster 38 | Pagani Design GMT |
|---|---|---|---|---|
| Reference | M126300-0001 | SPB155 | 220.12.38.20.03.001 | PD-1662 |
| Style | Casual | Field | Dive | GMT |
| Case diameter | 41 mm | 38 mm | 38 mm | 40 mm |
| Thickness | not listed | 12.9 mm | 12.24 mm | 14 mm |
| Lug-to-lug | not listed | 46 mm | 45 mm | not listed |
| Lug width | not listed | 20 mm | 19 mm | not listed |
| Weight | not listed | 144 g | 90 g | 156 g |
| Water resistance | 100 m | 200 m | 150 m | 100 m |
| Case material | Stainless steel | Stainless steel | Stainless steel | Stainless steel (316L) |
| Case shape | Round | Round | Round | Round |
| Case back | Solid | Exhibition | Exhibition | Solid |
| Crown | Screw-down | Screw-down | Screw-down | Screw-down |
| Crystal | Sapphire | Sapphire (magnifier, AR inner) | Sapphire (domed, AR both sides) | Sapphire (AR) |
| Dial color | Blue | Green | Blue | not listed |
| Lume | not listed | LumiBrite | not listed | not listed |
| Bezel | Fixed, smooth, steel | not listed | not listed | Ceramic, unidirectional, 24-hour |
| Movement type | Automatic | Automatic (hand-winding capable) | Automatic | Automatic |
| Caliber | Rolex 3235 | Seiko 6R35 | Omega 8800 | Pearl DG5833GMT |
| Power reserve | 70 hours | 70 hours | 55 hours | not listed |
| Jewels | not listed | 24 | not listed | not listed |
| Complications | Date | Date | Date | Date, GMT |
| Certifications | not listed | not listed | Master Chronometer, Anti-magnetic | not listed |
| Strap type | Bracelet | Bracelet | Rubber | Bracelet |
| Clasp | Oysterlock | Three-fold, push-button | Folding clasp | Folding clasp (titanium-steel) |

---

## 10. Suggested build order for Cursor

1. **Define the schema** from section 4 and the data shape in section 8.
2. **Build a reusable `SilhouetteSelect` component** that takes a field name and option list, resolves icon paths using the filename rule in section 5.1, and falls back gracefully (section 5.2). Every `select+silhouette` field uses it.
3. **Build the entry form** (section 7), reusing `SilhouetteSelect` and a generic `SelectWithOther` component for plain dropdowns.
4. **Build the display page** (section 6), including "hide empty fields" logic and unit formatting.
5. **Load the four sample watches** from section 9 to test both the form and the display.
6. **Add the SVG silhouettes** to `/public/silhouettes/` when they are ready. No code change should be needed.

---

## 11. Open items

- **Silhouette artwork:** the SVG set (about 50 icons) still needs to be drawn or sourced. Priority order: case shape, then hands, then the rest.
- **Crown guards:** currently combined with the screw-down option as "Screw-down with guards." Research noted guards can appear on push-pull crowns too. Consider splitting into a separate yes/no field if that matters to you.