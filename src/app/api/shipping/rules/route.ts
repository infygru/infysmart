import { NextResponse } from 'next/server';
import { directus } from '@/lib/directus';
import { readSingleton } from '@directus/sdk';
import type { GlobalSettings } from '@/lib/directus';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await directus.request(
      readSingleton('global_settings', {
        fields: ['serviceable_states', 'shipping_charge', 'free_shipping_above', 'gst_rate', 'cod_max_order_amount'],
      } as never)
    ) as GlobalSettings;

    return NextResponse.json({
      serviceable_states: settings.serviceable_states ?? [],
      shipping_charge: settings.shipping_charge ?? 299,
      free_shipping_above: settings.free_shipping_above ?? 5000,
      gst_rate: settings.gst_rate ?? 18,
      cod_max_order_amount: settings.cod_max_order_amount ?? 50000,
    });
  } catch {
    // Fail open — return defaults so checkout always works
    return NextResponse.json({
      serviceable_states: [],
      shipping_charge: 299,
      free_shipping_above: 5000,
      gst_rate: 18,
      cod_max_order_amount: 50000,
    });
  }
}
