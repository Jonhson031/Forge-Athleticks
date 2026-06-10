import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/store/cartSlice.js";
import { Link } from "react-router-dom";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  function handleQtyChange(id, newQty) {
    dispatch(cartActions.updateCartItemQty({ itemId: id, newQty }));
  }

  function handleRemove(id) {
    dispatch(cartActions.removeItemFromCart(id));
  }

  return (
    <div className={styles.item}>
      <Link to={`/product/${item.id}`} className={styles.itemImage}>
        {item.image ? (
          <img src={item.image} alt={item.name} className={styles.itemImg} />
        ) : (
          <div className={styles.itemImagePlaceholder}>
            <span className={styles.itemImgLabel}>Image</span>
          </div>
        )}
      </Link>

      <div className={styles.itemInfo}>
        <div className={styles.itemTop}>
          <div>
            <h3 className={styles.itemName}>
              <Link to={`/product/${item.id}`}>{item.name}</Link>
            </h3>
            <p className={styles.itemMeta}>
              {item.color} · Size {item.size}
            </p>
          </div>
          <p className={styles.itemPrice}>
            ${(item.price * item.qty).toFixed(2)}
          </p>
        </div>

        <div className={styles.itemBottom}>
          <div className={styles.stepper}>
            <button
              type="button"
              className={styles.stepperBtn}
              onClick={() => handleQtyChange(item.id, item.qty - 1)}
              disabled={item.qty <= 1}
            >
              −
            </button>
            <span className={styles.stepperValue}>{item.qty}</span>
            <button
              type="button"
              className={styles.stepperBtn}
              onClick={() => handleQtyChange(item.id, item.qty + 1)}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => handleRemove(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
