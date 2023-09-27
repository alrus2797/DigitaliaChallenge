import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { UserInfo } from "../types/UserInfo";

const AuthContext = createContext({
  user: null,
  saveUser: (data: UserInfo) => {},
  logout: () => {},
} as {
  user: UserInfo | null;
  saveUser: (data: UserInfo) => void;
  logout: () => void;
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { storedValue: user, setValue: setUser } = useLocalStorage<UserInfo>(
    "user",
    null
  );
  const navigate = useNavigate();

  const saveUser = async (data: UserInfo) => {
    setUser(data);
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      saveUser: saveUser,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
