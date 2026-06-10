const CART_KEY = "forge-athleticks_cart";

export const loadCart = function () {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : { items: [], promo: null };
  } catch {
    return { items: [], promo: null };
  }
};

export const saveCart = function (cartState) {
  localStorage.setItem(CART_KEY, JSON.stringify(cartState));
};
