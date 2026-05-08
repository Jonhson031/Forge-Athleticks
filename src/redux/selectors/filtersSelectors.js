import { createSelector } from "@reduxjs/toolkit";

export const selectFilters = (state) => state.filters.filters;

export const selectActiveFiltersCount = createSelector(
  [selectFilters],
  (filters) => {
    return Object.values(filters).reduce((count, filter) => {
      if (Array.isArray(filter)) return count + filter.length;
      if (typeof filter === "boolean") return count + (filter ? 1 : 0);
      if (filter && typeof filter === "object") return count + 1;
      return count;
    }, 0);
  },
);
