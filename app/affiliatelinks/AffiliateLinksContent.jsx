import Product from '@/components/Product';
import { affiliateProducts } from '@/lib/affiliateData';

// Order + labels for sections
const CATEGORY_ORDER = ["Watch Tools", "Watches", "Coffee", "Books", "Other"];

const groupByCategory = (items) => {
  return items.reduce((acc, item) => {
    const key = item.category || "Other";
    acc[key] = acc[key] ? [...acc[key], item] : [item];
    return acc;
  }, {});
};

export default function AffiliateLinksContent() {
  const grouped = groupByCategory(affiliateProducts);

  return (
    <>
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
          <section key={category} className="affiliate-section">
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
    </>
  );
}
