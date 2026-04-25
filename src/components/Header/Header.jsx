import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import MainNavigation from '../MainNavigation/MainNavigation';
import MobileDrawer from '../MobileDrawer/MobileDrawer';
import { uiActions } from '../../store/uiSlice';

export default function Header() {
  const dispatch = useDispatch();
  const burgerOpen = useSelector((state) => state.ui.burgerOpen);
  const searchOpen = useSelector((state) => state.ui.searchOpen);

  function toggleBurger() {
    dispatch(uiActions.toggleBurger());
  }

  const [sticky, setSticky] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSticky(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = burgerOpen || searchOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [burgerOpen, searchOpen]);

  return (
    <>
      <div ref={triggerRef}></div>

      <header className={`${styles.header} ${sticky ? styles.sticky : ''}`}>
        <MainNavigation />
        <MobileDrawer />

        {burgerOpen && <div className={styles.mobileBackdrop} onClick={toggleBurger} />}
      </header>
    </>
  );
}
