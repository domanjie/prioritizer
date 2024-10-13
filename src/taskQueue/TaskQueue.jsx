import Section from "../Section"
import { QueueIcon } from "../Icons"
import "./TaskQueue.css"
import QueueCard from "./QueueCard"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { a } from "../infra/axios"
import { useQuery } from "@tanstack/react-query"
import { useTaskStore } from "../infra/hooks/useTaskStore"
const TaskQueue = () => {
  const [parent] = useAutoAnimate()

  const { setTasks } = useTaskStore()
  const tasksQuery = useQuery(["tasks"], {
    queryFn: async () => {
      const response = await a.get("/api/v1/task")
      setTasks(response.data)
      return response.data
    },
  })

  return (
    <Section
      className={"task-queue-section"}
      TitleIco={<QueueIcon />}
      title={"task queue "}
    >
      <>
        {tasksQuery.data?.length ? (
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
            ref={parent}
          >
            {tasksQuery.data?.map((task) => (
              <QueueCard key={task._id} {...task} />
            ))}
          </div>
        ) : (
          <div className="fallback-div">You have no Task in your queue</div>
        )}
      </>
    </Section>
  )
}
export default TaskQueue
