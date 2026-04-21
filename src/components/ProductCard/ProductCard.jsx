import styles from './ProductCard.module.css';

export default function ProductCard({ product, bgWhite }) {
  return (
    <div className={`${styles.card} ${bgWhite && styles.cardWhite}`}>
      <div className={styles.imageWrapper}>
        {product.image ? (
          <img src={product.image} alt={product.name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderText}>Product Image</span>
          </div>
        )}

        {product.badge && <span className={styles.badge}>{product.badge}</span>}

        <div className={styles.hoverOverlay}>
          <span className={styles.quickAdd}>QUICK ADD</span>
        </div>
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>{product.price}</p>
      </div>

      <button className={styles.addBtn} type="button">
        ADD TO BAG
      </button>
    </div>
  );
}
