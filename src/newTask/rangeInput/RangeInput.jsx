const RangeInput = ({ handleChange, inputs }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
      <div className="range-input-background">
        <input
          name="priority"
          className="range-input"
          type="range"
          onChange={handleChange}
          min="1"
          max="100"
          style={{
            backgroundImage: getLinearGradientCSS(
              inputs["priority"] / 100,
              "rgba(0,0,0,0)",
              "#2b2b29"
            ),
          }}
          value={inputs["priority"]}
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
        <div className="range-monitor">{inputs["priority"]}</div>
      </div>
    </div>
  )
}
export default RangeInput

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
