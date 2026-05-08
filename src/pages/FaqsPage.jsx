import Faqs from "../components/FAQs/Faqs.jsx";
import SEO from "../components/SEO/SEO.jsx";

export default function FaqsPage() {
  return (
    <>
      <SEO
        title="FAQs | Forge Athletics"
        description="Find answers to frequently asked questions about orders, shipping, returns, sizing, and products at Forge Athletics."
      />
      <Faqs />;
    </>
  );
}
