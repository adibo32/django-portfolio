import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactCta } from "@/components/ContactCta";
import { ServiceDetail } from "@/components/service/ServiceDetail";
import { SERVICE_SLUGS, type ServiceSlug } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(SERVICE_SLUGS as readonly string[]).includes(slug)) notFound();

  return (
    <>
      <Navbar />
      <main>
        <ServiceDetail slug={slug as ServiceSlug} />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
