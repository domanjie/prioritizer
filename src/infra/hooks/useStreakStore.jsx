import { create } from "zustand"

const useStreakStore = create((set) => ({
  streak: 0,
  setStreak: (streak) => {
    set(() => ({ streak: streak }))
  },
}))
export default useStreakStore
