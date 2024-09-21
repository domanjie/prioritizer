import { GreenTick } from "../Icons"
import Section from "../Section"
import { Hourglass } from "../Icons"
import "./CompletedTask.css"
import { useCompletedTaskStore } from "../infra/hooks/useCompletedTaskStore"
import { TimeDisplay } from "../taskQueue/QueueCard"

const CompletedTasks = () => {
  const { completedTasks } = useCompletedTaskStore()
  console.log(completedTasks)
  return (
    <Section
      className={"completed-task-section"}
      TitleIco={<GreenTick />}
      title={"Completed tasks"}
    >
      {completedTasks.length ? (
        completedTasks.map((task) => <CompletedTaskCard />)
      ) : (
        <div className="fallback-div">Completed Tasks will appear here</div>
      )}
    </Section>
  )
}
export default CompletedTasks

const CompletedTaskCard = () => {
  return (
    <div
      className="card"
      style={{ display: "flex", flexDirection: "column", rowGap: "8px" }}
    >
      <div className="queue-card-title">Build A Webscraper for movies.mod</div>
      <div
        style={{
          fontSize: "14px",
        }}
      >
        <Hourglass style={{ height: "11px" }} />{" "}
        <TimeDisplay time={30}></TimeDisplay>
      </div>
      <div
        className=""
        style={{
          fontSize: "14px",
        }}
      >
        Completed in: <span>30 min</span>
      </div>
    </div>
  )
}
