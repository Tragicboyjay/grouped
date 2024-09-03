import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { IUser } from '../interfaces/IUser';


interface AuthContextType {
  user: IUser | null;
  loginUser: (userData: IUser) => void;
  logoutUser: () => void;
  updateUsername: (newUsername: string) => void;
  updateEmail: (newEmail: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginUser = (userData: IUser) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  const updateUsername = (newUsername: string) => {
    if (user) {
      const updatedUser = { ...user, username: newUsername };
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const updateEmail = (newEmail: string) => {
    if (user) {
      const updatedUser = { ...user, email: newEmail };
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
      <AuthContext.Provider value={{ user, loginUser, logoutUser, updateEmail, updateUsername }}>
        {children}
      </AuthContext.Provider>
  );
};
