import { useState } from "react";
import styles from "./Cart.module.css";
import Eyebrow from "../Eyebrow/Eyebrow";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../redux/store/cartSlice";
import { Link } from "react-router-dom";

const SHIPPING_THRESHOLD = 100;

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const promo = useSelector((state) => state.cart.promo);
  const promoApplied = !!promo;
  const [promoCode, setPromoCode] = useState("");

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = promoApplied ? subtotal * promo.discount : 0;
  const shipping = subtotal - discount >= SHIPPING_THRESHOLD ? 0 : 8.99;
  const total = subtotal - discount + shipping;
  const freeShippingLeft = Math.max(
    0,
    SHIPPING_THRESHOLD - (subtotal - discount),
  );
  const progress = Math.min(
    100,
    ((subtotal - discount) / SHIPPING_THRESHOLD) * 100,
  );

  function handlePromo() {
    dispatch(cartActions.applyPromoCode(promoCode));
  }

  if (items.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>🛍</p>
          <h2 className={styles.emptyTitle}>Your bag is empty.</h2>
          <p className={styles.emptyBody}>
            Looks like you haven't added anything yet.
          </p>
          <Link to="/products/all" className={styles.emptyBtn}>
            SHOP NOW →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <Eyebrow text="Your Bag"></Eyebrow>
          <h1 className={styles.heading}>
            {items.reduce((s, i) => s + i.qty, 0)} Items
          </h1>
        </div>

        <div className={styles.layout}>
          <div className={styles.itemsCol}>
            <div className={styles.shippingBanner}>
              {freeShippingLeft > 0 ? (
                <p className={styles.shippingText}>
                  Add <strong>${freeShippingLeft.toFixed(2)}</strong> more for
                  free shipping
                </p>
              ) : (
                <p className={styles.shippingTextFree}>
                  ✓ You've unlocked free shipping!
                </p>
              )}
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className={styles.itemsList}>
              {items.map((item) => (
                <CartItem key={item.id + item.size + item.color} item={item} />
              ))}
            </div>
          </div>

          <div className={styles.summaryCol}>
            <div className={styles.summaryBox}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryLines}>
                <div className={styles.summaryLine}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div
                    className={`${styles.summaryLine} ${styles.discountLine}`}
                  >
                    <span>Promo ({promo.code})</span>
                    <span>−${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className={styles.summaryLine}>
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
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
                  <button
                    type="button"
                    className={styles.promoBtn}
                    onClick={handlePromo}
                  >
                    Apply
                  </button>
                </div>
              )}

              {promoApplied && (
                <p className={styles.promoSuccess}>✓ Promo code applied</p>
              )}

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
