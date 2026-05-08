import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./ProductDetail.module.css";
import { ALL_PRODUCTS } from "../../assets/data";
import { cartActions } from "../../redux/store/cartSlice.js";

export default function ProductDetail() {
  const { id } = useParams();
  const product = ALL_PRODUCTS.find((p) => p.id === parseInt(id)) || product;

  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(product.colors[0].id);
  const [activeSize, setActiveSize] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const dispatch = useDispatch();

  function handleAddToCart() {
    const item = {
      id: product.id,
      name: product.name,
      color: product.colors.find((c) => c.id === activeColor)?.label || "",
      size: activeSize,
      price: product.price,
      qty: 1,
      image: product.images[0] || null,
    };
    dispatch(cartActions.addItemToCart(item));
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.gallery}>
          <div className={styles.thumbStrip}>
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.thumb} ${activeImage === i ? styles.thumbActive : ""}`}
                onClick={() => setActiveImage(i)}
              >
                {img ? (
                  <img
                    src={img}
                    alt={`View ${i + 1}`}
                    className={styles.thumbImg}
                  />
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
                <span className={styles.mainImageLabel}>
                  Product Image {activeImage + 1}
                </span>
              </div>
            )}

            {product.badge && (
              <span className={styles.badge}>{product.badge}</span>
            )}

            <span className={styles.imageCounter}>
              {activeImage + 1} / {product.images.length}
            </span>
          </div>
        </div>

        <div className={styles.info}>
          <p className={styles.breadcrumb}>
            <Link to="/products/all" className={styles.breadcrumbLink}>
              Shop
            </Link>
            <span className={styles.breadcrumbSep}>›</span>
            <Link
              to={`/products/${product.gender}`}
              className={styles.breadcrumbLink}
            >
              {product.gender === "men" ? "Men's Gear" : "Women's Gear"}
            </Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </p>

          <div className={styles.nameRow}>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
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
              {product.colors.map((color, i) => (
                <button
                  key={color.id}
                  type="button"
                  title={color.label}
                  className={`${styles.colorSwatch} ${activeColor === color.id ? styles.colorSwatchActive : ""}`}
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
                  className={`${styles.sizeBtn} ${activeSize === size ? styles.sizeBtnActive : ""}`}
                  onClick={() => setActiveSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.addBtn} ${!activeSize ? styles.addBtnDisabled : ""}`}
            onClick={handleAddToCart}
            disabled={!activeSize}
          >
            {activeSize ? "ADD TO BAG" : "SELECT A SIZE"}
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
                className={`${styles.accordionIcon} ${detailsOpen ? styles.accordionIconOpen : ""}`}
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
