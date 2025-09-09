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
    const fetchAndSetAdmin = async (userId: string) => {
      try {
        console.log('Checking admin status for user:', userId);
        
        // Email-based admin check (fallback for database issues)
        const currentUser = (await supabase.auth.getUser()).data.user;
        const adminEmails = [
          'jupitervalorant15@gmail.com',
          'hemxanthh@gmail.com',
          'admin@test.com'
        ];
        
        if (currentUser && adminEmails.includes(currentUser.email || '')) {
          console.log('User is admin by email check:', currentUser.email);
          setIsAdmin(true);
          return;
        }
        
        // Database admin check with timeout
        const dbCheckPromise = supabase
          .from('user_profiles')
          .select('is_admin')
          .eq('id', userId)
          .single();
          
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database query timeout')), 3000)
        );
        
        const { data, error } = await Promise.race([dbCheckPromise, timeoutPromise]) as any;
        
        if (error) {
          console.error('Error fetching admin status:', error);
          setIsAdmin(false);
        } else {
          console.log('Admin check result from database:', { data });
          setIsAdmin(Boolean(data?.is_admin));
        }
      } catch (e) {
        console.error('Exception fetching admin status:', e);
        setIsAdmin(false);
      }
    };

    const bootstrap = async () => {
      try {
        console.log('AuthProvider: Starting bootstrap...');
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          console.log('AuthProvider: User found, checking admin status...');
          try {
            // Add timeout to prevent hanging
            await Promise.race([
              fetchAndSetAdmin(currentUser.id),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Admin check timeout')), 5000)
              )
            ]);
          } catch (adminError) {
            console.error('AuthProvider: Admin check failed:', adminError);
            setIsAdmin(false);
          }
        } else {
          console.log('AuthProvider: No user found');
          setIsAdmin(false);
        }
        
        console.log('AuthProvider: Bootstrap completed');
        setIsLoading(false);
      } catch (error) {
        console.error('AuthProvider: Bootstrap failed:', error);
        setSession(null);
        setUser(null);
        setIsAdmin(false);
        setIsLoading(false);
      }
    };

    // Add safety timeout for entire bootstrap process
    const initializeAuth = async () => {
      try {
        await Promise.race([
          bootstrap(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Auth initialization timeout')), 10000)
          )
        ]);
      } catch (error) {
        console.error('AuthProvider: Initialization failed or timed out:', error);
        setSession(null);
        setUser(null);
        setIsAdmin(false);
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (nextUser) {
        await fetchAndSetAdmin(nextUser.id);
      } else {
        setIsAdmin(false);
      }
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
