import { Flex, Box } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { RouterProvider } from "react-router-dom"
import Router from "./components/Router"

function App() {
  return (
    <Flex
        direction="column"
        height="100dvh"
    >
        <Navbar />
        <Box
            flex="1"
        >
            <RouterProvider router={Router} />
        </Box>
        <Footer />
    </Flex>
  )
}

export default App
