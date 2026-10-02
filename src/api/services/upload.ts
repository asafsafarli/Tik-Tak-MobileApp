import { api } from '../client';
import type { UploadFile, UploadResult } from '../types';

export const uploadService = {
  /** Uploads an image and returns its public URL (e.g. for profile img_url). */
  async upload(file: UploadFile): Promise<string> {
    const form = new FormData();
    // React Native's FormData accepts { uri, name, type } for local files.
    form.append('file', file as unknown as Blob);
    const res = await api.post<UploadResult>('/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.url;
  },
};
