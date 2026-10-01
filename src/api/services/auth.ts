import { api } from '../client';
import { tokenStorage } from '../tokenStorage';
import type { LoginPayload, LoginResponse, Profile, SignupPayload } from '../types';

export const authService = {
  /** Logs in and stores the tokens. */
  async login(payload: LoginPayload): Promise<Profile> {
    const res = await api.post<LoginResponse>('/auth/login', payload);
    await tokenStorage.setTokens(res.tokens);
    return res.profile;
  },

  /** Signup returns no tokens, so log in right after to start a session. */
  async signup(payload: SignupPayload): Promise<Profile> {
    await api.post<null>('/auth/signup', payload);
    return authService.login({ phone: payload.phone, password: payload.password });
  },

  logout: () => tokenStorage.clear(),

  async hasSession(): Promise<boolean> {
    return (await tokenStorage.getAccessToken()) != null;
  },
};
