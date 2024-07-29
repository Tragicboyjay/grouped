import { 
    Heading,
    Flex
} from "@chakra-ui/react";
import useGetFetch from "../hooks/useGetFetch";
import { IGroupData } from "../interfaces/IGroupData";
import { IGroup } from "../interfaces/IGroup";
import { useNavigate } from "react-router-dom";

const Groups: React.FC = () => {
    const { data, loading, error } = useGetFetch<IGroupData>("http://localhost:8120/groups/all")

    const navigate = useNavigate();

    return (  
        <Flex
            flexDir="column"
            alignItems="center"
        >
            <Heading
                mb="2rem"
            >Groups</Heading>

            <Flex
                flexDir="column"
                gap="1rem"
                alignItems="center"
            >
                {loading && !error && <Heading>... Loading</Heading>}
                {error && !loading && <Heading>{error}</Heading> }
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