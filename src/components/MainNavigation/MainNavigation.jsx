import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/uiSlice.js';
import { useEffect } from 'react';
import styles from './MainNavigation.module.css';

export default function MainNavigation() {
  const dispatch = useDispatch();
  const isBurgerOpen = useSelector((state) => state.ui.isBurgerMenuOpen);

  function toggleBurgerMenu() {
    dispatch(uiActions.burgerMenuOpen());
  }

  useEffect(() => {
    document.body.style.overflow = isBurgerOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isBurgerOpen]);

  return (
    <>
      <div
        className={`${styles.burger} ${isBurgerOpen ? styles.burgerActive : ''}`}
        onClick={toggleBurgerMenu}
      >
        <span></span>
      </div>
      <ul className={`${styles.list} ${isBurgerOpen ? styles.listOpen : ''}`}>
        <li>
          <NavLink
            to="/men"
            end
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Men
          </NavLink>
        </li>
        <li>
          <NavLink to="/women" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            Women
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/accessories"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Accessories
          </NavLink>
        </li>
        <li>
          <NavLink to="/sale" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            Sale
          </NavLink>
        </li>
      </ul>
    </>
  );
}
