import { useEffect } from "react"
import { a } from "../axios"
import useAuthStore from "./useAuthStore"

export const useAxios = () => {
  const { setIsSignedIn } = useAuthStore()
  useEffect(() => {
    const responseInterceptor = a.interceptors.response.use(
      (response) => {
        setIsSignedIn(true)
        return response
      },
      (error) => {
        if (error?.response?.status === 401 || error?.code === "ERR_NETWORK")
          setIsSignedIn(false)
        return Promise.reject(error)
      }
    )
    return () => {
      a.interceptors.response.eject(responseInterceptor)
    }
  }, [])
  return a
}
