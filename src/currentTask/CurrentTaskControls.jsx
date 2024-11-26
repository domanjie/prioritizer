import "./CurrentTask.css"
import { Begin, PauseIco } from "../Icons"
import { useCurrentTaskStore, useTaskStore } from "../infra/hooks/useTaskStore"

export const CurrentTaskControls = ({
  isPaused,
  setIsPaused,
  startNextTask,
}) => {
  const { peek } = useTaskStore()
  const { currentTask } = useCurrentTaskStore()
  const nextTask = peek()
  const pauseTimer = () => {
    currentTask.timer.stop()
    setIsPaused(true)
  }
  const resumeTimer = () => {
    currentTask.timer.start()
    setIsPaused(false)
  }
  return (
    <>
      {currentTask ? (
        <>
          <button
            onClick={pauseTimer}
            className={`ctc-btn  ${isPaused && "inactive"}`}
          >
            <PauseIco></PauseIco>
          </button>
          <button
            onClick={resumeTimer}
            className={`ctc-btn  ${!isPaused && "inactive"}`}
          >
            <Begin></Begin>
          </button>
        </>
      ) : (
        <button
          className="ctc-btn"
          style={{ opacity: nextTask ? "1" : "0.6" }}
          onClick={startNextTask}
        >
          <Begin></Begin>
        </button>
      )}
    </>
  )
}
