import "./App.css"
import TaskQueue from "./taskQueue/TaskQueue.jsx"
import CurrentTask from "./currentTask/CurrentTask.jsx"
import CompletedTasks from "./completedTask/CompletedTasks.jsx"
import NewTask from "./newTask/newTask.jsx"
import { QueryClientProvider } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
const client = new QueryClient({
  defaultOptions: {
    queries: { networkMode: "always" },
    mutations: { networkMode: "always" },
  },
})
function App() {
  return (
    <QueryClientProvider client={client}>
      <section className="main">
        <CurrentTask />
        <TaskQueue />
        <CompletedTasks />
        <NewTask />
      </section>
    </QueryClientProvider>
  )
}
export default App
