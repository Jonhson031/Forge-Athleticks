import { configureStore } from "@reduxjs/toolkit";

import { saveCart } from "../../utils/localStorage.js";
import { uiSlice } from "./uiSlice.js";
import { filtersSlice } from "./filtersSlice.js";
import { cartSlice } from "./cartSlice.js";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    filters: filtersSlice.reducer,
    cart: cartSlice.reducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  saveCart({
    items: state.cart.items,
    promo: state.cart.promo,
  });
});
