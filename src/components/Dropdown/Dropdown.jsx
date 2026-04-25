import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/uiSlice.js';
import styles from './Dropdown.module.css';
import { menuItems } from '../../assets/data.js';

export default function Dropdown() {
  const dispatch = useDispatch();

  const activeMenu = useSelector((state) => state.ui.activeMenu);
  const activeItem = menuItems.find((m) => m.id === activeMenu) ?? null;

  function handleActiveMenu(id) {
    dispatch(uiActions.setActiveMenu(id));
  }

  if (!activeItem) return;

  return (
    <div className={styles.dropdown} onMouseEnter={() => handleActiveMenu(activeItem.id)}>
      <div className={styles.dropdownInner}>
        <div className={styles.featured}>
          <div className={styles.featuredImage}>
            {activeItem.featured.image ? (
              <img
                src={activeItem.featured.image}
                alt={activeItem.featured.title}
                className={styles.featuredImg}
              />
            ) : (
              <span className={styles.featuredImgPlaceholder}>Campaign Image</span>
            )}
          </div>
          <div className={styles.featuredBody}>
            <p className={styles.featuredEyebrow}>{activeItem.label}</p>
            <h2 className={styles.featuredTitle}>{activeItem.featured.title}</h2>
            <p className={styles.featuredDesc}>{activeItem.featured.description}</p>
            <Link to={`${activeItem.id}`} className={styles.featuredCta}>
              Shop Now →
            </Link>
          </div>
        </div>

        <div className={styles.colDivider} />

        <div className={styles.columns}>
          {activeItem.columns.map((col) => (
            <div key={col.title} className={styles.column}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul className={styles.colList}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.link} className={styles.colLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {activeItem.highlights.length > 0 && (
            <div className={styles.column}>
              <h3 className={styles.colTitle}>Highlights</h3>
              <ul className={styles.colList}>
                {activeItem.highlights.map((highlight) => (
                  <li key={highlight.label}>
                    <Link to={highlight.link} className={styles.colLink}>
                      {highlight.label}
                      {highlight.badge && (
                        <span className={styles.linkBadge}>{highlight.badge}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
