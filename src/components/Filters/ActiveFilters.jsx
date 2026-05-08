import styles from "./ActiveFilters.module.css";
import { useSelector, useDispatch } from "react-redux";
import { filtersAction } from "../../redux/store/filtersSlice.js";

export default function ActiveFilters() {
  const filters = useSelector((state) => state.filters.filters);
  const dispatch = useDispatch();
  const pills = [];

  function onChange(newFilters) {
    dispatch(filtersAction.setFilters(newFilters));
  }

  filters.gender.forEach((g) =>
    pills.push({
      label: g === "men" ? "Men" : "Women",
      remove: () =>
        onChange({ ...filters, gender: filters.gender.filter((v) => v !== g) }),
    }),
  );
  filters.category.forEach((c) =>
    pills.push({
      label: c,
      remove: () =>
        onChange({
          ...filters,
          category: filters.category.filter((v) => v !== c),
        }),
    }),
  );
  filters.type.forEach((t) =>
    pills.push({
      label: t,
      remove: () =>
        onChange({
          ...filters,
          type: filters.type.filter((v) => v !== t),
        }),
    }),
  );
  filters.sizes.forEach((s) =>
    pills.push({
      label: s,
      remove: () =>
        onChange({ ...filters, sizes: filters.sizes.filter((v) => v !== s) }),
    }),
  );
  filters.colors.forEach((c) =>
    pills.push({
      label: c,
      remove: () =>
        onChange({ ...filters, colors: filters.colors.filter((v) => v !== c) }),
    }),
  );
  if (filters.priceRange)
    pills.push({
      label: filters.priceRange.label,
      remove: () => onChange({ ...filters, priceRange: null }),
    });
  if (filters.onSale)
    pills.push({
      label: "On Sale",
      remove: () => onChange({ ...filters, onSale: false }),
    });
  if (filters.isNew)
    pills.push({
      label: "New Arrivals",
      remove: () => onChange({ ...filters, isNew: false }),
    });

  if (pills.length === 0) return null;

  return (
    <div className={styles.activePills}>
      {pills.map((pill, i) => (
        <button
          key={i}
          type="button"
          className={styles.pill}
          onClick={pill.remove}
        >
          {pill.label} <span>×</span>
        </button>
      ))}
    </div>
  );
}
