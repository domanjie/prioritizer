import { create } from "zustand"

export const useCurrentTaskStore = create((set) => ({
  currentTask: undefined,
  setCurrentTask: (task) => set(() => task),
}))
