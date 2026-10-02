import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, create } from 'axios';

import { API_BASE_URL, REQUEST_TIMEOUT_MS } from './config';
import { toApiError } from './errors';
import { tokenStorage } from './tokenStorage';
import type { ApiEnvelope, Paginated, Tokens } from './types';

export const http = create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

const AUTH_PATHS = ['/auth/login', '/auth/signup', '/auth/refresh'];

type SessionExpiredListener = () => void;
let onSessionExpired: SessionExpiredListener | null = null;

export function setSessionExpiredListener(listener: SessionExpiredListener | null) {
  onSessionExpired = listener;
}

http.interceptors.request.use(async (config) => {
  const token = await tokenStorage.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refresh_token = await tokenStorage.getRefreshToken();
  if (!refresh_token) throw new Error('No refresh token');

  const { data } = await axios.post<ApiEnvelope<Tokens>>(
    `${API_BASE_URL}/auth/refresh`,
    { refresh_token },
    { timeout: REQUEST_TIMEOUT_MS },
  );
  await tokenStorage.setTokens(data.data);
  return data.data.access_token;
}

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      (InternalAxiosRequestConfig & { _retried?: boolean }) | undefined;
    const isAuthPath = AUTH_PATHS.some((p) => original?.url?.startsWith(p));

    if (error.response?.status !== 401 || !original || original._retried || isAuthPath) {
      throw toApiError(error);
    }

    original._retried = true;
    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
      const token = await refreshPromise;
      original.headers.Authorization = `Bearer ${token}`;
      return http(original);
    } catch {
      await tokenStorage.clear();
      onSessionExpired?.();
      throw toApiError(error);
    }
  },
);

function unwrap<T>(body: ApiEnvelope<T> | T): T {
  if (body && typeof body === 'object' && 'result' in body && 'data' in body) {
    return (body as ApiEnvelope<T>).data;
  }
  return body as T;
}

export const api = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await http.get<ApiEnvelope<T> | T>(url, config);
    return unwrap(data);
  },

  async getPaginated<T>(url: string, config?: AxiosRequestConfig): Promise<Paginated<T>> {
    const { data } = await http.get<ApiEnvelope<T[]>>(url, config);
    const items = data.data ?? [];
    return {
      items,
      pagination: data.pagination ?? {
        next: null,
        prev: null,
        current: 1,
        total: items.length,
        totalPages: 1,
      },
    };
  },

  async post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await http.post<ApiEnvelope<T> | T>(url, body, config);
    return unwrap(data);
  },

  async put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await http.put<ApiEnvelope<T> | T>(url, body, config);
    return unwrap(data);
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await http.delete<ApiEnvelope<T> | T>(url, config);
    return unwrap(data);
  },
};
