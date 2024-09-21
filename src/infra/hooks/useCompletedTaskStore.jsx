import { create } from "zustand"

export const useCompletedTaskStore = create((set) => ({
  completedTasks: [],
  addCompletedTask: (newTask) => {
    console.log(newTask)
    set((state) => ({
      completedTasks: [newTask, ...state.completedTasks],
    }))
  },
}))
