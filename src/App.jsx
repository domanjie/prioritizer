import "./App.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import { Main } from "./main/Main.jsx"
import { Prioritizer } from "./Icons.jsx"
import { useRef, useEffect } from "react"
import useGoogleSSO from "./infra/hooks/useGoogleSSO.jsx"
import useAuthStore from "./infra/hooks/useAuthStore.jsx"
const client = new QueryClient({
  defaultOptions: {
    queries: { networkMode: "always" },
    mutations: { networkMode: "always" },
  },
})
function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="app-div">
        <Header></Header>
        <Main></Main>
      </div>
    </QueryClientProvider>
  )
}
export default App

const Header = () => {
  return (
    <div className="header">
      <Prioritizer></Prioritizer>
      <TopMenu></TopMenu>
    </div>
  )
}
const TopMenu = () => {
  useGoogleSSO()
  const { isSignedIn } = useAuthStore()
  const ref = useRef()

  useEffect(() => {
    google.accounts.id.renderButton(
      ref.current,
      {
        theme: "filled_black",
        size: "medium",
        shape: "pill",
        type: "standard",
      } // customization attributes
    )
  })

  return <>{isSignedIn ? <></> : <div ref={ref}></div>}</>
}
