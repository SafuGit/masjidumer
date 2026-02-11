"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, getIdTokenResult, User } from 'firebase/auth';
import { app } from './firebase.init';

type UserRole = 'super-admin' | 'user';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  loading: boolean;
  isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: 'user',
  loading: true,
  isSuperAdmin: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          const tokenResult = await getIdTokenResult(user);
          const userRole = (tokenResult.claims.role as UserRole) || 'user';
          setRole(userRole);

          const idToken = await user.getIdToken();
          await fetch('/api/auth/init-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
          });
        } catch (error) {
          console.error('Error getting user role:', error);
          setRole('user');
        }
      } else {
        setRole('user');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isSuperAdmin = role === 'super-admin';

  return (
    <AuthContext.Provider value={{ user, role, loading, isSuperAdmin }}>
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
