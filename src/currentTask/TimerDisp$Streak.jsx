import { useEffect, useState } from "react"
import {
  useCurrentTaskStore,
  useStreakStore,
  useSettingsStore,
} from "../infra/customHooks"
const TimerDisp$Streak = ({ isPaused, setSoundAlarm }) => {
  const [timeLeft, setTimeLeft] = useState(0)
  const { streak, setStreak } = useStreakStore()
  const { currentTask } = useCurrentTaskStore()
  const { settings } = useSettingsStore()
  const { allowNotification } = settings
  useEffect(() => {
    if (!currentTask) return
    if (isPaused) {
      setTimeLeft(currentTask.timer.getTimeLeft() / 1000)
      return
    }
    const notifier = setInterval(() => {
      if (allowNotification) {
        const timeLeft = currentTask.timer.getTimeLeft()
        const taskDuration = currentTask.timer.getDuration()
        notifyIfAppropriate(
          Math.round(timeLeft / 1000),
          taskDuration,
          currentTask.taskName,
          notifier
        )
      }
    }, 1000)
    const intervalId = setInterval(() => {
      const timeLeft = currentTask.timer.getTimeLeft()
      setTimeLeft(timeLeft / 1000)
      if (timeLeft === 0) {
        if (streak) setStreak(0)
        setSoundAlarm(true)
        clearInterval(intervalId)
      }
    }, 100)
    return () => {
      clearInterval(intervalId)
      clearInterval(notifier)
    }
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

const notifyIfAppropriate = (
  timeLeft,
  taskDuration,
  taskName,
  parentInterval
) => {
  switch (timeLeft) {
    case timeLeft > 3600 && taskDuration / 2:
      {
        new Notification(taskName, {
          body: "You have used 50% of the time set out for this task",
          icon: "/favicon.svg",
        })
      }
      break
    case timeLeft > 3600 && taskDuration / 4:
      {
        new Notification(taskName, {
          body: "You have used 25% of the time set out for this task",
          icon: "/favicon.svg",
        })
      }
      break
    case 3600:
      {
        new Notification(taskName, {
          body: "You have  1 hour  left  for this task",
          icon: "/favicon.svg",
        })
      }
      break
    case 1800:
      {
        new Notification(taskName, {
          body: "You have 30 minutes left for this task",
          icon: "/favicon.svg",
        })
      }
      break
    case 900:
      {
        new Notification(taskName, {
          body: "You have 15 minutes left for this task",
          icon: "/favicon.svg",
        })
      }
      break
    case 600:
      {
        new Notification(taskName, {
          body: "You have 10  min left for this task",
          icon: "/favicon.svg",
        })
      }
      break
    case 300:
      {
        new Notification(taskName, {
          body: "You have 5 minute left for this task",
          icon: "/favicon.svg",
        })
      }
      break
    case 60:
      {
        new Notification(taskName, {
          body: "You have 1 minute left for this task",
          icon: "/favicon.svg",
        })
      }
      break

    case 0:
      {
        new Notification(taskName, {
          body: "You have elapsed time set out for this task",
          icon: "/favicon.svg",
        })
        clearInterval(parentInterval)
      }
      break
  }
}
