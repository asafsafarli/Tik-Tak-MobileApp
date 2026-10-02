import type { OrderStatus, ProductMeasure } from '@/api';

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

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Gözləmədə',
  CONFIRMED: 'Təsdiqləndi',
  PREPARING: 'Hazırlanır',
  READY: 'Hazırdır',
  DELIVERED: 'Çatdırıldı',
  CANCELLED: 'Ləğv edildi',
};

export function orderStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABELS[status] ?? status;
}

/** "2026-10-01T15:36:54Z" → "01.10.2026, 19:36" */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
