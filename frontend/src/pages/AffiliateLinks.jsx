import Product from "../components/Product";

const affiliateProducts = [
  {
    category: "Watches",
    name: "Casio Duro MDV106",
    link: "https://amzn.to/3Ly8v6g",
    imageUrl: "https://m.media-amazon.com/images/I/61nHUVwR65L._AC_SY879_.jpg",
    description:
      "A legendary dive watch known for its durability, reliability, and classic design under 100 dollars.",
  },
{
    category: "Watches",
    name: "G-Shock DW5600",
    link: "https://amzn.to/44ZksZc",
    imageUrl: "https://m.media-amazon.com/images/I/6146W+Fmr5L._AC_SX679_.jpg",
    description:
      "Based of the 1980s G-Shock design with modern features.",
  },
/*{
    category: "Watches",
    name: "Seiko Alpinist SPB155",
    link: "https://amzn.to/4jEWV5V",
    imageUrl: "https://m.media-amazon.com/images/I/61k1PuEbb5L._AC_SX679_.jpg",
    description:
      "A classic field watch with a green sunburst dial, sapphire crystal, and 200m water resistance.",
  },*/
  {
    category: "Watches",
    name: "Seiko Presage Cocktail",
    link: "https://amzn.to/4pwg4s9",
    imageUrl: "https://m.media-amazon.com/images/I/61xjD+DW2HL._AC_SY695_.jpg",
    description:
      "Elegant dress watch with a stunning blue dial inspired by cocktail culture.",
  },
  {
    category: "Watches",
    name: "Bulova Lunar Pilot Chronograph",
    link: "https://amzn.to/4svUeYp",
    imageUrl: "https://m.media-amazon.com/images/I/61MGD1ZcvdL._AC_SX679_.jpg",
    description:
      "High-performance chronograph with a rich history tied to lunar missions.",
  },
  {
    category: "Watches",
    name: "Invicta Pro Diver 9937OB",
    link: "https://amzn.to/44ZksZc",
    imageUrl: "https://m.media-amazon.com/images/I/71VmACghfgL._AC_SY879_.jpg",
    description:
      "The best budget automatic dive watch available. Classic design with reliable Swiss Movement.",
  },
  {
    category: "Watch Tools",
    name: "Link Removal Watch Band Tool Repair Kit",
    link: "https://amzn.to/3N71GZW",
    imageUrl: "https://m.media-amazon.com/images/I/61MOdrLny9L._AC_SL1500_.jpg",
    description: "Complete kit for adjusting watch bands and braclets at home.",
  },
  {
    category: "Watch Tools",
    name: "Case back Pry Tool",
    link: "https://amzn.to/3YtYmKH",
    imageUrl: "https://m.media-amazon.com/images/I/31VatnaWY1L._AC_SY695_.jpg",
    description: "Durable tool for safely opening watch case backs without damaging the watch.",
  },
  {
    category: "Watch Tools",
    name: "Watch Case Holder and Opener Tool Kit",
    link: "https://amzn.to/4bl1gJd",
    imageUrl: "https://m.media-amazon.com/images/I/61bYeglbDvS._AC_SY695_.jpg",
    description: "A complete tool kit for holding and opening watch cases securely.",
  },
  {
    category: "Watch Tools",
    name: "8 Pieces Precision Jewelers Screwdriver Set",
    link: "https://amzn.to/4qFFYdP",
    imageUrl: "https://m.media-amazon.com/images/I/71HSyBf5kiL._AC_SL1500_.jpg",
    description: "Best budget set of precision screwdrivers for watch repair.",
  },
  {
    category: "Watch Tools",
    name: "Watch Movement Dust Cover 5 Slots",
    link: "https://amzn.to/3Nb33GT",
    imageUrl: "https://m.media-amazon.com/images/I/61EI2ouZXqL._AC_SL1500_.jpg",
    description: "Protect watch movements from dust and debris during repairs with this handy cover.",
  },
  {
    category: "Watch Tools",
    name: "Non‑Slip Watch Repair Mat",
    link: "https://amzn.to/3YpuhvX",
    imageUrl: "https://m.media-amazon.com/images/I/61s2xygyUUL._AC_SL1500_.jpg",
    description: "Keep your watch repair projects organized and prevent small parts from getting lost.",
  },
  {
    category: "Watch Tools",
    name: "Watch Demagnetizer",
    link: "https://amzn.to/4bkZN5I",
    imageUrl: "https://m.media-amazon.com/images/I/61Owl7m112L._AC_SY695_.jpg",
    description: "Keep your mechanical watches running accurately by removing magnetic fields.",
  },
  {
    category: "Watch Tools",
    name: "Timegrapher NO.1000",
    link: "https://amzn.to/4qLFFOQ",
    imageUrl: "https://m.media-amazon.com/images/I/61Ns0bgy9sL._AC_SL1500_.jpg",
    description: "Essential for measuring the accuracy and performance of mechanical watches.",
  },
  {
    category: "Coffee",
    name: "KINGrinder K6 Manual Hand Coffee Grinder",
    link: "https://amzn.to/3Z5XFY8",
    imageUrl: "https://m.media-amazon.com/images/I/71JlAmQq2hL._AC_SL1500_.jpg",
    description: "Consistent grind size for better coffee at home.",
  },
  {
    category: "Coffee",
    name: "WACACO Picopresso",
    link: "https://amzn.to/4pEhu40",
    imageUrl: "https://m.media-amazon.com/images/I/71vaD-rZckL._AC_SL1500_.jpg",
    description: "Make high-quality espresso anywhere with this portable espresso maker.",
  },
  {
    category: "Coffee",
    name: "Stumptown Coffee Roasters Whole Bean Hair Bender",
    link: "https://amzn.to/3L1UkGw",
    imageUrl: "https://m.media-amazon.com/images/I/71QEXRe0ewL._SL1500_.jpg",
    description: "Make high-quality espresso anywhere with this portable espresso maker.",
  },
  {
    category: "Books",
    name: "Project Hail Mary by Andy Weir",
    link: "https://amzn.to/49bndcp",
    imageUrl: "https://m.media-amazon.com/images/I/91ENQs2KLAL._SL1500_.jpg",
    description: "THE #1 NEW YORK TIMES BESTSELLER FROM THE AUTHOR OF THE MARTIAN .",
  },
  {
    category: "Other",
    name: "Powerowl Rechargeable Batteries",
    link: "https://amzn.to/453iwil",
    imageUrl: "https://m.media-amazon.com/images/I/712EBXTyCNL._AC_SL1500_.jpg",
    description: "Keep your devices charged and ready to go.",
  },
];

// Order + labels for sections
const CATEGORY_ORDER = ["Watch Tools", "Watches", "Coffee", "Books", "Other"];

const groupByCategory = (items) => {
  return items.reduce((acc, item) => {
    const key = item.category || "Other";
    acc[key] = acc[key] ? [...acc[key], item] : [item];
    return acc;
  }, {});
};

const AffiliateLinks = () => {
  const grouped = groupByCategory(affiliateProducts);

  return (
    <main className="affiliate-page">
      <header className="affiliate-header">
        <h1>Affiliate Links</h1>
        <p className="affiliate-description">
          Anything I’ve reviewed or personally recommended can be found here.
        </p>
        <p className="affiliate-disclaimer">
          <strong>Disclosure:</strong> Some links on this page are affiliate links.
          This means I may earn a small commission at no extra cost to you. It’s
          simply a way to support the work I do so you don’t have to pay for it.
        </p>
      </header>

      {CATEGORY_ORDER.map((category) => {
        const items = grouped[category];
        if (!items || items.length === 0) return null;

        return (
          <section key={category} className="affiliate-section" aria-label={category}>
            <div className="affiliate-section-header">
              <h2 className="affiliate-section-title">{category}</h2>
            </div>

            <div className="affiliate-grid">
              {items.map((product) => (
                <Product
                  key={`${category}-${product.name}`}
                  name={product.name}
                  link={product.link}
                  imageUrl={product.imageUrl}
                  description={product.description}
                />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default AffiliateLinks;
