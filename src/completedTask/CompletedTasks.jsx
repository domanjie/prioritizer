import { GreenTick } from "../Icons"
import Section from "../Section"
import { Hourglass } from "../Icons"
const CompletedTasks = () => {
  return (
    <Section
      className={"completed-task-section"}
      TitleIco={<GreenTick />}
      title={"Completed tasks"}
    >
      {/* <CompletedTaskCard />
      <CompletedTaskCard />
      <CompletedTaskCard /> */}
    </Section>
  )
}
export default CompletedTasks

const CompletedTaskCard = () => {
  return (
    <div className="queue-card">
      <span className="queue-card-title">
        Build A Webscraper for movies.mod Website
      </span>
      <div style={{ display: "inline", marginLeft: "10px" }}>
        <Hourglass /> <span>30 min</span>
      </div>
      <div>
        <p>
          Completed in: <span>30 min</span>
        </p>
      </div>
    </div>
  )
}
