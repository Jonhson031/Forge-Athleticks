import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../redux/store/uiSlice.js";
import styles from "./MainNavigation.module.css";
import Search from "../Search/Search.jsx";
import Dropdown from "../Dropdown/Dropdown.jsx";
import SearchButton from "../Search/SearchButton.jsx";
import { menuItems } from "../../assets/data.js";

export default function MainNavigation() {
  const dispatch = useDispatch();

  const activeMenu = useSelector((state) => state.ui.activeMenu);
  const burgerOpen = useSelector((state) => state.ui.burgerOpen);
  const cartCounter = useSelector((state) =>
    state.cart.items.reduce((sum, i) => sum + i.qty, 0),
  );

  function handleBurgerOpen() {
    dispatch(uiActions.setIsBurgerOpen());
  }

  function handleActiveMenu(id) {
    dispatch(uiActions.setActiveMenu(id));
  }

  return (
    <nav className={styles.nav} onMouseLeave={() => handleActiveMenu(null)}>
      <div className={styles.topBar}>
        <div
          className={styles.logo}
          onMouseEnter={() => handleActiveMenu(null)}
        >
          <NavLink to="/" end>
            FORGE ATHLETICKS
          </NavLink>
        </div>

        <ul className={styles.list}>
          {menuItems.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <button
                type="button"
                className={`${styles.navBtn} ${activeMenu === item.id ? styles.navBtnActive : ""} ${item.id === "sale" ? styles.navBtnSale : ""}`}
                onMouseEnter={() => handleActiveMenu(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div
          className={styles.utilities}
          onMouseEnter={() => handleActiveMenu(null)}
        >
          <SearchButton />
          <div className={styles.userBtn}>
            <NavLink
              className="icon-fi-rr-user"
              to="/dashboard"
              aria-label="Click here to access your dashboard"
            ></NavLink>
          </div>
          <div className={styles.cartBtn}>
            <NavLink
              className="icon-cart"
              to="/cart"
              aria-label="Click here to access your cart"
            ></NavLink>
            <span className={styles.cartBadge}>{cartCounter}</span>
          </div>

          <button
            type="button"
            className={`${styles.burger} ${burgerOpen && styles.burgerActive}`}
            onClick={handleBurgerOpen}
            aria-label={burgerOpen ? "Close menu" : "Open menu"}
            aria-expanded={burgerOpen}
          >
            <span></span>
          </button>
        </div>
      </div>

      <Dropdown />

      <Search />
    </nav>
  );
}
