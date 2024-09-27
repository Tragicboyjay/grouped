import {
    Heading,
    Flex,
    Input,
    Button,
    FormControl,
    FormLabel,
    Link as ChakraLink,
    Text,
    useToast,
    VStack,
    Box,
    Image,
    Grid,
    GridItem
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ISignInUser } from "../interfaces/ISignInUser";
import { useAuth } from "../context/authContext";

// Importing images
import signInImage from "../assets/images/sign_in.webp";
import secureAccessImage from "../assets/images/secure_access.webp";

import { Helmet } from "react-helmet";

const SignIn = () => {
    
    const toast = useToast();
    const navigate = useNavigate();

    const [ usernameInput, setUsernameInput ] = useState<string | null>(null);
    const [ passwordInput, setPasswordInput ] = useState<string | null>(null);
    const [ signInError, setSignInError ] = useState<string | null>(null);

    const { user, loginUser } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user,navigate])

    const handleUsernameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsernameInput(event.target.value);
    }

    const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(event.target.value);
    }

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSignInError(null);

        try {
            if (!usernameInput || !passwordInput) {
                throw new Error("All Fields Must be filled out.");
            }

            const authUser: ISignInUser = {
                username: usernameInput.toLowerCase(),
                password: passwordInput
            };

            const response = await fetch("http://localhost:8120/auth/authenticate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authUser)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();

            loginUser(data.user);
            localStorage.setItem('token', data.user.token);

            toast({
                title: data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top",
            });

            setUsernameInput(null);
            setPasswordInput(null);

            navigate('/profile');

        } catch (error) {
            if (error instanceof Error) {
                setSignInError(error.message);
                toast({
                    title: 'Error',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            } else {
                setSignInError('An unknown error occurred.');
            }
        }
    }

    return (
        <Flex
            width="100%"
            height="100vh"
            align="center"
            justify="center"
            bgGradient="linear(to-r, teal.400, blue.500)"
            p={5}
        >
            <Helmet>
                <title>Sign In | Grouped</title>
                <meta name="description" content="Sign in to Grouped to access your account. Enter your username and password to log in and start connecting with your groups." />
                <meta name="keywords" content="sign in, login, Grouped, user authentication, secure access, account" />
                <meta property="og:title" content="Sign In | Grouped" />
                <meta property="og:description" content="Access your Grouped account by signing in with your username and password. Connect with your groups and manage your profile." />
                <meta property="og:type" content="website" />
            </Helmet>

            <Box
                bg="white"
                p={8}
                borderRadius="md"
                boxShadow="lg"
                width="100%"
                maxW="500px"
                textAlign="center"
            >
                {/* Images Grid */}
                <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={8}>
                    <GridItem>
                        <Image
                            src={signInImage}
                            alt="Sign In"
                            borderRadius="md"
                            objectFit="cover"
                            width="100%"
                            height="150px"
                        />
                    </GridItem>
                    <GridItem>
                        <Image
                            src={secureAccessImage}
                            alt="Secure Access"
                            borderRadius="md"
                            objectFit="cover"
                            width="100%"
                            height="150px"
                        />
                    </GridItem>
                </Grid>

                <Heading size="lg" mb={6} color="teal.600">Sign In</Heading>

                <form onSubmit={handleSignIn}>
                    <VStack spacing={4}>
                        <Text color='red' mb="1rem">{signInError}</Text>

                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                placeholder="Username"
                                value={usernameInput || ""}
                                onChange={handleUsernameInputChange}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={passwordInput || ""}
                                onChange={handlePasswordInputChange}
                            />
                        </FormControl>

                        <Button colorScheme="teal" width="full" type="submit">
                            Sign In
                        </Button>
                    </VStack>
                </form>

                <Text mt={4}>
                    Don't have an account?{" "}
                    <ChakraLink color="teal.500" as={Link} to="/sign_up">
                        Sign Up Now!
                    </ChakraLink>
                </Text>
            </Box>
        </Flex>
    );
}

export default SignIn;
