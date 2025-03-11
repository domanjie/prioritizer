import { useEffect, useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAxios } from "../infra/customHooks"

const DDMenu = ({ setShowDDMenu, id }) => {
  const [animateIn, setAnimateIn] = useState(false)
  const queryClient = useQueryClient()
  const a = useAxios()
  const deleteTask = useMutation(async () => {
    a.delete(`api/v1/task/${id}`).then(() => {
      queryClient.invalidateQueries("tasks")
    })
  })
  useEffect(() => {
    setAnimateIn(true)
    const handleClick = (e) => {
      setShowDDMenu(false)
    }
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <div className={`DDMenu  ${animateIn && "drop-menu"} `}>
      <button style={{ paddingBottom: "3px" }}>Edit</button>
      <button
        style={{ paddingTop: "3px", color: "#F15E6C" }}
        onClick={(e) => {
          e.stopPropagation()
          deleteTask.mutate()
        }}
      >
        Delete
      </button>
    </div>
  )
}
export default DDMenu
