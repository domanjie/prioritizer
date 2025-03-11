import { create } from "zustand"

const useStreakStore = create((set) => ({
  streak: 0,
  setStreak: (streak) => {
    set((state) => ({ ...state, streak: streak }))
  },
}))
export default useStreakStore
