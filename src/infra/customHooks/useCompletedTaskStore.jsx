import { create } from "zustand"

export const useCompletedTaskStore = create((set) => ({
  completedTasks: [],
  setCompletedTasks: (completedTasks) =>
    set(() => ({ completedTasks: completedTasks })),
  addCompletedTask: (newTask) => {
    set((state) => ({
      ...state,
      completedTasks: [newTask, ...state.completedTasks],
    }))
  },
}))
