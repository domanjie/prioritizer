import { useEffect, useState } from "react"
import { Target, Hourglass, GreenTick } from "../Icons"
import Section from "../Section"
import "./CurrentTask.css"
import { Begin, PauseIco } from "../Icons"
import { pickHex } from "../newTask/rangeInput/RangeInput"
import { useCompletedTaskStore } from "../infra/hooks/useCompletedTaskStore"
import { TimeDisplay } from "../taskQueue/QueueCard"
import { useTaskStore } from "../infra/hooks/useTaskStore"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { a } from "../infra/axios"
import Timer from "../infra/Timer"

const CurrentTask = () => {
  const queryClient = useQueryClient()
  const [streak, setStreak] = useState(0)
  const [currentTask, setCurrentTask] = useState(getStoredTask)
  const [timeLeft, setTimeLeft] = useState(getStoredTimeLeft) //(getStoredTimeLeft)
  const [isPaused, setIsPaused] = useState(true)
  const { tasks } = useTaskStore()
  const { addCompletedTask } = useCompletedTaskStore()
  const nextTask = tasks?.[0]

  // set streak to zero if no next task or current task time has elapsed
  if (streak) {
    timeLeft || setStreak(0)
  }
  const pauseTimer = () => {
    currentTask.timer.stop()
    setIsPaused(true)
  }
  const resumeTimer = () => {
    currentTask.timer.start()
    setIsPaused(false)
  }

  useEffect(() => {
    if (!currentTask) {
      return
    }
    let id = setInterval(() => {
      setTimeLeft(currentTask.timer.getTime() / 1000)
    }, 100)
    const handleBeforeunload = () => {
      pauseTimer()
      localStorage.setItem("currentTask", JSON.stringify(currentTask))
    }
    window.addEventListener("beforeunload", handleBeforeunload)
    return () => {
      clearInterval(id)
      window.removeEventListener("beforeunload", handleBeforeunload)
    }
  }, [currentTask])

  const startNextTask = async () => {
    if (!nextTask) {
      setCurrentTask(null)
    }
    await a.delete(`api/v1/task/${nextTask._id}`)
    queryClient.invalidateQueries("tasks")
    const task = { ...nextTask, timer: new Timer(nextTask.time * 1000) }
    setCurrentTask(task)
    task.timer.start()
    setIsPaused(false)
  }
  const completeTask = async () => {
    addCompletedTask(currentTask)
    await startNextTask()
    setStreak((streak) => streak + 1)
  }

  const [hr, min, sec] = convertSecs(timeLeft)
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
      {currentTask ? (
        <>
          <button
            onClick={pauseTimer}
            className={`cts-begin-btn  ${isPaused && "inactive"}`}
          >
            <PauseIco></PauseIco>
          </button>
          <button
            onClick={resumeTimer}
            className={`cts-begin-btn  ${!isPaused && "inactive"}`}
          >
            <Begin></Begin>
          </button>
        </>
      ) : (
        <button
          className="cts-begin-btn"
          style={{ opacity: nextTask ? "1" : "0.6" }}
          onClick={startNextTask}
        >
          <Begin></Begin>
        </button>
      )}

      {currentTask ? (
        <div className="cts-div">
          <p className="queue-card-title">{currentTask.taskName}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "6px",
            }}
          >
            <Hourglass /> <TimeDisplay time={currentTask.time} />
          </div>
          <div className="time-input-div">
            <div className="time-input-div-div">
              <div className="time-input-div-input">{hr.charAt(0)}</div>
              <div className="time-input-div-input">{hr.charAt(1)}</div>h
            </div>
            <div className="time-input-div-div">
              <div className="time-input-div-input">{min.charAt(0)}</div>
              <div className="time-input-div-input">{min.charAt(1)}</div>m
            </div>
            <div className="time-input-div-div">
              <div className="time-input-div-input">{sec.charAt(0)}</div>
              <div className="time-input-div-input">{sec.charAt(1)}</div>s
            </div>
            <Streak
              streak={streak}
              percentTimeLeft={(timeLeft / currentTask.time) * 100}
            ></Streak>
          </div>

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

const convertSecs = (secIn) => {
  let hr = parseInt(secIn / 3600, 10)
  if (hr < 10) hr = "0" + hr
  let min = parseInt((secIn % 3600) / 60, 10)
  if (min < 10) min = "0" + min
  let sec = parseInt(secIn % 60, 10)
  if (sec < 10) sec = "0" + sec
  return [hr + "", min + "", sec + ""]
}
const getStoredTask = () => {
  const storedTask = JSON.parse(localStorage.getItem("currentTask"))
  const timer = storedTask.timer
  Object.setPrototypeOf(timer, Timer.prototype)
  return { ...storedTask, timer: timer }
}
const getStoredTimeLeft = () => {
  return getStoredTask().timer.getTime() / 1000
}

const Streak = ({ streak, percentTimeLeft }) => {
  return (
    <section className="streak" title="streak">
      <div className="streak-bar">
        <div
          className="streak-bar-ind"
          style={{
            height: `${percentTimeLeft}%`,
          }}
        >
          <div className="streak-bar-ind-bg" />
        </div>
      </div>
      <div>x{streak}</div>
    </section>
  )
}
