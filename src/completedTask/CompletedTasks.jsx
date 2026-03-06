import "./CompletedTask.css"
import Section from "../Section"
import { GreenTick, Hourglass } from "../Icons"
import {
  useCompletedTaskStore,
  useAuthStore,
  useAxios,
} from "../infra/customHooks"
import { TimeDisplay } from "../taskQueue/QueueCard"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
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
  const { completedTasks, setCompletedTasks } = useCompletedTaskStore()
  const { isSignedIn } = useAuthStore()
  const a = useAxios()
  const { endMs, startMs } = getTodayRange()
  const completedTaskQuery = useQuery(["completedTask"], {
    queryFn: async () => {
      const response = await a.get(
        `/api/v1/completed-task?start=${startMs}&end=${endMs}`
      )
      return response.data
    },
  })
  useEffect(() => {
    if (isSignedIn) {
      setCompletedTasks(completedTaskQuery.data || [])
    }
  }, [completedTaskQuery.data, isSignedIn])
  const [parent] = useAutoAnimate()
  return (
    <div className='completed-task-section-div' ref={parent}>
      {completedTasks.length ? (
        completedTasks.map((task) => (
          <CompletedTaskCard key={task._id || task.createdAt} {...task} />
        ))
      ) : (
        <div className='fallback-div'>Completed Tasks will appear here</div>
      )}
    </div>
  )
}
const CompletedTaskCard = ({ taskName, time, timerState }) => {
  return (
    <div className='card'>
      <div className='card-title'>{taskName}</div>
      <div className='card-div' style={{ margin: "8px 0px" }}>
        <Hourglass /> <TimeDisplay time={time}></TimeDisplay>
      </div>
      <div style={{ display: "flex", columnGap: "4px" }}>
        completed in:
        <span>
          <TimeDisplay time={timerState?.timeElapsed || 0}></TimeDisplay>
        </span>
      </div>
    </div>
  )
}

export const getTodayRange = () => {
  const start = new Date()
  start.setHours(0, 0, 0, 0) // Set to midnight today local time
  const startMs = start.getTime()

  const end = new Date()
  end.setHours(23, 59, 59, 999) // Set to the very end of today local time
  const endMs = end.getTime()

  return { startMs, endMs }
}
