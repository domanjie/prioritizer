import "./NewTask.css"
import { EnqueueIcon } from "../Icons"
import Section from "../Section"
import TimeInput from "./timeInput/TimeInput"
import PriorityRange from "./PriorityRange"
import { useTaskStore } from "../infra/hooks/useTaskStore"
import { useState } from "react"
const NewTask = () => {
  const [inputs, setInputs] = useState({})

  const { addTask } = useTaskStore()
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newTask = Object.fromEntries(formData)

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
    e.currentTarget.reset()
  }
  const handleInput = (e) => {
    return
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
          placeholder="Task Name"
          required={true}
          autoComplete="off"
        />
        <PriorityRange />
        <TimeInput></TimeInput>
        <button className="submit-btn">Add to Queue</button>
      </form>
    </Section>
  )
}
export default NewTask
