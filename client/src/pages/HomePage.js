import { HeroSection } from "../components/HeroSection";
import  FeaturesSection  from "../components/FeaturesSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import { TestimonialsSection } from "../components/TestimonialsSection";

// import ProgressBar from "../components/ProgressBar";
// import TopicCards from "../components/TopicCards";
// import LevelSelector from "../components/LevelSelector";
// import Dashboard from "./Dashboard";

export default function HomePage() {
  return (
    <>
      
      <Navbar/>
      <HeroSection />
      <FeaturesSection />
      <Footer />
      {/* <TestimonialsSection />
      <ProgressBar/> */}
      {/* <LevelSelector /> */}
      {/* <Dashboard/>
      <TopicCards/>  */}
    </>
  );
}
