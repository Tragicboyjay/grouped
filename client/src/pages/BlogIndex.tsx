import React, { useEffect, useState } from "react";
import { Box, Heading, VStack, Grid, GridItem, Text, Flex, Button } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";

interface BlogPost {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}

const BlogIndex: React.FC = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:5220/Blog");
                const data = await response.json();
                console.log("Fetched blog posts:", data);  // Log for debugging
                setBlogPosts(data);
            } catch (error) {
                console.error("Error fetching blog posts:", error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <Flex direction="column" align="center" justify="center" minH="100vh" bgGradient="linear(to-r, teal.400, blue.500)" p={5} color="white">
            <Helmet>
                <title>Blog Posts</title>
                <meta name="description" content="View all blog posts" />
            </Helmet>

            <VStack spacing={8} maxW="800px" textAlign="center">
                <Heading as="h2" size="2xl">Blog Posts</Heading>

                <Button as={RouterLink} to="/blog/create" colorScheme="blue" mb={6}>
                    Create New Blog Post
                </Button>

                <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                    {blogPosts.map((post) => (
                        <GridItem key={post.id}>
                            <Box bg="white" p={8} borderRadius="md" boxShadow="lg" color="black">
                                <Heading as="h3" size="md">{post.title}</Heading>
                                <Text mt={4}>{post.content}</Text>
                                <Text mt={2} fontSize="sm" color="gray.500">Created at: {new Date(post.createdAt).toLocaleString()}</Text>
                                <Button as={RouterLink} to={`/blog/edit/${post.id}`} colorScheme="teal" mt={4}>
                                    Edit
                                </Button>
                                <Button as={RouterLink} to={`/blog/delete/${post.id}`} colorScheme="red" mt={4} ml={4}>
                                    Delete
                                </Button>
                            </Box>
                        </GridItem>
                    ))}
                </Grid>
            </VStack>
        </Flex>
    );
};

export default BlogIndex;
