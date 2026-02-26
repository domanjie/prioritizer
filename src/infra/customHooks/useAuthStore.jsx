import { a } from "../axios"
import { create } from "zustand"

const useAuthStore = create((set) => ({
  isSignedIn: null,
  initialize: async () => {
    try {
      // Try to fetch user data if a token exists
      await a.get("/api/v1/task")
      set({ isSignedIn: true })
    } catch {
      set({ isSignedIn: false })
    }
  },
  setIsSignedIn: (bool) => {
    set({
      isSignedIn: bool,
    })
  },
}))

export default useAuthStore
