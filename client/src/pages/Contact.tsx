import { Box, Heading, Text, FormControl, FormLabel, Input, Textarea, Button, VStack, Flex, Image, Grid, GridItem } from "@chakra-ui/react";

// Importing images
import contactSupportImage from "../assets/images/contact_support.webp";
import feedbackImage from "../assets/images/feedback.webp";
import sayHelloImage from "../assets/images/say_hello.webp";
import connectWithUsImage from "../assets/images/connect_with_us.webp";
import { Helmet } from "react-helmet";

const Contact = () => {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minH="100vh"
            bgGradient="linear(to-r, teal.400, blue.500)"
            p={5}
            color="white"
        >
            <Helmet>
                <title>Contact Us | Grouped</title>
                <meta name="description" content="Get in touch with us for support, feedback, or just to say hello. We'd love to hear from you!" />
                <meta name="keywords" content="contact Grouped, support, feedback, connect with us, say hello" />
                <meta property="og:title" content="Contact Us | Grouped" />
                <meta property="og:description" content="Reach out to us for any assistance, provide feedback, or simply connect with the Grouped team." />
                <meta property="og:type" content="website" />
            </Helmet>


            <VStack spacing={8} maxW="800px" textAlign="center">
                {/* Main Heading */}
                <Heading as="h2" size="2xl" mt={6} mb={4}>
                    Contact Us
                </Heading>

                {/* Introduction */}
                <Text fontSize="xl" color="gray.200">
                    We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
                </Text>

                {/* Image and Description Section in Grid Layout */}
                <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={8}>
                    <GridItem>
                        <Box
                            bg="white"
                            color="black"
                            boxShadow="lg"
                            p={5}
                            borderRadius="md"
                            transition="transform 0.3s"
                            _hover={{ transform: "scale(1.05)", bg: "teal.50" }}
                            height="100%"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                        >
                            <Image
                                src={contactSupportImage}
                                alt="Contact Support"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                                width="100%"
                                height="150px"
                            />
                            <Text>
                                Contact Support: Reach out to us for any assistance.
                            </Text>
                        </Box>
                    </GridItem>

                    <GridItem>
                        <Box
                            bg="white"
                            color="black"
                            boxShadow="lg"
                            p={5}
                            borderRadius="md"
                            transition="transform 0.3s"
                            _hover={{ transform: "scale(1.05)", bg: "blue.50" }}
                            height="100%"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                        >
                            <Image
                                src={feedbackImage}
                                alt="Give Feedback"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                                width="100%"
                                height="150px"
                            />
                            <Text>
                                Feedback: We appreciate your feedback to improve our services.
                            </Text>
                        </Box>
                    </GridItem>

                    {/* New Row with Third and Last Image */}
                    <GridItem>
                        <Box
                            bg="white"
                            color="black"
                            boxShadow="lg"
                            p={5}
                            borderRadius="md"
                            transition="transform 0.3s"
                            _hover={{ transform: "scale(1.05)", bg: "green.50" }}
                            height="100%"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                        >
                            <Image
                                src={sayHelloImage}
                                alt="Say Hello"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                                width="100%"
                                height="150px"
                            />
                            <Text>
                                Say Hello: We love to connect with our users and hear from you.
                            </Text>
                        </Box>
                    </GridItem>

                    <GridItem>
                        <Box
                            bg="white"
                            color="black"
                            boxShadow="lg"
                            p={5}
                            borderRadius="md"
                            transition="transform 0.3s"
                            _hover={{ transform: "scale(1.05)", bg: "orange.50" }}
                            height="100%"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                        >
                            <Image
                                src={connectWithUsImage}
                                alt="Connect With Us"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                                width="100%"
                                height="150px"
                            />
                            <Text>
                                Connect With Us: Stay updated and connected through our social channels.
                            </Text>
                        </Box>
                    </GridItem>
                </Grid>

                {/* Contact Form */}
                <Box
                    bg="white"
                    color="black"
                    boxShadow="lg"
                    p={6}
                    borderRadius="md"
                    mt={10}
                    w="100%"
                    maxW="600px"
                >
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
            </VStack>
        </Flex>
    );
}

export default Contact;
