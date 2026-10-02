import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  authService,
  profileService,
  setSessionExpiredListener,
  type LoginPayload,
  type Profile,
  type SignupPayload,
} from '@/api';
import { queryClient } from '@/lib/queryClient';

type AuthStatus = 'loading' | 'signedIn' | 'signedOut';

interface AuthContextValue {
  status: AuthStatus;
  profile: Profile | null;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
  setProfile: (profile: Profile) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [profile, setProfile] = useState<Profile | null>(null);

  const signOutLocally = useCallback(() => {
    queryClient.clear();
    setProfile(null);
    setStatus('signedOut');
  }, []);

  useEffect(() => {
    setSessionExpiredListener(signOutLocally);

    (async () => {
      if (!(await authService.hasSession())) return signOutLocally();
      try {
        setProfile(await profileService.get());
        setStatus('signedIn');
      } catch {
        await authService.logout();
        signOutLocally();
      }
    })();

    return () => setSessionExpiredListener(null);
  }, [signOutLocally]);

  const login = useCallback(async (payload: LoginPayload) => {
    setProfile(await authService.login(payload));
    setStatus('signedIn');
  }, []);

  const signup = useCallback(async (payload: SignupPayload) => {
    setProfile(await authService.signup(payload));
    setStatus('signedIn');
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    signOutLocally();
  }, [signOutLocally]);

  const value = useMemo(
    () => ({ status, profile, login, signup, logout, setProfile }),
    [status, profile, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
