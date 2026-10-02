import { api } from '../client';
import type { Profile, UpdateProfilePayload } from '../types';

export const profileService = {
  get: () => api.get<Profile>('/profile'),
  update: (payload: UpdateProfilePayload) => api.put<Profile>('/profile', payload),
};
