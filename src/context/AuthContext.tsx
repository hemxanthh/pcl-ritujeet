import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, userData: { fullName: string }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (data: { fullName?: string; phone?: string; avatarUrl?: string }) => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      const currentUser = session?.user;
      setUser(currentUser ?? null);

      if (currentUser) {
        try {
          console.log('Checking admin status for user:', currentUser.id, 'email:', currentUser.email);
          
          // Email-based admin check (temporary fallback)
          const adminEmails = [
            'jupitervalorant15@gmail.com',
            'hemxanthh@gmail.com', 
            'admin@test.com'
          ];
          
          if (adminEmails.includes(currentUser.email || '')) {
            console.log('User is admin by email check:', currentUser.email);
            setIsAdmin(true);
            setIsLoading(false);
            return;
          }
          
          // Database admin check
          const { data, error } = await supabase
            .from('user_profiles')
            .select('is_admin')
            .eq('id', currentUser.id)
            .single();

          if (error) {
            console.error('Error fetching admin status:', error);
            setIsAdmin(false);
          } else {
            console.log('Admin check result:', { data });
            setIsAdmin(data?.is_admin || false);
          }
        } catch (e) {
          console.error('Exception fetching admin status:', e);
          setIsAdmin(false);
        }
      }
      setIsLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      // Re-check admin status on auth change if needed, or rely on re-login
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userData: { fullName: string }) => {
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName,
          },
        },
      });

      if (signUpError) throw signUpError;
      
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const updateProfile = async (data: { fullName?: string; phone?: string; avatarUrl?: string }) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      const updates = {
        id: user.id,
        updated_at: new Date().toISOString(),
        ...data,
      };

      const { error } = await supabase
        .from('user_profiles')
        .upsert(updates);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAdmin,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateProfile,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
