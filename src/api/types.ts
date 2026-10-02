// Shapes below were verified against the live API on 2026-10-01.

/** Standard response wrapper used by almost every endpoint. */
export interface ApiEnvelope<T> {
  message: string;
  data: T;
  result: boolean;
  pagination?: Pagination;
}

/** Error body. Validation errors (400) return `message` as an array. */
export interface ApiErrorBody {
  statusCode: number;
  message: string | string[];
  error?: string;
  result?: false;
}

export interface Pagination {
  next: number | null;
  prev: number | null;
  current: number;
  total: number;
  totalPages: number;
}

export interface Paginated<T> {
  items: T[];
  pagination: Pagination;
}

// ---------- Auth / Profile ----------

export type UserRole = 'COMMERCE' | 'ADMIN' | (string & {});

export interface Profile {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  address: string | null;
  img_url: string | null;
  role: UserRole;
  created_at: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginPayload {
  /** International format, e.g. +994501234567 */
  phone: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  full_name: string;
}

export interface LoginResponse {
  tokens: Tokens;
  profile: Profile;
}

/** `full_name` and `address` are required by the backend. */
export interface UpdateProfilePayload {
  full_name: string;
  address: string;
  email?: string;
  img_url?: string;
  /** Only when changing the password; must match `password_repeat`. */
  password?: string;
  password_repeat?: string;
}

// ---------- Catalog ----------

export interface Category {
  id: number;
  name: string;
  img_url: string | null;
  description: string | null;
  created_at: string;
}

export type ProductMeasure =
  | 'kg'
  | 'gr'
  | 'litre'
  | 'ml'
  | 'meter'
  | 'cm'
  | 'mm'
  | 'piece'
  | 'packet'
  | 'box';

export interface Product {
  id: number;
  title: string;
  img_url: string | null;
  description: string | null;
  /** Decimal string, e.g. "12.90" */
  price: string;
  type: ProductMeasure;
  created_at: string;
  /** The list endpoint returns only id + name; other endpoints return the full category. */
  category: Pick<Category, 'id' | 'name'> & Partial<Category>;
  /** Present only on GET /products/:id */
  is_favorite?: boolean;
}

export interface ProductListParams {
  page?: number;
  /** Defaults to 25 on the server. */
  limit?: number;
  search?: string;
  category_id?: number;
}

export interface Campaign {
  id: number;
  title: string;
  description: string | null;
  img_url: string | null;
  created_at: string;
}

// ---------- Basket ----------

export interface BasketItem {
  id: number;
  quantity: number;
  /** Decimal string: price * quantity */
  total_price: string;
  product: Product;
}

export interface Basket {
  items: BasketItem[];
  /** Decimal string */
  total: string;
  /** Number of distinct products in the basket */
  count: number;
}

// ---------- Orders ----------

export type PaymentMethod = 'CASH' | 'CARD';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface CheckoutPayload {
  paymentMethod: PaymentMethod;
  address: string;
  phone: string;
  note?: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  total_price: string;
  product: Product;
}

export interface Order {
  id: number;
  orderNumber: string;
  total: string;
  deliveryFee: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  note: string | null;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

// ---------- Upload ----------

export interface UploadResult {
  url: string;
}

/** A local file picked on the device (e.g. from expo-image-picker). */
export interface UploadFile {
  uri: string;
  name: string;
  /** MIME type, e.g. image/jpeg */
  type: string;
}
