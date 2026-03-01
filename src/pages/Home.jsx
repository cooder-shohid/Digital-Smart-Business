import Hero from "../components/Hero";
import Services from "../components/Services";
import Products from "../components/Products";
import Cart from "../components/Cart";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import IncomeStrategy from "../components/IncomeStrategy";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <IncomeStrategy />
      <Products />
      <WhyChooseUs />
      <Testimonials />
      <Cart />
    </>
  );
}