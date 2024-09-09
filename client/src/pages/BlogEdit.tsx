import React, { useEffect, useState } from "react";
import { Box, Heading, VStack, Input, Textarea, Button, Flex, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

const BlogEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Extract the post ID from the URL
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Fetch the blog post to edit
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5220/Blog/${id}`);
                if (response.ok) {
                    const post = await response.json();
                    setTitle(post.title);
                    setContent(post.content);
                } else {
                    setError("Failed to fetch blog post.");
                }
            } catch (error) {
                console.error("Error fetching blog post:", error);
                setError("An unexpected error occurred.");
            }
        };
        fetchPost();
    }, [id]);

    const handleEditPost = async () => {
        setError(null);

        if (title.trim() === "" || content.trim() === "") {
            setError("Both title and content are required.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5220/Blog/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    title,
                    content,
                    createdAt: new Date().toISOString(), // Keep track of the original creation time
                }),
            });

            if (response.ok) {
                navigate("/blog"); // Redirect to blog index after successful edit
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || "Failed to edit blog post.");
            }
        } catch (error) {
            console.error("Error editing blog post:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <Flex direction="column" align="center" justify="center" minH="100vh" bgGradient="linear(to-r, teal.400, blue.500)" p={5} color="white">
            <Helmet>
                <title>Edit Blog Post</title>
                <meta name="description" content="Edit an existing blog post" />
            </Helmet>

            <VStack spacing={8} maxW="800px" textAlign="center">
                <Heading as="h2" size="2xl">Edit Blog Post</Heading>

                <Box bg="white" p={8} borderRadius="md" boxShadow="lg" w="100%" maxW="600px" color="black">
                    {error && (
                        <Text color="red.500">{error}</Text> // Display error message
                    )}
                    <VStack spacing={4} align="start">
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

                        <Button colorScheme="teal" onClick={handleEditPost}>
                            Save Changes
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Flex>
    );
};

export default BlogEdit;
