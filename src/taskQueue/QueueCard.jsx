import { useState } from "react"
import { EllipsisVertical, Hourglass } from "../Icons"
import DDMenu from "./DDMenu"
const QueueCard = ({ taskName, priority, time }) => {
  const [showDDMenu, setShowDDMenu] = useState(false)
  return (
    <div className=" card queue-card">
      <button
        className="ellipsis-btn"
        onClick={(e) => {
          e.stopPropagation()
          setShowDDMenu(!showDDMenu)
        }}
      >
        <EllipsisVertical></EllipsisVertical>
      </button>
      {showDDMenu && (
        <DDMenu setShowDDMenu={setShowDDMenu} showDDMenu={showDDMenu}></DDMenu>
      )}
      <p className="queue-card-title">{taskName}</p>
      <div className="queue-card-div">
        <Hourglass style={{ height: "11px" }} />
        <TimeDisplay time={time} style={{ fontSize: "14px" }} />
      </div>
      <div
        style={{
          width: "100%",
          containerType: "inline-size",
          position: "relative",
          bottom: "-14px",
        }}
      >
        <div
          style={{
            borderRadius: "10px",
            width: `${priority}%`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "5px",
              background: "linear-gradient(to right, #90ee90, #ff474c)",
              borderRadius: "10px",
              overflow: "hidden",
              width: "100cqw",
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default QueueCard

export const TimeDisplay = ({ time: timeInSec, style }) => {
  const hr = parseInt(timeInSec / 3600)
  const min = parseInt((timeInSec % 3600) / 60)
  const sec = timeInSec % 60
  return (
    <div
      style={{
        display: "flex",
        columnGap: "4px",
        ...style,
      }}
    >
      {hr ? (
        <p>
          {hr}
          <span style={{ fontSize: "12px" }}>hrs</span>
        </p>
      ) : (
        ""
      )}
      {min ? (
        <p>
          {min}
          <span style={{ fontSize: "12px" }}>min</span>
        </p>
      ) : (
        ""
      )}
      {sec ? (
        <p>
          {sec}
          <span style={{ fontSize: "12px" }}>sec</span>
        </p>
      ) : (
        ""
      )}
    </div>
  )
}
