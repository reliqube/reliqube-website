import { Nav }             from "@/components/shared/Nav";
import { Footer }          from "@/components/shared/Footer";
import { HeroSection }     from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { WhySection }      from "@/components/sections/WhySection";
import { StackSection }    from "@/components/sections/StackSection";
import { AboutSection }    from "@/components/sections/AboutSection";
import { ContactSection }  from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      {/* id="top" — target for the logo's href="#top" skip-to-top link in Nav */}
      <div id="top" aria-hidden="true" style={{ position: "absolute", top: 0 }} />
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <ServicesSection />
        <PackagesSection />
        <WhySection />
        <StackSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
