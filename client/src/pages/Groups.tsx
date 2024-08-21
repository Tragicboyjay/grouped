import {
     Heading, Button, Flex, Input, useToast,
     Text,
     Box,
     VStack
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../context/authContext';
import useGetFetch from "../hooks/useGetFetch";
import React, { useEffect, useState, useRef } from "react"; //
import { IGroupData } from "../interfaces/IGroupData";
import { IGroup } from "../interfaces/IGroup";
import MessageInput from "../components/MessageInput";
import { io, Socket } from 'socket.io-client';
// import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

interface MessagesState {
    [key: string]: string[];
  }

const Groups: React.FC = () => {
    // Fetch groups data from the server
    const { groupId } = useParams<{ groupId: string }>();
    const { data, loading, error } = useGetFetch<IGroupData>(`http://localhost:8120/groups/all`);
    const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);
    const { user } = useAuth();

    const navigate = useNavigate();

    // user roles -- justice

    useEffect(() => {
        if (!user) {
            navigate('/sign_in');
        }
    }, [user,navigate])

    // -----
    // const navigate = useNavigate();
    const toast = useToast();
    const [groupName, setGroupName] = useState<string>('');
    const [isCreating, setIsCreating] = useState<boolean>(false);
    // const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState<MessagesState>({});
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
      socketRef.current = io('http://localhost:8120');

      socketRef.current.on('connect', () => {
          console.log('Connected to the Socket.IO server');
          socketRef.current!.emit('join-group', { selectedGroup: groupId });
      });

      socketRef.current.on('message', (group) => {
          console.log('Message received:', group);
          setMessages((prevMessages: MessagesState) => ({
            ...prevMessages,
            [group.userId]: [
              ...(prevMessages[group.userId] || []),
              group.newMessage ? group.newMessage : group.message
            ]
          }));
      });

      socketRef.current.on('disconnect', () => {
          console.log('Disconnected from the Socket.IO server');
      });

      return () => {
          socketRef.current?.disconnect();
          socketRef.current = null;
      };
  }, [selectedGroup]);

  const handleSend = (message: string) => {

      if (!selectedGroup) return;
      setMessages((prev) => ({
        ...prev,
        [selectedGroup.name]: [...(prev[selectedGroup.name] || []), message],
      }));
      if (socketRef.current && user) {
          const newMessage = {
              messageBody: message,
              userId: user?.id,
              groupId: selectedGroup.group_id,
              currentDate: new Date()
          }
        
          socketRef.current.emit('message', newMessage);
          // setMessageInput('');
      }
  };


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
        
        <Flex h="100%">
            <Helmet>
                <title>Groups | Grouped</title>
                <meta name="description" content="View and manage your groups on Grouped. Join existing groups or create new ones to start chatting with others." />
                <meta name="keywords" content="groups, Grouped, create group, join group, chat, messaging" />
                <meta property="og:title" content="Groups | Grouped" />
                <meta property="og:description" content="Explore and manage your groups on Grouped. Create new groups or join existing ones to connect with others." />
                <meta property="og:type" content="website" />
            </Helmet>

        {/* Sidebar */}
        <Box w="20%" p={4} bg="gray.100" borderRight="1px" borderColor="gray.200">
          <VStack align="start" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">
              Groups
            </Text>
            <Button colorScheme="blue" onClick={() => setIsCreating(!isCreating)} mb="1rem">
                {isCreating ? 'Cancel' : 'Create Group'}
            </Button>

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
            {data && data.groups.map((group: IGroup) => (
              <Button
                key={group.group_id}
                variant="ghost"
                w="100%"
                onClick={() => setSelectedGroup(group)}
                colorScheme={selectedGroup?.name === group.name ? 'teal' : 'gray'}
              >
                {group.name}
              </Button>
            ))}
          </VStack>
        </Box>

        {/* Chat Window */}
        <Flex flex={1} direction="column" justify="space-between">
          <Box p={4} flex="1" overflowY="auto">
            {isCreating ? (
                    <Flex my="2rem" flexDir="column" alignItems="center">
                        <Text fontSize="2xl" fontWeight="bold">
                             Create New Group
                         </Text>
                        <Input
                            placeholder="Enter group name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            my="1rem"
                        />
                        <Button onClick={handleCreateGroup}>Create</Button>
                    </Flex>
                )
                : selectedGroup ? (
              <VStack align="start" spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                  {selectedGroup.name}
                </Text>
                {messages[selectedGroup.name]?.map((msg, index) => (
                  <Box key={index} p={2} bg="teal.50" borderRadius="md">
                    {msg}
                  </Box>
                ))}
              </VStack>
            ) : (
              <Text>Select a group to start chatting</Text>
            )}
          </Box>

          {/* Message Input */}
          {selectedGroup && (
            <Box p={4} bg="gray.50" borderTop="1px" borderColor="gray.200">
              <MessageInput onSendMessage={handleSend} />
            </Box>
          )}
        </Flex>
      </Flex>


    );
}

export default Groups;