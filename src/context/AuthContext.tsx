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
        
        // Email-based admin check (primary method)
        const currentUser = (await supabase.auth.getUser()).data.user;
        const adminEmails = [
          'jupitervalorant15@gmail.com',
          'hemxanthh@gmail.com',
          'admin@test.com'
        ];
        
        if (currentUser && adminEmails.includes(currentUser.email || '')) {
          console.log('User is admin by email check:', currentUser.email);
          setIsAdmin(true);
          return; // Skip database check if email-based admin
        }
        
        // Only check database for non-admin emails (optional secondary check)
        console.log('Email not in admin list, checking database...');
        try {
          const dbCheckPromise = supabase
            .from('user_profiles')
            .select('is_admin')
            .eq('id', userId)
            .single();
            
          const timeoutDuration = window.location.hostname === 'localhost' ? 5000 : 15000;
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Database query timeout')), timeoutDuration)
          );
          
          const { data, error } = await Promise.race([dbCheckPromise, timeoutPromise]) as any;
          
          if (error) {
            console.error('Error fetching admin status:', error);
            setIsAdmin(false);
          } else {
            console.log('Admin check result from database:', { data });
            setIsAdmin(Boolean(data?.is_admin));
          }
        } catch (dbError) {
          console.warn('Database admin check failed, defaulting to false:', dbError);
          setIsAdmin(false);
        }
      } catch (e) {
        console.error('Exception fetching admin status:', e);
        setIsAdmin(false);
      }
    };

    const bootstrap = async () => {
      try {
        console.log('AuthProvider: Starting bootstrap...');
        
        // Add connection test for Supabase
        const connectionTimeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Supabase connection timeout')), 8000)
        );
        
        const sessionPromise = supabase.auth.getSession();
        const { data: { session } } = await Promise.race([sessionPromise, connectionTimeout]) as any;
        
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          console.log('AuthProvider: User found, checking admin status...');
          try {
            // Add timeout to prevent hanging - longer for production
            const adminTimeout = window.location.hostname === 'localhost' ? 8000 : 20000;
            await Promise.race([
              fetchAndSetAdmin(currentUser.id),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Admin check timeout')), adminTimeout)
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

    // Initialize auth without overall timeout (let individual operations timeout)
    bootstrap().catch((error) => {
      console.error('AuthProvider: Bootstrap failed:', error);
      setSession(null);
      setUser(null);
      setIsAdmin(false);
      setIsLoading(false);
    });

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
