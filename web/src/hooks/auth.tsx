import React, { createContext, useCallback, useState, useContext } from "react";
import api from '../services/api'

interface ISignInCredentials {
  username: string;
  password: string;
};

interface IUser {
  id: string;
  username: string;
  accountId: string;
}

interface IAuthState {
  token: string;
  user: IUser;
};

interface IAuthContent {
  user: IUser;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): void;
};

const AuthContent = createContext<IAuthContent>({} as IAuthContent);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@AppCash:token');
    const user = localStorage.getItem('@AppCash:user');

    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ username, password }: ISignInCredentials) => {
    const response = await api.post('/users/session', {
      username,
      password
    });

    const { token, user } = response.data;

    localStorage.setItem('@AppCash:token', token);
    localStorage.setItem('@AppCash:user', JSON.stringify(user));

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const updateUser = useCallback(async (user: IUser) => {
    localStorage.setItem('@AppCash:user', JSON.stringify(user));

    setData({
      token: data.token,
      user
    })
  }, [setData, data.token]);

  const signOut = useCallback(() => {
    localStorage.removeItem('@AppCash:token');
    localStorage.removeItem('@AppCash:user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContent.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
      {children}
    </AuthContent.Provider>
  );
};

export default function useAuth(): IAuthContent {
  const context = useContext(AuthContent);

  if (!context)
    throw new Error('useAuth must be used within an AuthProvider');

  return context;
};