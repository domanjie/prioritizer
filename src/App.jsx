import "./App.css"
import TaskQueue from "./taskQueue/TaskQueue.jsx"
import CurrentTask from "./currentTask/CurrentTask.jsx"
import CompletedTasks from "./completedTask/CompletedTasks.jsx"
import NewTask from "./newTask/newTask.jsx"
function App() {
  return (
    <section className="main">
      <CurrentTask />
      <TaskQueue />
      <CompletedTasks />
      <NewTask />
    </section>
  )
}
export default App
