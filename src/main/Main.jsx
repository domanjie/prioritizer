import TaskQueue from "../taskQueue/TaskQueue"
import CurrentTask from "../currentTask/CurrentTask"
import CompletedTasks from "../completedTask/CompletedTasks"
import NewTask from "../newTask/NewTask"
export const Main = () => {
  return (
    <section className="main">
      <CurrentTask />
      <TaskQueue />
      <CompletedTasks />
      <NewTask />
    </section>
  )
}
