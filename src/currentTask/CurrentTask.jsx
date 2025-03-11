import "./CurrentTask.css"
import Section from "../Section"
import TimerDisp$Streak from "./TimerDisp$Streak"
import Timer from "../infra/Timer"
import { useEffect, useState } from "react"
import { Target, Hourglass, GreenTick } from "../Icons"
import { TimeDisplay } from "../taskQueue/QueueCard"
import { useQueryClient } from "@tanstack/react-query"
import { CurrentTaskControls } from "./CurrentTaskControls"
import { getColorFromPriority } from "../infra/utils"
import {
  useCurrentTaskStore,
  useTaskStore,
  useCompletedTaskStore,
  useAlarmStore,
  useAxios,
  useStreakStore,
  useAuthStore,
} from "../infra/customHooks"

const CurrentTask = () => {
  const queryClient = useQueryClient()
  const { streak, setStreak } = useStreakStore()
  const { currentTask, setCurrentTask } = useCurrentTaskStore()
  const [isPaused, setIsPaused] = useState(true)
  const { removeHighestPriorityTask, peek } = useTaskStore()
  const { addCompletedTask } = useCompletedTaskStore()
  const { isSignedIn } = useAuthStore()
  const [soundAlarm, setSoundAlarm] = useState(false)
  const nextTask = peek()
  const a = useAxios()
  const { alarm } = useAlarmStore()
  //play/pause alarm audio depending on the soundAlarm state
  useEffect(() => {
    soundAlarm ? alarm.play() : alarm.pause()
    return () => {
      alarm.pause()
    }
  }, [soundAlarm, alarm])

  useEffect(() => {
    //retrieves current task  from  api(if signed in )
    if (isSignedIn) {
      const getCurrentTask = async () => {
        const response = await a.get("/api/v1/current")
        if (!response.data) {
          setCurrentTask(null)
          return
        }
        const task = response.data
        console.log(task)
        task.timer
          ? Object.setPrototypeOf(task.timer, Timer.prototype)
          : (task.timer = new Timer(task.time * 1000))
        setCurrentTask(task)
        setIsPaused(!task.timer.isRunning)
      }
      getCurrentTask()
    }
  }, [isSignedIn])

  //regularly update state of task timer to api if signed in
  useEffect(() => {
    if (currentTask && isSignedIn) {
      const intervalId = setInterval(() => {
        const clonedTimer = { ...currentTask.timer }
        Object.setPrototypeOf(clonedTimer, Timer.prototype)
        // pause timer before sending to api  !important
        clonedTimer.stop(clonedTimer)
        a.patch("/api/v1/current", clonedTimer)
      }, 5000)
      return () => clearInterval(intervalId)
    }
  }, [currentTask])

  const startNextTask = async () => {
    if (!nextTask) {
      setCurrentTask(null)
      setStreak(0)
      return
    }
    if (currentTask && currentTask.timer.getTimeLeft() !== 0)
      setStreak(streak + 1)
    const task = { ...nextTask, timer: new Timer(nextTask.time * 1000) }
    if (isSignedIn) {
      await a.post("/api/v1/current?action=promote", { taskId: task._id })
      queryClient.invalidateQueries("tasks")
    } else removeHighestPriorityTask()
    setCurrentTask(task)
    task.timer.start()
    setIsPaused(false)
  }
  const completeTask = async () => {
    addCompletedTask(currentTask)
    if (isSignedIn) {
      await a.post("/api/v1/current?action=complete")
    }
    await startNextTask()
  }

  return (
    <Section
      className={"current-task-section"}
      TitleIco={
        <Target
          style={{
            color: currentTask
              ? "rgba(" +
                getColorFromPriority(currentTask.priority / 100).join(",") +
                ")"
              : "gray",
          }}
        />
      }
      title={"current task"}
    >
      <CurrentTaskControls
        soundAlarm={soundAlarm}
        setIsPaused={setIsPaused}
        isPaused={isPaused}
        setSoundAlarm={setSoundAlarm}
        startNextTask={startNextTask}
      ></CurrentTaskControls>
      {currentTask ? (
        <div className="cts-div">
          <p className="card-title">{currentTask.taskName}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "6px",
            }}
          >
            <Hourglass /> <TimeDisplay time={currentTask.time} />
          </div>
          <TimerDisp$Streak
            isPaused={isPaused}
            setSoundAlarm={setSoundAlarm}
          ></TimerDisp$Streak>
          <button
            onClick={() => {
              completeTask()
              setSoundAlarm(false)
            }}
            className="current-task-section-btn"
          >
            Task Completed <GreenTick></GreenTick>
          </button>
        </div>
      ) : (
        <div className="fallback-div">Your current Task will appear here</div>
      )}
    </Section>
  )
}
export default CurrentTask
