import { createSlice } from "@reduxjs/toolkit";

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

const initialState = {
  mobileFilterDrawerOpen: false,
  filters: { ...DEFAULT_FILTERS, gender: [] },
  totalActiveFilters: 0,
};

export const filtersSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileFilderDrawer(state, action) {
      state.mobileFilterDrawerOpen = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    clearFilters(state, action) {
      state.filters = { ...DEFAULT_FILTERS, ...action.payload };
    },
    updateFiltersActiveCount(state) {
      state.totalActiveFilters = Object.values(state.filters).reduce(
        (count, filter) => {
          if (Array.isArray(filter)) {
            return count + filter.length;
          } else if (typeof filter === "boolean") {
            return count + (filter ? 1 : 0);
          } else if (filter !== null && typeof filter === "object") {
            return count + 1;
          }
          return count;
        },
        0,
      );
    },
  },
});

export const filtersAction = filtersSlice.actions;
