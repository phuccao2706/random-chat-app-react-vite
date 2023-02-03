import { create } from "zustand";

const useAuthStore = create((set) => ({
  isSignedIn: false,
  setIsSignedIn: (isSignedIn) => set(() => ({ isSignedIn })),
}));

export default useAuthStore;
