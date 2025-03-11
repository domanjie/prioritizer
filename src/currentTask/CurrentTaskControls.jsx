import "./CurrentTask.css"
import { Begin, PauseIco, KillAlarmIco } from "../Icons"
import { useCurrentTaskStore, useTaskStore } from "../infra/customHooks"

export const CurrentTaskControls = ({
  soundAlarm,
  setSoundAlarm,
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
            onClick={() => {
              setSoundAlarm(false)
            }}
            className={`ctc-btn   alm-btn ${soundAlarm && "alm-active"}`}
          >
            <KillAlarmIco></KillAlarmIco>
          </button>
          <div className="ctc-btn" />
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
      <></>
    </>
  )
}
