import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCurrentUser = create(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      removeCurrentUser: () => set({ currentUser: null }),
    }),
    {
      name: "currentUser-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCurrentUser;
