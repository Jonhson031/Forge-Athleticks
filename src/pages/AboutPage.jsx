import About from "../components/About/AboutPage";
import SEO from "../components/SEO/SEO";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Forge Athletics | Built for Performance"
        description="Learn more about Forge Athletics and our mission to create premium gym apparel designed for performance, comfort, and everyday confidence."
      />
      <About />
    </>
  );
}
