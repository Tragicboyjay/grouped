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
} from "@chakra-ui/react";
import { useState } from "react";
//import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate to handle navigation after successful sign-in
import { ISignInUser } from "../interfaces/ISignInUser";
import { useAuth } from "../context/authContext";

const SignIn = () => {
    const toast = useToast();
    const navigate = useNavigate(); //james  Added navigate function for redirecting after successful sign-in

    const [ usernameInput, setUsernameInput ] = useState<string | null>(null);
    const [ passwordInput, setPasswordInput ] = useState<string | null>(null);


    const [ signInError, setSignInError ] = useState<string | null>(null);

    const { loginUser } = useAuth();

    const handleUsernameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsernameInput(event.target.value);
    }
    const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(event.target.value);
    }
    //james
   // const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => { // Renamed function to reflect its purpose (SignIn)
        event.preventDefault();

        setSignInError(null);

        try {
            if (!usernameInput || !passwordInput) {
                throw new Error("All Fields Must be filled out.")
            }

            const authUser:ISignInUser = {
                username: usernameInput.toLowerCase(),
                password: passwordInput
            }

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
            console.log(data);  // debug the response
            localStorage.setItem('token', data.user.token);  // Save the token
            toast({
                title: data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top",
            })

            setUsernameInput(null);
            setPasswordInput(null);

            // Navigate to the profile or home page after successful sign-in
            navigate('/profile'); // Assuming you have a profile page; replace with the appropriate path

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
                })

            } else {
                setSignInError('An unknown error occurred.');
            }

  
        }
        


    }

    return (  
        <Flex
            width="100%"
            height="100%"
            align="center"
            justify="center"
        >
            <Flex
                width="100%"
                px="2rem"
                direction="column"
                gap="2rem"
                alignItems="center"
                justifyContent="center"

            >
                <Heading size="lg">Sign In</Heading>

                {/*james <form style={{width: "50%", minWidth: "250px"}} onSubmit={e => handleSignUp(e)}> */}
                    <form style={{width: "50%", minWidth: "250px"}} onSubmit={handleSignIn}>

                        <Text textAlign="center" color='red' mb="1rem">{signInError}</Text>

                        <FormControl
                            isRequired
                            mb="1rem"
                        >
                            <FormLabel>Username</FormLabel>
                            <Input
                                placeholder="Username"
                                value={!usernameInput ? "" : usernameInput}
                                onChange={handleUsernameInputChange}
                            />
                        </FormControl>

                        <FormControl
                            isRequired
                            mb="1rem"
                        >
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={!passwordInput ? "" : passwordInput}
                                onChange={handlePasswordInputChange}
                            />
                        </FormControl>


                        <Flex
                            mb='1REM'
                            justifyContent="center"
                        >
                            <Button
                                colorScheme="purple"
                                type="submit"
                            >Sign In</Button>
                        </Flex>

                        <Text textAlign="center">Don't have an account? <ChakraLink _hover={{color: "purple"}} as={Link}
                                                                                    to="/sign_up">Sign Up
                            Now!</ChakraLink></Text>

                    </form>


            </Flex>
        </Flex>
);
}

export default SignIn;