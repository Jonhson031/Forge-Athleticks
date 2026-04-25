import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/uiSlice.js';
import styles from './MainNavigation.module.css';
import Search from '../Search/Search.jsx';
import Dropdown from '../Dropdown/Dropdown.jsx';
import SearchButton from '../Search/SearchButton.jsx';

const menuItems = [
  {
    id: 'men',
    label: 'Men',
    featured: {
      title: 'New Arrivals',
      description: 'Fresh drops for the new season.',
      image: null,
    },
    columns: [
      {
        title: 'Tops',
        links: [
          { label: 'T-Shirts', href: '#' },
          { label: 'Hoodies', href: '#' },
          { label: 'Long Sleeves', href: '#' },
          { label: 'Tank Tops', href: '#' },
          { label: 'Jackets', href: '#' },
        ],
      },
      {
        title: 'Bottoms',
        links: [
          { label: 'Shorts', href: '#' },
          { label: 'Joggers', href: '#' },
          { label: 'Leggings', href: '#' },
          { label: 'Sweatpants', href: '#' },
        ],
      },
      {
        title: 'Accessories',
        links: [
          { label: 'Caps & Beanies', href: '#' },
          { label: 'Bags', href: '#' },
          { label: 'Gloves', href: '#' },
          { label: 'Socks', href: '#' },
        ],
      },
    ],
    highlights: [
      { label: 'New Arrivals', href: '#' },
      { label: 'Best Sellers', href: '#' },
      { label: 'Sale', href: '#', badge: 'UP TO 40% OFF' },
    ],
  },
  {
    id: 'women',
    label: 'Women',
    featured: {
      title: 'SS26 Collection',
      description: 'Built for performance. Designed to stand out.',
      image: null,
    },
    columns: [
      {
        title: 'Tops',
        links: [
          { label: 'Sports Bras', href: '#' },
          { label: 'Tank Tops', href: '#' },
          { label: 'T-Shirts', href: '#' },
          { label: 'Hoodies', href: '#' },
          { label: 'Jackets', href: '#' },
        ],
      },
      {
        title: 'Bottoms',
        links: [
          { label: 'Leggings', href: '#' },
          { label: 'Shorts', href: '#' },
          { label: 'Joggers', href: '#' },
          { label: 'Skirts', href: '#' },
        ],
      },
      {
        title: 'Accessories',
        links: [
          { label: 'Bags', href: '#' },
          { label: 'Hair Ties', href: '#' },
          { label: 'Socks', href: '#' },
          { label: 'Water Bottles', href: '#' },
        ],
      },
    ],
    highlights: [
      { label: 'New Arrivals', href: '#' },
      { label: 'Best Sellers', href: '#' },
      { label: 'Sale', href: '#', badge: 'UP TO 40% OFF' },
    ],
  },
  {
    id: 'accessories',
    label: 'Accessories',
    featured: {
      title: 'Gear Up',
      description: 'Complete your kit with the essentials.',
      image: null,
    },
    columns: [
      {
        title: 'Training',
        links: [
          { label: 'Gloves', href: '#' },
          { label: 'Knee Sleeves', href: '#' },
          { label: 'Wrist Wraps', href: '#' },
          { label: 'Belts', href: '#' },
        ],
      },
      {
        title: 'Carry',
        links: [
          { label: 'Gym Bags', href: '#' },
          { label: 'Backpacks', href: '#' },
          { label: 'Duffel Bags', href: '#' },
        ],
      },
      {
        title: 'Lifestyle',
        links: [
          { label: 'Caps', href: '#' },
          { label: 'Beanies', href: '#' },
          { label: 'Water Bottles', href: '#' },
          { label: 'Towels', href: '#' },
        ],
      },
    ],
    highlights: [
      { label: 'New Arrivals', href: '#' },
      { label: 'All Accessories', href: '#' },
    ],
  },
  {
    id: 'sale',
    label: 'Sale',
    featured: {
      title: 'Up to 40% Off',
      description: "Limited stock. Don't sleep on it.",
      image: null,
    },
    columns: [
      {
        title: "Men's Sale",
        links: [
          { label: 'Tops', href: '#' },
          { label: 'Bottoms', href: '#' },
          { label: 'Accessories', href: '#' },
        ],
      },
      {
        title: "Women's Sale",
        links: [
          { label: 'Tops', href: '#' },
          { label: 'Bottoms', href: '#' },
          { label: 'Accessories', href: '#' },
        ],
      },
      {
        title: 'Final Sale',
        links: [
          { label: 'Under $30', href: '#' },
          { label: 'Under $50', href: '#' },
          { label: 'Clearance', href: '#' },
        ],
      },
    ],
    highlights: [{ label: 'Shop All Sale', href: '#', badge: '40% OFF' }],
  },
];

export default function MainNavigation() {
  const dispatch = useDispatch();

  const activeMenu = useSelector((state) => state.ui.activeMenu);
  const burgerOpen = useSelector((state) => state.ui.burgerOpen);

  const activeItem = menuItems.find((m) => m.id === activeMenu) ?? null;

  function toggleBurger() {
    dispatch(uiActions.toggleBurger());
  }

  function handleActiveMenu(id) {
    dispatch(uiActions.setActiveMenu(id));
  }

  return (
    <nav className={styles.nav} onMouseLeave={() => handleActiveMenu(null)}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <NavLink to="/" end>
            FORGE ATHLETICKS
          </NavLink>
        </div>

        <ul className={styles.list}>
          {menuItems.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <button
                type="button"
                className={`${styles.navBtn} ${activeMenu === item.id ? styles.navBtnActive : ''} ${item.id === 'sale' ? styles.navBtnSale : ''}`}
                onMouseEnter={() => handleActiveMenu(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.utilities}>
          <SearchButton />
          <div className={styles.userBtn}>
            <NavLink
              className="icon-fi-rr-user"
              to="/profile"
              aria-label="Click here to access your user profile"
            ></NavLink>
          </div>
          <div className={styles.cartBtn}>
            <NavLink
              className="icon-cart"
              to="/cart"
              aria-label="Click here to access your cart"
            ></NavLink>
            <span className={styles.cartBadge}>0</span>
          </div>

          <button
            type="button"
            className={`${styles.burger} ${burgerOpen && styles.burgerActive}`}
            onClick={toggleBurger}
            aria-label={burgerOpen ? 'Close menu' : 'Open menu'}
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
