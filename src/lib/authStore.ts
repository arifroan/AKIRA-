import { create } from 'zustand';
import { User, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  signupWithEmail: (email: string, password: string) => Promise<User>;
  loginWithEmail: (email: string, password: string) => Promise<User>;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize auth listener
  onAuthStateChanged(auth, async (user) => {
    // Check if user is an admin by querying user's document or checking email
    // Just using the email check for now based on original code, but we can expand if needed
    const isAdmin = user?.email === 'ottus2023@gmail.com'; 
    set({ user, isAdmin: !!isAdmin, isLoading: false });
  });

  return {
    user: null,
    isAdmin: false,
    isLoading: true,
    
    // Existing Google Login
    login: async () => {
      try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        const userCredential = await signInWithPopup(auth, provider);
        
        // Ensure user is in database
        if (userCredential.user) {
          const userRef = doc(db, 'users', userCredential.user.uid);
          const snap = await getDoc(userRef);
          if (!snap.exists()) {
             await setDoc(userRef, {
               email: userCredential.user.email,
               createdAt: new Date().toISOString(),
               role: userCredential.user.email === 'ottus2023@gmail.com' ? 'admin' : 'user'
             });
          }
        }
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
    
    // Email Password Signup
    signupWithEmail: async (email, password) => {
       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
       // Create record in Firestore database
       await setDoc(doc(db, 'users', userCredential.user.uid), {
         email: userCredential.user.email,
         createdAt: new Date().toISOString(),
         role: 'user'
       });
       return userCredential.user;
    },
    
    // Email Password Login
    loginWithEmail: async (email, password) => {
       const userCredential = await signInWithEmailAndPassword(auth, email, password);
       return userCredential.user;
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
