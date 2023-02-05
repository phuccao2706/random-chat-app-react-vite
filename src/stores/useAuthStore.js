import { create } from "zustand";

const useAuthStore = create((set) => ({
  isSignedIn: false,
  currentUser: null,
  setIsSignedIn: (isSignedIn) => set(() => ({ isSignedIn })),
  setCurrentUser: (currentUser) => set(() => ({ currentUser })),
}));

export default useAuthStore;
