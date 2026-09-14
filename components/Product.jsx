import ExternalLink from '@/components/ExternalLink';

export default function Product({ name, link, imageUrl, description }) {
  return (
    <article className="product-card">
      <ExternalLink href={link} className="product-card-link">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt=""
          className="product-image"
          loading="lazy"
        />
        <div className="product-body">
          <h3 className="product-name">{name}</h3>
          <p className="product-description">{description}</p>
          <span className="product-button">View Product</span>
        </div>
      </ExternalLink>
    </article>
  );
}
