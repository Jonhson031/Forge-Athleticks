import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductPage.module.css';

const product = {
  id: 1,
  name: 'Alpha Training Tee',
  price: '$39',
  badge: 'NEW',
  description:
    'Engineered for high-intensity training, the Alpha Training Tee features a four-way stretch fabric that moves with you through every rep. Moisture-wicking technology keeps you dry while the tailored athletic fit ensures you look sharp from warm-up to cool-down.',
  details: [
    '87% Polyester / 13% Elastane',
    'Four-way stretch fabric',
    'Moisture-wicking technology',
    'Flatlock seams — no chafing',
    'Machine washable',
  ],
  colors: [
    { id: 'black', label: 'Black', hex: '#0a0a0a' },
    { id: 'white', label: 'White', hex: '#f5f5f5' },
    { id: 'charcoal', label: 'Charcoal', hex: '#2e2e2e' },
    { id: 'stone', label: 'Stone', hex: '#9e9e8e' },
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  images: [null, null, null, null],
};

export default function ProductPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(product.colors[0].id);
  const [activeSize, setActiveSize] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.gallery}>
          <div className={styles.thumbStrip}>
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.thumb} ${activeImage === i ? styles.thumbActive : ''}`}
                onClick={() => setActiveImage(i)}
              >
                {img ? (
                  <img src={img} alt={`View ${i + 1}`} className={styles.thumbImg} />
                ) : (
                  <span className={styles.thumbPlaceholder}>{i + 1}</span>
                )}
              </button>
            ))}
          </div>

          <div className={styles.mainImage}>
            {product.images[activeImage] ? (
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className={styles.mainImg}
              />
            ) : (
              <div className={styles.mainImagePlaceholder}>
                <span className={styles.mainImageLabel}>Product Image {activeImage + 1}</span>
              </div>
            )}

            {product.badge && <span className={styles.badge}>{product.badge}</span>}

            <span className={styles.imageCounter}>
              {activeImage + 1} / {product.images.length}
            </span>
          </div>
        </div>

        <div className={styles.info}>
          <p className={styles.breadcrumb}>
            <a href="#" className={styles.breadcrumbLink}>
              Shop
            </a>
            <span className={styles.breadcrumbSep}>›</span>
            <a href="#" className={styles.breadcrumbLink}>
              Men's Gear
            </a>
            <span className={styles.breadcrumbSep}>›</span>
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </p>

          <div className={styles.nameRow}>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.price}>{product.price}</p>
          </div>

          <div className={styles.divider} />

          <div className={styles.selectorBlock}>
            <div className={styles.selectorHeader}>
              <p className={styles.selectorLabel}>Color</p>
              <p className={styles.selectorValue}>
                {product.colors.find((c) => c.id === activeColor)?.label}
              </p>
            </div>
            <div className={styles.colorOptions}>
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  title={color.label}
                  className={`${styles.colorSwatch} ${activeColor === color.id ? styles.colorSwatchActive : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setActiveColor(color.id)}
                />
              ))}
            </div>
          </div>

          <div className={styles.selectorBlock}>
            <div className={styles.selectorHeader}>
              <p className={styles.selectorLabel}>Size</p>
              {activeSize ? (
                <p className={styles.selectorValue}>{activeSize}</p>
              ) : (
                <p className={styles.selectorHint}>Select a size</p>
              )}
            </div>
            <div className={styles.sizeOptions}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`${styles.sizeBtn} ${activeSize === size ? styles.sizeBtnActive : ''}`}
                  onClick={() => setActiveSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.addBtn} ${!activeSize ? styles.addBtnDisabled : ''}`}
            disabled={!activeSize}
          >
            {activeSize ? 'ADD TO BAG' : 'SELECT A SIZE'}
            {activeSize && (
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            )}
          </button>

          <button type="button" className={styles.wishlistBtn}>
            <svg
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            Save to Wishlist
          </button>

          <div className={styles.descBlock}>
            <p className={styles.descText}>{product.description}</p>
          </div>

          <div className={styles.accordion}>
            <button
              type="button"
              className={styles.accordionTrigger}
              onClick={() => setDetailsOpen(!detailsOpen)}
            >
              <span>Product Details</span>
              <span
                className={`${styles.accordionIcon} ${detailsOpen ? styles.accordionIconOpen : ''}`}
              >
                +
              </span>
            </button>
            {detailsOpen && (
              <ul className={styles.detailsList}>
                {product.details.map((d, i) => (
                  <li key={i} className={styles.detailsItem}>
                    <span className={styles.detailsDot} />
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
