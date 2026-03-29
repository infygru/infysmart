import { createDirectus, rest, staticToken } from '@directus/sdk';

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://api.infysmart.com';

export const directusAdmin = createDirectus(directusUrl)
  .with(staticToken(process.env.DIRECTUS_ADMIN_TOKEN!))
  .with(rest());
