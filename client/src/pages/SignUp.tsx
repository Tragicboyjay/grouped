import { 
    Heading, 
    Flex, 
    Input,
    Button,
    FormControl,
    FormLabel,
    Link as ChakraLink,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ISignUpUser } from "../interfaces/ISignUpUser";


const SignUp = () => {
    const [ usernameInput, setUsernameInput ] = useState<string | null>(null);
    const [ emailInput, setEmailInput ] = useState<string | null>(null);
    const [ passwordInput, setPasswordInput ] = useState<string | null>(null);
    const [ passwordComfirmInput, setPasswordComfirmInput ] = useState<string | null>(null);

    const [ signUpError, setSignUpError ] = useState<string | null>(null);

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

            // handle user context

            setUsernameInput(null);
            setEmailInput(null);
            setPasswordInput(null);
            setPasswordComfirmInput(null);



        } catch (error) {
            if (error instanceof Error) {
                setSignUpError(error.message);
            } else {
                setSignUpError('An unknown error occurred.');
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
                <Heading size="lg">Sign Up</Heading>

                    <form style={{width: "50%", minWidth: "250px"}} onSubmit={e => handleSignUp(e)}>
                        <Text textAlign="center" color='red' mb="1rem">{signUpError}</Text>

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
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={!emailInput? "" : emailInput}
                                onChange={handleEmailInputChange}
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
                                value={!passwordInput? "" : passwordInput}
                                onChange={handlePasswordInputChange}
                            />
                        </FormControl>

                        <FormControl
                            isRequired
                            mb="1rem"
                        >
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                value={!passwordComfirmInput? "" : passwordComfirmInput}
                                onChange={handlePasswordComfirmInputChange}
                            />
                        </FormControl>

                        <Flex
                            mb='1REM'
                            justifyContent="center"
                        >
                            <Button
                                colorScheme="purple"
                                type="submit"
                            >Sign Up</Button>
                        </Flex>

                        <Text textAlign="center">Already have an account? <ChakraLink _hover={{color: "purple"}} as={Link} to="/sign_in">Sign In!</ChakraLink></Text>

                    </form>




            </Flex>
        </Flex>
    );
}
 
export default SignUp;