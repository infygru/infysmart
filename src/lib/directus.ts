import { createDirectus, rest } from '@directus/sdk';

// 1. ADD 'export' BEFORE THESE INTERFACES
export interface GlobalSettings {
  id: number;
  site_name: string;
  contact_phone: string;
  contact_email: string;
  address: string;
  logo: string; // UUID
  hero_image: string; // UUID
  legal_disclaimer: string;
  announcement_bar: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  icon: string;
  short_description: string;
  full_description: string;
}
export interface Blog {
  id: number;
  title: string;
  slug: string;
  image: string; // UUID
  category: string;
  summary: string;
  content: string; // HTML from WYSIWYG
  date_published: string;
  author: string;
}

export interface Client {
  id: number;
  name: string;
  logo: string; 
  website_url: string;
}

export interface Lead {
  name: string;
  phone: string;
  service_interested: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
}
export interface Project {
  id: number;
  title: string;
  location: string;
  status: 'Ongoing' | 'Completed';
  summary: string;
  image: string; // UUID from Directus
}

// 2. Schema definition uses the exported types
interface Schema {
  global_settings: GlobalSettings;
  services: Service[];
  clients: Client[];
  leads: Lead[];
  projects: Project[];
  blogs: Blog[];
}

// 3. Initialize Client
const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://api.infysmart.com';

export const directus = createDirectus<Schema>(directusUrl)
  .with(rest());

export const getAssetUrl = (id: string) => `${directusUrl}/assets/${id}`;