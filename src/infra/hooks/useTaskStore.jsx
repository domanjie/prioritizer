import { create } from "zustand"

export const useTaskStore = create((set, get) => ({
  tasks: [],
  setTasks: (tasks) => set((state) => ({ tasks: tasks })),
  addTask: (newTask) =>
    set((state) => {
      return {
        tasks: [...state.tasks, newTask].sort((a, b) => {
          return b.priority - a.priority
        }),
      }
    }),
  removeHighestPriorityTask: () => {
    set((state) => {
      state.tasks.shift()
      return {
        tasks: [...state.tasks],
      }
    })
  },
  peek: () => {
    return get().tasks[0]
  },
}))

export const useCurrentTaskStore = create((set) => ({
  currentTask: null,
  setCurrentTask: (task) => {
    set(() => ({ currentTask: task }))
  },
}))
