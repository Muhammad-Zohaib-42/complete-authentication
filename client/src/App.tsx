import { RouterProvider } from "react-router-dom"
import { router } from "./app.routes"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
