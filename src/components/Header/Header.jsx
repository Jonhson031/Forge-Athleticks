import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import searchIcon from '../../assets/icons/search.svg';
import userIcon from '../../assets/icons/user-icon.svg';
import cartIcon from '../../assets/icons/cart.svg';
import MainNavigation from '../MainNavigation/MainNavigation';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <NavLink to="/" end>
            FORGE ATHLETICKS
          </NavLink>
        </div>
        <nav className={styles.navigation}>
          <MainNavigation />
          <div className={styles.search}>
            <form action="/search">
              <button
                className="icon-search1"
                aria-label="Click here to search for products"
              ></button>
              <input type="text" placeholder="Search for products..." />
            </form>
          </div>
          <div className={styles.user}>
            <NavLink
              className="icon-fi-rr-user"
              to="/profile"
              aria-label="Click here to access your user profile"
            ></NavLink>
          </div>
          <div className={styles.cart}>
            <NavLink
              className="icon-cart"
              to="/cart"
              aria-label="Click here to access your cart"
            ></NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
