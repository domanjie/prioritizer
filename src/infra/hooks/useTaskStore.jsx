import BucketPriorityQueue from "../BucketQueue"
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
    let returnVal
    set((state) => {
      let newState = Object.assign(
        Object.create(Object.getPrototypeOf(state.tasks)),
        state.tasks
      )
      returnVal = newState.pool()
      return { tasks: newState }
    })
    return returnVal
  },
}))
