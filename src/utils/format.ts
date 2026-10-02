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

export function formatPrice(value: string | number): string {
  return `${Number(value).toFixed(2)} AZN`;
}

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Sifariş qəbul edilib',
  CONFIRMED: 'Təsdiqləndi',
  PREPARING: 'Hazırlanır',
  READY: 'Hazırdır',
  DELIVERED: 'Çatdırıldı',
  CANCELLED: 'Ləğv edildi',
};

export function orderStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABELS[status] ?? status;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
