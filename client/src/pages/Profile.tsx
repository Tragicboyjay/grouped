import {
    Flex,
    Input,
    Heading,
    Button,
    useToast,
    FormControl,
    FormLabel,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Textarea,
    VStack,
    Image,
    Grid,
    GridItem,
    Box
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { IUser } from "../interfaces/IUser";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

// Importing images
import profileSettingsImage from "../assets/images/profile_settings.webp";
import secureProfileImage from "../assets/images/secure_profile.webp";

const Profile = () => {
    const { user, loginUser, logoutUser } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isEditing, setIsEditing] = useState(false);
    const [emailInput, setEmailInput] = useState<string | undefined>(user?.email);
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
    const [newPassword, setNewPassword] = useState<string | undefined>();
    const [confirmNewPassword, setConfirmNewPassword] = useState<string | undefined>();

    const [hobbiesInput, setHobbiesInput] = useState<string | undefined>(user?.hobbies);
    const [interestsInput, setInterestsInput] = useState<string | undefined>(user?.interests);

    const [actionType, setActionType] = useState<string | null>(null);

        // user roles -- justice

        useEffect(() => {
            if (!user) {
                navigate('/sign_in');
            }
        }, [user,navigate])
    
        // -----

    const handleUpdateProfile = async () => {
        try {
            if (!emailInput) {
                throw new Error("Email must be provided.");
            }

            if (!user?.id || !user?.created_at || !user?.token) {
                throw new Error("User information is missing.");
            }

            const updatedUser: IUser = {
                id: user.id,
                username: user.username,
                email: emailInput.toLowerCase(),
                created_at: user.created_at,
                token: user.token,
                hobbies: hobbiesInput,
                interests: interestsInput,
            };

            const token = localStorage.getItem('token');

            const response = await fetch("http://localhost:8120/users/update", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedUser)
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Failed to update profile.");
            }

            loginUser(updatedUser);

            toast({
                title: "Profile updated successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top",
            });

            setIsEditing(false);

        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: 'Error',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
        }
    };

    const handleUpdatePassword = async () => {
        try {
            if (newPassword !== confirmNewPassword) {
                throw new Error("New passwords do not match.");
            }

            if (!confirmPassword) {
                throw new Error("Please enter your current password to confirm the change.");
            }



            const response = await fetch("http://localhost:8120/users/updatePassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify({ currentPassword: confirmPassword, newPassword })
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Failed to update password.");
            }

            toast({
                title: "Password updated successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top",
            });

            setNewPassword(undefined);
            setConfirmNewPassword(undefined);
            onClose();

        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: 'Error',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
        }
    };

    const handleDeleteAccount = async () => {
        try {
            if (!confirmPassword) {
                throw new Error("Please enter your password to confirm deletion.");
            }

            const response = await fetch(`http://localhost:8120/users/delete/${user?.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: confirmPassword })
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Failed to delete account.");
            }

            toast({
                title: "Account deleted successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            logoutUser();
            navigate('/sign_up');

        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: 'Error',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
        }

        onClose();
    };

    const handleConfirmAction = () => {
        if (actionType === 'update') {
            handleUpdateProfile();
        } else if (actionType === 'updatePassword') {
            handleUpdatePassword();
        } else if (actionType === 'delete') {
            handleDeleteAccount();
        }
    };

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
                <title>Profile | Grouped</title>
                <meta name="description" content="Manage your profile on Grouped, including updating your email, hobbies, and interests, and changing your password." />
                <meta name="keywords" content="profile settings, Grouped, update profile, change email, hobbies, interests, change password, delete account" />
                <meta property="og:title" content="Profile Settings | Grouped" />
                <meta property="og:description" content="Update your personal information, change your password, or delete your account on Grouped." />
                <meta property="og:type" content="website" />
            </Helmet>


            <VStack spacing={8} maxW="800px" textAlign="center">
                <Heading size="lg">Profile</Heading>

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
                                src={profileSettingsImage}
                                alt="Profile Settings"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                            />
                            <Text>Profile Settings: Manage your personal information.</Text>
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
                                src={secureProfileImage}
                                alt="Secure Profile"
                                borderRadius="md"
                                objectFit="cover"
                                mb={4}
                            />
                            <Text>Secure Profile: Ensure your profile is protected.</Text>
                        </Box>
                    </GridItem>
                </Grid>

                {!isEditing ? (
                    <>
                        <Text fontSize="lg">Username: {user?.username}</Text>
                        <Text fontSize="lg">Email: {user?.email}</Text>
                        <Text fontSize="lg">Hobbies: {user?.hobbies}</Text>
                        <Text fontSize="lg">Interests: {user?.interests}</Text>

                        <Button colorScheme="purple" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </Button>
                    </>
                ) : (
                    <>
                        <FormControl isRequired mb="1rem" color="black">
                            <FormLabel>Email</FormLabel>
                            <Input
                                bg="white"
                                type="email"
                                placeholder="Email"
                                value={emailInput || ""}
                                onChange={(e) => setEmailInput(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb="1rem" color="black">
                            <FormLabel>Hobbies</FormLabel>
                            <Textarea
                                bg="white"
                                placeholder="Enter your hobbies"
                                value={hobbiesInput || ""}
                                onChange={(e) => setHobbiesInput(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb="1rem"  color="black">
                            <FormLabel>Interests</FormLabel>
                            <Textarea
                                bg="white"
                                placeholder="Enter your interests"
                                value={interestsInput || ""}
                                onChange={(e) => setInterestsInput(e.target.value)}
                            />
                        </FormControl>

                        <Button colorScheme="purple" onClick={handleUpdateProfile}>
                            Update Profile
                        </Button>

                        <Button colorScheme="red" onClick={() => setIsEditing(false)} mt="1rem">
                            Cancel
                        </Button>
                    </>
                )}

                <Button colorScheme="blue" onClick={() => {
                    setActionType('updatePassword');
                    onOpen();
                }} mt="1rem">
                    Change Password
                </Button>

                <Button colorScheme="red" onClick={() => {
                    setActionType('delete');
                    onOpen();
                }} mt="1rem">
                    Delete Account
                </Button>
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Your Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={confirmPassword || ""}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormControl>

                        {actionType === 'updatePassword' && (
                            <>
                                <FormControl isRequired mt="1rem">
                                    <FormLabel>New Password</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword || ""}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl isRequired mt="1rem">
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="Re-enter new password"
                                        value={confirmNewPassword || ""}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                </FormControl>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleConfirmAction}>
                            Confirm
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default Profile;
