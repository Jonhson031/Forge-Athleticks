import { useMemo, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { filtersAction } from "../../redux/store/filtersSlice.js";
import styles from "./Products.module.css";
import ProductCard from "../ProductCard/ProductCard.jsx";
import Eyebrow from "../Eyebrow/Eyebrow.jsx";
import FilterSidebar from "../Filters/FilterSidebar.jsx";
import MobileFilterDrawer from "../Filters/MobileFilterDrawer.jsx";
import { ALL_PRODUCTS } from "../../assets/data.js";
import Sort from "../Sort/Sort.jsx";
import ActiveFilters from "../Filters/ActiveFilters.jsx";
import { selectActiveFiltersCount } from "../../redux/selectors/filtersSelectors.js";

const DEFAULT_FILTERS = {
  gender: [],
  category: [],
  type: [],
  sizes: [],
  colors: [],
  priceRange: null,
  onSale: false,
  isNew: false,
};

export default function Products() {
  const { slug } = useParams();
  const parts = slug.split("-");
  let isSale = false;
  if (parts.slice(1).join("-") === "sale" || parts[0] === "sale") {
    isSale = true;
  }

  const initialGender =
    parts[0] === "men" || parts[0] === "women" ? parts[0] : null;
  let initialType =
    parts.slice(1).join("-") !== "sale" ? parts.slice(1).join("-") : null;
  const dispatch = useDispatch();

  function openMobileFilterDrawer() {
    dispatch(filtersAction.setMobileFilderDrawer(true));
  }

  const filters = useSelector((state) => state.filters.filters);
  const handleSetFilters = useCallback(
    (newFilters) => {
      dispatch(filtersAction.setFilters(newFilters));
    },
    [dispatch],
  );

  useEffect(() => {
    handleSetFilters({
      ...DEFAULT_FILTERS,
      gender:
        initialGender === "men" || initialGender === "women"
          ? [initialGender]
          : [],
      type: initialType ? [initialType] : [],
      onSale: isSale,
    });
  }, [initialGender, initialType, isSale, handleSetFilters]);

  const sort = useSelector((state) => state.ui.sortBy);

  const totalActiveFilters = useSelector(selectActiveFiltersCount);

  function clearFilters() {
    dispatch(
      filtersAction.clearFilters({
        gender: initialGender ? [initialGender] : [],
      }),
    );
  }

  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    if (filters.gender.length)
      list = list.filter((p) => filters.gender.includes(p.gender));
    if (filters.category.length)
      list = list.filter((p) => filters.category.includes(p.category));
    if (filters.type.length)
      list = list.filter((p) => filters.type.includes(p.type));
    if (filters.sizes.length)
      list = list.filter((p) => filters.sizes.some((s) => p.sizes.includes(s)));
    if (filters.colors.length)
      list = list.filter((p) =>
        filters.colors.some((c) => p.colors.includes(c)),
      );
    if (filters.priceRange)
      list = list.filter(
        (p) =>
          p.price >= filters.priceRange.min && p.price < filters.priceRange.max,
      );
    if (filters.onSale) list = list.filter((p) => p.isSale);
    if (filters.isNew) list = list.filter((p) => p.isNew);

    // Sort
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return list;
  }, [filters, sort]);

  const pageTitle =
    filters.gender.length === 1
      ? filters.gender[0] === "men"
        ? "Men's Collection"
        : "Women's Collection"
      : "All Products";

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <Eyebrow text={"shop"}></Eyebrow>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
        </div>
        <div className={styles.layout}>
          <FilterSidebar onClear={clearFilters} />

          <MobileFilterDrawer
            clearFilters={clearFilters}
            filtered={filtered}
          ></MobileFilterDrawer>

          <div className={styles.content}>
            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                <button
                  type="button"
                  className={styles.mobileFilterBtn}
                  onClick={openMobileFilterDrawer}
                >
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25"
                    />
                  </svg>
                  Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}
                </button>
                <p className={styles.resultCount}>
                  {filtered.length}{" "}
                  {filtered.length === 1 ? "product" : "products"}
                </p>
              </div>
              <Sort />
            </div>

            <ActiveFilters />
            {filtered.length > 0 ? (
              <div className={styles.grid}>
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <p className={styles.emptyTitle}>No products found</p>
                <p className={styles.emptyBody}>
                  Try adjusting or clearing your filters.
                </p>
                <button
                  type="button"
                  className={styles.emptyBtn}
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
