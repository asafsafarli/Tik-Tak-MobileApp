import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import type { Tokens } from './types';

const ACCESS_KEY = 'tiktak.access_token';
const REFRESH_KEY = 'tiktak.refresh_token';

const memory = new Map<string, string>();
const isWeb = Platform.OS === 'web';

async function read(key: string): Promise<string | null> {
  if (isWeb) return memory.get(key) ?? null;
  return SecureStore.getItemAsync(key);
}

async function write(key: string, value: string): Promise<void> {
  if (isWeb) {
    memory.set(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function remove(key: string): Promise<void> {
  if (isWeb) {
    memory.delete(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

export const tokenStorage = {
  getAccessToken: () => read(ACCESS_KEY),
  getRefreshToken: () => read(REFRESH_KEY),

  async setTokens(tokens: Tokens) {
    await Promise.all([
      write(ACCESS_KEY, tokens.access_token),
      write(REFRESH_KEY, tokens.refresh_token),
    ]);
  },

  async clear() {
    await Promise.all([remove(ACCESS_KEY), remove(REFRESH_KEY)]);
  },
};
