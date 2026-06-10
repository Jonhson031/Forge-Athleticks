import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Navigation:
  burgerOpen: false,
  searchOpen: false,
  searchValue: "",
  mobileExpanded: null,
  activeMenu: null,

  // Faqs
  faqActiveCategory: "orders",
  faqOpenId: null,

  sortBy: "newest",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Navigation:
    setIsBurgerOpen(state, action) {
      state.burgerOpen =
        action.payload !== undefined ? action.payload : !state.burgerOpen;
      state.searchOpen = false;
      state.mobileExpanded = null;
      state.searchValue = "";
      state.activeMenu = null;
    },
    openSearchMenu(state) {
      state.searchOpen = true;
      state.burgerOpen = false;
      state.activeMenu = null;
    },
    closeSearchMenu(state) {
      state.searchOpen = false;
      state.searchValue = "";
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload || null;
    },
    setMobileExpanded(state, action) {
      state.mobileExpanded =
        state.mobileExpanded === action.payload ? null : action.payload;
    },
    setActiveMenu(state, action) {
      state.searchOpen = false;
      state.activeMenu = action.payload;
    },

    // Filters and sort:
    setMobileFilderDrawer(state, action) {
      state.mobileFilterDrawerOpen = action.payload;
    },
    setSort(state, action) {
      state.sortBy = action.payload;
    },

    // Faqs
    setFaqActiveCategory(state, action) {
      state.faqActiveCategory = action.payload;
      state.faqOpenId = null;
    },
    setFaqOpenId(state, action) {
      state.faqOpenId =
        state.faqOpenId === action.payload ? null : action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
