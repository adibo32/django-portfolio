export type Lang = "de" | "en" | "ar" | "fr";

type FlowItem = { label: string; sub: string; glyph: string };
type Card = { title: string; text: string };

const de = {
  nav: {
    home: "Startseite",
    about: "Über mich",
    skills: "Kompetenzen",
    projects: "Projekte",
    contact: "Kontakt",
    cta: "Projekt starten",
  },
  home: {
    hero: {
      badge: "Full-Stack-Entwickler aus Düsseldorf",
      titleStart: "Ich baue Software, die Ihren Betrieb ",
      titleAccent: "am Laufen hält",
      titleEnd: ".",
      description:
        "Odoo, Python und Web-Apps von der Datenbank bis zur Oberfläche, verbunden mit Ihren bestehenden Systemen.",
      cta1: "Projekt starten",
      cta2: "Projekte ansehen",
    },
    services: {
      eyebrow: "01 / Kompetenzen",
      title: "Was ich baue",
      subtitle: "Vier Bereiche, in denen ich täglich arbeite.",
      more: "Mehr erfahren",
      fullstack: {
        title: "Full-Stack-Entwicklung",
        text: "Backend, Datenbank und Oberfläche aus einer Hand. Mit Python, Django, React und JavaScript.",
      },
      erp: {
        title: "ERP-Systeme",
        text: "Odoo-Module und Anpassungen, die zu Ihren Abläufen passen.",
      },
      api: {
        title: "Schnittstellen",
        text: "Systeme sauber verbinden, damit Daten automatisch fließen.",
      },
      ai: {
        title: "KI-Lösungen",
        text: "Chatbots und automatisierte Workflows mit Sprachmodellen, angebunden an Ihre Daten.",
      },
    },
    projects: {
      eyebrow: "02 / Projekte",
      title: "Ausgewählte Projekte",
      items: [
        {
          name: "Bau-ERP für Odoo 16",
          text: "Odoo-Modul für Bauunternehmen: Projekte, Angebote, Einkauf, Material, Maschinen und Abrechnung.",
        },
        {
          name: "Hotel-Reservierung",
          text: "Django-Backend mit API für Hotels, Kunden, Flüge und Buchungen.",
        },
        {
          name: "Chatbot",
          text: "Webchat mit Django und ChatterBot, der vordefinierte Fragen beantwortet.",
        },
      ],
    },
    cta: {
      title: "Sie haben ein Projekt oder ein Problem?",
      text: "Schreiben Sie mir kurz, worum es geht. Ich melde mich bei Ihnen.",
      button: "Projekt starten",
    },
  },
  detail: {
    back: "Zurück zur Übersicht",
    code: "Code auf GitHub",
    fullstack: {
      tag: "Entwicklungsmodus",
      title: "Full-Stack-Entwicklung",
      intro:
        "Backend, Datenbank und Oberfläche aus einer Hand. Hier ein Blick in den Code, mit dem ich arbeite.",
      running: "läuft",
      flowTitle: "Wie eine Web-App aufgebaut ist",
      flowText:
        "Besucher sehen die Oberfläche. Die Logik dahinter verarbeitet ihre Eingaben, die Datenbank speichert das Ergebnis.",
      flow: [
        { label: "Oberfläche", sub: "Das sehen Ihre Kunden", glyph: "" },
        { label: "Logik", sub: "Das prüft und rechnet", glyph: "" },
        { label: "Datenbank", sub: "Hier liegen Ihre Daten", glyph: "" },
      ] as FlowItem[],
      whoTitle: "Für wen ist das?",
      who: [
        "Unternehmen, die manuelle Abläufe digitalisieren",
        "Startups, die schnell ein erstes Produkt brauchen",
        "Teams, deren alte Tools nicht mehr mitwachsen",
      ],
      whatTitle: "Wofür braucht man das?",
      what: [
        "Kundenportale und Buchungssysteme",
        "Interne Verwaltungstools mit Login",
        "Websites mit Anfrageformular und Admin-Bereich",
      ],
      tech: [
        {
          title: "Django",
          text: "Bringt Admin-Bereich, Benutzerverwaltung und Sicherheitsfunktionen mit. Passt zu Portalen und Datenverwaltung.",
        },
        {
          title: "Flask",
          text: "Leichtgewichtig, gut für kleine Dienste und Schnittstellen.",
        },
        {
          title: "React",
          text: "Interaktive Oberflächen aus wiederverwendbaren Bausteinen.",
        },
        {
          title: "JavaScript",
          text: "Alles, was im Browser passiert, etwa Formulare und Animationen.",
        },
      ] as Card[],
    },
    erp: {
      title: "ERP-Systeme mit Odoo",
      intro:
        "Ein ERP ist die zentrale Software, in der ein Unternehmen Verkauf, Einkauf, Lager, Buchhaltung und Projekte zusammen verwaltet. Alle arbeiten mit denselben Daten statt mit vielen einzelnen Listen.",
      modules: [
        "Vertrieb",
        "Einkauf",
        "Lager",
        "Buchhaltung",
        "Projekte",
        "Fertigung",
      ],
      servicesTitle: "Leistungen rund um Odoo",
      servicesText:
        "Odoo bringt viel mit. Was in Ihrem Betrieb fehlt, entwickle ich dazu oder passe es an.",
      services: [
        {
          title: "Module entwickeln",
          text: "Neue Funktionen, die Odoo nicht mitbringt, als sauberes, getestetes Modul.",
        },
        {
          title: "Odoo anpassen",
          text: "Formulare, Berichte und Abläufe so ändern, dass Ihr Team nichts umgehen muss.",
        },
        {
          title: "Fehler beheben und pflegen",
          text: "Bugs finden, Daten korrigieren und das System stabil halten.",
        },
      ] as Card[],
      exampleTitle: "Beispiel: Bau-ERP",
      exampleText:
        "Ein Odoo-16-Modul für Bauunternehmen mit Projekten, Angeboten, Einkauf, Material, Maschinen und Abrechnung.",
    },
    api: {
      title: "Schnittstellen und Datenaustausch",
      intro:
        "Datenaustausch heißt: Zwei Programme geben sich automatisch Daten weiter, etwa Bestellungen vom Shop ins ERP. Niemand tippt etwas ab oder verschickt Dateien.",
      flow: [
        { label: "Ihr ERP", sub: "Hier liegen Bestellungen", glyph: "" },
        { label: "API", sub: "Die Verbindung dazwischen", glyph: "" },
        {
          label: "Ihr Partnersystem",
          sub: "Shop, Lieferant oder Kunde",
          glyph: "Shop",
        },
      ] as FlowItem[],
      solutionTitle: "Die Lösung: eine API",
      solutionText:
        "Eine API ist eine klar definierte Tür. Das andere System schickt eine Anfrage und bekommt eine saubere Antwort.",
      cards: [
        {
          title: "Automatische Wiederholung",
          text: "Scheitert eine Übertragung, versucht das System es später erneut.",
        },
        {
          title: "Protokolle",
          text: "Sie sehen, was wann übertragen wurde und was nicht.",
        },
        {
          title: "Zugriffsschutz",
          text: "Nur berechtigte Systeme dürfen Daten senden, Eingaben werden geprüft.",
        },
      ] as Card[],
    },
    ai: {
      title: "KI-Lösungen",
      intro:
        "Sprachmodelle übernehmen Routinearbeit: Fragen beantworten, Anfragen sortieren, Abläufe anstoßen. Ich binde sie so in Ihre Software ein, dass sich die Ergebnisse prüfen lassen.",
      flow: [
        { label: "Eingang", sub: "Frage oder E-Mail", glyph: "Anfrage" },
        { label: "Sprachmodell", sub: "Versteht und sortiert", glyph: "" },
        {
          label: "Ihre Daten",
          sub: "Per API aus Odoo oder Datenbank",
          glyph: "",
        },
        { label: "Ergebnis", sub: "Antwort oder Aufgabe", glyph: "Antwort" },
      ] as FlowItem[],
      cards: [
        {
          title: "Chatbots",
          text: "Beantworten häufige Kundenfragen rund um die Uhr und geben schwierige Fälle an Sie weiter.",
        },
        {
          title: "Workflows aufbauen",
          text: "Eine Anfrage kommt an, die KI sortiert sie, das Ergebnis landet in Odoo oder bei Ihrem Team.",
        },
        {
          title: "Anbindung an Ihre Systeme",
          text: "Die KI greift per API auf Odoo oder Ihre Datenbank zu und arbeitet mit echten Daten.",
        },
      ] as Card[],
      exampleTitle: "Beispiel: Chatbot",
      exampleText:
        "Ein Webchat auf Django-Basis, der vordefinierte Fragen beantwortet. Mein erster Schritt in Richtung Gesprächslogik.",
    },
  },
};

export type Dict = typeof de;

const en: Dict = {
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    cta: "Start a project",
  },
  home: {
    hero: {
      badge: "Full-stack developer from Düsseldorf, Germany",
      titleStart: "I build software that keeps your business ",
      titleAccent: "running",
      titleEnd: ".",
      description:
        "Odoo, Python and web apps from the database to the interface, connected to the systems you already use.",
      cta1: "Start a project",
      cta2: "View projects",
    },
    services: {
      eyebrow: "01 / Skills",
      title: "What I build",
      subtitle: "Four areas I work in every day.",
      more: "Learn more",
      fullstack: {
        title: "Full-stack development",
        text: "Backend, database and interface from one source. With Python, Django, React and JavaScript.",
      },
      erp: {
        title: "ERP systems",
        text: "Odoo modules and customizations that fit the way you work.",
      },
      api: {
        title: "Integrations",
        text: "Connecting systems cleanly so data flows automatically.",
      },
      ai: {
        title: "AI solutions",
        text: "Chatbots and automated workflows with language models, connected to your data.",
      },
    },
    projects: {
      eyebrow: "02 / Projects",
      title: "Selected projects",
      items: [
        {
          name: "Construction ERP for Odoo 16",
          text: "Odoo module for construction companies: projects, quotes, purchasing, materials, machines and invoicing.",
        },
        {
          name: "Hotel reservation",
          text: "Django backend with an API for hotels, customers, flights and bookings.",
        },
        {
          name: "Chatbot",
          text: "Web chat built with Django and ChatterBot that answers predefined questions.",
        },
      ],
    },
    cta: {
      title: "Have a project or a problem?",
      text: "Send me a short note about what you need. I will get back to you.",
      button: "Start a project",
    },
  },
  detail: {
    back: "Back to overview",
    code: "Code on GitHub",
    fullstack: {
      tag: "Developer mode",
      title: "Full-stack development",
      intro:
        "Backend, database and interface from one source. Here is a look at the code I work with.",
      running: "running",
      flowTitle: "How a web app is built",
      flowText:
        "Visitors see the interface. The logic behind it processes their input, and the database stores the result.",
      flow: [
        { label: "Interface", sub: "What your customers see", glyph: "" },
        { label: "Logic", sub: "Checks and calculates", glyph: "" },
        { label: "Database", sub: "Where your data lives", glyph: "" },
      ],
      whoTitle: "Who is it for?",
      who: [
        "Companies digitizing manual processes",
        "Startups that need a first product quickly",
        "Teams whose old tools no longer scale",
      ],
      whatTitle: "What is it used for?",
      what: [
        "Customer portals and booking systems",
        "Internal admin tools with login",
        "Websites with a contact form and admin area",
      ],
      tech: [
        {
          title: "Django",
          text: "Comes with an admin area, user management and security features. Fits portals and data management.",
        },
        {
          title: "Flask",
          text: "Lightweight, good for small services and APIs.",
        },
        {
          title: "React",
          text: "Interactive interfaces built from reusable components.",
        },
        {
          title: "JavaScript",
          text: "Everything that happens in the browser, such as forms and animations.",
        },
      ],
    },
    erp: {
      title: "ERP systems with Odoo",
      intro:
        "An ERP is the central software where a company manages sales, purchasing, inventory, accounting and projects together. Everyone works with the same data instead of many separate lists.",
      modules: [
        "Sales",
        "Purchasing",
        "Inventory",
        "Accounting",
        "Projects",
        "Manufacturing",
      ],
      servicesTitle: "Odoo services",
      servicesText:
        "Odoo comes with a lot. What your business is missing, I build or adapt.",
      services: [
        {
          title: "Developing modules",
          text: "New features Odoo does not include, as a clean, tested module.",
        },
        {
          title: "Customizing Odoo",
          text: "Change forms, reports and workflows so your team does not need workarounds.",
        },
        {
          title: "Fixing and maintaining",
          text: "Finding bugs, correcting data and keeping the system stable.",
        },
      ],
      exampleTitle: "Example: construction ERP",
      exampleText:
        "An Odoo 16 module for construction companies with projects, quotes, purchasing, materials, machines and invoicing.",
    },
    api: {
      title: "Integrations and data exchange",
      intro:
        "Data exchange means two programs pass data to each other automatically, for example orders from a shop into the ERP. Nobody retypes anything or emails files.",
      flow: [
        { label: "Your ERP", sub: "Where orders live", glyph: "" },
        { label: "API", sub: "The connection in between", glyph: "" },
        {
          label: "Your partner system",
          sub: "Shop, supplier or customer",
          glyph: "Shop",
        },
      ],
      solutionTitle: "The solution: an API",
      solutionText:
        "An API is a clearly defined door. The other system sends a request and gets a clean response.",
      cards: [
        {
          title: "Automatic retries",
          text: "If a transfer fails, the system tries again later.",
        },
        {
          title: "Logs",
          text: "You can see what was transferred when, and what was not.",
        },
        {
          title: "Access control",
          text: "Only authorized systems can send data, and input is validated.",
        },
      ],
    },
    ai: {
      title: "AI solutions",
      intro:
        "Language models take over routine work: answering questions, sorting requests, triggering processes. I integrate them into your software so the results can be checked.",
      flow: [
        { label: "Input", sub: "Question or email", glyph: "Request" },
        { label: "Language model", sub: "Understands and sorts", glyph: "" },
        {
          label: "Your data",
          sub: "Via API from Odoo or a database",
          glyph: "",
        },
        { label: "Result", sub: "Answer or task", glyph: "Answer" },
      ],
      cards: [
        {
          title: "Chatbots",
          text: "Answer common customer questions around the clock and pass difficult cases on to you.",
        },
        {
          title: "Building workflows",
          text: "A request comes in, the AI sorts it, and the result ends up in Odoo or with your team.",
        },
        {
          title: "Connecting your systems",
          text: "The AI accesses Odoo or your database through an API and works with real data.",
        },
      ],
      exampleTitle: "Example: chatbot",
      exampleText:
        "A Django-based web chat that answers predefined questions. My first step toward conversation logic.",
    },
  },
};

export const translations: Record<Lang, Dict> = {
  de,
  en,
  // Arabisch und Französisch: Navigation übersetzt, neue Inhalte vorerst auf Englisch.
  ar: {
    ...en,
    nav: {
      home: "الرئيسية",
      about: "حول",
      skills: "المهارات",
      projects: "المشاريع",
      contact: "اتصل",
      cta: "ابدأ مشروع",
    },
  },
  fr: {
    ...en,
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
      cta: "Commencer",
    },
  },
};
