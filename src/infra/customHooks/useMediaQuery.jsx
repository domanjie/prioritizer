import { useState, useEffect } from "react"

const useMediaQuery = (queryString) => {
  const [matches, setMatches] = useState(() => {
    return window.matchMedia(queryString).matches
  })

  useEffect(() => {
    const mediaQueryList = window.matchMedia(queryString)
    const handler = (e) => {
      if (e.matches) setMatches(true)
      else setMatches(false)
    }
    mediaQueryList.addEventListener("change", handler)
    return () => {
      mediaQueryList.removeEventListener("change", handler)
    }
  }, [])
  return matches
}
export default useMediaQuery
