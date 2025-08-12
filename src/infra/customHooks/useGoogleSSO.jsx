import { useEffect, useState } from "react"
import { a } from "../axios"
import useAuthStore from "./useAuthStore"

const CLIENT_ID =
  "755812056141-66dqj7e093pnjlulticeqt6u9k5o1n8h.apps.googleusercontent.com"

const useGoogleSSO = (googleBtnRef) => {
  const { isSignedIn, setIsSignedIn } = useAuthStore()
  const [documentReady, setDocumentReady] = useState(false)
  useEffect(() => {
    window.onload = () => {
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        use_fedcm_for_prompt: true,
        use_fedcm_for_button: true,
        callback: (response) => {
          a.post("/api/v1/auth/sign-in", {
            idToken: response.credential,
          }).then(() => {
            setIsSignedIn(true)
          })
        },
      })
      google.accounts.id.renderButton(
        googleBtnRef.current,
        {
          theme: "filled_black",
          size: "medium",
          shape: "pill",
          type: "standard",
        } // customization attributes
      )
      setDocumentReady(true)
    }
  }, [])
  useEffect(() => {
    if (!isSignedIn && documentReady) {
      google?.accounts?.id?.prompt()
    }
  }, [isSignedIn, documentReady])
}

export default useGoogleSSO
