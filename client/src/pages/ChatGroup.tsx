import { useParams } from "react-router-dom";

const ChatGroup = () => {
    const { groupId } = useParams();
    return (  
        <h1>Chat Group {groupId}</h1>
    );
}
 
export default ChatGroup;