import React from "react";

const Product = ({ name, link, imageUrl, description }) => {
  return (
    <article className="product-card">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="product-image-link"
        aria-label={`Open product page for ${name}`}
      >
        <img
          src={imageUrl}
          alt={name}
          className="product-image"
          loading="lazy"
        />
      </a>

      <div className="product-body">
        <h3 className="product-name">
          <a href={link} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </h3>

        <p className="product-description">{description}</p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="product-button"
        >
          View Product
        </a>
      </div>
    </article>
  );
};

export default Product;
