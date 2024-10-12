import axios from "axios"
import { jsx } from "react/jsx-runtime"

const API_URL = "http://localhost:3000"

const a = axios.create({ baseURL: API_URL })

export { a }
