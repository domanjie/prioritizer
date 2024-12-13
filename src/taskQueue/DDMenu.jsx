import { useEffect, useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { a } from "../infra/axios"

const DDMenu = ({ setShowDDMenu, id }) => {
  const queryClient = useQueryClient()
  const [animateIn, setAnimateIn] = useState(false)

  const deleteTask = useMutation(async () => {
    a.delete(`api/v1/task/${id}`).then(() => {
      queryClient.invalidateQueries("tasks")
    })
  })
  const ref = useRef()
  useEffect(() => {
    setAnimateIn(true)

    const handleClick = (e) => {
      if (e.target !== ref.current) setShowDDMenu(false)
    }
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <div ref={ref} className={`DDMenu  ${animateIn && "drop-menu"} `}>
      <button style={{ paddingBottom: "3px" }}>Edit</button>
      <button
        style={{ paddingTop: "3px", color: "#F15E6C" }}
        onClick={() => {
          deleteTask.mutate()
        }}
      >
        Delete
      </button>
    </div>
  )
}
export default DDMenu
