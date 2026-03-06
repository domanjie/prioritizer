import { useEffect, useState } from "react"
import { a } from "../axios"
import useAuthStore from "./useAuthStore"

const CLIENT_ID =
  "755812056141-66dqj7e093pnjlulticeqt6u9k5o1n8h.apps.googleusercontent.com"

const useGoogleSSO = (googleBtnRef) => {
  const { isSignedIn, setIsSignedIn } = useAuthStore()
  const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false)
  useEffect(() => {
    const gsiScript = document.createElement("script")
    gsiScript.src = "https://accounts.google.com/gsi/client"
    gsiScript.async = true
    gsiScript.onload = () => {
      setGsiScriptLoaded(true)
    }
    document.body.appendChild(gsiScript)
    return () => {
      document.body.removeChild(gsiScript)
    }
  }, [])
  useEffect(() => {
    if (!isSignedIn && gsiScriptLoaded && googleBtnRef.current) {
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
      google?.accounts?.id?.prompt()
    }
  }, [isSignedIn, gsiScriptLoaded, googleBtnRef.current])
}

export default useGoogleSSO
