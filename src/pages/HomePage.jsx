import Hero from '../components/Hero/Hero.jsx';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts.jsx';
import AboutUs from '../components/About/AboutUs.jsx';
import Join from '../components/Join/Join.jsx';

export default function HomePage() {
  return (
    <>
      <Hero title="FORGE YOUR STRENGTH" btnText="Shop now"></Hero>
      <FeaturedProducts
        bgWhite={true}
        title="Hand-Picked For You"
        eyebrowText="FEATURED"
      ></FeaturedProducts>
      <FeaturedProducts title="BEST SELLERS" eyebrowText="Most Loved Gear"></FeaturedProducts>
      <AboutUs bgWhite={true}></AboutUs>
      <Join />
    </>
  );
}
