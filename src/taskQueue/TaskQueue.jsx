import "./TaskQueue.css"
import Section from "../Section"
import QueueCard from "./QueueCard"
import { QueueIcon, GreenTick } from "../Icons"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { CompletedTasksBody } from "../completedTask/CompletedTasks"
import {
  useMediaQuery,
  useTaskStore,
  useAuthStore,
  useAxios,
} from "../infra/customHooks"
const TaskQueue = () => {
  const mediaQueryMatches = useMediaQuery("(max-width: 992px)")
  return (
    <>
      {mediaQueryMatches ? (
        <TaskQueue$CompletedTasksComponent></TaskQueue$CompletedTasksComponent>
      ) : (
        <Section
          className={"task-queue-section"}
          TitleIco={<QueueIcon />}
          title={"task queue"}
        >
          <TaskQueueBody />
        </Section>
      )}
    </>
  )
}
export default TaskQueue

const TaskQueueBody = () => {
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
  }, [tasksQuery.data, isSignedIn, setTasks])
  return (
    <>
      {tasks?.length ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
          }}
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
  )
}

const TaskQueue$CompletedTasksComponent = () => {
  const [isTaskQueueActive, setIsTaskQueueActive] = useState(true)
  return (
    <section className="section task-queue-section ">
      <div style={{ display: "flex", columnGap: "4px " }}>
        <button
          onClick={() => setIsTaskQueueActive(true)}
          className={`nav-btn section-title ${isTaskQueueActive && "active"}`}
        >
          <QueueIcon />
          task queue
        </button>
        <button
          onClick={() => {
            setIsTaskQueueActive(false)
          }}
          className={`nav-btn section-title ${!isTaskQueueActive && "active"}`}
        >
          <GreenTick></GreenTick>
          Completed Task
        </button>
      </div>
      <>
        {isTaskQueueActive ? (
          <TaskQueueBody></TaskQueueBody>
        ) : (
          <CompletedTasksBody></CompletedTasksBody>
        )}
      </>
    </section>
  )
}
