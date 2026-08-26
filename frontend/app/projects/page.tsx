import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="container-max py-16 md:py-24">
        <div className="mb-12">
          <h1 className="heading-lg text-balance mb-4">Projekte & Portfolio</h1>
          <p className="text-lg text-muted">
            Durchsuche meine Erfahrung mit verschiedenen Technologien und Geschäftslösungen.
          </p>
        </div>
        <Projects />
      </main>
      <Footer />
    </>
  );
}
