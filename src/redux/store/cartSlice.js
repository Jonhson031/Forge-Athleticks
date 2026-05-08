import { createSlice } from "@reduxjs/toolkit";
import { loadCart } from "../../utils/localStorage.js";

const initialCart = loadCart();

const initialState = {
  items: initialCart.items || [],
  promo: initialCart.promo || null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const item = action.payload;
      const existingItemIndex = state.items.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color,
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].qty += item.qty;
      } else {
        state.items.push(item);
      }
    },
    updateCartItemQty(state, action) {
      const { itemId, newQty } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === itemId,
      );
      if (existingItemIndex !== -1) {
        const item = state.items[existingItemIndex];
        item.qty = newQty;
      }
    },
    removeItemFromCart(state, action) {
      const itemId = action.payload;
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === itemId,
      );
      if (existingItemIndex !== -1) {
        state.items.splice(existingItemIndex, 1);
      }
    },
    applyPromoCode(state, action) {
      const code = action.payload.trim().toUpperCase();
      if (code === "FORGE10") {
        state.promo = { code: "FORGE10", discount: 0.1 };
      } else {
        state.promo = null;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
