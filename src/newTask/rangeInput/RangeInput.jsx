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

export function pickHex(weight) {
  const color1 = [255, 71, 76]
  const color2 = [144, 238, 144]
  var w1 = weight
  var w2 = 1 - w1
  var rgb = [
    Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2),
  ]
  return rgb
}
