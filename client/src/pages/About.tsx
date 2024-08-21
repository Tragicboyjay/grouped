import { Box, Heading, Text, VStack, Flex, Image, Grid, GridItem } from "@chakra-ui/react";

// Importing images
import diverseCommunitiesImage from "../assets/images/diverse_communities.webp";
import collaborativeEnvironmentImage from "../assets/images/collaborative_environment.webp";
import supportiveCommunityImage from "../assets/images/supportive_community.webp";
import continuousGrowthImage from "../assets/images/continuous_growth.webp";

import { Helmet } from "react-helmet";

const About = () => {
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
                <title>About | Grouped</title>
                <meta name="description" content="Learn more about Grouped, a platform designed to foster meaningful interactions and build communities where people can connect, collaborate, and grow together." />
                <meta name="keywords" content="Grouped, about Grouped, community, collaboration, growth, interests, connection" />
                <meta property="og:title" content="About Grouped | Bringing People Together" />
                <meta property="og:description" content="Grouped is a platform where everyone can find a place to belong, share their passions, and engage in discussions that matter to them." />
                <meta property="og:type" content="website" />
            </Helmet>


            <VStack spacing={8} maxW="800px" textAlign="center">
                <Heading as="h2" size="2xl" mt={6} mb={4}>
                    About Grouped
                </Heading>
                <Text fontSize="xl" color="gray.200">
                    Bringing People Together Around Shared Interests
                </Text>
                <Text fontSize="md" color="gray.300" mt={4}>
                    Grouped is a platform designed to foster meaningful interactions and build communities where people can connect, collaborate, and grow together. Our mission is to create a space where everyone can find a place to belong, share their passions, and engage in discussions that matter to them.
                </Text>
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
                                src={diverseCommunitiesImage}
                                alt="Diverse Communities"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                                width="100%"
                                height="150px"
                            />
                            <Box>
                                <Heading as="h3" size="lg" mb={2}>Diverse Communities</Heading>
                                <Text>
                                    Whether you're interested in technology, arts, sports, or any other topic, Grouped offers a space for everyone. Join communities that resonate with your interests and meet like-minded individuals who share your passion.
                                </Text>
                            </Box>
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
                                src={collaborativeEnvironmentImage}
                                alt="Collaborative Environment"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                                width="100%"
                                height="150px"
                            />
                            <Box>
                                <Heading as="h3" size="lg" mb={2}>Collaborative Environment</Heading>
                                <Text>
                                    Collaboration is at the heart of Grouped. We believe that great ideas come to life when people work together. Engage in discussions, start projects, and collaborate with others to achieve common goals.
                                </Text>
                            </Box>
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
                            _hover={{ transform: "scale(1.05)", bg: "green.50" }}
                            height="100%"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                        >
                            <Image
                                src={supportiveCommunityImage}
                                alt="Supportive Community"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                                width="100%"
                                height="150px"
                            />
                            <Box>
                                <Heading as="h3" size="lg" mb={2}>Supportive Community</Heading>
                                <Text>
                                    Our platform is built on the principles of respect and inclusivity. We strive to create a supportive environment where every voice is heard, and every member feels valued and respected.
                                </Text>
                            </Box>
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
                            _hover={{ transform: "scale(1.05)", bg: "purple.50" }}
                            height="100%"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                        >
                            <Image
                                src={continuousGrowthImage}
                                alt="Continuous Growth"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                                width="100%"
                                height="150px"
                            />
                            <Box>
                                <Heading as="h3" size="lg" mb={2}>Continuous Growth</Heading>
                                <Text>
                                    At Grouped, we believe in the power of continuous growth. Whether you're here to learn something new, share your knowledge, or grow your network, we're here to support you every step of the way.
                                </Text>
                            </Box>
                        </Box>
                    </GridItem>
                </Grid>
                <Text fontSize="md" color="gray.200" mt={8}>
                    Join Grouped today and be part of a thriving community that values connection, collaboration, and growth. Together, we can achieve more.
                </Text>
            </VStack>
        </Flex>
    );
}

export default About;
