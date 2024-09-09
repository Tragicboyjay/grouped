import React, { useState } from "react";
import { Box, Heading, VStack, Input, Textarea, Button, Flex, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const BlogCreate: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleCreatePost = async () => {
        setError(null);

        if (title.trim() === "" || content.trim() === "") {
            setError("Both title and content are required.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5220/Blog/Create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    content,
                    createdAt: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                const createdPost = await response.json();
                console.log("Post created successfully:", createdPost);
                navigate("/blog");
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || "Failed to create blog post.");
            }
        } catch (error) {
            console.error("Error creating blog post:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <Flex direction="column" align="center" justify="center" minH="100vh" bgGradient="linear(to-r, teal.400, blue.500)" p={5} color="white">
            <Helmet>
                <title>Create Blog Post</title>
                <meta name="description" content="Create a new blog post" />
            </Helmet>

            <VStack spacing={8} maxW="800px" textAlign="center">
                <Heading as="h2" size="2xl">Create New Blog Post</Heading>

                <Box bg="white" p={8} borderRadius="md" boxShadow="lg" w="100%" maxW="600px" color="black">
                    <VStack spacing={4} align="start">
                        {error && (
                            <Text color="red.500">{error}</Text>
                        )}
                        <Text>Title</Text>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog post title"
                            size="md"
                        />

                        <Text>Content</Text>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter blog post content"
                            size="md"
                        />

                        <Button colorScheme="teal" onClick={handleCreatePost}>
                            Create
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Flex>
    );
};

export default BlogCreate;
