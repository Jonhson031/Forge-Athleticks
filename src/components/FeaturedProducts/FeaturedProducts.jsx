import styles from './FeaturedProducts.module.css';
import ProductCard from '../ProductCard/ProductCard.jsx';
import TitleSection from '../TitleSection/TitleSection.jsx';

// ── Product data ──────────────────────────────
const products = [
  {
    id: 1,
    name: 'Alpha Training Tee',
    price: '$39',
    badge: 'NEW',
    image: null, // replace with: require("./images/alpha-tee.jpg")
  },
  {
    id: 2,
    name: 'Forge Pro Shorts',
    price: '$54',
    badge: 'SALE',
    image: null,
  },
  {
    id: 3,
    name: 'Grip Beast Gloves',
    price: '$29',
    badge: null,
    image: null,
  },
  {
    id: 4,
    name: 'Power Fuel Hoodie',
    price: '$79',
    badge: null,
    image: null,
  },
];

// ── FeaturedProducts (main export) ───────────
export default function FeaturedProducts({ title, eyebrowText, bgWhite = '' }) {
  return (
    <section className={`${styles.section} ${bgWhite && styles.sectionWhite}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <TitleSection title={title} eyebrowText={eyebrowText} bgWhite={bgWhite}></TitleSection>
          <a href="#" className={styles.viewAll}>
            View All <span>→</span>
          </a>
        </div>

        {/* Product grid */}
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} bgWhite={bgWhite} />
          ))}
        </div>
      </div>
    </section>
  );
}
