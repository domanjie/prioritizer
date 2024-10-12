import { useEffect, useRef } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { a } from "../infra/axios"
const DDMenu = ({ setShowDDMenu, showDDMenu, id }) => {
  const queryClient = useQueryClient()
  const deleteTask = useMutation(async () => {
    a.delete(`api/v1/task/${id}`).then(() => {
      queryClient.invalidateQueries("tasks")
    })
  })
  const ref = useRef()
  const handleClick = (e) => {
    if (e.target !== ref.current) {
      setShowDDMenu(false)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      ref.current.classList.add("drop-menu")
    }, 0)
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <div ref={ref} className={`DDMenu  `}>
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
