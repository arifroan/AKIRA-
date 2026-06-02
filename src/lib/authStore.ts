import { create } from 'zustand';
import { User, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize auth listener
  onAuthStateChanged(auth, (user) => {
    const isAdmin = user?.email === 'ottus2023@gmail.com' && user?.emailVerified;
    set({ user, isAdmin: !!isAdmin, isLoading: false });
  });

  return {
    user: null,
    isAdmin: false,
    isLoading: true,
    login: async () => {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error("Login failed", error);
      }
    },
    logout: async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Logout failed", error);
      }
    }
  };
});
