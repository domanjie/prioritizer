import Section from "../Section"
import { QueueIcon } from "../Icons"
import "./TaskQueue.css"
import QueueCard from "./QueueCard"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useQuery } from "@tanstack/react-query"
import { useTaskStore } from "../infra/hooks/useTaskStore"
import useAuthStore from "../infra/hooks/useAuthStore"
import { useEffect } from "react"
import { useAxios } from "../infra/hooks/useAxios"
const TaskQueue = () => {
  const [parent] = useAutoAnimate()
  const { tasks, setTasks } = useTaskStore()
  const { isSignedIn } = useAuthStore()
  const a = useAxios()
  const tasksQuery = useQuery(["tasks"], {
    queryFn: async () => {
      const response = await a.get("/api/v1/task")
      return response.data
    },
  })
  useEffect(() => {
    if (isSignedIn) {
      setTasks(tasksQuery.data || [])
    }
  }, [tasksQuery.data])

  return (
    <Section
      className={"task-queue-section"}
      TitleIco={<QueueIcon />}
      title={"task queue "}
    >
      <>
        {tasks?.length ? (
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
            ref={parent}
          >
            {tasks?.map((task) => (
              <QueueCard key={task.createdAt} {...task} />
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
