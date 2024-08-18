import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();

    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading as="h2" size="xl" mt={6} mb={2}>
                Welcome to Grouped!
            </Heading>
            <Text color={'gray.500'}>
                Join communities centered around your interests. Whether you're passionate about cars, tech, sports, or anything else, we have a group for you!
            </Text>
            <Button
                mt={4}
                colorScheme="teal"
                onClick={() => navigate("/groups")}
            >
                Explore Groups
            </Button>
        </Box>
    );
}

export default Home;