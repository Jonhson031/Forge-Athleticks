import { useState } from 'react';
import styles from './Cart.module.css';
import Button from '../Button/Button';
import Eyebrow from '../Eyebrow/Eyebrow';

const initialItems = [
  {
    id: 1,
    name: 'Alpha Training Tee',
    color: 'Black',
    size: 'L',
    price: 39,
    qty: 1,
    image: null,
  },
  {
    id: 2,
    name: 'Forge Pro Shorts',
    color: 'Charcoal',
    size: 'M',
    price: 54,
    qty: 2,
    image: null,
  },
  {
    id: 3,
    name: 'Power Fuel Hoodie',
    color: 'White',
    size: 'XL',
    price: 79,
    qty: 1,
    image: null,
  },
];

const SHIPPING_THRESHOLD = 100;

function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <div className={styles.item}>
      {/* Image */}
      <div className={styles.itemImage}>
        {item.image ? (
          <img src={item.image} alt={item.name} className={styles.itemImg} />
        ) : (
          <div className={styles.itemImagePlaceholder}>
            <span className={styles.itemImgLabel}>Image</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={styles.itemInfo}>
        <div className={styles.itemTop}>
          <div>
            <p className={styles.itemName}>{item.name}</p>
            <p className={styles.itemMeta}>
              {item.color} · Size {item.size}
            </p>
          </div>
          <p className={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</p>
        </div>

        <div className={styles.itemBottom}>
          {/* Qty stepper */}
          <div className={styles.stepper}>
            <button
              type="button"
              className={styles.stepperBtn}
              onClick={() => onQtyChange(item.id, item.qty - 1)}
              disabled={item.qty <= 1}
            >
              −
            </button>
            <span className={styles.stepperValue}>{item.qty}</span>
            <button
              type="button"
              className={styles.stepperBtn}
              onClick={() => onQtyChange(item.id, item.qty + 1)}
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button type="button" className={styles.removeBtn} onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const [items, setItems] = useState(initialItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal - discount >= SHIPPING_THRESHOLD ? 0 : 8.99;
  const total = subtotal - discount + shipping;
  const freeShippingLeft = Math.max(0, SHIPPING_THRESHOLD - (subtotal - discount));
  const progress = Math.min(100, ((subtotal - discount) / SHIPPING_THRESHOLD) * 100);

  function handleQtyChange(id, newQty) {
    if (newQty < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: newQty } : i)));
  }

  function handleRemove(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function handlePromo() {
    if (promoCode.trim().toUpperCase() === 'FORGE10') {
      setPromoApplied(true);
    }
  }

  if (items.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>🛍</p>
          <h2 className={styles.emptyTitle}>Your bag is empty.</h2>
          <p className={styles.emptyBody}>Looks like you haven't added anything yet.</p>
          <a href="#" className={styles.emptyBtn}>
            SHOP NOW →
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <Eyebrow text="Your Bag"></Eyebrow>
          <h1 className={styles.heading}>{items.reduce((s, i) => s + i.qty, 0)} Items</h1>
        </div>

        <div className={styles.layout}>
          <div className={styles.itemsCol}>
            <div className={styles.shippingBanner}>
              {freeShippingLeft > 0 ? (
                <p className={styles.shippingText}>
                  Add <strong>${freeShippingLeft.toFixed(2)}</strong> more for free shipping
                </p>
              ) : (
                <p className={styles.shippingTextFree}>✓ You've unlocked free shipping!</p>
              )}
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className={styles.itemsList}>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQtyChange={handleQtyChange}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>

          <div className={styles.summaryCol}>
            <div className={styles.summaryBox}>
              <p className={styles.summaryTitle}>Order Summary</p>

              <div className={styles.summaryLines}>
                <div className={styles.summaryLine}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className={`${styles.summaryLine} ${styles.discountLine}`}>
                    <span>Promo (FORGE10)</span>
                    <span>−${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className={styles.summaryLine}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.totalLine}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>${total.toFixed(2)}</span>
              </div>

              {!promoApplied && (
                <div className={styles.promoRow}>
                  <input
                    type="text"
                    placeholder="Promo code"
                    className={styles.promoInput}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button type="button" className={styles.promoBtn} onClick={handlePromo}>
                    Apply
                  </button>
                </div>
              )}

              {promoApplied && <p className={styles.promoSuccess}>✓ Promo code applied</p>}

              <button type="button" className={styles.checkoutBtn}>
                PROCEED TO CHECKOUT
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
              </button>

              <div className={styles.trustRow}>
                <div className={styles.trustBadge}>
                  <span className="icon-fi-rr-lock"></span> Secure Checkout
                </div>
                <div className={styles.trustBadge}>
                  <span className="icon-return"></span>
                  Free Returns
                </div>
                <div className={styles.trustBadge}>
                  <span className="icon-fast-delivery"></span>
                  Fast Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
