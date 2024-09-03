import { Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";

interface MessageInputProps {
    onSend: (message: string) => void;
  }

  const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
    const [message, setMessage] = useState<string>('');

    const handleSend = () => {
      if (message.trim()) {
        onSend(message.trim());
        setMessage('');
      }
    };

    return (
      <HStack>
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button colorScheme="teal" onClick={handleSend}>
          Send
        </Button>
      </HStack>
    );
  };

  export default MessageInput;


//
// import React, { useState } from 'react';
//
// interface MessageInputProps {
//     onSend: (message: string) => void;
// }
//
// const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
//     const [message, setMessage] = useState<string>('');
//
//     const handleSend = () => {
//         if (message.trim()) {
//             onSend(message.trim());
//             setMessage('');
//         }
//     };
//
//     return (
//         <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
//             <input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//                 style={{
//                     flexGrow: 1,
//                     padding: '8px',
//                     borderRadius: '4px',
//                     border: '1px solid #ccc',
//                 }}
//             />
//             <button
//                 onClick={handleSend}
//                 style={{
//                     padding: '8px 16px',
//                     borderRadius: '4px',
//                     border: 'none',
//                     backgroundColor: '#319795',
//                     color: '#fff',
//                     cursor: 'pointer',
//                 }}
//             >
//                 Send
//             </button>
//         </div>
//     );
// };
//
// export default MessageInput;
