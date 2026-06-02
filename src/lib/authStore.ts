import { create } from 'zustand';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  login: async (email: string) => {
    set({ isLoading: true });
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 800));
    set({ user: { id: '1', email }, isLoading: false });
  },
  logout: () => {
    set({ user: null });
  },
}));
