import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/uiSlice.js';
import styles from './SearchButton.module.css';

export default function SearchButton() {
  const dispatch = useDispatch();
  const searchOpen = useSelector((state) => state.ui.searchOpen);

  function openSearch() {
    dispatch(uiActions.openSearchMenu());
  }

  function closeSearch() {
    dispatch(uiActions.closeSearchMenu());
  }

  return (
    <button
      type="button"
      className={styles.searchBtn}
      aria-label={searchOpen ? 'Close search' : 'Open search'}
      onClick={searchOpen ? closeSearch : openSearch}
    >
      {searchOpen ? (
        <span className={styles.iconClose}></span>
      ) : (
        <span className="icon-search"></span>
      )}
    </button>
  );
}
