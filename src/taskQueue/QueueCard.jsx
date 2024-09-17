import { useState } from "react"
import { EllipsisVertical, Hourglass } from "../Icons"
import DDMenu from "./DDMenu"
const QueueCard = ({ taskName, priority, timer }) => {
  const hr = parseInt(timer / 3600)
  const min = parseInt((timer % 3600) / 60)
  const sec = timer % 60
  const [showDDMenu, setShowDDMenu] = useState(false)
  return (
    <div className="queue-card">
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
        <Hourglass />
        <div
          style={{
            display: "flex",
            columnGap: "3px",
            fontSize: "14px",
          }}
        >
          {hr ? (
            <>
              <p>{hr}hrs</p>
            </>
          ) : (
            ""
          )}
          {min ? (
            <>
              .<p>{min}min</p>
            </>
          ) : (
            ""
          )}
          {sec ? (
            <>
              .<p>{sec}sec</p>
            </>
          ) : (
            ""
          )}
        </div>
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
