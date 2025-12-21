import { directus, getAssetUrl } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Hero from '@/components/Hero';
import ClientStrip from '@/components/ClientStrip';
import InfrastructureEcosystem from '@/components/InfrastructureEcosystem';
import WhyChooseUs from '@/components/WhyChooseUs';
import AuthorizedBrands from '@/components/AuthorizedBrands';
import ExecutionProcess from '@/components/ExecutionProcess';
import Footer from '@/components/Footer';
import CurrentProjects from '@/components/CurrentProjects'; // <--- NEW IMPORT

export const revalidate = 60;

export default async function HomePage() {
  // Fetch 'projects' along with other data
  const [settings, services, clients, projects] = await Promise.all([
    directus.request(readSingleton('global_settings')),
    directus.request(readItems('services')),
    directus.request(readItems('clients')),
    directus.request(readItems('projects')) // <--- FETCH PROJECTS
  ]);

  const heroImageUrl = settings?.hero_image 
    ? getAssetUrl(settings.hero_image) 
    : undefined;

  return (
    <main className="min-h-screen bg-slate-50">
      <Hero heroImage={heroImageUrl} />
      <AuthorizedBrands />
      <ClientStrip clients={clients} />
      <InfrastructureEcosystem services={services} />
            {/* Add Current Projects Section Here */}
      <CurrentProjects projects={projects} />     
      <ExecutionProcess />
      <WhyChooseUs />
      <Footer settings={settings} />
    </main>
  );
}
