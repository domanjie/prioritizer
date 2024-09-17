import { useEffect, useRef, useState } from "react"
import { Target, Hourglass, GreenTick } from "../Icons"
import Section from "../Section"
import "./CurrentTask.css"
const CurrentTask = () => {
  let [time, setTimeLeft] = useState(7200)
  const ref1 = useRef()
  useEffect(() => {
    const id = setInterval(function () {
      setTimeLeft((t) => t - 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const [hr, min, sec] = convertSecs(time)

  return (
    <Section
      className={"current-task-section"}
      TitleIco={<Target />}
      title={"current task"}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          paddingTop: "20px",
          height: "90%",
        }}
      >
        <p className="queue-card-title">
          Build A Webscraper for movies.mod Website
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "6px",
          }}
        >
          <Hourglass /> <p>30 min</p>
        </div>
        <div className="timer-div">
          <div className="timer-div-div">
            <div className="timer-div-input">{hr.charAt(0)}</div>
            <div className="timer-div-input">{hr.charAt(1)}</div>h
          </div>
          <div className="timer-div-div">
            <div className="timer-div-input">{min.charAt(0)}</div>
            <div className="timer-div-input">{min.charAt(1)}</div>m
          </div>
          <div className="timer-div-div">
            <div className="timer-div-input">{sec.charAt(0)}</div>
            <div className="timer-div-input">{sec.charAt(1)}</div>s
          </div>
        </div>
        <button className="current-task-section-btn">
          Task Completed <GreenTick></GreenTick>
        </button>
      </div>
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

const getMin = (sec) => {
  return parseInt(sec / 60, 10)
}
const getSec = (sec) => {
  return parseInt(sec % 60, 10)
}
