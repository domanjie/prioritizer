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

const CurrentTask = () => {
  const queryClient = useQueryClient()

  const { currentTask, setCurrentTask, isPaused, setIsPaused } =
    useCurrentTask()
  const { tasks } = useTaskStore()
  const { addCompletedTask } = useCompletedTaskStore()
  const nextTask = tasks?.[0]
  const startNextTask = async () => {
    if (!nextTask) {
      setCurrentTask(null)
    }
    console.log(nextTask)
    await a.delete(`api/v1/task/${nextTask._id}`)
    setCurrentTask({ ...nextTask, timeLeft: nextTask.time })
    queryClient.invalidateQueries("tasks")
    setIsPaused(false)
  }
  const completeTask = () => {
    addCompletedTask(currentTask)
    startNextTask()
  }
  const [hr, min, sec] = convertSecs(currentTask?.timeLeft)

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
            onClick={() => setIsPaused(true)}
            className={`cts-begin-btn  ${isPaused && "inactive"}`}
          >
            <PauseIco></PauseIco>
          </button>
          <button
            onClick={() => setIsPaused(false)}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
            height: "90%",
          }}
        >
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
const useCurrentTask = () => {
  const [currentTask, setCurrentTask] = useState(getStoredTask)
  const [isPaused, setIsPaused] = useState(true)

  useEffect(() => {
    if (isPaused || !currentTask) return
    const id = setInterval(() => {
      setCurrentTask((prevTask) => {
        const timeLeft = prevTask.timeLeft
        return { ...prevTask, timeLeft: timeLeft > 0 ? timeLeft - 1 : 0 }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [currentTask, isPaused])

  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.setItem("currentTask", JSON.stringify(currentTask))
    }
  })
  return { currentTask, setCurrentTask, isPaused, setIsPaused }
}
const getStoredTask = () => {
  return JSON.parse(localStorage.getItem("currentTask"))
}
