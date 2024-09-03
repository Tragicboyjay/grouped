// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { io, Socket } from "socket.io-client";
// import { Helmet } from "react-helmet";
// import { useAuth } from "../context/authContext";
// import useGetFetch from "../hooks/useGetFetch";
// import MessageInput from "../components/MessageInput";
// import { IGroupData } from "../interfaces/IGroupData";
// import { IGroup } from "../interfaces/IGroup";
// import { IMessage } from "../interfaces/IMessage";
//
// interface MessagesState {
//     [key: string]: IMessage[];
// }
//
// const Groups: React.FC = () => {
//     const { groupId } = useParams<{ groupId: string }>(); // Get groupId from URL
//     const navigate = useNavigate();
//     const { data, loading, error } = useGetFetch<IGroupData>(
//         `http://localhost:8120/groups/all`
//     );
//
//     // Initialize selected group based on URL parameter
//     const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);
//     const { user } = useAuth();
//     const [groupName, setGroupName] = useState<string>("");
//     const [isCreating, setIsCreating] = useState<boolean>(false);
//     const [messages, setMessages] = useState<MessagesState>({});
//     const [socket, setSocket] = useState<Socket | null>(null);
//
//     useEffect(() => {
//         if (!user) {
//             navigate("/sign_in");
//         }
//     }, [user, navigate]);
//
//     useEffect(() => {
//         // Initialize Socket.IO connection
//         const socketInstance = io("http://localhost:8120");
//         setSocket(socketInstance);
//
//         socketInstance.on("connect", () => {
//             console.log("Connected to the Socket.IO server");
//         });
//
//         socketInstance.on("message", (data) => {
//             console.log("Message received:", data);
//             const messageData = data.newMessage || data;
//
//             if (messageData && selectedGroup) {
//                 setMessages((prevMessages: MessagesState) => ({
//                     ...prevMessages,
//                     [messageData.groupId]: [
//                         ...(prevMessages[messageData.groupId] || []),
//                         messageData,
//                     ],
//                 }));
//             }
//         });
//
//         socketInstance.on("disconnect", () => {
//             console.log("Disconnected from the Socket.IO server");
//         });
//
//         // Cleanup on component unmount
//         return () => {
//             socketInstance.disconnect();
//             setSocket(null);
//         };
//     }, [selectedGroup]);
//
//     useEffect(() => {
//         if (groupId) {
//             // Find the selected group from the data
//             const group = data?.groups.find(g => g.group_id.toString() === groupId);
//             setSelectedGroup(group || null);
//         }
//     }, [groupId, data]);
//
//     useEffect(() => {
//         if (selectedGroup) {
//             // Fetch messages for the selected group
//             fetch(`http://localhost:8120/messages/all/group/${selectedGroup.group_id}`)
//                 .then((response) => response.json())
//                 .then((data) => {
//                     setMessages((prevMessages) => ({
//                         ...prevMessages,
//                         [selectedGroup.group_id]: data.messages,
//                     }));
//                 })
//                 .catch((err) => {
//                     console.error("Failed to fetch messages:", err);
//                 });
//
//             // Join the selected group via socket
//             socket?.emit("join-group", {
//                 selectedGroup: selectedGroup.group_id,
//             });
//         }
//     }, [selectedGroup, socket]);
//
//     const handleSend = (message: string) => {
//         if (!selectedGroup) return;
//         if (socket && user) {
//             const newMessage: IMessage = {
//                 body: message,
//                 authorId: user.id,
//                 groupId: selectedGroup.group_id,
//                 sent_at: new Date().toISOString(),
//                 username: user.username,
//             };
//
//             // Immediately display the message in the chat window
//             setMessages((prevMessages: MessagesState) => ({
//                 ...prevMessages,
//                 [selectedGroup.group_id]: [
//                     ...(prevMessages[selectedGroup.group_id] || []),
//                     newMessage,
//                 ],
//             }));
//
//             // Send the message to the server
//             socket.emit("message", {
//                 messageBody: newMessage.body,
//                 userId: newMessage.authorId,
//                 groupId: newMessage.groupId,
//                 currentDate: newMessage.sent_at,
//             });
//         }
//     };
//
//     const handleCreateGroup = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await fetch("http://localhost:8120/groups/create/1", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ groupName }),
//             });
//
//             if (!response.ok) {
//                 throw new Error("Failed to create group");
//             }
//
//             const result = await response.json();
//
//             setGroupName(""); // Clear the input field after successful creation
//             setIsCreating(false); // Close the create group form
//
//             // Immediately add the new group to the list and navigate to it
//             navigate(`/groups/${result.group.group_id}`);
//         } catch (error) {
//             console.error("Error creating group:", error);
//             // Optionally rethrow or log the error
//             // throw error; // Uncomment this line if you want to rethrow
//         }
//     };
//
//     return (
//         <div style={{ display: "flex", height: "100%" }}>
//             <Helmet>
//                 <title>Groups | Grouped</title>
//                 <meta
//                     name="description"
//                     content="View and manage your groups on Grouped. Join existing groups or create new ones to start chatting with others."
//                 />
//             </Helmet>
//
//             {/* Sidebar */}
//             <div style={{ width: "20%", padding: "16px", backgroundColor: "#f0f0f0", borderRight: "1px solid #dcdcdc" }}>
//                 <div style={{ marginBottom: "16px", fontSize: "24px", fontWeight: "bold" }}>
//                     Groups
//                 </div>
//                 <button
//                     style={{ marginBottom: "16px", padding: "8px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}
//                     onClick={() => setIsCreating(!isCreating)}
//                 >
//                     {isCreating ? "Cancel" : "Create Group"}
//                 </button>
//
//                 {loading && !error && <div style={{ fontSize: "18px" }}>... Loading</div>}
//
//                 {error && !loading && (
//                     <div style={{ color: "red", fontSize: "18px" }}>
//                         {(error as unknown) instanceof Error
//                             ? (error as unknown as Error).message
//                             : "An unknown error occurred"}
//                     </div>
//                 )}
//
//                 {data &&
//                     data.groups.map((group: IGroup) => (
//                         <button
//                             key={group.group_id}
//                             style={{
//                                 width: "100%",
//                                 padding: "8px",
//                                 backgroundColor: selectedGroup?.group_id === group.group_id ? "#20c997" : "#f8f9fa",
//                                 border: "none",
//                                 cursor: "pointer",
//                                 textAlign: "left",
//                                 marginBottom: "8px"
//                             }}
//                             onClick={() => navigate(`/groups/${group.group_id}`)}
//                         >
//                             {group.name}
//                         </button>
//                     ))}
//             </div>
//
//             {/* Chat Window */}
//             <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//                 <div style={{ padding: "16px", flex: 1, overflowY: "auto" }}>
//                     {isCreating ? (
//                         <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
//                             <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
//                                 Create New Group
//                             </div>
//                             <input
//                                 style={{ padding: "8px", marginBottom: "16px", width: "100%", maxWidth: "400px" }}
//                                 placeholder="Enter group name"
//                                 value={groupName}
//                                 onChange={(e) => setGroupName(e.target.value)}
//                             />
//                             <button
//                                 style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}
//                                 onClick={handleCreateGroup}
//                             >
//                                 Create
//                             </button>
//                         </div>
//                     ) : selectedGroup ? (
//                         <div>
//                             <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
//                                 {selectedGroup.name}
//                             </div>
//                             {messages[selectedGroup.group_id]?.map((msg, index) => {
//                                 console.log("Message data:", msg); // This will print each message object to the console
//                                 return (
//                                     <div key={index} style={{ padding: '10px', backgroundColor: msg.authorId === user?.id ? '#cce5ff' : '#e2e3e5', borderRadius: '5px', alignSelf: msg.username === user?.username ? 'flex-end' : 'flex-start' }}>
//                                         <strong>{msg.username === user?.username ? "You" : msg.username}:</strong>
//                                         <p>{msg.body}</p>  {/* Ensure this matches the key in your backend response */}
//                                         <small>
//                                             {
//                                                 (() => {
//                                                     const parsedDate = new Date(msg.sent_at);
//                                                     return !isNaN(parsedDate.getTime()) ? parsedDate.toLocaleTimeString() : "Invalid Date";
//                                                 })()
//                                             }
//                                         </small>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     ) : (
//                         <div>Select a group to start chatting</div>
//                     )}
//                 </div>
//
//                 {/* Message Input */}
//                 {selectedGroup && (
//                     <div style={{ padding: "16px", backgroundColor: "#f8f9fa", borderTop: "1px solid #dcdcdc" }}>
//                         <MessageInput onSend={handleSend} />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Groups;


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

    useEffect(() => {
        if (!user) {
            navigate("/sign_in");
        }
    }, [user, navigate]);

    useEffect(() => {
        // Initialize Socket.IO connection
        const socketInstance = io("http://localhost:8120");
        setSocket(socketInstance);

        socketInstance.on("connect", () => {
            console.log("Connected to the Socket.IO server");
        });

        socketInstance.on("message", (data) => {
            console.log("Message received:", data);

            const messageData = data.newMessage || data;

            if (messageData && selectedGroup) {
                setMessages((prevMessages: MessagesState) => ({
                    ...prevMessages,
                    [messageData.groupId]: [
                        ...(prevMessages[messageData.groupId] || []),
                        messageData,
                    ],
                }));
            }
        });

        socketInstance.on("disconnect", () => {
            console.log("Disconnected from the Socket.IO server");
        });

        // Cleanup on component unmount
        return () => {
            socketInstance.disconnect();
            setSocket(null);
        };
    }, [selectedGroup]);

    useEffect(() => {
        if (selectedGroup) {
            // Fetch messages for the selected group
            fetch(`http://localhost:8120/messages/all/group/${selectedGroup.group_id}`)
                .then((response) => response.json())
                .then((data) => {
                    setMessages((prevMessages) => ({
                        ...prevMessages,
                        [selectedGroup.group_id]: data.messages,
                    }));
                })
                .catch((err) => {
                    console.error("Failed to fetch messages:", err);
                });

            // Join the selected group via socket
            socket?.emit("join-group", {
                selectedGroup: selectedGroup.group_id,
            });
        }
    }, [selectedGroup, socket]);

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

            // Immediately display the message in the chat window
            setMessages((prevMessages: MessagesState) => ({
                ...prevMessages,
                [selectedGroup.group_id]: [
                    ...(prevMessages[selectedGroup.group_id] || []),
                    newMessage,
                ],
            }));

            // Send the message to the server
            socket.emit("message", {
                messageBody: newMessage.messageBody,
                userId: newMessage.authorId,
                groupId: newMessage.groupId,
                currentDate: newMessage.sentAt,
            });
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

            setGroupName(""); // Clear the input field after successful creation
            setIsCreating(false); // Close the create group form

            // Immediately add the new group to the list
            setSelectedGroup(result.group); // Automatically select the new group after creation
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error",
                    description: "An unknown error occurred",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
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

            {/* Sidebar */}
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
                            {(error as unknown) instanceof Error
                                ? (error as unknown as Error).message
                                : "An unknown error occurred"}
                        </Heading>
                    )}

                    {data &&
                        data.groups.map((group: IGroup) => (
                            <Button
                                key={group.group_id}
                                variant="ghost"
                                w="100%"
                                onClick={() => setSelectedGroup(group)}
                                colorScheme={
                                    selectedGroup?.group_id === group.group_id
                                        ? "teal"
                                        : "gray"
                                }
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
                    ) : selectedGroup ? (
                        <VStack align="start" spacing={4}>
                            <Text fontSize="2xl" fontWeight="bold">
                                {selectedGroup.name}
                            </Text>
                            {messages[selectedGroup.group_id]?.map((msg, index) => (
                                <Box
                                    key={index}
                                    p={2}
                                    bg={msg.authorId === user?.id ? "blue.50" : "teal.50"}
                                    borderRadius="md"
                                    alignSelf={
                                        msg.username === user?.username
                                            ? "flex-end"
                                            : "flex-start"
                                    }
                                >
                                    <Text fontWeight="bold">
                                        {msg.username === user?.username ? "You" : msg.username}:
                                    </Text>
                                    <Text>{msg.messageBody}</Text>
                                    {/* Convert sent_at to a readable format */}
                                    <Text fontSize="xs" color="gray.500">
                                        {
                                            (() => {
                                                const parsedDate = new Date(msg.sentAt);
                                                if (!isNaN(parsedDate.getTime())) {
                                                    return parsedDate.toLocaleTimeString();
                                                } else {
                                                    return "Invalid Date";
                                                }
                                            })()
                                        }
                                    </Text>
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
                        <MessageInput onSend={handleSend} />
                    </Box>
                )}
            </Flex>
        </Flex>
    );
};

export default Groups;
