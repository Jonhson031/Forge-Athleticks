import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/uiSlice';
import styles from './MobileDrawer.module.css';
import { menuItems } from '../../assets/data.js';
import { Link } from 'react-router-dom';

export default function MobileDrawer() {
  const dispatch = useDispatch();

  const activeMenu = useSelector((state) => state.ui.activeMenu);
  const burgerOpen = useSelector((state) => state.ui.burgerOpen);
  const mobileExpanded = useSelector((state) => state.ui.mobileExpanded);

  function toggleMobileSection(id) {
    dispatch(uiActions.setMobileExpanded(id));
  }

  if (!burgerOpen) return;

  return (
    <div className={`${styles.drawer} ${burgerOpen ? styles.drawerOpen : ''}`}>
      <div className={styles.drawerSearch}>
        <span className="icon-search"></span>
        <input type="text" placeholder="Search..." className={styles.drawerSearchInput} />
      </div>

      <ul className={styles.drawerList}>
        {menuItems.map((item) => (
          <li key={item.id} className={styles.drawerItem}>
            <button
              type="button"
              className={`${styles.drawerToggle} ${item.id === 'sale' ? styles.drawerToggleSale : ''}`}
              onClick={() => toggleMobileSection(item.id)}
              aria-expanded={mobileExpanded === item.id}
            >
              <span>{item.label}</span>
              <span
                className={`${styles.drawerChevron} ${mobileExpanded === item.id ? styles.drawerChevronOpen : ''}`}
              >
                ›
              </span>
            </button>

            {mobileExpanded === item.id && (
              <div className={styles.drawerExpanded}>
                {item.columns.map((col) => (
                  <div key={col.title} className={styles.drawerSubGroup}>
                    <p className={styles.drawerSubTitle}>{col.title}</p>
                    <ul className={styles.drawerSubList}>
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <Link to={link.link} className={styles.drawerSubLink}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {item.highlights.length > 0 && (
                  <div className={styles.drawerHighlights}>
                    {item.highlights.map((highlight) => (
                      <Link
                        key={highlight.label}
                        to={highlight.link}
                        className={styles.drawerHighlightLink}
                      >
                        {highlight.label}
                        {highlight.badge && (
                          <span className={styles.linkBadge}>{highlight.badge}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
