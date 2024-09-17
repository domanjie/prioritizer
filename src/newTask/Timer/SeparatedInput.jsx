import { useRef, useEffect } from "react"
const SeparatedInput = () => {
  const inputRefArr = Array(6)
    .fill()
    .map(() => {
      return useRef()
    })
  useEffect(() => {
    const inputs = inputRefArr.map((inputRef) => inputRef.current)
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("keydown", function (event) {
        if (!(/[0-9]/i.test(event.key) || specialKeys.has(event.key))) {
          event.preventDefault()
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
          if (i === inputs.length - 1 && inputs[i].value !== "") {
            return true
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            inputs[i].value = event.key
            if (i !== inputs.length - 1) inputs[i + 1].focus()
            event.preventDefault()
          } else if (event.keyCode > 64 && event.keyCode < 91) {
            inputs[i].value = String.fromCharCode(event.keyCode)
            if (i !== inputs.length - 1) inputs[i + 1].focus()
            event.preventDefault()
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
      <div className="timer-div-div">
        {hr.map((ref, index) => (
          <input
            className="timer-div-input"
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
      <div className="timer-div-div">
        {min.map((ref, index) => (
          <input
            className="timer-div-input"
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
      <div className="timer-div-div">
        {sec.map((ref, index) => (
          <input
            className="timer-div-input"
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
])
