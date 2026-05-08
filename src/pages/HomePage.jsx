import Hero from "../components/Hero/Hero.jsx";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts.jsx";
import AboutUs from "../components/About/AboutUs.jsx";
import Join from "../components/Join/Join.jsx";
import SEO from "../components/SEO/SEO.jsx";

export default function HomePage() {
  return (
    <>
      <SEO
        title="Forge Athletics | Premium Gym Apparel & Activewear"
        description="Shop premium gym apparel built for performance, comfort, and style. Explore high-quality hoodies, t-shirts, shorts, leggings, and activewear at Forge Athletics."
      />
      <Hero title="FORGE YOUR STRENGTH" btnText="Shop now"></Hero>
      <FeaturedProducts
        bgWhite={true}
        title="Hand-Picked For You"
        eyebrowText="FEATURED"
      ></FeaturedProducts>
      <FeaturedProducts
        title="BEST SELLERS"
        eyebrowText="Most Loved Gear"
      ></FeaturedProducts>
      <AboutUs bgWhite={true}></AboutUs>
      <Join />
    </>
  );
}
