import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { ServiceCards } from "@/components/ServiceCards";
import { Projects } from "@/components/Projects";
import { ContactCta } from "@/components/ContactCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <ServiceCards />
        <Projects />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
