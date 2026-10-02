import { api } from '../client';
import type { UploadFile, UploadResult } from '../types';

export const uploadService = {
  async upload(file: UploadFile): Promise<string> {
    const form = new FormData();
    form.append('file', file as unknown as Blob);
    const res = await api.post<UploadResult>('/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      transformRequest: (data) => data,
    });
    return res.url;
  },
};
