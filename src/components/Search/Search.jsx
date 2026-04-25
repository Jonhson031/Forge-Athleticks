import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/uiSlice.js';
import styles from './Search.module.css';

export default function Search() {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.ui.searchValue);
  const searchOpen = useSelector((state) => state.ui.searchOpen);

  function handleSearchValue(value) {
    dispatch(uiActions.setSearchValue(value));
  }

  function closeSearch() {
    dispatch(uiActions.closeSearchMenu());
  }

  function handleSearchKey(e) {
    if (e.key === 'Escape') closeSearch();
  }

  if (!searchOpen) return;

  return (
    <div className={styles.searchOverlay}>
      <form className={styles.searchOverlayInner}>
        <svg
          className={styles.searchOverlayIcon}
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>

        <input
          type="text"
          autoFocus
          placeholder="Search for products, collections..."
          className={styles.searchOverlayInput}
          value={searchValue}
          onChange={(e) => handleSearchValue(e.target.value)}
          onKeyDown={handleSearchKey}
        />

        {searchValue && (
          <button
            type="button"
            className={styles.searchClearBtn}
            onClick={() => handleSearchValue('')}
            aria-label="Clear search"
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <button
          type="button"
          className={styles.searchCloseBtn}
          onClick={closeSearch}
          aria-label="Close search"
        >
          ESC
        </button>
      </form>

      {!searchValue && (
        <div className={styles.searchQuickLinks}>
          <p className={styles.searchQuickLabel}>Popular Searches</p>
          <div className={styles.searchQuickTags}>
            {['Training Tee', 'Hoodies', 'Leggings', 'New Arrivals', 'Sale'].map((tag) => (
              <button
                key={tag}
                type="button"
                className={styles.searchQuickTag}
                onClick={() => handleSearchValue(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
