import { create } from "zustand"

const useAuthStore = create((set) => ({
  isSignedIn: false,
  setIsSignedIn: (bool) => {
    set({
      isSignedIn: bool,
    })
  },
}))

export default useAuthStore
