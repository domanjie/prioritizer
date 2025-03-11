import "./CompletedTask.css"
import Section from "../Section"
import { GreenTick, Hourglass } from "../Icons"
import { useCompletedTaskStore } from "../infra/customHooks"
import { TimeDisplay } from "../taskQueue/QueueCard"
import { useAutoAnimate } from "@formkit/auto-animate/react"

const CompletedTasks = () => {
  return (
    <Section
      className={"completed-task-section"}
      TitleIco={<GreenTick />}
      title={"Completed tasks"}
    >
      <CompletedTasksBody></CompletedTasksBody>
    </Section>
  )
}
export default CompletedTasks

export const CompletedTasksBody = () => {
  const { completedTasks } = useCompletedTaskStore()
  const [parent] = useAutoAnimate()
  return (
    <div className="completed-task-section-div" ref={parent}>
      {completedTasks.length ? (
        completedTasks.map((task) => (
          <CompletedTaskCard key={task._id || task.createdAt} {...task} />
        ))
      ) : (
        <div className="fallback-div">Completed Tasks will appear here</div>
      )}
    </div>
  )
}
const CompletedTaskCard = ({ taskName, time }) => {
  return (
    <div className="card">
      <div className="card-title">{taskName}</div>
      <div className="card-div" style={{ margin: "8px 0px" }}>
        <Hourglass /> <TimeDisplay time={time}></TimeDisplay>
      </div>
      <div>
        completed in: <span>30min</span>
      </div>
    </div>
  )
}
