import React, { useState } from "react";
import { Box, Heading, VStack, Button, Flex, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

const BlogDelete: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Extract the post ID from the URL
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleDeletePost = async () => {
        setError(null);

        try {
            const response = await fetch(`http://localhost:5220/Blog/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                navigate("/blog"); // Redirect to blog index after deletion
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || "Failed to delete blog post.");
            }
        } catch (error) {
            console.error("Error deleting blog post:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <Flex direction="column" align="center" justify="center" minH="100vh" bgGradient="linear(to-r, teal.400, blue.500)" p={5} color="white">
            <Helmet>
                <title>Delete Blog Post</title>
                <meta name="description" content="Delete a blog post" />
            </Helmet>

            <VStack spacing={8} maxW="800px" textAlign="center">
                <Heading as="h2" size="2xl">Delete Blog Post</Heading>

                <Box bg="white" p={8} borderRadius="md" boxShadow="lg" w="100%" maxW="600px" color="black">
                    {error && (
                        <Text color="red.500">{error}</Text> // Display error message
                    )}
                    <Text>Are you sure you want to delete this post?</Text>
                    <Button colorScheme="red" onClick={handleDeletePost}>
                        Delete
                    </Button>
                </Box>
            </VStack>
        </Flex>
    );
};

export default BlogDelete;
