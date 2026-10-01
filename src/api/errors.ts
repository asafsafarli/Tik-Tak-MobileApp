import { isAxiosError } from 'axios';

import type { ApiErrorBody } from './types';

export class ApiError extends Error {
  /** HTTP status, or 0 for network/timeout errors. */
  readonly status: number;
  /** All validation messages; `message` is these joined. */
  readonly messages: string[];

  constructor(status: number, messages: string[]) {
    super(messages.join('\n') || 'Unknown error');
    this.name = 'ApiError';
    this.status = status;
    this.messages = messages;
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isNetworkError() {
    return this.status === 0;
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (isAxiosError<ApiErrorBody>(error)) {
    if (!error.response) {
      return new ApiError(0, ['İnternet bağlantısı yoxdur və ya server cavab vermir.']);
    }
    const body = error.response.data;
    const raw = body?.message ?? error.message;
    const messages = Array.isArray(raw) ? raw : [String(raw)];
    return new ApiError(error.response.status, messages);
  }

  return new ApiError(0, [error instanceof Error ? error.message : String(error)]);
}
