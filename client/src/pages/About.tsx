import { Box, Heading, Text } from "@chakra-ui/react";

const About = () => {
    return (
        <Box py={10} px={6}>
            <Heading as="h2" size="xl" mt={6} mb={2}>
                About Grouped
            </Heading>
            <Text color={'gray.500'}>
                Grouped is a platform designed to bring people together around shared interests. Our mission is to foster meaningful interactions and build communities where people can connect, collaborate, and grow together.
            </Text>
            <Text mt={4} color={'gray.500'}>
                Whether you're interested in cars, cooking, tech, or anything in between, Grouped offers a space where you can find like-minded individuals and engage in discussions that matter to you.
            </Text>
        </Box>
    );
}

export default About;
