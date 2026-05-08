import Cart from "../components/Cart/Cart.jsx";
import SEO from "../components/SEO/SEO.jsx";

export default function CartPage() {
  return (
    <>
      <SEO
        title="Your Cart | Forge Athletics"
        description="Review your selected items, adjust quantities, and proceed to secure checkout at Forge Athletics."
      />
      <Cart />
    </>
  );
}
