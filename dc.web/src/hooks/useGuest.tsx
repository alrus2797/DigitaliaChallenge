import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { GuestInfo } from "../types/GuestInfo";

const GuestContext = createContext({
  guest: null,
  saveGuest: (data: GuestInfo) => {},
} as {
  guest: GuestInfo | null;
  saveGuest: (data: GuestInfo) => void;
});

export const GuestProvider = ({ children }: PropsWithChildren) => {
  const { storedValue: guest, setValue: setGuest } = useLocalStorage<GuestInfo>(
    "guest",
    null
  );

  const saveGuest = async (data: GuestInfo) => {
    setGuest(data);
  };


  const value = useMemo(
    () => ({
      guest,
      saveGuest
    }),
    [guest]
  );
  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
};

export const useGuest = () => {
  return useContext(GuestContext);
};
