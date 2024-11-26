import { create } from "zustand"

const useAuthStore = create((set) => ({
  isSignedIn: true,
  setIsSignedIn: (bool) => {
    set({
      isSignedIn: bool,
    })
  },
}))

export default useAuthStore
