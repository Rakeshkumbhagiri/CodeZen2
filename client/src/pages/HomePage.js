import { HeroSection } from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </>
  );
}
