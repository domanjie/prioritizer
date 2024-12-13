import { useEffect, useState } from "react"
import { useCurrentTaskStore, useTaskStore } from "../infra/hooks/useTaskStore"
import useStreakStore from "../infra/hooks/useStreakStore"

const TimerDisp$Streak = ({ isPaused, setSoundAlarm }) => {
  const [timeLeft, setTimeLeft] = useState(0)
  const { streak, setStreak } = useStreakStore()
  const { currentTask } = useCurrentTaskStore()

  useEffect(() => {
    if (!currentTask) return
    if (isPaused) {
      setTimeLeft(currentTask.timer.getTimeLeft() / 1000)
      return
    }
    const intervalId = setInterval(() => {
      const timeLeft = currentTask.timer.getTimeLeft()
      if (timeLeft === 0) {
        setSoundAlarm(true)
        if (streak) setStreak(0)
        clearInterval(intervalId)
      }
      setTimeLeft(timeLeft / 1000)
    }, 100)
    return () => clearInterval(intervalId)
  }, [currentTask, isPaused])
  const [hr, min, sec] = convertSecs(timeLeft)
  return (
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
  )
}

export default TimerDisp$Streak

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

const convertSecs = (secIn) => {
  let hr = parseInt(secIn / 3600, 10)
  if (hr < 10) hr = "0" + hr
  let min = parseInt((secIn % 3600) / 60, 10)
  if (min < 10) min = "0" + min
  let sec = parseInt(secIn % 60, 10)
  if (sec < 10) sec = "0" + sec
  return [hr + "", min + "", sec + ""]
}
