import { useRef, useEffect } from "react"

const PriorityRange = () => {
  const rangeRef = useRef()
  const rangeMonitor = useRef()
  useEffect(() => {
    initRangeEl(rangeRef.current, rangeMonitor.current)
  }, [])
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
      <div className="range-input-background">
        <input
          name="priority"
          ref={rangeRef}
          className="range-input"
          type="range"
          min="1"
          max="100"
          defaultValue="50"
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>Priority</p>
        <div ref={rangeMonitor} className="range-monitor"></div>
      </div>
    </div>
  )
}
export default PriorityRange

function valueTotalRatio(value, min, max) {
  return ((value - min) / (max - min)).toFixed(2)
}

function getLinearGradientCSS(ratio, leftColor, rightColor) {
  return [
    "-webkit-gradient(",
    "linear, ",
    "left top, ",
    "right top, ",
    "color-stop(" + ratio + ", " + leftColor + "), ",
    "color-stop(" + ratio + ", " + rightColor + ")",
    ")",
  ].join("")
}

function updateRangeEl(rangeEl) {
  let value = rangeEl.value || rangeEl.defaultValue
  var ratio = valueTotalRatio(value, rangeEl.min, rangeEl.max)
  console.log(getLinearGradientCSS(ratio, "rgba(0,0,0,0)", "#2b2b29"))

  rangeEl.style.backgroundImage = getLinearGradientCSS(
    ratio,
    "rgba(0,0,0,0)",
    "#2b2b29"
  )
}

function initRangeEl(rangeInput, monitor) {
  updateRangeEl(rangeInput)
  monitor.textContent = rangeInput.value || rangeInput.defaultValue
  rangeInput.addEventListener("input", function (e) {
    updateRangeEl(e.target)
    monitor.textContent = e.target.value
  })
}
