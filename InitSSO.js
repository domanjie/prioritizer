import axios from "axios"

const CLIENT_ID =
  "755812056141-66dqj7e093pnjlulticeqt6u9k5o1n8h.apps.googleusercontent.com"

window.addEventListener("load", () => {
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    // login_uri: "http://localhost:5173",
    callback: (response) => {
      console.log(response)
    },
    ux_mode: "redirect",
  })
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" } // customization attributes
  )
  //   google.accounts.id.prompt()
})
