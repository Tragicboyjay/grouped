import {
     Heading, Button, Flex, Input, useToast
} from "@chakra-ui/react";
import useGetFetch from "../hooks/useGetFetch";
import React, { useState } from "react"; //
import { IGroupData } from "../interfaces/IGroupData";
import { IGroup } from "../interfaces/IGroup";
import { useNavigate } from "react-router-dom";

const Groups: React.FC = () => {
    // Fetch groups data from the server
    const { data, loading, error } = useGetFetch<IGroupData>("http://localhost:8120/groups/all")

    const navigate = useNavigate();
    const toast = useToast();
    const [groupName, setGroupName] = useState<string>('');
    const [isCreating, setIsCreating] = useState<boolean>(false);

/*
    const handleCreateGroup = async () => {
        try {
            const response = await fetch("http://localhost:8120/groups/create/1", { // Assuming topicId is 1
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({groupName}),
            });

            if (!response.ok) {
                throw new Error('Failed to create group');
            }

            const result = await response.json();
            toast({
                title: result.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            // Optionally refresh the list of groups after creation
        } catch (error: unknown) { // Specify that error is of type 'unknown'
                if (error instanceof Error) { // Check if error is an instance of Error
                toast({
                    title: 'Error',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'An unknown error occurred',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };
*/


    const handleCreateGroup = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
            const response = await fetch("http://localhost:8120/groups/create/1", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                },
                body: JSON.stringify({ groupName }),
            });

            if (!response.ok) {
                throw new Error('Failed to create group');
            }

            const result = await response.json();
            toast({
                title: result.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            // Optionally refresh the list of groups after creation
        } catch (error) { // Removed explicit any type
            if (error instanceof Error) { // Check if error is an instance of Error
                toast({
                    title: 'Error',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'An unknown error occurred',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }

    }; // <-- Add this closing bracket to properly close the function

    return (
        <Flex
            flexDir="column"
            alignItems="center"
        >
            <Heading
                mb="2rem"
            >Groups</Heading>


            <Button onClick={() => setIsCreating(!isCreating)} mb="1rem">
                {isCreating ? 'Cancel' : 'Create Group'}
            </Button>


            {isCreating && (
                <Flex mb="2rem" flexDir="column" alignItems="center">
                    <Input
                        placeholder="Enter group name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        mb="1rem"
                    />
                    <Button onClick={handleCreateGroup}>Create</Button>
                </Flex>
            )}

            <Flex
                flexDir="column"
                gap="1rem"
                alignItems="center"
            >

                {/* Display loading state if data is being fetched */}
                {loading && !error && <Heading>... Loading</Heading>}


                {/* Display error message if there's an error */}
                {/*error && !loading && <Heading>{error}</Heading> */}
                {error && !loading && (
                    <Heading>
                        {(error as unknown) instanceof Error ? (error as unknown as Error).message : 'An unknown error occurred'}
                    </Heading>
                )}




                {/* Map through the groups and display them */}
                {data && data.groups.map( (group: IGroup) => (
                    <Heading

                        key={group.group_id}
                        onClick={() => navigate(`/chat/${group.group_id}`)}
                        cursor="pointer"
                    >
                    {group.name}</Heading>
                ))}
            </Flex>
        </Flex>


    );
}

export default Groups;