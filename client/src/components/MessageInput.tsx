import { Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";

interface MessageInputProps {
    onSendMessage: (message: string) => void;
  }
  
  const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState<string>('');
  
    const handleSend = () => {
      if (message.trim()) {
        onSendMessage(message.trim());
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