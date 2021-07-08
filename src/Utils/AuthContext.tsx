import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { IUser } from '../Types';

interface Props {
  children: React.ReactNode;
}

interface IAuth {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthCTX = createContext<IAuth>({
  user: undefined,
  setUser: () => undefined,
  isAuth: false,
  setIsAuth: () => false,
  loading: true,
  setLoading: () => true,
});

export const useAuthCTX = () => {
  return useContext(AuthCTX);
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState<IUser | undefined>();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { success, user: resUser },
        } = await axios.get('/logged_in');

        if (success) {
          setIsAuth(true);
          setUser(resUser);
        } else {
          setIsAuth(false);
          setUser(undefined);
        }
      } catch (e) {
        console.error(e);
        setIsAuth(false);
        setUser(undefined);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  axios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      if (response.data?.unauthorized) {
        // Timeout to allow the component to set/clear its last state before redirecting the unauth user
        setTimeout(() => {
          setIsAuth(false);
          setUser(undefined);
        }, 250);
      }

      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  const value: IAuth = {
    user,
    setUser,
    isAuth,
    setIsAuth,
    loading,
    setLoading,
  };

  return <AuthCTX.Provider value={value}>{children}</AuthCTX.Provider>;
};

export default AuthProvider;
