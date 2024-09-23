import "./NewTask.css"
import { EnqueueIcon } from "../Icons"
import Section from "../Section"
import TimeInput from "./timeInput/TimeInput"
import PriorityRange from "./rangeInput/RangeInput"
import { useTaskStore } from "../infra/hooks/useTaskStore"
import { useState } from "react"
const NewTask = () => {
  const defaults = {
    taskName: "",
    priority: 50,
    hr0: 0,
    hr1: 0,
    min0: 0,
    min1: 0,
    sec0: 0,
    sec1: 0,
  }
  const [inputs, setInputs] = useState(defaults)

  const { addTask } = useTaskStore()
  const handleSubmit = (e) => {
    e.preventDefault()
    const newTask = inputs

    const hr =
      (newTask.hr0 ? parseInt(newTask.hr0) : 0) * 10 +
      (newTask.hr1 ? parseInt(newTask.hr1) : 0)

    const min =
      (newTask.min0 ? parseInt(newTask.min0) : 0) * 10 +
      (newTask.min1 ? parseInt(newTask.min1) : 0)

    const sec =
      (newTask.sec0 ? parseInt(newTask.sec0) : 0) * 10 +
      (newTask.sec1 ? parseInt(newTask.sec1) : 0)

    const totalTimeInSec = hr * 3600 + min * 60 + sec
    if (totalTimeInSec <= 0) {
      throw new Error("time limit not set")
    }
    addTask(
      { taskName: newTask.taskName, time: totalTimeInSec },
      newTask.priority
    )
  }
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
    console.log(inputs)
  }

  return (
    <Section
      className={"add-task-section"}
      TitleIco={<EnqueueIcon />}
      title={"add task"}
    >
      <form onSubmit={handleSubmit} className="ats-div">
        <input
          name="taskName"
          className="task-name-input"
          type="text"
          value={inputs["taskName"]}
          placeholder="Task Name"
          onChange={handleChange}
          required={true}
          autoComplete="off"
        />
        <PriorityRange handleChange={handleChange} inputs={inputs} />
        <TimeInput setInputs={setInputs}></TimeInput>
        <button className="submit-btn">Add to Queue</button>
      </form>
    </Section>
  )
}
export default NewTask
