import { Box, Heading, Text, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";

const Contact = () => {
    return (
        <Box py={10} px={6} maxWidth="600px" mx="auto">
            <Heading as="h2" size="xl" mt={6} mb={2}>
                Contact Us
            </Heading>
            <Text color={'gray.500'} mb={6}>
                We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
            </Text>
            <FormControl id="name" mb={4}>
                <FormLabel>Name</FormLabel>
                <Input type="text" placeholder="Your Name" />
            </FormControl>
            <FormControl id="email" mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Your Email" />
            </FormControl>
            <FormControl id="message" mb={4}>
                <FormLabel>Message</FormLabel>
                <Textarea placeholder="Your Message" />
            </FormControl>
            <Button colorScheme="teal" mt={4}>
                Send Message
            </Button>
        </Box>
    );
}

export default Contact;
