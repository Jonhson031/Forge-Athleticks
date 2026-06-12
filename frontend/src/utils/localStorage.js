const CART_KEY = "forge-athleticks_cart";

export const loadCart = function () {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : { items: [] };
  } catch {
    return { items: [] };
  }
};

export const saveCart = function (cartState) {
  // do not persist promo to localStorage
  const { promo, ...toSave } = cartState || {};
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(toSave));
  } catch {
    // ignore storage errors
  }
};
