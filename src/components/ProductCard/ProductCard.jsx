import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, bgWhite = false }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className={`${styles.card} ${bgWhite && styles.cardWhite}`}>
      <div to={product.id} className={styles.cardImage}>
        <Link to={`/product/${product.id}`} className={styles.imageWrapper}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span className={styles.placeholderText}>Product Image</span>
            </div>
          )}
        </Link>

        <div className={styles.cardBadges}>
          {product.isNew && (
            <span className={`${styles.badgeNew} ${styles.badge}`}>New</span>
          )}
          {product.isSale && (
            <span className={`${styles.badgeSale} ${styles.badge}`}>Sale</span>
          )}
          {discount && (
            <span className={`${styles.badgeDiscount} ${styles.badge}`}>
              −{discount}%
            </span>
          )}
        </div>

        <div className={styles.cardOverlay}>
          <button type="button" className={styles.quickAddBtn}>
            QUICK ADD
          </button>
        </div>
      </div>

      <div className={styles.cardInfo}>
        <p className={styles.cardCategory}>{product.category}</p>
        <div className={styles.cardRow}>
          <p className={styles.cardName}>{product.name}</p>
          <div className={styles.cardPricing}>
            <span className={`${styles.cardPrice} `}>${product.price}</span>
            {product.originalPrice && (
              <span className={styles.cardOriginalPrice}>
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
