import { directus, getAssetUrl } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Hero from '@/components/Hero';
import ClientStrip from '@/components/ClientStrip';
import InfrastructureEcosystem from '@/components/InfrastructureEcosystem';
import WhyChooseUs from '@/components/WhyChooseUs';
import AuthorizedBrands from '@/components/AuthorizedBrands';
import ExecutionProcess from '@/components/ExecutionProcess';
import CurrentProjects from '@/components/CurrentProjects';
import FadeIn from '@/components/animations/FadeIn';
import PriceGuideCTA from '@/components/PriceGuideCTA';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, services, clients, projects] = await Promise.all([
    directus.request(readSingleton('global_settings')),
    directus.request(readItems('services')),
    directus.request(readItems('clients')),
    directus.request(readItems('projects'))
  ]);

  // Transform services content to match new government-focused messaging
  const transformedServices = services?.map((service: any) => {
    // 1. Rename "Industrial CCTV" -> "Industrial & PSU Surveillance"
    if (service.title === "Industrial CCTV") {
      return {
        ...service,
        title: "Industrial & PSU Surveillance",
        short_description: "High-compliance CCTV networks for factories, government offices, and public infrastructure."
      };
    }
    // 2. Rename "Building Automation" -> "Educational Campus Security"
    if (service.title === "Building Automation") {
      return {
        ...service,
        title: "Educational Campus Security",
        short_description: "Safety monitoring for colleges and schools, trusted by government institutions (ACCET)."
      };
    }
    // 3. Rename "Solar Power Systems" -> "Commercial & Office Automation"
    if (service.title === "Solar Power Systems") {
      return {
        ...service,
        title: "Commercial & Office Automation",
        short_description: "Biometric access & server room security."
      };
    }
    return service;
  });

  const heroImageUrl = settings?.hero_image
    ? getAssetUrl(settings.hero_image)
    : undefined;

  return (
    <main className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Hero heroImage={heroImageUrl} />

      <FadeIn direction="up" delay={0.2}>
        <ClientStrip clients={clients} />
      </FadeIn>

      <FadeIn direction="up">
        <AuthorizedBrands />
      </FadeIn>

      <FadeIn direction="up">
        {/* Pass transformedServices instead of raw services */}
        <InfrastructureEcosystem services={transformedServices || []} />
      </FadeIn>

      <FadeIn direction="up">
        <CurrentProjects projects={projects} />
      </FadeIn>

      <FadeIn direction="up">
        <ExecutionProcess />
      </FadeIn>

      <WhyChooseUs />

      <PriceGuideCTA />
    </main>
  );
}
