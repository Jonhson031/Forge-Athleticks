import { useSelector, useDispatch } from "react-redux";
import FilterSection from "./FilterSection.jsx";
import styles from "./FilterSidebar.module.css";
import {
  CATEGORIES,
  ALL_SIZES,
  ALL_COLORS,
  COLOR_MAP,
  PRICE_RANGES,
} from "../../assets/data.js";
import { filtersAction } from "../../redux/store/filtersSlice.js";
import { selectActiveFiltersCount } from "../../redux/selectors/filtersSelectors.js";

export default function FilterSidebar({ onClear, mobile = null }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters);
  const totalActiveFilters = useSelector(selectActiveFiltersCount);

  function handleSetFilters(newFilters) {
    dispatch(filtersAction.setFilters(newFilters));
  }

  function toggle(key, value) {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    handleSetFilters({ ...filters, [key]: next });
  }

  function toggleSingle(key, value) {
    handleSetFilters({
      ...filters,
      [key]: filters[key] === value ? null : value,
    });
  }

  return (
    <aside className={`${styles.sidebar} ${mobile ? styles.mobile : ""}`}>
      <div className={styles.sidebarHeader}>
        <p className={styles.sidebarTitle}>Filters</p>
        {totalActiveFilters > 0 && (
          <button
            type="button"
            className={styles.clearAllBtn}
            onClick={onClear}
          >
            Clear all ({totalActiveFilters})
          </button>
        )}
      </div>

      <FilterSection title="Gender">
        {["men", "women"].map((gender) => (
          <label key={gender} className={styles.checkLabel}>
            <input
              type="checkbox"
              className={styles.checkInput}
              checked={filters.gender.includes(gender)}
              onChange={() => toggle("gender", gender)}
            />
            <span className={styles.checkBox} />
            <span className={styles.checkText}>
              {gender === "men" ? "Men" : "Women"}
            </span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Category">
        {CATEGORIES.map((category) => (
          <label key={category} className={styles.checkLabel}>
            <input
              type="checkbox"
              className={styles.checkInput}
              checked={filters.category.includes(category)}
              onChange={() => toggle("category", category)}
            />
            <span className={styles.checkBox} />
            <span className={styles.checkText}>{category}</span>
          </label>
        ))}
      </FilterSection>

      {/* <FilterSection title="Products">
        {PRODUCT_TYPES.map((type) => (
          <label key={type.id} className={styles.checkLabel}>
            <input
              type="checkbox"
              className={styles.checkInput}
              checked={filters.category.includes(type.id)}
              onChange={() => toggle("category", type.id)}
            />
            <span className={styles.checkBox} />
            <span className={styles.checkText}>{type.label}</span>
          </label>
        ))}
      </FilterSection> */}

      <FilterSection title="Size">
        <div className={styles.sizeGrid}>
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              className={`${styles.sizeChip} ${filters.sizes.includes(size) ? styles.sizeChipActive : ""}`}
              onClick={() => toggle("sizes", size)}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className={styles.colorRow}>
          {ALL_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              title={color}
              className={`${styles.colorChip} ${filters.colors.includes(color) ? styles.colorChipActive : ""}`}
              style={{ backgroundColor: COLOR_MAP[color] }}
              onClick={() => toggle("colors", color)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        {PRICE_RANGES.map((range) => (
          <label key={range.label} className={styles.checkLabel}>
            <input
              type="radio"
              className={styles.checkInput}
              checked={filters.priceRange?.label === range.label}
              onChange={() => toggleSingle("priceRange", range)}
            />
            <span className={styles.checkBox} />
            <span className={styles.checkText}>{range.label}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Deals" defaultOpen={false}>
        <label className={styles.checkLabel}>
          <input
            type="checkbox"
            className={styles.checkInput}
            checked={filters.onSale}
            onChange={() =>
              handleSetFilters({ ...filters, onSale: !filters.onSale })
            }
          />
          <span className={styles.checkBox} />
          <span className={styles.checkText}>On Sale</span>
        </label>
        <label className={styles.checkLabel}>
          <input
            type="checkbox"
            className={styles.checkInput}
            checked={filters.isNew}
            onChange={() =>
              handleSetFilters({ ...filters, isNew: !filters.isNew })
            }
          />
          <span className={styles.checkBox} />
          <span className={styles.checkText}>New Arrivals</span>
        </label>
      </FilterSection>
    </aside>
  );
}
