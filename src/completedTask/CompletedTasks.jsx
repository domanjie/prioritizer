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
  console.log(completedTasks)
  return (
    <Section
      className={"completed-task-section"}
      TitleIco={<GreenTick />}
      title={"Completed tasks"}
    >
      <div className="completed-task-section-div" ref={parent}>
        {completedTasks.length ? (
          completedTasks.map((task) => (
            <CompletedTaskCard key={task._id} {...task} />
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
    <div
      className="card"
      style={{ display: "flex", flexDirection: "column", rowGap: "8px" }}
    >
      <div className="queue-card-title">{taskName}</div>
      <div
        style={{
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          rowGap: "2px",
        }}
      >
        <Hourglass style={{ height: "11px" }} />{" "}
        <TimeDisplay time={time}></TimeDisplay>
      </div>
      <div
        style={{
          fontSize: "14px",
        }}
      >
        Completed in: <span>30 min</span>
      </div>
    </div>
  )
}
