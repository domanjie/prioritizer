import { create } from "zustand"

export const useCompletedTaskStore = create((set) => ({
  completedTasks: [],
  addCompletedTask: (newTask) => {
    set((state) => ({
      completedTasks: [newTask, ...state.completedTasks],
    }))
  },
}))

// window.addEventListener("unload")

function getStoredCompletedTasks() {
  return JSON.parse(localStorage.getItem("completedTasks"))
}
