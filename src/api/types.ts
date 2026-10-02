export interface ApiEnvelope<T> {
  message: string;
  data: T;
  result: boolean;
  pagination?: Pagination;
}

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

export interface UpdateProfilePayload {
  full_name: string;
  address: string;
  email?: string;
  img_url?: string;
  password?: string;
  password_repeat?: string;
}

export interface Category {
  id: number;
  name: string;
  img_url: string | null;
  description: string | null;
  created_at: string;
}

export type ProductMeasure =
  'kg' | 'gr' | 'litre' | 'ml' | 'meter' | 'cm' | 'mm' | 'piece' | 'packet' | 'box';

export interface Product {
  id: number;
  title: string;
  img_url: string | null;
  description: string | null;
  price: string;
  type: ProductMeasure;
  created_at: string;
  category: Pick<Category, 'id' | 'name'> & Partial<Category>;
  is_favorite?: boolean;
}

export interface ProductListParams {
  page?: number;
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

export interface BasketItem {
  id: number;
  quantity: number;
  total_price: string;
  product: Product;
}

export interface Basket {
  items: BasketItem[];
  total: string;
  count: number;
}

export type PaymentMethod = 'CASH' | 'CARD';

export type OrderStatus =
  'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';

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

export interface UploadResult {
  url: string;
}

export interface UploadFile {
  uri: string;
  name: string;
  type: string;
}
