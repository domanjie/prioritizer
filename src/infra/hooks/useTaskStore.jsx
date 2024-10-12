import { create } from "zustand"

export const useTaskStore = create((set) => ({
  tasks: null,
  setTasks: (tasks) => set((state) => ({ tasks: tasks })),
}))
