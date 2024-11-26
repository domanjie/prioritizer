import { useEffect, useState } from "react"
import { Target, Hourglass, GreenTick } from "../Icons"
import Section from "../Section"
import "./CurrentTask.css"
import { pickHex } from "../newTask/rangeInput/RangeInput"
import { useCompletedTaskStore } from "../infra/hooks/useCompletedTaskStore"
import { TimeDisplay } from "../taskQueue/QueueCard"
import { useCurrentTaskStore, useTaskStore } from "../infra/hooks/useTaskStore"
import { useQueryClient } from "@tanstack/react-query"
import Timer from "../infra/Timer"
import useAuthStore from "../infra/hooks/useAuthStore"
import { useAxios } from "../infra/hooks/useAxios"
import useStreakStore from "../infra/hooks/useStreakStore"
import { CurrentTaskControls } from "./CurrentTaskControls"
import TimerDisp$Streak from "./TimerDisp$Streak"

const CurrentTask = () => {
  const queryClient = useQueryClient()
  const { streak, setStreak } = useStreakStore()
  const { currentTask, setCurrentTask } = useCurrentTaskStore()
  const [isPaused, setIsPaused] = useState(true)
  const { removeHighestPriorityTask, peek } = useTaskStore()
  const { addCompletedTask } = useCompletedTaskStore()
  const { isSignedIn } = useAuthStore()
  const nextTask = peek()
  const a = useAxios()

  useEffect(() => {
    const getCurrentTask = async () => {
      if (isSignedIn) {
        const response = await a.get("/api/v1/current")
        if (!response.data) {
          setCurrentTask(null)
          return
        }
        const task = response.data
        Object.setPrototypeOf(task.timer, Timer.prototype)
        setCurrentTask(task)
        setIsPaused(!task.timer.isRunning)
      }
    }
    getCurrentTask()
  }, [isSignedIn])

  useEffect(() => {
    if (currentTask && isSignedIn) {
      const intervalId = setInterval(() => {
        const clone = structuredClone(currentTask)

        Object.setPrototypeOf(clone.timer, Timer.prototype)
        clone.timer.stop()
        a.put("/api/v1/current/", clone)
      }, 5000)
      return () => {
        clearInterval(intervalId)
      }
    }
  }, [currentTask])

  const startNextTask = async () => {
    if (!nextTask) {
      setCurrentTask(null)
      return
    }
    if (isSignedIn) {
      await a.delete(`api/v1/task/${nextTask._id}`)
      queryClient.invalidateQueries("tasks")
    } else removeHighestPriorityTask()

    const task = { ...nextTask, timer: new Timer(nextTask.time * 1000) }
    setCurrentTask(task)
    task.timer.start()
    setIsPaused(false)
  }
  const completeTask = async () => {
    addCompletedTask(currentTask)
    await startNextTask()
    setStreak(streak + 1)
  }

  return (
    <Section
      className={"current-task-section"}
      TitleIco={
        <Target
          style={{
            color: currentTask
              ? "rgba(" + pickHex(currentTask.priority / 100).join(",") + ")"
              : "gray",
          }}
        />
      }
      title={"current task"}
    >
      <CurrentTaskControls
        setIsPaused={setIsPaused}
        isPaused={isPaused}
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
          <TimerDisp$Streak></TimerDisp$Streak>
          <button onClick={completeTask} className="current-task-section-btn">
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
