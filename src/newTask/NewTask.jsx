import "./NewTask.css"

import { EnqueueIcon } from "../Icons"
import Section from "../Section"
import TimeInput from "./timeInput/TimeInput"
import PriorityRange from "./rangeInput/RangeInput"
import { useTaskStore } from "../infra/hooks/useTaskStore"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { a } from "../infra/axios"
import { useQueryClient } from "@tanstack/react-query"
import useAuthStore from "../infra/hooks/useAuthStore"
const NewTask = () => {
  const queryClient = useQueryClient()
  const { addTask } = useTaskStore()
  const { isSignedIn } = useAuthStore()
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
  const addTasks = useMutation({
    mutationFn: async (task) => {
      a.post("/api/v1/task", task).then(() => {
        queryClient.invalidateQueries("tasks")
      })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    let newTask = inputs

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
      console.error("time limit nost set")
      return
    }
    newTask = {
      taskName: newTask.taskName,
      time: parseInt(totalTimeInSec),
      priority: parseInt(newTask.priority),
      createdAt: Date.now(),
    }
    if (isSignedIn) {
      addTasks.mutate(newTask)
    } else {
      addTask(newTask)
    }
    setInputs({ ...defaults })
    e.currentTarget.reset()
  }
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
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
