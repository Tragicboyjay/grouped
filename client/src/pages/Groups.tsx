import {
    Heading,
    Button,
    Flex,
    Input,
    useToast,
    Text,
    Box,
    VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import useGetFetch from "../hooks/useGetFetch";
import React, { useEffect, useState } from "react";
import { IGroupData } from "../interfaces/IGroupData";
import { IGroup } from "../interfaces/IGroup";
import MessageInput from "../components/MessageInput";
import { io, Socket } from "socket.io-client";
import { Helmet } from "react-helmet";
import { IMessage } from "../interfaces/IMessage";

interface MessagesState {
    [key: string]: IMessage[];
}

const Groups: React.FC = () => {
    const { data, loading, error } = useGetFetch<IGroupData>(
        `http://localhost:8120/groups/all`
    );
    const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
    const [groupName, setGroupName] = useState<string>("");
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessagesState>({});
    const [socket, setSocket] = useState<Socket | null>(null);

    // Debugging: Ensure user is logged in
    useEffect(() => {
        if (!user) {
            navigate("/sign_in");
        }
    }, [user, navigate]);

    // Establish WebSocket connection
    useEffect(() => {
        const socketInstance = io("http://localhost:8120");

        setSocket(socketInstance);

        socketInstance.on("connect", () => {
            console.log("Connected to the Socket.IO server");
        });

        // Listen for new messages and debug what data is received
        socketInstance.on("message", (data) => {
            const messageData = data.newMessage || data;
            console.log("Message received from server:", messageData);

            if (messageData && messageData.groupId) {
                setMessages((prevMessages: MessagesState) => ({
                    ...prevMessages,
                    [messageData.groupId]: [
                        ...(prevMessages[messageData.groupId] || []),
                        messageData,
                    ],
                }));
                console.log(`Messages updated for group ${messageData.groupId}:`, messageData);
            }
        });

        socketInstance.on("disconnect", () => {
            console.log("Disconnected from the Socket.IO server");
        });

        return () => {
            socketInstance.disconnect();
            setSocket(null);
            console.log("WebSocket connection closed");
        };
    }, []);

    // Fetch group messages and join group
    useEffect(() => {
        if (selectedGroup) {
            fetch(`http://localhost:8120/messages/all/group/${selectedGroup.group_id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(`Fetched messages for group ${selectedGroup.group_id}:`, data);
                    setMessages((prevMessages) => ({
                        ...prevMessages,
                        [selectedGroup.group_id]: data.messages,
                    }));
                })
                .catch((err) => {
                    console.error("Failed to fetch messages:", err);
                });

            socket?.emit("join-group", { selectedGroup: selectedGroup.group_id });
            console.log(`Joined group ${selectedGroup.group_id}`);
        }
    }, [selectedGroup, socket]);

    // Handle sending messages
    const handleSend = (message: string) => {
        if (!selectedGroup) return;
        if (socket && user) {
            const newMessage: IMessage = {
                messageBody: message,
                authorId: user.id,
                groupId: selectedGroup.group_id,
                sentAt: new Date().toISOString(),
                username: user.username,
            };

            setMessages((prevMessages: MessagesState) => ({
                ...prevMessages,
                [selectedGroup.group_id]: [
                    ...(prevMessages[selectedGroup.group_id] || []),
                    newMessage,
                ],
            }));

            socket.emit("message", {
                messageBody: newMessage.messageBody,
                userId: newMessage.authorId,
                groupId: newMessage.groupId,
                currentDate: newMessage.sentAt,
            });
            console.log(`Sent message: ${message} to group ${selectedGroup.group_id}`);
        }
    };

    const handleCreateGroup = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8120/groups/create/1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ groupName }),
            });

            if (!response.ok) {
                throw new Error("Failed to create group");
            }

            const result = await response.json();
            toast({
                title: result.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setGroupName("");
            setIsCreating(false);
            setSelectedGroup(result.group);
            console.log("New group created and selected:", result.group);
        } catch (error) {
            console.error("Error creating group:", error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex h="100%">
            <Helmet>
                <title>Groups | Grouped</title>
                <meta
                    name="description"
                    content="View and manage your groups on Grouped. Join existing groups or create new ones to start chatting with others."
                />
            </Helmet>

            <Box w="20%" p={4} bg="gray.100" borderRight="1px" borderColor="gray.200">
                <VStack align="start" spacing={4}>
                    <Text fontSize="2xl" fontWeight="bold">
                        Groups
                    </Text>
                    <Button
                        colorScheme="blue"
                        onClick={() => setIsCreating(!isCreating)}
                        mb="1rem"
                    >
                        {isCreating ? "Cancel" : "Create Group"}
                    </Button>

                    {loading && !error && <Heading>... Loading</Heading>}

                    {error && !loading && (
                        <Heading>
                            {error instanceof Error ? error.message : "An unknown error occurred"}
                        </Heading>
                    )}

                    {data?.groups.map((group: IGroup) => (
                        <Button
                            key={group.group_id}
                            variant="ghost"
                            w="100%"
                            onClick={() => setSelectedGroup(group)}
                            colorScheme={selectedGroup?.group_id === group.group_id ? "teal" : "gray"}
                        >
                            {group.name}
                        </Button>
                    ))}
                </VStack>
            </Box>

            <Flex flex={1} direction="column" justify="space-between">
                <Box p={4} flex="1" overflowY="auto">
                    {isCreating ? (
                        <Flex my="2rem" flexDir="column" alignItems="center">
                            <Text fontSize="2xl" fontWeight="bold">Create New Group</Text>
                            <Input
                                placeholder="Enter group name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                my="1rem"
                            />
                            <Button onClick={handleCreateGroup}>Create</Button>
                        </Flex>
                    ) : selectedGroup ? (
                        <VStack align="start" spacing={4}>
                            <Text fontSize="2xl" fontWeight="bold">{selectedGroup.name}</Text>
                            {messages[selectedGroup.group_id]?.map((msg, index) => (
                                <Box
                                    key={index}
                                    p={2}
                                    bg={msg.authorId === user?.id ? "blue.50" : "teal.50"}
                                    borderRadius="md"
                                    alignSelf={msg.username === user?.username ? "flex-end" : "flex-start"}
                                >
                                    <Text fontWeight="bold">{msg.username === user?.username ? "You" : msg.username}:</Text>
                                    <Text>{msg.messageBody}</Text>
                                    <Text fontSize="xs" color="gray.500">
                                        {new Date(msg.sentAt).toLocaleTimeString()}
                                    </Text>
                                </Box>
                            ))}
                        </VStack>
                    ) : (
                        <Text>Select a group to start chatting</Text>
                    )}
                </Box>

                {selectedGroup && (
                    <Box p={4} bg="gray.50" borderTop="1px" borderColor="gray.200">
                        <MessageInput onSend={handleSend} />
                    </Box>
                )}
            </Flex>
        </Flex>
    );
};

export default Groups;
