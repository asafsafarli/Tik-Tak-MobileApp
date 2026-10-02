import type { ProductMeasure } from '@/api';

const MEASURE_LABELS: Record<ProductMeasure, string> = {
  kg: 'kq',
  gr: 'qr',
  litre: 'litr',
  ml: 'ml',
  meter: 'm',
  cm: 'sm',
  mm: 'mm',
  piece: 'ədəd',
  packet: 'paket',
  box: 'qutu',
};

export function measureLabel(type: ProductMeasure): string {
  return MEASURE_LABELS[type] ?? type;
}

/** "3.3" → "3.30 AZN" */
export function formatPrice(value: string | number): string {
  return `${Number(value).toFixed(2)} AZN`;
}
