import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="container-max py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h1 className="heading-lg text-balance mb-4">Lass uns in Kontakt treten</h1>
            <p className="text-muted mb-8">
              Hast du ein Projekt oder eine Frage? Schreib mir eine Nachricht und ich werde mich so schnell wie möglich melden.
            </p>
            <ContactForm />
          </div>

          {/* Alternative Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="heading-md mb-2">Email</h3>
              <p className="text-muted">
                <a 
                  href="mailto:tadib24@gmail.com" 
                  className="text-accent hover:text-accent-hover underline"
                >
                  tadib24@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="heading-md mb-2">Schnelle Antwort</h3>
              <p className="text-muted">
                Ich antworte normalerweise innerhalb von 24 Stunden auf alle Anfragen.
              </p>
            </div>

            <div>
              <h3 className="heading-md mb-2">Verfügbarkeit</h3>
              <p className="text-muted">
                Ich bin verfügbar für Vollzeitprojekte, Freelance-Arbeiten und Consulting.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
