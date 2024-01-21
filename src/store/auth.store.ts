import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { auth } from '../services/firebase';
import { User, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { notifications } from '@mantine/notifications';

interface AuthStore {
  userData: User | null,
  login: (email: string, password: string) => Promise<boolean>,
  register: (email: string, password: string) => Promise<boolean>,
  logout: () => Promise<void>
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      userData: null,
      register: async (email: string, password: string) => {
        try {
          const userData = await createUserWithEmailAndPassword(auth, email, password);
          set({ userData: userData.user });
          return true;
        } catch (error) {
          set({ userData: null });

          notifications.show({
            title: 'Failed to register',
            message: (error as Error).message,
          });
          console.error(error);
          return false;
        }
      },
      login: async (email: string, password: string) => {
        try {
          const userData = await signInWithEmailAndPassword(auth, email, password);
          set({ userData: userData.user });
          return true;
        } catch (error) {
          set({ userData: null });

          notifications.show({
            title: 'Failed to log in',
            message: (error as Error).message,
          });
          console.error(error);
          return false;
        }
      },
      logout: async () => {
        try {
          await signOut(auth);
        } catch (error) {
          notifications.show({
            title: 'Failed to logout',
            message: (error as Error).message,
          });
          console.error(error);
        } finally {
          set({ userData: null });
        }
      }
    }),
    {
      name: 'auth-data',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
