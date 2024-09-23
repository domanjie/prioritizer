import { useRef, useEffect } from "react"
const SeparatedInput = ({ setInputs }) => {
  const inputRefArr = Array(6)
    .fill()
    .map(() => {
      return useRef()
    })
  useEffect(() => {
    const inputs = inputRefArr.map((inputRef) => inputRef.current)
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("keydown", function (event) {
        if (specialKeys.has(event.key)) {
          return
        }

        event.preventDefault()
        if (!/[0-9]/i.test(event.key)) {
          return false
        }

        if (event.key === "Backspace") {
          inputs[i].value = ""
          if (i !== 0) inputs[i - 1].focus()
        } else if (event.key === "ArrowLeft") {
          if (i !== 0) inputs[i - 1].focus()
        } else if (event.key === "ArrowRight") {
          if (i !== inputs.length - 1) inputs[i + 1].focus()
        } else {
          if (event.keyCode > 47 && event.keyCode < 58) {
            inputs[i].value = event.key
            setInputs((inputs) => ({
              ...inputs,
              [event.target.name]: event.target.value,
            }))
            if (i !== inputs.length - 1) inputs[i + 1].focus()
          }
        }
      })
    }
  }, [])
  const hr = inputRefArr.slice(0, 2)
  const min = inputRefArr.slice(2, 4)
  const sec = inputRefArr.slice(4, 6)

  return (
    <>
      <div className="time-input-div-div">
        {hr.map((ref, index) => (
          <input
            className="time-input-div-input"
            type="text"
            placeholder="0"
            maxLength={1}
            name={`hr${index}`}
            size={1}
            ref={ref}
          />
        ))}
        h
      </div>
      <div className="time-input-div-div">
        {min.map((ref, index) => (
          <input
            className="time-input-div-input"
            type="text"
            placeholder="0"
            maxLength={1}
            name={`min${index}`}
            size={1}
            ref={ref}
          />
        ))}
        m
      </div>
      <div className="time-input-div-div">
        {sec.map((ref, index) => (
          <input
            className="time-input-div-input"
            type="text"
            placeholder="0"
            maxLength={1}
            size={1}
            name={`sec${index}`}
            ref={ref}
          />
        ))}
        s
      </div>
    </>
  )
}
export default SeparatedInput

const specialKeys = new Set([
  "Backspace",
  "Tab",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Enter",
])
