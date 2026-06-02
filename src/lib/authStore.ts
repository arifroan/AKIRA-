import { create } from 'zustand';
import { auth, db } from './firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'user' | 'super_admin';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithTwitter: () => Promise<void>;
  loginWithEmail: (e: string, p: string) => Promise<void>;
  signupWithEmail: (e: string, p: string) => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  
  loginWithGoogle: async () => {
    try {
      set({ isLoading: true });
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await handleAuthResult(result.user, set);
    } catch (error) {
      console.error("Login failed", error);
      set({ isLoading: false });
      throw error;
    }
  },
  
  loginWithTwitter: async () => {
    try {
      set({ isLoading: true });
      const provider = new TwitterAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await handleAuthResult(result.user, set);
    } catch (error) {
      console.error("Login failed", error);
      set({ isLoading: false });
      throw error;
    }
  },

  loginWithEmail: async (email, password) => {
    try {
      set({ isLoading: true });
      const result = await signInWithEmailAndPassword(auth, email, password);
      await handleAuthResult(result.user, set);
    } catch (error) {
      console.error("Login failed", error);
      set({ isLoading: false });
      throw error;
    }
  },

  signupWithEmail: async (email, password) => {
    try {
      set({ isLoading: true });
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await handleAuthResult(result.user, set);
    } catch (error) {
      console.error("Signup failed", error);
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      console.error("Logout failed", error);
    }
  },
  
  initAuth: () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        
        let role: 'user' | 'super_admin' = firebaseUser.email === 'ottus2023@gmail.com' ? 'super_admin' : 'user';
        
        if (userSnap.exists()) {
           role = userSnap.data().role;
        } else {
           const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'Anonymous',
              photoURL: firebaseUser.photoURL || '',
              role,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
           };
           await setDoc(userRef, userData);
        }
        
        set({
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Anonymous',
            photoURL: firebaseUser.photoURL || '',
            role
          },
          isLoading: false
        });
      } else {
        set({ user: null, isLoading: false });
      }
    });
  }
}));

async function handleAuthResult(firebaseUser: FirebaseUser, set: any) {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    
    const role = firebaseUser.email === 'ottus2023@gmail.com' ? 'super_admin' : 'user';
    
    const userData: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || 'Anonymous',
      photoURL: firebaseUser.photoURL || '',
      role
    };
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } else {
      if (userData.role === 'super_admin' && userSnap.data().role !== 'super_admin') {
         await setDoc(userRef, { role: 'super_admin', updatedAt: serverTimestamp() }, { merge: true });
      }
      userData.role = userSnap.data().role === 'super_admin' ? 'super_admin' : userData.role;
    }
    
    set({ user: userData, isLoading: false });
}
