import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../redux/store/uiSlice";
import styles from "./Sort.module.css";
import { SORT_OPTIONS } from "../../assets/data";

export default function Sort() {
  const dispatch = useDispatch();

  const sort = useSelector((state) => state.ui.sortBy);
  function handleSort(value) {
    dispatch(uiActions.setSort(value));
  }

  return (
    <div className={styles.sortWrapper}>
      <label className={styles.sortLabel} htmlFor="sort">
        Sort by
      </label>
      <div className={styles.sortSelectWrapper}>
        <select
          id="sort"
          className={styles.sortSelect}
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.sortArrow}>↓</span>
      </div>
    </div>
  );
}
