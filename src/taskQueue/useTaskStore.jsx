import { useCurrentTaskStore } from "../currentTask/useCurrentTaskStore"
import BucketPriorityQueue from "../infra/BucketQueue"
import { create } from "zustand"

export const useTaskStore = create((set) => ({
  tasks: new BucketPriorityQueue(100),
  addTask: (val, priority) =>
    set((state) => {
      let newState = Object.assign(
        Object.create(Object.getPrototypeOf(state.tasks)),
        state.tasks
      )
      newState.insert(val, priority)
      return { tasks: newState }
    }),
  pool: () => {
    set((state) => {
      let newState = Object.assign(
        Object.create(Object.getPrototypeOf(state.tasks)),
        state.tasks
      )
      newState.pool()
      return { tasks: newState }
    })
  },
}))
