import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  department: string;
  avatar?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ data: any; error: string | null }>;
  register: (
    email: string,
    password: string,
    name: string,
    phone?: string
  ) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('rms_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (supabaseError) throw supabaseError;
  
      const user = {
        id: data.user?.id ?? '',
        name: data.user?.user_metadata?.name ?? '',
        email: data.user?.email ?? '',
        role: data.user?.user_metadata?.role ?? 'User',
        department: data.user?.user_metadata?.department ?? 'General',
        avatar: data.user?.user_metadata?.avatar_url ?? '',
      };
  
      localStorage.setItem('rms_user', JSON.stringify(user));
      setCurrentUser(user);
  
      return { data, error: null }; // ✅ return success result
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Login failed';
      setError(errorMsg);
      return { data: null, error: errorMsg }; // ✅ return error for Login.tsx to handle
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const register = async (
    email: string,
    password: string,
    name: string,
    phone?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!email || !password || !name) throw new Error('Missing required fields');
  
      // 1. Sign up with Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
            role: 'User',
            department: 'General',
            avatar_url: ''
          }
        }
      });
  
      if (authError) throw authError;
  
      const userId = data.user?.id;
      if (!userId) throw new Error('User ID not returned from Supabase Auth');
  
      // 2. Insert into candidates table
      const { error: dbError } = await supabase.from('candidates').insert([
        {
          id: userId,
          name,
          email,
          phone,
          role: 'User',
          department: 'General',
          avatar: ''
        }
      ]);
  
      if (dbError) throw dbError;
  
      const user = {
        id: userId,
        name,
        email,
        phone,
        role: 'User',
        department: 'General',
        avatar: ''
      };
  
      localStorage.setItem('rms_user', JSON.stringify(user));
      setCurrentUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('rms_user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        register,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
