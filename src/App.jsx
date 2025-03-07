import "./App.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import { Main } from "./main/Main.jsx"
import { Prioritizer } from "./Icons.jsx"
import TopMenu from "./topMenu/TopMenu.jsx"

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
