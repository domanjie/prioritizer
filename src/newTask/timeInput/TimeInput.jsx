import SeparatedInput from "./SeparatedInput"
const TimeInput = ({ setInputs }) => {
  return (
    <div className="time-input">
      <p>Set Time</p>
      <div className="time-input-div">
        <SeparatedInput setInputs={setInputs}></SeparatedInput>
      </div>
    </div>
  )
}
export default TimeInput
