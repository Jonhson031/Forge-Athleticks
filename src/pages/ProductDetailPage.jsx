import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import { ALL_PRODUCTS } from "../assets/data";
import SEO from "../components/SEO/SEO";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = ALL_PRODUCTS.find((p) => p.id === parseInt(id));

  return (
    <>
      <SEO
        title={`${product.name} | Forge Athletics`}
        description={`${product.name} premium gym apparel for athletes.`}
      ></SEO>
      <ProductDetail product={product} />
    </>
  );
}
