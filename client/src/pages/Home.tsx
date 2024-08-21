import React from "react";
import { Box, Image, Heading, Text, VStack, Grid, GridItem, Flex } from "@chakra-ui/react";

// Importing the images
import connectingPeopleImage from "../assets/images/connecting_people.webp";
import messagingAppInterfaceImage from "../assets/images/messaging_app_interface.webp";
import growingNetworkImage from "../assets/images/growing_network.webp";
import virtualGroupDiscussionImage from "../assets/images/virtual_group_discussion.webp";
import notificationIconImage from "../assets/images/notification_icon_1.webp";

import { Helmet } from "react-helmet";

const Home: React.FC = () => {
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
                <title>Home | Grouped</title>
                <meta name="description" content="Welcome to Grouped. Discover, join, and connect with like-minded people through our platform. Explore features like messaging, group discussions, and network growth." />
                <meta name="keywords" content="home, Grouped, connect, join groups, messaging, network growth, discussions" />
                <meta property="og:title" content="Home | Grouped" />
                <meta property="og:description" content="Join and connect with others on Grouped. Explore features like messaging, group discussions, and network growth to engage with like-minded individuals." />
                <meta property="og:type" content="website" />
            </Helmet>

            <VStack spacing={8} maxW="800px" textAlign="center">
                {/* Main Heading */}
                <Heading as="h1" size="2xl" mb={4}>
                    Welcome to GroupConnect
                </Heading>

                {/* Subtitle */}
                <Text fontSize="xl" color="gray.200">
                    Join, Connect, and Communicate with Like-Minded People
                </Text>

                {/* Introductory Paragraph */}
                <Text fontSize="md" color="gray.300" mt={4}>
                    GroupConnect is your go-to platform for discovering and joining groups that share your interests.
                    Whether you're passionate about technology, arts, sports, or any other topic, our platform
                    makes it easy to connect with others, engage in meaningful conversations, and grow your network.
                    Explore our features to find out how you can start building connections today.
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
                        >
                            <Image
                                src={connectingPeopleImage}
                                alt="Join Groups"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                            />
                            <Text>Feature 1: Join Groups Aligned with Your Interests</Text>
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
                        >
                            <Image
                                src={messagingAppInterfaceImage}
                                alt="Send Messages"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                            />
                            <Text>Feature 2: Send and Receive Messages Seamlessly</Text>
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
                        >
                            <Image
                                src={growingNetworkImage}
                                alt="Grow Your Network"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                            />
                            <Text>Feature 3: Grow Your Network and Make New Connections</Text>
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
                        >
                            <Image
                                src={virtualGroupDiscussionImage}
                                alt="Engage in Discussions"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                            />
                            <Text>Feature 4: Engage in Rich Discussions with Group Members</Text>
                        </Box>
                    </GridItem>

                    <GridItem colSpan={2}>
                        <Box
                            bg="white"
                            color="black"
                            boxShadow="lg"
                            p={5}
                            borderRadius="md"
                            transition="transform 0.3s"
                            _hover={{ transform: "scale(1.05)", bg: "orange.50" }}
                        >
                            <Image
                                src={notificationIconImage}
                                alt="Stay Updated"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                            />
                            <Text>Feature 5: Stay Updated with Notifications and Alerts</Text>
                        </Box>
                    </GridItem>
                </Grid>

                {/* Closing Paragraph */}
                <Text fontSize="md" color="gray.200" mt={8}>
                    At GroupConnect, our mission is to help you build strong and lasting connections. Whether you're here to
                    learn, share, or simply meet new people, we're here to support your journey. Join us today and start
                    connecting with communities that matter to you.
                </Text>
            </VStack>
        </Flex>
    );
};

export default Home;
