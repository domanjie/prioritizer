import { GreenTick } from "../Icons"
import Section from "../Section"
import { Hourglass } from "../Icons"
import "./CompletedTask.css"
import { useCompletedTaskStore } from "../infra/hooks/useCompletedTaskStore"
import { TimeDisplay } from "../taskQueue/QueueCard"
import { useAutoAnimate } from "@formkit/auto-animate/react"

const CompletedTasks = () => {
  const { completedTasks } = useCompletedTaskStore()
  const [parent] = useAutoAnimate()
  return (
    <Section
      className={"completed-task-section"}
      TitleIco={<GreenTick />}
      title={"Completed tasks"}
    >
      <div className="completed-task-section-div" ref={parent}>
        {completedTasks.length ? (
          completedTasks.map((task) => (
            <CompletedTaskCard key={task._id || task.createdAt} {...task} />
          ))
        ) : (
          <div className="fallback-div">Completed Tasks will appear here</div>
        )}
      </div>
    </Section>
  )
}
export default CompletedTasks

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
