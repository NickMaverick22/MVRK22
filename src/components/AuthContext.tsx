import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  position: string;
  businessName: string;
  industry: string;
  companySize: string;
  profileComplete: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('mvrk_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - in production, this would be a real authentication endpoint
      const savedUsers = JSON.parse(localStorage.getItem('mvrk_users') || '[]');
      const existingUser = savedUsers.find((u: any) => u.email === email && u.password === password);
      
      if (existingUser) {
        const { password: _, ...userWithoutPassword } = existingUser;
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem('mvrk_user', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const savedUsers = JSON.parse(localStorage.getItem('mvrk_users') || '[]');
      const existingUser = savedUsers.find((u: any) => u.email === email);
      
      if (existingUser) {
        return false; // User already exists
      }

      // Create new user
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        email,
        password,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        position: '',
        businessName: '',
        industry: '',
        companySize: '',
        profileComplete: false,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage (in production, this would be a database)
      savedUsers.push(newUser);
      localStorage.setItem('mvrk_users', JSON.stringify(savedUsers));

      // Set current user (without password)
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('mvrk_user', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('mvrk_user');
  };

  const updateProfile = (profileData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('mvrk_user', JSON.stringify(updatedUser));

      // Update in users array as well
      const savedUsers = JSON.parse(localStorage.getItem('mvrk_users') || '[]');
      const userIndex = savedUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        savedUsers[userIndex] = { ...savedUsers[userIndex], ...profileData };
        localStorage.setItem('mvrk_users', JSON.stringify(savedUsers));
      }
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};