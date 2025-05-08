
import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userType: 'consultant' | 'organization' | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
};

type SignUpData = {
  email: string;
  password: string;
  userType: 'consultant' | 'organization';
  firstName?: string;
  lastName?: string;
  organizationName?: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'consultant' | 'organization' | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Fetch the user type when the session changes
          fetchUserType(currentSession.user.id);
        } else {
          setUserType(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserType(currentSession.user.id);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserType = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_types')
        .select('type')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user type:', error);
        return;
      }

      setUserType(data.type as 'consultant' | 'organization');
    } catch (error) {
      console.error('Error in fetchUserType:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });

      // Redirect based on user type after successful login
      if (data.user) {
        const { data: userData } = await supabase
          .from('user_types')
          .select('type')
          .eq('id', data.user.id)
          .single();
        
        if (userData?.type === 'consultant') {
          navigate('/consultant/profile');
        } else {
          navigate('/organization/profile');
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An error occurred during login.",
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      setLoading(true);
      
      let metadata = {};
      
      if (data.userType === 'consultant') {
        metadata = {
          user_type: 'consultant',
          first_name: data.firstName || '',
          last_name: data.lastName || '',
        };
      } else {
        metadata = {
          user_type: 'organization',
          organization_name: data.organizationName || '',
        };
      }
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: metadata,
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Registration successful",
        description: "Please check your email to confirm your account.",
      });

      // Return to login page
      navigate('/login');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      navigate('/');
      
      toast({
        title: "Logout successful",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message || "An error occurred during logout.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        user, 
        userType,
        loading, 
        signIn, 
        signUp, 
        signOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
