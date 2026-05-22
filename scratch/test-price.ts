import { readItems } from '@directus/sdk';
import { directus } from '../src/lib/directus';

async function test() {
  const products = await directus.request(readItems('products', {
    filter: { slug: { _eq: 'trueview-2mp-dual-light-2-camera-cctv-combo-offer' } },
    fields: ['id', 'name', 'price', 'sale_price']
  }));
  console.log(products);
}

test().catch(console.error);
