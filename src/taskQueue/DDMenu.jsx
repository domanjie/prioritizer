import { useEffect, useRef } from "react"

const DDMenu = ({ setShowDDMenu, showDDMenu }) => {
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
      <button style={{ paddingTop: "3px", color: "#F15E6C" }}>Delete</button>
    </div>
  )
}
export default DDMenu
