import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  score: number;
  streak: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  initialize: () => void;
  updateProfile: (updates: Partial<User>) => Promise<{ error: any }>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },
  updateProfile: async (updates) => {
    const user = get().user;
    if (!user) return { error: new Error("User not found") };

    const { error } = await supabase.from('profiles').update(updates).eq('id', user.id);
    if (!error) {
      set({ user: { ...user, ...updates } as User });
    }
    return { error };
  },
  initialize: () => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Fetch user profile from DB
        supabase.from('profiles').select('*').eq('id', session.user.id).single()
          .then(({ data }) => {
            if (data) {
              set({ user: data as User, isAuthenticated: true, isLoading: false });
            } else {
              set({ isLoading: false });
            }
          });
      } else {
        set({ isLoading: false });
      }
    });

    // 2. Listen for auth changes
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        if (data) {
          set({ user: data as User, isAuthenticated: true, isLoading: false });
        }
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    });
  }
}));
