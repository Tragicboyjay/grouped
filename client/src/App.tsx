import { Flex, Box } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Router from "./components/Router"

function App() {
  return (
    <Flex
        direction="column"
        height="100dvh"
    >
        <Navbar />
        <Box
            py="2rem"
            flex="1"
        >
            <Router />
        </Box>
        <Footer />
    </Flex>
  )
}

export default App
