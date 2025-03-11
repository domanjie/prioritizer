import { create } from "zustand"

export const useCompletedTaskStore = create((set) => ({
  completedTasks: [],
  addCompletedTask: (newTask) => {
    set((state) => ({
      ...state,
      completedTasks: [newTask, ...state.completedTasks],
    }))
  },
}))
