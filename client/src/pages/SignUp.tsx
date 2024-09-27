import {
    Heading,
    Flex,
    Input,
    Button,
    FormControl,
    FormLabel,
    Link as ChakraLink,
    Text,
    VStack,
    Image,
    Grid,
    GridItem,
    useToast,
    Box
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ISignUpUser } from "../interfaces/ISignUpUser";
import { useAuth } from "../context/authContext";

// Importing images
import signUpImage from "../assets/images/sign_up.webp";
import secureAccessImage from "../assets/images/secure_access.webp";

import { Helmet } from "react-helmet";

const SignUp = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [ usernameInput, setUsernameInput ] = useState<string | null>(null);
    const [ emailInput, setEmailInput ] = useState<string | null>(null);
    const [ passwordInput, setPasswordInput ] = useState<string | null>(null);
    const [ passwordComfirmInput, setPasswordComfirmInput ] = useState<string | null>(null);

    const [ signUpError, setSignUpError ] = useState<string | null>(null);

    const { user, loginUser } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user,navigate])


    const handleUsernameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsernameInput(event.target.value);
    }
    const handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInput(event.target.value);
    }
    const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(event.target.value);
    }
    const handlePasswordComfirmInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordComfirmInput(event.target.value);
    }

    // Handle sign-up form submission
    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSignUpError(null);

        try {
            if (!usernameInput || !emailInput || !passwordInput || !passwordComfirmInput) {
                throw new Error("All Fields Must be filled out.")
            }

            if (passwordInput !== passwordComfirmInput) {
                throw new Error("Passwords do not match.")
            }

            const newUser:ISignUpUser = {
                username: usernameInput.toLowerCase(),
                email: emailInput.toLowerCase(),
                password: passwordInput
            }

            const response = await fetch("http://localhost:8120/auth/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();

            loginUser(data.user);// Log in the user immediately after successful sign-up

            toast({
                title: data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top",
            })
            // Reset input fields after successful sign-up
            setUsernameInput(null);
            setEmailInput(null);
            setPasswordInput(null);
            setPasswordComfirmInput(null);

            navigate('/sign_in');

        } catch (error) {
            if (error instanceof Error) {
                setSignUpError(error.message);
                toast({
                    title: 'Error',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                })

            } else {
                setSignUpError('An unknown error occurred.');
            }
        }
    }

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
                <title>Sign Up | Grouped</title>
                <meta name="description" content="Create a new account on Grouped. Sign up to connect with communities, join groups, and start engaging with like-minded individuals." />
                <meta name="keywords" content="sign up, create account, Grouped, user registration, secure access, join groups" />
                <meta property="og:title" content="Sign Up | Grouped" />
                <meta property="og:description" content="Sign up for Grouped to start connecting with communities and managing your profile. Join today and start exploring!" />
                <meta property="og:type" content="website" />
            </Helmet>
            <VStack spacing={8} maxW="800px" textAlign="center">
                <Heading size="lg">Sign Up</Heading>

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
                                src={signUpImage}
                                alt="Sign Up"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                            />
                            <Text>Sign Up: Create an account to access all features.</Text>
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
                                src={secureAccessImage}
                                alt="Secure Access"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                            />
                            <Text>Secure Access: Enjoy secure and private access to your account.</Text>
                        </Box>
                    </GridItem>
                </Grid>

                <form style={{ width: "100%", maxWidth: "400px" }} onSubmit={handleSignUp}>
                    <Text textAlign="center" color='red' mb="1rem">{signUpError}</Text>

                    <FormControl isRequired mb="1rem">
                        <FormLabel>Username</FormLabel>
                        <Input
                            color="black"
                            bg="white"
                            placeholder="Username"
                            value={usernameInput || ""}
                            onChange={handleUsernameInputChange}
                        />
                    </FormControl>

                    <FormControl isRequired mb="1rem">
                        <FormLabel>Email</FormLabel>
                        <Input
                            color="black"
                            bg="white"
                            type="email"
                            placeholder="Email"
                            value={emailInput || ""}
                            onChange={handleEmailInputChange}
                        />
                    </FormControl>

                    <FormControl isRequired mb="1rem">
                        <FormLabel>Password</FormLabel>
                        <Input
                            color="black"
                            bg="white"
                            type="password"
                            placeholder="Password"
                            value={passwordInput || ""}
                            onChange={handlePasswordInputChange}
                        />
                    </FormControl>

                    <FormControl isRequired mb="1rem">
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            color="black"
                            bg="white"
                            type="password"
                            placeholder="Confirm Password"
                            value={passwordComfirmInput || ""}
                            onChange={handlePasswordComfirmInputChange}
                        />
                    </FormControl>

                    <Flex mb='1REM' justifyContent="center">
                        <Button colorScheme="purple" type="submit">Sign Up</Button>
                    </Flex>

                    <Text textAlign="center">Already have an account?
                        <ChakraLink _hover={{color: "purple"}} as={Link} to="/sign_in">
                            Sign In!
                        </ChakraLink>
                    </Text>
                </form>
            </VStack>
        </Flex>
    );
}

export default SignUp;
