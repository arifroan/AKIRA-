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
        provider.setCustomParameters({ prompt: 'select_account' });
        await signInWithPopup(auth, provider);
      } catch (error: any) {
        console.error("Login failed", error);
        if (error.code === 'auth/popup-blocked' || error.message.includes('popup')) {
          alert('Popup blocked by the browser. Please open the app in a new tab (using the button in the top right) to log in, or allow popups for this site.');
        } else if (error.code === 'auth/popup-closed-by-user') {
          // just ignore
        } else {
          alert(`Login failed: ${error.message}. If you are in the preview iframe, try opening the app in a new tab.`);
        }
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
