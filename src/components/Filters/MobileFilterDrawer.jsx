import { useSelector, useDispatch } from "react-redux";
import styles from "./MobileFilterDrawer.module.css";
import FilterSidebar from "./FilterSidebar";
import { filtersAction } from "../../redux/store/filtersSlice.js";

export default function MobileFilterDrawer({ clearFilters, filtered }) {
  const dispatch = useDispatch();
  const mobileFilterDrawerOpen = useSelector(
    (state) => state.filters.mobileFilterDrawerOpen,
  );
  const filters = useSelector((state) => state.filters.filters);

  function handleSetFilters(newFilters) {
    dispatch(filtersAction.setFilters(newFilters));
  }

  function closeMobileFilterDrawer() {
    dispatch(filtersAction.setMobileFilderDrawer(false));
  }

  if (mobileFilterDrawerOpen) {
    return (
      <>
        <div
          className={styles.drawerBackdrop}
          onClick={closeMobileFilterDrawer}
        />
        <div className={styles.filterDrawer}>
          <div className={styles.filterDrawerHeader}>
            <p className={styles.filterDrawerTitle}>Filters</p>
            <button
              type="button"
              className={styles.filterDrawerClose}
              onClick={closeMobileFilterDrawer}
            >
              ✕
            </button>
          </div>
          <div className={styles.filterDrawerBody}>
            <FilterSidebar
              filters={filters}
              onChange={handleSetFilters}
              onClear={clearFilters}
              mobile={true}
            />
          </div>
          <div className={styles.filterDrawerFooter}>
            <button
              type="button"
              className={styles.applyBtn}
              onClick={closeMobileFilterDrawer}
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      </>
    );
  }
}
