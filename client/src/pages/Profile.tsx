// james: Import necessary hooks and components
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

// james: Profile component with a logout button
/*
const Profile = () => {
    return (  
        <h1>Profile</h1>
    );
}
*/

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <Box py={10} px={6} textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
                Your Profile
            </Heading>
            <Text fontSize="lg" color={'gray.500'} mb={4}>
                Username: {user?.username}
            </Text>
            <Text fontSize="lg" color={'gray.500'} mb={6}>
                Email: {user?.email}
            </Text>
            <Button colorScheme="teal" onClick={() => navigate('/edit_profile')}>
                Edit Profile
            </Button>
        </Box>
    );
}


 
export default Profile;