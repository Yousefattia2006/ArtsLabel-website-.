import ScrollAnimation from "@/components/ScrollAnimation";
import LandingSections from "@/components/LandingSections";
import Navbar from "@/components/Navbar";
import TextRotateSection from "@/components/TextRotateSection";
import HeroSection from "@/components/HeroSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import MaterialsSection from "@/components/MaterialsSection";
import IMLSection from "@/components/IMLSection";

const Index = () => {
  return (
    <main className="bg-background">
      <Navbar />
      <HeroSection />
      <ScrollAnimation />
      <TextRotateSection />
      <IMLSection />
      <MaterialsSection />
      <LandingSections />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
