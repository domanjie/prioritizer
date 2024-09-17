import Section from "../Section"
import { QueueIcon } from "../Icons"
import "./TaskQueue.css"
import { useTaskStore } from "./useTaskStore"
import QueueCard from "./QueueCard"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useState } from "react"

const TaskQueue = () => {
  const { tasks } = useTaskStore()
  const [parent] = useAutoAnimate()

  return (
    <Section
      className={"task-queue-section"}
      TitleIco={<QueueIcon />}
      title={"task queue "}
      ref={parent}
    >
      <div
        style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
        ref={parent}
      >
        {tasks.queue
          .flatMap((bucket, priority) =>
            bucket
              ?.map((task, index) => (
                <QueueCard
                  key={priority + "" + index}
                  taskName={task.taskName}
                  priority={priority}
                  timer={task.timer}
                />
              ))
              .reverse()
          )
          .reverse()}
      </div>
    </Section>
  )
}
export default TaskQueue
