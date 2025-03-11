import { useEffect } from "react"
import { a } from "../axios"
import useAuthStore from "./useAuthStore"

const CLIENT_ID =
  "755812056141-66dqj7e093pnjlulticeqt6u9k5o1n8h.apps.googleusercontent.com"

const useGoogleSSO = () => {
  const { isSignedIn, setIsSignedIn } = useAuthStore()
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: (response) => {
        a.post("/api/v1/auth/sign-in", { idToken: response.credential }).then(
          () => {
            setIsSignedIn(true)
          }
        )
      },
    })
  }, [])
  useEffect(() => {
    if (!isSignedIn) google.accounts.id.prompt()
  }, [isSignedIn])
}

export default useGoogleSSO
