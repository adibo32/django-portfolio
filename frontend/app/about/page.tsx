import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="container-max py-16 md:py-24">
        <About />
        <Services />
      </main>
      <Footer />
    </>
  );
}
