const RangeInput = ({ inputName, style, handleChange, value }) => {
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
          style={style}
          value={value}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>{inputName}</p>
        <div className="range-monitor">{value}</div>
      </div>
    </div>
  )
}
export default RangeInput
